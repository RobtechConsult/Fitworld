import type { AppData, Workout } from './types'

/**
 * Workouts für die gym-spezifische Gewichts-/Progressions-Anzeige.
 * - „Alle Gyms" aktiv ODER kein Gym gewählt -> alle Einheiten.
 * - sonst nur Einheiten des aktiven Gyms (saubere Trennung der Gewichte).
 */
export function workoutsForActiveGym(data: AppData): Workout[] {
  const { activeGymId, showAllGyms } = data.settings
  if (showAllGyms || !activeGymId) return data.workouts
  return data.workouts.filter((w) => w.gymId === activeGymId)
}

/** Name des aktiven Gyms (oder undefined). */
export function activeGymName(data: AppData): string | undefined {
  const { activeGymId } = data.settings
  if (!activeGymId) return undefined
  return data.gyms?.find((g) => g.id === activeGymId)?.name
}
