import { useStore } from '@/store/StoreContext'
import { weeklySetsByMuscle, volumeBand, type VolumeBand } from '@/lib/training'
import { MUSCLE_LABELS } from '@/data/muscleGroups'

const BAND_COLOR: Record<VolumeBand, string> = {
  none: 'var(--color-border)',
  low: 'var(--color-warn)',
  good: 'var(--color-positive)',
  high: 'var(--color-danger)',
}

/** Wochen-Volumen: abgeschlossene Sätze je Muskel (letzte 7 Tage), mit Orientierungs-Band. */
export function VolumeCard() {
  const { data, exerciseById } = useStore()
  const rows = weeklySetsByMuscle(data.workouts, exerciseById)
    .filter((r) => r.muscle !== 'cardio' && r.muscle !== 'fullbody')
    .slice(0, 8)

  if (rows.length === 0) return null
  const max = Math.max(...rows.map((r) => r.sets), 1)

  return (
    <div className="card px-4 py-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
          Wochen-Volumen
        </h3>
        <span className="text-xs text-[var(--color-ink-muted)]">Sätze/Muskel · 7 Tage</span>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((r) => {
          const color = BAND_COLOR[volumeBand(r.sets)]
          return (
            <div key={r.muscle} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-sm text-[var(--color-ink-muted)]">
                {MUSCLE_LABELS[r.muscle]}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${Math.max(6, (r.sets / max) * 100)}%`, backgroundColor: color }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-sm font-semibold tabular-nums">
                {r.sets}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-[11px] text-[var(--color-ink-faint)]">
        Orientierung (grün ≈ 8–20 Sätze/Woche), keine medizinische Empfehlung.
      </p>
    </div>
  )
}
