import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import CalculatorPanel from './calculators/CalculatorPanel'
import { calcSIP, calcLumpsum, calcSWP } from './calculators/calculations'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const CALCULATORS = [
  {
    id: 'sip',
    label: 'SIP',
    title: 'SIP Calculator',
    description: 'See how small, regular monthly investments compound into a large corpus over time.',
    fields: [
      { key: 'monthly', label: 'Monthly Investment', min: 500, max: 100000, step: 500, prefix: '₹' },
      { key: 'rate', label: 'Expected Return (p.a.)', min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Time Period', min: 1, max: 40, step: 1, suffix: 'Yr' },
    ],
    defaults: { monthly: 25000, rate: 12, years: 15 },
    compute: (v) => {
      const { invested, total, returns } = calcSIP(v.monthly, v.rate, v.years)
      return {
        centerValue: total,
        centerLabel: 'Total Value',
        segments: [
          { label: 'Invested Amount', value: invested, colorClass: 'primary' },
          { label: 'Est. Returns', value: returns, colorClass: 'secondary' },
        ],
      }
    },
  },
  {
    id: 'lumpsum',
    label: 'Lumpsum',
    title: 'Lumpsum Calculator',
    description: 'Estimate how a one-time investment grows with the power of compounding.',
    fields: [
      { key: 'principal', label: 'Investment Amount', min: 10000, max: 10000000, step: 10000, prefix: '₹' },
      { key: 'rate', label: 'Expected Return (p.a.)', min: 1, max: 30, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Time Period', min: 1, max: 40, step: 1, suffix: 'Yr' },
    ],
    defaults: { principal: 500000, rate: 12, years: 15 },
    compute: (v) => {
      const { invested, total, returns } = calcLumpsum(v.principal, v.rate, v.years)
      return {
        centerValue: total,
        centerLabel: 'Total Value',
        segments: [
          { label: 'Invested Amount', value: invested, colorClass: 'primary' },
          { label: 'Est. Returns', value: returns, colorClass: 'secondary' },
        ],
      }
    },
  },
  {
    id: 'swp',
    label: 'SWP',
    title: 'SWP Calculator',
    description: 'Plan a systematic withdrawal from your corpus and see how long it lasts.',
    fields: [
      { key: 'corpus', label: 'Total Investment', min: 100000, max: 50000000, step: 50000, prefix: '₹' },
      { key: 'withdrawal', label: 'Monthly Withdrawal', min: 1000, max: 500000, step: 1000, prefix: '₹' },
      { key: 'rate', label: 'Expected Return (p.a.)', min: 1, max: 20, step: 0.5, suffix: '%' },
      { key: 'years', label: 'Time Period', min: 1, max: 30, step: 1, suffix: 'Yr' },
    ],
    defaults: { corpus: 2000000, withdrawal: 15000, rate: 8, years: 15 },
    compute: (v) => {
      const { totalWithdrawn, finalBalance, depletedAtMonth } = calcSWP(v.corpus, v.withdrawal, v.rate, v.years)
      return {
        centerValue: finalBalance,
        centerLabel: depletedAtMonth ? 'Depleted early' : 'Final Balance',
        segments: [
          { label: 'Total Withdrawn', value: totalWithdrawn, colorClass: 'primary' },
          { label: 'Final Balance', value: finalBalance, colorClass: 'secondary' },
        ],
        footnote: depletedAtMonth
          ? `Corpus runs out in ~${Math.floor(depletedAtMonth / 12)} yr ${depletedAtMonth % 12} mo`
          : null,
      }
    },
  },
]

export default function Calculators() {
  const [activeId, setActiveId] = useState(CALCULATORS[0].id)
  const [valuesById, setValuesById] = useState(() =>
    Object.fromEntries(CALCULATORS.map((c) => [c.id, { ...c.defaults }])),
  )

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
    <section id="calculators" ref={sectionRef} className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Calculators
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Plan your{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              financial goals
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            Interactive tools to model your investments before you commit — drag the sliders and watch the numbers
            update live.
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
      </div>
    </section>
  )
}
