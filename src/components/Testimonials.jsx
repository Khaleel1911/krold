import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CenterBadge from './testimonials/CenterBadge'
import TestimonialCard from './testimonials/TestimonialCard'
import { TESTIMONIALS, HAPPY_CLIENTS_COUNT } from '../data/testimonials'

// Desktop scatter positions (top/left as % of the container, plus a rotation).
// Kept clear of the centered badge, which occupies roughly the middle 30-70% band.
const SCATTER_POSITIONS = [
  { top: '2%', left: '2%', rotate: -7 },
  { top: '0%', left: '68%', rotate: 6 },
  { top: '34%', left: '78%', rotate: -4 },
  { top: '66%', left: '64%', rotate: 8 },
  { top: '62%', left: '0%', rotate: -6 },
  { top: '28%', left: '-4%', rotate: 5 },
]

function useBalloonPopReveal(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const cards = root.querySelectorAll('[data-pop-card]')
    if (cards.length === 0) return

    gsap.set(cards, { scale: 0.2, opacity: 0 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Array.from(cards).indexOf(entry.target)
          gsap.to(entry.target, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: Math.max(index, 0) * 0.12,
            ease: 'elastic.out(1, 0.55)',
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 },
    )
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}

export default function Testimonials() {
  const desktopRef = useRef(null)
  useBalloonPopReveal(desktopRef)

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Trusted by families{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              across generations
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            Real feedback from clients we&rsquo;ve worked alongside on their wealth journey.
          </p>
        </div>

        {/* Desktop: scattered cards around a center count */}
        <div ref={desktopRef} className="relative mt-16 hidden h-[680px] lg:block">
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <CenterBadge count={HAPPY_CLIENTS_COUNT} label="Happy Clients" />
          </div>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              data-pop-card
              className="absolute"
              style={{
                top: SCATTER_POSITIONS[i].top,
                left: SCATTER_POSITIONS[i].left,
                transform: `rotate(${SCATTER_POSITIONS[i].rotate}deg)`,
              }}
            >
              <TestimonialCard testimonial={t} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile: opposing marquee rows around a fixed center count */}
        <div className="mt-12 lg:hidden">
          <div className="-mx-5 overflow-hidden">
            <div className="flex w-max animate-[marquee-left_32s_linear_infinite] gap-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard key={`${t.id}-a-${i}`} testimonial={t} index={i} className="w-64" />
              ))}
            </div>
          </div>

          <div className="my-8 flex justify-center">
            <CenterBadge count={HAPPY_CLIENTS_COUNT} label="Happy Clients" className="h-44 w-44" />
          </div>

          <div className="-mx-5 overflow-hidden">
            <div className="flex w-max animate-[marquee-right_32s_linear_infinite] gap-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard key={`${t.id}-b-${i}`} testimonial={t} index={i + 1} className="w-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
