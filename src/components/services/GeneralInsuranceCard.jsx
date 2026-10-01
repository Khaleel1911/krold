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
    name: 'Business',
    icon: (
      <>
        <rect x="3.5" y="8" width="17" height="11.5" rx="1.5" />
        <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
        <path d="M3.5 13h17" />
      </>
    ),
  },
  {
    name: 'Warehouse',
    icon: (
      <>
        <path d="M3 20V9.5l9-5 9 5V20" />
        <path d="M7.5 20v-7h9v7" />
        <path d="M7.5 16.5h9" />
      </>
    ),
  },
  {
    name: 'Machinery',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.1 2.1M15.9 15.9 18 18M18 6l-2.1 2.1M8.1 15.9 6 18" />
      </>
    ),
  },
  {
    name: 'Profits',
    icon: (
      <>
        <path d="M4 4v16h16" />
        <path d="m7.5 15 3.5-4 3 2.5 5-6" />
        <path d="M15.5 7.5H19V11" />
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
    name: 'Home',
    icon: (
      <>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 9.5V20h12V9.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
]

// What general insurance covers, each picking up a protective tick on hover.
function AssetGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5 min-[420px]:grid-cols-3">
      {ASSETS.map((asset, i) => (
        <div
          key={asset.name}
          className="relative flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-white px-2 py-4 text-primary-600 ring-1 ring-primary-100 dark:bg-white/5 dark:text-primary-300 dark:ring-white/10"
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
      className="bg-gradient-to-r from-primary-50 to-secondary-50 ring-1 ring-primary-100 hover:shadow-2xl hover:shadow-primary-200/60 dark:from-primary-500/10 dark:to-secondary-500/10 dark:ring-primary-400/20 dark:hover:shadow-black/40 sm:flex-row sm:items-stretch sm:gap-8 lg:gap-12"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30" />
        <CardText service={service} className="mt-4" />
        <LearnMore className="text-primary-600 dark:text-primary-400" />
      </div>
      <div className="relative mt-5 flex flex-col justify-center sm:mt-0 sm:w-[54%] sm:shrink-0">
        <AssetGrid />
      </div>
    </CardShell>
  )
}
