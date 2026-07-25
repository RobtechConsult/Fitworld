import { useState } from 'react'
import type { Plan } from '@/lib/types'

type NewPlan = Omit<Plan, 'id' | 'createdAt' | 'days'>

/** Formular zum Anlegen eines Plans (Name + optionale Beschreibung). */
export function PlanForm({ onSubmit }: { onSubmit: (p: NewPlan) => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const canSubmit = name.trim().length > 1

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!canSubmit) return
        onSubmit({ name: name.trim(), description: description.trim() || undefined })
      }}
      className="flex flex-col gap-4"
    >
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">Name</span>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z. B. Push / Pull / Legs"
          autoFocus
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
          Beschreibung (optional)
        </span>
        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="z. B. 3er-Split, 5× pro Woche"
        />
      </label>
      <button type="submit" className="btn-primary" disabled={!canSubmit}>
        Plan erstellen
      </button>
    </form>
  )
}
