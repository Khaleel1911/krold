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
      {name ? (
        getInitials(name)
      ) : (
        // No name to show (e.g. professionals credited by role): a simple person mark.
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-1/2 w-1/2">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
        </svg>
      )}
    </span>
  )
}
