import { CardShell, IconBadge, CardText, LearnMore } from './CardParts'

const glyph = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-6 w-6',
}

const ASSETS = [
  {
    name: 'Health',
    icon: <path d="M3 12h4l2-4 4 8 2-4h6" />,
  },
  {
    name: 'Home',
    icon: (
      <>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 9.5V20h12V9.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  {
    name: 'Motor',
    icon: (
      <>
        <path d="M4 16v-3l2-5h12l2 5v3Z" />
        <path d="M4 13h16" />
        <circle cx="7.5" cy="17" r="1.5" />
        <circle cx="16.5" cy="17" r="1.5" />
      </>
    ),
  },
  {
    name: 'Business',
    icon: (
      <>
        <rect x="3.5" y="8" width="17" height="11.5" rx="1.5" />
        <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
        <path d="M3.5 13h17" />
      </>
    ),
  },
]

// Everyday assets, each picking up a protective tick on hover.
function AssetGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {ASSETS.map((asset, i) => (
        <div
          key={asset.name}
          className="relative flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3 text-primary-600 ring-1 ring-primary-100 dark:bg-white/5 dark:text-primary-300 dark:ring-white/10"
        >
          <svg {...glyph} aria-hidden="true">
            {asset.icon}
          </svg>
          <span className="text-[11px] font-semibold text-black/60 dark:text-white/60">{asset.name}</span>
          <span
            className="absolute -right-1 -top-1 flex h-5 w-5 scale-0 items-center justify-center rounded-full bg-secondary-500 text-white shadow transition-transform duration-300 group-hover:scale-100"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2.5 6.2 5 8.5 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}

export default function GeneralInsuranceCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="gi"
      cardRef={cardRef}
      className="bg-gradient-to-b from-primary-50 to-secondary-50 ring-1 ring-primary-100 hover:shadow-2xl hover:shadow-primary-200/60 dark:from-primary-500/10 dark:to-secondary-500/10 dark:ring-primary-400/20 dark:hover:shadow-black/40 sm:flex-row sm:items-stretch sm:gap-6"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30" />
        <CardText service={service} className="mt-4" />
        <LearnMore className="text-primary-600 dark:text-primary-400" />
      </div>
      <div className="relative mt-4 flex flex-col justify-center sm:mt-0 sm:w-[44%] sm:shrink-0">
        <AssetGrid />
      </div>
    </CardShell>
  )
}
