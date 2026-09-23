export default function SliderField({ label, value, min, max, step, prefix = '', suffix = '', onChange }) {
  const pct = ((value - min) / (max - min)) * 100

  const handleNumberChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '')
    if (raw === '') return
    onChange(Math.min(max, Math.max(min, Number(raw))))
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-black/70 dark:text-white/70">{label}</label>
        <div className="flex items-center gap-1 rounded-lg border border-primary-100 dark:border-white/10 bg-primary-50/60 dark:bg-white/5 px-3 py-1.5">
          {prefix && <span className="text-sm font-semibold text-black dark:text-white">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={new Intl.NumberFormat('en-IN').format(value)}
            onChange={handleNumberChange}
            className="w-20 bg-transparent text-right text-sm font-semibold text-black dark:text-white focus:outline-none sm:w-24"
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
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--color-primary-500) 0%, var(--color-secondary-500) ${pct}%, rgba(148,163,184,0.35) ${pct}%, rgba(148,163,184,0.35) 100%)`,
        }}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary-600 [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
      />
    </div>
  )
}
