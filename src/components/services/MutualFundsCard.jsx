import { CardShell, IconBadge, CardText, Chips, LearnMore } from './CardParts'

// Twelve monthly instalments, each bar a little taller than the last — compounding.
const MONTHS = [14, 18, 22, 27, 32, 38, 45, 53, 62, 72, 84, 100]
const curve = MONTHS.map((h, i) => `${((i + 0.5) / MONTHS.length) * 100},${100 - h}`).join(' ')

export default function MutualFundsCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="mf"
      cardRef={cardRef}
      className="bg-gradient-to-br from-primary-500 via-primary-500 to-secondary-500 text-white hover:shadow-2xl hover:shadow-primary-300/50 dark:from-primary-600 dark:via-primary-600 dark:to-secondary-600 dark:hover:shadow-black/50 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-center justify-between gap-3">
        <IconBadge name={service.icon} className="bg-white/15 text-white ring-1 ring-white/30" />
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
          SIP · Lumpsum
        </span>
      </div>

      <CardText service={service} onDark large className="mt-6 max-w-md" />
      <Chips items={['Equity', 'Debt', 'Hybrid', 'ELSS']} className="bg-white/15 text-white ring-1 ring-white/25" />

      <div className="relative mt-6 min-h-[130px] flex-1">
        <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-2">
          {MONTHS.map((h, i) => (
            <div
              key={i}
              className={`svc-bar flex-1 rounded-t-md ${i === MONTHS.length - 1 ? 'bg-white' : 'bg-white/30'}`}
              style={{ height: `${h}%`, animationDelay: `${i * 40}ms`, opacity: 0.45 + (i / MONTHS.length) * 0.55 }}
            />
          ))}
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <polyline
            points={curve}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.8"
          />
        </svg>
        <div className="absolute right-0 top-0 flex w-[calc(100%/12)] justify-center">
          <span className="svc-coin -mt-7 flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-[11px] font-bold text-amber-800 ring-2 ring-amber-200 shadow">
            ₹
          </span>
        </div>
      </div>
      <div className="relative mt-2 flex justify-between text-[11px] font-medium text-white/70">
        <span>Month 1</span>
        <span>Small monthly steps, compounding</span>
        <span>Month 12</span>
      </div>

      <LearnMore className="text-white" />
    </CardShell>
  )
}
