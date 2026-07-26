import type { AppData, BodyMetric, Workout } from './types'

/**
 * ============================================================
 *  HUB-BRÜCKE: gemeinsames Datenformat (ForgeFit  <->  Status Hub)
 * ============================================================
 *
 * Ziel (siehe PROJECT_KNOWLEDGE.md): Trainingsdaten fließen nahtlos in das
 * Status-Hub-Cockpit. Kurzfristig via JSON-Export/-Import, langfristig über
 * ein gemeinsames Cloud-Backend – DIESES Format bleibt dabei die Vertrags-
 * schnittstelle (Contract). Änderungen NUR mit erhöhter schemaVersion.
 *
 * Der Status Hub interessiert sich laut Vision v. a. für:
 *   1) Körpergewicht (Zeitreihe)
 *   2) Workouts (Zusammenfassung je Einheit)
 * Deshalb liefert das Format einen vollständigen Backup-Teil UND einen
 * schlanken, stabilen `hub`-Teil, den der Hub direkt konsumieren kann.
 */

export const FORGEFIT_SCHEMA_VERSION = 1
export const FORGEFIT_APP_ID = 'forgefit' as const

/** Schlanke, Hub-freundliche Sicht auf eine Trainingseinheit. */
export interface HubWorkoutSummary {
  id: string
  date: string // YYYY-MM-DD
  name?: string
  exerciseCount: number
  totalSets: number
  /** Gesamtvolumen in kg (Σ reps × weight über abgeschlossene Sätze). */
  totalVolumeKg: number
  durationSec?: number
}

/** Schlanke Körpergewichts-/KFA-Zeitreihe für den Hub. */
export interface HubBodyPoint {
  date: string // YYYY-MM-DD
  weightKg?: number
  bodyFatPct?: number
}

/** Stabiler, minimaler Vertrag, den der Status Hub direkt liest. */
export interface HubBridgePayload {
  weight: HubBodyPoint[]
  workouts: HubWorkoutSummary[]
}

/** Vollständiger Export-Umschlag (Backup + Hub-Sicht). */
export interface ForgeFitExport {
  app: typeof FORGEFIT_APP_ID
  schemaVersion: number
  exportedAt: string // ISO-Zeitstempel
  /** vollständiges Backup zum verlustfreien Re-Import. */
  data: AppData
  /** abgeleitete, Hub-freundliche Sicht (read-only Convenience). */
  hub: HubBridgePayload
}

/** Gesamtvolumen einer Einheit über abgeschlossene Sätze. */
export function workoutVolumeKg(w: Workout): number {
  let vol = 0
  for (const entry of w.entries) {
    for (const set of entry.sets) {
      if (set.completed) vol += set.reps * set.weightKg
    }
  }
  return Math.round(vol)
}

export function toHubWorkoutSummary(w: Workout): HubWorkoutSummary {
  const totalSets = w.entries.reduce(
    (n, e) => n + e.sets.filter((s) => s.completed).length,
    0,
  )
  return {
    id: w.id,
    date: w.date,
    name: w.name,
    exerciseCount: w.entries.length,
    totalSets,
    totalVolumeKg: workoutVolumeKg(w),
    durationSec: w.durationSec,
  }
}

export function toHubBodyPoint(m: BodyMetric): HubBodyPoint {
  return { date: m.date, weightKg: m.weightKg, bodyFatPct: m.bodyFatPct }
}

/** Baut die schlanke Hub-Sicht aus dem vollen App-Zustand. */
export function buildHubPayload(data: AppData): HubBridgePayload {
  return {
    weight: [...data.bodyMetrics]
      .filter((m) => m.weightKg != null || m.bodyFatPct != null)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(toHubBodyPoint),
    workouts: [...data.workouts]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(toHubWorkoutSummary),
  }
}

/** Erzeugt den vollständigen Export-Umschlag. */
export function buildExport(data: AppData, exportedAt: string): ForgeFitExport {
  return {
    app: FORGEFIT_APP_ID,
    schemaVersion: FORGEFIT_SCHEMA_VERSION,
    exportedAt,
    data,
    hub: buildHubPayload(data),
  }
}

export interface ImportResult {
  ok: boolean
  data?: AppData
  error?: string
}

/**
 * Liest einen Export wieder ein. Toleriert höhere Minor-Details, lehnt aber
 * fremde Apps / inkompatible Schema-Versionen bewusst ab.
 */
export function parseImport(json: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { ok: false, error: 'Datei ist kein gültiges JSON.' }
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, error: 'Unerwartetes Format.' }
  }
  const env = parsed as Partial<ForgeFitExport>

  if (env.app !== FORGEFIT_APP_ID) {
    return { ok: false, error: 'Diese Datei stammt nicht aus ForgeFit.' }
  }
  if (typeof env.schemaVersion !== 'number' || env.schemaVersion > FORGEFIT_SCHEMA_VERSION) {
    return {
      ok: false,
      error: `Schema-Version ${String(env.schemaVersion)} wird von dieser App-Version nicht unterstützt.`,
    }
  }
  if (!env.data || typeof env.data !== 'object') {
    return { ok: false, error: 'Backup-Daten fehlen.' }
  }

  const d = env.data as Partial<AppData>
  const data: AppData = {
    customExercises: Array.isArray(d.customExercises) ? d.customExercises : [],
    workouts: Array.isArray(d.workouts) ? d.workouts : [],
    plans: Array.isArray(d.plans) ? d.plans : [],
    bodyMetrics: Array.isArray(d.bodyMetrics) ? d.bodyMetrics : [],
    settings: { unit: 'metric', ...(d.settings ?? {}) },
  }
  return { ok: true, data }
}
