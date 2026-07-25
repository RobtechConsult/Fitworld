import { useState } from 'react'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { Sheet } from '@/components/Sheet'
import { PlanForm } from './plans/PlanForm'
import { PlanDetail } from './plans/PlanDetail'
import { ComingSoon } from '@/components/ComingSoon'
import { IconChevron, IconPlus } from '@/components/icons'

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

export function Plans() {
  const { data, addPlan } = useStore()
  const [creating, setCreating] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

  const openPlan = openId ? data.plans.find((p) => p.id === openId) : undefined

  if (openPlan) {
    return <PlanDetail plan={openPlan} onBack={() => setOpenId(null)} />
  }

  return (
    <div>
      <PageHeader
        title="Pläne"
        subtitle={data.plans.length ? `${plural(data.plans.length, 'Plan', 'Pläne')}` : 'Splits & Routinen'}
        action={
          <button className="btn-primary !px-3" onClick={() => setCreating(true)}>
            <IconPlus width={18} height={18} />
            Neu
          </button>
        }
      />

      {data.plans.length === 0 ? (
        <ComingSoon title="Noch kein Plan">
          Stelle aus der Übungs­datenbank eigene Splits zusammen (z. B. Push/Pull/Legs) und starte
          Workouts direkt aus einem Plan-Tag.
        </ComingSoon>
      ) : (
        <div className="flex flex-col gap-3">
          {data.plans.map((p) => {
            const exCount = p.days.reduce((n, d) => n + d.exercises.length, 0)
            return (
              <button
                key={p.id}
                onClick={() => setOpenId(p.id)}
                className="card card-hover flex items-center gap-3 px-4 py-3.5 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="mt-0.5 block truncate text-sm text-[var(--color-ink-muted)]">
                    {plural(p.days.length, 'Tag', 'Tage')} · {plural(exCount, 'Übung', 'Übungen')}
                    {p.description ? ` · ${p.description}` : ''}
                  </span>
                </span>
                <IconChevron width={18} height={18} className="text-[var(--color-ink-faint)]" />
              </button>
            )
          })}
        </div>
      )}

      <Sheet open={creating} onClose={() => setCreating(false)} title="Neuer Trainingsplan">
        <PlanForm
          onSubmit={(p) => {
            const created = addPlan({ ...p, days: [] })
            setCreating(false)
            setOpenId(created.id)
          }}
        />
      </Sheet>
    </div>
  )
}
