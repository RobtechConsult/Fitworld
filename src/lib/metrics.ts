import type { Workout, WorkoutEntry, WorkoutSet } from './types'

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
