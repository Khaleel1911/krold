import { useEffect, useId, useRef } from 'react'
import { gsap } from 'gsap'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A tree-ring outline: a circle nudged by a few slow waves so no two rings are quite alike.
function ringPath(r, seed, c = 300, steps = 120) {
  const pts = []
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const wobble = 1 + 0.012 * Math.sin(a * 3 + seed) + 0.008 * Math.sin(a * 5 + seed * 1.7) + 0.006 * Math.sin(a * 2 - seed)
    pts.push(`${(c + Math.cos(a) * r * wobble).toFixed(1)},${(c + Math.sin(a) * r * wobble).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
}

// Uneven spacing, like real growth years: some lean, some generous.
const RADII = [22, 40, 62, 80, 104, 126, 152, 176, 204, 232, 262]
const BOLD = new Set([2, 6, 10])
const PATHS = RADII.map((r, i) => ringPath(r, i * 1.3 + 0.4))

// Each generation sits on one of the bold rings.
const MARKS = [
  { ring: 2, angle: -50, label: 'You, today' },
  { ring: 6, angle: 205, label: 'Your children' },
  { ring: 10, angle: 52, label: 'Generations to come' },
].map((m) => {
  const a = (m.angle * Math.PI) / 180
  const r = RADII[m.ring]
  return { ...m, x: 300 + Math.cos(a) * r, y: 300 + Math.sin(a) * r }
})

const safeId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, '')

/* Hero: the rings draw outward from a seed, one generation at a time. */
export function GrowthRings() {
  const rootRef = useRef(null)
  const ringRefs = useRef([])
  const markRefs = useRef([])
  const rippleRef = useRef(null)
  const seedRef = useRef(null)
  const gid = `rings-${safeId(useId())}`

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap
        .timeline({ delay: 0.3 })
        .from(seedRef.current, { scale: 0, svgOrigin: '300 300', duration: 0.6, ease: 'back.out(2)' })
        .from(ringRefs.current, { strokeDashoffset: 1, duration: 1.2, stagger: 0.11, ease: 'power2.out' }, '-=0.2')
        .from(markRefs.current, { opacity: 0, y: 8, duration: 0.5, stagger: 0.35, ease: 'power3.out' }, 0.9)
      gsap.fromTo(
        rippleRef.current,
        { attr: { r: 14 }, opacity: 0.55 },
        { attr: { r: 272 }, opacity: 0, duration: 6, ease: 'power1.out', repeat: -1, repeatDelay: 1.5, delay: 2.6 },
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
            <stop offset="0%" stopColor="var(--color-primary-400)" stopOpacity="0.22" />
            <stop offset="70%" stopColor="var(--color-secondary-400)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-secondary-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="300" r="290" fill={`url(#${gid}-wash)`} />
        <circle ref={rippleRef} cx="300" cy="300" r="14" fill="none" stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0" />

        {PATHS.map((d, i) => (
          <path
            key={i}
            ref={(el) => (ringRefs.current[i] = el)}
            d={d}
            fill="none"
            stroke={`url(#${gid})`}
            strokeWidth={BOLD.has(i) ? 2.4 : 1}
            strokeOpacity={BOLD.has(i) ? 0.95 : 0.35 + (i / RADII.length) * 0.15}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        ))}

        <g ref={seedRef}>
          <circle cx="300" cy="300" r="9" fill={`url(#${gid})`} />
          <circle cx="300" cy="300" r="3.5" className="fill-white dark:fill-neutral-950" />
        </g>
      </svg>

      {MARKS.map((m, i) => (
        <div
          key={m.label}
          ref={(el) => (markRefs.current[i] = el)}
          className="absolute"
          style={{ left: `${(m.x / 600) * 100}%`, top: `${(m.y / 600) * 100}%` }}
        >
          <span className="absolute -left-[5px] -top-[5px] h-2.5 w-2.5 rounded-full bg-white ring-[2.5px] ring-primary-500 dark:bg-neutral-950" />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary-100 bg-white/90 px-3 py-1 text-xs font-semibold text-black/70 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/90 dark:text-white/75">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* A small static set of `count` rings, used as an emblem or a backdrop. */
export function RingMark({ count = 4, max = 4, from = 'var(--color-primary-400)', to = 'var(--color-secondary-400)', className = '' }) {
  const gid = `ringmark-${safeId(useId())}`
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      {Array.from({ length: max }, (_, i) => {
        const on = i < count
        return (
          <path
            key={i}
            d={ringPath(70 + i * 70, i * 1.9 + 0.7)}
            fill="none"
            stroke={on ? `url(#${gid})` : 'currentColor'}
            strokeWidth={on ? (i === count - 1 ? 22 : 12) : 6}
            strokeOpacity={on ? 1 : 0.18}
            strokeDasharray={on ? undefined : '4 26'}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="300" cy="300" r="34" fill={`url(#${gid})`} />
    </svg>
  )
}
