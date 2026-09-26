import { CardShell, IconBadge, CardText, Chips, LearnMore } from './CardParts'

const UP = '#6fd66a'
const DOWN = '#ff7a6e'

// [open, close, high, low] on a 0–100 scale (higher = up the chart).
const CANDLES = [
  [30, 38, 42, 26],
  [38, 34, 41, 30],
  [34, 44, 47, 32],
  [44, 50, 55, 41],
  [50, 46, 53, 42],
  [46, 55, 58, 44],
  [55, 62, 66, 52],
  [62, 58, 65, 54],
  [58, 68, 72, 56],
  [68, 76, 80, 65],
  [76, 72, 79, 69],
  [72, 84, 88, 70],
]
const TICKER = [
  ['NIFTY 50', '▲ 0.8%', true],
  ['SENSEX', '▲ 1.1%', true],
  ['BANK NIFTY', '▼ 0.3%', false],
  ['IPO', 'OPEN', true],
  ['GOLD ETF', '▲ 0.6%', true],
]

function Chart() {
  const y = (v) => 100 - v
  const step = 200 / CANDLES.length
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      {[25, 50, 75].map((g) => (
        <line key={g} x1="0" y1={g} x2="200" y2={g} stroke="rgba(255,255,255,0.06)" vectorEffect="non-scaling-stroke" />
      ))}
      {CANDLES.map(([o, c, h, l], i) => {
        const up = c >= o
        const x = i * step + step / 2
        const last = i === CANDLES.length - 1
        return (
          <g key={i} fill={up ? UP : DOWN} stroke={up ? UP : DOWN}>
            <line x1={x} y1={y(h)} x2={x} y2={y(l)} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <rect
              x={x - step * 0.3}
              y={y(Math.max(o, c))}
              width={step * 0.6}
              height={Math.max(Math.abs(c - o), 1.5)}
              stroke="none"
              className={last ? 'svc-live' : undefined}
            />
          </g>
        )
      })}
    </svg>
  )
}

export default function StockBrokingCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="stk"
      cardRef={cardRef}
      className="bg-[#0b1622] text-white ring-1 ring-white/10 hover:shadow-2xl hover:shadow-primary-300/30 dark:hover:shadow-black/50 sm:flex-row sm:items-stretch sm:gap-5"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-[#6fd66a]/15 text-[#6fd66a] ring-1 ring-[#6fd66a]/30" />
        <CardText service={service} onDark className="mt-4" />
        <Chips items={['Equity', 'F&O', 'IPO', 'ETF']} className="bg-white/10 text-white/85 ring-1 ring-white/15" />
        <LearnMore className="text-[#6fd66a]" />
      </div>

      <div className="relative mt-4 flex min-h-[150px] flex-col overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10 sm:mt-0 sm:w-[48%] sm:shrink-0">
        <div className="flex overflow-hidden border-b border-white/10 py-1.5">
          <div className="flex shrink-0 animate-[marquee-left_16s_linear_infinite] gap-5 pr-5 text-[10px] font-semibold">
            {[...TICKER, ...TICKER].map(([name, move, up], i) => (
              <span key={i} className="whitespace-nowrap text-white/70">
                {name} <span style={{ color: up ? UP : DOWN }}>{move}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-3 pt-2 text-[10px]">
          <span className="font-semibold text-white/80">NIFTY 50 · 1D</span>
          <span className="flex items-center gap-1 font-semibold" style={{ color: UP }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: UP }} />
            Live
          </span>
        </div>
        <div className="min-h-0 flex-1 px-2 pb-2 pt-1">
          <Chart />
        </div>
      </div>
    </CardShell>
  )
}
