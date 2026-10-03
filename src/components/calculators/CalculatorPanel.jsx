import SliderField from './SliderField'
import DonutResult from './DonutResult'

export default function CalculatorPanel({ config, values, onFieldChange }) {
  const result = config.compute(values)

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="min-w-0">
        <h3 className="text-xl font-semibold text-black dark:text-white">{config.title}</h3>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">{config.description}</p>

        <div className="mt-8 flex flex-col gap-6">
          {config.fields.map((field) => (
            <div key={field.key}>
              {field.group && (
                <p className="mb-4 mt-2 border-b border-black/5 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 dark:border-white/10 dark:text-primary-400">
                  {field.group}
                </p>
              )}
              <SliderField
                label={field.label}
                value={values[field.key]}
                min={field.min}
                max={field.max}
                step={field.step}
                prefix={field.prefix}
                suffix={field.suffix}
                info={field.info}
                onChange={(val) => onFieldChange(field.key, val)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results stay in view beside a long list of fields. */}
      <div className="flex items-center justify-center self-start rounded-3xl border border-primary-100/60 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5 sm:p-8 lg:sticky lg:top-28">
        <DonutResult {...result} />
      </div>
    </div>
  )
}
