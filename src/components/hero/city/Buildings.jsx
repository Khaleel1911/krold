import { memo, useRef } from 'react'
import { gsap } from 'gsap'
import { U, iso, pts } from './geometry'
import { IsoBox, IsoRect, PlaneX, PlaneY, Windows, GableRoof, Tree } from './iso'
import { useCityLoop } from './motion'

const label = { fontWeight: 700, letterSpacing: '0.04em' }

function Coin({ x, y, r = 4.5 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="var(--city-gold-top)" stroke="var(--city-gold-right)" strokeWidth="1" />
      <text x={x} y={y + r * 0.45} textAnchor="middle" fontSize={r * 1.3} fill="var(--city-gold-right)" style={label}>
        ₹
      </text>
    </g>
  )
}

/* ─── PMS / AIF — a private glass tower ─────────────────────────────── */

export const PmsTower = memo(function PmsTower() {
  const beaconRef = useRef(null)
  useCityLoop(() => {
    gsap.to(beaconRef.current, { opacity: 0.25, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  })

  const t = { x: 1.1, y: 1.1, w: 1.8, d: 1.8, z: 16, h: 118 }
  const top = t.z + t.h
  const [sx, sy0] = iso(2, 2, top + 16)
  const [, sy1] = iso(2, 2, top + 36)

  return (
    <g>
      <IsoBox x={0.7} y={0.7} w={2.6} d={2.6} h={16} />
      <PlaneX gx={0.7} gy={3.3} z={16}>
        <rect x="24" y="5" width="20" height="11" fill="var(--city-glass-left)" />
      </PlaneX>

      <IsoBox {...t} tone="glass" />
      <PlaneX gx={t.x} gy={t.y + t.d} z={top}>
        <Windows width={t.w * U} height={t.h} cols={4} rows={11} padX={3} padY={4} gapX={2} gapY={3} seed={2} kind="glass" />
        <polygon points={`6,0 20,0 ${t.w * U - 10},${t.h} ${t.w * U - 24},${t.h}`} fill="var(--city-reflect)" />
      </PlaneX>
      <PlaneY gx={t.x + t.w} gy={t.y + t.d} z={top}>
        <Windows width={t.d * U} height={t.h} cols={4} rows={11} padX={3} padY={4} gapX={2} gapY={3} seed={5} kind="glass" />
      </PlaneY>

      <IsoBox x={1.3} y={1.3} w={1.4} d={1.4} z={top} h={16} tone="green" />
      <PlaneX gx={1.3} gy={2.7} z={top + 16}>
        <text x={1.4 * U * 0.5} y="10.5" textAnchor="middle" fontSize="6" fill="#fff" style={label}>
          PMS·AIF
        </text>
      </PlaneX>

      <line x1={sx} y1={sy0} x2={sx} y2={sy1} stroke="var(--city-bldg-right)" strokeWidth="1.6" />
      <circle cx={sx} cy={sy1 - 2} r="7" fill="var(--city-green-left)" opacity="0.18" />
      <circle ref={beaconRef} cx={sx} cy={sy1 - 2} r="2.6" fill="var(--city-green-left)" />
    </g>
  )
})

/* ─── Stock Broking — exchange with a live ticker ───────────────────── */

const TICKER = [
  ['NIFTY ', '▲0.8%', 'up'],
  ['  SENSEX ', '▲1.1%', 'up'],
  ['  BANKNIFTY ', '▼0.3%', 'down'],
  ['  IPO ', 'OPEN', 'up'],
  ['  ETF ', '▲0.6%', 'up'],
  ['   ', '', 'up'],
]
const CANDLES = [
  { y: 14, h: 6, up: true },
  { y: 11, h: 6, up: true },
  { y: 12, h: 4, up: false },
  { y: 8, h: 7, up: true },
  { y: 5, h: 6, up: true },
]

export const StockExchange = memo(function StockExchange() {
  const tickerRef = useRef(null)
  useCityLoop(() => {
    const text = tickerRef.current
    const half = text.getComputedTextLength() / 2
    gsap.to(text, { x: -half, duration: 9, ease: 'none', repeat: -1 })
  })

  const b = { x: 5.5, y: 0.8, w: 2.1, d: 2.4, h: 64 }
  const W = b.w * U
  const legs = [6.0, 7.1].map((gx) => [iso(gx, 2.6, b.h), iso(gx, 2.6, 74)])

  return (
    <g>
      <IsoBox {...b} />
      <PlaneX gx={b.x} gy={b.y + b.d} z={b.h}>
        <clipPath id="city-ticker-clip">
          <rect x="0" y="6" width={W} height="10" />
        </clipPath>
        <rect x="0" y="6" width={W} height="10" fill="var(--city-ticker)" />
        <g clipPath="url(#city-ticker-clip)">
          <text ref={tickerRef} x="2" y="13.4" fontSize="6" style={label} fill="#cfe6f4">
            {[0, 1].map((rep) =>
              TICKER.map(([name, val, dir], i) => (
                <tspan key={`${rep}-${i}`}>
                  {name}
                  <tspan fill={dir === 'up' ? '#6fd66a' : '#ff7a6e'}>{val}</tspan>
                </tspan>
              )),
            )}
          </text>
        </g>
        <Windows y={18} width={W} height={30} cols={4} rows={2} seed={3} />
        <rect x={W / 2 - 6} y={b.h - 13} width="12" height="13" fill="var(--city-door)" />
      </PlaneX>
      <PlaneY gx={b.x + b.w} gy={b.y + b.d} z={b.h}>
        <Windows width={b.d * U} height={b.h - 4} cols={4} rows={5} seed={4} />
      </PlaneY>

      <IsoBox x={6.9} y={1.1} w={0.4} d={0.5} z={b.h} h={6} />
      {legs.map(([a, c], i) => (
        <line key={i} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke="var(--city-bldg-right)" strokeWidth="1.4" />
      ))}
      <PlaneX gx={5.8} gy={2.6} z={100}>
        <rect x="0" y="0" width={1.5 * U} height="26" rx="1.5" fill="var(--city-ticker)" />
        <polyline points="4,20 11,16 18,17 25,11 33,6" fill="none" stroke="#6fd66a" strokeWidth="0.8" opacity="0.6" />
        {CANDLES.map((c, i) => (
          <g key={i} fill={c.up ? '#6fd66a' : '#ff7a6e'} stroke={c.up ? '#6fd66a' : '#ff7a6e'}>
            <line x1={6 + i * 7} y1={c.y - 2} x2={6 + i * 7} y2={c.y + c.h + 2} strokeWidth="0.6" />
            <rect x={4.5 + i * 7} y={c.y} width="3" height={c.h} stroke="none" />
          </g>
        ))}
      </PlaneX>
    </g>
  )
})

/* ─── Mutual Funds / SIP — a tower that grows one floor per instalment ─ */

const SIP_BASE = { x: 0.9, y: 5.6, w: 2.2, d: 1.8, h: 22 }
const SIP_FLOOR = { x: 1.1, y: 5.8, w: 1.8, d: 1.4, h: 13 }
const SIP_FLOORS = 8
const SIP_START = 2

export const SipTower = memo(function SipTower() {
  const floorsRef = useRef([])
  const coinRef = useRef(null)
  const [cx, cy] = iso(SIP_FLOOR.x + SIP_FLOOR.w / 2, SIP_FLOOR.y + SIP_FLOOR.d / 2)

  useCityLoop(() => {
    const growing = floorsRef.current.slice(SIP_START)
    const coin = coinRef.current
    gsap.set(growing, { opacity: 0 })
    const tl = gsap.timeline({ repeat: -1, delay: 1.6 })
    growing.forEach((floor, i) => {
      const landZ = SIP_BASE.h + (SIP_START + i) * SIP_FLOOR.h
      tl.set(coin, { y: -(landZ + 60), opacity: 0 })
        .to(coin, { opacity: 1, duration: 0.2 })
        .to(coin, { y: -(landZ + 8), duration: 0.45, ease: 'power2.in' })
        .to(coin, { opacity: 0, duration: 0.12 })
        .fromTo(floor, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' }, '<')
        .to({}, { duration: 0.35 })
    })
    tl.to({}, { duration: 1.8 }).to(growing, { opacity: 0, duration: 0.6, stagger: { each: 0.05, from: 'end' } })
  })

  return (
    <g>
      <IsoBox {...SIP_BASE} />
      <PlaneX gx={SIP_BASE.x} gy={SIP_BASE.y + SIP_BASE.d} z={SIP_BASE.h}>
        <rect x="0" y="2" width={SIP_BASE.w * U} height="8" fill="var(--city-green-left)" />
        <text x={(SIP_BASE.w * U) / 2} y="8" textAnchor="middle" fontSize="5.2" fill="#fff" style={label}>
          MUTUAL FUNDS
        </text>
        <rect x={(SIP_BASE.w * U) / 2 - 5} y="12" width="10" height="10" fill="var(--city-door)" />
      </PlaneX>
      <PlaneY gx={SIP_BASE.x + SIP_BASE.w} gy={SIP_BASE.y + SIP_BASE.d} z={SIP_BASE.h}>
        <Windows y={8} width={SIP_BASE.d * U} height={14} cols={3} rows={1} padY={3} seed={1} />
      </PlaneY>

      {Array.from({ length: SIP_FLOORS }, (_, i) => {
        const z = SIP_BASE.h + i * SIP_FLOOR.h
        const top = z + SIP_FLOOR.h
        const band = i < 4 ? 'blue' : 'green'
        return (
          <g key={i} ref={(el) => (floorsRef.current[i] = el)}>
            <IsoBox {...SIP_FLOOR} z={z} />
            <PlaneX gx={SIP_FLOOR.x} gy={SIP_FLOOR.y + SIP_FLOOR.d} z={top}>
              <rect x="3" y="3" width={SIP_FLOOR.w * U - 6} height="6" fill={`var(--city-${band}-left)`} />
            </PlaneX>
            <PlaneY gx={SIP_FLOOR.x + SIP_FLOOR.w} gy={SIP_FLOOR.y + SIP_FLOOR.d} z={top}>
              <rect x="3" y="3" width={SIP_FLOOR.d * U - 6} height="6" fill={`var(--city-${band}-right)`} />
            </PlaneY>
          </g>
        )
      })}

      <g ref={coinRef} opacity="0">
        <Coin x={cx} y={cy} r={5} />
      </g>
    </g>
  )
})

/* ─── Bonds — a classic columned bank ──────────────────────────────── */

export const BondsBank = memo(function BondsBank() {
  const main = { x: 10.1, y: 1.0, w: 1.8, d: 1.5, z: 10, h: 34 }
  const [ex, ey] = iso(11, 3.08, 56)
  return (
    <g>
      <IsoBox x={9.7} y={0.7} w={2.6} d={2.6} h={5} />
      <IsoBox x={9.85} y={0.85} w={2.3} d={2.3} z={5} h={5} />
      <IsoBox {...main} />
      <PlaneX gx={main.x} gy={main.y + main.d} z={main.z + main.h}>
        <rect x={main.w * U * 0.5 - 6} y="14" width="12" height="20" rx="6" ry="4" fill="var(--city-door)" />
      </PlaneX>
      <PlaneY gx={main.x + main.w} gy={main.y + main.d} z={main.z + main.h}>
        <Windows width={main.d * U} height={main.h} cols={2} rows={2} padX={6} gapX={8} seed={2} />
      </PlaneY>
      {[10.15, 10.55, 10.95, 11.35, 11.72].map((gx) => (
        <IsoBox key={gx} x={gx} y={2.78} w={0.18} d={0.18} z={10} h={34} />
      ))}
      <IsoBox x={10.0} y={0.9} w={2.0} d={2.1} z={44} h={6} />
      <PlaneX gx={10.0} gy={3.0} z={50}>
        <text x={U} y="5" textAnchor="middle" fontSize="4.6" fill="var(--city-label)" style={label}>
          BONDS
        </text>
      </PlaneX>
      <GableRoof x={10.0} y={0.9} w={2.0} d={2.1} z={50} rise={16} tone="blue" over={0.08} />
      <Coin x={ex} y={ey} r={4} />
    </g>
  )
})

/* ─── REITs / InvITs — a rent-paying mall & office park with a wind turbine ─ */

// The centre block is bounded by the ring road (gx/gy 5.1 to 7.9).
const REIT_PODIUM = { x: 5.4, y: 5.6, w: 2.0, d: 1.8, h: 16 }
const REIT_TOWER = { x: 5.6, y: 5.75, w: 1.4, d: 1.15, z: 16, h: 46 }

export const ReitPark = memo(function ReitPark() {
  const rotorRef = useRef(null)
  const coinRef = useRef(null)
  const p = REIT_PODIUM
  const t = REIT_TOWER
  const roof = t.z + t.h
  const [hx, hy] = iso(5.25, 7.7, 60)
  const [bx, by] = iso(5.25, 7.7, 0)
  const [cx, cy] = iso(t.x + t.w / 2, t.y + t.d / 2, roof + 6)

  useCityLoop(() => {
    gsap.to(rotorRef.current, { rotation: 360, svgOrigin: `${hx} ${hy}`, duration: 4, ease: 'none', repeat: -1 })
    // Rental income paid out to unitholders.
    gsap
      .timeline({ repeat: -1, repeatDelay: 1.4, delay: 1.2 })
      .fromTo(coinRef.current, { y: 0, opacity: 0 }, { y: -10, opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(coinRef.current, { y: -24, opacity: 0, duration: 0.8, ease: 'power1.in' })
  })

  return (
    <g>
      <IsoBox {...p} />
      <PlaneX gx={p.x} gy={p.y + p.d} z={p.h}>
        <rect x="0" y="2" width={p.w * U} height="7" fill="var(--city-green-left)" />
        <text x={(p.w * U) / 2} y="7.2" textAnchor="middle" fontSize="4.8" fill="#fff" style={label}>
          REITs · InvITs
        </text>
        <Windows y={9} width={p.w * U} height={9} cols={4} rows={1} padY={2} gapX={10} seed={3} />
        <rect x={(p.w * U) / 2 - 5} y="10" width="10" height="8" fill="var(--city-door)" />
      </PlaneX>
      <PlaneY gx={p.x + p.w} gy={p.y + p.d} z={p.h}>
        <Windows y={4} width={p.d * U} height={14} cols={3} rows={1} padY={2} seed={5} />
      </PlaneY>

      <IsoBox {...t} tone="glass" />
      <PlaneX gx={t.x} gy={t.y + t.d} z={roof}>
        <Windows width={t.w * U} height={t.h} cols={3} rows={6} padX={3} padY={4} gapX={2} gapY={3} seed={4} kind="glass" />
      </PlaneX>
      <PlaneY gx={t.x + t.w} gy={t.y + t.d} z={roof}>
        <Windows width={t.d * U} height={t.h} cols={2} rows={6} padX={3} padY={4} gapX={2} gapY={3} seed={6} kind="glass" />
      </PlaneY>
      <IsoBox x={5.9} y={5.95} w={0.8} d={0.65} z={roof} h={5} tone="slab" />

      <g ref={coinRef} opacity="0">
        <Coin x={cx} y={cy} r={4.5} />
      </g>

      <Tree gx={7.65} gy={5.5} s={0.7} />

      {/* InvIT wind turbine */}
      <ellipse cx={bx} cy={by} rx="5" ry="2.5" fill="var(--city-shadow)" />
      <line x1={bx} y1={by} x2={hx} y2={hy} stroke="#d4e0e8" strokeWidth="2.2" strokeLinecap="round" />
      <g ref={rotorRef} fill="#f6fafc" stroke="var(--city-edge)" strokeWidth="0.5">
        {[0, 120, 240].map((a) => (
          <path
            key={a}
            transform={`rotate(${a} ${hx} ${hy})`}
            d={`M${hx - 1},${hy} C${hx - 2.2},${hy - 8} ${hx - 1},${hy - 16} ${hx},${hy - 18} C${hx + 1.2},${hy - 14} ${hx + 1.4},${hy - 6} ${hx + 1},${hy} Z`}
          />
        ))}
      </g>
      <circle cx={hx} cy={hy} r="2" fill="var(--city-green-left)" />
    </g>
  )
})

/* ─── Unlisted Shares — a pre-IPO building still under construction ── */

export const ConstructionSite = memo(function ConstructionSite() {
  const crateRef = useRef(null)
  const cableRef = useRef(null)
  const DROP = 26
  useCityLoop(() => {
    const opts = { duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', repeatDelay: 0.6 }
    gsap.to(crateRef.current, { y: DROP, ...opts })
    gsap.to(cableRef.current, { attr: { y2: `+=${DROP}` }, ...opts })
  })

  const b = { x: 0.8, y: 9.9, w: 2.0, d: 2.0 }
  const corner = (gx, gy, z) => iso(gx, gy, z)
  const ring = (z) => [corner(b.x, b.y, z), corner(b.x + b.w, b.y, z), corner(b.x + b.w, b.y + b.d, z), corner(b.x, b.y + b.d, z)]
  const scaffold = { stroke: 'var(--city-amber-left)', strokeWidth: 1.1, fill: 'none' }
  const vertical = (gx, gy) => {
    const [a, c] = [corner(gx, gy, 34), corner(gx, gy, 74)]
    return <line x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} />
  }

  const [jx0, jy] = iso(3.17, 10.17, 150)
  const [jx1] = iso(0.3, 10.17, 150)
  const [jx2] = iso(4.1, 10.17, 150)
  const [, jy1] = iso(0.3, 10.17, 150)
  const [, jy2] = iso(4.1, 10.17, 150)
  const [ax, ay] = iso(3.17, 10.17, 166)
  const [hx, hy] = iso(1.4, 10.17, 150)
  const [, hy2] = iso(1.4, 10.17, 100)

  return (
    <g>
      <IsoBox {...b} h={34} />
      <PlaneX gx={b.x} gy={b.y + b.d} z={34}>
        <Windows width={b.w * U} height={34} cols={3} rows={2} seed={6} />
      </PlaneX>
      <PlaneY gx={b.x + b.w} gy={b.y + b.d} z={34}>
        <Windows width={b.d * U} height={34} cols={3} rows={2} seed={7} />
      </PlaneY>

      <g {...scaffold} opacity="0.6">
        {vertical(b.x, b.y)}
        <polyline points={pts([corner(b.x, b.y + b.d, 74), corner(b.x, b.y, 74), corner(b.x + b.w, b.y, 74)])} />
      </g>
      <IsoBox {...b} z={54} h={3} tone="slab" />
      <g {...scaffold}>
        {vertical(b.x + b.w, b.y)}
        {vertical(b.x, b.y + b.d)}
        {vertical(b.x + b.w, b.y + b.d)}
        {[47, 74].map((z) => (
          <polyline key={z} points={pts([ring(z)[3], ring(z)[2], ring(z)[1]])} />
        ))}
        <polyline points={pts([corner(b.x, b.y + b.d, 34), corner(b.x + b.w * 0.5, b.y + b.d, 54), corner(b.x + b.w, b.y + b.d, 34)])} />
      </g>

      <PlaneX gx={0.5} gy={12.55} z={12}>
        <rect x="0" y="0" width={3.0 * U} height="12" fill="var(--city-amber-top)" />
        <text x={1.5 * U} y="8.3" textAnchor="middle" fontSize="6" fill="#3a2a07" style={label}>
          PRE-IPO ZONE
        </text>
      </PlaneX>

      {/* Crane */}
      <IsoBox x={3.05} y={10.05} w={0.24} d={0.24} h={146} tone="amber" />
      <IsoBox x={2.95} y={9.95} w={0.44} d={0.44} z={136} h={10} tone="amber" />
      <g stroke="var(--city-amber-left)" strokeWidth="1.8" strokeLinecap="round">
        <line x1={jx1} y1={jy1} x2={jx2} y2={jy2} />
        <line x1={ax} y1={ay} x2={jx1} y2={jy1} strokeWidth="0.8" />
        <line x1={ax} y1={ay} x2={jx2} y2={jy2} strokeWidth="0.8" />
        <line x1={jx0} y1={jy} x2={ax} y2={ay} strokeWidth="1.2" />
      </g>
      <IsoBox x={3.75} y={10.05} w={0.34} d={0.26} z={143} h={8} tone="slab" />
      <line ref={cableRef} x1={hx} y1={hy} x2={hx} y2={hy2} stroke="var(--city-bldg-right)" strokeWidth="0.8" />
      <g ref={crateRef}>
        <IsoBox x={1.15} y={9.95} w={0.5} d={0.44} z={90} h={10} tone="green" />
      </g>
    </g>
  )
})

/* ─── Insurance — a family home under a protective dome ─────────────── */

export const InsuredHome = memo(function InsuredHome() {
  const pulseRef = useRef(null)
  const [cx, cy] = iso(11, 6.5)
  const rx = 1.25 * U * Math.SQRT2
  const ry = rx / 2
  const dh = 62
  useCityLoop(() => {
    gsap.fromTo(
      pulseRef.current,
      { scale: 1, opacity: 0.7 },
      { scale: 1.3, opacity: 0, svgOrigin: `${cx} ${cy}`, duration: 2.4, repeat: -1, ease: 'power1.out' },
    )
  })

  const h = { x: 10.2, y: 5.9, w: 1.6, d: 1.2, h: 24 }
  return (
    <g>
      <ellipse ref={pulseRef} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--city-blue-left)" strokeWidth="1.2" />
      <Tree gx={12.3} gy={5.8} s={0.8} />
      <IsoBox {...h} />
      <PlaneX gx={h.x} gy={h.y + h.d} z={h.h}>
        <rect x="16" y="10" width="9" height="14" fill="var(--city-door)" />
        <Windows width={14} height={14} cols={1} rows={1} padX={4} padY={5} seed={1} />
        <Windows x={27} width={14} height={14} cols={1} rows={1} padX={4} padY={5} seed={0} />
      </PlaneX>
      <PlaneY gx={h.x + h.w} gy={h.y + h.d} z={h.h}>
        <Windows width={h.d * U} height={h.h} cols={2} rows={1} padX={6} padY={7} gapX={6} seed={2} />
      </PlaneY>
      <GableRoof x={h.x} y={h.y} w={h.w} d={h.d} z={h.h} rise={14} tone="blue" over={0.14} />
      <Tree gx={9.8} gy={7.4} s={0.75} />

      <defs>
        <linearGradient id="city-dome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--city-blue-top)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--city-green-left)" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <path
        d={`M${cx - rx},${cy} A${rx},${dh} 0 0 1 ${cx + rx},${cy} A${rx},${ry} 0 0 1 ${cx - rx},${cy} Z`}
        fill="url(#city-dome)"
        stroke="var(--city-blue-left)"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path
        d={`M${cx - rx * 0.62},${cy - dh * 0.55} A${rx * 0.7},${dh * 0.7} 0 0 1 ${cx - rx * 0.1},${cy - dh * 0.93}`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g transform={`translate(${cx - 8} ${cy - dh - 10})`}>
        <path d="M8 0 L16 3 V9 C16 14 12 17.5 8 19 C4 17.5 0 14 0 9 V3 Z" fill="var(--city-blue-left)" />
        <path d="M4.5 9.5 L7 12 L11.5 6.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
})

/* ─── Life & Health Insurance — a neighbourhood clinic ───────────────── */

export const Clinic = memo(function Clinic() {
  const b = { x: 5.6, y: 9.8, w: 1.8, d: 1.7, h: 30 }
  return (
    <g>
      <Tree gx={5.4} gy={12.2} s={0.7} />
      <IsoBox {...b} />
      <PlaneX gx={b.x} gy={b.y + b.d} z={b.h}>
        <rect x="0" y="6" width={b.w * U} height="3" fill="var(--city-green-left)" />
        <Windows y={9} width={16} height={14} cols={1} rows={1} padX={4} padY={3} seed={0} />
        <Windows x={30.8} y={9} width={16} height={14} cols={1} rows={1} padX={4} padY={3} seed={1} />
        <rect x={b.w * U * 0.5 - 5.5} y="14" width="11" height="16" fill="var(--city-door)" />
      </PlaneX>
      <PlaneY gx={b.x + b.w} gy={b.y + b.d} z={b.h}>
        <g transform={`translate(${b.d * U * 0.5} 15)`}>
          <circle r="9.5" fill="#fff" stroke="var(--city-red-left)" strokeWidth="1.2" />
          <path d="M-2 -6.5h4v4.5h4.5v4h-4.5v4.5h-4v-4.5h-4.5v-4h4.5z" fill="var(--city-red-left)" />
        </g>
      </PlaneY>
      <IsoBox x={5.55} y={9.75} w={1.9} d={1.8} z={b.h} h={6} tone="blue" />
      <PlaneX gx={5.55} gy={11.55} z={b.h + 6}>
        <text x={0.95 * U} y="4.6" textAnchor="middle" fontSize="4.4" fill="#fff" style={label}>
          CLINIC
        </text>
      </PlaneX>
      <Tree gx={7.6} gy={12.3} s={0.75} />
    </g>
  )
})

/* ─── Annuity — retirement cottage with a pension mailbox ──────────── */

export const RetirementCottage = memo(function RetirementCottage() {
  const letterRef = useRef(null)
  const flagRef = useRef(null)
  const [px, py] = iso(12.18, 12.41, 17)
  useCityLoop(() => {
    gsap.set(flagRef.current, { rotation: 90, svgOrigin: `${px} ${py}` })
    gsap
      .timeline({ repeat: -1, repeatDelay: 1.6, delay: 1 })
      .fromTo(letterRef.current, { y: -26, opacity: 0 }, { opacity: 1, duration: 0.3 })
      .to(letterRef.current, { y: 0, duration: 0.7, ease: 'power1.in' })
      .to(letterRef.current, { opacity: 0, duration: 0.15 })
      .to(flagRef.current, { rotation: 0, svgOrigin: `${px} ${py}`, duration: 0.4, ease: 'back.out(2.5)' })
      .to(flagRef.current, { rotation: 90, svgOrigin: `${px} ${py}`, duration: 0.4, delay: 1.6 })
  })

  const b = { x: 10.3, y: 10.0, w: 1.5, d: 1.5, h: 22 }
  const [p0, p1] = [iso(11.98, 12.41, 0), iso(11.98, 12.41, 12)]
  const [lx, ly] = iso(11.98, 12.41, 26)

  return (
    <g>
      <Tree gx={12.3} gy={9.9} s={0.9} />
      <Tree gx={9.75} gy={10.2} s={0.85} />
      <IsoBox {...b} />
      <PlaneX gx={b.x} gy={b.y + b.d} z={b.h}>
        <rect x="15" y="8" width="9" height="14" fill="var(--city-door)" />
        <Windows width={14} height={14} cols={1} rows={1} padX={3.5} padY={4} seed={0} />
        <Windows x={25} width={14} height={14} cols={1} rows={1} padX={3.5} padY={4} seed={1} />
      </PlaneX>
      <PlaneY gx={b.x + b.w} gy={b.y + b.d} z={b.h}>
        <Windows width={b.d * U} height={b.h} cols={2} rows={1} padX={6} padY={6} gapX={8} seed={0} />
      </PlaneY>
      <GableRoof x={b.x} y={b.y} w={b.w} d={b.d} z={b.h} rise={16} tone="green" />
      <IsoBox x={11.35} y={10.35} w={0.22} d={0.22} z={30} h={14} tone="red" />

      {[0, 1, 2].map((i) => (
        <IsoRect key={i} x={10.95 - i * 0.08} y={11.85 + i * 0.35} w={0.3} d={0.22} fill="var(--city-plaza)" />
      ))}
      <Tree gx={9.9} gy={12.3} s={0.8} />

      <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke="var(--city-trunk)" strokeWidth="1.6" />
      <IsoBox x={11.78} y={12.3} w={0.4} d={0.22} z={12} h={6} tone="blue" />
      <rect ref={flagRef} x={px - 0.8} y={py - 8} width="1.6" height="8" fill="var(--city-red-left)" />
      <g ref={letterRef} opacity="0">
        <rect x={lx - 4.5} y={ly - 3} width="9" height="6" rx="0.8" fill="#fff" stroke="var(--city-blue-left)" strokeWidth="0.7" />
        <path d={`M${lx - 4.5},${ly - 3} L${lx},${ly + 0.5} L${lx + 4.5},${ly - 3}`} fill="none" stroke="var(--city-blue-left)" strokeWidth="0.7" />
      </g>
    </g>
  )
})
