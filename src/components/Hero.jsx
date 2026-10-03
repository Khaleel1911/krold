import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from './hero/AnimatedBackground'
import KroldCity from './hero/city/KroldCity'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { label: 'Assets Under Management', value: '₹300Cr+' },
  { label: 'Families Served', value: '200+' },
  { label: 'Years of Trust', value: '10+' },
]

// Rotating hero messages. `spotlight` lists the city buildings to highlight alongside each one.
const SLIDES = [
  {
    eyebrow: 'Invest beyond the ordinary',
    lead: 'Discover what’s next,',
    highlight: 'before you’re left behind',
    description:
      'Access emerging investment opportunities across REITs, SIFs, PMS, AIFs, ETFs and more — with guidance designed around your goals and risk profile.',
    spotlight: ['pms-aif', 'stock-broking', 'unlisted-shares', 'reits-invits'],
  },
  {
    eyebrow: 'Wealth, built with purpose',
    lead: 'Invest with clarity,',
    highlight: 'grow with precision',
    description:
      'Personalised wealth management and mutual fund strategies aligned with your goals, risk and long-term ambitions.',
    spotlight: ['mutual-funds'],
  },
  {
    eyebrow: 'Protection that matters',
    lead: 'Protect today.',
    highlight: 'Prepare for tomorrow.',
    description:
      'Life, health and general insurance solutions tailored to protect your family, business and assets.',
    spotlight: ['insurance', 'general-insurance', 'annuity'],
  },
]

const SLIDE_MS = 6000

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const stageWrapRef = useRef(null)
  const slideRefs = useRef([])
  const shownRef = useRef(null)
  const [index, setIndex] = useState(() => Math.floor(Math.random() * SLIDES.length))
  const [paused, setPaused] = useState(false)

  // Show only the starting slide before first paint.
  useLayoutEffect(() => {
    slideRefs.current.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0 }))
    shownRef.current = index
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, [])

  // Cross-fade between slides.
  useEffect(() => {
    const prev = shownRef.current
    if (prev === null || prev === index) return
    shownRef.current = index
    const out = slideRefs.current[prev]
    const next = slideRefs.current[index]
    gsap.killTweensOf([out, next])
    if (prefersReducedMotion()) {
      gsap.set(out, { autoAlpha: 0, y: 0 })
      gsap.set(next, { autoAlpha: 1, y: 0 })
      return
    }
    gsap.to(out, { autoAlpha: 0, y: -12, duration: 0.35, ease: 'power2.in' })
    gsap.fromTo(
      next,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.25 },
    )
  }, [index])

  // Auto-advance; restarts whenever the slide changes so a dot click gets a full interval.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [index, paused])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Scroll-tied parallax depth
  useEffect(() => {
    if (prefersReducedMotion()) return
    // Scope to the element, not the ref: React clears the ref before this cleanup runs,
    // and killing the triggers refreshes ScrollTrigger against the scope.
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to(stageWrapRef.current, { yPercent: 10, scale: 0.96, ease: 'none', scrollTrigger })
      gsap.to(textRef.current, { yPercent: 30, opacity: 0.35, ease: 'none', scrollTrigger })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden py-10 lg:min-h-[85vh] lg:py-12"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6 lg:px-10">
        {/* Text column */}
        <div ref={textRef}>
          {/* All slides share one grid cell so the block is as tall as the longest one and nothing below shifts. */}
          <div
            className="grid"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.eyebrow}
                ref={(el) => (slideRefs.current[i] = el)}
                aria-hidden={i !== index}
                className="[grid-area:1/1]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 sm:text-sm">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-[1.1] text-black dark:text-white sm:text-5xl lg:text-[2.6rem]">
                  {slide.lead}{' '}
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    {slide.highlight}
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-black/60 dark:text-white/60 sm:text-lg">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.eyebrow}
                type="button"
                aria-label={`Show message ${i + 1}: ${slide.eyebrow}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
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
            ))}
          </div>

          {/* Hovering "Explore Services" hands it the filled look and turns "Get Started" plain. */}
          <div className="group/cta mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="relative inline-flex items-center overflow-hidden rounded-full border border-transparent bg-white px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 dark:bg-transparent dark:shadow-black/40 group-has-[.cta-swap:hover]/cta:border-primary-200 group-has-[.cta-swap:hover]/cta:text-black/80 group-has-[.cta-swap:hover]/cta:shadow-none dark:group-has-[.cta-swap:hover]/cta:border-white/15 dark:group-has-[.cta-swap:hover]/cta:text-white/80"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 transition-opacity duration-300 group-has-[.cta-swap:hover]/cta:opacity-0" />
              <span className="relative">Get Started</span>
            </a>
            <a
              href="#services"
              className="cta-swap group/explore relative inline-flex items-center overflow-hidden rounded-full border border-primary-200 bg-white px-7 py-3 text-[15px] font-semibold text-black/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:shadow-md hover:shadow-primary-200 active:translate-y-0 dark:border-white/15 dark:bg-transparent dark:text-white/80 dark:hover:border-transparent dark:hover:text-white dark:hover:shadow-black/40"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 transition-opacity duration-300 group-hover/explore:opacity-100" />
              <span className="relative">Explore Services</span>
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-black/5 dark:border-white/10 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-semibold text-black dark:text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service city */}
        <div ref={stageWrapRef}>
          <KroldCity highlight={SLIDES[index].spotlight} />
          <p className="mt-1 text-center text-xs text-black/45 dark:text-white/45">
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Tap</span> a building to explore what we do
          </p>
        </div>
      </div>
    </section>
  )
}
