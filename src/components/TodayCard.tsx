import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { ExerciseThumb } from '@/components/ExerciseThumb'
import { nextPlanDay, prescribeDay } from '@/lib/training'
import { fromKg, weightLabel } from '@/lib/units'
import type { Plan } from '@/lib/types'

/**
 * „Heute dran" – die Tagesplan-Engine bereitet den fälligen Plan-Tag mit
 * autoregulierten Zielwerten vor; ein Tipp startet das vorbefüllte Training.
 */
export function TodayCard({ plan }: { plan: Plan }) {
  const { data, exerciseById, startWorkoutFrom } = useStore()
  const navigate = useNavigate()
  const unit = data.settings.unit

  const day = nextPlanDay(plan, data.workouts)
  if (!day || day.exercises.length === 0) return null

  const presc = prescribeDay(day, data.workouts, data.settings.exerciseConfig)

  const start = () => {
    startWorkoutFrom(
      day.exercises.map((e) => e.exerciseId),
      `${plan.name} · ${day.name}`,
      Object.fromEntries(
        presc.map((p) => [p.exerciseId, { sets: p.sets, reps: p.reps, weightKg: p.weightKg }]),
      ),
    )
    navigate('/workouts')
  }

  const fmtW = (kg: number) =>
    kg > 0
      ? `${fromKg(kg, unit).toLocaleString('de-DE', { maximumFractionDigits: 1 })} ${weightLabel(unit)}`
      : '—'

  return (
    <div className="card mb-3 overflow-hidden">
      <div className="brand-gradient px-4 py-3 text-white">
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-90">Heute dran</p>
        <h2 className="text-lg font-bold leading-tight">{day.name}</h2>
      </div>

      <div className="flex flex-col">
        {presc.map((p) => {
          const ex = exerciseById(p.exerciseId)
          return (
            <div
              key={p.exerciseId}
              className="flex items-center gap-3 border-t border-[var(--color-border)] px-4 py-2.5"
            >
              <ExerciseThumb exerciseId={p.exerciseId} size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{ex?.name ?? 'Übung'}</p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Ziel: {p.sets}×{p.reps} · {fmtW(p.weightKg)}
                </p>
              </div>
              {p.note === 'hoch' && (
                <span className="chip shrink-0 text-[var(--color-positive)]">↑ Steigerung</span>
              )}
              {p.note === 'neu' && (
                <span className="chip shrink-0 text-[var(--color-ink-muted)]">neu</span>
              )}
            </div>
          )
        })}
      </div>

      <div className="p-4">
        <button onClick={start} className="btn-primary w-full">
          Training starten
        </button>
      </div>
    </div>
  )
}
