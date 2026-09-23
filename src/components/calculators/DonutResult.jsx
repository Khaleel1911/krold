import { formatINR, formatINRShort } from './calculations'

const RADIUS = 70
const STROKE = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const COLOR_MAP = {
  primary: { stroke: '#36a1da', dot: 'bg-primary-500' },
  secondary: { stroke: '#54ba4f', dot: 'bg-secondary-500' },
}

export default function DonutResult({ segments, centerValue, centerLabel, footnote }) {
  const total = segments.reduce((sum, s) => sum + Math.max(s.value, 0), 0) || 1

  let cumulative = 0
  const arcs = segments.map((s) => {
    const value = Math.max(s.value, 0)
    const length = CIRCUMFERENCE * (value / total)
    const dasharray = `${length} ${CIRCUMFERENCE - length}`
    const offset = -cumulative
    cumulative += length
    return { ...s, dasharray, offset }
  })

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
      <div className="relative flex h-52 w-52 shrink-0 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-black/5 dark:text-white/10"
            strokeWidth={STROKE}
          />
          {arcs.map((arc) => (
            <circle
              key={arc.label}
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={COLOR_MAP[arc.colorClass]?.stroke ?? '#36a1da'}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={arc.dasharray}
              strokeDashoffset={arc.offset}
              style={{ transition: 'stroke-dasharray 0.3s ease, stroke-dashoffset 0.3s ease' }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <span className="text-2xl font-bold text-black dark:text-white sm:text-[1.7rem]">
            {formatINRShort(centerValue)}
          </span>
          <span className="mt-1 text-xs font-medium text-black/50 dark:text-white/50">{centerLabel}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${COLOR_MAP[s.colorClass]?.dot ?? 'bg-primary-500'}`} />
            <div>
              <p className="text-xs text-black/50 dark:text-white/50">{s.label}</p>
              <p className="text-sm font-semibold text-black dark:text-white">{formatINR(s.value)}</p>
            </div>
          </div>
        ))}
        {footnote && (
          <p className="max-w-[220px] text-xs font-medium text-secondary-600 dark:text-secondary-400">{footnote}</p>
        )}
      </div>
    </div>
  )
}
