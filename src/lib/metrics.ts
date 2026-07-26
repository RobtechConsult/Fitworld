import type { BodyMetric, Workout, WorkoutEntry, WorkoutSet } from './types'
import { workoutVolumeKg } from './dataFormat'

/** Geschätztes 1-RM (Epley-Formel). Nur für completed Sätze sinnvoll. */
export function epley1RM(weightKg: number, reps: number): number {
  if (reps <= 0 || weightKg <= 0) return 0
  if (reps === 1) return weightKg
  return weightKg * (1 + reps / 30)
}

/** Volumen eines Satzes (nur wenn abgeschlossen). */
export function setVolume(s: WorkoutSet): number {
  return s.completed ? s.reps * s.weightKg : 0
}

export interface ExerciseStats {
  /** höchstes bewegtes Gewicht (kg) über alle abgeschlossenen Sätze. */
  maxWeightKg: number
  /** bestes geschätztes 1-RM (kg). */
  best1RMKg: number
  /** Anzahl getrackter Einheiten mit dieser Übung. */
  sessions: number
  /** letzter Eintrag dieser Übung (chronologisch neueste Einheit). */
  lastEntry?: { date: string; sets: WorkoutSet[] }
}

/**
 * Aggregiert Statistiken einer Übung über alle Workouts.
 * `workouts` darf in beliebiger Reihenfolge sein.
 */
export function exerciseStats(workouts: Workout[], exerciseId: string): ExerciseStats {
  let maxWeightKg = 0
  let best1RMKg = 0
  let sessions = 0
  let lastEntry: ExerciseStats['lastEntry']
  let lastDate = ''

  for (const w of workouts) {
    const entry = w.entries.find((e) => e.exerciseId === exerciseId)
    if (!entry) continue
    sessions++
    for (const s of entry.sets) {
      if (!s.completed) continue
      if (s.weightKg > maxWeightKg) maxWeightKg = s.weightKg
      const orm = epley1RM(s.weightKg, s.reps)
      if (orm > best1RMKg) best1RMKg = orm
    }
    if (w.date > lastDate) {
      lastDate = w.date
      lastEntry = { date: w.date, sets: entry.sets }
    }
  }

  return { maxWeightKg, best1RMKg, sessions, lastEntry }
}

export interface SeriesPoint {
  /** ISO-Datum (YYYY-MM-DD) – für Sortierung & Filter. */
  date: string
  value: number
}

/** Körpergewichts-Zeitreihe (aufsteigend), nur Einträge mit Gewicht. */
export function weightSeries(metrics: BodyMetric[]): SeriesPoint[] {
  return metrics
    .filter((m) => m.weightKg != null)
    .map((m) => ({ date: m.date, value: m.weightKg as number }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** KFA-Zeitreihe (aufsteigend), nur Einträge mit KFA. */
export function bodyFatSeries(metrics: BodyMetric[]): SeriesPoint[] {
  return metrics
    .filter((m) => m.bodyFatPct != null)
    .map((m) => ({ date: m.date, value: m.bodyFatPct as number }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Trainingsvolumen je Einheit (aufsteigend nach Datum). */
export function volumeSeries(workouts: Workout[]): SeriesPoint[] {
  return workouts
    .map((w) => ({ date: w.date, value: workoutVolumeKg(w) }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Bestes geschätztes 1-RM je Einheit für eine Übung (aufsteigend). */
export function oneRMSeries(workouts: Workout[], exerciseId: string): SeriesPoint[] {
  const points: SeriesPoint[] = []
  for (const w of workouts) {
    const entry = w.entries.find((e) => e.exerciseId === exerciseId)
    if (!entry) continue
    let best = 0
    for (const s of entry.sets) {
      if (!s.completed) continue
      const orm = epley1RM(s.weightKg, s.reps)
      if (orm > best) best = orm
    }
    if (best > 0) points.push({ date: w.date, value: Math.round(best) })
  }
  return points.sort((a, b) => a.date.localeCompare(b.date))
}

/** Übungen, die in Workouts vorkommen, mit Häufigkeit (absteigend). */
export function exercisesInWorkouts(workouts: Workout[]): Array<{ id: string; sessions: number }> {
  const counts = new Map<string, number>()
  for (const w of workouts) {
    for (const e of w.entries) {
      if (e.sets.some((s) => s.completed)) counts.set(e.exerciseId, (counts.get(e.exerciseId) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([id, sessions]) => ({ id, sessions }))
    .sort((a, b) => b.sessions - a.sessions)
}

/** Kompakte Zusammenfassung eines Eintrags, z. B. "3×8 · 80 kg". */
export function summarizeEntry(entry: WorkoutEntry): string {
  const done = entry.sets.filter((s) => s.completed)
  const list = done.length ? done : entry.sets
  if (!list.length) return '—'
  const weights = [...new Set(list.map((s) => s.weightKg))]
  const repsList = list.map((s) => s.reps)
  const sameReps = new Set(repsList).size === 1
  const repsPart = sameReps ? `${list.length}×${repsList[0]}` : `${list.length} Sätze`
  const weightPart =
    weights.length === 1 ? `${weights[0]} kg` : `${Math.min(...weights)}–${Math.max(...weights)} kg`
  return `${repsPart} · ${weightPart}`
}
