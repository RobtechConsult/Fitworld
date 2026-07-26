import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { fromKg, toKg, weightLabel } from '@/lib/units'
import type { Settings as SettingsType } from '@/lib/types'

const UNITS: Array<{ key: SettingsType['unit']; label: string; hint: string }> = [
  { key: 'metric', label: 'Kilogramm (kg)', hint: 'metrisch' },
  { key: 'imperial', label: 'Pfund (lbs)', hint: 'imperial' },
]

/** Zahl aus Eingabe (Komma erlaubt) oder undefined. */
function num(v: string): number | undefined {
  const s = v.replace(',', '.').trim()
  if (s === '') return undefined
  const n = Number(s)
  return Number.isFinite(n) && n > 0 ? n : undefined
}

export function Settings() {
  const { data, updateSettings } = useStore()
  const { unit, goalWeightKg, goalBodyFatPct } = data.settings

  const goalWeightValue = goalWeightKg != null ? fromKg(goalWeightKg, unit) : ''

  return (
    <div>
      <PageHeader title="Einstellungen" subtitle="App-Präferenzen" />

      {/* Einheit */}
      <div className="card px-4 py-4">
        <h2 className="mb-1 font-semibold">Gewichtseinheit</h2>
        <p className="mb-3 text-sm text-[var(--color-ink-muted)]">
          Bestimmt, wie Gewichte angezeigt und eingegeben werden. Deine Daten bleiben intern gleich
          – es wird nur umgerechnet.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {UNITS.map((u) => {
            const active = unit === u.key
            return (
              <button
                key={u.key}
                onClick={() => updateSettings({ unit: u.key })}
                className={[
                  'rounded-xl border px-3 py-3 text-center transition-colors',
                  active
                    ? 'brand-gradient border-transparent text-white'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
                ].join(' ')}
              >
                <span className="block font-semibold">{u.label}</span>
                <span className={active ? 'text-xs text-white/80' : 'text-xs text-[var(--color-ink-faint)]'}>
                  {u.hint}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Ziele */}
      <div className="card mt-4 px-4 py-4">
        <h2 className="mb-1 font-semibold">Ziele</h2>
        <p className="mb-3 text-sm text-[var(--color-ink-muted)]">
          Ziel-Werte erscheinen als Linie in den Fortschritts-Graphen. Leer lassen zum Deaktivieren.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
              Zielgewicht ({weightLabel(unit)})
            </span>
            <input
              inputMode="decimal"
              className="input"
              placeholder={unit === 'imperial' ? 'z. B. 176' : 'z. B. 80'}
              value={goalWeightValue}
              onChange={(e) => {
                const v = num(e.target.value)
                updateSettings({ goalWeightKg: v != null ? toKg(v, unit) : undefined })
              }}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-[var(--color-ink-muted)]">
              Ziel-KFA (%)
            </span>
            <input
              inputMode="decimal"
              className="input"
              placeholder="z. B. 15"
              value={goalBodyFatPct ?? ''}
              onChange={(e) => updateSettings({ goalBodyFatPct: num(e.target.value) })}
            />
          </label>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Aktuell: Gewichte in {unit === 'imperial' ? 'lbs' : 'kg'}
      </p>
    </div>
  )
}
