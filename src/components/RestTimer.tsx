import { useEffect, useState } from 'react'
import { IconClock, IconClose } from '@/components/icons'

/**
 * Pausen-Timer: zählt seit dem letzten abgeschlossenen Satz hoch.
 * Schwebender Pill über der Bottom-Navigation. Tippen = ausblenden.
 */
export function RestTimer({
  startedAt,
  onDismiss,
}: {
  startedAt: number | null
  onDismiss: () => void
}) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (startedAt == null) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [startedAt])

  if (startedAt == null) return null

  const sec = Math.max(0, Math.floor((now - startedAt) / 1000))
  const mm = Math.floor(sec / 60)
  const ss = String(sec % 60).padStart(2, '0')

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4">
      <button
        onClick={onDismiss}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-positive)] px-4 py-2.5 text-sm font-bold text-black shadow-lg shadow-black/30"
      >
        <IconClock width={18} height={18} />
        Pause {mm}:{ss}
        <IconClose width={16} height={16} className="opacity-70" />
      </button>
    </div>
  )
}
