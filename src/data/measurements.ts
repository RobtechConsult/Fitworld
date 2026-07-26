/** Optionale Körperumfänge (cm) mit stabilen Keys + Anzeigenamen. */
export interface MeasurementDef {
  key: string
  label: string
}

export const MEASUREMENTS: MeasurementDef[] = [
  { key: 'neck', label: 'Hals' },
  { key: 'chest', label: 'Brust' },
  { key: 'waist', label: 'Taille' },
  { key: 'hip', label: 'Hüfte' },
  { key: 'arm', label: 'Arm' },
  { key: 'thigh', label: 'Oberschenkel' },
  { key: 'calf', label: 'Wade' },
]

export const MEASUREMENT_LABELS: Record<string, string> = Object.fromEntries(
  MEASUREMENTS.map((m) => [m.key, m.label]),
)
