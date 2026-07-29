import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from '@/store/StoreContext'
import { AppShell } from '@/components/layout/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { Exercises } from '@/pages/exercises/Exercises'
import { Workouts } from '@/pages/Workouts'
import { More } from '@/pages/More'
import { Body } from '@/pages/Body'
import { Plans } from '@/pages/Plans'
import { Calendar } from '@/pages/Calendar'
import { Settings } from '@/pages/Settings'
import { ExerciseDetailPage } from '@/pages/ExerciseDetailPage'
import { DataPage } from '@/pages/DataPage'
import { Impressum } from '@/pages/Impressum'
import { Datenschutz } from '@/pages/Datenschutz'

// Recharts ist groß -> Fortschritts-Graphen erst beim Öffnen laden (Code-Splitting).
const Progress = lazy(() => import('@/pages/Progress').then((m) => ({ default: m.Progress })))

function PageFallback() {
  return (
    <div className="flex h-40 items-center justify-center text-sm text-[var(--color-ink-muted)]">
      Lädt …
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      {/* HashRouter: robuste Deep-Links auf GitHub Pages ohne Server-Rewrites. */}
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="workouts" element={<Workouts />} />
            <Route
              path="progress"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Progress />
                </Suspense>
              }
            />
            <Route path="more" element={<More />} />
            <Route path="body" element={<Body />} />
            <Route path="plans" element={<Plans />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
            <Route path="exercise/:id" element={<ExerciseDetailPage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="impressum" element={<Impressum />} />
            <Route path="datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}
