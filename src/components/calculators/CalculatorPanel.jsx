'use client'

import SliderField from './SliderField'
import DonutResult from './DonutResult'

// Fields with a `group` open a new titled column; a calculator without groups flows
// row by row over two columns (one when there are only a few fields).
function groupFields(fields) {
  if (!fields.some((f) => f.group)) return null
  const groups = []
  fields.forEach((field) => {
    if (field.group || groups.length === 0) groups.push({ title: field.group, fields: [] })
    groups[groups.length - 1].fields.push(field)
  })
  return groups
}

// `compact` is the home section, sized to fit one screen: no description, and calculators
// with many fields get the slimmer field rows.
export default function CalculatorPanel({ config, values, onFieldChange, compact = false }) {
  const result = config.compute(values)
  const groups = groupFields(config.fields)
  const dense = compact && config.fields.length > 6

  const renderField = (field) => (
    <SliderField
      key={field.key}
      label={field.label}
      value={values[field.key]}
      min={field.min}
      max={field.max}
      step={field.step}
      prefix={field.prefix}
      suffix={field.suffix}
      info={field.info}
      dense={dense}
      onChange={(val) => onFieldChange(field.key, val)}
    />
  )

  return (
    <div className={`grid gap-8 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-8 ${compact ? 'lg:min-h-[25.8rem]' : ''}`}>
      <div className="flex min-w-0 flex-col">
        <h3 className="text-xl font-semibold text-black dark:text-white">{config.title}</h3>
        {!compact && <p className="mt-2 text-sm text-black/60 dark:text-white/60">{config.description}</p>}

        {groups ? (
          <div className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 ${compact ? 'mt-3' : 'mt-8'}`}>
            {groups.map((group) => (
              <div key={group.title} className={`flex min-w-0 flex-col ${dense ? 'gap-2' : 'gap-6'}`}>
                <p className="border-b border-black/5 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 dark:border-white/10 dark:text-primary-400">
                  {group.title}
                </p>
                {group.fields.map(renderField)}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid flex-1 content-center gap-x-8 gap-y-7 ${config.fields.length > 3 ? 'sm:grid-cols-2' : ''} ${
              compact ? 'mt-4' : 'mt-8'
            }`}
          >
            {config.fields.map(renderField)}
          </div>
        )}
      </div>

      {/* Stretches to the height of the fields, so both sides start and end together. */}
      <div className="flex items-center justify-center rounded-3xl border border-primary-100/60 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
        <DonutResult {...result} />
      </div>
    </div>
  )
}
