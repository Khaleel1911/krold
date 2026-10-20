'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from '../components/Link'
import { CARD, Eyebrow } from '../components/nri/parts'
import { RingMark } from '../components/about/Rings'
import { ChangeBars, ChartCard, ColumnChart, SensexLine, StackedShare } from '../components/why-india/Charts'
import GetInTouch from '../components/GetInTouch'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import {
  AGE_GROUPS,
  AS_OF,
  CONCLUSION,
  DIVERSIFICATION,
  DOLLAR_TERMS,
  GDP_GROWTH,
  INDICES,
  INTRO,
  MAKE_IN_INDIA,
  PEOPLE_STATS,
  SENSEX,
  STABILITY,
  UPI,
} from '../data/whyIndia'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const H2 = 'mt-4 text-3xl font-semibold leading-tight text-balance text-black dark:text-white sm:text-4xl'
const BODY = 'text-[17px] leading-relaxed text-black/65 dark:text-white/65'
const STRONG = 'font-semibold text-black/85 dark:text-white/90'

const SECTIONS = [
  ['economy', 'Economy'],
  ['people', 'People'],
  ['digital', 'Digital'],
  ['make-in-india', 'Make in India'],
  ['institutions', 'Institutions'],
  ['markets', 'Markets'],
  ['global', 'Global view'],
  ['portfolio', 'Portfolio'],
]
const num = (id) => String(SECTIONS.findIndex(([key]) => key === id) + 1).padStart(2, '0')
const tag = (id) => `${num(id)} · ${SECTIONS.find(([key]) => key === id)[1]}`

