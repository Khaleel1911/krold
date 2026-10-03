import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import CalculatorPanel from './calculators/CalculatorPanel'
import { FEATURED_CALCULATORS } from './calculators/configs'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

// `asPage` renders the full calculators page (h1, no "Explore more" link) instead of the home section.
export default function Calculators({ calculators: CALCULATORS = FEATURED_CALCULATORS, asPage = false }) {
  const [activeId, setActiveId] = useState(CALCULATORS[0].id)
  const [valuesById, setValuesById] = useState(() =>
    Object.fromEntries(CALCULATORS.map((c) => [c.id, { ...c.defaults }])),
  )
  const Heading = asPage ? 'h1' : 'h2'

  const sectionRef = useRef(null)
  const tabRefs = useRef([])
  const indicatorRef = useRef(null)
  const panelRef = useRef(null)
  const isFirstIndicatorRun = useRef(true)
  const isFirstPanelRun = useRef(true)

  const activeIndex = CALCULATORS.findIndex((c) => c.id === activeId)
  const activeConfig = CALCULATORS[activeIndex]

  useRevealOnScroll(sectionRef, (root) => root.querySelectorAll('[data-animate]'), {
    y: 30,
    duration: 0.7,
    stagger: 0.12,
  })

  useEffect(() => {
    const tab = tabRefs.current[activeIndex]
    if (!tab || !indicatorRef.current) return

    if (isFirstIndicatorRun.current) {
      gsap.set(indicatorRef.current, { x: tab.offsetLeft, width: tab.offsetWidth })
      isFirstIndicatorRun.current = false
      return
    }

    gsap.to(indicatorRef.current, {
      x: tab.offsetLeft,
      width: tab.offsetWidth,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [activeIndex])

  useEffect(() => {
    if (isFirstPanelRun.current) {
      isFirstPanelRun.current = false
      return
    }
    gsap.fromTo(panelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
  }, [activeId])

  const handleFieldChange = (key, value) => {
    setValuesById((prev) => ({
      ...prev,
      [activeId]: { ...prev[activeId], [key]: value },
    }))
  }

  return (
    <section id="calculators" ref={sectionRef} className={`relative ${asPage ? 'pb-20 pt-12 lg:pt-16' : 'py-10 lg:py-14'}`}>
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <Heading className={`font-semibold text-black dark:text-white ${asPage ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
            Turn your goals into a{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              financial plan
            </span>
          </Heading>
          <p className="mt-3 text-black/60 dark:text-white/60">
            Interactive calculators that help you understand your investments, model potential outcomes and plan with
            greater clarity.
          </p>
        </div>

        <div data-animate className="mx-auto mt-10 flex max-w-full justify-center overflow-x-auto">
          <div className="relative inline-flex items-center gap-1 rounded-full border border-primary-100 dark:border-white/10 bg-primary-50/60 dark:bg-white/5 p-1.5">
            <span
              ref={indicatorRef}
              className="absolute left-0 top-1.5 h-[calc(100%-0.75rem)] rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md"
              style={{ width: 0 }}
            />
            {CALCULATORS.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  activeId === c.id
                    ? 'text-white'
                    : 'text-black/60 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div
          data-animate
          ref={panelRef}
          className="mt-12 rounded-[2rem] border border-primary-100/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] p-6 backdrop-blur-sm sm:p-10"
        >
          <CalculatorPanel config={activeConfig} values={valuesById[activeId]} onFieldChange={handleFieldChange} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          {!asPage && (
            <Link
              to="/calculators"
              className="group inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-7 py-3 text-[15px] font-semibold text-primary-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white hover:shadow-md hover:shadow-primary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:border-white/15 dark:bg-transparent dark:text-primary-300 dark:hover:text-white dark:hover:shadow-black/40"
            >
              Explore more calculators
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
          <p className="max-w-2xl text-center text-xs leading-relaxed text-black/45 dark:text-white/45">
            These calculators are for illustration only and use the returns you assume. Actual returns are not
            guaranteed and may vary. Mutual fund investments are subject to market risks; read all scheme-related
            documents carefully.
          </p>
        </div>
      </div>
    </section>
  )
}
