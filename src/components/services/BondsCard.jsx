import { CardShell, CardText, LearnMore } from './CardParts'

// Scalloped certificate seal with a ₹ centre and two ribbon tails.
function Seal() {
  const points = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2
    const r = i % 2 ? 19 : 22
    return `${26 + Math.cos(a) * r},${24 + Math.sin(a) * r}`
  }).join(' ')
  return (
    <svg viewBox="0 0 52 64" className="h-16 w-14 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
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
      className="hover:drop-shadow-[0_18px_28px_rgba(181,132,31,0.25)] dark:hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
    >
      <div className="svc-ticket-bg pointer-events-none absolute inset-0 bg-[#fbf5e6] dark:bg-[#231f14]" />
      <div className="svc-ticket-bg pointer-events-none absolute inset-2.5 rounded-[1.1rem] border border-dashed border-amber-700/30 dark:border-amber-200/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800/70 dark:text-amber-200/60">Certificate</p>
          <p className="mt-1 font-serif text-xs italic text-amber-900/70 dark:text-amber-100/60">Fixed coupon · Capital first</p>
        </div>
        <Seal />
      </div>
      <CardText service={service} className="mt-1" />
      <LearnMore className="text-amber-800 dark:text-amber-300" />
    </CardShell>
  )
}
