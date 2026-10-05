'use client'

import { useEffect, useRef, useState } from 'react'
import Link from './Link'
import { gsap } from 'gsap'
import CalculatorPanel from './calculators/CalculatorPanel'
import { FEATURED_CALCULATORS } from './calculators/configs'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

// Phone layout for the tabs, on a 6-column grid: up to three share one row; more than that
// split over two rows as evenly as possible (five tabs → three, then two).
function tabSpan(index, count) {
  const firstRow = count > 3 ? Math.ceil(count / 2) : count
  const inRow = index < firstRow ? firstRow : count - firstRow
  return inRow === 3 ? 'col-span-2' : inRow === 2 ? 'col-span-3' : 'col-span-6'
}

function ExploreLink({ className = '' }) {
  return (
    <Link
      href="/calculators"
      className={`group items-center gap-2 font-semibold text-primary-700 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-primary-300 ${className}`}
    >
      Explore more calculators
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

// `asPage` renders the full calculators page (h1, no "Explore more" link) instead of the home section.
// The home section is laid out to fit one desktop screen below the navbar.
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

  // The highlight sits behind the active tab. On narrow screens the tabs wrap onto a
  // second row, so it tracks the tab's row and height as well as its position.
  useEffect(() => {
    const tab = tabRefs.current[activeIndex]
    const indicator = indicatorRef.current
    if (!tab || !indicator) return
    const place = () => ({ x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight })

    if (isFirstIndicatorRun.current) {
      gsap.set(indicator, place())
      isFirstIndicatorRun.current = false
    } else {
      gsap.to(indicator, { ...place(), duration: 0.45, ease: 'power3.out' })
    }

    // Keep it on the tab when the row layout changes (rotation, resize).
    const ro = new ResizeObserver(() => gsap.set(indicator, place()))
    ro.observe(tab.parentElement)
    return () => ro.disconnect()
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
    <section id="calculators" ref={sectionRef} className={`relative ${asPage ? 'pb-20 pt-12 lg:pt-16' : 'scroll-mt-[73px] py-10 lg:py-4'}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div data-animate className={`mx-auto text-center ${asPage ? 'max-w-2xl' : 'max-w-2xl lg:max-w-none'}`}>
          <Heading className={`font-semibold text-black dark:text-white ${asPage ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>
            Turn your goals into a{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              financial plan
            </span>
          </Heading>
          <p className={`text-black/60 dark:text-white/60 ${asPage ? 'mt-3' : 'mt-3 lg:mt-2 lg:text-sm'}`}>
            Interactive calculators that help you understand your investments, model potential outcomes and plan with
            greater clarity.
          </p>
        </div>

        <div data-animate className={`relative flex items-center justify-center ${asPage ? 'mt-10' : 'mt-10 lg:mt-4'}`}>
          {/* On phones the tabs sit in balanced full-width rows (see tabSpan) instead of scrolling sideways. */}
          <div className="relative grid w-full max-w-md grid-cols-6 gap-1 rounded-[1.75rem] border border-primary-100 dark:border-white/10 bg-primary-50/60 dark:bg-white/5 p-1.5 sm:inline-flex sm:w-auto sm:max-w-none sm:rounded-full">
            <span
              ref={indicatorRef}
              className="absolute left-0 top-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md"
              style={{ width: 0, height: 0 }}
            />
            {CALCULATORS.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-2 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-6 ${tabSpan(i, CALCULATORS.length)} ${
                  activeId === c.id
                    ? 'text-white'
                    : 'text-black/60 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {!asPage && <ExploreLink className="absolute right-0 hidden text-sm hover:text-primary-600 lg:inline-flex" />}
        </div>

        <div
          data-animate
          ref={panelRef}
          className={`rounded-[2rem] border border-primary-100/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] p-6 backdrop-blur-sm ${
            asPage ? 'mt-12 sm:p-10' : 'mt-12 sm:p-10 lg:mt-4 lg:px-8 lg:py-5'
          }`}
        >
          <CalculatorPanel
            config={activeConfig}
            values={valuesById[activeId]}
            onFieldChange={handleFieldChange}
            compact={!asPage}
          />
        </div>

        <div className={`flex flex-col items-center gap-6 ${asPage ? 'mt-8' : 'mt-8 lg:mt-3'}`}>
          {!asPage && (
            <ExploreLink className="inline-flex rounded-full border border-primary-200 bg-white px-7 py-3 text-[15px] hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white hover:shadow-md hover:shadow-primary-200 dark:border-white/15 dark:bg-transparent dark:hover:text-white dark:hover:shadow-black/40 lg:hidden" />
          )}
          <p className={`text-center text-xs leading-relaxed text-black/45 dark:text-white/45 ${asPage ? 'max-w-2xl' : 'max-w-2xl lg:max-w-4xl'}`}>
            These calculators are for illustration only and use the returns you assume. Actual returns are not
            guaranteed and may vary. Mutual fund investments are subject to market risks; read all scheme-related
            documents carefully.
          </p>
        </div>
      </div>
    </section>
  )
}
