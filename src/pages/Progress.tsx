import { useMemo, useRef, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { ComingSoon } from '@/components/ComingSoon'
import {
  bodyFatSeries,
  exercisesInWorkouts,
  oneRMSeries,
  volumeSeries,
  weightSeries,
  type SeriesPoint,
} from '@/lib/metrics'
import { fromKg, weightLabel } from '@/lib/units'

// Design-Token-Farben (Recharts braucht konkrete Werte).
const C = {
  brand: '#7c5cff',
  brand2: '#b45cff',
  accent: '#22d3ee',
  positive: '#34d399',
  grid: '#2a2a3d',
  axis: '#6f6f8c',
}

type Range = '4w' | '3m' | '1y' | 'all'
const RANGES: Array<{ key: Range; label: string; days: number | null }> = [
  { key: '4w', label: '4 Wochen', days: 28 },
  { key: '3m', label: '3 Monate', days: 92 },
  { key: '1y', label: '1 Jahr', days: 365 },
  { key: 'all', label: 'Alle', days: null },
]

function cutoffISO(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

function shortLabel(iso: string): string {
  const [, m, d] = iso.split('-')
  return m && d ? `${d}.${m}.` : iso
}

function filterRange(series: SeriesPoint[], range: Range): SeriesPoint[] {
  const days = RANGES.find((r) => r.key === range)?.days ?? null
  if (days == null) return series
  const cutoff = cutoffISO(days)
  return series.filter((p) => p.date >= cutoff)
}

function toChartData(series: SeriesPoint[]) {
  return series.map((p) => ({ label: shortLabel(p.date), value: p.value, date: p.date }))
}

function CustomTooltip({
  active,
  payload,
  unit,
}: {
  active?: boolean
  payload?: Array<{ payload: { label: string; value: number } }>
  unit: string
}) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs shadow-lg">
      <p className="text-[var(--color-ink-faint)]">{p.label}</p>
      <p className="font-semibold text-[var(--color-ink)]">
        {p.value.toLocaleString('de-DE')} {unit}
      </p>
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  unit,
  children,
  hasData,
}: {
  title: string
  subtitle: string
  unit?: string
  hasData: boolean
  children: React.ReactNode
}) {
  return (
    <div className="w-full shrink-0 basis-full snap-center px-0.5">
      <div className="card px-3 py-4">
        <div className="mb-1 flex items-baseline justify-between px-1">
          <h3 className="font-semibold">{title}</h3>
          {unit && <span className="text-xs text-[var(--color-ink-faint)]">{unit}</span>}
        </div>
        <p className="mb-3 px-1 text-xs text-[var(--color-ink-muted)]">{subtitle}</p>
        {hasData ? (
          <div className="h-56">{children}</div>
        ) : (
          <div className="flex h-56 items-center justify-center text-center text-sm text-[var(--color-ink-muted)]">
            Noch keine Daten in diesem Zeitraum.
          </div>
        )}
      </div>
    </div>
  )
}

const axisProps = {
  stroke: C.axis,
  tick: { fill: C.axis, fontSize: 11 },
  tickLine: false,
  axisLine: false,
}

