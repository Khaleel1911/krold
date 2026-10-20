'use client'

import { useEffect, useRef, useState } from 'react'

// One series per chart: the bar that matters wears the brand colour, the rest stay neutral.
const MARK = 'bg-primary-500'
const MUTED = 'bg-black/15 dark:bg-white/20'
const TIP =
  'pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-black px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 dark:bg-white dark:text-black'

export function ChartCard({ title, source, children, className = '' }) {
  return (
    <figure data-reveal className={`rounded-3xl border border-primary-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-6 ${className}`}>
      <figcaption className="font-semibold text-black dark:text-white">{title}</figcaption>
      <div className="mt-5">{children}</div>
      {source ? <p className="mt-4 text-xs leading-relaxed text-black/45 dark:text-white/45">Source: {source}</p> : null}
    </figure>
  )
}

/* Vertical bars with the value on top and an optional second line under the label. */
export function ColumnChart({ bars, format = (v) => v.toFixed(1), height = 'h-56' }) {
  const max = Math.max(...bars.map((b) => b.value))
  return (
    <div>
      <div className={`flex ${height} items-end gap-3 border-b border-black/15 dark:border-white/20 sm:gap-5`}>
        {bars.map((b) => (
          <div key={b.label} tabIndex={0} className="group relative flex h-full flex-1 flex-col items-center justify-end outline-none">
            <span className={`${TIP} bottom-full mb-1 group-hover:opacity-100 group-focus-visible:opacity-100`}>
              {b.label}: {format(b.value)}
              {b.worth ? `, ${b.worth}` : ''}
            </span>
            <span className="mb-1.5 text-sm font-semibold tabular-nums text-black/80 dark:text-white/80">{format(b.value)}</span>
            <span
              className={`w-full max-w-16 rounded-t-[4px] transition-opacity group-hover:opacity-80 ${b.highlight ? MARK : MUTED}`}
              style={{ height: `${(b.value / max) * 82}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-5">
        {bars.map((b) => (
          <div key={b.label} className="flex-1 text-center">
            <p className="text-sm font-medium text-black/70 dark:text-white/70">{b.label}</p>
            {b.worth ? <p className="text-xs tabular-nums text-black/45 dark:text-white/45">{b.worth}</p> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

// Youngest to oldest, light to dark: one hue, because the groups are ordered.
const AGE_TONES = [
  { bar: 'bg-primary-200', text: 'text-black/75' },
  { bar: 'bg-primary-400', text: 'text-black/80' },
  { bar: 'bg-primary-600', text: 'text-white' },
  { bar: 'bg-[#1f5f82] dark:bg-[#4b8db3]', text: 'text-white' },
]

export function StackedShare({ groups }) {
  return (
    <div>
      <div className="flex h-11 gap-[2px] overflow-visible">
        {groups.map((g, i) => (
          <div
            key={g.label}
            tabIndex={0}
            className={`group relative flex items-center justify-center outline-none first:rounded-l-[4px] last:rounded-r-[4px] ${AGE_TONES[i].bar}`}
            style={{ width: `${g.share}%` }}
          >
            <span className={`${TIP} bottom-full mb-2 group-hover:opacity-100 group-focus-visible:opacity-100`}>
              {g.label}: {g.share}% ({g.people})
            </span>
            <span className={`text-xs font-semibold tabular-nums sm:text-sm ${AGE_TONES[i].text} ${g.share < 12 ? 'hidden sm:inline' : ''}`}>
              {g.share.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {groups.map((g, i) => (
          <li key={g.label} className="flex items-center gap-2 text-sm text-black/65 dark:text-white/65">
            <span className={`h-3 w-3 rounded-[3px] ${AGE_TONES[i].bar}`} aria-hidden="true" />
            {g.label} <span className="tabular-nums text-black/45 dark:text-white/45">{g.share}%, {g.people}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Horizontal bars for total change, with the annualised rate in its own column. */
export function ChangeBars({ rows }) {
  const max = Math.max(...rows.map((r) => r.change))
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-black/10 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-black/45 dark:border-white/10 dark:text-white/45 sm:grid-cols-[10rem_1fr_auto]">
        <span>Index</span>
        <span className="hidden sm:block">Total change</span>
        <span className="text-right">Annualised (CAGR)</span>
      </div>
      <ul>
        {rows.map((r) => (
          <li
            key={r.name}
            tabIndex={0}
            className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-black/5 py-2.5 outline-none last:border-0 dark:border-white/5 sm:grid-cols-[10rem_1fr_auto]"
          >
            <span className={`text-[15px] ${r.highlight ? 'font-semibold text-black dark:text-white' : 'text-black/75 dark:text-white/75'}`}>{r.name}</span>
            {/* Every bar is a share of the same track; the padding keeps room for the largest label. */}
            <span className="order-last col-span-2 block min-w-0 pr-[4.75rem] sm:order-none sm:col-span-1">
              <span className="relative block h-5">
                <span
                  className={`block h-full rounded-r-[4px] transition-opacity group-hover:opacity-80 ${r.highlight ? MARK : MUTED}`}
                  style={{ width: `${(r.change / max) * 100}%` }}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2 text-sm font-semibold tabular-nums text-black/80 dark:text-white/80"
                  style={{ left: `${(r.change / max) * 100}%` }}
                >
                  +{r.change.toLocaleString('en-IN')}%
                </span>
              </span>
            </span>
            <span className="whitespace-nowrap text-right text-sm text-black/60 dark:text-white/60">
              <span className="font-semibold tabular-nums text-black dark:text-white">{r.cagr}</span>
              <span className="hidden sm:inline"> a year</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// A surface-coloured outline behind chart labels, so they stay readable where they cross the line.
const HALO = '[paint-order:stroke] stroke-white stroke-[4px] [stroke-linejoin:round] dark:stroke-neutral-950'

/* Line chart drawn at the container's real width, so labels stay legible on a phone. */
export function SensexLine({ points, latest }) {
  const wrapRef = useRef(null)
  const [width, setWidth] = useState(640)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(280, entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const H = width < 480 ? 240 : 270
  const pad = { top: 28, right: width < 480 ? 12 : 24, bottom: 28, left: 38 }
  const x0 = points[0][0]
  const x1 = points[points.length - 1][0] + 1
  const yMax = 90000
  const sx = (x) => pad.left + ((x - x0) / (x1 - x0)) * (width - pad.left - pad.right)
  const sy = (v) => pad.top + (1 - v / yMax) * (H - pad.top - pad.bottom)
  const d = points.map(([x, v], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(v).toFixed(1)}`).join(' ')
  const last = points[points.length - 1]
  const low = points.find(([x]) => x === 2008)
  const yearStep = width < 480 ? 10 : 5
  const fmt = (v) => v.toLocaleString('en-IN')

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    const year = Math.round(x0 + ((px - pad.left) / (width - pad.left - pad.right)) * (x1 - x0))
    const hit = points.find(([x]) => x === year)
    if (hit) setHover({ x: hit[0], v: hit[1], label: `Dec ${hit[0]}` })
    else if (year > last[0]) setHover({ x: latest.x, v: latest.value, label: latest.label })
    else setHover(null)
  }

  return (
    <div ref={wrapRef} className="relative">
      <svg
        width={width}
        height={H}
        className="block touch-pan-y text-black dark:text-white"
        role="img"
        aria-label={`BSE Sensex rose from ${fmt(points[0][1])} at the end of 2000 to ${fmt(last[1])} at the end of 2025, then fell to ${fmt(latest.value)} by ${latest.label}.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {[0, 30000, 60000, 90000].map((v) => (
          <g key={v}>
            <line x1={pad.left} x2={width - pad.right} y1={sy(v)} y2={sy(v)} stroke="currentColor" strokeOpacity={v ? 0.08 : 0.2} />
            <text x={pad.left - 8} y={sy(v)} dy="0.32em" textAnchor="end" fontSize="11" fill="currentColor" fillOpacity="0.5">
              {v ? `${v / 1000}k` : '0'}
            </text>
          </g>
        ))}
        {points
          .filter(([x]) => (x - x0) % yearStep === 0)
          .map(([x]) => (
            <text key={x} x={sx(x)} y={H - 8} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">
              {x}
            </text>
          ))}

        <path d={d} fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="stroke-primary-600 dark:stroke-primary-400" />
        <line
          x1={sx(last[0])}
          y1={sy(last[1])}
          x2={sx(latest.x)}
          y2={sy(latest.value)}
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
          className="stroke-secondary-600 dark:stroke-secondary-400"
        />

        <text x={sx(low[0])} y={sy(low[1]) + 18} textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.55" className={HALO}>
          2008: −52%
        </text>
        <circle cx={sx(last[0])} cy={sy(last[1])} r="4" strokeWidth="2" className="fill-primary-600 stroke-white dark:fill-primary-400 dark:stroke-neutral-950" />
        <circle cx={sx(latest.x)} cy={sy(latest.value)} r="4" strokeWidth="2" className="fill-secondary-600 stroke-white dark:fill-secondary-400 dark:stroke-neutral-950" />
        <text x={sx(last[0]) - 10} y={sy(last[1]) - 10} textAnchor="end" fontSize="12" fontWeight="600" fill="currentColor" fillOpacity="0.85" className={HALO}>
          {fmt(last[1])} (Dec 2025)
        </text>
        <text x={sx(latest.x) - 6} y={sy(latest.value) + 26} textAnchor="end" fontSize="12" fontWeight="600" className={`fill-secondary-700 dark:fill-secondary-400 ${HALO}`}>
          {fmt(latest.value)} ({latest.label})
        </text>

        {hover ? (
          <g pointerEvents="none">
            <line x1={sx(hover.x)} x2={sx(hover.x)} y1={pad.top} y2={H - pad.bottom} stroke="currentColor" strokeOpacity="0.25" />
            <circle cx={sx(hover.x)} cy={sy(hover.v)} r="5" strokeWidth="2" className="fill-primary-500 stroke-white dark:stroke-neutral-950" />
          </g>
        ) : null}
      </svg>
      {hover ? (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black px-2.5 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-black"
          style={{ left: Math.min(Math.max(sx(hover.x), 70), width - 70) }}
        >
          {hover.label}: {fmt(hover.v)}
        </div>
      ) : null}
    </div>
  )
}
