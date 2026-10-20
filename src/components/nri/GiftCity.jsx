import { Accent, Eyebrow, NriIcon } from './parts'
import { GIFT_CITY } from '../../data/nri'

// Skyline on a 400×560 canvas. The two tall towers stand in for GIFT One and GIFT Two.
const TOWERS = [
  { x: 6, w: 40, h: 170 },
  { x: 40, w: 62, h: 240 },
  { x: 112, w: 72, h: 430 },
  { x: 196, w: 72, h: 430 },
  { x: 276, w: 58, h: 280 },
  { x: 330, w: 64, h: 230 },
]
const GROUND = 500
const STARS = [
  [40, 40], [96, 92], [150, 30], [214, 70], [262, 24], [318, 58], [370, 110], [70, 150], [350, 170], [180, 120], [24, 220],
]

// A fixed pseudo-random pattern, so the server and the browser draw the same lit windows.
const lit = (t, r, c) => ((t * 31 + r * 17 + c * 7 + r * c) % 5) < 3

function windows(tower, t) {
  const cols = Math.floor((tower.w - 8) / 11)
  const rows = Math.floor((tower.h - 18) / 13)
  const offset = (tower.w - cols * 11 + 4) / 2
  const out = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push(
        <rect
          key={`${r}-${c}`}
          x={tower.x + offset + c * 11}
          y={GROUND - tower.h + 12 + r * 13}
          width="6"
          height="5"
          rx="0.6"
          fill={lit(t, r, c) ? '#ffd27a' : '#27455f'}
          opacity={lit(t, r, c) ? 0.9 : 0.8}
        />,
      )
    }
  }
  return out
}

function Skyline() {
  return (
    <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="gift-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1826" />
          <stop offset="0.62" stopColor="#14365a" />
          <stop offset="0.86" stopColor="#36557a" />
          <stop offset="1" stopColor="#c9822f" />
        </linearGradient>
        <linearGradient id="gift-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10283e" />
          <stop offset="1" stopColor="#0b1826" />
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#gift-sky)" />
      {STARS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="#ffffff" opacity="0.55" />
      ))}
      {TOWERS.map((tower, t) => (
        <g key={tower.x}>
          <rect x={tower.x} y={GROUND - tower.h} width={tower.w} height={tower.h} fill={t === 2 || t === 3 ? '#16304a' : '#1b3a58'} />
          {windows(tower, t)}
        </g>
      ))}
      <rect y={GROUND} width="400" height="60" fill="url(#gift-water)" />
      {[514, 528, 542].map((y, i) => (
        <rect key={y} x={120 + i * 22} y={y} width={90 - i * 26} height="1.5" rx="1" fill="#ffd27a" opacity={0.35 - i * 0.08} />
      ))}
    </svg>
  )
}

export default function GiftCity() {
  return (
    <section id="gift-city" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-14 lg:px-10 lg:py-28">
        {/* Illustration, with the headline figures laid over it */}
        <div data-reveal className="relative isolate min-h-[420px] overflow-hidden rounded-3xl ring-1 ring-black/5 dark:ring-white/10 sm:min-h-[480px]">
          <Skyline />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-[#0b1826]/70 p-5 text-white backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
            <dl className="grid grid-cols-3 gap-3">
              {GIFT_CITY.stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dd className="text-2xl font-semibold leading-none text-[#ffd27a] sm:text-3xl">{stat.value}</dd>
                  <dt className="mt-2 text-xs leading-snug text-white/80 sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-white/55">{GIFT_CITY.statsSource}</p>
          </div>
        </div>

        <div className="min-w-0 lg:py-4">
          <div data-reveal className="max-w-2xl">
            <Eyebrow>Why invest in India · GIFT City</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance text-black dark:text-white sm:text-4xl">
              GIFT City: invest in India, <Accent>in dollars</Accent>
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-black/65 dark:text-white/65">
              India’s international financial centre, built for overseas investors.
            </p>
          </div>

          <ul className="mt-9 space-y-7">
            {GIFT_CITY.features.map((f) => (
              <li key={f.title} data-reveal className="flex items-start gap-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-primary-100 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-white/10">
                  <NriIcon name={f.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-black dark:text-white">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p data-reveal className="mt-9 border-t border-black/10 pt-5 text-xs leading-relaxed text-black/50 dark:border-white/10 dark:text-white/50">
            {GIFT_CITY.note}
          </p>
        </div>
      </div>
    </section>
  )
}
