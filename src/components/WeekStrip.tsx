import { useMemo, useState } from 'react'
import { IconChevron } from '@/components/icons'
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

function startOfWeek(base: Date): Date {
  const d = new Date(base)
  const dow = (d.getDay() + 6) % 7 // Montag = 0
  d.setDate(d.getDate() - dow)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Wochenkalender: zeigt Trainingstage der Woche (grüne Punkte), heute hervorgehoben. */
export function WeekStrip({
  workouts,
  onOpenCalendar,
}: {
  workouts: Workout[]
  /** Öffnet den vollen Kalender, optional mit vorausgewähltem Tag. */
  onOpenCalendar?: (isoDate?: string) => void
}) {
  const [offset, setOffset] = useState(0) // Wochen relativ zu heute

  const trainedDates = useMemo(() => new Set(workouts.map((w) => w.date)), [workouts])
  const todayIso = isoLocal(new Date())

  const week = useMemo(() => {
    const base = new Date()
    base.setDate(base.getDate() + offset * 7)
    const start = startOfWeek(base)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [offset])

  const monthLabel = `${MONTHS[week[3].getMonth()]} ${week[3].getFullYear()}`
  const trainedThisWeek = week.filter((d) => trainedDates.has(isoLocal(d))).length

  return (
    <div className="card mb-4 px-3 py-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          onClick={() => setOffset((o) => o - 1)}
          className="grid h-7 w-7 place-items-center rounded-lg text-[var(--color-ink-faint)] hover:bg-[var(--color-surface-2)]"
          aria-label="Vorherige Woche"
        >
          <IconChevron width={16} height={16} className="rotate-180" />
        </button>
        <button
          onClick={() => onOpenCalendar?.()}
          disabled={!onOpenCalendar}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold hover:bg-[var(--color-surface-2)] disabled:hover:bg-transparent"
        >
          {monthLabel}
          {onOpenCalendar && (
            <IconChevron width={14} height={14} className="rotate-90 text-[var(--color-ink-faint)]" />
          )}
        </button>
        <button
          onClick={() => setOffset((o) => o + 1)}
          className="grid h-7 w-7 place-items-center rounded-lg text-[var(--color-ink-faint)] hover:bg-[var(--color-surface-2)]"
          aria-label="Nächste Woche"
        >
          <IconChevron width={16} height={16} />
        </button>
      </div>

      <div className="flex justify-between">
        {week.map((d, i) => {
          const iso = isoLocal(d)
          const trained = trainedDates.has(iso)
          const isToday = iso === todayIso
          return (
            <button
              key={iso}
              onClick={() => onOpenCalendar?.(iso)}
              disabled={!onOpenCalendar}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors hover:bg-[var(--color-surface-2)]"
            >
              <span className="text-[10px] font-medium uppercase text-[var(--color-ink-faint)]">
                {WEEKDAYS[i]}
              </span>
              <span
                className={[
                  'grid h-8 w-8 place-items-center rounded-full text-sm font-semibold',
                  isToday
                    ? 'brand-gradient text-white'
                    : 'text-[var(--color-ink)]',
                ].join(' ')}
              >
                {d.getDate()}
              </span>
              <span
                className={[
                  'h-1.5 w-1.5 rounded-full',
                  trained ? 'bg-[var(--color-positive)]' : 'bg-[var(--color-border)]',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>

      <p className="mt-1.5 text-center text-xs text-[var(--color-ink-muted)]">
        {trainedThisWeek === 0
          ? 'Noch kein Training diese Woche'
          : `${trainedThisWeek}× trainiert diese Woche`}
      </p>
    </div>
  )
}
