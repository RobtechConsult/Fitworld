import { PageHeader } from '@/components/layout/AppShell'
import { ComingSoon } from '@/components/ComingSoon'

export function Plans() {
  return (
    <div>
      <PageHeader title="Pläne" subtitle="Splits & Routinen zusammenstellen" />
      <ComingSoon title="Trainingspläne folgen">
        Stelle aus der Übungs­datenbank eigene Splits zusammen (z. B. Push/Pull/Legs) und starte
        Workouts direkt aus einem Plan-Tag.
      </ComingSoon>
    </div>
  )
}
