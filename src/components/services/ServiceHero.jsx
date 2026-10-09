'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from '../Link'
import ServiceIcon from '../icons/ServiceIcons'
import { SipChart } from './MutualFundsCard'
import { Shelter } from './InsuranceCard'
import { Minimums, Skyline } from './PmsAifCard'
import { AssetGrid } from './GeneralInsuranceCard'
import { PayoutRing } from './AnnuityCard'
import { Seal, BOND_TYPES } from './BondsCard'
import { MarketPanel } from './StockBrokingCard'
import { Seedling } from './UnlistedSharesCard'
import { RealAssets } from './ReitsInvitsCard'

function Pills({ items, className = '' }) {
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <li key={item} className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

const LIGHT_PILL =
  'bg-white text-primary-700 ring-1 ring-primary-100 dark:bg-white/5 dark:text-primary-300 dark:ring-white/10'

// Text colours for a panel that is light (and follows the theme) or dark in both themes.
const ON_LIGHT = {
  title: 'text-black dark:text-white',
  text: 'text-black/65 dark:text-white/65',
  back: 'text-black/60 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400',
  outline: 'focus-visible:outline-primary-500',
}
const ON_DARK = {
  title: 'text-white',
  text: 'text-white/75',
  back: 'text-white/70 hover:text-white',
  outline: 'focus-visible:outline-white',
}
const BRAND_CTA =
  'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-primary-200 hover:shadow-secondary-200 dark:shadow-black/40'

// Each service's hero wears the look of its card in the home page's services section,
// and shows the same graphic at full size.
const HEROES = {
  'mutual-funds': {
    ...ON_DARK,
    panel:
      'bg-gradient-to-br from-primary-500 via-primary-500 to-secondary-500 dark:from-primary-600 dark:via-primary-600 dark:to-secondary-600',
    eyebrow: 'text-white/85',
    badge: 'bg-white/15 text-white ring-1 ring-white/30',
    cta: 'bg-white text-primary-700 shadow-black/10',
    art: (
      <div className="flex min-h-[300px] flex-col rounded-3xl bg-white/10 p-6 ring-1 ring-white/25 sm:p-7">
        <Pills
          items={['SIP', 'Lumpsum', 'Equity', 'Debt', 'Hybrid', 'ELSS']}
          className="bg-white/15 text-white ring-1 ring-white/25"
        />
        <SipChart className="mt-12" />
      </div>
    ),
  },
  insurance: {
    ...ON_LIGHT,
    panel: 'bg-primary-50 ring-1 ring-primary-100 dark:bg-primary-500/10 dark:ring-primary-400/20',
    eyebrow: 'text-primary-600 dark:text-primary-400',
    badge: 'bg-primary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30',
    cta: BRAND_CTA,
    art: (
      <div className="flex flex-col items-center gap-5">
        <Shelter className="h-56 w-full sm:h-64" />
        <Pills items={['Life', 'Health', 'Critical illness']} className={LIGHT_PILL} />
      </div>
    ),
  },
  'pms-aif': {
    ...ON_DARK,
    panel: 'bg-gradient-to-br from-[#0b1826] to-[#10263b] ring-1 ring-[#d9b25f]/30',
    eyebrow: 'text-[#e8c97c]',
    badge: 'bg-[#d9b25f]/15 text-[#e8c97c] ring-1 ring-[#d9b25f]/35',
    cta: 'bg-[#d9b25f] text-[#0b1826] shadow-black/30',
    art: (
      <div className="flex flex-col gap-4">
        <Minimums />
        <div className="relative h-56 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:-translate-y-1">
            <Skyline />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1826]/70 via-transparent to-[#0b1826]/60" />
        </div>
      </div>
    ),
  },
  'general-insurance': {
    ...ON_LIGHT,
    panel:
      'bg-gradient-to-r from-primary-50 to-secondary-50 ring-1 ring-primary-100 dark:from-primary-500/10 dark:to-secondary-500/10 dark:ring-primary-400/20',
    eyebrow: 'text-primary-600 dark:text-primary-400',
    badge: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30',
    cta: BRAND_CTA,
    art: <AssetGrid ticked />,
  },
  annuity: {
    ...ON_LIGHT,
    panel:
      'bg-secondary-50 ring-1 ring-secondary-200/70 [--svc-dot-off:var(--color-secondary-200)] [--svc-dot-on:var(--color-secondary-500)] dark:bg-secondary-500/10 dark:ring-secondary-400/20 dark:[--svc-dot-off:rgba(84,186,79,0.25)]',
    eyebrow: 'text-secondary-700 dark:text-secondary-400',
    badge: 'bg-secondary-500 text-white shadow-md shadow-secondary-200 dark:shadow-black/30',
    cta: BRAND_CTA,
    art: (
      <div className="flex flex-col items-center gap-4">
        <PayoutRing className="h-56 w-56 sm:h-64 sm:w-64" />
        <p className="text-sm font-semibold text-secondary-700 dark:text-secondary-400">Guaranteed income for life</p>
      </div>
    ),
  },
  bonds: {
    ...ON_LIGHT,
    panel: 'bg-[#fbf5e6] ring-1 ring-amber-700/15 dark:bg-[#231f14] dark:ring-amber-200/15',
    eyebrow: 'text-amber-800 dark:text-amber-300',
    badge: 'bg-amber-700/10 text-amber-800 ring-1 ring-amber-700/20 dark:bg-amber-200/10 dark:text-amber-200 dark:ring-amber-200/20',
    cta: BRAND_CTA,
    art: (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-amber-700/30 px-6 py-9 dark:border-amber-200/20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-800/70 dark:text-amber-200/60">
          Certificate
        </p>
        <Seal className="h-32 w-[6.5rem]" />
        <p className="text-sm font-medium text-amber-900/70 dark:text-amber-100/60">Fixed coupon · Capital first</p>
        <Pills
          items={BOND_TYPES}
          className="bg-amber-700/10 text-amber-900/80 dark:bg-amber-200/10 dark:text-amber-100/80"
        />
      </div>
    ),
  },
  'stock-broking': {
    ...ON_DARK,
    panel: 'bg-[#0b1622] ring-1 ring-white/10',
    eyebrow: 'text-[#6fd66a]',
    badge: 'bg-[#6fd66a]/15 text-[#6fd66a] ring-1 ring-[#6fd66a]/30',
    cta: 'bg-[#6fd66a] text-[#0b1622] shadow-black/30',
    art: <MarketPanel className="min-h-[300px]" />,
  },
  'unlisted-shares': {
    ...ON_DARK,
    panel: 'svc-blueprint bg-[#0f3a55] dark:bg-[#0b2a3e]',
    eyebrow: 'text-secondary-300',
    badge: 'bg-white/10 text-secondary-300 ring-1 ring-white/20',
    cta: 'bg-white text-[#0f3a55] shadow-black/20',
    art: (
      <div className="relative flex min-h-[280px] flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-white/30 p-8">
        <span className="absolute right-6 top-6 -rotate-6 rounded-md border-2 border-secondary-300 px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-secondary-300 transition-transform duration-300 group-hover:-rotate-12">
          PRE-IPO
        </span>
        <Seedling className="h-36 w-36" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Growing before the listing</p>
      </div>
    ),
  },
  'reits-invits': {
    ...ON_LIGHT,
    panel:
      'bg-gradient-to-br from-primary-50 to-secondary-50/60 ring-1 ring-primary-100 dark:from-primary-500/10 dark:to-transparent dark:ring-white/10',
    eyebrow: 'text-primary-600 dark:text-primary-400',
    badge: 'bg-white text-primary-600 ring-1 ring-primary-100 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-400/25',
    cta: BRAND_CTA,
    art: (
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white px-6 py-9 ring-1 ring-primary-100 dark:bg-white/[0.04] dark:ring-white/10">
        <RealAssets className="h-44 w-52" />
        <Pills items={['Real estate', 'Infrastructure', 'Quarterly income']} className={LIGHT_PILL} />
      </div>
    ),
  },
}

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServiceHero({ service, hero }) {
  const look = HEROES[service.slug]
  const rootRef = useRef(null)
  const textRef = useRef(null)
  const artRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
      gsap.from(artRef.current, { opacity: 0, y: 32, duration: 0.9, ease: 'power3.out', delay: 0.35 })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="px-3 pt-3 sm:px-5">
      <div className={`relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] ${look.panel}`}>
        <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-16 lg:py-14">
          <div className="min-w-0">
            <Link
              href={`/services#${service.slug}`}
              className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${look.back} ${look.outline}`}
            >
              <Arrow className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              All services
            </Link>

            <div ref={textRef} className="mt-7">
              <div className="flex items-center gap-3.5">
                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${look.badge}`}>
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${look.eyebrow}`}>{service.title}</p>
              </div>

              <h1 className={`mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl ${look.title}`}>
                {hero.title}
              </h1>
              <p className={`mt-5 max-w-xl text-lg leading-relaxed ${look.text}`}>{hero.text}</p>
              <div className="mt-8">
                <Link
                  href="/#contact"
                  className={`group inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 ${look.cta} ${look.outline}`}
                >
                  {hero.cta}
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* `svc-card` switches on the graphics' hover effects, as on the home page cards. */}
          <div ref={artRef} className="svc-card group mx-auto w-full min-w-0 max-w-md lg:max-w-none">
            {look.art}
          </div>
        </div>
      </div>
    </section>
  )
}
