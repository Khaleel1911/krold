import { CardShell, CardText, LearnMore } from './CardParts'

const BOND_TYPES = ['Government', 'Corporate', 'Tax-Free', 'RBI Floating Rate', 'NCDs']

// Scalloped certificate seal with a ₹ centre and two ribbon tails.
function Seal() {
  const points = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2
    const r = i % 2 ? 19 : 22
    return `${26 + Math.cos(a) * r},${24 + Math.sin(a) * r}`
  }).join(' ')
  return (
    <svg viewBox="0 0 52 64" className="h-20 w-16 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
      <path d="M16 38 L10 62 L18 56 L24 62 L26 42 Z" fill="#c9962a" />
      <path d="M36 38 L42 62 L34 56 L28 62 L26 42 Z" fill="#b5841f" />
      <polygon points={points} fill="#e5b64a" />
      <circle cx="26" cy="24" r="14" fill="none" stroke="#fff5d6" strokeWidth="1.2" strokeDasharray="2 2" />
      <text x="26" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7a5410">
        ₹
      </text>
    </svg>
  )
}

export default function BondsCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="bond"
      cardRef={cardRef}
      className="px-8 hover:drop-shadow-[0_18px_28px_rgba(181,132,31,0.25)] dark:hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] sm:flex-row sm:items-stretch sm:gap-6"
    >
      <div className="svc-ticket-bg pointer-events-none absolute inset-0 bg-[#fbf5e6] dark:bg-[#231f14]" />
      <div className="svc-ticket-bg pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-dashed border-amber-700/30 dark:border-amber-200/20" />

      <div className="relative flex flex-1 flex-col">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800/70 dark:text-amber-200/60">Certificate</p>
        <p className="mt-1 font-serif text-xs italic text-amber-900/70 dark:text-amber-100/60">Fixed coupon · Capital first</p>
        <CardText service={service} className="mt-4" />
        <LearnMore className="text-amber-800 dark:text-amber-300" />
      </div>

      {/* Tear-off stub: the seal over the kinds of bonds on offer. */}
      <div className="relative mt-5 flex flex-col items-center justify-center gap-3 border-t border-dashed border-amber-700/30 pt-5 dark:border-amber-200/20 sm:mt-0 sm:w-[40%] sm:shrink-0 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
        <Seal />
        <ul className="flex flex-wrap justify-center gap-1.5">
          {BOND_TYPES.map((type) => (
            <li
              key={type}
              className="rounded-full bg-amber-700/10 px-2.5 py-1 text-[11px] font-semibold text-amber-900/80 dark:bg-amber-200/10 dark:text-amber-100/80"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </CardShell>
  )
}
