/**
 * Übungsbilder – Zuordnung Seed-Übung -> lokale Bilddateien (public/exercise-images/).
 * Quelle: Free Exercise DB (yuhonas/free-exercise-db), Lizenz: The Unlicense (Public Domain).
 * Siehe public/exercise-images/CREDITS.md. Bilder liegen lokal im Repo -> offline-fähig.
 */
const FILES: Record<string, string[]> = {
  'seed:back-squat': ['back-squat-0.jpg', 'back-squat-1.jpg'],
  'seed:barbell-curl': ['barbell-curl-0.jpg', 'barbell-curl-1.jpg'],
  'seed:barbell-row': ['barbell-row-0.jpg', 'barbell-row-1.jpg'],
  'seed:bench-press': ['bench-press-0.jpg', 'bench-press-1.jpg'],
  'seed:cable-crunch': ['cable-crunch-0.jpg', 'cable-crunch-1.jpg'],
  'seed:calf-raise': ['calf-raise-0.jpg', 'calf-raise-1.jpg'],
  'seed:chest-fly': ['chest-fly-0.jpg', 'chest-fly-1.jpg'],
  'seed:db-curl': ['db-curl-0.jpg', 'db-curl-1.jpg'],
  'seed:deadlift': ['deadlift-0.jpg', 'deadlift-1.jpg'],
  'seed:dips': ['dips-0.jpg', 'dips-1.jpg'],
  'seed:face-pull': ['face-pull-0.jpg', 'face-pull-1.jpg'],
  'seed:hanging-leg-raise': ['hanging-leg-raise-0.jpg', 'hanging-leg-raise-1.jpg'],
  'seed:hip-thrust': ['hip-thrust-0.jpg', 'hip-thrust-1.jpg'],
  'seed:incline-db-press': ['incline-db-press-0.jpg', 'incline-db-press-1.jpg'],
  'seed:lat-pulldown': ['lat-pulldown-0.jpg', 'lat-pulldown-1.jpg'],
  'seed:lateral-raise': ['lateral-raise-0.jpg', 'lateral-raise-1.jpg'],
  'seed:leg-curl': ['leg-curl-0.jpg', 'leg-curl-1.jpg'],
  'seed:leg-extension': ['leg-extension-0.jpg', 'leg-extension-1.jpg'],
  'seed:leg-press': ['leg-press-0.jpg', 'leg-press-1.jpg'],
  'seed:overhead-press': ['overhead-press-0.jpg', 'overhead-press-1.jpg'],
  'seed:plank': ['plank-0.jpg', 'plank-1.jpg'],
  'seed:pullup': ['pullup-0.jpg', 'pullup-1.jpg'],
  'seed:pushup': ['pushup-0.jpg', 'pushup-1.jpg'],
  'seed:romanian-deadlift': ['romanian-deadlift-0.jpg', 'romanian-deadlift-1.jpg'],
  'seed:rowing-machine': ['rowing-machine-0.jpg', 'rowing-machine-1.jpg'],
  'seed:seated-row': ['seated-row-0.jpg', 'seated-row-1.jpg'],
  'seed:treadmill': ['treadmill-0.jpg'],
  'seed:triceps-pushdown': ['triceps-pushdown-0.jpg', 'triceps-pushdown-1.jpg'],
}

/** Vollständige Bild-URLs (mit Vite-Base) für eine Übung. */
export function exerciseImages(id: string): string[] {
  const base = import.meta.env.BASE_URL
  return (FILES[id] ?? []).map((f) => `${base}exercise-images/${f}`)
}

/** Thumbnail-URL (erstes Bild) oder undefined. */
export function exerciseThumb(id: string): string | undefined {
  return exerciseImages(id)[0]
}

/** Gibt es Bilder zu dieser Übung? */
export function hasExerciseImage(id: string): boolean {
  return (FILES[id]?.length ?? 0) > 0
}
