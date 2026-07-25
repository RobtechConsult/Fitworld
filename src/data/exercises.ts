import type { Exercise } from '@/lib/types'

/**
 * Seed-Übungsdatenbank – generische, allgemein bekannte Übungen.
 * Bewusst KEINE personenbezogenen Daten. Nutzer-eigene Übungen werden
 * separat in localStorage gehalten (AppData.customExercises).
 *
 * IDs mit Präfix "seed:" sind stabil und dürfen nicht verändert werden,
 * da Workouts/Pläne darauf referenzieren.
 */
export const SEED_EXERCISES: Exercise[] = [
  // ---- Brust ----
  {
    id: 'seed:bench-press',
    name: 'Bankdrücken (Langhantel)',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Flach auf der Bank, Langhantel kontrolliert zur Brust senken, kräftig drücken.',
  },
  {
    id: 'seed:incline-db-press',
    name: 'Schrägbankdrücken (Kurzhantel)',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['shoulders', 'triceps'],
    category: 'compound',
    equipment: 'dumbbell',
    instructions: 'Bank auf ca. 30–45°, Kurzhanteln auf Höhe der oberen Brust drücken.',
  },
  {
    id: 'seed:chest-fly',
    name: 'Fliegende (Kabel/Maschine)',
    primaryMuscles: ['chest'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'cable',
    instructions: 'Arme leicht gebeugt, in einem Bogen vor der Brust zusammenführen.',
  },
  {
    id: 'seed:pushup',
    name: 'Liegestütze',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders', 'abs'],
    category: 'compound',
    equipment: 'bodyweight',
    instructions: 'Körper gerade, Brust bis knapp über den Boden senken.',
  },

  // ---- Rücken ----
  {
    id: 'seed:deadlift',
    name: 'Kreuzheben',
    primaryMuscles: ['back', 'hamstrings', 'glutes'],
    secondaryMuscles: ['traps', 'forearms', 'quads'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Neutraler Rücken, Hantel eng am Körper führen, mit Hüfte und Beinen strecken.',
  },
  {
    id: 'seed:pullup',
    name: 'Klimmzüge',
    primaryMuscles: ['lats', 'back'],
    secondaryMuscles: ['biceps', 'forearms'],
    category: 'compound',
    equipment: 'bodyweight',
    instructions: 'Aus dem vollen Hang bis das Kinn über die Stange kommt.',
  },
  {
    id: 'seed:barbell-row',
    name: 'Langhantelrudern',
    primaryMuscles: ['back', 'lats'],
    secondaryMuscles: ['biceps', 'traps'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Oberkörper vorgebeugt, Hantel zum unteren Brustkorb ziehen.',
  },
  {
    id: 'seed:lat-pulldown',
    name: 'Latzug',
    primaryMuscles: ['lats', 'back'],
    secondaryMuscles: ['biceps'],
    category: 'compound',
    equipment: 'cable',
    instructions: 'Stange zur oberen Brust ziehen, Schulterblätter nach unten.',
  },
  {
    id: 'seed:seated-row',
    name: 'Rudern am Kabel (sitzend)',
    primaryMuscles: ['back'],
    secondaryMuscles: ['biceps', 'lats'],
    category: 'compound',
    equipment: 'cable',
    instructions: 'Griff zum Bauch ziehen, Brust raus, Rücken neutral.',
  },

  // ---- Schultern ----
  {
    id: 'seed:overhead-press',
    name: 'Schulterdrücken (Langhantel)',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'traps'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Hantel von der Schulter über den Kopf drücken, Rumpf fest.',
  },
  {
    id: 'seed:lateral-raise',
    name: 'Seitheben',
    primaryMuscles: ['shoulders'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'dumbbell',
    instructions: 'Arme seitlich bis Schulterhöhe heben, leicht gebeugt.',
  },
  {
    id: 'seed:face-pull',
    name: 'Face Pull',
    primaryMuscles: ['shoulders', 'traps'],
    secondaryMuscles: ['back'],
    category: 'isolation',
    equipment: 'cable',
    instructions: 'Seil zur Stirn ziehen, Ellbogen hoch, Schulterblätter zusammen.',
  },

  // ---- Bizeps / Trizeps ----
  {
    id: 'seed:barbell-curl',
    name: 'Bizeps-Curls (Langhantel)',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    category: 'isolation',
    equipment: 'barbell',
    instructions: 'Ellbogen fixiert, Hantel kontrolliert curlen, oben kurz halten.',
  },
  {
    id: 'seed:db-curl',
    name: 'Bizeps-Curls (Kurzhantel)',
    primaryMuscles: ['biceps'],
    secondaryMuscles: ['forearms'],
    category: 'isolation',
    equipment: 'dumbbell',
    instructions: 'Abwechselnd oder gleichzeitig, Handgelenk stabil.',
  },
  {
    id: 'seed:triceps-pushdown',
    name: 'Trizeps-Drücken am Kabel',
    primaryMuscles: ['triceps'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'cable',
    instructions: 'Ellbogen am Körper, Seil/Stange nach unten strecken.',
  },
  {
    id: 'seed:dips',
    name: 'Dips',
    primaryMuscles: ['triceps', 'chest'],
    secondaryMuscles: ['shoulders'],
    category: 'compound',
    equipment: 'bodyweight',
    instructions: 'Kontrolliert absenken bis Oberarme parallel, dann drücken.',
  },

  // ---- Beine ----
  {
    id: 'seed:back-squat',
    name: 'Kniebeuge (Langhantel)',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings', 'abs'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Hantel im Nacken, tief in die Hocke, Knie in Fußrichtung.',
  },
  {
    id: 'seed:leg-press',
    name: 'Beinpresse',
    primaryMuscles: ['quads', 'glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    equipment: 'machine',
    instructions: 'Füße schulterbreit, kontrolliert absenken, nicht durchdrücken.',
  },
  {
    id: 'seed:romanian-deadlift',
    name: 'Rumänisches Kreuzheben',
    primaryMuscles: ['hamstrings', 'glutes'],
    secondaryMuscles: ['back'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Beine fast gestreckt, Hüfte zurück, Hantel eng führen.',
  },
  {
    id: 'seed:leg-curl',
    name: 'Beinbeuger (Maschine)',
    primaryMuscles: ['hamstrings'],
    secondaryMuscles: ['calves'],
    category: 'isolation',
    equipment: 'machine',
    instructions: 'Fersen kontrolliert zum Gesäß ziehen.',
  },
  {
    id: 'seed:leg-extension',
    name: 'Beinstrecker (Maschine)',
    primaryMuscles: ['quads'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'machine',
    instructions: 'Beine kontrolliert strecken, oben kurz halten.',
  },
  {
    id: 'seed:calf-raise',
    name: 'Wadenheben',
    primaryMuscles: ['calves'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'machine',
    instructions: 'Volle Dehnung unten, hohe Kontraktion oben.',
  },
  {
    id: 'seed:hip-thrust',
    name: 'Hip Thrust',
    primaryMuscles: ['glutes'],
    secondaryMuscles: ['hamstrings'],
    category: 'compound',
    equipment: 'barbell',
    instructions: 'Rücken auf Bank, Hüfte kraftvoll strecken, oben anspannen.',
  },

  // ---- Bauch / Core ----
  {
    id: 'seed:plank',
    name: 'Unterarmstütz (Plank)',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques'],
    category: 'isolation',
    equipment: 'bodyweight',
    instructions: 'Körper gerade halten, Bauch anspannen, ruhig atmen.',
  },
  {
    id: 'seed:hanging-leg-raise',
    name: 'Hängendes Beinheben',
    primaryMuscles: ['abs'],
    secondaryMuscles: ['obliques', 'forearms'],
    category: 'isolation',
    equipment: 'bodyweight',
    instructions: 'Aus dem Hang die Beine kontrolliert anheben.',
  },
  {
    id: 'seed:cable-crunch',
    name: 'Crunch am Kabel',
    primaryMuscles: ['abs'],
    secondaryMuscles: [],
    category: 'isolation',
    equipment: 'cable',
    instructions: 'Oberkörper einrollen, Bauch fokussiert anspannen.',
  },

  // ---- Cardio ----
  {
    id: 'seed:rowing-machine',
    name: 'Rudergerät',
    primaryMuscles: ['cardio'],
    secondaryMuscles: ['back', 'quads'],
    category: 'cardio',
    equipment: 'machine',
    instructions: 'Beine drücken, dann ziehen; gleichmäßiger Rhythmus.',
  },
  {
    id: 'seed:treadmill',
    name: 'Laufband',
    primaryMuscles: ['cardio'],
    secondaryMuscles: ['quads', 'calves'],
    category: 'cardio',
    equipment: 'machine',
    instructions: 'Gleichmäßiges Tempo, aufrechte Haltung.',
  },
]

/** Schneller Lookup nach ID. */
export const SEED_EXERCISE_MAP: Record<string, Exercise> = Object.fromEntries(
  SEED_EXERCISES.map((e) => [e.id, e]),
)
