import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CenterBadge from './CenterBadge'
import TestimonialCard from './TestimonialCard'
import { TESTIMONIALS, HAPPY_CLIENTS_COUNT } from '../../data/testimonials'

gsap.registerPlugin(ScrollTrigger)

// Fixed-size stage, scaled down to fit narrower screens.
const STAGE_W = 1160
const STAGE_H = 840

// Where each card lands, as an offset from the centre badge. Bigger = nearer the viewer.
// Found with an overlap-free layout search: near cards in the corners, far ones hugging the badge.
const SPOTS = [
  { x: 382, y: -286, scale: 1, rotate: 5 },
  { x: -416, y: 264, scale: 1, rotate: -6 },
  { x: 408, y: 286, scale: 1, rotate: 4 },
  { x: -427, y: -234, scale: 1, rotate: -5 },
  { x: -429, y: 22, scale: 0.78, rotate: 4 },
  { x: -131, y: 245, scale: 0.78, rotate: -3 },
  { x: 111, y: -265, scale: 0.78, rotate: 6 },
  { x: -135, y: -236, scale: 0.78, rotate: -4 },
  { x: 128, y: 292, scale: 0.78, rotate: 3 },
  { x: -220, y: 31, scale: 0.56, rotate: -5 },
  { x: 247, y: -77, scale: 0.56, rotate: 4 },
  { x: 281, y: 77, scale: 0.56, rotate: -3 },
]
const DEPTH = { 1: 'near', 0.78: 'mid', 0.56: 'far' }
// Which testimonial each spot shows — the 6 quotes are reused so no one sits next to themselves.
const QUOTE_FOR_SPOT = [0, 1, 2, 3, 4, 5, 1, 2, 3, 0, 5, 4]

// Party-popper confetti, laid out deterministically so every visit looks the same.
const CONFETTI_COLORS = ['#36a1da', '#54ba4f', '#f5c542', '#6ebbe4', '#84cd80']
const CONFETTI = Array.from({ length: 42 }, (_, i) => {
  const rand = (k) => {
    const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453
    return v - Math.floor(v)
  }
  const angle = (i / 42) * Math.PI * 2 + rand(1) * 0.5
  const dist = 230 + rand(2) * 330
  const strip = rand(4) > 0.45
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist * 0.72,
    rotate: (rand(3) - 0.5) * 900,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    w: strip ? 11 : 7,
    h: strip ? 4 : 7,
    round: !strip,
  }
})

export default function TestimonialBurst() {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const badgeRef = useRef(null)
  const cardRefs = useRef([])
  const confettiRefs = useRef([])

  // Fit the stage to the available width; the wrapper keeps the scaled height.
  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    let lastHeight = 0
    const ro = new ResizeObserver(([entry]) => {
      const s = Math.min(1, entry.contentRect.width / STAGE_W)
      stage.style.transform = `translateX(-50%) scale(${s})`
      const height = Math.round(STAGE_H * s)
      if (height !== lastHeight) {
        lastHeight = height
        wrap.style.height = `${height}px`
        ScrollTrigger.refresh()
      }
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  // Scroll-scrubbed burst: cards fly out of the badge as the section scrolls in,
  // and fly back in when scrolling up again. Desktop only; phones keep the marquee.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const cards = cardRefs.current
      const bits = confettiRefs.current
      const landed = (s) => ({ x: s.x, y: s.y, scale: s.scale, rotation: s.rotate, opacity: 1 })
      gsap.set(cards, { xPercent: -50, yPercent: -50 })

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.forEach((card, i) => gsap.set(card, landed(SPOTS[i])))
        gsap.set(bits, { opacity: 0 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top 80%', end: 'center 55%', scrub: 0.8 },
      })
      tl.fromTo(badgeRef.current, { scale: 0.92 }, { scale: 1.08, duration: 0.12, ease: 'power2.out' }, 0).to(
        badgeRef.current,
        { scale: 1, duration: 0.25, ease: 'power2.inOut' },
        0.12,
      )

      cards.forEach((card, i) => {
        const spot = SPOTS[i]
        tl.fromTo(
          card,
          { x: 0, y: 0, scale: 0.06, rotation: spot.rotate * 5, opacity: 0 },
          { ...landed(spot), duration: 0.8, ease: 'power3.out' },
          0.05 + (i % 4) * 0.03,
        )
      })

      bits.forEach((bit, i) => {
        const c = CONFETTI[i]
        const at = 0.04 + (i % 5) * 0.02
        tl.fromTo(bit, { x: 0, y: 0, rotation: 0, opacity: 0 }, { x: c.x, y: c.y, rotation: c.rotate, duration: 0.85, ease: 'power2.out' }, at)
          .to(bit, { opacity: 1, duration: 0.04 }, at)
          .to(bit, { opacity: 0, duration: 0.3 }, at + 0.55)
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={wrapRef} className="relative mx-auto mt-10 hidden w-full max-w-[1200px] px-5 lg:block" style={{ height: STAGE_H }}>
      <div
        ref={stageRef}
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: STAGE_W, height: STAGE_H, transform: 'translateX(-50%)' }}
      >
        {SPOTS.map((spot, i) => {
          const q = QUOTE_FOR_SPOT[i] % TESTIMONIALS.length
          const t = TESTIMONIALS[q]
          const depth = DEPTH[spot.scale]
          return (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`tm-burst-card tm-depth-${depth} absolute left-1/2 top-1/2 opacity-0`}
              style={{ '--tm-grow': spot.scale < 1 ? 1 / spot.scale : 1.04 }}
            >
              <div className="tm-lift">
                <TestimonialCard testimonial={t} index={q} />
              </div>
            </div>
          )
        })}

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[15]" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              ref={(el) => (confettiRefs.current[i] = el)}
              className="absolute opacity-0"
              style={{
                width: c.w,
                height: c.h,
                marginLeft: -c.w / 2,
                marginTop: -c.h / 2,
                background: c.color,
                borderRadius: c.round ? '9999px' : '2px',
              }}
            />
          ))}
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div ref={badgeRef}>
            <CenterBadge count={HAPPY_CLIENTS_COUNT} label="Happy Families" />
          </div>
        </div>
      </div>
    </div>
  )
}
