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
  dollar: <path d="M12 3v18M16.500 7.500C16 6 14.300 5 12 5S7.500 6.200 7.500 8.200c0 4.300 9 2.500 9 7 0 2-2 3.300-4.500 3.300S7.600 17.300 7.300 15.800" />,
  bank: <path d="M3.500 9.500L12 4l8.500 5.500M5 9.500h14M6.500 9.500v7.500M10 9.500v7.500M14 9.500v7.500M17.500 9.500v7.500M4 20h16" />,
  percent: (
    <>
      <path d="M18.500 5.500l-13 13" />
      <circle cx="7" cy="7" r="2.500" />
      <circle cx="17" cy="17" r="2.500" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M3.500 12h17M12 3.500c2.300 2.400 3.500 5.200 3.500 8.500s-1.200 6.100-3.500 8.500c-2.300-2.400-3.500-5.200-3.500-8.500s1.200-6.100 3.500-8.500Z" />
    </>
  ),
}

export function NriIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps} className={className}>
      {ICONS[name]}
    </svg>
  )
}

export function Eyebrow({ children, className = 'text-primary-600 dark:text-primary-400' }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>{children}</p>
}

// `split` puts the intro beside the heading on large screens, to save height.
export function SectionHeading({ eyebrow, children, intro, aside, split = false, className = '' }) {
  const heading = (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-balance text-black dark:text-white sm:text-4xl">
        {children}
      </h2>
    </>
  )
  const introText = intro ? <p className="text-base leading-relaxed text-black/65 dark:text-white/65">{intro}</p> : null

  if (split) {
    return (
      <div data-reveal className={`lg:flex lg:items-end lg:justify-between lg:gap-12 ${className}`}>
        <div className="max-w-xl shrink-0">{heading}</div>
        <div className="mt-3 max-w-lg space-y-3 lg:mt-0">
          {introText}
          {aside}
        </div>
      </div>
    )
  }
  return (
    <div data-reveal className={`max-w-2xl ${className}`}>
      {heading}
      {introText ? <div className="mt-3">{introText}</div> : null}
      {aside}
    </div>
  )
}

export function Source({ children, className = '' }) {
  return <p className={`text-xs leading-relaxed text-black/45 dark:text-white/45 ${className}`}>Source: {children}</p>
}

// The highlighted words inside a heading, as on the other pages: brand colour, upright.
export function Accent({ children }) {
  return <span className="text-primary-600 dark:text-primary-400">{children}</span>
}

export const CARD =
  'rounded-3xl border border-primary-100/70 bg-white/60 dark:border-white/10 dark:bg-white/[0.03]'
