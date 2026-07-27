import { useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { IconChevron } from '@/components/icons'
import { fromKg, toKg, weightLabel } from '@/lib/units'
import {
  computePlates,
  defaultBarFor,
  defaultStepFor,
  plateColor,
  plateSetFor,
} from '@/lib/plates'

function round(n: number, step: number): number {
  return Math.round(n / step) * step
}
function fmt(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 2 })
}

/** Scheiben-Grafik für eine Seite der Hantel. */
function PlateBar({ total, bar, unit }: { total: number; bar: number; unit: 'metric' | 'imperial' }) {
  const set = plateSetFor(unit)
  const { plates, leftoverPerSide, belowBar } = computePlates(total, bar, set)
  const maxPlate = Math.max(...set)

  return (
    <div className="rounded-xl bg-[var(--color-surface-2)] px-3 py-3">
      <div className="flex h-[76px] items-center justify-center gap-[3px]">
        {/* Stangen-Stub */}
        <div className="h-[6px] w-8 shrink-0 rounded-full bg-[var(--color-ink-faint)]" />
        {belowBar || plates.length === 0 ? (
          <span className="ml-2 text-xs text-[var(--color-ink-muted)]">
            {belowBar ? '≤ Stange' : 'Keine Scheiben'}
          </span>
        ) : (
          plates.map((p, i) => {
            const c = plateColor(p)
            const h = 40 + (p / maxPlate) * 36
            return (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center rounded-[3px]"
                style={{ height: h, width: 15, backgroundColor: c.bg, color: c.fg }}
                title={`${p} ${weightLabel(unit)}`}
              >
                <span className="text-[8px] font-bold [writing-mode:vertical-rl] rotate-180">
                  {p}
                </span>
              </div>
            )
          })
        )}
        <div className="h-[6px] w-3 shrink-0 rounded-full bg-[var(--color-ink-faint)]" />
      </div>
      <p className="mt-1 text-center text-[11px] text-[var(--color-ink-muted)]">
        Stange {fmt(bar)} {weightLabel(unit)}
        {plates.length > 0 && ` · je Seite: ${summarize(plates)} ${weightLabel(unit)}`}
        {leftoverPerSide > 0.01 && ` (+${fmt(leftoverPerSide)} Rest)`}
      </p>
    </div>
  )
}

function summarize(plates: number[]): string {
  const counts = new Map<number, number>()
  for (const p of plates) counts.set(p, (counts.get(p) ?? 0) + 1)
  return [...counts.entries()].map(([p, n]) => `${n}×${p}`).join(', ')
}

export function WeightPicker({
  exerciseId,
  initialKg,
  onConfirm,
}: {
  exerciseId: string
  initialKg: number
  onConfirm: (kg: number) => void
}) {
  const { data, setExerciseConfig } = useStore()
  const unit = data.settings.unit
  const cfg = data.settings.exerciseConfig?.[exerciseId] ?? {}

  const bar = cfg.barKg != null ? fromKg(cfg.barKg, unit) : defaultBarFor(unit)
  const step = cfg.stepKg != null ? fromKg(cfg.stepKg, unit) : defaultStepFor(unit)
  const usePlates = cfg.usePlates ?? true

  const [val, setVal] = useState(() => fromKg(initialKg, unit))
  const [showOpts, setShowOpts] = useState(false)

  const bump = (dir: 1 | -1) => setVal((v) => Math.max(0, round(v + dir * step, step)))

  return (
    <div className="flex flex-col gap-4">
      {/* Wert + Stepper */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => bump(-1)}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--color-surface-2)] text-2xl font-bold text-[var(--color-ink)] active:scale-95"
          aria-label="weniger"
        >
          −
        </button>
        <div className="flex flex-1 flex-col items-center">
          <input
            inputMode="decimal"
            className="w-full bg-transparent text-center text-4xl font-bold text-[var(--color-ink)] focus:outline-none"
            value={val || ''}
            onChange={(e) => setVal(Number(e.target.value.replace(',', '.')) || 0)}
            onFocus={(e) => e.target.select()}
          />
          <span className="text-sm text-[var(--color-ink-muted)]">{weightLabel(unit)}</span>
        </div>
        <button
          onClick={() => bump(1)}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl brand-gradient text-2xl font-bold text-white active:scale-95"
          aria-label="mehr"
        >
          +
        </button>
      </div>

      {/* Scheiben-Grafik */}
      {usePlates && <PlateBar total={val} bar={bar} unit={unit} />}

      {/* Optionen (pro Übung) */}
      <div className="rounded-xl border border-[var(--color-border)] px-3 py-2">
        <button
          className="flex w-full items-center justify-between text-left text-sm font-medium text-[var(--color-ink-muted)]"
          onClick={() => setShowOpts((v) => !v)}
        >
          Optionen für diese Übung
          <IconChevron
            width={16}
            height={16}
            className={['text-[var(--color-ink-faint)] transition-transform', showOpts ? 'rotate-90' : ''].join(' ')}
          />
        </button>
        {showOpts && (
          <div className="mt-3 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--color-ink-muted)]">
                  Schritt ({weightLabel(unit)})
                </span>
                <input
                  inputMode="decimal"
                  className="input !py-2"
                  value={step}
                  onChange={(e) =>
                    setExerciseConfig(exerciseId, {
                      stepKg: toKg(Number(e.target.value.replace(',', '.')) || step, unit),
                    })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--color-ink-muted)]">
                  Stange ({weightLabel(unit)})
                </span>
                <input
                  inputMode="decimal"
                  className="input !py-2"
                  value={bar}
                  onChange={(e) =>
                    setExerciseConfig(exerciseId, {
                      barKg: toKg(Number(e.target.value.replace(',', '.')) || bar, unit),
                    })
                  }
                />
              </label>
            </div>
            <label className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-ink-muted)]">Scheiben anzeigen</span>
              <button
                onClick={() => setExerciseConfig(exerciseId, { usePlates: !usePlates })}
                className={[
                  'h-6 w-11 rounded-full p-0.5 transition-colors',
                  usePlates ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]',
                ].join(' ')}
                aria-label="Scheiben anzeigen"
              >
                <span
                  className={[
                    'block h-5 w-5 rounded-full bg-white transition-transform',
                    usePlates ? 'translate-x-5' : '',
                  ].join(' ')}
                />
              </button>
            </label>
          </div>
        )}
      </div>

      <button className="btn-primary" onClick={() => onConfirm(toKg(val, unit))}>
        Übernehmen
      </button>
    </div>
  )
}
