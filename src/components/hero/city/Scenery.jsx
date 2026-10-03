import { memo, useRef } from 'react'
import { gsap } from 'gsap'
import { U, GRID, iso, pts } from './geometry'
import { IsoRect } from './iso'
import { useCityLoop } from './motion'

const LOTS = [0.3, 5.3, 9.3]
const LOT_W = 3.4
const ROADS = [3.9, 7.9]
const ROAD_W = 1.2

export const Ground = memo(function Ground() {
  const T = 20
  const top = iso(0, 0)
  const right = iso(GRID, 0)
  const bottom = iso(GRID, GRID)
  const left = iso(0, GRID)
  const down = ([x, y]) => [x, y + T]

  return (
    <g>
      <ellipse cx={bottom[0]} cy={bottom[1] + T + 10} rx="260" ry="16" fill="var(--city-shadow)" />
      <polygon points={pts([left, bottom, down(bottom), down(left)])} fill="var(--city-plate-left)" />
      <polygon points={pts([bottom, right, down(right), down(bottom)])} fill="var(--city-plate-right)" />
      <polyline points={pts([left, bottom, right])} fill="none" stroke="var(--city-lot)" strokeWidth="3" />
      <polygon points={pts([top, right, bottom, left])} fill="var(--city-plate-top)" />

      {LOTS.flatMap((x) =>
        LOTS.map((y) => <IsoRect key={`${x}-${y}`} x={x} y={y} w={LOT_W} d={LOT_W} fill="var(--city-lot)" />),
      )}

      {ROADS.map((r) => (
        <g key={r}>
          <IsoRect x={r} y={0} w={ROAD_W} d={GRID} fill="var(--city-road)" />
          <IsoRect x={0} y={r} w={GRID} d={ROAD_W} fill="var(--city-road)" />
        </g>
      ))}
      <g stroke="var(--city-road-line)" strokeWidth="1.2" strokeDasharray="5 6" strokeLinecap="round">
        {ROADS.map((r) => {
          const c = r + ROAD_W / 2
          const [a, b] = [iso(c, 0.2), iso(c, GRID - 0.2)]
          const [e, f] = [iso(0.2, c), iso(GRID - 0.2, c)]
          return (
            <g key={r}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
              <line x1={e[0]} y1={e[1]} x2={f[0]} y2={f[1]} />
            </g>
          )
        })}
      </g>
    </g>
  )
})

export const Lamps = memo(function Lamps() {
  const spots = [
    [3.75, 3.75],
    [9.25, 3.75],
    [3.75, 9.25],
    [9.25, 9.25],
  ]
  return (
    <g>
      {spots.map(([gx, gy]) => {
        const [x, y] = iso(gx, gy)
        return (
          <g key={`${gx}-${gy}`}>
            <circle cx={x} cy={y - 24} r="11" fill="var(--city-lamp)" opacity="var(--city-glow)" />
            <line x1={x} y1={y} x2={x} y2={y - 22} stroke="var(--city-bldg-right)" strokeWidth="1.4" />
            <circle cx={x} cy={y - 24} r="2.6" fill="var(--city-lamp)" />
          </g>
        )
      })}
    </g>
  )
})

/* ─── Cars driving around the inner ring road ──────────────────────── */

const LOOP = [
  [4.2, 4.2],
  [8.8, 4.2],
  [8.8, 8.8],
  [4.2, 8.8],
]

// Headings for each leg of the loop: +gx, +gy, -gx, -gy.
const HEADINGS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

function loopPoint(t) {
  const seg = (((t % 1) + 1) % 1) * 4
  const i = Math.floor(seg)
  const f = seg - i
  const [ax, ay] = LOOP[i]
  const [bx, by] = LOOP[(i + 1) % 4]
  return { gx: ax + (bx - ax) * f, gy: ay + (by - ay) * f, heading: i }
}

const offsetOf = ({ gx, gy }) => `translate(${((gx - gy) * U).toFixed(1)} ${(((gx + gy) * U) / 2).toFixed(1)})`

