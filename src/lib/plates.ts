import type { Unit } from './units'

/**
 * Hantelscheiben-Rechner: zerlegt (Gewicht − Stange)/2 in Scheiben je Seite.
 * Arbeitet in der ANZEIGE-Einheit (kg oder lbs).
 */
export interface PlateColor {
  bg: string
  fg: string
}

export const PLATES_KG = [25, 20, 15, 10, 5, 2.5, 1.25]
export const PLATES_LB = [45, 35, 25, 10, 5, 2.5]

export const PLATE_COLORS: Record<string, PlateColor> = {
  '45': { bg: '#3b6fe0', fg: '#ffffff' },
  '35': { bg: '#efc21a', fg: '#1b1b26' },
  '25': { bg: '#e0483d', fg: '#ffffff' },
  '20': { bg: '#3b6fe0', fg: '#ffffff' },
  '15': { bg: '#efc21a', fg: '#1b1b26' },
  '10': { bg: '#34a853', fg: '#ffffff' },
  '5': { bg: '#eceef5', fg: '#1b1b26' },
  '2.5': { bg: '#b0384f', fg: '#ffffff' },
  '1.25': { bg: '#8a90a6', fg: '#ffffff' },
}

export function plateSetFor(unit: Unit): number[] {
  return unit === 'imperial' ? PLATES_LB : PLATES_KG
}

export function defaultBarFor(unit: Unit): number {
  return unit === 'imperial' ? 45 : 20
}

export function defaultStepFor(unit: Unit): number {
  return unit === 'imperial' ? 5 : 2.5
}

export interface PlateBreakdown {
  /** Scheiben je Seite, absteigend. */
  plates: number[]
  /** Rest je Seite, der nicht mit Scheiben abbildbar ist (Anzeige-Einheit). */
  leftoverPerSide: number
  /** true, wenn das Gewicht kleiner/gleich der Stange ist. */
  belowBar: boolean
}

/** Zerlegt total (Anzeige-Einheit) mit gegebener Stange in Scheiben je Seite. */
export function computePlates(total: number, bar: number, plateSet: number[]): PlateBreakdown {
  let perSide = (total - bar) / 2
  if (perSide <= 0.0001) {
    return { plates: [], leftoverPerSide: 0, belowBar: perSide < -0.0001 || total < bar }
  }
  const plates: number[] = []
  for (const p of plateSet) {
    while (perSide >= p - 1e-6) {
      plates.push(p)
      perSide = Math.round((perSide - p) * 1000) / 1000
    }
  }
  return { plates, leftoverPerSide: perSide, belowBar: false }
}

export function plateColor(p: number): PlateColor {
  return PLATE_COLORS[String(p)] ?? { bg: '#8a90a6', fg: '#ffffff' }
}
