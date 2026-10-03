import { CardShell, IconBadge, CardText, Chips, LearnMore } from './CardParts'

const HUB = [50, 16]

// An income-paying office block beside a wind turbine: real estate and infrastructure.
function RealAssets() {
  return (
    <svg viewBox="0 0 64 56" className="h-14 w-16" aria-hidden="true">
      <path d="M2 52 H62" className="stroke-primary-200 dark:stroke-white/15" strokeWidth="1.5" />
      <rect x="6" y="18" width="26" height="34" rx="1.5" className="fill-primary-500 dark:fill-primary-500/80" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={10 + c * 7}
            y={23 + r * 7}
            width="4"
            height="4"
            rx="0.6"
            fill={(r + c) % 3 === 0 ? '#f8cf4f' : 'rgba(255,255,255,0.55)'}
          />
        )),
      )}
      <path d="M50 52 V16" className="stroke-primary-300 dark:stroke-white/40" strokeWidth="2" strokeLinecap="round" />
      <g
        className="svc-spin"
        style={{ transformBox: 'view-box', transformOrigin: `${HUB[0]}px ${HUB[1]}px`, animationDuration: '6s' }}
      >
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            transform={`rotate(${a} ${HUB[0]} ${HUB[1]})`}
            d="M49 16 C48 10 49 5 50 3 C51.4 6 51.6 11 51 16 Z"
            className="fill-secondary-500"
          />
        ))}
      </g>
      <circle cx={HUB[0]} cy={HUB[1]} r="2" className="fill-secondary-600 dark:fill-secondary-400" />
    </svg>
  )
}

export default function ReitsInvitsCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="reit"
      cardRef={cardRef}
      className="bg-white ring-1 ring-primary-100 hover:shadow-2xl hover:shadow-primary-200/60 dark:bg-white/[0.04] dark:ring-white/10 dark:hover:shadow-black/40"
    >
      <div className="relative flex items-start justify-between">
        <IconBadge name={service.icon} className="bg-primary-50 text-primary-600 ring-1 ring-primary-100 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-400/25" />
        <RealAssets />
      </div>
      <CardText service={service} className="mt-3" />
      <Chips
        items={['Real estate', 'Infrastructure']}
        className="bg-primary-50 text-primary-700 ring-1 ring-primary-100 dark:bg-white/5 dark:text-primary-300 dark:ring-white/10"
      />
      <LearnMore className="text-primary-600 dark:text-primary-400" />
    </CardShell>
  )
}
