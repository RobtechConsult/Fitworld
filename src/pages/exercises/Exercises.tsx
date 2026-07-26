import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { PageHeader } from '@/components/layout/AppShell'
import { Sheet } from '@/components/Sheet'
import { ExerciseForm } from './ExerciseForm'
import { IconChart, IconPlus, IconSearch, IconTrash } from '@/components/icons'
import { ExerciseThumb } from '@/components/ExerciseThumb'
import { exerciseImages } from '@/data/exerciseImages'
import {
  CATEGORY_LABELS,
  EQUIPMENT_LABELS,
  MUSCLE_LABELS,
  MUSCLE_ORDER,
} from '@/data/muscleGroups'
import type { Exercise, MuscleGroup } from '@/lib/types'

function ExerciseCard({
  ex,
  onOpen,
}: {
  ex: Exercise
  onOpen: (ex: Exercise) => void
}) {
  return (
    <button
      onClick={() => onOpen(ex)}
      className="card card-hover flex w-full items-center gap-3 px-4 py-3 text-left"
    >
      <ExerciseThumb exerciseId={ex.id} size={48} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-semibold">{ex.name}</span>
          {ex.isCustom && (
            <span className="rounded-full bg-[var(--color-brand)]/20 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-2)]">
              EIGEN
            </span>
          )}
        </span>
        <span className="mt-0.5 block truncate text-sm text-[var(--color-ink-muted)]">
          {ex.primaryMuscles.map((m) => MUSCLE_LABELS[m]).join(', ')} · {EQUIPMENT_LABELS[ex.equipment]}
        </span>
      </span>
    </button>
  )
}

function ExerciseDetail({
  ex,
  onDelete,
}: {
  ex: Exercise
  onDelete?: (id: string) => void
}) {
  const images = exerciseImages(ex.id)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
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
      <div className="flex flex-wrap gap-1.5">
        <span className="chip">{CATEGORY_LABELS[ex.category]}</span>
        <span className="chip">{EQUIPMENT_LABELS[ex.equipment]}</span>
        {ex.isCustom && <span className="chip text-[var(--color-brand-2)]">Eigene Übung</span>}
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
          Primär
        </p>
        <div className="flex flex-wrap gap-1.5">
          {ex.primaryMuscles.map((m) => (
            <span key={m} className="chip text-[var(--color-ink)]">
              {MUSCLE_LABELS[m]}
            </span>
          ))}
        </div>
      </div>

      {ex.secondaryMuscles.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
            Sekundär
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ex.secondaryMuscles.map((m) => (
              <span key={m} className="chip">
                {MUSCLE_LABELS[m]}
              </span>
            ))}
          </div>
        </div>
      )}

      {ex.instructions && (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
            Ausführung
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{ex.instructions}</p>
        </div>
      )}

      <button className="btn-ghost" onClick={() => navigate(`/exercise/${ex.id}`)}>
        <IconChart width={18} height={18} />
        Verlauf & Statistik
      </button>

      {ex.isCustom && onDelete && (
        <button
          onClick={() => onDelete(ex.id)}
          className="btn-ghost mt-2 text-[var(--color-danger)] hover:border-[var(--color-danger)]/50"
        >
          <IconTrash width={18} height={18} />
          Übung löschen
        </button>
      )}
    </div>
  )
}

export function Exercises() {
  const { allExercises, addCustomExercise, deleteCustomExercise } = useStore()
  const [query, setQuery] = useState('')
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>('all')
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [adding, setAdding] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allExercises.filter((ex) => {
      if (muscle !== 'all' && !ex.primaryMuscles.includes(muscle) && !ex.secondaryMuscles.includes(muscle))
        return false
      if (q && !ex.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [allExercises, query, muscle])

  return (
    <div>
      <PageHeader
        title="Übungen"
        subtitle={`${allExercises.length} Übungen im Katalog`}
        action={
          <button className="btn-primary !px-3" onClick={() => setAdding(true)} aria-label="Übung hinzufügen">
            <IconPlus width={18} height={18} />
            Neu
          </button>
        }
      />

      <div className="relative mb-3">
        <IconSearch
          width={18}
          height={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]"
        />
        <input
          className="input pl-10"
          placeholder="Übung suchen …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="-mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FilterChip label="Alle" active={muscle === 'all'} onClick={() => setMuscle('all')} />
        {MUSCLE_ORDER.map((m) => (
          <FilterChip
            key={m}
            label={MUSCLE_LABELS[m]}
            active={muscle === m}
            onClick={() => setMuscle(m)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-[var(--color-ink-muted)]">
          Keine Übung gefunden. Lege sie mit „Neu" an.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((ex) => (
            <ExerciseCard key={ex.id} ex={ex} onOpen={setSelected} />
          ))}
        </div>
      )}

      <Sheet open={adding} onClose={() => setAdding(false)} title="Eigene Übung">
        <ExerciseForm
          onSubmit={(ex) => {
            addCustomExercise(ex)
            setAdding(false)
          }}
        />
      </Sheet>

      <Sheet open={selected !== null} onClose={() => setSelected(null)} title={selected?.name ?? ''}>
        {selected && (
          <ExerciseDetail
            ex={selected}
            onDelete={(id) => {
              deleteCustomExercise(id)
              setSelected(null)
            }}
          />
        )}
      </Sheet>
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'brand-gradient border-transparent text-white'
          : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
