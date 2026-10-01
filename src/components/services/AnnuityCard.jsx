import { CardShell, IconBadge, CardText, LearnMore } from './CardParts'

const MONTHS = 12

// A year as a ring of twelve payouts that light up one after another, forever.
function PayoutRing() {
  return (
    <svg viewBox="0 0 160 160" className="h-36 w-36" aria-hidden="true">
      <circle cx="80" cy="80" r="62" fill="none" className="stroke-secondary-200 dark:stroke-secondary-400/25" strokeWidth="2" />
      <g className="svc-spin">
        <circle cx="80" cy="80" r="72" fill="none" className="stroke-secondary-400/60" strokeWidth="1.5" strokeDasharray="3 7" />
      </g>
      {Array.from({ length: MONTHS }, (_, i) => {
        const a = (i / MONTHS) * Math.PI * 2 - Math.PI / 2
        return (
          <circle
            key={i}
            cx={80 + Math.cos(a) * 62}
            cy={80 + Math.sin(a) * 62}
            r="6"
            className="svc-dot"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        )
      })}
      <circle cx="80" cy="80" r="36" className="fill-white dark:fill-white/5" />
      <text x="80" y="82" textAnchor="middle" className="fill-secondary-600 dark:fill-secondary-400" fontSize="26" fontWeight="700">
        ₹
      </text>
      <text x="80" y="98" textAnchor="middle" className="fill-black/50 dark:fill-white/50" fontSize="8" fontWeight="600">
        EVERY MONTH
      </text>
    </svg>
  )
}

export default function AnnuityCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="ann"
      cardRef={cardRef}
      className="bg-secondary-50 ring-1 ring-secondary-200/70 [--svc-dot-off:var(--color-secondary-200)] [--svc-dot-on:var(--color-secondary-500)] hover:shadow-2xl hover:shadow-secondary-200/60 dark:bg-secondary-500/10 dark:ring-secondary-400/20 dark:[--svc-dot-off:rgba(84,186,79,0.25)] dark:hover:shadow-black/40 sm:flex-row sm:items-stretch sm:gap-6"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-secondary-500 text-white shadow-md shadow-secondary-200 dark:shadow-black/30" />
        <CardText service={service} className="mt-4" />
        <LearnMore className="text-secondary-700 dark:text-secondary-400" />
      </div>

      <div className="relative mt-4 flex flex-col items-center justify-center gap-2 sm:mt-0 sm:w-[40%] sm:shrink-0">
        <PayoutRing />
        <p className="text-center text-xs font-semibold text-secondary-700 dark:text-secondary-400">
          Guaranteed income for life
        </p>
      </div>
    </CardShell>
  )
}
