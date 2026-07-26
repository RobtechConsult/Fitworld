import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { IconChevron, IconDumbbell, IconPlus, IconScale } from '@/components/icons'
import { ExerciseThumb } from '@/components/ExerciseThumb'
import { SEED_EXERCISES } from '@/data/exercises'
import type { Plan, PlanDay } from '@/lib/types'

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}.${m}.${y}`
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card px-4 py-3.5">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{hint}</p>}
    </div>
  )
}

/** Aktiver Plan mit Tagen als Zeilen – Herzstück der Startseite. */
function ActivePlanCard({ plan }: { plan: Plan }) {
  const { exerciseById, startWorkoutFrom, data } = useStore()
  const navigate = useNavigate()

  const startDay = (day: PlanDay) => {
    if (day.exercises.length === 0) return
    startWorkoutFrom(
      day.exercises.map((e) => e.exerciseId),
      `${plan.name} · ${day.name}`,
    )
    navigate('/workouts')
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 pt-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-brand-2)]">
            Aktiver Plan
          </p>
          <h2 className="truncate text-lg font-bold">{plan.name}</h2>
        </div>
        {data.plans.length > 1 && (
          <Link to="/plans" className="chip shrink-0">
            wechseln
          </Link>
        )}
      </div>

      {plan.days.length === 0 ? (
        <div className="px-4 py-4">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Dieser Plan hat noch keine Tage.
          </p>
          <Link to="/plans" className="btn-ghost mt-3 w-full !py-2 !text-sm">
            Plan bearbeiten
          </Link>
        </div>
      ) : (
        <div className="mt-2 flex flex-col">
          {plan.days.map((day) => {
            const names = day.exercises
              .map((e) => exerciseById(e.exerciseId)?.name)
              .filter(Boolean)
              .join(', ')
            return (
              <button
                key={day.id}
                onClick={() => startDay(day)}
                disabled={day.exercises.length === 0}
                className="flex items-center gap-3 border-t border-[var(--color-border)] px-4 py-3 text-left transition-colors hover:bg-[var(--color-surface-2)]/70 disabled:opacity-50"
              >
                {day.exercises[0] ? (
                  <ExerciseThumb exerciseId={day.exercises[0].exerciseId} size={40} />
                ) : (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-ink-faint)]">
                    <IconPlus width={18} height={18} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{day.name}</span>
                  <span className="block truncate text-xs text-[var(--color-ink-muted)]">
                    {day.exercises.length === 0
                      ? 'Keine Übungen'
                      : `${plural(day.exercises.length, 'Übung', 'Übungen')} · ${names}`}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-semibold text-[var(--color-brand-2)]">
                  Start
                </span>
                <IconChevron width={16} height={16} className="shrink-0 text-[var(--color-ink-faint)]" />
              </button>
            )
          })}
        </div>
      )}

      <Link
        to="/plans"
        className="block border-t border-[var(--color-border)] px-4 py-3 text-center text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
      >
        Alle Pläne verwalten
      </Link>
    </div>
  )
}

function NoPlanCard() {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-8 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient text-white shadow-lg shadow-[var(--color-brand)]/30">
        <IconPlus />
      </span>
      <h2 className="text-lg font-semibold">Erstelle deinen Trainingsplan</h2>
      <p className="max-w-sm text-sm text-[var(--color-ink-muted)]">
        Stelle einen Split (z. B. Push/Pull/Legs) zusammen und starte dein Training direkt von hier.
      </p>
      <Link to="/plans" className="btn-primary mt-1">
        <IconPlus width={18} height={18} />
        Plan erstellen
      </Link>
    </div>
  )
}

export function Dashboard() {
  const { data, allExercises, startWorkoutFrom } = useStore()
  const navigate = useNavigate()

  const activePlan =
    data.plans.find((p) => p.id === data.settings.activePlanId) ?? data.plans[0]

  const latestWeight = [...data.bodyMetrics]
    .filter((m) => m.weightKg != null)
    .sort((a, b) => b.date.localeCompare(a.date))[0]
  const customCount = allExercises.length - SEED_EXERCISES.length

  const startFreeWorkout = () => {
    startWorkoutFrom([], '')
    navigate('/workouts')
  }

  return (
    <div>
      <PageHeader title="ForgeFit" subtitle="Dein Training. Deine Daten. Dein Fortschritt." />

      {/* Plan-Hub */}
      {activePlan ? <ActivePlanCard plan={activePlan} /> : <NoPlanCard />}

      <button onClick={startFreeWorkout} className="btn-ghost mt-3 w-full">
        <IconPlus width={18} height={18} />
        Freies Training starten
      </button>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <StatCard label="Workouts" value={String(data.workouts.length)} hint="getrackt" />
        <StatCard
          label="Körpergewicht"
          value={latestWeight?.weightKg != null ? `${latestWeight.weightKg} kg` : '–'}
          hint={latestWeight ? `Stand ${formatDate(latestWeight.date)}` : 'noch kein Eintrag'}
        />
        <StatCard
          label="Übungen"
          value={String(allExercises.length)}
          hint={customCount > 0 ? `${customCount} eigene` : 'Startkatalog'}
        />
        <StatCard label="Pläne" value={String(data.plans.length)} hint="Splits/Routinen" />
      </div>

      {/* Schnellzugriff */}
      <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
        Schnellzugriff
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <Link to="/exercises" className="card card-hover flex items-center gap-2 px-4 py-3.5">
          <IconDumbbell width={20} height={20} className="text-[var(--color-brand-2)]" />
          <span className="font-semibold">Übungen</span>
        </Link>
        <Link to="/body" className="card card-hover flex items-center gap-2 px-4 py-3.5">
          <IconScale width={20} height={20} className="text-[var(--color-brand-2)]" />
          <span className="font-semibold">Körper</span>
        </Link>
      </div>
    </div>
  )
}
