import { useRef, useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { Sheet } from '@/components/Sheet'
import { ExercisePicker } from './ExercisePicker'
import { IconChevron, IconPlus, IconTrash } from '@/components/icons'
import { ExerciseThumb } from '@/components/ExerciseThumb'
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

function entryDone(e: WorkoutEntry): boolean {
  return e.sets.length > 0 && e.sets.every((s) => s.completed)
}

export function WorkoutEditor({
  onDone,
  onCancel,
  initialExerciseIds,
  initialName,
}: {
  onDone: (w: Workout) => void
  onCancel: () => void
  /** Übungen, mit denen der Editor vorbefüllt startet (z. B. aus einem Plan-Tag). */
  initialExerciseIds?: string[]
  initialName?: string
}) {
  const { data, exerciseById, addWorkout } = useStore()

  // Progression: letzte Werte dieser Übung vorbelegen (nicht abgeschlossen).
  const seedEntry = (exerciseId: string): WorkoutEntry => {
    const stats = exerciseStats(data.workouts, exerciseId)
    const sets: WorkoutSet[] = stats.lastEntry
      ? stats.lastEntry.sets.map((s) => ({
          reps: s.reps,
          weightKg: s.weightKg,
          rpe: s.rpe,
          completed: false,
        }))
      : [emptySet()]
    return { exerciseId, sets: sets.length ? sets : [emptySet()] }
  }

  const [draft, setDraft] = useState<Draft>(() => {
    const seededIds = [...new Set(initialExerciseIds ?? [])]
    return {
      date: today(),
      name: initialName ?? '',
      entries: seededIds.map(seedEntry),
      notes: '',
    }
  })
  const [picking, setPicking] = useState(false)
  const [rawIdx, setRawIdx] = useState(0)
  const [showMeta, setShowMeta] = useState(true)
  const [showNotes, setShowNotes] = useState(false)

  // aktiver Index sicher in Range halten
  const count = draft.entries.length
  const active = count === 0 ? 0 : Math.min(rawIdx, count - 1)

  const patchDraft = (p: Partial<Draft>) => setDraft((d) => ({ ...d, ...p }))
  const patchEntries = (entries: WorkoutEntry[]) => patchDraft({ entries })

  const addExercise = (exerciseId: string) => {
    setPicking(false)
    if (draft.entries.some((e) => e.exerciseId === exerciseId)) {
      // schon vorhanden -> dorthin springen
      setRawIdx(draft.entries.findIndex((e) => e.exerciseId === exerciseId))
      return
    }
    patchEntries([...draft.entries, seedEntry(exerciseId)])
    setRawIdx(draft.entries.length) // neue Übung = letzter Index
  }

  const updateSet = (ei: number, si: number, p: Partial<WorkoutSet>) => {
    patchEntries(
      draft.entries.map((entry, i) =>
        i !== ei
          ? entry
          : { ...entry, sets: entry.sets.map((s, j) => (j === si ? { ...s, ...p } : s)) },
      ),
    )
  }

  const addSet = (ei: number) => {
    patchEntries(
      draft.entries.map((entry, i) => {
        if (i !== ei) return entry
        const last = entry.sets[entry.sets.length - 1]
        const next: WorkoutSet = last
          ? { reps: last.reps, weightKg: last.weightKg, rpe: last.rpe, completed: false }
          : emptySet()
        return { ...entry, sets: [...entry.sets, next] }
      }),
    )
  }

  const removeSet = (ei: number, si: number) => {
    patchEntries(
      draft.entries.map((entry, i) =>
        i === ei ? { ...entry, sets: entry.sets.filter((_, j) => j !== si) } : entry,
      ),
    )
  }

  const removeExercise = (ei: number) => {
    patchEntries(draft.entries.filter((_, i) => i !== ei))
    setRawIdx((idx) => Math.max(0, Math.min(idx, count - 2)))
  }

  const completedSets = draft.entries.reduce(
    (n, e) => n + e.sets.filter((s) => s.completed).length,
    0,
  )
  const canSave = draft.entries.length > 0 && draft.entries.some((e) => e.sets.length > 0)

  const save = () => {
    if (!canSave) return
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

  // Wisch-Gesten zum Übungswechsel
  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0 && active < count - 1) setRawIdx(active + 1)
      if (dx > 0 && active > 0) setRawIdx(active - 1)
    }
    touchX.current = null
  }

  const entry = draft.entries[active]
  const ex = entry ? exerciseById(entry.exerciseId) : undefined
  const stats = entry ? exerciseStats(data.workouts, entry.exerciseId) : undefined

  return (
    <div>
      {/* Kopf: Abbrechen · Fortschritt · Speichern */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <button className="btn-ghost !px-3 !py-2" onClick={onCancel}>
          Abbrechen
        </button>
        {count > 0 && (
          <span className="text-sm font-medium text-[var(--color-ink-muted)]">
            Übung {active + 1}/{count}
          </span>
        )}
        <button className="btn-primary" onClick={save} disabled={!canSave}>
          Speichern
        </button>
      </div>

      {/* Meta (Datum/Name) – einklappbar, um Platz für die Übung zu schaffen */}
      <div className="card mb-3 px-4 py-3">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setShowMeta((v) => !v)}
        >
          <span className="text-sm font-medium text-[var(--color-ink-muted)]">
            {draft.name.trim() || 'Einheit'} · {draft.date.split('-').reverse().join('.')}
          </span>
          <IconChevron
            width={18}
            height={18}
            className={[
              'text-[var(--color-ink-faint)] transition-transform',
              showMeta ? 'rotate-90' : '',
            ].join(' ')}
          />
        </button>
        {showMeta && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-[var(--color-ink-muted)]">
                Datum
              </span>
              <input
                type="date"
                className="input !py-2"
                value={draft.date}
                onChange={(e) => patchDraft({ date: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-[var(--color-ink-muted)]">
                Name
              </span>
              <input
                className="input !py-2"
                placeholder="z. B. Push A"
                value={draft.name}
                onChange={(e) => patchDraft({ name: e.target.value })}
              />
            </label>
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className="card mt-2 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold">Erste Übung hinzufügen</h2>
          <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">
            Wähle Übungen aus deiner Datenbank. Danach wischst du im Training bequem zwischen ihnen.
          </p>
          <button className="btn-primary mt-1" onClick={() => setPicking(true)}>
            <IconPlus width={18} height={18} />
            Übung wählen
          </button>
        </div>
      ) : (
        <>
          {/* Übungs-Streifen: Bild-Thumbnails, aktive Übung größer/hervorgehoben */}
          <div className="-mx-4 mb-3 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {draft.entries.map((e, i) => {
              const name = exerciseById(e.exerciseId)?.name ?? 'Übung'
              const done = entryDone(e)
              const isActive = i === active
              return (
                <button
                  key={e.exerciseId}
                  onClick={() => setRawIdx(i)}
                  aria-label={name}
                  className="relative shrink-0 transition-transform"
                >
                  <ExerciseThumb
                    exerciseId={e.exerciseId}
                    size={isActive ? 60 : 50}
                    className={
                      isActive
                        ? 'ring-2 ring-[var(--color-brand)] ring-offset-2 ring-offset-[var(--color-bg)]'
                        : 'opacity-55'
                    }
                  />
                  <span
                    className={[
                      'absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold',
                      done
                        ? 'bg-[var(--color-positive)] text-black'
                        : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)]',
                    ].join(' ')}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                </button>
              )
            })}
            <button
              onClick={() => setPicking(true)}
              aria-label="Übung hinzufügen"
              className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-xl border border-dashed border-[var(--color-border)] text-[var(--color-ink-muted)]"
            >
              <IconPlus width={18} height={18} />
            </button>
          </div>

          {/* Aktive Übung */}
          {entry && (
            <div className="card px-4 py-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-start gap-3">
                  <ExerciseThumb exerciseId={entry.exerciseId} size={52} />
                  <div className="min-w-0">
                  <p className="text-lg font-semibold leading-tight">
                    {ex?.name ?? 'Unbekannte Übung'}
                  </p>
                  {stats?.lastEntry && (
                    <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                      Letztes Mal ({stats.lastEntry.date.split('-').reverse().join('.')}):{' '}
                      {summarizeEntry({ exerciseId: entry.exerciseId, sets: stats.lastEntry.sets })}
                      {stats.best1RMKg > 0 && ` · 1RM≈${Math.round(stats.best1RMKg)} kg`}
                    </p>
                  )}
                  </div>
                </div>
                <button
                  onClick={() => removeExercise(active)}
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
                    <span className="text-center text-sm text-[var(--color-ink-muted)]">{si + 1}</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      className="input !px-2 !py-1.5 text-center"
                      value={s.reps || ''}
                      onChange={(e) => updateSet(active, si, { reps: Number(e.target.value) || 0 })}
                      onFocus={(e) => e.target.select()}
                    />
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step={0.5}
                      className="input !px-2 !py-1.5 text-center"
                      value={s.weightKg || ''}
                      onChange={(e) => updateSet(active, si, { weightKg: Number(e.target.value) || 0 })}
                      onFocus={(e) => e.target.select()}
                    />
                    <button
                      onClick={() => updateSet(active, si, { completed: !s.completed })}
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
                <button className="btn-ghost !py-1.5 !text-xs" onClick={() => addSet(active)}>
                  <IconPlus width={14} height={14} />
                  Satz
                </button>
                {entry.sets.length > 1 && (
                  <button
                    className="btn-ghost !py-1.5 !text-xs text-[var(--color-ink-muted)]"
                    onClick={() => removeSet(active, entry.sets.length - 1)}
                  >
                    Letzten Satz entfernen
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Weiter / Zurück */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              className="btn-ghost !px-3 disabled:opacity-40"
              onClick={() => setRawIdx(active - 1)}
              disabled={active === 0}
            >
              <IconChevron width={18} height={18} className="rotate-180" />
              Zurück
            </button>

            <div className="flex items-center gap-1.5">
              {draft.entries.map((_, i) => (
                <span
                  key={i}
                  className={[
                    'h-1.5 rounded-full transition-all',
                    i === active ? 'w-5 bg-[var(--color-brand)]' : 'w-1.5 bg-[var(--color-border)]',
                  ].join(' ')}
                />
              ))}
            </div>

            <button
              className="btn-ghost !px-3 disabled:opacity-40"
              onClick={() => setRawIdx(active + 1)}
              disabled={active >= count - 1}
            >
              Weiter
              <IconChevron width={18} height={18} />
            </button>
          </div>
        </>
      )}

      {/* Notiz zur Einheit – einklappbar */}
      <div className="card mt-4 px-4 py-3">
        <button
          className="flex w-full items-center justify-between text-left text-sm font-medium text-[var(--color-ink-muted)]"
          onClick={() => setShowNotes((v) => !v)}
        >
          Notiz zur Einheit {draft.notes.trim() ? '• ausgefüllt' : '(optional)'}
          <IconChevron
            width={18}
            height={18}
            className={['text-[var(--color-ink-faint)] transition-transform', showNotes ? 'rotate-90' : ''].join(' ')}
          />
        </button>
        {showNotes && (
          <textarea
            className="input mt-3 min-h-[64px] resize-y"
            placeholder="Wie lief die Einheit?"
            value={draft.notes}
            onChange={(e) => patchDraft({ notes: e.target.value })}
          />
        )}
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