function Arrow({ className = '', flip = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${className} ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionHead({ id, title, children, light = false }) {
  return (
    <div data-reveal className="max-w-3xl">
      <Eyebrow className={light ? 'text-primary-300' : undefined}>{tag(id)}</Eyebrow>
      <h2 className={light ? 'mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl' : H2}>{title}</h2>
      {children}
    </div>
  )
}

export default function WhyIndiaPage() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7, threshold: 0.08 })

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative border-b border-black/5 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 text-black/[0.035] dark:text-white/[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div ref={heroRef} className="mx-auto max-w-6xl px-5 pb-14 pt-10 lg:px-10 lg:pb-20 lg:pt-16">
          <Link
            href="/nri"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-white/60 dark:hover:text-primary-400"
          >
            <Arrow flip className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to NRI services
          </Link>
          <Eyebrow className="mt-8 text-primary-600 dark:text-primary-400">Why India</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-5xl lg:text-[3.5rem]">
            The case for investing{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text pb-2 text-transparent">back home</span>
          </h1>
          <p className={`mt-6 max-w-3xl ${BODY}`}>{INTRO}</p>
          <nav aria-label="On this page" className="mt-9">
            <ul className="flex flex-wrap gap-2">
              {SECTIONS.map(([id, label], i) => (
                <li key={id}>
                  <Link
                    href={`/nri/why-invest-in-india#${id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-white/70 px-4 py-2 text-sm font-semibold text-black/65 transition-colors hover:border-primary-300 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-white/10 dark:bg-transparent dark:text-white/65 dark:hover:text-primary-400"
                  >
                    <span className="tabular-nums text-black/35 dark:text-white/35">{String(i + 1).padStart(2, '0')}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ─── 01 Economy ───────────────────────────────────────── */}
      <section id="economy" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-10 lg:py-24">
          <SectionHead id="economy" title="Robust Economic Growth">
            <div className={`mt-5 space-y-4 ${BODY}`}>
              <p>
                India’s economy grew an estimated <strong className={STRONG}>7.8% in FY 2025-26</strong>. In its October
                2026 World Economic Outlook, the IMF raised India’s 2026 forecast to <strong className={STRONG}>7.0%</strong>,
                0.6 percentage points above its July estimate, citing resilient domestic demand and strong services
                activity.
              </p>
              <p>
                That is more than twice the projected world growth rate of 3.1%, even as the global economy contends with
                a Middle East conflict and higher energy prices. India now accounts for about 8.2% of world GDP.
              </p>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-black/45 dark:text-white/45">Sources: {GDP_GROWTH.textSource}</p>
          </SectionHead>
          <ChartCard title={GDP_GROWTH.title} source={GDP_GROWTH.source}>
            <ColumnChart bars={GDP_GROWTH.bars} />
          </ChartCard>
        </div>
      </section>

      {/* ─── 02 People ────────────────────────────────────────── */}
      <section id="people" className="scroll-mt-20 border-t border-black/5 bg-primary-50/40 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-24">
          <SectionHead id="people" title="Demographic Dividend">
            <p className={`mt-5 ${BODY}`}>
              India has the world’s largest population and one of its youngest workforces. About{' '}
              <strong className={STRONG}>58% of Indians are under 35</strong>, and the working-age share is still rising.
              The Economic Survey estimates India must create nearly{' '}
              <strong className={STRONG}>7.85 million non-farm jobs every year until 2030</strong> to absorb its growing
              workforce: a large, expanding pool of talent and consumers.
            </p>
          </SectionHead>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PEOPLE_STATS.map((s) => (
              <div key={s.label} data-reveal className={`${CARD} bg-white p-6 dark:bg-white/[0.03]`}>
                <dd className="text-3xl font-semibold leading-none text-primary-600 dark:text-primary-400">{s.value}</dd>
                <dt className="mt-3 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{s.label}</dt>
              </div>
            ))}
          </dl>

          <ChartCard title={AGE_GROUPS.title} source={AGE_GROUPS.source} className="mt-5">
            <StackedShare groups={AGE_GROUPS.groups} />
          </ChartCard>
        </div>
      </section>

      {/* ─── 03 Digital ───────────────────────────────────────── */}
      <section id="digital" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-10 lg:py-24">
          <SectionHead id="digital" title="Digital Transformation: the UPI Revolution">
            <p className={`mt-5 ${BODY}`}>
              The Unified Payments Interface (UPI) has made India the world leader in real-time digital payments. In ten
              years, annual UPI transactions grew almost <strong className={STRONG}>13,000-fold</strong>, from 1.78 crore in
              FY 2016-17 to more than <strong className={STRONG}>24,162 crore in FY 2025-26</strong>, worth about{' '}
              <strong className={STRONG}>₹314 lakh crore</strong>. UPI handled nearly{' '}
              <strong className={STRONG}>49% of all real-time payment transactions worldwide</strong> in 2025.
            </p>
          </SectionHead>
          <ChartCard title={UPI.title} source={UPI.source}>
            <ColumnChart bars={UPI.bars} />
          </ChartCard>
        </div>
      </section>

      {/* ─── 04 Make in India ─────────────────────────────────── */}
      <section id="make-in-india" className="scroll-mt-20 px-3 pb-20 sm:px-5 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0b1826] text-white ring-1 ring-white/5 lg:rounded-[2.5rem]">
          <RingMark
            count={4}
            from="var(--color-primary-500)"
            to="var(--color-secondary-500)"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07]"
          />
          <div className="relative px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
            <SectionHead id="make-in-india" title="From importer to manufacturing hub" light>
              <p className="mt-5 text-[17px] leading-relaxed text-white/65">
                Launched in September 2014 and backed since 2020 by Production Linked Incentive (PLI) schemes across 14
                sectors, Make in India has transformed electronics and defence manufacturing. India is now the world’s
                second-largest mobile phone maker, and mobile phones have become its largest export item.
              </p>
            </SectionHead>

            {/* Phones: one row per sector */}
            <ul data-reveal className="mt-10 divide-y divide-white/10 border-y border-white/10 md:hidden">
              {MAKE_IN_INDIA.rows.map((row) => (
                <li key={row.sector} className="py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium text-white/90">{row.sector}</p>
                    <p className="font-semibold tabular-nums text-secondary-400">{row.growth}</p>
                  </div>
                  <p className="mt-1 text-sm tabular-nums text-white/65">
                    {row.from} <span className="text-white/40">(FY 2014-15)</span> → {row.to}{' '}
                    <span className="text-white/40">(FY 2025-26)</span>
                  </p>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10 hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/15 text-sm font-semibold text-primary-300">
                    <th scope="col" className="py-3 pr-4">Sector</th>
                    <th scope="col" className="px-4 py-3">FY 2014-15</th>
                    <th scope="col" className="px-4 py-3">FY 2025-26</th>
                    <th scope="col" className="py-3 pl-4 text-right">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {MAKE_IN_INDIA.rows.map((row) => (
                    <tr key={row.sector} className="border-b border-white/10 text-[15px]">
                      <th scope="row" className="py-4 pr-4 font-medium text-white/90">{row.sector}</th>
                      <td className="px-4 py-4 tabular-nums text-white/70">{row.from}</td>
                      <td className="px-4 py-4 tabular-nums text-white/85">{row.to}</td>
                      <td className="py-4 pl-4 text-right font-semibold tabular-nums text-secondary-400">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MAKE_IN_INDIA.pli.map((p) => (
                <div key={p.label} data-reveal className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <dd className="text-2xl font-semibold leading-tight text-white">{p.value}</dd>
                  <dt className="mt-2 text-sm leading-snug text-white/65">{p.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-white/45">Sources: {MAKE_IN_INDIA.source}</p>
          </div>
        </div>
      </section>

      {/* ─── 05 Institutions ──────────────────────────────────── */}
      <section id="institutions" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-24">
          <SectionHead id="institutions" title="Stable Political Environment">
            <p className={`mt-5 ${BODY}`}>
              India has been a functioning democracy since independence in 1947, with regular elections, peaceful
              transfers of power, a written constitution and an independent judiciary. Reform policy has shown
              continuity across governments.
            </p>
          </SectionHead>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STABILITY.map((s) => (
              <li key={s.title} data-reveal className={`${CARD} border-t-4 border-t-secondary-500 p-6 dark:border-t-secondary-500`}>
                <h3 className="text-lg font-semibold text-black dark:text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 06 Markets ───────────────────────────────────────── */}
      <section id="markets" className="scroll-mt-20 border-t border-black/5 bg-primary-50/40 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-24">
          <SectionHead id="markets" title="Financial Stock Market Performance">
            <p className={`mt-5 ${BODY}`}>
              Over the long run, Indian equities have compounded at double-digit rates. The Sensex rose from 3,972 at the
              end of 2000 to 85,221 at the end of 2025. Markets are volatile, though: 2026 has been a difficult year,
              with the Sensex down about 14% from its 2025 close as of mid-October, amid foreign investor outflows,
              higher energy prices and global uncertainty.
            </p>
          </SectionHead>
          <ChartCard title={SENSEX.title} className="mt-10">
            <SensexLine points={SENSEX.points} latest={SENSEX.latest} />
          </ChartCard>
        </div>
      </section>

      {/* ─── 07 Global view ───────────────────────────────────── */}
      <section id="global" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-24">
          <SectionHead id="global" title={INDICES.title}>
            <p className={`mt-5 ${BODY}`}>{INDICES.subtitle}.</p>
          </SectionHead>
          <div data-reveal className={`${CARD} mt-10 bg-white p-6 dark:bg-white/[0.03] sm:p-8`}>
            <ChangeBars rows={INDICES.rows} />
          </div>
          <div data-reveal className="mt-5 space-y-2 text-xs leading-relaxed text-black/50 dark:text-white/50">
            <p className="text-sm text-black/60 dark:text-white/60">{INDICES.note}</p>
            <p>{INDICES.levels}</p>
          </div>
          <aside
            data-reveal
            className="mt-8 rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-7 ring-1 ring-primary-100 dark:from-primary-500/10 dark:to-secondary-500/10 dark:ring-white/10 sm:p-9"
          >
            <h3 className="text-xl font-semibold text-black dark:text-white">In US-dollar terms</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-black/70 dark:text-white/70">{DOLLAR_TERMS}</p>
          </aside>
        </div>
      </section>

      {/* ─── 08 Portfolio ─────────────────────────────────────── */}
      <section id="portfolio" className="scroll-mt-20 border-t border-black/5 bg-primary-50/40 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-24">
          <SectionHead id="portfolio" title="Diversification & Risk Management" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIVERSIFICATION.map((d) => (
              <li key={d.title} data-reveal className={`${CARD} bg-white p-6 dark:bg-white/[0.03]`}>
                <h3 className="text-lg font-semibold text-black dark:text-white">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Conclusion ───────────────────────────────────────── */}
      <section className="px-3 py-20 sm:px-5 lg:py-24">
        <div data-reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#0b1826] px-6 py-14 text-white ring-1 ring-white/5 sm:px-12 lg:px-16">
          <RingMark
            count={4}
            from="var(--color-primary-500)"
            to="var(--color-secondary-500)"
            className="pointer-events-none absolute -bottom-48 -left-40 h-[440px] w-[440px] opacity-[0.08]"
          />
          <div className="relative">
            <Eyebrow className="text-primary-300">Conclusion</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl">
              A compelling <span className="text-secondary-400">long-term</span> opportunity
            </h2>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-white/75">{CONCLUSION}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/nri/why-invest-in-india#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Talk to us
              </Link>
              <Link
                href="/nri#guide"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Read the NRI investment guide
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />

      {/* ─── Disclaimer ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 lg:px-10">
        <p className="border-t border-black/10 pt-6 text-xs leading-relaxed text-black/50 dark:border-white/10 dark:text-white/50">
          Krold Mfins Private Limited is an AMFI-registered Mutual Fund Distributor. The figures on this page were
          checked in {AS_OF} and are given for general information only; they are not investment advice. Past
          performance does not guarantee future returns. Mutual fund investments are subject to market risks; read all
          scheme-related documents carefully before investing.
        </p>
      </section>
    </main>
  )
}
