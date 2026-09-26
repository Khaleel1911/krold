import { CardShell, CardText, LearnMore } from './CardParts'

// A seedling drawn on blueprint paper: a company that hasn't been listed yet.
function Seedling() {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14" aria-hidden="true">
      <path d="M8 50 H48" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="3 3" />
      <g className="svc-sprout">
        <path d="M28 50 V26" stroke="#84cd80" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 34 C28 24 36 18 46 17 C45 27 38 33 28 34 Z" fill="#54ba4f" />
        <path d="M28 40 C28 32 22 27 12 26 C13 34 19 39 28 40 Z" fill="#84cd80" />
      </g>
    </svg>
  )
}

export default function UnlistedSharesCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="unl"
      cardRef={cardRef}
      className="svc-blueprint bg-[#0f3a55] text-white hover:shadow-2xl hover:shadow-primary-300/40 dark:bg-[#0b2a3e] dark:hover:shadow-black/40"
    >
      <div className="pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-dashed border-white/25" />
      <div className="relative flex items-start justify-between">
        <Seedling />
        <span className="-rotate-6 rounded-md border-2 border-secondary-300 px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] text-secondary-300 transition-transform duration-300 group-hover:-rotate-12">
          PRE-IPO
        </span>
      </div>
      <CardText service={service} onDark className="mt-3" />
      <LearnMore className="text-secondary-300" />
    </CardShell>
  )
}
