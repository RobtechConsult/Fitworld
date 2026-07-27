import { NavLink } from 'react-router-dom'
import { IconCalendar, IconChart, IconDumbbell, IconGrid, IconHome } from '@/components/icons'
import type { ComponentType, SVGProps } from 'react'

interface NavItem {
  to: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  end?: boolean
}

const ITEMS: NavItem[] = [
  { to: '/', label: 'Start', Icon: IconHome, end: true },
  { to: '/exercises', label: 'Übungen', Icon: IconDumbbell },
  { to: '/workouts', label: 'Training', Icon: IconCalendar },
  { to: '/progress', label: 'Fortschritt', Icon: IconChart },
  { to: '/more', label: 'Mehr', Icon: IconGrid },
]

export function BottomNav() {
  return (
    <nav className="app-bottom-nav pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)]/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2">
        {ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'group relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-faint)]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={[
                    'grid h-9 w-9 place-items-center rounded-xl transition-all',
                    isActive
                      ? 'brand-gradient text-white shadow-lg shadow-[var(--color-brand)]/30'
                      : 'text-[var(--color-ink-muted)] group-hover:bg-[var(--color-surface-2)]',
                  ].join(' ')}
                >
                  <Icon width={20} height={20} />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
