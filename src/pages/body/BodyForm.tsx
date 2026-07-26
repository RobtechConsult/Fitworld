import { useState } from 'react'
import { MEASUREMENTS } from '@/data/measurements'
import { toKg, weightLabel } from '@/lib/units'
import { todayIso } from '@/lib/date'
import type { BodyMetric, Settings } from '@/lib/types'

type NewMetric = Omit<BodyMetric, 'id' | 'createdAt'>

/** Zahl aus Eingabe (Komma erlaubt) oder undefined. */
function num(v: string): number | undefined {
  const s = v.replace(',', '.').trim()
  if (s === '') return undefined
  const n = Number(s)
  return Number.isFinite(n) ? n : undefined
}

export function BodyForm({
  unit,
  onSubmit,
}: {
  unit: Settings['unit']
  onSubmit: (m: NewMetric) => void
}) {
  const [date, setDate] = useState(todayIso())
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [note, setNote] = useState('')
  const [showMeasures, setShowMeasures] = useState(false)
  const [measures, setMeasures] = useState<Record<string, string>>({})

  const weightInput = num(weight)
  const weightKg = weightInput != null ? toKg(weightInput, unit) : undefined
  const bodyFatPct = num(bodyFat)
  const measurementsCm = Object.fromEntries(
    Object.entries(measures)
      .map(([k, v]) => [k, num(v)])
      .filter(([, v]) => v != null),
  ) as Record<string, number>

  const hasAny =
    weightKg != null || bodyFatPct != null || Object.keys(measurementsCm).length > 0

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!hasAny) return
        onSubmit({
          date,
          weightKg,
          bodyFatPct,
          measurementsCm: Object.keys(measurementsCm).length ? measurementsCm : undefined,
          note: note.trim() || undefined,
        })
      }}
      className="flex flex-col gap-4"
    >
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">Datum</span>
        <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            Gewicht ({weightLabel(unit)})
          </span>
          <input
            inputMode="decimal"
            className="input"
            placeholder={unit === 'imperial' ? 'z. B. 182' : 'z. B. 82,5'}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            autoFocus
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
            KFA (%)
          </span>
          <input
            inputMode="decimal"
            className="input"
            placeholder="z. B. 18"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowMeasures((v) => !v)}
          className="text-sm font-medium text-[var(--color-brand-2)]"
        >
          {showMeasures ? '− Umfänge ausblenden' : '+ Umfänge (optional)'}
        </button>
        {showMeasures && (
          <div className="mt-2 grid grid-cols-2 gap-3">
            {MEASUREMENTS.map((m) => (
              <label key={m.key} className="block">
                <span className="mb-1 block text-xs font-medium text-[var(--color-ink-muted)]">
                  {m.label} (cm)
                </span>
                <input
                  inputMode="decimal"
                  className="input !py-2"
                  value={measures[m.key] ?? ''}
                  onChange={(e) => setMeasures((prev) => ({ ...prev, [m.key]: e.target.value }))}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
          Notiz (optional)
        </span>
        <input
          className="input"
          placeholder="z. B. nüchtern gemessen"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      <button type="submit" className="btn-primary" disabled={!hasAny}>
        Eintrag speichern
      </button>
    </form>
  )
}
