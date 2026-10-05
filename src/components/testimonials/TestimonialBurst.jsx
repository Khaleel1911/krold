'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from './CountUp'
import TestimonialCard from './TestimonialCard'
import { TESTIMONIALS, HAPPY_CLIENTS_COUNT } from '../../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

// The cards were laid out on a screen this size; smaller or larger screens scale them to match.
const DESIGN_W = 1366
const DESIGN_H = 695

// Where each card sits, as a fraction of the way from the centre to the edge (±1 = the edge),
// so the wall fills any screen shape. Bigger = nearer the viewer. The middle band is kept
// clear for the headline, and the outer cards run off the edges on purpose.
const SPOTS = [
  { x: -0.8, y: -0.8, scale: 1 },
  { x: -0.33, y: -0.9, scale: 0.6 },
  { x: -0.4, y: -0.5, scale: 0.78 },
  { x: 0.13, y: -0.84, scale: 1 },
  { x: 0.56, y: -0.52, scale: 0.78 },
  { x: 0.86, y: -0.86, scale: 0.6 },
  { x: -0.9, y: -0.05, scale: 0.78 },
  { x: 0.9, y: -0.02, scale: 0.6 },
  { x: -0.72, y: 0.72, scale: 0.6 },
  { x: -0.42, y: 0.5, scale: 0.6 },
  { x: -0.12, y: 0.8, scale: 1 },
  { x: 0.14, y: 0.5, scale: 0.6 },
  { x: 0.4, y: 0.72, scale: 1 },
  { x: 0.86, y: 0.68, scale: 0.78 },
]
// Height of the fade under the heading, and the gap a hovered card keeps from the wall's edges.
const TOP_FADE = 56
const EDGE_GAP = 12

const DEPTH = { 1: 'near', 0.78: 'mid', 0.6: 'far' }
// Which testimonial each spot shows — the quotes are reused so no one sits next to themselves.
const QUOTE_FOR_SPOT = [0, 3, 1, 2, 4, 5, 5, 0, 2, 4, 3, 1, 0, 5]

// Desktop: the count in the middle of a wall of testimonial cards, which fly out from behind it
// as the section scrolls in. It fills whatever height the section leaves under the heading, and
// fades in at the top so cards don't end on a hard line there. Phones use the marquee instead.
export default function TestimonialBurst() {
  const wrapRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const wrap = wrapRef.current
      const cards = cardRefs.current
      // Read on every refresh, so the wall re-fits when the window is resized.
      const fit = () => Math.min(Math.max(Math.min(wrap.offsetWidth / DESIGN_W, wrap.offsetHeight / DESIGN_H), 0.7), 1.5)
      const landed = (spot) => ({
        x: () => (spot.x * wrap.offsetWidth) / 2,
        y: () => (spot.y * wrap.offsetHeight) / 2,
        scale: () => spot.scale * fit(),
        opacity: 1,
      })
      gsap.set(cards, { xPercent: -50, yPercent: -50 })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const place = () => cards.forEach((card, i) => gsap.set(card, landed(SPOTS[i])))
        place()
        window.addEventListener('resize', place)
        return () => window.removeEventListener('resize', place)
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: 'top 80%', end: 'top 15%', scrub: 0.8, invalidateOnRefresh: true },
      })
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: 0, y: 0, scale: 0.06, opacity: 0 },
          { ...landed(SPOTS[i]), duration: 0.8, ease: 'power3.out' },
          (i % 4) * 0.03,
        )
      })
    })
    return () => mm.revert()
  }, [])

  // A hovered card grows to full size; work out how far it must slide to sit wholly inside
  // the wall, clear of the edges it was cut off by and of the fade at the top.
  const revealOnHover = (e) => {
    const card = e.currentTarget
    const wall = wrapRef.current.getBoundingClientRect()
    const box = card.getBoundingClientRect()
    const scale = box.width / card.offsetWidth
    const grow = Number(card.style.getPropertyValue('--tm-grow'))
    const halfW = (box.width * grow) / 2
    const halfH = (box.height * grow) / 2
    const cx = box.left + box.width / 2
    const cy = box.top + box.height / 2
    const into = (centre, half, min, max) => Math.min(Math.max(centre, min + half), Math.max(max - half, min + half)) - centre
    const dx = into(cx, halfW, wall.left + EDGE_GAP, wall.right - EDGE_GAP)
    const dy = into(cy, halfH, wall.top + TOP_FADE + EDGE_GAP, wall.bottom - EDGE_GAP)
    // The slide happens inside the scaled card, so convert from screen px.
    card.style.setProperty('--tm-dx', `${dx / scale}px`)
    card.style.setProperty('--tm-dy', `${dy / scale}px`)
  }

  return (
    <div
      ref={wrapRef}
      className="relative hidden min-h-0 w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_var(--tm-fade))] lg:block"
      style={{ '--tm-fade': `${TOP_FADE}px` }}
    >
      {SPOTS.map((spot, i) => {
        const q = QUOTE_FOR_SPOT[i] % TESTIMONIALS.length
        const depth = DEPTH[spot.scale]
        return (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            onPointerEnter={revealOnHover}
            className={`tm-burst-card tm-depth-${depth} absolute left-1/2 top-1/2 opacity-0`}
            style={{ '--tm-grow': spot.scale < 1 ? 1 / spot.scale : 1.04 }}
          >
            <div className="tm-lift">
              <TestimonialCard testimonial={TESTIMONIALS[q]} index={q} />
            </div>
          </div>
        )
      })}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center">
        <p className="text-5xl font-semibold leading-[1.1] tracking-[-0.01em] text-black dark:text-white xl:text-6xl">
          Trusted by{' '}
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text tabular-nums text-transparent">
            <CountUp value={HAPPY_CLIENTS_COUNT} />+
          </span>{' '}
          families
        </p>
      </div>
    </div>
  )
}