export function Progress() {
  const { data, allExercises, exerciseById } = useStore()
  const unit = data.settings.unit
  const wLabel = weightLabel(unit)
  const [range, setRange] = useState<Range>('3m')
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  // kg-Serie in aktive Einheit umrechnen (für Anzeige).
  const convW = (pts: ReturnType<typeof toChartData>) =>
    pts.map((p) => ({ ...p, value: fromKg(p.value, unit) }))

  // Ziel-Werte für Referenz-Linien.
  const goalWeight = data.settings.goalWeightKg != null ? fromKg(data.settings.goalWeightKg, unit) : null
  const goalFat = data.settings.goalBodyFatPct ?? null

  const usedExercises = useMemo(() => exercisesInWorkouts(data.workouts), [data.workouts])
  const [exerciseId, setExerciseId] = useState<string>('')
  const selectedExId = exerciseId || usedExercises[0]?.id || ''

  const weight = useMemo(
    () => convW(toChartData(filterRange(weightSeries(data.bodyMetrics), range))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.bodyMetrics, range, unit],
  )
  const fat = useMemo(
    () => toChartData(filterRange(bodyFatSeries(data.bodyMetrics), range)),
    [data.bodyMetrics, range],
  )
  const volume = useMemo(
    () => convW(toChartData(filterRange(volumeSeries(data.workouts), range))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.workouts, range, unit],
  )
  const orm = useMemo(
    () =>
      selectedExId
        ? convW(toChartData(filterRange(oneRMSeries(data.workouts, selectedExId), range)))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.workouts, selectedExId, range, unit],
  )

  const nothingYet = data.bodyMetrics.length === 0 && data.workouts.length === 0
  if (nothingYet) {
    return (
      <div>
        <PageHeader title="Fortschritt" subtitle="Graphen zu Kraft, Volumen & Körper" />
        <ComingSoon title="Noch keine Daten für Graphen">
          Sobald du Workouts trackst oder Körper-Metriken erfasst, erscheinen hier swipebare Graphen.
        </ComingSoon>
      </div>
    )
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const cards = [
    { key: 'weight', title: 'Körpergewicht' },
    { key: 'volume', title: 'Trainingsvolumen' },
    { key: 'orm', title: 'Kraft (1-RM)' },
    { key: 'fat', title: 'Körperfett' },
  ]

  return (
    <div>
      <PageHeader title="Fortschritt" subtitle="Wische zwischen den Graphen" />

      {/* Zeitraum */}
      <div className="mb-4 flex gap-1.5">
        {RANGES.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={[
              'flex-1 rounded-xl border px-2 py-2 text-xs font-semibold transition-colors',
              range === r.key
                ? 'brand-gradient border-transparent text-white'
                : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
            ].join(' ')}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Swipebare Chart-Karten */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ChartCard
          title="Körpergewicht"
          subtitle="Verlauf deines Körpergewichts"
          unit={wLabel}
          hasData={weight.length > 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weight} margin={{ top: 6, right: 10, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="gWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.brand} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={C.brand} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" {...axisProps} interval="preserveStartEnd" minTickGap={24} />
              <YAxis
                {...axisProps}
                domain={[
                  (min: number) => Math.floor(Math.min(min, goalWeight ?? min) - 1),
                  (max: number) => Math.ceil(Math.max(max, goalWeight ?? max) + 1),
                ]}
                width={44}
              />
              <Tooltip content={<CustomTooltip unit={wLabel} />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={C.brand}
                strokeWidth={2.5}
                fill="url(#gWeight)"
                dot={{ r: 2.5, fill: C.brand }}
              />
              {goalWeight != null && (
                <ReferenceLine
                  y={goalWeight}
                  stroke={C.positive}
                  strokeDasharray="5 4"
                  label={{ value: `Ziel ${goalWeight}`, position: 'insideTopRight', fill: C.positive, fontSize: 11 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Trainingsvolumen"
          subtitle={`Gesamtgewicht (Wdh × ${wLabel}) je Einheit`}
          unit={wLabel}
          hasData={volume.length > 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volume} margin={{ top: 6, right: 10, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" {...axisProps} interval="preserveStartEnd" minTickGap={24} />
              <YAxis
                {...axisProps}
                width={40}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 })}k` : String(v)
                }
              />
              <Tooltip content={<CustomTooltip unit={wLabel} />} cursor={{ fill: 'rgba(124,92,255,0.08)' }} />
              <Bar dataKey="value" fill={C.brand2} radius={[4, 4, 0, 0]} maxBarSize={38} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Kraft (geschätztes 1-RM)"
          subtitle={exerciseById(selectedExId)?.name ?? 'Übung wählen'}
          unit={wLabel}
          hasData={orm.length > 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orm} margin={{ top: 6, right: 10, left: 4, bottom: 0 }}>
              <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" {...axisProps} interval="preserveStartEnd" minTickGap={24} />
              <YAxis {...axisProps} domain={['dataMin - 2', 'dataMax + 2']} width={44} />
              <Tooltip content={<CustomTooltip unit={wLabel} />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={C.accent}
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: C.accent }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Körperfett"
          subtitle="Verlauf deines KFA"
          unit="%"
          hasData={fat.length > 0}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fat} margin={{ top: 6, right: 10, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="gFat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.positive} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={C.positive} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" {...axisProps} interval="preserveStartEnd" minTickGap={24} />
              <YAxis
                {...axisProps}
                domain={[
                  (min: number) => Math.floor(Math.min(min, goalFat ?? min) - 1),
                  (max: number) => Math.ceil(Math.max(max, goalFat ?? max) + 1),
                ]}
                width={44}
              />
              <Tooltip content={<CustomTooltip unit="%" />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={C.positive}
                strokeWidth={2.5}
                fill="url(#gFat)"
                dot={{ r: 2.5, fill: C.positive }}
              />
              {goalFat != null && (
                <ReferenceLine
                  y={goalFat}
                  stroke={C.accent}
                  strokeDasharray="5 4"
                  label={{ value: `Ziel ${goalFat}%`, position: 'insideTopRight', fill: C.accent, fontSize: 11 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Punkte-Indikator */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {cards.map((c, i) => (
          <span
            key={c.key}
            className={[
              'h-1.5 rounded-full transition-all',
              i === active ? 'w-5 bg-[var(--color-brand)]' : 'w-1.5 bg-[var(--color-border)]',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Übungs-Auswahl für den 1-RM-Graphen */}
      {active === 2 && usedExercises.length > 0 && (
        <div className="mt-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
              Übung für den Kraft-Graphen
            </span>
            <select
              className="input"
              value={selectedExId}
              onChange={(e) => setExerciseId(e.target.value)}
            >
              {usedExercises.map((u) => {
                const ex = allExercises.find((e) => e.id === u.id)
                return (
                  <option key={u.id} value={u.id}>
                    {ex?.name ?? u.id} ({u.sessions})
                  </option>
                )
              })}
            </select>
          </label>
        </div>
      )}
    </div>
  )
}
