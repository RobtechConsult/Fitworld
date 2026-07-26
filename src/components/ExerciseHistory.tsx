import { useMemo } from 'react'
import { useStore } from '@/store/StoreContext'
import { Sparkline } from '@/components/Sparkline'
import {
  epley1RM,
  exerciseSessionHistory,
  exerciseStats,
  oneRMSeries,
} from '@/lib/metrics'
import { fmtWeight, fromKg, weightLabel } from '@/lib/units'

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

/** Statistik + Verlaufs-Graph + vergangene Sätze einer Übung. */
export function ExerciseHistory({ exerciseId }: { exerciseId: string }) {
  const { data } = useStore()
  const unit = data.settings.unit

  const stats = useMemo(
    () => exerciseStats(data.workouts, exerciseId),
    [data.workouts, exerciseId],
  )
  const sessions = useMemo(
    () => exerciseSessionHistory(data.workouts, exerciseId),
    [data.workouts, exerciseId],
  )
  const ormValues = useMemo(
    () => oneRMSeries(data.workouts, exerciseId).map((p) => fromKg(p.value, unit)),
    [data.workouts, exerciseId, unit],
  )

  if (sessions.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-[var(--color-ink-muted)]">
        Noch keine getrackten Sätze mit dieser Übung.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Bestwerte */}
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Einheiten" value={String(stats.sessions)} />
        <Stat label="Bestes Gewicht" value={stats.maxWeightKg > 0 ? fmtWeight(stats.maxWeightKg, unit) : '–'} />
        <Stat label="Bestes 1-RM" value={stats.best1RMKg > 0 ? fmtWeight(stats.best1RMKg, unit) : '–'} />
      </div>

      {/* Verlaufs-Graph (geschätztes 1-RM) */}
      <div className="card px-4 py-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
          1-RM-Verlauf ({weightLabel(unit)})
        </p>
        <Sparkline values={ormValues} />
      </div>

      {/* Vergangene Einheiten */}
      <div className="flex flex-col gap-3">
        {sessions.map((s, i) => (
          <div key={i} className="card px-4 py-3">
            <p className="mb-1.5 text-sm font-semibold">
              {fmtDate(s.date)}
              {s.name ? ` · ${s.name}` : ''}
            </p>
            <div className="grid grid-cols-[1.4rem_1fr_1fr_1fr] gap-x-2 text-sm">
              <span className="text-[11px] font-semibold uppercase text-[var(--color-ink-faint)]">#</span>
              <span className="text-[11px] font-semibold uppercase text-[var(--color-ink-faint)]">Wdh</span>
              <span className="text-[11px] font-semibold uppercase text-[var(--color-ink-faint)]">
                {weightLabel(unit)}
              </span>
              <span className="text-[11px] font-semibold uppercase text-[var(--color-ink-faint)]">1RM</span>
              {s.sets.map((set, j) => (
                <Row key={j} idx={j + 1} reps={set.reps} weightKg={set.weightKg} unit={unit} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card px-3 py-2.5 text-center">
      <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
        {label}
      </p>
      <p className="mt-0.5 text-base font-bold">{value}</p>
    </div>
  )
}

function Row({
  idx,
  reps,
  weightKg,
  unit,
}: {
  idx: number
  reps: number
  weightKg: number
  unit: 'metric' | 'imperial'
}) {
  const orm = reps > 0 && weightKg > 0 ? Math.round(fromKg(epley1RM(weightKg, reps), unit)) : null
  return (
    <>
      <span className="text-[var(--color-ink-muted)]">{idx}</span>
      <span>{reps || '–'}</span>
      <span>{weightKg > 0 ? fromKg(weightKg, unit).toLocaleString('de-DE', { maximumFractionDigits: 1 }) : '–'}</span>
      <span className="text-[var(--color-ink-muted)]">{orm ?? '–'}</span>
    </>
  )
}
