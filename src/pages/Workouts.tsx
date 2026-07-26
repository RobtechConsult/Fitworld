import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import type { PendingStart } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { Sheet } from '@/components/Sheet'
import { WorkoutEditor } from './workouts/WorkoutEditor'
import { IconPlus, IconTrash } from '@/components/icons'
import { summarizeEntry } from '@/lib/metrics'
import { workoutVolumeKg } from '@/lib/dataFormat'
import type { Workout } from '@/lib/types'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}.${m}.${y}`
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

export function Workouts() {
  const { data, exerciseById, deleteWorkout, startWorkoutFrom, pendingStart, clearPendingStart } =
    useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'list' | 'edit'>('list')
  const [selected, setSelected] = useState<Workout | null>(null)
  const [initial, setInitial] = useState<PendingStart | null>(null)

  // „Workout aus Plan-Tag starten": Editor vorbefüllt öffnen.
  useEffect(() => {
    if (pendingStart) {
      setInitial(pendingStart)
      setMode('edit')
      clearPendingStart()
    }
  }, [pendingStart, clearPendingStart])

  const closeEditor = () => {
    setInitial(null)
    setMode('list')
  }

  const workouts = useMemo(
    () =>
      [...data.workouts].sort(
        (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
      ),
    [data.workouts],
  )

  if (mode === 'edit') {
    return (
      <div>
        <PageHeader
          title="Neue Einheit"
          subtitle={initial ? 'Aus Plan-Tag vorbefüllt' : 'Sätze, Wiederholungen, Gewicht'}
        />
        <WorkoutEditor
          initialExerciseIds={initial?.exerciseIds}
          initialName={initial?.name}
          onDone={closeEditor}
          onCancel={closeEditor}
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Training"
        subtitle={
          workouts.length ? `${plural(workouts.length, 'Einheit', 'Einheiten')} getrackt` : 'Noch keine Einheit'
        }
        action={
          <button className="btn-primary !px-3" onClick={() => { setInitial(null); setMode('edit') }}>
            <IconPlus width={18} height={18} />
            Neu
          </button>
        }
      />

      {workouts.length === 0 ? (
        <div className="card mt-2 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold">Starte deine erste Einheit</h2>
          <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">
            Wähle Übungen aus deiner Datenbank und logge Sätze, Wiederholungen und Gewicht. Deine
            Bestwerte und dein Volumen werden automatisch berechnet.
          </p>
          <button className="btn-primary mt-1" onClick={() => { setInitial(null); setMode('edit') }}>
            <IconPlus width={18} height={18} />
            Einheit starten
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map((w) => {
            const totalSets = w.entries.reduce(
              (n, e) => n + e.sets.filter((s) => s.completed).length,
              0,
            )
            return (
              <button
                key={w.id}
                onClick={() => setSelected(w)}
                className="card card-hover px-4 py-3.5 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{w.name || 'Training'}</span>
                  <span className="text-sm text-[var(--color-ink-muted)]">{formatDate(w.date)}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="chip">{plural(w.entries.length, 'Übung', 'Übungen')}</span>
                  <span className="chip">{plural(totalSets, 'Satz', 'Sätze')}</span>
                  <span className="chip text-[var(--color-brand-2)]">
                    {workoutVolumeKg(w).toLocaleString('de-DE')} kg Volumen
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? selected.name || 'Training' : ''}
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5">
              <span className="chip">{formatDate(selected.date)}</span>
              <span className="chip">{plural(selected.entries.length, 'Übung', 'Übungen')}</span>
              <span className="chip text-[var(--color-brand-2)]">
                {workoutVolumeKg(selected).toLocaleString('de-DE')} kg Volumen
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {selected.entries.map((entry, i) => (
                <div key={i} className="rounded-xl bg-[var(--color-surface-2)] px-3.5 py-2.5">
                  <p className="font-medium">
                    {exerciseById(entry.exerciseId)?.name ?? 'Unbekannte Übung'}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-ink-muted)]">
                    {summarizeEntry(entry)}
                  </p>
                </div>
              ))}
            </div>

            {selected.notes && (
              <p className="rounded-xl bg-[var(--color-surface-2)] px-3.5 py-2.5 text-sm text-[var(--color-ink-muted)]">
                {selected.notes}
              </p>
            )}

            <button
              className="btn-primary"
              onClick={() => {
                startWorkoutFrom(
                  selected.entries.map((e) => e.exerciseId),
                  selected.name || 'Wiederholung',
                )
                navigate('/workouts')
                setSelected(null)
                setMode('list')
              }}
            >
              <IconPlus width={18} height={18} />
              Training wiederholen
            </button>
            <button
              onClick={() => {
                if (confirm('Diese Einheit löschen?')) {
                  deleteWorkout(selected.id)
                  setSelected(null)
                }
              }}
              className="btn-ghost text-[var(--color-danger)] hover:border-[var(--color-danger)]/50"
            >
              <IconTrash width={18} height={18} />
              Einheit löschen
            </button>
          </div>
        )}
      </Sheet>
    </div>
  )
}
