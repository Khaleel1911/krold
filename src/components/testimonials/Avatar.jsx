const PALETTES = [
  'from-primary-500 to-primary-600',
  'from-secondary-500 to-secondary-600',
  'from-primary-500 to-secondary-500',
]

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, index = 0, className = '' }) {
  const palette = PALETTES[index % PALETTES.length]
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${palette} font-semibold text-white ${className}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}
