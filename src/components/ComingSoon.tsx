import { IconSpark } from '@/components/icons'

export function ComingSoon({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="card mt-2 flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient text-white shadow-lg shadow-[var(--color-brand)]/30">
        <IconSpark />
      </span>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">
        {children ?? 'Dieses Modul ist geplant und folgt in einem der nächsten Schritte.'}
      </p>
      <span className="chip mt-1">In Planung</span>
    </div>
  )
}
