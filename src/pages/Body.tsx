import { useMemo, useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { Sheet } from '@/components/Sheet'
import { BodyForm } from './body/BodyForm'
import { IconPlus, IconScale, IconTrash } from '@/components/icons'
import { MEASUREMENT_LABELS } from '@/data/measurements'
import type { BodyMetric } from '@/lib/types'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}.${m}.${y}`
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 1 })
}

export function Body() {
  const { data, addBodyMetric, deleteBodyMetric } = useStore()
  const [adding, setAdding] = useState(false)

  const sorted = useMemo(
    () =>
      [...data.bodyMetrics].sort(
        (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
      ),
    [data.bodyMetrics],
  )

  // Gewichts-Trend: neuester vs. vorheriger Eintrag mit Gewicht.
  const weighted = sorted.filter((m) => m.weightKg != null)
  const latest = weighted[0]
  const prev = weighted[1]
  const delta =
    latest?.weightKg != null && prev?.weightKg != null
      ? Math.round((latest.weightKg - prev.weightKg) * 10) / 10
      : null

  const latestFat = sorted.find((m) => m.bodyFatPct != null)

  return (
    <div>
      <PageHeader
        title="Körper-Metriken"
        subtitle="Gewicht, KFA & Umfänge"
        action={
          <button className="btn-primary !px-3" onClick={() => setAdding(true)}>
            <IconPlus width={18} height={18} />
            Neu
          </button>
        }
      />

      {sorted.length === 0 ? (
        <div className="card mt-2 flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient text-white shadow-lg shadow-[var(--color-brand)]/30">
            <IconScale />
          </span>
          <h2 className="text-lg font-semibold">Erster Körper-Eintrag</h2>
          <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">
            Erfasse Gewicht, Körperfettanteil und optional Umfänge. Diese Daten fließen später
            automatisch in dein Status-Hub-Cockpit.
          </p>
          <button className="btn-primary mt-1" onClick={() => setAdding(true)}>
            <IconPlus width={18} height={18} />
            Eintrag anlegen
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="card px-4 py-3.5">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                Aktuelles Gewicht
              </p>
              <p className="mt-1 text-2xl font-bold">
                {latest?.weightKg != null ? `${fmt(latest.weightKg)} kg` : '–'}
              </p>
              {delta != null ? (
                <p
                  className={[
                    'mt-0.5 text-xs font-medium',
                    delta < 0
                      ? 'text-[var(--color-positive)]'
                      : delta > 0
                        ? 'text-[var(--color-warn)]'
                        : 'text-[var(--color-ink-muted)]',
                  ].join(' ')}
                >
                  {delta > 0 ? '▲' : delta < 0 ? '▼' : '■'} {fmt(Math.abs(delta))} kg seit letztem
                </p>
              ) : (
                latest && (
                  <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
                    Stand {formatDate(latest.date)}
                  </p>
                )
              )}
            </div>

            <div className="card px-4 py-3.5">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                Körperfett
              </p>
              <p className="mt-1 text-2xl font-bold">
                {latestFat?.bodyFatPct != null ? `${fmt(latestFat.bodyFatPct)} %` : '–'}
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">
                {latestFat ? `Stand ${formatDate(latestFat.date)}` : 'noch kein Wert'}
              </p>
            </div>
          </div>

          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
            Verlauf
          </h2>
          <div className="flex flex-col gap-2">
            {sorted.map((m) => (
              <BodyRow key={m.id} m={m} onDelete={deleteBodyMetric} />
            ))}
          </div>
        </>
      )}

      <Sheet open={adding} onClose={() => setAdding(false)} title="Körper-Eintrag">
        <BodyForm
          onSubmit={(m) => {
            addBodyMetric(m)
            setAdding(false)
          }}
        />
      </Sheet>
    </div>
  )
}

function BodyRow({ m, onDelete }: { m: BodyMetric; onDelete: (id: string) => void }) {
  const measures = m.measurementsCm ? Object.entries(m.measurementsCm) : []
  return (
    <div className="card px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-[var(--color-ink-muted)]">{formatDate(m.date)}</span>
        <button
          onClick={() => {
            if (confirm('Diesen Eintrag löschen?')) onDelete(m.id)
          }}
          className="rounded-lg p-1 text-[var(--color-ink-faint)] hover:text-[var(--color-danger)]"
          aria-label="Eintrag löschen"
        >
          <IconTrash width={16} height={16} />
        </button>
      </div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {m.weightKg != null && (
          <span className="chip text-[var(--color-ink)]">{fmt(m.weightKg)} kg</span>
        )}
        {m.bodyFatPct != null && <span className="chip">{fmt(m.bodyFatPct)} % KFA</span>}
        {measures.map(([k, v]) => (
          <span key={k} className="chip">
            {MEASUREMENT_LABELS[k] ?? k}: {fmt(v)} cm
          </span>
        ))}
      </div>
      {m.note && <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">{m.note}</p>}
    </div>
  )
}
