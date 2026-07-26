import { useRef, useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { IconDownload, IconTrash, IconUpload } from '@/components/icons'
import { buildExport, parseImport } from '@/lib/dataFormat'
import { EMPTY_APP_DATA } from '@/lib/types'

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function DataPage() {
  const { data, replaceAll } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  const handleExport = () => {
    const exportedAt = new Date().toISOString()
    const payload = buildExport(data, exportedAt)
    const stamp = exportedAt.slice(0, 10)
    download(`forgefit-backup-${stamp}.json`, JSON.stringify(payload, null, 2))
    setMsg({ kind: 'ok', text: 'Backup exportiert.' })
  }

  const handleImportFile = async (file: File) => {
    const text = await file.text()
    const res = parseImport(text)
    if (!res.ok || !res.data) {
      setMsg({ kind: 'err', text: res.error ?? 'Import fehlgeschlagen.' })
      return
    }
    replaceAll(res.data)
    setMsg({ kind: 'ok', text: 'Backup importiert – Daten ersetzt.' })
  }

  const handleReset = () => {
    if (!confirm('Wirklich ALLE lokalen Daten löschen? Das lässt sich nicht rückgängig machen.'))
      return
    replaceAll(structuredClone(EMPTY_APP_DATA))
    setMsg({ kind: 'ok', text: 'Alle Daten zurückgesetzt.' })
  }

  return (
    <div>
      <PageHeader title="Daten & Backup" subtitle="Export / Import · Brücke zum Status Hub" />

      {msg && (
        <div
          className={[
            'card mb-4 px-4 py-3 text-sm',
            msg.kind === 'ok' ? 'text-[var(--color-positive)]' : 'text-[var(--color-danger)]',
          ].join(' ')}
        >
          {msg.text}
        </div>
      )}

      <div className="card mb-4 px-4 py-4">
        <h2 className="mb-1 font-semibold">Hub-Brücke</h2>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Der Export enthält ein vollständiges Backup <span className="text-[var(--color-ink)]">und</span>{' '}
          eine schlanke <span className="brand-text font-semibold">Hub-Sicht</span> (Körpergewicht &
          Workout-Zusammenfassungen) im gemeinsamen JSON-Format. So können deine Trainingsdaten in
          das Status-Hub-Cockpit übernommen werden. Ein gemeinsames Cloud-Backend für automatischen
          Sync ist als späterer Schritt vorgesehen.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="btn-primary" onClick={handleExport}>
          <IconDownload width={18} height={18} />
          Backup exportieren (JSON)
        </button>
        <button className="btn-ghost" onClick={() => fileRef.current?.click()}>
          <IconUpload width={18} height={18} />
          Backup importieren
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) void handleImportFile(f)
            e.target.value = ''
          }}
        />
      </div>

      <div className="card mt-6 px-4 py-4">
        <h2 className="mb-2 font-semibold">Aktueller Bestand</h2>
        <dl className="grid grid-cols-2 gap-y-1 text-sm">
          <dt className="text-[var(--color-ink-muted)]">Eigene Übungen</dt>
          <dd className="text-right">{data.customExercises.length}</dd>
          <dt className="text-[var(--color-ink-muted)]">Workouts</dt>
          <dd className="text-right">{data.workouts.length}</dd>
          <dt className="text-[var(--color-ink-muted)]">Pläne</dt>
          <dd className="text-right">{data.plans.length}</dd>
          <dt className="text-[var(--color-ink-muted)]">Körper-Einträge</dt>
          <dd className="text-right">{data.bodyMetrics.length}</dd>
        </dl>
      </div>

      <button
        onClick={handleReset}
        className="btn-ghost mt-6 w-full text-[var(--color-danger)] hover:border-[var(--color-danger)]/50"
      >
        <IconTrash width={18} height={18} />
        Alle lokalen Daten löschen
      </button>

      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Alle Daten liegen ausschließlich lokal in diesem Browser (localStorage).
      </p>
    </div>
  )
}