// Car silhouettes as side profiles [u along the car in grid units, z in px],
// extruded across the car's width. Both are convex, so back-face culling is
// enough to draw them without depth sorting.
const CAR_L = 0.8
const CAR_W = 0.42
const BODY = [
  [-0.4, 1.8],
  [0.4, 1.8],
  [0.4, 4.6],
  [0.3, 6],
  [-0.36, 6],
  [-0.4, 5],
]
const CABIN = [
  [-0.27, 6],
  [0.14, 6],
  [0.02, 10.2],
  [-0.22, 10.2],
]
const WHEEL_R = 2.6

// Maps car-local (u forward, v to the side, z up) onto the ground grid.
const toGrid = ([fx, fy], u, v, z) => [u * fx - v * fy, u * fy + v * fx, z]

// Faces of an extruded profile, keeping only those turned toward the viewer.
// In this projection the eye looks back along (1, 1, 1) with z measured in grid units.
function prismFaces(profile, halfW, heading) {
  const corners = (v) => profile.map(([u, z]) => toGrid(heading, u, v, z))
  const near = corners(halfW)
  const far = corners(-halfW)
  const quads = [near, [...far].reverse()]
  profile.forEach((_, i) => {
    const j = (i + 1) % profile.length
    quads.push([near[j], near[i], far[i], far[j]])
  })
  const mid = toGrid(heading, profile.reduce((a, [u]) => a + u, 0) / profile.length, 0, profile.reduce((a, [, z]) => a + z, 0) / profile.length)
  return quads.flatMap((q) => {
    const [a, b, c] = q.map(([x, y, z]) => [x, y, z / U])
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]]
    let n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]
    const centre = q.reduce((acc, [x, y, z]) => [acc[0] + x / q.length, acc[1] + y / q.length, acc[2] + z / U / q.length], [0, 0, 0])
    const out = [centre[0] - mid[0], centre[1] - mid[1], centre[2] - mid[2] / U]
    if (n[0] * out[0] + n[1] * out[1] + n[2] * out[2] < 0) n = n.map((k) => -k)
    if (n[0] + n[1] + n[2] <= 1e-6) return []
    const len = Math.hypot(...n)
    const side = n[2] / len > 0.6 ? 'top' : n[1] > n[0] ? 'left' : 'right'
    return [{ points: pts(q.map(([x, y, z]) => iso(x, y, z))), side }]
  })
}

function Wheel({ heading, u, v }) {
  const [gx, gy] = toGrid(heading, u, v, 0)
  const [x, y] = iso(gx, gy, WHEEL_R)
  const [fx, fy] = heading
  return (
    <g transform={`matrix(${fx - fy} ${(fx + fy) / 2} 0 1 ${x} ${y})`}>
      <circle r={WHEEL_R} fill="var(--city-tyre)" />
      <circle r={WHEEL_R * 0.4} fill="var(--city-hub)" />
    </g>
  )
}

function Light({ heading, u, v, z, fill, glow }) {
  const [gx, gy] = toGrid(heading, u, v, z)
  const [x, y] = iso(gx, gy, z)
  return (
    <g>
      {glow && <circle cx={x} cy={y} r="4.5" fill={fill} opacity="var(--city-glow)" />}
      <circle cx={x} cy={y} r="1.1" fill={fill} />
    </g>
  )
}

