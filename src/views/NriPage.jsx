'use client'

import { useEffect, useRef } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import HomeArcs from '../components/nri/HomeArcs'
import InvestGuide from '../components/nri/InvestGuide'
import GiftCity from '../components/nri/GiftCity'
import TaxGlance from '../components/nri/TaxGlance'
import NriFaq from '../components/nri/NriFaq'
import { Accent, CARD, Eyebrow, NriIcon, SectionHeading } from '../components/nri/parts'
import Testimonials from '../components/Testimonials'
import GetInTouch from '../components/GetInTouch'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { AS_OF, HERO_ROUTE, HERO_STATS, REASONS } from '../data/nri'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NriPage() {
  const pageRef = useRef(null)
  const heroTextRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  // A low threshold so tall blocks (the accounts table, long cards on mobile) still reveal.
  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7, threshold: 0.08 })

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative lg:flex lg:min-h-[calc(100svh-73px)] lg:items-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 text-black/[0.035] dark:text-white/[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:py-8">
          <div ref={heroTextRef} className="min-w-0">
            <Eyebrow>For Non-Resident Indians</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-5xl lg:text-[clamp(2.6rem,7svh,3.5rem)]">
              Wherever you live,
              <span className="mt-1 block bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text pb-2 text-transparent">
                grow your wealth at home.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/65 dark:text-white/65">
              Investing in India from abroad comes with its own accounts, tax rules and paperwork. We help you{' '}
              <span className="font-semibold text-black/85 dark:text-white/90">invest with clarity</span>, and stay
              compliant on both sides.
            </p>
            <p className="mt-5 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-black/45 dark:text-white/45">
              {HERO_ROUTE.join(' · ')} <span className="text-primary-500">→</span>{' '}
              <span className="text-primary-600 dark:text-primary-400">India</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/nri/why-invest-in-india"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40"
              >
                Why invest in India
              </Link>
              <Link
                href="/nri#guide"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-black/75 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-white/75 dark:hover:text-primary-400"
              >
                Read the NRI guide
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full min-w-0 max-w-[440px] px-2 sm:px-6 lg:max-w-[min(500px,calc(100svh-200px))] lg:px-0">
            <HomeArcs />
          </div>
        </div>
      </section>

      {/* ─── Headline figures, each with where it comes from ──── */}
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <li key={stat.label} data-reveal className={`${CARD} flex flex-col p-6`}>
              <p className="self-start rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-white/10">
                {stat.badge}
              </p>
              <p className="mt-5 text-4xl font-semibold leading-none text-black dark:text-white">{stat.value}</p>
              <p className="mt-3 font-semibold text-black/85 dark:text-white/85">{stat.label}</p>
              <p className="mb-5 mt-1.5 text-sm leading-relaxed text-black/60 dark:text-white/60">{stat.note}</p>
              <p className="mt-auto border-t border-black/5 pt-4 text-xs text-black/45 dark:border-white/10 dark:text-white/45">
                {stat.source}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── Reasons ──────────────────────────────────────────── */}
      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-10">
          <SectionHeading eyebrow="Why NRIs invest in India">
            Four reasons that <Accent>outlast</Accent> any market cycle
          </SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <article key={reason.title} data-reveal className={`${CARD} flex items-start gap-4 p-6`}>
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 ring-1 ring-primary-100 dark:bg-primary-500/10 dark:text-primary-300 dark:ring-white/10">
                  <NriIcon name={reason.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-black dark:text-white">{reason.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{reason.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div data-reveal className="mt-6">
            <Link
              href="/nri/why-invest-in-india"
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary-600 transition-colors hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              See the full case for investing in India
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <InvestGuide />
      <GiftCity />
      <TaxGlance />
      <NriFaq />
      <Testimonials />
      <GetInTouch />

      {/* ─── Disclaimer ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 lg:px-10">
        <p className="border-t border-black/10 pt-6 text-xs leading-relaxed text-black/50 dark:border-white/10 dark:text-white/50">
          Krold Mfins Private Limited is an AMFI-registered Mutual Fund Distributor. The figures, tax rates and rules on
          this page were checked in {AS_OF} and are given for general information only. They are not tax, legal or
          investment advice, and they change with each Budget and regulatory update. Tax outcomes depend on your
          residential status and the treaty between India and your country of residence, so please consult a qualified
          tax adviser before acting. Mutual fund investments are subject to market risks; read all scheme-related
          documents carefully before investing.
        </p>
      </section>
    </main>
  )
}
