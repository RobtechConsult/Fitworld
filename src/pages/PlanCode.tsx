import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { ExerciseThumb } from '@/components/ExerciseThumb'
import { fromKg, weightLabel } from '@/lib/units'
import {
  decodePlanCode,
  encodePlanCode,
  encryptPlanCode,
  statusCodeFromData,
  PlanCodeError,
  type CodePayload,
  type WorkoutCode,
} from '@/lib/planCode'

/**
 * Plan-Code: ohne Backend Trainings zwischen Javis und App austauschen.
 * Oben: Code einlesen (Javis → App). Unten: Status exportieren (App → Javis).
 */
export function PlanCode() {
  const { data, exerciseById, startWorkoutFrom } = useStore()
  const unit = data.settings.unit
  const navigate = useNavigate()

  // ---- Import ----
  const [codeIn, setCodeIn] = useState('')
  const [passIn, setPassIn] = useState('')
  const [parsed, setParsed] = useState<CodePayload | null>(null)
  const [importErr, setImportErr] = useState<string | null>(null)

  const readCode = async () => {
    setImportErr(null)
    setParsed(null)
    try {
      const p = await decodePlanCode(codeIn, passIn || undefined)
      setParsed(p)
    } catch (e) {
      setImportErr(e instanceof PlanCodeError ? e.message : 'Code konnte nicht gelesen werden.')
    }
  }

  const startFromCode = (wo: WorkoutCode) => {
    startWorkoutFrom(
      wo.e.map((x) => x.x),
      wo.n,
      Object.fromEntries(wo.e.map((x) => [x.x, { sets: x.ss, reps: x.r, weightKg: x.w }])),
    )
    navigate('/workouts')
  }

  // ---- Export ----
  const [passOut, setPassOut] = useState('')
  const [encrypt, setEncrypt] = useState(false)
  const [codeOut, setCodeOut] = useState('')
  const [exportErr, setExportErr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const makeStatusCode = async () => {
    setExportErr(null)
    setCopied(false)
    const payload = statusCodeFromData(data.workouts, data.bodyMetrics, unit)
    if (payload.wk.length === 0) {
      setExportErr('Noch keine getrackten Einheiten zum Exportieren.')
      setCodeOut('')
      return
    }
    try {
      const code = encrypt && passOut ? await encryptPlanCode(payload, passOut) : encodePlanCode(payload)
      setCodeOut(code)
    } catch {
      setExportErr('Export fehlgeschlagen.')
    }
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeOut)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* Clipboard evtl. nicht verfügbar – Nutzer markiert manuell. */
    }
  }

  const fmtW = (kg: number) =>
    `${fromKg(kg, unit).toLocaleString('de-DE', { maximumFractionDigits: 1 })} ${weightLabel(unit)}`

  return (
    <div>
      <PageHeader title="Plan-Code" subtitle="Training per Code austauschen – ganz ohne Backend" />

      {/* ---- Import: Code → App ---- */}
      <div className="card px-4 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-2)]">
          Code einlesen
        </h2>
        <p className="mb-3 mt-1 text-xs text-[var(--color-ink-muted)]">
          Füge den Code ein, den du bekommen hast. Die App lädt daraus dein Training.
        </p>
        <textarea
          className="input min-h-[80px] resize-y font-mono text-sm"
          placeholder="FF1.… oder FF2.…"
          value={codeIn}
          onChange={(e) => setCodeIn(e.target.value)}
        />
        <input
          className="input mt-2"
          type="password"
          placeholder="Passwort (nur bei FF2.-Codes)"
          value={passIn}
          onChange={(e) => setPassIn(e.target.value)}
        />
        <button className="btn-primary mt-3 w-full" onClick={readCode} disabled={!codeIn.trim()}>
          Einlesen
        </button>

        {importErr && (
          <p className="mt-3 rounded-xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-3 py-2 text-sm text-[var(--color-danger)]">
            {importErr}
          </p>
        )}

        {parsed && parsed.t === 'exp' && (
          <p className="mt-3 rounded-xl bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-ink-muted)]">
            Das ist ein <strong>Status-Export</strong> ({parsed.wk.length} Einheiten) – gedacht für
            Javis, kein Trainingsplan zum Starten.
          </p>
        )}

        {parsed && parsed.t === 'wo' && (
          <div className="mt-3 rounded-xl border border-[var(--color-border)] p-3">
            <p className="mb-2 font-semibold">{parsed.n || 'Training'}</p>
            <div className="flex flex-col gap-1.5">
              {parsed.e.map((x, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <ExerciseThumb exerciseId={x.x} size={32} />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {exerciseById(x.x)?.name ?? x.x}
                  </span>
                  <span className="shrink-0 text-xs text-[var(--color-ink-muted)]">
                    {x.ss}×{x.r} · {fmtW(x.w)}
                  </span>
                </div>
              ))}
            </div>
            <button className="btn-primary mt-3 w-full" onClick={() => startFromCode(parsed)}>
              Training starten
            </button>
          </div>
        )}
      </div>

      {/* ---- Export: App → Code ---- */}
      <div className="card mt-4 px-4 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-2)]">
          Status exportieren
        </h2>
        <p className="mb-3 mt-1 text-xs text-[var(--color-ink-muted)]">
          Erzeugt einen Code aus deinen letzten Einheiten (Übungen, Sätze, Gewichte) – gib ihn
          Javis, damit er deinen nächsten Plan vorbereitet.
        </p>

        <label className="flex items-center justify-between py-1">
          <span className="text-sm text-[var(--color-ink-muted)]">Mit Passwort verschlüsseln</span>
          <button
            onClick={() => setEncrypt((v) => !v)}
            className={[
              'h-6 w-11 rounded-full p-0.5 transition-colors',
              encrypt ? 'bg-[var(--color-brand)]' : 'bg-[var(--color-border)]',
            ].join(' ')}
            aria-label="Verschlüsseln"
          >
            <span
              className={[
                'block h-5 w-5 rounded-full bg-white transition-transform',
                encrypt ? 'translate-x-5' : '',
              ].join(' ')}
            />
          </button>
        </label>
        {encrypt && (
          <input
            className="input mt-1"
            type="password"
            placeholder="Passwort wählen"
            value={passOut}
            onChange={(e) => setPassOut(e.target.value)}
          />
        )}

        <button
          className="btn-ghost mt-3 w-full"
          onClick={makeStatusCode}
          disabled={encrypt && !passOut}
        >
          Status-Code erzeugen
        </button>

        {exportErr && (
          <p className="mt-3 text-sm text-[var(--color-danger)]">{exportErr}</p>
        )}

        {codeOut && (
          <div className="mt-3">
            <textarea
              readOnly
              className="input min-h-[90px] resize-y font-mono text-xs"
              value={codeOut}
              onFocus={(e) => e.target.select()}
            />
            <button className="btn-primary mt-2 w-full" onClick={copyCode}>
              {copied ? 'Kopiert ✓' : 'Code kopieren'}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Codes bleiben auf deinem Gerät, bis du sie selbst teilst. Kein Server im Spiel.
      </p>
    </div>
  )
}
