import SliderField from './SliderField'
import DonutResult from './DonutResult'

export default function CalculatorPanel({ config, values, onFieldChange }) {
  const result = config.compute(values)

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">{config.title}</h3>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">{config.description}</p>

        <div className="mt-8 flex flex-col gap-7">
          {config.fields.map((field) => (
            <SliderField
              key={field.key}
              label={field.label}
              value={values[field.key]}
              min={field.min}
              max={field.max}
              step={field.step}
              prefix={field.prefix}
              suffix={field.suffix}
              onChange={(val) => onFieldChange(field.key, val)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center rounded-3xl border border-primary-100/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 sm:p-8">
        <DonutResult {...result} />
      </div>
    </div>
  )
}
