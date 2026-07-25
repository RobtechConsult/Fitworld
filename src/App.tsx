import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from '@/store/StoreContext'
import { AppShell } from '@/components/layout/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { Exercises } from '@/pages/exercises/Exercises'
import { Workouts } from '@/pages/Workouts'
import { Progress } from '@/pages/Progress'
import { More } from '@/pages/More'
import { Body } from '@/pages/Body'
import { Plans } from '@/pages/Plans'
import { DataPage } from '@/pages/DataPage'

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
            <Route path="progress" element={<Progress />} />
            <Route path="more" element={<More />} />
            <Route path="body" element={<Body />} />
            <Route path="plans" element={<Plans />} />
            <Route path="data" element={<DataPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}
