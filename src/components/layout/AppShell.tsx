import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-full">
      <main className="pt-safe mx-auto w-full max-w-2xl px-4 pb-28 pt-4">
        {/* key auf dem Pfad -> sanftes Einblenden bei jedem Seitenwechsel. */}
        <div key={pathname} className="animate-fade">
          <Outlet />
        </div>
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
