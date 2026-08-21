/**
 * Übungsbilder – Zuordnung Seed-Übung -> lokale Bilddateien (public/exercise-images/).
 *
 * Personenfreie, anatomische Muskelfiguren (Écorché), frisch generiert von
 * „Vinci" (OpenAI gpt-image-2), transparente PNGs. Generierungs-/Lizenznachweis:
 * /CREDITS.md · Rechtslage: docs/legal/. Zielmuskel je Figur violett hervorgehoben.
 *
 * Namensschema: <übungs-key>-0.png = Start, <übungs-key>-1.png = Ende.
 * Alle 28 Original-Seed-Übungen sind mit Figur versehen. Noch offen (folgt von
 * Vinci): die späteren Katalog-Ergänzungen (weitere KH-/Maschinen-Varianten,
 * Unterarme, funktionelle/konditionelle Übungen).
 */
const FILES: Record<string, string[]> = {
  // Brust
  'seed:bench-press': ['bench-press-0.png', 'bench-press-1.png'],
  'seed:incline-db-press': ['incline-db-press-0.png', 'incline-db-press-1.png'],
  'seed:chest-fly': ['chest-fly-0.png', 'chest-fly-1.png'],
  'seed:pushup': ['pushup-0.png', 'pushup-1.png'],
  // Rücken
  'seed:deadlift': ['deadlift-0.png', 'deadlift-1.png'],
  'seed:pullup': ['pullup-0.png', 'pullup-1.png'],
  'seed:barbell-row': ['barbell-row-0.png', 'barbell-row-1.png'],
  'seed:lat-pulldown': ['lat-pulldown-0.png', 'lat-pulldown-1.png'],
  'seed:seated-row': ['seated-row-0.png', 'seated-row-1.png'],
  // Schultern
  'seed:overhead-press': ['overhead-press-0.png', 'overhead-press-1.png'],
  'seed:lateral-raise': ['lateral-raise-0.png', 'lateral-raise-1.png'],
  'seed:face-pull': ['face-pull-0.png', 'face-pull-1.png'],
  // Arme
  'seed:barbell-curl': ['barbell-curl-0.png', 'barbell-curl-1.png'],
  'seed:db-curl': ['db-curl-0.png', 'db-curl-1.png'],
  'seed:triceps-pushdown': ['triceps-pushdown-0.png', 'triceps-pushdown-1.png'],
  'seed:dips': ['dips-0.png', 'dips-1.png'],
  // Beine
  'seed:back-squat': ['back-squat-0.png', 'back-squat-1.png'],
  'seed:leg-press': ['leg-press-0.png', 'leg-press-1.png'],
  'seed:romanian-deadlift': ['romanian-deadlift-0.png', 'romanian-deadlift-1.png'],
  'seed:leg-curl': ['leg-curl-0.png', 'leg-curl-1.png'],
  'seed:leg-extension': ['leg-extension-0.png', 'leg-extension-1.png'],
  'seed:calf-raise': ['calf-raise-0.png', 'calf-raise-1.png'],
  'seed:hip-thrust': ['hip-thrust-0.png', 'hip-thrust-1.png'],
  // Core
  'seed:plank': ['plank-0.png', 'plank-1.png'],
  'seed:hanging-leg-raise': ['hanging-leg-raise-0.png', 'hanging-leg-raise-1.png'],
  'seed:cable-crunch': ['cable-crunch-0.png', 'cable-crunch-1.png'],
  // Cardio
  'seed:rowing-machine': ['rowing-machine-0.png', 'rowing-machine-1.png'],
  'seed:treadmill': ['treadmill-0.png', 'treadmill-1.png'],
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
