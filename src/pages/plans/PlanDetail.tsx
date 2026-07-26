import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { Sheet } from '@/components/Sheet'
import { ExercisePicker } from '@/pages/workouts/ExercisePicker'
import { IconPlus, IconTrash } from '@/components/icons'
import { newId } from '@/lib/storage'
import type { Plan, PlanDay } from '@/lib/types'

/** Detailansicht eines Plans: Tage & Übungen verwalten, Workout starten. */
export function PlanDetail({ plan, onBack }: { plan: Plan; onBack: () => void }) {
  const { data, exerciseById, updatePlan, deletePlan, startWorkoutFrom, setActivePlan } = useStore()
  const navigate = useNavigate()
  const isActive = data.settings.activePlanId === plan.id
  const [newDayName, setNewDayName] = useState('')
  const [pickForDay, setPickForDay] = useState<string | null>(null)

  const setDays = (days: PlanDay[]) => updatePlan(plan.id, { days })

  const addDay = () => {
    const name = newDayName.trim()
    if (!name) return
    setDays([...plan.days, { id: newId('day'), name, exercises: [] }])
    setNewDayName('')
  }

  const removeDay = (dayId: string) => setDays(plan.days.filter((d) => d.id !== dayId))

  const addExerciseToDay = (dayId: string, exerciseId: string) => {
    setPickForDay(null)
    setDays(
      plan.days.map((d) => {
        if (d.id !== dayId) return d
        if (d.exercises.some((e) => e.exerciseId === exerciseId)) return d
        return {
          ...d,
          exercises: [
            ...d.exercises,
            { exerciseId, targetSets: 3, targetRepsMin: 8, targetRepsMax: 12 },
          ],
        }
      }),
    )
  }

  const removeExercise = (dayId: string, exerciseId: string) =>
    setDays(
      plan.days.map((d) =>
        d.id === dayId
          ? { ...d, exercises: d.exercises.filter((e) => e.exerciseId !== exerciseId) }
          : d,
      ),
    )

  const patchExercise = (
    dayId: string,
    exerciseId: string,
    patch: Partial<PlanDay['exercises'][number]>,
  ) =>
    setDays(
      plan.days.map((d) =>
        d.id === dayId
          ? {
              ...d,
              exercises: d.exercises.map((e) =>
                e.exerciseId === exerciseId ? { ...e, ...patch } : e,
              ),
            }
          : d,
      ),
    )

  const startDay = (day: PlanDay) => {
    if (day.exercises.length === 0) return
    startWorkoutFrom(
      day.exercises.map((e) => e.exerciseId),
      `${plan.name} · ${day.name}`,
    )
    navigate('/workouts')
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button className="btn-ghost !px-3 !py-2" onClick={onBack}>
          ← Zurück
        </button>
        <button
          className="btn-ghost !px-3 !py-2 text-[var(--color-danger)] hover:border-[var(--color-danger)]/50"
          onClick={() => {
            if (confirm('Diesen Plan löschen?')) {
              deletePlan(plan.id)
              onBack()
            }
          }}
        >
          <IconTrash width={16} height={16} />
          Plan löschen
        </button>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">{plan.name}</h1>
        {isActive && (
          <span className="rounded-full bg-[var(--color-brand)]/20 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-2)]">
            AKTIV
          </span>
        )}
      </div>
      {plan.description && (
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{plan.description}</p>
      )}
      {!isActive && (
        <button className="btn-ghost mt-3 !py-2 !text-sm" onClick={() => setActivePlan(plan.id)}>
          Als aktiven Plan setzen
        </button>
      )}

      <div className="mt-5 flex flex-col gap-4">
        {plan.days.map((day) => (
          <div key={day.id} className="card px-4 py-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="font-semibold">{day.name}</h2>
              <button
                onClick={() => removeDay(day.id)}
                className="rounded-lg p-1 text-[var(--color-ink-faint)] hover:text-[var(--color-danger)]"
                aria-label="Tag entfernen"
              >
                <IconTrash width={16} height={16} />
              </button>
            </div>

            {day.exercises.length === 0 ? (
              <p className="text-sm text-[var(--color-ink-muted)]">Noch keine Übung in diesem Tag.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {day.exercises.map((e) => (
                  <div
                    key={e.exerciseId}
                    className="rounded-xl bg-[var(--color-surface-2)] px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate font-medium">
                        {exerciseById(e.exerciseId)?.name ?? 'Unbekannte Übung'}
                      </span>
                      <button
                        onClick={() => removeExercise(day.id, e.exerciseId)}
                        className="shrink-0 rounded-lg p-1 text-[var(--color-ink-faint)] hover:text-[var(--color-danger)]"
                        aria-label="Übung entfernen"
                      >
                        <IconTrash width={14} height={14} />
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                      <NumBox
                        label="Sätze"
                        value={e.targetSets}
                        onChange={(v) => patchExercise(day.id, e.exerciseId, { targetSets: v })}
                      />
                      <span>×</span>
                      <NumBox
                        label="Wdh von"
                        value={e.targetRepsMin}
                        onChange={(v) => patchExercise(day.id, e.exerciseId, { targetRepsMin: v })}
                      />
                      <span>–</span>
                      <NumBox
                        label="bis"
                        value={e.targetRepsMax}
                        onChange={(v) => patchExercise(day.id, e.exerciseId, { targetRepsMax: v })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-ghost !py-1.5 !text-xs" onClick={() => setPickForDay(day.id)}>
                <IconPlus width={14} height={14} />
                Übung
              </button>
              <button
                className="btn-primary !py-1.5 !text-xs"
                onClick={() => startDay(day)}
                disabled={day.exercises.length === 0}
              >
                Workout aus diesem Tag starten
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Neuen Tag hinzufügen */}
      <div className="card mt-4 flex items-end gap-2 px-4 py-4">
        <label className="block flex-1">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            Neuer Tag
          </span>
          <input
            className="input"
            placeholder="z. B. Push"
            value={newDayName}
            onChange={(e) => setNewDayName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addDay()}
          />
        </label>
        <button className="btn-ghost" onClick={addDay} disabled={!newDayName.trim()}>
          <IconPlus width={18} height={18} />
        </button>
      </div>

      <Sheet
        open={pickForDay !== null}
        onClose={() => setPickForDay(null)}
        title="Übung zum Tag hinzufügen"
      >
        {pickForDay && (
          <ExercisePicker onPick={(exId) => addExerciseToDay(pickForDay, exId)} />
        )}
      </Sheet>
    </div>
  )
}

/** Kompaktes Zahlenfeld für Ziel-Sätze/Wdh. */
function NumBox({
  label,
  value,
  onChange,
}: {
  label: string
  value?: number
  onChange: (v: number | undefined) => void
}) {
  return (
    <input
      aria-label={label}
      inputMode="numeric"
      className="input !w-12 !px-1.5 !py-1 text-center"
      value={value ?? ''}
      onChange={(e) => {
        const v = e.target.value.trim()
        onChange(v === '' ? undefined : Number(v) || 0)
      }}
      onFocus={(e) => e.target.select()}
    />
  )
}
