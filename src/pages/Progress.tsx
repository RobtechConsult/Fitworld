import { PageHeader } from '@/components/layout/AppShell'
import { ComingSoon } from '@/components/ComingSoon'

export function Progress() {
  return (
    <div>
      <PageHeader title="Fortschritt" subtitle="Graphen zu Kraft, Volumen & Körper" />
      <ComingSoon title="Fortschritts-Graphen folgen">
        Swipebare, „fancy" Graphen mit Zielen – sobald Workout- und Körperdaten vorhanden sind.
      </ComingSoon>
    </div>
  )
}
