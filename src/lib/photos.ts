/**
 * Eigene Übungsfotos – bewusst in einem SEPARATEN localStorage-Key (nicht in
 * AppData), damit Plan-/Status-Codes und das Daten-Backup schlank bleiben.
 * Fotos werden vor dem Speichern stark verkleinert (Thumbnail als JPEG).
 */
const KEY = 'forgefit:photos:v1'

export function loadPhotos(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

export function savePhotos(map: Record<string, string>): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(map))
    return true
  } catch {
    // z. B. Quota überschritten
    return false
  }
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = () => reject(new Error('read failed'))
    r.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image failed'))
    img.src = src
  })
}

/** Bilddatei auf max. Kantenlänge verkleinern und als kompaktes JPEG zurückgeben. */
export async function fileToThumb(file: File, maxPx = 640, quality = 0.72): Promise<string> {
  const dataUrl = await readAsDataUrl(file)
  const img = await loadImage(dataUrl)
  const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
  const w = Math.max(1, Math.round(img.width * scale))
  const h = Math.max(1, Math.round(img.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return dataUrl
  ctx.drawImage(img, 0, 0, w, h)
  return canvas.toDataURL('image/jpeg', quality)
}
