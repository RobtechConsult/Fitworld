/**
 * ForgeFit – Kern-Datenmodell.
 *
 * Dieses Modell ist die Grundlage für alle Features (Übungen, Tracking,
 * Pläne, Körper-Metriken) UND für die Datenbrücke zum Status Hub.
 * Änderungen hier immer bewusst versionieren (siehe dataFormat.ts).
 */

export type ID = string

/** Muskelgruppen – bewusst kompakt gehalten, erweiterbar. */
export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'lats'
  | 'traps'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'abs'
  | 'obliques'
  | 'fullbody'
  | 'cardio'

export type ExerciseCategory = 'compound' | 'isolation' | 'cardio' | 'mobility'

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'kettlebell'
  | 'band'
  | 'other'

export interface Exercise {
  id: ID
  name: string
  primaryMuscles: MuscleGroup[]
  secondaryMuscles: MuscleGroup[]
  category: ExerciseCategory
  equipment: Equipment
  /** Kurze Ausführungshinweise (generisch, keine personenbezogenen Daten). */
  instructions?: string
  /** true = vom Nutzer angelegt (in localStorage), sonst Seed-Übung. */
  isCustom?: boolean
  createdAt?: string
}

/** Ein einzelner Satz beim Tracking. */
export interface WorkoutSet {
  reps: number
  /** Gewicht in kg (Einheit global in Settings; intern immer kg). */
  weightKg: number
  /** optional: Rate of Perceived Exertion 1–10 */
  rpe?: number
  completed: boolean
}

export interface WorkoutEntry {
  exerciseId: ID
  sets: WorkoutSet[]
  notes?: string
}

/** Eine getrackte Trainingseinheit. */
export interface Workout {
  id: ID
  /** ISO-Datum (YYYY-MM-DD) des Trainings. */
  date: string
  name?: string
  entries: WorkoutEntry[]
  /** optional aus einem Plan-Tag erzeugt. */
  planId?: ID
  durationSec?: number
  notes?: string
  createdAt: string
}

/** Ein Tag innerhalb eines Trainingsplans (z. B. „Push"). */
export interface PlanDay {
  id: ID
  name: string
  exercises: Array<{
    exerciseId: ID
    targetSets?: number
    targetRepsMin?: number
    targetRepsMax?: number
  }>
}

/** Ein Trainingsplan / Split. */
export interface Plan {
  id: ID
  name: string
  description?: string
  days: PlanDay[]
  createdAt: string
}

/** Körper-Metrik-Eintrag (Gewicht, KFA, Umfänge). */
export interface BodyMetric {
  id: ID
  /** ISO-Datum (YYYY-MM-DD). */
  date: string
  weightKg?: number
  bodyFatPct?: number
  /** freie Umfänge in cm, z. B. { waist: 82, arm: 38 } */
  measurementsCm?: Record<string, number>
  note?: string
  createdAt: string
}

/** Nutzereinstellungen. */
export interface Settings {
  unit: 'metric' | 'imperial'
  displayName?: string
}

/** Kompletter App-Zustand (persistiert in localStorage). */
export interface AppData {
  /** nur vom Nutzer angelegte Übungen; Seed-Übungen kommen aus Code. */
  customExercises: Exercise[]
  workouts: Workout[]
  plans: Plan[]
  bodyMetrics: BodyMetric[]
  settings: Settings
}

export const DEFAULT_SETTINGS: Settings = {
  unit: 'metric',
}

export const EMPTY_APP_DATA: AppData = {
  customExercises: [],
  workouts: [],
  plans: [],
  bodyMetrics: [],
  settings: DEFAULT_SETTINGS,
}
