import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { Sheet } from '@/components/Sheet'
import { IconChevron, IconPlus, IconTrash } from '@/components/icons'
import { summarizeEntry } from '@/lib/metrics'
import { workoutVolumeKg } from '@/lib/dataFormat'
import type { Workout } from '@/lib/types'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

function isoLocal(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export function Calendar() {
  const { data, exerciseById, deleteWorkout, startWorkoutFrom } = useStore()
  const navigate = useNavigate()

  const today = new Date()
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState<string | null>(null)

  const workoutsByDate = useMemo(() => {
    const map = new Map<string, Workout[]>()
    for (const w of data.workouts) {
      const list = map.get(w.date) ?? []
      list.push(w)
      map.set(w.date, list)
    }
    return map
  }, [data.workouts])

  const bodyDates = useMemo(
    () => new Set(data.bodyMetrics.map((m) => m.date)),
    [data.bodyMetrics],
  )

  const cells = useMemo(() => {
    const first = new Date(ym.y, ym.m, 1)
    const startDow = (first.getDay() + 6) % 7
    const daysInMonth = new Date(ym.y, ym.m + 1, 0).getDate()
    const arr: (Date | null)[] = []
    for (let i = 0; i < startDow; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(ym.y, ym.m, d))
    while (arr.length % 7 !== 0) arr.push(null)
    return arr
  }, [ym])

  const monthWorkouts = useMemo(
    () => data.workouts.filter((w) => w.date.startsWith(`${ym.y}-${String(ym.m + 1).padStart(2, '0')}`)),
    [data.workouts, ym],
  )
  const daysInMonth = new Date(ym.y, ym.m + 1, 0).getDate()
  const perWeek = monthWorkouts.length / (daysInMonth / 7)

  const changeMonth = (delta: number) =>
    setYm(({ y, m }) => {
      const d = new Date(y, m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  const goToday = () => setYm({ y: today.getFullYear(), m: today.getMonth() })

  const todayIso = isoLocal(today)
  const selectedWorkouts = selected ? (workoutsByDate.get(selected) ?? []) : []
  const selectedBody = selected ? data.bodyMetrics.find((m) => m.date === selected) : undefined

  const repeat = (w: Workout) => {
    startWorkoutFrom(
      w.entries.map((e) => e.exerciseId),
      w.name || 'Wiederholung',
    )
    navigate('/workouts')
  }

  return (
    <div>
      <PageHeader title="Kalender" subtitle="Deine Trainingstage" />

      {/* Monatsnavigation */}
      <div className="mb-3 flex items-center justify-between">
        <button className="btn-ghost !px-3 !py-2" onClick={() => changeMonth(-1)} aria-label="Vorheriger Monat">
          <IconChevron width={18} height={18} className="rotate-180" />
        </button>
        <button onClick={goToday} className="text-center">
          <span className="block text-lg font-bold">
            {MONTHS[ym.m]} {ym.y}
          </span>
          <span className="block text-xs text-[var(--color-ink-muted)]">
            {monthWorkouts.length === 0
              ? 'Keine Workouts'
              : `${monthWorkouts.length} Workouts · ${perWeek.toLocaleString('de-DE', { maximumFractionDigits: 1 })}/Woche`}
          </span>
        </button>
        <button className="btn-ghost !px-3 !py-2" onClick={() => changeMonth(1)} aria-label="Nächster Monat">
          <IconChevron width={18} height={18} />
        </button>
      </div>

      {/* Wochentage */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-semibold uppercase text-[var(--color-ink-faint)]">
            {d}
          </div>
        ))}
      </div>

      {/* Tage */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />
          const iso = isoLocal(d)
          const hasWorkout = workoutsByDate.has(iso)
          const hasBody = bodyDates.has(iso)
          const isToday = iso === todayIso
          const clickable = hasWorkout || hasBody
          return (
            <button
              key={iso}
              disabled={!clickable}
              onClick={() => setSelected(iso)}
              className={[
                'flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm transition-colors',
                isToday ? 'brand-gradient font-bold text-white' : 'text-[var(--color-ink)]',
                clickable && !isToday ? 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)]' : '',
              ].join(' ')}
            >
              <span>{d.getDate()}</span>
              <span className="flex h-1.5 items-center gap-0.5">
                {hasWorkout && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-positive)]" />}
                {hasBody && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink-faint)]" />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[var(--color-ink-muted)]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-positive)]" /> Training
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-ink-faint)]" /> Körper-Eintrag
        </span>
      </div>

      {/* Tag-Detail */}
      <Sheet
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? fmtDate(selected) : ''}
      >
        <div className="flex flex-col gap-4">
          {selectedWorkouts.length === 0 && !selectedBody && (
            <p className="text-sm text-[var(--color-ink-muted)]">Keine Einträge an diesem Tag.</p>
          )}

          {selectedWorkouts.map((w) => (
            <div key={w.id} className="card px-4 py-3.5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-semibold">{w.name || 'Training'}</span>
                <span className="chip text-[var(--color-brand-2)]">
                  {workoutVolumeKg(w).toLocaleString('de-DE')} kg
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {w.entries.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate">
                      {exerciseById(entry.exerciseId)?.name ?? 'Übung'}
                    </span>
                    <span className="shrink-0 text-[var(--color-ink-muted)]">
                      {summarizeEntry(entry)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary flex-1 !py-2 !text-sm" onClick={() => repeat(w)}>
                  <IconPlus width={16} height={16} />
                  Training wiederholen
                </button>
                <button
                  onClick={() => {
                    if (confirm('Diese Einheit löschen?')) {
                      deleteWorkout(w.id)
                      setSelected(null)
                    }
                  }}
                  className="btn-ghost !px-3 !py-2 text-[var(--color-danger)] hover:border-[var(--color-danger)]/50"
                  aria-label="Einheit löschen"
                >
                  <IconTrash width={16} height={16} />
                </button>
              </div>
            </div>
          ))}

          {selectedBody && (
            <div className="card px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                Körper-Eintrag
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {selectedBody.weightKg != null && (
                  <span className="chip text-[var(--color-ink)]">{selectedBody.weightKg} kg</span>
                )}
                {selectedBody.bodyFatPct != null && (
                  <span className="chip">{selectedBody.bodyFatPct} % KFA</span>
                )}
              </div>
            </div>
          )}
        </div>
      </Sheet>
    </div>
  )
}
