/**
 * Übungsbilder – Zuordnung Seed-Übung -> lokale Bilddateien (public/exercise-images/).
 *
 * Personenfreie, anatomische Muskelfiguren (Écorché), frisch generiert von
 * „Vinci" (OpenAI gpt-image-2), transparente PNGs. Generierungs-/Lizenznachweis:
 * /CREDITS.md · Rechtslage: docs/legal/. Zielmuskel je Figur violett hervorgehoben.
 *
 * Namensschema: <übungs-key>-0.png = Start, <übungs-key>-1.png = Ende.
 * Noch offen (folgt von Vinci): Brust-Varianten, Beine, Core, Cardio-Restyle.
 */
const FILES: Record<string, string[]> = {
  'seed:bench-press': ['bench-press-0.png', 'bench-press-1.png'],
  'seed:back-squat': ['back-squat-0.png', 'back-squat-1.png'],
  'seed:barbell-curl': ['barbell-curl-0.png', 'barbell-curl-1.png'],
  'seed:overhead-press': ['overhead-press-0.png', 'overhead-press-1.png'],
  'seed:lateral-raise': ['lateral-raise-0.png', 'lateral-raise-1.png'],
  'seed:pullup': ['pullup-0.png', 'pullup-1.png'],
  'seed:seated-row': ['seated-row-0.png', 'seated-row-1.png'],
  'seed:face-pull': ['face-pull-0.png', 'face-pull-1.png'],
  'seed:triceps-pushdown': ['triceps-pushdown-0.png', 'triceps-pushdown-1.png'],
  'seed:lat-pulldown': ['lat-pulldown-0.png', 'lat-pulldown-1.png'],
  'seed:barbell-row': ['barbell-row-0.png', 'barbell-row-1.png'],
  'seed:db-curl': ['db-curl-0.png', 'db-curl-1.png'],
  'seed:deadlift': ['deadlift-0.png', 'deadlift-1.png'],
  'seed:incline-db-press': ['incline-db-press-0.png', 'incline-db-press-1.png'],
  'seed:leg-press': ['leg-press-0.png', 'leg-press-1.png'],
  'seed:pushup': ['pushup-0.png', 'pushup-1.png'],
  'seed:rowing-machine': ['rowing-machine-0.png'],
  'seed:treadmill': ['treadmill-0.png'],
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