function CarShape({ heading, tone }) {
  const [fx, fy] = heading
  const facingViewer = fx + fy > 0
  const nearSide = fx - fy > 0 ? 1 : -1 // which side (v sign) faces the viewer
  const halfW = CAR_W / 2
  const colour = { top: `var(--city-${tone}-top)`, left: `var(--city-${tone}-left)`, right: `var(--city-${tone}-right)` }
  const footprint = [
    [-CAR_L / 2 - 0.05, -halfW - 0.05],
    [CAR_L / 2 + 0.05, -halfW - 0.05],
    [CAR_L / 2 + 0.05, halfW + 0.05],
    [-CAR_L / 2 - 0.05, halfW + 0.05],
  ].map(([u, v]) => iso(...toGrid(heading, u, v, 0)))
  const lampU = facingViewer ? CAR_L / 2 : -CAR_L / 2
  const wheels = (side) =>
    [-0.24, 0.24].map((u) => <Wheel key={`${side}${u}`} heading={heading} u={u} v={side * halfW} />)

  return (
    <g>
      <polygon points={pts(footprint)} fill="var(--city-shadow)" />
      {wheels(-nearSide)}
      <g stroke="var(--city-edge)" strokeWidth="0.4" strokeLinejoin="round">
        {prismFaces(BODY, halfW, heading).map((f, i) => (
          <polygon key={i} points={f.points} fill={colour[f.side]} />
        ))}
      </g>
      {wheels(nearSide)}
      {[-1, 1].map((side) => (
        <Light
          key={side}
          heading={heading}
          u={lampU}
          v={side * halfW * 0.62}
          z={4}
          fill={facingViewer ? 'var(--city-headlight)' : 'var(--city-taillight)'}
          glow={facingViewer}
        />
      ))}
      <g stroke={colour.left} strokeWidth="0.8" strokeLinejoin="round">
        {prismFaces(CABIN, halfW * 0.84, heading).map((f, i) => (
          <polygon key={i} points={f.points} fill={f.side === 'top' ? colour.top : 'var(--city-carglass)'} />
        ))}
      </g>
    </g>
  )
}

const Car = memo(function Car({ offset, tone }) {
  const ref = useRef(null)
  const facingRefs = useRef([])
  const start = loopPoint(offset)

  useCityLoop(() => {
    // Hold the nodes directly: React clears the refs on unmount before the context is
    // reverted, and reverting renders this tween one last time.
    const car = ref.current
    const facings = [...facingRefs.current]
    const state = { t: offset }
    gsap.to(state, {
      t: offset + 1,
      duration: 22,
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        const p = loopPoint(state.t)
        car.setAttribute('transform', offsetOf(p))
        facings.forEach((g, i) => (g.style.display = i === p.heading ? '' : 'none'))
      },
    })
  })

  return (
    <g ref={ref} transform={offsetOf(start)}>
      {HEADINGS.map((heading, i) => (
        <g
          key={i}
          ref={(el) => (facingRefs.current[i] = el)}
          style={{ display: i === start.heading ? '' : 'none' }}
        >
          <CarShape heading={heading} tone={tone} />
        </g>
      ))}
    </g>
  )
})

export const Cars = memo(function Cars() {
  return (
    <g>
      <Car offset={0.05} tone="blue" />
      <Car offset={0.38} tone="green" />
      <Car offset={0.71} tone="red" />
    </g>
  )
})

/* ─── Sky: sun by day, moon and stars by night, drifting clouds ─────── */

const STARS = [
  [60, 40], [150, 28], [230, 70], [300, 22], [470, 30], [540, 90], [610, 40], [700, 70], [680, 150], [40, 150], [120, 210], [720, 220],
]
const CLOUDS = [
  { x: 560, y: 70, s: 1 },
  { x: 150, y: 150, s: 0.8 },
  { x: 680, y: 190, s: 0.7 },
]

function Cloud({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="var(--city-cloud)" opacity="var(--city-cloud-opacity)">
      <ellipse cx="0" cy="0" rx="30" ry="9" />
      <circle cx="-10" cy="-6" r="10" />
      <circle cx="8" cy="-9" r="13" />
    </g>
  )
}

export const Sky = memo(function Sky() {
  const cloudsRef = useRef([])
  useCityLoop(() => {
    cloudsRef.current.forEach((c, i) => {
      gsap.to(c, { x: i % 2 ? -40 : 40, duration: 16 + i * 5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    })
  })
  return (
    <g>
      <g opacity="var(--city-star-opacity)" fill="#fff">
        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 1 : 1.6} />
        ))}
      </g>
      <circle cx="92" cy="82" r="34" fill="var(--city-sun)" opacity="0.18" />
      <circle cx="92" cy="82" r="20" fill="var(--city-sun)" />
      <g fill="#000" opacity="var(--city-crater-opacity)">
        <circle cx="85" cy="76" r="4" />
        <circle cx="99" cy="89" r="2.6" />
        <circle cx="96" cy="74" r="1.8" />
      </g>
      {CLOUDS.map((c, i) => (
        <g key={i} ref={(el) => (cloudsRef.current[i] = el)}>
          <Cloud {...c} />
        </g>
      ))}
    </g>
  )
})
