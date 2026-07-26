import type { Settings } from './types'

/**
 * Einheiten-Umrechnung. Intern werden Gewichte IMMER in kg gespeichert –
 * hier findet nur die Anzeige-/Eingabe-Umrechnung statt (kg <-> lbs).
 */
export type Unit = Settings['unit']

const LB_PER_KG = 2.2046226218

export function weightLabel(unit: Unit): string {
  return unit === 'imperial' ? 'lbs' : 'kg'
}

/** kg -> Anzeigewert in der aktiven Einheit (auf 1 Nachkommastelle gerundet). */
export function fromKg(kg: number, unit: Unit): number {
  const v = unit === 'imperial' ? kg * LB_PER_KG : kg
  return Math.round(v * 10) / 10
}

/** Anzeigewert (aktive Einheit) -> kg zum Speichern. */
export function toKg(value: number, unit: Unit): number {
  return unit === 'imperial' ? value / LB_PER_KG : value
}

/** Formatiert ein kg-Gewicht in der aktiven Einheit inkl. Label, z. B. "82,5 kg". */
export function fmtWeight(kg: number, unit: Unit, opts?: { maximumFractionDigits?: number }): string {
  const v = fromKg(kg, unit)
  return `${v.toLocaleString('de-DE', { maximumFractionDigits: opts?.maximumFractionDigits ?? 1 })} ${weightLabel(unit)}`
}

/** Nur die Zahl (aktive Einheit) als lokalisierter String, ohne Label. */
export function fmtWeightValue(kg: number, unit: Unit, opts?: { maximumFractionDigits?: number }): string {
  return fromKg(kg, unit).toLocaleString('de-DE', {
    maximumFractionDigits: opts?.maximumFractionDigits ?? 1,
  })
}
