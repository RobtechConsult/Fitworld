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
  const { data, updateSettings, addGym, renameGym, deleteGym, setActiveGym } = useStore()
  const { unit, goalWeightKg, goalBodyFatPct, activeGymId, showAllGyms } = data.settings
  const gyms = data.gyms ?? []

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

      {/* Gyms */}
      <div className="card mt-4 px-4 py-4">
        <h2 className="mb-1 font-semibold">Gyms</h2>
        <p className="mb-3 text-sm text-[var(--color-ink-muted)]">
          Jedes Gym führt eigene Gewichte (z. B. unterschiedliche Maschinen). Im Training werden
          die Werte des aktiven Gyms vorbelegt.
        </p>

        <label className="mb-3 flex items-center justify-between">
          <span className="text-sm text-[var(--color-ink-muted)]">
            Alle Gyms zusammen betrachten
          </span>
          <button
            onClick={() => updateSettings({ showAllGyms: !showAllGyms })}
            className={[
              'h-6 w-11 rounded-full p-0.5 transition-colors',
              showAllGyms ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]',
            ].join(' ')}
            aria-label="Alle Gyms"
          >
            <span
              className={[
                'block h-5 w-5 rounded-full bg-white transition-transform',
                showAllGyms ? 'translate-x-5' : '',
              ].join(' ')}
            />
          </button>
        </label>

        {gyms.length === 0 ? (
          <p className="text-sm text-[var(--color-ink-faint)]">Noch kein Gym angelegt.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {gyms.map((g) => {
              const active = !showAllGyms && activeGymId === g.id
              return (
                <div
                  key={g.id}
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-2)] px-3 py-2"
                >
                  <button
                    onClick={() => {
                      setActiveGym(g.id)
                      updateSettings({ showAllGyms: false })
                    }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="block truncate font-medium">{g.name}</span>
                    <span className="text-xs text-[var(--color-ink-faint)]">
                      {active ? 'aktiv' : 'antippen zum Aktivieren'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const name = window.prompt('Gym umbenennen', g.name)?.trim()
                      if (name) renameGym(g.id, name)
                    }}
                    className="chip"
                  >
                    Umbenennen
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Gym „${g.name}" löschen? Einheiten bleiben erhalten.`))
                        deleteGym(g.id)
                    }}
                    className="chip text-[var(--color-danger)]"
                  >
                    Löschen
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <button
          onClick={() => {
            const name = window.prompt('Name des neuen Gyms')?.trim()
            if (!name) return
            const created = addGym(name)
            setActiveGym(created.id)
            updateSettings({ showAllGyms: false })
          }}
          className="btn-ghost mt-3 w-full !py-2 !text-sm"
        >
          + Gym hinzufügen
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Aktuell: Gewichte in {unit === 'imperial' ? 'lbs' : 'kg'}
      </p>
    </div>
  )
}
