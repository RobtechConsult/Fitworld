import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadPhotos, savePhotos } from '@/lib/photos'

interface PhotosValue {
  photos: Record<string, string>
  /** Foto setzen; false, wenn der Speicher voll ist (Quota). */
  setPhoto: (exerciseId: string, dataUrl: string) => boolean
  removePhoto: (exerciseId: string) => void
}

const PhotosContext = createContext<PhotosValue | null>(null)

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Record<string, string>>(() => loadPhotos())

  const setPhoto = useCallback((exerciseId: string, dataUrl: string) => {
    const next = { ...loadPhotos(), [exerciseId]: dataUrl }
    const ok = savePhotos(next)
    if (ok) setPhotos(next)
    return ok
  }, [])

  const removePhoto = useCallback((exerciseId: string) => {
    const next = { ...loadPhotos() }
    delete next[exerciseId]
    savePhotos(next)
    setPhotos(next)
  }, [])

  const value = useMemo<PhotosValue>(
    () => ({ photos, setPhoto, removePhoto }),
    [photos, setPhoto, removePhoto],
  )

  return <PhotosContext.Provider value={value}>{children}</PhotosContext.Provider>
}

export function usePhotos(): PhotosValue {
  const ctx = useContext(PhotosContext)
  if (!ctx) throw new Error('usePhotos muss innerhalb von <PhotosProvider> genutzt werden.')
  return ctx
}
