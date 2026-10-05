'use client'

import { useEffect, useId, useRef } from 'react'
import { gsap } from 'gsap'
import { CORRIDORS, INDIA_POINT } from '../../data/nri'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const safeId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, '')

// Each arc bows away from the straight line between a city and India, like a flight path.
// The bow is perpendicular to that line and always on its upper side.
const ARCS = CORRIDORS.map((c) => {
  const { x, y } = INDIA_POINT
  const dx = x - c.x
  const dy = y - c.y
  const len = Math.hypot(dx, dy)
  const up = dx >= 0 ? 1 : -1
  const cx = (c.x + x) / 2 + ((dy * up) / len) * len * 0.28
  const cy = (c.y + y) / 2 - ((dx * up) / len) * len * 0.28
  return { ...c, d: `M${c.x},${c.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x},${y}` }
})

const HALO_RADII = [46, 96, 150, 208, 268]
const pct = (n) => `${(n / 600) * 100}%`

/* Hero: money finding its way home, from the cities NRIs live in to India. */
export default function HomeArcs() {
  const rootRef = useRef(null)
  const arcRefs = useRef([])
  const labelRefs = useRef([])
  const pulseRef = useRef(null)
  const homeRef = useRef(null)
  const gid = `arcs-${safeId(useId())}`

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.3 })
        .from(homeRef.current, { scale: 0, svgOrigin: `${INDIA_POINT.x} ${INDIA_POINT.y}`, duration: 0.6, ease: 'back.out(2)' })
        .from(labelRefs.current, { opacity: 0, y: 8, duration: 0.45, stagger: 0.12, ease: 'power3.out' }, 0.2)
        .from(arcRefs.current, { strokeDashoffset: 1, duration: 1.3, stagger: 0.16, ease: 'power2.inOut' }, 0.4)
      gsap.fromTo(
        pulseRef.current,
        { attr: { r: 12 }, opacity: 0.5 },
        { attr: { r: 150 }, opacity: 0, duration: 4.5, ease: 'power1.out', repeat: -1, repeatDelay: 1, delay: 2 },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-secondary-500)" />
          </linearGradient>
          <radialGradient id={`${gid}-wash`}>
            <stop offset="0%" stopColor="var(--color-secondary-400)" stopOpacity="0.2" />
            <stop offset="70%" stopColor="var(--color-primary-400)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-primary-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={INDIA_POINT.x} cy={INDIA_POINT.y} r="290" fill={`url(#${gid}-wash)`} />
        {HALO_RADII.map((r, i) => (
          <circle
            key={r}
            cx={INDIA_POINT.x}
            cy={INDIA_POINT.y}
            r={r}
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="1"
            strokeOpacity={0.3 - i * 0.045}
            strokeDasharray="2 7"
          />
        ))}
        <circle ref={pulseRef} cx={INDIA_POINT.x} cy={INDIA_POINT.y} r="12" fill="none" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0" />

        {ARCS.map((arc, i) => (
          <path
            key={arc.city}
            ref={(el) => (arcRefs.current[i] = el)}
            d={arc.d}
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth="2"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        ))}

        <g ref={homeRef}>
          <circle cx={INDIA_POINT.x} cy={INDIA_POINT.y} r="13" fill={`url(#${gid})`} />
          <circle cx={INDIA_POINT.x} cy={INDIA_POINT.y} r="5" className="fill-white dark:fill-neutral-950" />
        </g>
      </svg>

      {ARCS.map((arc, i) => (
        <div
          key={arc.city}
          ref={(el) => (labelRefs.current[i] = el)}
          className="absolute"
          style={{ left: pct(arc.x), top: pct(arc.y) }}
        >
          <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full bg-white ring-[2.5px] ring-primary-500 dark:bg-neutral-950" />
          <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary-100 bg-white/90 px-3 py-1 text-xs font-semibold text-black/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/90 dark:text-white/75">
            {arc.city}
          </span>
        </div>
      ))}

      <div className="absolute" style={{ left: pct(INDIA_POINT.x), top: pct(INDIA_POINT.y) }}>
        <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3.5 py-1 text-xs font-bold tracking-wide text-white shadow-md shadow-primary-200 dark:shadow-black/40">
          India
        </span>
      </div>
    </div>
  )
}
