import type { MuscleGroup } from '@/lib/types'

/** Anzeigenamen (DE) + Gruppierung für Filter/UI. */
export const MUSCLE_LABELS: Record<MuscleGroup, string> = {
  chest: 'Brust',
  back: 'Rücken',
  lats: 'Latissimus',
  traps: 'Trapez',
  shoulders: 'Schultern',
  biceps: 'Bizeps',
  triceps: 'Trizeps',
  forearms: 'Unterarme',
  quads: 'Quadrizeps',
  hamstrings: 'Beinbeuger',
  glutes: 'Gesäß',
  calves: 'Waden',
  abs: 'Bauch',
  obliques: 'Seitl. Bauch',
  fullbody: 'Ganzkörper',
  cardio: 'Cardio',
}

/** Reihenfolge für Filter-Chips (grob top→bottom). */
export const MUSCLE_ORDER: MuscleGroup[] = [
  'chest',
  'back',
  'lats',
  'shoulders',
  'traps',
  'biceps',
  'triceps',
  'forearms',
  'abs',
  'obliques',
  'quads',
  'hamstrings',
  'glutes',
  'calves',
  'fullbody',
  'cardio',
]

export const EQUIPMENT_LABELS: Record<string, string> = {
  barbell: 'Langhantel',
  dumbbell: 'Kurzhantel',
  machine: 'Maschine',
  cable: 'Kabelzug',
  bodyweight: 'Körpergewicht',
  kettlebell: 'Kettlebell',
  band: 'Band',
  other: 'Sonstiges',
}

export const CATEGORY_LABELS: Record<string, string> = {
  compound: 'Grundübung',
  isolation: 'Isolation',
  cardio: 'Cardio',
  mobility: 'Mobility',
}
