/** Lokales ISO-Datum (YYYY-MM-DD) – NICHT UTC, damit nahe Mitternacht
 *  nicht der falsche Tag angezeigt wird. */
export function isoLocal(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Heutiges lokales Datum als YYYY-MM-DD. */
export function todayIso(): string {
  return isoLocal(new Date())
}
