import { useMemo, useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { IconSearch } from '@/components/icons'
import { MUSCLE_LABELS, MUSCLE_ORDER, EQUIPMENT_LABELS } from '@/data/muscleGroups'
import type { MuscleGroup } from '@/lib/types'

/** Auswahl-Liste (im Sheet) zum Hinzufügen einer Übung zu einer Einheit. */
export function ExercisePicker({ onPick }: { onPick: (exerciseId: string) => void }) {
  const { allExercises } = useStore()
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allExercises.filter((ex) => {
      if (
        muscle !== 'all' &&
        !ex.primaryMuscles.includes(muscle) &&
        !ex.secondaryMuscles.includes(muscle)
      )
        return false
      if (q && !ex.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [allExercises, query, muscle])

  return (
    <div>
      <div className="relative mb-3">
        <IconSearch
          width={18}
          height={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]"
        />
        <input
          className="input pl-10"
          placeholder="Übung suchen …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="-mx-1 mb-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <PickChip label="Alle" active={muscle === 'all'} onClick={() => setMuscle('all')} />
        {MUSCLE_ORDER.map((m) => (
          <PickChip
            key={m}
            label={MUSCLE_LABELS[m]}
            active={muscle === m}
            onClick={() => setMuscle(m)}
          />
        ))}
      </div>

      <div className="flex max-h-[52vh] flex-col gap-2 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--color-ink-muted)]">
            Keine Übung gefunden.
          </p>
        ) : (
          filtered.map((ex) => (
            <button
              key={ex.id}
              onClick={() => onPick(ex.id)}
              className="card card-hover px-4 py-3 text-left"
            >
              <span className="block font-semibold">{ex.name}</span>
              <span className="block truncate text-sm text-[var(--color-ink-muted)]">
                {ex.primaryMuscles.map((m) => MUSCLE_LABELS[m]).join(', ')} ·{' '}
                {EQUIPMENT_LABELS[ex.equipment]}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

function PickChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'brand-gradient border-transparent text-white'
          : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
