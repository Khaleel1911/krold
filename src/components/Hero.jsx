import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from './hero/AnimatedBackground'
import KroldCity from './hero/city/KroldCity'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { label: 'Assets Under Advisory', value: '₹500Cr+' },
  { label: 'Families Served', value: '1,200+' },
  { label: 'Years of Trust', value: '12+' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const stageWrapRef = useRef(null)

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to(stageWrapRef.current, { yPercent: 10, scale: 0.96, ease: 'none', scrollTrigger })
      gsap.to(textRef.current, { yPercent: 30, opacity: 0.35, ease: 'none', scrollTrigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden py-16 lg:min-h-[85vh]"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6 lg:px-10">
        {/* Text column */}
        <div ref={textRef}>
          <h1 className="text-4xl font-semibold leading-[1.1] text-black dark:text-white sm:text-5xl lg:text-[3.4rem]">
            One place for every part of your{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              wealth
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60 dark:text-white/60 sm:text-lg">
            From your first SIP to guaranteed retirement income — mutual funds, insurance, bonds, PMS and
            more, planned together by one trusted team.
          </p>

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

        {/* Service city */}
        <div ref={stageWrapRef}>
          <KroldCity />
          <p className="mt-1 text-center text-xs text-black/45 dark:text-white/45">
            <span className="hidden sm:inline">Hover</span>
            <span className="sm:hidden">Tap</span> a building to explore what we do
          </p>
        </div>
      </div>
    </section>
  )
}
