'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const slidesWrapRef = useRef(null)
  const slideRefs = useRef([])
  const numeralRef = useRef(null)
  const cityRef = useRef(null)
  const shownRef = useRef(null)
  const [index, setIndex] = useState(0)

  // Show only the first service before first paint.
  useLayoutEffect(() => {
    slideRefs.current.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0 }))
    shownRef.current = index
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, [])

  // The track is taller than the screen and the panel inside it is sticky, so the page
  // scrolls while the showcase stays put. How far the track has scrolled picks the service;
  // the position within a step drives a slight drift, each layer at its own speed.
  useEffect(() => {
    const track = trackRef.current
    const panel = panelRef.current
    const reduce = prefersReducedMotion()
    const drift = (el, duration) => gsap.quickTo(el, 'y', { duration, ease: 'power2.out' })
    const moveText = drift(slidesWrapRef.current, 0.5)
    const moveNumeral = drift(numeralRef.current, 0.7)
    const moveCity = drift(cityRef.current, 0.8)

    let frame = 0
    const update = () => {
      frame = 0
      const trackRect = track.getBoundingClientRect()
      const panelRect = panel.getBoundingClientRect()
      const distance = trackRect.height - panelRect.height
      const progress = Math.min(Math.max((panelRect.top - trackRect.top) / distance, 0), 1)
      const next = Math.min(COUNT - 1, Math.floor(progress * COUNT))
      setIndex(next)
      if (reduce) return
      const within = Math.min(progress * COUNT - next, 1)
      moveText((0.5 - within) * 28)
      moveNumeral((0.5 - within) * 110)
      moveCity((0.5 - progress) * 36)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Swap services: the old one leaves in the scroll direction and the new one follows it in.
  useEffect(() => {
    const prev = shownRef.current
    if (prev === null || prev === index) return
    shownRef.current = index
    const slides = slideRefs.current
    const out = slides[prev]
    const next = slides[index]
    const dir = index > prev ? 1 : -1
    gsap.killTweensOf(slides)
    // A jump across several services (a dot or a city pin) can interrupt earlier swaps.
    slides.forEach((el, i) => i !== prev && i !== index && gsap.set(el, { autoAlpha: 0, y: 0 }))
    if (prefersReducedMotion()) {
      gsap.set(out, { autoAlpha: 0, y: 0 })
      gsap.set(next, { autoAlpha: 1, y: 0 })
      return
    }
    gsap.to(out, { autoAlpha: 0, y: -32 * dir, duration: 0.3, ease: 'power2.in' })
    gsap.fromTo(
      next,
      { autoAlpha: 0, y: 44 * dir },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.18 },
    )
    gsap.fromTo(numeralRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', delay: 0.15 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-animate]'), { y: 20, duration: 0.7 })

  const goTo = (slug) => document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <main ref={pageRef} className="relative">
      <section
        ref={trackRef}
        aria-label="Products and services"
        className="relative"
        style={{ height: `calc(100svh + ${COUNT * STEP_VH}vh)` }}
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
                className="pointer-events-none absolute -left-2 -top-24 hidden select-none bg-gradient-to-b from-primary-500/15 to-secondary-500/0 bg-clip-text text-[13rem] font-semibold leading-none tracking-tighter text-transparent lg:block"
              >
                {pad(index + 1)}
              </span>

              <h1 className="relative text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 sm:text-sm">
                Products &amp; Services
              </h1>

              {/* All services share one grid cell so the block is as tall as the longest one. */}
              <div ref={slidesWrapRef} className="relative mt-4 grid lg:mt-6">
                {SERVICES.map((service, i) => (
                  <article
                    key={service.slug}
                    ref={(el) => (slideRefs.current[i] = el)}
                    inert={i !== index}
                    className="[grid-area:1/1]"
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
                      onClick={() => goTo(service.slug)}
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
                ref={cityRef}
                className="w-full [--city-dim:0.35] [--city-focus-scale:1.45] [--city-pin-dim:0.4] [--reserve:495px] lg:[--reserve:230px]"
                style={{ maxWidth: 'max(220px, calc((100svh - var(--reserve)) * 1.357))' }}
              >
                <KroldCity highlight={[SERVICES[index].slug]} />
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
