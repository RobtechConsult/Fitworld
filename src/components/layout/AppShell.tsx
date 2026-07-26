import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="min-h-full">
      <main className="pt-safe mx-auto w-full max-w-2xl px-4 pb-28 pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

/** Wiederverwendbarer Seitenkopf. */
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <header className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
