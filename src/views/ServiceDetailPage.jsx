'use client'

import { useEffect, useRef } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import ServiceIcon from '../components/icons/ServiceIcons'
import { CARD, Eyebrow } from '../components/nri/parts'
import { SERVICES, getServiceBySlug } from '../data/services'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-1 h-4 w-4 shrink-0 text-secondary-500" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 data-reveal className="font-display text-4xl font-normal leading-[1.12] text-balance text-black dark:text-white sm:text-5xl">
      {children}
    </h2>
  )
}

// Two or four cards sit two to a row; anything else goes three to a row.
function Cards({ items, className = '' }) {
  const pairs = items.length === 2 || items.length === 4
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${pairs ? '' : 'lg:grid-cols-3'} ${className}`}>
      {items.map((item) => (
        <article key={item.title} data-reveal className={`${CARD} min-w-0 p-7`}>
          <h3 className="text-xl font-semibold leading-snug text-black dark:text-white">{item.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{item.text}</p>
        </article>
      ))}
    </div>
  )
}

function Steps({ steps }) {
  return (
    <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} data-reveal className={`${CARD} min-w-0 p-6`}>
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text font-display text-4xl tabular-nums text-transparent">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-3 text-lg font-semibold leading-snug text-black dark:text-white">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}

function Faqs({ heading, faqs }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <SectionTitle>{heading}</SectionTitle>
      <div data-reveal className="min-w-0 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
        {faqs.map((faq, i) => (
          <details key={faq.q} open={i === 0} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[17px] font-semibold text-black transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-white dark:hover:text-primary-400 [&::-webkit-details-marker]:hidden">
              {faq.q}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 h-5 w-5 shrink-0 text-primary-500 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="max-w-[62ch] pb-6 text-[15px] leading-[1.75] text-black/70 dark:text-white/70">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}

// Renders whichever kinds of content a section has (see src/data/serviceDetails.js).
function Section({ section }) {
  if (section.faqs) return <Faqs heading={section.heading} faqs={section.faqs} />
  return (
    <>
      <div className="max-w-3xl">
        <SectionTitle>{section.heading}</SectionTitle>
        {section.text?.map((paragraph) => (
          <p key={paragraph} data-reveal className="mt-5 text-[17px] leading-[1.8] text-black/65 dark:text-white/65">
            {paragraph}
          </p>
        ))}
        {section.points ? (
          <ul data-reveal className="mt-5 grid gap-3">
            {section.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[17px] leading-relaxed text-black/70 dark:text-white/70">
                <Check />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {section.steps ? <Steps steps={section.steps} /> : null}
      {section.items ? <Cards items={section.items} className="mt-7" /> : null}
      {section.groups?.map((group) => (
        <div key={group.title} className="mt-7">
          <h3 data-reveal className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
            {group.title}
          </h3>
          <Cards items={group.items} className="mt-4" />
        </div>
      ))}
      {section.note ? (
        <p data-reveal className="mt-8 text-[17px] font-medium text-black/75 dark:text-white/75">{section.note}</p>
      ) : null}
    </>
  )
}

export default function ServiceDetailPage({ slug }) {
  const service = getServiceBySlug(slug)
  const detail = SERVICE_DETAILS[slug]
  const others = SERVICES.filter((s) => s.slug !== slug)
  const pageRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7, threshold: 0.08 })

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 text-black/[0.035] dark:text-white/[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />

        <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 lg:px-10 lg:pb-12 lg:pt-10">
          <Link
            href={`/services#${slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-white/60 dark:hover:text-primary-400"
          >
            <Arrow className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            All services
          </Link>

          <div ref={heroRef} className="mt-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>
              <Eyebrow>{service.title}</Eyebrow>
            </div>

            <h1 className="mt-6 font-display text-[2.5rem] font-normal leading-[1.06] tracking-[-0.015em] text-balance text-black dark:text-white sm:text-6xl">
              {detail.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/65 dark:text-white/65 sm:text-xl">
              {detail.hero.text}
            </p>
            <div className="mt-8">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40"
              >
                {detail.hero.cta}
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sections ─────────────────────────────────────────── */}
      {detail.sections.map((section) => (
        <section key={section.heading} className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-10 lg:px-10 lg:py-12">
            <Section section={section} />
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────────── */}
      <section className="px-3 pb-6 pt-4 sm:px-5">
        <div
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 px-6 py-10 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-14 dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-normal leading-[1.08] text-balance sm:text-5xl">
              {detail.closing.title}
            </h2>
            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-primary-700 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {detail.closing.cta ?? 'Get in Touch'}
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Other services ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-10 lg:py-12">
        <div data-reveal>
          <Eyebrow>Explore more</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-black/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:border-white/15 dark:bg-transparent dark:text-white/75 dark:hover:border-primary-400 dark:hover:text-primary-300"
                >
                  <ServiceIcon name={other.icon} className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
