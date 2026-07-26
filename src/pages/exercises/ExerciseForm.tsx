import { useState } from 'react'
import type {
  Equipment,
  Exercise,
  ExerciseCategory,
  MuscleGroup,
} from '@/lib/types'
import { CATEGORY_LABELS, EQUIPMENT_LABELS, MUSCLE_LABELS, MUSCLE_ORDER } from '@/data/muscleGroups'

type NewExercise = Omit<Exercise, 'id' | 'isCustom' | 'createdAt'>

const CATEGORIES: ExerciseCategory[] = ['compound', 'isolation', 'cardio', 'mobility']
const EQUIPMENTS: Equipment[] = [
  'barbell',
  'dumbbell',
  'machine',
  'cable',
  'bodyweight',
  'kettlebell',
  'band',
  'other',
]

/** Formular zum Anlegen einer eigenen Übung. */
export function ExerciseForm({ onSubmit }: { onSubmit: (ex: NewExercise) => void }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<ExerciseCategory>('compound')
  const [equipment, setEquipment] = useState<Equipment>('barbell')
  const [primary, setPrimary] = useState<Set<MuscleGroup>>(new Set())
  const [instructions, setInstructions] = useState('')

  const togglePrimary = (m: MuscleGroup) =>
    setPrimary((prev) => {
      const next = new Set(prev)
      if (next.has(m)) next.delete(m)
      else next.add(m)
      return next
    })

  const canSubmit = name.trim().length > 1 && primary.size > 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!canSubmit) return
        onSubmit({
          name: name.trim(),
          category,
          equipment,
          primaryMuscles: [...primary],
          secondaryMuscles: [],
          instructions: instructions.trim() || undefined,
        })
      }}
      className="flex flex-col gap-4"
    >
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">Name</span>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z. B. Frontdrücken"
          autoFocus
        />
      </label>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-muted)]">
          Primäre Muskelgruppen
        </span>
        <div className="flex flex-wrap gap-1.5">
          {MUSCLE_ORDER.map((m) => {
            const active = primary.has(m)
            return (
              <button
                type="button"
                key={m}
                onClick={() => togglePrimary(m)}
                className={[
                  'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                  active
                    ? 'brand-gradient border-transparent text-white'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
                ].join(' ')}
              >
                {MUSCLE_LABELS[m]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">Typ</span>
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExerciseCategory)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            Gerät
          </span>
          <select
            className="input"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value as Equipment)}
          >
            {EQUIPMENTS.map((eq) => (
              <option key={eq} value={eq}>
                {EQUIPMENT_LABELS[eq]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
          Ausführung (optional)
        </span>
        <textarea
          className="input min-h-[72px] resize-y"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Kurzer Hinweis zur sauberen Ausführung"
        />
      </label>

      <button type="submit" className="btn-primary" disabled={!canSubmit}>
        Übung speichern
      </button>
    </form>
  )
}
