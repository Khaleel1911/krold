import { CardShell, IconBadge, CardText, LearnMore } from './CardParts'

const GOLD = '#d9b25f'

// Skyline: [x, width, height] in a 280×150 box.
const TOWERS = [
  [0, 34, 70],
  [30, 30, 104],
  [64, 44, 138],
  [112, 30, 92],
  [146, 40, 120],
  [190, 28, 80],
  [222, 36, 110],
  [256, 30, 64],
]

function Skyline() {
  return (
    <svg viewBox="0 0 280 150" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden="true">
      {TOWERS.map(([x, w, h], t) => (
        <g key={x}>
          <rect x={x} y={150 - h} width={w} height={h} fill={t % 2 ? '#132a40' : '#17324d'} />
          {Array.from({ length: Math.floor((h - 12) / 12) }, (_, r) =>
            Array.from({ length: Math.floor((w - 6) / 9) }, (_, c) => {
              const lit = (r * 5 + c * 3 + t) % 4 === 0
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x + 5 + c * 9}
                  y={150 - h + 8 + r * 12}
                  width="4"
                  height="5"
                  fill={lit ? GOLD : '#23486b'}
                  className={lit && (r + c) % 3 === 0 ? 'svc-twinkle' : undefined}
                  style={lit ? { animationDelay: `${(r + c + t) * 0.35}s` } : undefined}
                />
              )
            }),
          )}
        </g>
      ))}
      <rect x="84" y="4" width="4" height="10" fill={GOLD} />
    </svg>
  )
}

export default function PmsAifCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="pms"
      cardRef={cardRef}
      className="bg-gradient-to-b from-[#0b1826] to-[#10263b] text-white max-sm:pb-40 ring-1 ring-[#d9b25f]/30 hover:shadow-2xl hover:shadow-black/40 hover:ring-[#d9b25f]/60"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b25f] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-90 transition-transform duration-500 group-hover:-translate-y-1">
        <Skyline />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0b1826]/80 via-transparent to-[#0b1826]" />

      <IconBadge name={service.icon} className="bg-[#d9b25f]/15 text-[#e8c97c] ring-1 ring-[#d9b25f]/35" />
      <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8c97c]">Private wealth</p>
      <CardText service={service} onDark className="mt-1" />

      <dl className="relative mt-4 divide-y divide-[#d9b25f]/20 rounded-xl border border-[#d9b25f]/25 bg-white/[0.03] text-xs">
        <div className="flex items-center justify-between px-3 py-2">
          <dt className="text-white/70">PMS</dt>
          <dd className="font-semibold text-[#e8c97c]">Min ₹50 Lacs</dd>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <dt className="text-white/70">AIF</dt>
          <dd className="font-semibold text-[#e8c97c]">Min ₹1 Crore</dd>
        </div>
      </dl>

      <LearnMore className="text-[#e8c97c]" />
    </CardShell>
  )
}
