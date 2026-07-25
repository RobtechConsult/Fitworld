import { PageHeader } from '@/components/layout/AppShell'
import { ComingSoon } from '@/components/ComingSoon'

export function Workouts() {
  return (
    <div>
      <PageHeader title="Training" subtitle="Workouts tracken & Progression sehen" />
      <ComingSoon title="Workout-Tracking folgt als Nächstes">
        Hier trackst du bald Sätze, Wiederholungen und Gewicht – aufbauend auf der Übungs­datenbank,
        die bereits steht. Danach folgen Progression und Fortschritts-Graphen.
      </ComingSoon>
    </div>
  )
}
