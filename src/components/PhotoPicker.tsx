import { useRef, useState } from 'react'
import { fileToThumb } from '@/lib/photos'

/**
 * Controlled Foto-Auswahl: Kamera/Datei auswählen → verkleinertes Thumbnail.
 * `value` = aktuelles Daten-URL (oder leer), `onChange(null)` entfernt.
 * Auf dem Handy öffnet `capture` direkt die Kamera.
 */
export function PhotoPicker({
  value,
  onChange,
  size = 72,
}: {
  value?: string
  onChange: (dataUrl: string | null) => void
  size?: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    setErr(null)
    try {
      onChange(await fileToThumb(file))
    } catch {
      setErr('Foto konnte nicht verarbeitet werden.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span
        className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-[var(--color-surface-2)] text-[var(--color-ink-faint)]"
        style={{ width: size, height: size }}
      >
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}
      </span>

      <div className="flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-ghost !py-1.5 !text-xs"
          disabled={busy}
        >
          {busy ? 'Lädt …' : value ? 'Foto ändern' : 'Foto aufnehmen'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-[var(--color-danger)]"
          >
            entfernen
          </button>
        )}
        {err && <span className="text-xs text-[var(--color-danger)]">{err}</span>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onFile}
      />
    </div>
  )
}
