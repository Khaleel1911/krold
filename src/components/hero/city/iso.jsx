import { iso, pts, toneOf } from './geometry'

// Isometric drawing primitives for the hero city — see geometry.js for the projection.

export function IsoRect({ x, y, w, d, z = 0, fill, className }) {
  return (
    <polygon
      className={className}
      points={pts([iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)])}
      fill={fill}
    />
  )
}

export function IsoBox({ x, y, w, d, h, z = 0, tone = 'bldg', edge = true }) {
  const z1 = z + h
  const c = toneOf(tone)
  return (
    <g stroke={edge ? 'var(--city-edge)' : 'none'} strokeWidth="0.6" strokeLinejoin="round">
      <polygon
        points={pts([iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z1), iso(x, y + d, z1)])}
        fill={c.left}
      />
      <polygon
        points={pts([iso(x + w, y + d, z), iso(x + w, y, z), iso(x + w, y, z1), iso(x + w, y + d, z1)])}
        fill={c.right}
      />
      <polygon
        points={pts([iso(x, y, z1), iso(x + w, y, z1), iso(x + w, y + d, z1), iso(x, y + d, z1)])}
        fill={c.top}
      />
    </g>
  )
}

// Flat 2D drawing space on a front-left facing wall (the plane gy = const).
// Origin is the wall's top-left corner; +x runs along the wall, +y runs down.
export function PlaneX({ gx, gy, z, children }) {
  const [ox, oy] = iso(gx, gy, z)
  return <g transform={`matrix(1 0.5 0 1 ${ox} ${oy})`}>{children}</g>
}

// Same as PlaneX for a front-right facing wall (the plane gx = const).
// Origin is the wall's top-left corner at (gx, gy); +x runs toward smaller gy.
export function PlaneY({ gx, gy, z, children }) {
  const [ox, oy] = iso(gx, gy, z)
  return <g transform={`matrix(1 -0.5 0 1 ${ox} ${oy})`}>{children}</g>
}

// A grid of windows inside a Plane. Roughly 40% are "lit" and glow at night.
export function Windows({
  width,
  height,
  cols,
  rows,
  x = 0,
  y = 0,
  padX = 5,
  padY = 5,
  gapX = 3,
  gapY = 4,
  seed = 1,
  kind = 'win',
}) {
  const ww = (width - padX * 2 - gapX * (cols - 1)) / cols
  const wh = (height - padY * 2 - gapY * (rows - 1)) / rows
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c
      const lit = (i * 7 + seed * 3) % 5 < 2
      cells.push(
        <rect
          key={i}
          x={x + padX + c * (ww + gapX)}
          y={y + padY + r * (wh + gapY)}
          width={ww}
          height={wh}
          rx="0.8"
          className={lit ? `city-${kind} city-${kind}-lit` : `city-${kind}`}
        />,
      )
    }
  }
  return <g>{cells}</g>
}

// Pitched roof whose ridge runs along gy, with a small overhang.
export function GableRoof({ x, y, w, d, z, rise, tone = 'blue', wall = 'bldg', over = 0.12 }) {
  const rx = x - over
  const ry = y - over
  const rw = w + over * 2
  const rd = d + over * 2
  const xm = rx + rw / 2
  const zr = z + rise
  const c = toneOf(tone)
  return (
    <g stroke="var(--city-edge)" strokeWidth="0.6" strokeLinejoin="round">
      <polygon
        points={pts([iso(rx, ry, z), iso(xm, ry, zr), iso(xm, ry + rd, zr), iso(rx, ry + rd, z)])}
        fill={c.top}
      />
      <polygon
        points={pts([iso(xm, ry, zr), iso(xm, ry + rd, zr), iso(rx + rw, ry + rd, z), iso(rx + rw, ry, z)])}
        fill={c.left}
      />
      <polygon
        points={pts([iso(rx, ry + rd, z), iso(rx + rw, ry + rd, z), iso(xm, ry + rd, zr)])}
        fill={toneOf(wall).left}
      />
    </g>
  )
}

export function Cylinder({ gx, gy, z = 0, r, h, tone }) {
  const [cx, cy] = iso(gx, gy, z)
  const c = toneOf(tone)
  const ry = r / 2
  return (
    <g stroke="var(--city-edge)" strokeWidth="0.6">
      <path d={`M${cx - r},${cy - h} L${cx - r},${cy} A${r},${ry} 0 0 0 ${cx + r},${cy} L${cx + r},${cy - h} Z`} fill={c.left} />
      <path d={`M${cx},${cy - h} L${cx},${cy + ry} A${r},${ry} 0 0 0 ${cx + r},${cy} L${cx + r},${cy - h} Z`} fill={c.right} stroke="none" />
      <ellipse cx={cx} cy={cy - h} rx={r} ry={ry} fill={c.top} />
    </g>
  )
}

export function Tree({ gx, gy, s = 1 }) {
  const [x, y] = iso(gx, gy)
  return (
    <g>
      <ellipse cx={x} cy={y} rx={9 * s} ry={4 * s} fill="var(--city-shadow)" />
      <rect x={x - 1.2 * s} y={y - 12 * s} width={2.4 * s} height={12 * s} rx={1} fill="var(--city-trunk)" />
      <circle cx={x + 2 * s} cy={y - 16 * s} r={8 * s} fill="var(--city-tree-right)" />
      <circle cx={x - 1 * s} cy={y - 18 * s} r={7 * s} fill="var(--city-tree-top)" />
    </g>
  )
}
