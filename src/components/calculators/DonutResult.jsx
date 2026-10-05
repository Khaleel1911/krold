import { formatINR, formatINRShort } from './calculations'

const RADIUS = 76
const STROKE = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const COLOR_MAP = {
  primary: { stroke: '#36a1da', dot: 'bg-primary-500' },
  secondary: { stroke: '#54ba4f', dot: 'bg-secondary-500' },
}

export default function DonutResult({ segments, centerValue, centerLabel, extras = [], footnote }) {
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
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative flex h-44 w-44 shrink-0 items-center justify-center xl:h-48 xl:w-48">
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
          <span className="mt-1 max-w-[6.5rem] text-xs font-medium leading-tight text-black/50 dark:text-white/50">
            {centerLabel}
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-[17rem] flex-col gap-3">
        <div className="grid grid-cols-2 gap-x-4">
          {segments.map((s) => (
            <div key={s.label} className="flex min-w-0 items-start gap-2">
              <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${COLOR_MAP[s.colorClass]?.dot ?? 'bg-primary-500'}`} />
              <div className="min-w-0">
                <p className="text-xs text-black/50 dark:text-white/50">{s.label}</p>
                <p className="text-sm font-semibold text-black dark:text-white">{formatINR(s.value)}</p>
              </div>
            </div>
          ))}
        </div>
        {extras.map((x) => (
          <div key={x.label} className="border-t border-black/5 pt-3 dark:border-white/10">
            <p className="text-xs text-black/50 dark:text-white/50">{x.label}</p>
            <p className="text-sm font-semibold text-black dark:text-white">{formatINR(x.value)}</p>
          </div>
        ))}
        {footnote && (
          <p className="text-xs font-medium leading-relaxed text-amber-700 dark:text-amber-400">{footnote}</p>
        )}
      </div>
    </div>
  )
}
