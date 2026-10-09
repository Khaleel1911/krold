'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from './testimonials/CountUp'
import TestimonialCard from './testimonials/TestimonialCard'
import { TESTIMONIALS, HAPPY_CLIENTS_COUNT } from '../data/testimonials'

// How long a card stays put before the row moves on by itself.
const AUTOPLAY_MS = 4500
// Share of the progress line the moving marker takes up.
const MARKER = 0.25

function ArrowButton({ label, onClick, disabled, flip = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="p-1 text-black transition-opacity hover:text-primary-600 disabled:pointer-events-none disabled:opacity-30 dark:text-white dark:hover:text-primary-400"
    >
      <svg viewBox="0 0 28 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`h-3 w-7 ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
        <path d="M1 6h26M21 1l6 5-6 5" />
      </svg>
    </button>
  )
}

// The heading, count and controls on the left; one row of speech bubbles running off the
// right edge. The row is a native scroller, so it can be swiped as well as stepped.
export default function Testimonials() {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  // 0 at the first card, 1 once the row is scrolled to its end.
  const [progress, setProgress] = useState(0)

  const step = (dir) => {
    const track = trackRef.current
    const card = track.firstElementChild
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth
      setProgress(max > 0 ? Math.min(track.scrollLeft / max, 1) : 0)
    }
    sync()
    track.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)

    let timer
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => {
        if (pausedRef.current) return
        const max = track.scrollWidth - track.clientWidth
        if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' })
        else step(1)
      }, AUTOPLAY_MS)
    }
    return () => {
      track.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      clearInterval(timer)
    }
  }, [])

  const pause = () => (pausedRef.current = true)
  const resume = () => (pausedRef.current = false)

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-[73px] overflow-hidden py-8 lg:py-14"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div className="mx-auto max-w-[1600px] lg:flex lg:items-center lg:gap-10 lg:pl-10 xl:gap-14 xl:pl-20">
        <div className="px-5 lg:w-72 lg:shrink-0 lg:px-0">
          <svg viewBox="0 0 24 24" className="h-10 w-10 lg:h-14 lg:w-14" aria-hidden="true">
            <defs>
              <linearGradient id="tm-quote" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--color-primary-500)" />
                <stop offset="1" stopColor="var(--color-secondary-500)" />
              </linearGradient>
            </defs>
            <path
              fill="url(#tm-quote)"
              d="M7.17 6C4.87 6 3 7.87 3 10.17c0 2.3 1.87 4.16 4.17 4.16.4 0 .78-.06 1.14-.16C7.92 16.1 6.32 17.5 4 18v2.5c4.5-.5 7.5-3.5 7.5-8.83V10.17C11.5 7.87 9.63 6 7.33 6h-.16Zm10 0C14.87 6 13 7.87 13 10.17c0 2.3 1.87 4.16 4.17 4.16.4 0 .78-.06 1.14-.16-.39 1.93-1.99 3.33-4.31 3.83v2.5c4.5-.5 7.5-3.5 7.5-8.83V10.17C21.5 7.87 19.63 6 17.33 6h-.16Z"
            />
          </svg>

          <h2 className="mt-2 text-2xl font-semibold text-black dark:text-white sm:text-3xl lg:mt-4">
            Our journey,{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              built on trust
            </span>
          </h2>

          <div className="mt-4 flex items-end justify-between gap-6 lg:mt-6 lg:block">
            <p className="flex items-baseline gap-2">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-4xl font-bold tabular-nums text-transparent lg:text-5xl">
                <CountUp value={HAPPY_CLIENTS_COUNT} />+
              </span>
              <span className="text-sm font-medium text-black/60 dark:text-white/60">happy clients</span>
            </p>

            <div className="flex items-center gap-2 lg:mt-8">
              <ArrowButton label="Previous testimonials" onClick={() => step(-1)} disabled={progress <= 0.01} flip />
              <span className="relative h-px w-20 bg-black/20 dark:bg-white/25 lg:w-28" aria-hidden="true">
                <span
                  className="absolute -top-px h-[3px] rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  style={{ width: `${MARKER * 100}%`, left: `${progress * (1 - MARKER) * 100}%` }}
                />
              </span>
              <ArrowButton label="Next testimonials" onClick={() => step(1)} disabled={progress >= 0.99} />
            </div>
          </div>
        </div>

        {/* Vertical padding leaves room for the bubbles' shadows inside the clipped scroller. */}
        <div
          ref={trackRef}
          onTouchStart={pause}
          onTouchEnd={resume}
          className="mt-2 flex min-w-0 flex-1 snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 py-6 [scrollbar-width:none] lg:mt-0 lg:scroll-px-2 lg:gap-7 lg:px-2 lg:pr-10 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} className="snap-start lg:w-80" />
          ))}
        </div>
      </div>
    </section>
  )
}
