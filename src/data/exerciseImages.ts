/**
 * Übungsbilder – Zuordnung Seed-Übung -> lokale Bilddateien (public/exercise-images/).
 *
 * HINWEIS (R-01): Die früheren Foto-Dateien (reale Personen, ungeklärte
 * Lizenzkette) wurden entfernt. Neue, personenfreie Muskelfiguren werden
 * frisch generiert und hier – mit denselben `seed:*`-Keys – wieder eingetragen.
 * Bis dahin ist die Zuordnung leer; die App zeigt den Fallback (Hantel-Icon).
 * Spec/Prompt: docs/exercise-figures-spec.md · Rechtslage: docs/legal/.
 *
 * Neues Namensschema (transparente PNGs):
 *   <übungs-key>-0.png = Startposition, <übungs-key>-1.png = Endposition
 * z. B. 'seed:bench-press': ['bench-press-0.png', 'bench-press-1.png']
 */
const FILES: Record<string, string[]> = {}

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
