import { PageHeader } from '@/components/layout/AppShell'
import { ComingSoon } from '@/components/ComingSoon'

export function Body() {
  return (
    <div>
      <PageHeader title="Körper-Metriken" subtitle="Gewicht, KFA & Umfänge" />
      <ComingSoon title="Körper-Tracking folgt">
        Körpergewicht, Körperfettanteil und Umfänge – diese Daten fließen später automatisch in dein
        Status-Hub-Cockpit.
      </ComingSoon>
    </div>
  )
}
