import { useId, useState } from 'react'
import { formatINRCompact } from './calculations'

const formatNumber = (n) => new Intl.NumberFormat('en-IN').format(n)

// Plain-language hint for a field, shown on hover or keyboard focus (and on tap, which focuses it).
function InfoTip({ text }) {
  const id = useId()
  return (
    <span className="group/info inline-flex">
      <button
        type="button"
        aria-describedby={id}
        aria-label="What should I enter?"
        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-current text-[10px] font-bold leading-none text-black/40 transition-colors hover:text-primary-600 focus-visible:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-white/40 dark:hover:text-primary-400"
      >
        i
      </button>
      {/* Positioned against the whole field so it never runs off a narrow screen. */}
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none invisible absolute bottom-full left-0 z-20 mb-2 max-w-xs translate-y-1 rounded-xl bg-neutral-900 px-3.5 py-2.5 text-xs font-normal leading-relaxed text-white opacity-0 shadow-xl transition-all duration-200 group-focus-within/info:visible group-focus-within/info:translate-y-0 group-focus-within/info:opacity-100 group-hover/info:visible group-hover/info:translate-y-0 group-hover/info:opacity-100 dark:bg-white dark:text-neutral-900"
      >
        {text}
      </span>
    </span>
  )
}

export default function SliderField({ label, value, min, max, step, prefix = '', suffix = '', info, onChange }) {
  const id = useId()
  // While the box is being typed in, hold the raw text and apply the limits only on commit,
  // so a field with a high minimum (e.g. ₹25 L) can still be typed digit by digit.
  const [draft, setDraft] = useState(null)
  const pct = ((value - min) / (max - min)) * 100

  const commit = () => {
    if (draft === null) return
    const n = Number(draft.replace(/[^0-9.]/g, ''))
    if (draft.trim() !== '' && !Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)))
    setDraft(null)
  }

  const endLabel = (n) => (prefix === '₹' ? formatINRCompact(n) : `${n}${suffix === '%' ? '%' : ` ${suffix}`}`)

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5">
          <label htmlFor={id} className="text-sm font-medium text-black/70 dark:text-white/70">
            {label}
          </label>
          {info && <InfoTip text={info} />}
        </span>
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-primary-100 bg-primary-50/60 px-3 py-1.5 focus-within:border-primary-400 dark:border-white/10 dark:bg-white/5">
          {prefix && <span className="text-sm font-semibold text-black dark:text-white">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={draft ?? formatNumber(value)}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            className="w-24 bg-transparent text-right text-sm font-semibold tabular-nums text-black focus:outline-none dark:text-white sm:w-28"
          />
          {suffix && <span className="text-sm font-semibold text-black/60 dark:text-white/60">{suffix}</span>}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--color-primary-500) 0%, var(--color-secondary-500) ${pct}%, rgba(148,163,184,0.35) ${pct}%, rgba(148,163,184,0.35) 100%)`,
        }}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
      />
      <div className="mt-1.5 flex justify-between text-[11px] font-medium tabular-nums text-black/35 dark:text-white/35">
        <span>{endLabel(min)}</span>
        <span>{endLabel(max)}</span>
      </div>
    </div>
  )
}
