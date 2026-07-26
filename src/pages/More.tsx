import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/AppShell'
import { IconCalendar, IconChevron, IconDownload, IconGear, IconScale } from '@/components/icons'

const LINKS = [
  { to: '/body', title: 'Körper-Metriken', desc: 'Gewicht, KFA & Umfänge', Icon: IconScale },
  { to: '/plans', title: 'Trainingspläne', desc: 'Splits & Routinen', Icon: IconCalendar },
  { to: '/settings', title: 'Einstellungen', desc: 'Einheit (kg/lbs) & mehr', Icon: IconGear },
  { to: '/data', title: 'Daten & Backup', desc: 'Export / Import · Hub-Brücke', Icon: IconDownload },
]

export function More() {
  return (
    <div>
      <PageHeader title="Mehr" subtitle="Weitere Module & Einstellungen" />
      <div className="flex flex-col gap-3">
        {LINKS.map(({ to, title, desc, Icon }) => (
          <Link key={to} to={to} className="card card-hover flex items-center gap-3 px-4 py-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-brand-2)]">
              <Icon width={20} height={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{title}</span>
              <span className="block truncate text-sm text-[var(--color-ink-muted)]">{desc}</span>
            </span>
            <IconChevron width={18} height={18} className="text-[var(--color-ink-faint)]" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[var(--color-ink-faint)]">
        ForgeFit · Phase 1 · local-first
      </p>
    </div>
  )
}
