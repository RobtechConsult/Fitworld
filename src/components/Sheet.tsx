import { useEffect } from 'react'
import { IconClose } from '@/components/icons'

/** Einfaches, mobil-freundliches Bottom-Sheet / Modal. */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            aria-label="Schließen"
          >
            <IconClose width={18} height={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
