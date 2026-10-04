const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const ICONS = {
  equity: <path d="M4 19h16M6 15l4-4 3 3 5-6M15 8h3v3" />,
  debt: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  property: <path d="M4 20V10l8-6 8 6v10M4 20h16M10 20v-5h4v5" />,
  insurance: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.500-7-10V6l7-3ZM9 12l2 2 4-4" />,
  gold: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.500 9.500h5M9.500 12h5M11 9.500c3 0 3 5-.5 5l3 3" />
    </>
  ),
  retire: (
    <>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M12 7.500V12l3 2" />
    </>
  ),
  returns: <path d="M12 20V10M12 10c0-3 2-5 6-5 0 4-2 6-6 6M12 13c0-2.500-1.500-4-5-4 0 3.500 2 5 5 5" />,
  family: (
    <>
      <circle cx="8" cy="8" r="2.500" />
      <circle cx="16.500" cy="9" r="2" />
      <path d="M3.500 19c0-3 2-5 4.500-5s4.500 2 4.500 5M14 19c0-2.500 1-4 2.500-4s3.500 1.500 3.500 4" />
    </>
  ),
  assets: <path d="M12 3l8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16.500l8 4 8-4" />,
}

export function NriIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps} className={className}>
      {ICONS[name]}
    </svg>
  )
}

export function Eyebrow({ children, className = 'text-primary-600 dark:text-primary-400' }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${className}`}>{children}</p>
}

export function SectionHeading({ eyebrow, children, intro, className = '' }) {
  return (
    <div data-reveal className={`max-w-2xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-normal leading-[1.12] text-balance text-black dark:text-white sm:text-5xl">
        {children}
      </h2>
      {intro ? <p className="mt-5 text-[17px] leading-relaxed text-black/65 dark:text-white/65">{intro}</p> : null}
    </div>
  )
}

export function Source({ children, className = '' }) {
  return <p className={`text-xs text-black/45 dark:text-white/45 ${className}`}>Source: {children}</p>
}

export const CARD =
  'rounded-3xl border border-primary-100/70 bg-white/60 dark:border-white/10 dark:bg-white/[0.03]'
