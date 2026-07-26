/** Minimaler SVG-Linien-Graph (kein Recharts) für kompakte Verläufe. */
export function Sparkline({
  values,
  height = 64,
  color = 'var(--color-brand)',
}: {
  values: number[]
  height?: number
  color?: string
}) {
  if (values.length < 2) {
    return (
      <div
        className="flex items-center justify-center text-xs text-[var(--color-ink-faint)]"
        style={{ height }}
      >
        Zu wenig Daten für einen Verlauf.
      </div>
    )
  }

  const W = 100
  const H = 100
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const pad = 6
  const stepX = (W - pad * 2) / (values.length - 1)
  const pts = values.map((v, i) => {
    const x = pad + i * stepX
    const y = H - pad - ((v - min) / span) * (H - pad * 2)
    return [x, y] as const
  })
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" width="100%" style={{ height }}>
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#spark)" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill={color} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}
