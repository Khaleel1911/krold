'use client'

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import AnimatedBackground from '../components/hero/AnimatedBackground'
import KroldCity from '../components/hero/city/KroldCity'
import ServiceIcon from '../components/icons/ServiceIcons'
import { SERVICES } from '../data/services'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

// Scroll distance given to each service while the showcase stays pinned.
const STEP_VH = 70
const COUNT = SERVICES.length
// How long the glide from one service to the next takes, and how long after the text
// changes the city spotlights the new service's building (ms).
const STEP_SECONDS = 0.7
const CITY_DELAY = 260
// A service starts fading this far from the middle of its step (its step ends at 0.5).
const FADE_FROM = 0.3
// Pixels a service's text drifts per step of scroll, the extra it travels while fading
// out, and the drift of the big numeral behind it.
const DRIFT = 36
const EXIT = 40
const NUMERAL_DRIFT = 90
// Memoised so the city only re-renders when the highlighted service changes.
const City = memo(KroldCity)
const pad = (n) => String(n).padStart(2, '0')

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesPage() {
  const pageRef = useRef(null)
  const trackRef = useRef(null)
  const panelRef = useRef(null)
  const textRef = useRef(null)
  const slideRefs = useRef([])
  const numeralRef = useRef(null)
  const stepToRef = useRef(null)
  const [index, setIndex] = useState(0)
  // The city follows the text a beat later, so its (paint-heavy) spotlight change never
  // lands in the middle of the scroll between two services.
  const [spot, setSpot] = useState(0)
  const highlight = useMemo(() => [SERVICES[spot].slug], [spot])

  useEffect(() => {
    const timer = setTimeout(() => setSpot(index), CITY_DELAY)
    return () => clearTimeout(timer)
  }, [index])

  // The track is taller than the screen and the panel inside it is sticky, so the page
  // scrolls while the showcase stays put. Everything is positioned straight from how far
  // the track has scrolled: each service drifts up through its step and fades out as the
  // next one fades in. While the panel is pinned, a swipe, wheel flick or arrow key doesn't
  // scroll freely; it glides the page to the next service's stop, one service per gesture.
  // A layout effect, so only the first service is showing at first paint.
  useLayoutEffect(() => {
    const track = trackRef.current
    const panel = panelRef.current
    const numeral = numeralRef.current
    const reduce = prefersReducedMotion()

    // Where the pinned stretch starts, how long it is, and how far through it the page is
    // (0 to COUNT, each service owning one unit).
    const measure = () => {
      const trackRect = track.getBoundingClientRect()
      const distance = trackRect.height - panel.offsetHeight
      const start = window.scrollY + trackRect.top - (parseFloat(getComputedStyle(panel).top) || 0)
      const travelled = window.scrollY - start
      return {
        start,
        distance,
        position: (Math.min(Math.max(travelled, 0), distance) / distance) * COUNT,
        pinned: travelled >= -1 && travelled <= distance + 1,
      }
    }

    let frame = 0
    const update = () => {
      frame = 0
      const { position } = measure()
      const next = Math.min(COUNT - 1, Math.floor(position))
      setIndex(next)

      slideRefs.current.forEach((el, i) => {
        // How far the scroll is from the middle of this service's step: ±0.5 at its edges.
        // The first and last services have nothing to hand over to, so they hold still there.
        let offset = position - (i + 0.5)
        if (i === 0) offset = Math.max(offset, 0)
        if (i === COUNT - 1) offset = Math.min(offset, 0)
        const away = Math.abs(offset)
        const leaving = Math.min(Math.max((away - FADE_FROM) / (0.5 - FADE_FROM), 0), 1)
        const opacity = reduce ? Number(i === next) : 1 - leaving
        el.style.opacity = opacity
        el.style.visibility = opacity ? 'visible' : 'hidden'
        if (reduce) return
        el.style.transform = `translate3d(0, ${-Math.sign(offset) * (away * DRIFT + leaving * EXIT)}px, 0)`
        if (i === next) {
          numeral.style.opacity = opacity
          numeral.style.transform = `translate3d(0, ${-offset * NUMERAL_DRIFT}px, 0)`
        }
      })
    }

    // Each service rests in the middle of its step; the first rests at the very top.
    let tween = null
    const stepTo = (i) => {
      const { start, distance, position } = measure()
      const top = start + (i === 0 ? 0 : ((i + 0.5) / COUNT) * distance)
      tween?.kill()
      if (reduce) {
        window.scrollTo(0, top)
        return
      }
      const state = { y: window.scrollY }
      const steps = Math.abs(i + 0.5 - position)
      tween = gsap.to(state, {
        y: top,
        duration: Math.min(STEP_SECONDS + Math.max(steps - 1, 0) * 0.12, 1.4),
        ease: 'power2.inOut',
        // Drawn here rather than on the scroll event, so the text never trails the page by a frame.
        onUpdate: () => {
          window.scrollTo(0, state.y)
          update()
        },
        onComplete: () => (tween = null),
      })
    }
    stepToRef.current = stepTo

    // The service a gesture in this direction leads to, or -1 when the page should scroll
    // on freely: the panel isn't pinned, or there is no service left that way.
    const neighbour = (direction) => {
      const { position, pinned } = measure()
      if (!pinned) return -1
      const at = Math.min(Math.max(position, 0.5), COUNT - 0.5) - 0.5
      const i = direction > 0 ? Math.floor(at + 0.01) + 1 : Math.ceil(at - 0.01) - 1
      return i >= 0 && i < COUNT ? i : -1
    }

    // After a free scroll (scrollbar, a link to one service) comes to rest between two stops.
    let settleTimer = 0
    let touch = null
    const settle = () => {
      if (tween || touch || reduce) return
      const { position, pinned } = measure()
      if (!pinned || position <= 0.5 || position >= COUNT - 0.5) return
      const nearest = Math.round(position - 0.5)
      if (Math.abs(position - 0.5 - nearest) > 0.02) stepTo(nearest)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, 140)
    }

    // A touchpad keeps sending ever-smaller wheel events after the fingers lift. Only a
    // pause, a harder push, or the steady clicks of a mouse wheel count as a new gesture,
    // so that tail can't carry the page on past the next service.
    let lastWheel = { time: 0, size: 0, held: false }
    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || !e.deltaY) return
      const size = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 40 : 1)
      const fresh =
        e.timeStamp - lastWheel.time > 160 ||
        size > lastWheel.size * 1.3 + 2 ||
        (lastWheel.held && size === lastWheel.size && size >= 50)
      const target = tween ? -1 : neighbour(Math.sign(e.deltaY))
      const held = Boolean(tween) || target >= 0
      lastWheel = { time: e.timeStamp, size, held }
      if (!held) return
      e.preventDefault()
      if (fresh && target >= 0) stepTo(target)
    }

    // A touch gesture is either ours or the browser's from its first move: once native
    // scrolling has begun it can no longer be cancelled.
    const onTouchStart = (e) => {
      touch = e.touches.length === 1 ? { y: e.touches[0].clientY, mode: null, stepped: false } : null
    }
    const onTouchMove = (e) => {
      if (!touch || e.touches.length !== 1) return
      const moved = touch.y - e.touches[0].clientY
      if (!moved) return
      if (!touch.mode) touch.mode = tween || neighbour(Math.sign(moved)) >= 0 ? 'held' : 'free'
      if (touch.mode === 'free') return
      if (e.cancelable) e.preventDefault()
      if (touch.stepped || tween || Math.abs(moved) < 12) return
      const target = neighbour(Math.sign(moved))
      if (target < 0) return
      touch.stepped = true
      stepTo(target)
    }
    const onTouchEnd = () => {
      touch = null
      onScroll()
    }

    const onKey = (e) => {
      const direction = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }[e.key]
      if (!direction || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return
      const target = tween ? -1 : neighbour(direction)
      if (!tween && target < 0) return
      e.preventDefault()
      if (target >= 0) stepTo(target)
    }

    // Arriving at /services#<slug> (say, back from that service's page): start on that
    // service, city included, rather than on the first one.
    if (SERVICES.some((service) => `#${service.slug}` === window.location.hash)) {
      document.getElementById(window.location.hash.slice(1)).scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    update()
    setSpot(Math.min(COUNT - 1, Math.floor(measure().position)))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    if (!reduce) {
      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('touchend', onTouchEnd)
      window.addEventListener('touchcancel', onTouchEnd)
      window.addEventListener('keydown', onKey)
    }
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settleTimer)
      tween?.kill()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.15 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-animate]'), { y: 20, duration: 0.7 })


  return (
    <main ref={pageRef} className="relative">
      <section
        ref={trackRef}
        aria-label="Products and services"
        className="relative [--nav:69px] lg:[--nav:73px]"
        style={{ height: `calc(100svh - var(--nav) + ${COUNT * STEP_VH}vh)` }}
      >
        {/* Scroll targets for /services#<slug> links, the dots and the city pins: one per step. */}
        {SERVICES.map((service, i) => (
          <span
            key={service.slug}
            id={service.slug}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 h-px w-px scroll-mt-[69px] lg:scroll-mt-[73px]"
            style={{ top: `${(i + 0.5) * STEP_VH}vh` }}
          />
        ))}

        {/* Pinned below the navbar (69px on mobile, 73px on desktop). */}
        <div
          ref={panelRef}
          className="sticky top-[69px] flex h-[calc(100svh-69px)] items-center overflow-hidden lg:top-[73px] lg:h-[calc(100svh-73px)]"
        >
          {/* One backdrop under both halves, so the text side flows into the city side. */}
          <AnimatedBackground />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_62%_55%,var(--color-primary-50),transparent_70%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_62%_55%,rgba(54,161,218,0.08),transparent_70%)]" />

          <div className="relative mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_1fr] items-center gap-2 px-5 py-6 lg:grid-cols-[0.8fr_1.2fr] lg:grid-rows-1 lg:gap-0 lg:px-10 lg:py-8">
            {/* Service text */}
            <div ref={textRef} className="relative min-w-0 lg:pr-6">
              <span
                ref={numeralRef}
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-24 hidden select-none will-change-[transform,opacity] bg-gradient-to-b from-primary-500/15 to-secondary-500/0 bg-clip-text text-[13rem] font-semibold leading-none tracking-tighter text-transparent lg:block"
              >
                {pad(index + 1)}
              </span>

              <h1 className="relative text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 sm:text-sm">
                Products &amp; Services
              </h1>

              {/* All services share one grid cell so the block is as tall as the longest one. */}
              <div className="relative mt-4 grid lg:mt-6">
                {SERVICES.map((service, i) => (
                  <article
                    key={service.slug}
                    ref={(el) => (slideRefs.current[i] = el)}
                    inert={i !== index}
                    className="will-change-[transform,opacity] [grid-area:1/1]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30 lg:h-14 lg:w-14">
                        <ServiceIcon name={service.icon} className="h-5 w-5 lg:h-7 lg:w-7" />
                      </span>
                      <p className="text-sm font-semibold tabular-nums text-black/40 dark:text-white/40">
                        <span className="text-black/80 dark:text-white/85">{pad(i + 1)}</span> / {pad(COUNT)}
                      </p>
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-4xl lg:mt-6 lg:text-5xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-black/60 dark:text-white/60 sm:text-lg lg:mt-4">
                      {service.short}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`Learn more about ${service.title}`}
                      // So the browser's Back button returns to this service, not the top of the list.
                      onClick={() => window.history.replaceState(null, '', `#${service.slug}`)}
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-2.5 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40 dark:hover:shadow-black/50 lg:mt-7 lg:px-7 lg:py-3"
                    >
                      Learn more
                      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </article>
                ))}
              </div>

              <ol className="relative mt-5 flex items-center gap-1.5 lg:mt-9" aria-label="Services">
                {SERVICES.map((service, i) => (
                  <li key={service.slug}>
                    <button
                      type="button"
                      aria-label={`Show ${service.title}`}
                      aria-current={i === index}
                      onClick={() => stepToRef.current?.(i)}
                      className="group flex h-6 items-center"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          i === index
                            ? 'w-8 bg-gradient-to-r from-primary-500 to-secondary-500'
                            : 'w-1.5 bg-black/15 group-hover:bg-black/30 dark:bg-white/20 dark:group-hover:bg-white/40'
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Service city: sized from the screen height, leaving headroom for the enlarged building and its pin. */}
            <div className="flex min-h-0 min-w-0 items-end justify-center self-stretch lg:items-center">
              <div
                className="w-full [--city-dim:0.35] [--city-focus-scale:1.45] [--city-pin-dim:0.4] [--reserve:495px] lg:[--reserve:230px]"
                style={{ maxWidth: 'max(220px, calc((100svh - var(--reserve)) * 1.357))' }}
              >
                <City highlight={highlight} />
              </div>
            </div>
          </div>

          <p
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-4 hidden items-center justify-center gap-2 text-xs font-medium text-black/45 transition-opacity duration-500 dark:text-white/45 lg:flex ${
              index === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex h-7 w-4 justify-center rounded-full border border-current pt-1.5">
              <span className="h-1.5 w-0.5 rounded-full bg-current motion-safe:animate-bounce" />
            </span>
            Scroll to explore our services
          </p>
        </div>
      </section>

      <div data-animate className="mx-auto max-w-2xl px-5 py-24 text-center lg:px-10">
        <h3 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
          Not sure where to start?
        </h3>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Talk to us and we&rsquo;ll help you find the right mix for your goals.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5"
        >
          Get in Touch
        </Link>
      </div>
    </main>
  )
}
