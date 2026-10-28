import { useStore } from '@/store/StoreContext'

/**
 * Kompakte Gym-Leiste: aktives Gym wählen, „Alle Gyms" umschalten, neues Gym
 * anlegen. Je nach aktivem Gym werden im Training andere Gewichte vorbelegt.
 */
export function GymBar() {
  const { data, addGym, setActiveGym, updateSettings } = useStore()
  const gyms = data.gyms ?? []
  const { activeGymId, showAllGyms } = data.settings

  const pickGym = (id: string) => {
    setActiveGym(id)
    updateSettings({ showAllGyms: false })
  }

  const addNew = () => {
    const name = window.prompt('Name des Gyms (z. B. „McFit Mitte", „Home Gym")')?.trim()
    if (!name) return
    const created = addGym(name)
    setActiveGym(created.id)
    updateSettings({ showAllGyms: false })
  }

  // Ohne Gyms: dezenter Einstieg.
  if (gyms.length === 0) {
    return (
      <button
        onClick={addNew}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
      >
        + Gym anlegen (gym-spezifische Gewichte)
      </button>
    )
  }

  return (
    <div className="-mx-1 mb-3 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <span className="shrink-0 pr-0.5 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
        Gym
      </span>
      <Chip label="Alle" active={!!showAllGyms} onClick={() => updateSettings({ showAllGyms: true })} />
      {gyms.map((g) => (
        <Chip
          key={g.id}
          label={g.name}
          active={!showAllGyms && activeGymId === g.id}
          onClick={() => pickGym(g.id)}
        />
      ))}
      <button
        onClick={addNew}
        className="shrink-0 rounded-full border border-dashed border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink-muted)]"
      >
        + Gym
      </button>
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'brand-gradient border-transparent text-white'
          : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
