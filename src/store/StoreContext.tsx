import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AppData, BodyMetric, Exercise, Plan, Workout } from '@/lib/types'
import { loadAppData, newId, saveAppData } from '@/lib/storage'
import { SEED_EXERCISES } from '@/data/exercises'

/** Transiente Vorgabe, um den Workout-Editor vorbefüllt zu öffnen (nicht persistiert). */
export interface PendingStart {
  exerciseIds: string[]
  name?: string
}

interface StoreValue {
  data: AppData
  /** Seed- + Custom-Übungen zusammengeführt (Custom zuerst). */
  allExercises: Exercise[]
  exerciseById: (id: string) => Exercise | undefined
  update: (fn: (draft: AppData) => AppData) => void
  addCustomExercise: (
    ex: Omit<Exercise, 'id' | 'isCustom' | 'createdAt'>,
  ) => Exercise
  deleteCustomExercise: (id: string) => void
  /** Neue Einheit anlegen; erzeugt id + createdAt. */
  addWorkout: (w: Omit<Workout, 'id' | 'createdAt'>) => Workout
  updateWorkout: (id: string, patch: Partial<Omit<Workout, 'id'>>) => void
  deleteWorkout: (id: string) => void
  /** Körper-Metrik anlegen; erzeugt id + createdAt. */
  addBodyMetric: (m: Omit<BodyMetric, 'id' | 'createdAt'>) => BodyMetric
  deleteBodyMetric: (id: string) => void
  /** Trainingsplan anlegen; erzeugt id + createdAt. */
  addPlan: (p: Omit<Plan, 'id' | 'createdAt'>) => Plan
  updatePlan: (id: string, patch: Partial<Omit<Plan, 'id'>>) => void
  deletePlan: (id: string) => void
  /** Transiente Vorgabe für den Workout-Editor (z. B. aus einem Plan-Tag). */
  pendingStart: PendingStart | null
  startWorkoutFrom: (exerciseIds: string[], name?: string) => void
  clearPendingStart: () => void
  replaceAll: (data: AppData) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadAppData())

  // Persistenz: bei jeder Änderung speichern (nach dem ersten Load).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    saveAppData(data)
  }, [data])

  const update = useCallback((fn: (draft: AppData) => AppData) => {
    setData((prev) => fn(prev))
  }, [])

  const replaceAll = useCallback((next: AppData) => setData(next), [])

  const addCustomExercise = useCallback<StoreValue['addCustomExercise']>((ex) => {
    const created: Exercise = {
      ...ex,
      id: newId('ex'),
      isCustom: true,
      createdAt: new Date().toISOString(),
    }
    setData((prev) => ({ ...prev, customExercises: [created, ...prev.customExercises] }))
    return created
  }, [])

  const deleteCustomExercise = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      customExercises: prev.customExercises.filter((e) => e.id !== id),
    }))
  }, [])

  const addWorkout = useCallback<StoreValue['addWorkout']>((w) => {
    const created: Workout = { ...w, id: newId('wo'), createdAt: new Date().toISOString() }
    setData((prev) => ({ ...prev, workouts: [created, ...prev.workouts] }))
    return created
  }, [])

  const updateWorkout = useCallback<StoreValue['updateWorkout']>((id, patch) => {
    setData((prev) => ({
      ...prev,
      workouts: prev.workouts.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }))
  }, [])

  const deleteWorkout = useCallback((id: string) => {
    setData((prev) => ({ ...prev, workouts: prev.workouts.filter((w) => w.id !== id) }))
  }, [])

  const addBodyMetric = useCallback<StoreValue['addBodyMetric']>((m) => {
    const created: BodyMetric = { ...m, id: newId('bm'), createdAt: new Date().toISOString() }
    setData((prev) => ({ ...prev, bodyMetrics: [created, ...prev.bodyMetrics] }))
    return created
  }, [])

  const deleteBodyMetric = useCallback((id: string) => {
    setData((prev) => ({ ...prev, bodyMetrics: prev.bodyMetrics.filter((m) => m.id !== id) }))
  }, [])

  const addPlan = useCallback<StoreValue['addPlan']>((p) => {
    const created: Plan = { ...p, id: newId('pl'), createdAt: new Date().toISOString() }
    setData((prev) => ({ ...prev, plans: [created, ...prev.plans] }))
    return created
  }, [])

  const updatePlan = useCallback<StoreValue['updatePlan']>((id, patch) => {
    setData((prev) => ({
      ...prev,
      plans: prev.plans.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const deletePlan = useCallback((id: string) => {
    setData((prev) => ({ ...prev, plans: prev.plans.filter((p) => p.id !== id) }))
  }, [])

  const [pendingStart, setPendingStart] = useState<PendingStart | null>(null)
  const startWorkoutFrom = useCallback((exerciseIds: string[], name?: string) => {
    setPendingStart({ exerciseIds, name })
  }, [])
  const clearPendingStart = useCallback(() => setPendingStart(null), [])

  const allExercises = useMemo(
    () => [...data.customExercises, ...SEED_EXERCISES],
    [data.customExercises],
  )

  const exerciseIndex = useMemo(() => {
    const map = new Map<string, Exercise>()
    for (const e of allExercises) map.set(e.id, e)
    return map
  }, [allExercises])

  const exerciseById = useCallback(
    (id: string) => exerciseIndex.get(id),
    [exerciseIndex],
  )

  const value = useMemo<StoreValue>(
    () => ({
      data,
      allExercises,
      exerciseById,
      update,
      addCustomExercise,
      deleteCustomExercise,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      addBodyMetric,
      deleteBodyMetric,
      addPlan,
      updatePlan,
      deletePlan,
      pendingStart,
      startWorkoutFrom,
      clearPendingStart,
      replaceAll,
    }),
    [
      data,
      allExercises,
      exerciseById,
      update,
      addCustomExercise,
      deleteCustomExercise,
      addWorkout,
      updateWorkout,
      deleteWorkout,
      addBodyMetric,
      deleteBodyMetric,
      addPlan,
      updatePlan,
      deletePlan,
      pendingStart,
      startWorkoutFrom,
      clearPendingStart,
      replaceAll,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore muss innerhalb von <StoreProvider> genutzt werden.')
  return ctx
}
