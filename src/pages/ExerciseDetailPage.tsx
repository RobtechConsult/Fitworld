import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { ExerciseHistory } from '@/components/ExerciseHistory'
import { exerciseImages } from '@/data/exerciseImages'
import { CATEGORY_LABELS, EQUIPMENT_LABELS, MUSCLE_LABELS } from '@/data/muscleGroups'
import { IconClose } from '@/components/icons'

export function ExerciseDetailPage() {
  const { id = '' } = useParams()
  const { exerciseById } = useStore()
  const navigate = useNavigate()
  const ex = exerciseById(id)

  if (!ex) {
    return (
      <div>
        <PageHeader title="Übung" subtitle="Nicht gefunden" />
        <button className="btn-ghost" onClick={() => navigate(-1)}>
          Zurück
        </button>
      </div>
    )
  }

  const images = exerciseImages(ex.id)

  return (
    <div>
      <PageHeader
        title={ex.name}
        subtitle={`${CATEGORY_LABELS[ex.category]} · ${EQUIPMENT_LABELS[ex.equipment]}`}
        action={
          <button
            onClick={() => navigate(-1)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            aria-label="Schließen"
          >
            <IconClose width={18} height={18} />
          </button>
        }
      />

      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${ex.name} – ${i === 0 ? 'Start' : 'Ende'}`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl border border-[var(--color-border)] object-cover"
            />
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {ex.primaryMuscles.map((m) => (
          <span key={m} className="chip text-[var(--color-ink)]">
            {MUSCLE_LABELS[m]}
          </span>
        ))}
      </div>

      {ex.instructions && (
        <p className="mb-5 text-sm leading-relaxed text-[var(--color-ink-muted)]">{ex.instructions}</p>
      )}

      <ExerciseHistory exerciseId={ex.id} />
    </div>
  )
}
