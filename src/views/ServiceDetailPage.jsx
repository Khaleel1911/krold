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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
      gsap.from(heroRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.1 })
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

        <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 lg:px-10 lg:pb-20 lg:pt-14">
          <Link
            href={`/services#${slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-white/60 dark:hover:text-primary-400"
          >
            <Arrow className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            All services
          </Link>

          <div ref={heroRef} className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </span>
                <Eyebrow>Products &amp; Services</Eyebrow>
              </div>

              <h1 className="mt-6 font-display text-[2.75rem] font-normal leading-[1.04] tracking-[-0.015em] text-balance text-black dark:text-white sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl font-display text-2xl leading-snug text-black/80 dark:text-white/85">
                {service.short}
              </p>
              <Link
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40"
              >
                Talk to us
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className={`${CARD} min-w-0 space-y-5 p-7 text-[17px] leading-[1.8] text-black/65 dark:text-white/65 sm:p-9`}>
              {detail.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sections ─────────────────────────────────────────── */}
      {detail.sections.map((section) => (
        <section key={section.heading} className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-20">
            <div data-reveal className="max-w-3xl">
              <h2 className="font-display text-4xl font-normal leading-[1.12] text-balance text-black dark:text-white sm:text-5xl">
                {section.heading}
              </h2>
              {section.text ? (
                <p className="mt-5 text-[17px] leading-[1.8] text-black/65 dark:text-white/65">{section.text}</p>
              ) : null}
            </div>

            {section.items.length > 0 && (
              <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${section.items.length > 2 ? 'lg:grid-cols-3' : ''}`}>
                {section.items.map((item) => (
                  <article key={item.title} data-reveal className={`${CARD} min-w-0 p-7`}>
                    <h3 className="text-xl font-semibold leading-snug text-black dark:text-white">{item.title}</h3>
                    {item.text ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{item.text}</p>
                    ) : null}
                    {item.points ? (
                      <ul className="mt-4 grid gap-2.5">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70">
                            <Check />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ─── Closing ──────────────────────────────────────────── */}
      <section className="px-3 pb-6 pt-4 sm:px-5">
        <div
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 px-6 py-14 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-20 dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-normal leading-[1.08] text-balance sm:text-5xl">
              Not sure where to start?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Talk to us and we&rsquo;ll help you find the right mix for your goals.
            </p>
            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-primary-700 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in Touch
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Other services ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-10 lg:py-20">
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
