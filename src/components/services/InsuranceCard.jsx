import { CardShell, IconBadge, CardText, Chips, LearnMore } from './CardParts'

const RAIN = [
  [14, 0],
  [34, 0.5],
  [150, 0.2],
  [170, 0.9],
  [26, 1.1],
  [160, 1.3],
]

// A family sheltered under one umbrella while the rain falls around them.
function Shelter() {
  return (
    <svg viewBox="0 0 184 150" className="h-full max-h-40 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="svc-canopy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#36a1da" />
          <stop offset="100%" stopColor="#54ba4f" />
        </linearGradient>
      </defs>
      {RAIN.map(([x, d]) => (
        <line
          key={x}
          x1={x}
          y1="30"
          x2={x - 3}
          y2="42"
          className="svc-rain stroke-primary-300 dark:stroke-primary-400/60"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
      <path d="M22 70 C 22 28, 162 28, 162 70 C 150 62, 138 62, 127 70 C 115 62, 104 62, 92 70 C 80 62, 69 62, 57 70 C 46 62, 34 62, 22 70 Z" fill="url(#svc-canopy)" />
      <path d="M92 32 V 22" stroke="#308ec0" strokeWidth="3" strokeLinecap="round" />
      <path d="M92 70 V 128 q0 8 -8 8 q-6 0 -7 -6" fill="none" stroke="#308ec0" strokeWidth="3" strokeLinecap="round" />
      {/* family */}
      <g className="fill-primary-600 dark:fill-primary-400">
        <circle cx="62" cy="96" r="7" />
        <path d="M50 138 v-18 a12 12 0 0 1 24 0 v18 z" />
      </g>
      <g className="fill-secondary-500">
        <circle cx="122" cy="96" r="7" />
        <path d="M110 138 v-18 a12 12 0 0 1 24 0 v18 z" />
      </g>
      <g className="fill-amber-400">
        <circle cx="92" cy="108" r="5.5" />
        <path d="M83 138 v-11 a9 9 0 0 1 18 0 v11 z" />
      </g>
      <path d="M40 140 H 144" className="stroke-primary-200 dark:stroke-white/15" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function InsuranceCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="ins"
      cardRef={cardRef}
      className="bg-primary-50 ring-1 ring-primary-100 hover:shadow-2xl hover:shadow-primary-200/60 dark:bg-primary-500/10 dark:ring-primary-400/20 dark:hover:shadow-black/40 sm:flex-row sm:items-stretch sm:gap-4"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-primary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30" />
        <CardText service={service} className="mt-4" />
        <Chips
          items={['Life', 'Health', 'Critical illness']}
          className="bg-white text-primary-700 ring-1 ring-primary-100 dark:bg-white/5 dark:text-primary-300 dark:ring-white/10"
        />
        <LearnMore className="text-primary-600 dark:text-primary-400" />
      </div>
      <div className="relative mt-4 flex items-end justify-center sm:mt-0 sm:w-[42%] sm:shrink-0">
        <div className="h-36 w-full transition-transform duration-500 group-hover:-translate-y-1 sm:h-full">
          <Shelter />
        </div>
      </div>
    </CardShell>
  )
}
