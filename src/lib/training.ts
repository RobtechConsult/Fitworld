import type { Exercise, MuscleGroup, Plan, PlanDay, Workout } from './types'
import { exerciseStats, exercisesInWorkouts, oneRMSeries } from './metrics'
import { todayIso } from './date'

/**
 * Trainings-Engine (Phase A, local-first): bereitet den „Tagesplan" vor —
 * welcher Plan-Tag ist dran + autoregulierte Zielwerte je Übung
 * (Doppelprogression). Dazu Wochen-Volumen je Muskel und ein Deload-Hinweis.
 *
 * Rein aus der lokalen Historie gerechnet, keine fremden Inhalte/Daten.
 */

const DEFAULT_STEP_KG = 2.5
const DEFAULT_REP_MIN = 8
const DEFAULT_REP_MAX = 12

function roundTo(n: number, step: number): number {
  return Math.round(n / step) * step
}

export interface PrescribedExercise {
  exerciseId: string
  sets: number
  reps: number
  weightKg: number
  /** 'hoch' = Gewicht erhöhen, 'halten' = Wdh steigern, 'neu' = keine Historie. */
  note: 'hoch' | 'halten' | 'neu'
}

/** Prescription einer Serie-Vorgabe für eine einzelne (Plan-)Übung. */
export function prescribeExercise(
  workouts: Workout[],
  planEx: {
    exerciseId: string
    targetSets?: number
    targetRepsMin?: number
    targetRepsMax?: number
  },
  stepKg: number = DEFAULT_STEP_KG,
): PrescribedExercise {
  const repMin = planEx.targetRepsMin ?? DEFAULT_REP_MIN
  const repMax = planEx.targetRepsMax ?? DEFAULT_REP_MAX
  const last = exerciseStats(workouts, planEx.exerciseId).lastEntry
  const lastWorking = last?.sets.filter((s) => s.weightKg > 0) ?? []
  const sets = planEx.targetSets ?? (lastWorking.length || 3)

  if (!last || lastWorking.length === 0) {
    return {
      exerciseId: planEx.exerciseId,
      sets,
      reps: repMin,
      weightKg: lastWorking[0]?.weightKg ?? 0,
      note: 'neu',
    }
  }

  const top = lastWorking.reduce((a, b) => (b.weightKg > a.weightKg ? b : a)).weightKg
  const atTop = lastWorking.filter((s) => s.weightKg >= top - 1e-6)
  const minReps = Math.min(...atTop.map((s) => s.reps || 0))

  // Doppelprogression: oberes Wdh-Ende auf allen Sätzen erreicht → Gewicht hoch.
  if (minReps >= repMax) {
    return {
      exerciseId: planEx.exerciseId,
      sets,
      reps: repMin,
      weightKg: roundTo(top + stepKg, 0.5),
      note: 'hoch',
    }
  }
  // sonst gleiches Gewicht, eine Wdh mehr anstreben (bis ans obere Ende).
  return {
    exerciseId: planEx.exerciseId,
    sets,
    reps: Math.min(repMax, Math.max(repMin, minReps + 1)),
    weightKg: top,
    note: 'halten',
  }
}

/** Vorgaben für alle Übungen eines Plan-Tags. */
export function prescribeDay(
  day: PlanDay,
  workouts: Workout[],
  configByEx?: Record<string, { stepKg?: number }>,
): PrescribedExercise[] {
  return day.exercises.map((e) =>
    prescribeExercise(workouts, e, configByEx?.[e.exerciseId]?.stepKg ?? DEFAULT_STEP_KG),
  )
}

/** Ordnet ein Workout dem Index eines Plan-Tags zu (per Name-Suffix). */
function dayIndexOfWorkout(plan: Plan, w: Workout): number {
  return plan.days.findIndex(
    (d) =>
      w.name === `${plan.name} · ${d.name}` || (w.name ?? '').endsWith(`· ${d.name}`),
  )
}

/** Index des als Nächstes fälligen Plan-Tags (Rotation nach zuletzt trainiert). */
export function nextPlanDayIndex(plan: Plan, workouts: Workout[]): number {
  if (plan.days.length === 0) return 0
  const sorted = [...workouts].sort(
    (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  )
  for (const w of sorted) {
    const idx = dayIndexOfWorkout(plan, w)
    if (idx >= 0) return (idx + 1) % plan.days.length
  }
  return 0
}

/** Der als Nächstes fällige Plan-Tag (oder undefined). */
export function nextPlanDay(plan: Plan, workouts: Workout[]): PlanDay | undefined {
  if (plan.days.length === 0) return undefined
  return plan.days[nextPlanDayIndex(plan, workouts)]
}

function isoDaysAgo(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() - days)
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')
  return `${dt.getFullYear()}-${mm}-${dd}`
}

export interface MuscleVolume {
  muscle: MuscleGroup
  sets: number
}

/** Abgeschlossene Arbeitssätze je Primärmuskel im Zeitfenster (Default: 7 Tage). */
export function weeklySetsByMuscle(
  workouts: Workout[],
  exerciseById: (id: string) => Exercise | undefined,
  days = 7,
  today: string = todayIso(),
): MuscleVolume[] {
  const cutoff = isoDaysAgo(today, days - 1)
  const counts = new Map<MuscleGroup, number>()
  for (const w of workouts) {
    if (w.date < cutoff) continue
    for (const entry of w.entries) {
      const ex = exerciseById(entry.exerciseId)
      if (!ex) continue
      const done = entry.sets.filter((s) => s.completed).length
      if (done === 0) continue
      for (const m of ex.primaryMuscles) counts.set(m, (counts.get(m) ?? 0) + done)
    }
  }
  return [...counts.entries()]
    .map(([muscle, sets]) => ({ muscle, sets }))
    .sort((a, b) => b.sets - a.sets)
}

export type VolumeBand = 'none' | 'low' | 'good' | 'high'

/** Grobe Orientierung (keine medizinische Empfehlung). */
export function volumeBand(sets: number): VolumeBand {
  if (sets <= 0) return 'none'
  if (sets < 8) return 'low'
  if (sets <= 20) return 'good'
  return 'high'
}

/**
 * Deload-Hinweis: stagnieren mehrere oft trainierte Übungen (kein neues
 * geschätztes 1-RM über die letzten 3 Einheiten), wird eine leichtere Woche
 * vorgeschlagen.
 */
export function deloadHint(
  workouts: Workout[],
  exerciseById: (id: string) => Exercise | undefined,
): { stalled: string[] } | null {
  const candidates = exercisesInWorkouts(workouts).filter((c) => c.sessions >= 3).slice(0, 6)
  const stalled: string[] = []
  for (const c of candidates) {
    const series = oneRMSeries(workouts, c.id)
    if (series.length < 3) continue
    const last3 = series.slice(-3).map((p) => p.value)
    if (Math.max(...last3) <= last3[0]) {
      const name = exerciseById(c.id)?.name
      if (name) stalled.push(name)
    }
  }
  return stalled.length >= 2 ? { stalled } : null
}
