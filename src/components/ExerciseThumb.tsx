import { useState } from 'react'
import { exerciseThumb } from '@/data/exerciseImages'
import { IconDumbbell } from '@/components/icons'

/** Quadratisches Übungs-Thumbnail mit Fallback (Hantel-Icon). */
export function ExerciseThumb({
  exerciseId,
  size = 44,
  className = '',
}: {
  exerciseId: string
  size?: number
  className?: string
}) {
  const src = exerciseThumb(exerciseId)
  const [failed, setFailed] = useState(false)

  const box =
    'shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-2)] grid place-items-center'

  if (!src || failed) {
    return (
      <span className={`${box} text-[var(--color-ink-faint)] ${className}`} style={{ width: size, height: size }}>
        <IconDumbbell width={size * 0.5} height={size * 0.5} />
      </span>
    )
  }

  return (
    <span className={`${box} ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt=""
        loading="lazy"
        width={size}
        height={size}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
