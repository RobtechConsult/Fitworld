import { useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { Sheet } from '@/components/Sheet'
import { ExercisePicker } from './ExercisePicker'
import { IconPlus, IconTrash } from '@/components/icons'
import { exerciseStats, summarizeEntry } from '@/lib/metrics'
import type { Workout, WorkoutEntry, WorkoutSet } from '@/lib/types'

interface Draft {
  date: string
  name: string
  entries: WorkoutEntry[]
  notes: string
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function emptySet(): WorkoutSet {
  return { reps: 8, weightKg: 0, completed: false }
}

export function WorkoutEditor({
  onDone,
  onCancel,
}: {
  onDone: (w: Workout) => void
  onCancel: () => void
}) {
  const { data, exerciseById, addWorkout } = useStore()
  const [draft, setDraft] = useState<Draft>({
    date: today(),
    name: '',
    entries: [],
    notes: '',
  })
  const [picking, setPicking] = useState(false)

  const patchDraft = (p: Partial<Draft>) => setDraft((d) => ({ ...d, ...p }))
  const patchEntries = (entries: WorkoutEntry[]) => patchDraft({ entries })

  const addExercise = (exerciseId: string) => {
    setPicking(false)
    if (draft.entries.some((e) => e.exerciseId === exerciseId)) return
    // Progression: letzte Werte dieser Übung vorbelegen (nicht abgeschlossen).
    const stats = exerciseStats(data.workouts, exerciseId)
    const seededSets: WorkoutSet[] = stats.lastEntry
      ? stats.lastEntry.sets.map((s) => ({
          reps: s.reps,
          weightKg: s.weightKg,
          rpe: s.rpe,
          completed: false,
        }))
      : [emptySet()]
    patchEntries([...draft.entries, { exerciseId, sets: seededSets.length ? seededSets : [emptySet()] }])
  }

  const updateSet = (ei: number, si: number, p: Partial<WorkoutSet>) => {
    const entries = draft.entries.map((entry, i) => {
      if (i !== ei) return entry
      return { ...entry, sets: entry.sets.map((s, j) => (j === si ? { ...s, ...p } : s)) }
    })
    patchEntries(entries)
  }

  const addSet = (ei: number) => {
    const entries = draft.entries.map((entry, i) => {
      if (i !== ei) return entry
      const last = entry.sets[entry.sets.length - 1]
      const next: WorkoutSet = last
        ? { reps: last.reps, weightKg: last.weightKg, rpe: last.rpe, completed: false }
        : emptySet()
      return { ...entry, sets: [...entry.sets, next] }
    })
    patchEntries(entries)
  }

  const removeSet = (ei: number, si: number) => {
    const entries = draft.entries
      .map((entry, i) =>
        i === ei ? { ...entry, sets: entry.sets.filter((_, j) => j !== si) } : entry,
      )
      .filter((entry) => entry.sets.length > 0)
    patchEntries(entries)
  }

  const removeExercise = (ei: number) => patchEntries(draft.entries.filter((_, i) => i !== ei))

  const completedSets = draft.entries.reduce(
    (n, e) => n + e.sets.filter((s) => s.completed).length,
    0,
  )
  const canSave = draft.entries.length > 0 && draft.entries.some((e) => e.sets.length > 0)

  const save = () => {
    if (!canSave) return
    // leere Sätze (0 Wdh und 0 Gewicht, nicht abgeschlossen) verwerfen
    const entries = draft.entries
      .map((e) => ({
        ...e,
        sets: e.sets.filter((s) => s.completed || s.reps > 0 || s.weightKg > 0),
      }))
      .filter((e) => e.sets.length > 0)
    if (entries.length === 0) return
    const created = addWorkout({
      date: draft.date,
      name: draft.name.trim() || undefined,
      entries,
      notes: draft.notes.trim() || undefined,
    })
    onDone(created)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <button className="btn-ghost !px-3 !py-2" onClick={onCancel}>
          Abbrechen
        </button>
        <button className="btn-primary" onClick={save} disabled={!canSave}>
          Speichern
        </button>
      </div>

      <div className="card mb-4 flex flex-col gap-3 px-4 py-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">Datum</span>
          <input
            type="date"
            className="input"
            value={draft.date}
            onChange={(e) => patchDraft({ date: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            Name (optional)
          </span>
          <input
            className="input"
            placeholder="z. B. Push A"
            value={draft.name}
            onChange={(e) => patchDraft({ name: e.target.value })}
          />
        </label>
      </div>

      {draft.entries.length === 0 && (
        <p className="mb-4 text-center text-sm text-[var(--color-ink-muted)]">
          Noch keine Übung. Füge unten die erste hinzu.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {draft.entries.map((entry, ei) => {
          const ex = exerciseById(entry.exerciseId)
          const stats = exerciseStats(data.workouts, entry.exerciseId)
          return (
            <div key={entry.exerciseId} className="card px-4 py-3.5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{ex?.name ?? 'Unbekannte Übung'}</p>
                  {stats.lastEntry && (
                    <p className="mt-0.5 text-xs text-[var(--color-ink-faint)]">
                      Letztes Mal ({stats.lastEntry.date}): {summarizeEntry({ exerciseId: entry.exerciseId, sets: stats.lastEntry.sets })}
                      {stats.best1RMKg > 0 && ` · 1RM≈${Math.round(stats.best1RMKg)} kg`}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeExercise(ei)}
                  className="shrink-0 rounded-lg p-1.5 text-[var(--color-ink-faint)] hover:text-[var(--color-danger)]"
                  aria-label="Übung entfernen"
                >
                  <IconTrash width={18} height={18} />
                </button>
              </div>

              <div className="mb-1 grid grid-cols-[1.6rem_1fr_1fr_2.2rem] items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                <span>#</span>
                <span>Wdh</span>
                <span>kg</span>
                <span className="text-center">✓</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {entry.sets.map((s, si) => (
                  <div
                    key={si}
                    className={[
                      'grid grid-cols-[1.6rem_1fr_1fr_2.2rem] items-center gap-2 rounded-xl px-1 py-1 transition-colors',
                      s.completed ? 'bg-[var(--color-positive)]/10' : '',
                    ].join(' ')}
                  >
                    <span className="text-center text-sm text-[var(--color-ink-muted)]">
                      {si + 1}
                    </span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      className="input !px-2 !py-1.5 text-center"
                      value={s.reps || ''}
                      onChange={(e) => updateSet(ei, si, { reps: Number(e.target.value) || 0 })}
                      onFocus={(e) => e.target.select()}
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.5}
                      className="input !px-2 !py-1.5 text-center"
                      value={s.weightKg || ''}
                      onChange={(e) => updateSet(ei, si, { weightKg: Number(e.target.value) || 0 })}
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      onClick={() => updateSet(ei, si, { completed: !s.completed })}
                      aria-label="Satz abschließen"
                      className={[
                        'mx-auto grid h-8 w-8 place-items-center rounded-lg border text-sm font-bold transition-colors',
                        s.completed
                          ? 'border-transparent bg-[var(--color-positive)] text-black'
                          : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-faint)]',
                      ].join(' ')}
                    >
                      ✓
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-2">
                <button className="btn-ghost !py-1.5 !text-xs" onClick={() => addSet(ei)}>
                  <IconPlus width={14} height={14} />
                  Satz
                </button>
                {entry.sets.length > 1 && (
                  <button
                    className="btn-ghost !py-1.5 !text-xs text-[var(--color-ink-muted)]"
                    onClick={() => removeSet(ei, entry.sets.length - 1)}
                  >
                    Letzten Satz entfernen
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button className="btn-ghost mt-3 w-full" onClick={() => setPicking(true)}>
        <IconPlus width={18} height={18} />
        Übung hinzufügen
      </button>

      <div className="card mt-4 px-4 py-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            Notizen (optional)
          </span>
          <textarea
            className="input min-h-[64px] resize-y"
            placeholder="Wie lief die Einheit?"
            value={draft.notes}
            onChange={(e) => patchDraft({ notes: e.target.value })}
          />
        </label>
      </div>

      <p className="mt-3 text-center text-xs text-[var(--color-ink-faint)]">
        {completedSets} Satz{completedSets === 1 ? '' : 'e'} abgeschlossen
      </p>

      <Sheet open={picking} onClose={() => setPicking(false)} title="Übung wählen">
        <ExercisePicker onPick={addExercise} />
      </Sheet>
    </div>
  )
}
