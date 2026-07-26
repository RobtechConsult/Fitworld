import { EMPTY_APP_DATA, type AppData } from './types'

/**
 * Local-first Persistenz (MVP): der gesamte AppData-Zustand liegt unter
 * einem versionierten localStorage-Key. Später kann hier ein Cloud-Backend
 * (Cloudflare Workers + D1 / Supabase) andocken, ohne die App-Logik zu ändern.
 */
const STORAGE_KEY = 'forgefit:appdata:v1'

export function loadAppData(): AppData {
  if (typeof localStorage === 'undefined') return structuredClone(EMPTY_APP_DATA)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(EMPTY_APP_DATA)
    const parsed = JSON.parse(raw) as Partial<AppData>
    // defensiv mergen, damit neue Felder alte Speicherstände nicht brechen
    return {
      ...structuredClone(EMPTY_APP_DATA),
      ...parsed,
      settings: { ...EMPTY_APP_DATA.settings, ...(parsed.settings ?? {}) },
    }
  } catch (err) {
    console.error('[forgefit] Konnte AppData nicht laden:', err)
    return structuredClone(EMPTY_APP_DATA)
  }
}

export function saveAppData(data: AppData): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.error('[forgefit] Konnte AppData nicht speichern:', err)
  }
}

/** Einfache, kollisionsarme ID ohne externe Abhängigkeit. */
export function newId(prefix = 'id'): string {
  const rnd =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + performance.now().toString(36)
  return `${prefix}:${rnd}`
}
