import { Link } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { IconChevron, IconDumbbell, IconPlus, IconScale } from '@/components/icons'
import { SEED_EXERCISES } from '@/data/exercises'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}.${m}.${y}`
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card px-4 py-3.5">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{hint}</p>}
    </div>
  )
}

function QuickLink({
  to,
  title,
  desc,
  icon,
}: {
  to: string
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <Link to={to} className="card card-hover flex items-center gap-3 px-4 py-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-brand-2)]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block truncate text-sm text-[var(--color-ink-muted)]">{desc}</span>
      </span>
      <IconChevron width={18} height={18} className="text-[var(--color-ink-faint)]" />
    </Link>
  )
}

export function Dashboard() {
  const { data, allExercises } = useStore()

  const workoutCount = data.workouts.length
  const latestWeight = [...data.bodyMetrics]
    .filter((m) => m.weightKg != null)
    .sort((a, b) => b.date.localeCompare(a.date))[0]
  const customCount = allExercises.length - SEED_EXERCISES.length

  return (
    <div>
      <PageHeader
        title="ForgeFit"
        subtitle="Dein Training. Deine Daten. Dein Fortschritt."
      />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <StatCard
          label="Übungen"
          value={String(allExercises.length)}
          hint={customCount > 0 ? `${customCount} eigene` : 'Startkatalog'}
        />
        <StatCard label="Workouts" value={String(workoutCount)} hint="getrackt" />
        <StatCard
          label="Körpergewicht"
          value={latestWeight?.weightKg != null ? `${latestWeight.weightKg} kg` : '–'}
          hint={latestWeight ? `Stand ${formatDate(latestWeight.date)}` : 'noch kein Eintrag'}
        />
        <StatCard label="Pläne" value={String(data.plans.length)} hint="Splits/Routinen" />
      </div>

      <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
        Schnellzugriff
      </h2>
      <div className="flex flex-col gap-3">
        <QuickLink
          to="/exercises"
          title="Übungsdatenbank"
          desc="Übungen durchsuchen & eigene anlegen"
          icon={<IconDumbbell width={20} height={20} />}
        />
        <QuickLink
          to="/workouts"
          title="Training tracken"
          desc="Sätze, Wiederholungen, Gewicht"
          icon={<IconPlus width={20} height={20} />}
        />
        <QuickLink
          to="/body"
          title="Körper-Metriken"
          desc="Gewicht, KFA & Umfänge"
          icon={<IconScale width={20} height={20} />}
        />
      </div>

      <div className="card mt-6 px-4 py-4">
        <p className="text-sm text-[var(--color-ink-muted)]">
          <span className="brand-text font-semibold">Phase 1</span>: Übungsdatenbank, Workout-Tracking
          und Körper-Metriken sind live. Als Nächstes folgen Fortschritts-Graphen und Trainingspläne.
          Deine Daten bleiben lokal auf dem Gerät und lassen sich jederzeit exportieren.
        </p>
      </div>
    </div>
  )
}
