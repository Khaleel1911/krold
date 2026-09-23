import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from './hero/AnimatedBackground'
import { GrowthArt, ShieldArt, PlanningArt } from './hero/HeroArt'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  {
    eyebrow: 'Wealth that compounds',
    highlight: 'Grow',
    rest: 'your wealth with precision',
    description:
      'Data-driven portfolio strategies engineered to outpace inflation and compound steadily over time.',
    Art: GrowthArt,
  },
  {
    eyebrow: 'Capital, protected',
    highlight: 'Secure',
    rest: 'what you’ve built, at every step',
    description:
      'Risk-managed, compliance-first strategies that safeguard your capital across every market cycle.',
    Art: ShieldArt,
  },
  {
    eyebrow: 'Plan with clarity',
    highlight: 'Smarter',
    rest: 'planning, powered by insight',
    description:
      'Interactive calculators and personalised allocation models that turn your goals into an executable plan.',
    Art: PlanningArt,
  },
]

const AUTO_ADVANCE_MS = 6000

const STATS = [
  { label: 'Assets Under Advisory', value: '₹500Cr+' },
  { label: 'Families Served', value: '1,200+' },
  { label: 'Years of Trust', value: '12+' },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const stageWrapRef = useRef(null)
  const contentRowRef = useRef(null)
  const progressRefs = useRef([])
  const progressTweenRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const reduceMotionRef = useRef(false)
  const touchStartX = useRef(null)

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Entrance animation
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
      gsap.from(stageWrapRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.25,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Scroll-tied parallax depth
  useEffect(() => {
    if (reduceMotionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(stageWrapRef.current, {
        yPercent: 16,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.to(textRef.current, {
        yPercent: 30,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Simple crossfade — fade the whole content row out, swap the slide, fade back in.
  const goToSlide = (index) => {
    const nextIndex = ((index % SLIDES.length) + SLIDES.length) % SLIDES.length
    if (nextIndex === active || isTransitioningRef.current) return
    isTransitioningRef.current = true

    gsap
      .timeline({ onComplete: () => (isTransitioningRef.current = false) })
      .to(contentRowRef.current, { opacity: 0, duration: 0.35, ease: 'power2.inOut' })
      .call(() => setActive(nextIndex))
      .to(contentRowRef.current, { opacity: 1, duration: 0.35, ease: 'power2.inOut' })
  }

  // Auto-advance progress bar
  useEffect(() => {
    progressTweenRef.current?.kill()
    progressRefs.current.forEach((bar) => bar && gsap.set(bar, { scaleX: 0 }))

    const bar = progressRefs.current[active]
    if (bar) {
      progressTweenRef.current = gsap.to(bar, {
        scaleX: 1,
        duration: AUTO_ADVANCE_MS / 1000,
        ease: 'none',
        transformOrigin: 'left',
        onComplete: () => goToSlide(active + 1),
      })
    }
    return () => progressTweenRef.current?.kill()
  }, [active])

  const pauseAutoplay = () => progressTweenRef.current?.pause()
  const resumeAutoplay = () => progressTweenRef.current?.resume()

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goToSlide(active + 1)
    if (e.key === 'ArrowLeft') goToSlide(active - 1)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) goToSlide(active + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  const slide = SLIDES[active]
  const ActiveArt = slide.Art

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden py-16 lg:min-h-[85vh]"
    >
      <AnimatedBackground />

      <div
        ref={contentRowRef}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10 lg:px-10"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Company highlights"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onFocus={pauseAutoplay}
        onBlur={resumeAutoplay}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Text column */}
        <div ref={textRef} className="order-2 lg:order-1">
          <span className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Krold Mfins Private Limited
          </span>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary-600 dark:text-secondary-400">
              {slide.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.1] text-black dark:text-white sm:text-5xl lg:text-[3.4rem]">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {slide.highlight}
              </span>{' '}
              {slide.rest}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60 dark:text-white/60 sm:text-lg">
              {slide.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="inline-flex items-center rounded-full border border-primary-200 dark:border-white/15 px-7 py-3 text-[15px] font-semibold text-black/80 dark:text-white/80 transition-all duration-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:-translate-y-0.5"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-black/5 dark:border-white/10 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-semibold text-black dark:text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs text-black/50 dark:text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual stage */}
        <div className="order-1 lg:order-2">
          <div ref={stageWrapRef} className="relative mx-auto max-w-md">
            <div className="relative flex aspect-square items-center justify-center">
              <div key={active} className="absolute inset-0 flex items-center justify-center">
                <ActiveArt />
              </div>
            </div>

            <span className="sr-only" role="status" aria-live="polite">
              {`Slide ${active + 1} of ${SLIDES.length}: ${slide.eyebrow}`}
            </span>

            {/* Prev / Next */}
            <button
              type="button"
              aria-label="Previous highlight"
              onClick={() => goToSlide(active - 1)}
              className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 dark:bg-black/40 text-primary-600 dark:text-primary-400 shadow-md backdrop-blur transition-transform duration-300 hover:scale-110 sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next highlight"
              onClick={() => goToSlide(active + 1)}
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 dark:bg-black/40 text-primary-600 dark:text-primary-400 shadow-md backdrop-blur transition-transform duration-300 hover:scale-110 sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Progress dots */}
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.eyebrow}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                aria-current={i === active}
                onClick={() => goToSlide(i)}
                className="h-1.5 flex-1 max-w-[64px] overflow-hidden rounded-full bg-primary-100 dark:bg-white/10"
              >
                <span
                  ref={(el) => (progressRefs.current[i] = el)}
                  className="block h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
