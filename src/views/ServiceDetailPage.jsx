'use client'

import { useRef } from 'react'
import Link from '../components/Link'
import ServiceIcon from '../components/icons/ServiceIcons'
import ServiceHero from '../components/services/ServiceHero'
import { CARD, Eyebrow } from '../components/nri/parts'
import { SERVICES, getServiceBySlug } from '../data/services'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

// Where a page covers two products, the first is blue and the second green wherever they
// appear side by side (what it is, how you benefit, who it suits).
const TONES = [
  {
    panel: 'border-primary-200 bg-primary-50/70 dark:border-primary-400/25 dark:bg-primary-500/[0.07]',
    head: 'bg-gradient-to-r from-primary-700 to-primary-500',
    label: 'text-primary-700 dark:text-primary-300',
    mark: 'bg-primary-500',
    edge: 'border-l-primary-500 dark:border-l-primary-500',
  },
  {
    panel: 'border-secondary-200 bg-secondary-50/70 dark:border-secondary-400/25 dark:bg-secondary-500/[0.07]',
    head: 'bg-gradient-to-r from-secondary-700 to-secondary-500',
    label: 'text-secondary-700 dark:text-secondary-300',
    mark: 'bg-secondary-500',
    edge: 'border-l-secondary-500 dark:border-l-secondary-500',
  },
]
const BRAND_MARK = 'bg-gradient-to-br from-primary-500 to-secondary-500'

const BODY = 'text-[17px] leading-[1.75] text-black/70 dark:text-white/70'
const SMALL = 'text-[15px] leading-relaxed text-black/65 dark:text-white/65'
const ITEM_TITLE = 'font-semibold leading-snug text-black dark:text-white'

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Tick({ className = BRAND_MARK }) {
  return (
    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5" aria-hidden="true">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function SectionTitle({ children, onDark = false }) {
  return (
    <div data-reveal>
      <span className="block h-1 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
      <h2
        className={`mt-5 text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl ${
          onDark ? 'text-white' : 'text-black dark:text-white'
        }`}
      >
        {children}
      </h2>
    </div>
  )
}

// Heading on the left, content on the right.
function Split({ heading, children }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
      <SectionTitle>{heading}</SectionTitle>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Paragraphs({ text, className = '' }) {
  return text?.map((paragraph, i) => (
    <p key={paragraph} data-reveal className={`${BODY} ${i ? 'mt-4' : ''} ${className}`}>
      {paragraph}
    </p>
  ))
}

// Cards three to a row (two for a set of two or four), with a short last row centred.
function Cards({ items, className = '' }) {
  const width = items.length === 2 || items.length === 4 ? '' : 'lg:w-[calc((100%-2.5rem)/3)]'
  return (
    <div className={`flex flex-wrap justify-center gap-5 ${className}`}>
      {items.map((item) => (
        <article key={item.title} data-reveal className={`${CARD} w-full min-w-0 p-7 sm:w-[calc((100%-1.25rem)/2)] ${width}`}>
          <span className="block h-1 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
          <h3 className={`mt-4 text-xl ${ITEM_TITLE}`}>{item.title}</h3>
          <p className={`mt-3 ${SMALL}`}>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

// One panel per group under its own coloured header, so two products' points never mix.
// A balanced pair sits side by side; anything else stacks, with the items in columns.
function Groups({ groups, className = '' }) {
  const paired = groups.length === 2 && groups.every((group) => group.items.length <= 4)
  return (
    <div className={`grid gap-5 ${paired ? 'lg:grid-cols-2' : ''} ${className}`}>
      {groups.map((group, g) => {
        const tone = TONES[g % TONES.length]
        return (
          <section key={group.title} data-reveal className={`min-w-0 overflow-hidden rounded-3xl border ${tone.panel}`}>
            <h3 className={`px-6 py-4 text-lg font-semibold text-white sm:px-8 sm:text-xl ${tone.head}`}>{group.title}</h3>
            <ul className={`grid gap-x-8 gap-y-6 px-6 py-7 sm:px-8 ${paired ? '' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {group.items.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <Tick className={tone.mark} />
                  <div className="min-w-0">
                    <h4 className={`text-[17px] ${ITEM_TITLE}`}>{item.title}</h4>
                    <p className={`mt-1.5 ${SMALL}`}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

// A flowchart: one box per step with an arrow to the next, running left to right on wide
// screens and top to bottom on narrow ones.
function Flow({ steps }) {
  return (
    <ol className="mt-10 grid gap-9 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          className="relative min-w-0 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm shadow-primary-100/70 dark:border-white/10 dark:bg-neutral-900 dark:shadow-none"
        >
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-semibold tabular-nums text-white ${BRAND_MARK}`}>
              {i + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
              Step {i + 1}
            </span>
          </div>
          <h3 className={`mt-5 text-lg ${ITEM_TITLE}`}>{step.title}</h3>
          <p className={`mt-2 ${SMALL}`}>{step.text}</p>
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-full z-10 mt-1 flex h-7 w-7 -translate-x-1/2 rotate-90 items-center justify-center rounded-full text-white shadow-md shadow-primary-200 dark:shadow-black/40 lg:left-full lg:top-1/2 lg:ml-1 lg:mt-0 lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0 ${BRAND_MARK}`}
            >
              <Arrow className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function Intro({ section }) {
  // Two products: one card each, in the colours they keep for the rest of the page.
  if (section.items) {
    return (
      <>
        <SectionTitle>{section.heading}</SectionTitle>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {section.items.map((item, i) => {
            const tone = TONES[i % TONES.length]
            return (
              <article key={item.title} data-reveal className={`min-w-0 overflow-hidden rounded-3xl border ${tone.panel}`}>
                <h3 className={`px-6 py-4 text-lg font-semibold text-white sm:px-8 sm:text-xl ${tone.head}`}>{item.title}</h3>
                <p className={`px-6 py-7 sm:px-8 ${BODY}`}>{item.text}</p>
              </article>
            )
          })}
        </div>
      </>
    )
  }
  return (
    <Split heading={section.heading}>
      <Paragraphs text={section.text} />
      {section.callout ? (
        <p
          data-reveal
          className="mt-7 rounded-2xl border-l-4 border-l-secondary-500 bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-5 text-lg font-medium leading-relaxed text-black/80 dark:from-primary-500/10 dark:to-secondary-500/10 dark:text-white/85"
        >
          {section.callout}
        </p>
      ) : null}
    </Split>
  )
}

function Benefits({ section }) {
  if (section.groups) {
    return (
      <>
        <SectionTitle>{section.heading}</SectionTitle>
        <Groups groups={section.groups} className="mt-8" />
      </>
    )
  }
  return (
    <Split heading={section.heading}>
      <ul data-reveal className={`${CARD} divide-y divide-primary-100/70 dark:divide-white/10`}>
        {section.items.map((item) => (
          <li key={item.title} className="flex gap-4 px-6 py-5 sm:px-7">
            <Tick />
            <div className="min-w-0">
              <h3 className={`text-[17px] ${ITEM_TITLE}`}>{item.title}</h3>
              <p className={`mt-1.5 ${SMALL}`}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Split>
  )
}

// Who it suits: one card per product (in its colour), or a single card with the checklist.
function Fit({ section }) {
  const single = section.text.length === 1
  return (
    <Split heading={section.heading}>
      <div className="grid gap-4">
        {section.text.map((paragraph, i) => (
          <div
            key={paragraph}
            data-reveal
            className={`rounded-2xl border border-l-4 border-black/5 bg-white px-6 py-5 dark:border-white/10 dark:bg-neutral-900 ${
              TONES[single ? 0 : i % TONES.length].edge
            }`}
          >
            <p className={BODY}>{paragraph}</p>
            {single && section.points ? (
              <ul className="mt-4 grid gap-3">
                {section.points.map((point) => (
                  <li key={point} className={`flex gap-3 ${BODY}`}>
                    <Tick />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Split>
  )
}

function Why({ section }) {
  const { items } = section
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0b1826] to-[#10263b] px-6 py-10 sm:px-10 lg:rounded-[2.5rem] lg:px-16 lg:py-14 dark:ring-1 dark:ring-white/10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-secondary-500/15 blur-3xl" />
      <div className="relative">
        <SectionTitle onDark>{section.heading}</SectionTitle>
        <ol className={`mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {items.map((item, i) => (
            <li key={item.title} data-reveal className="min-w-0 border-t border-white/15 pt-6">
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-sm font-semibold tabular-nums tracking-[0.18em] text-transparent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Faqs({ section }) {
  return (
    <Split heading={section.heading}>
      <div data-reveal className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
        {section.faqs.map((faq, i) => (
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
    </Split>
  )
}

// A section with no layout of its own: whatever content it has, top to bottom.
function Plain({ section }) {
  return (
    <>
      <div className="max-w-3xl">
        <SectionTitle>{section.heading}</SectionTitle>
        {section.text ? (
          <div className="mt-5">
            <Paragraphs text={section.text} />
          </div>
        ) : null}
      </div>
      {section.steps ? <Flow steps={section.steps} /> : null}
      {section.items ? <Cards items={section.items} className="mt-8" /> : null}
      {section.groups ? <Groups groups={section.groups} className="mt-8" /> : null}
      {section.note ? (
        <p data-reveal className="mt-8 text-[17px] font-medium text-black/75 dark:text-white/75">
          {section.note}
        </p>
      ) : null}
    </>
  )
}

const LAYOUTS = { intro: Intro, benefits: Benefits, fit: Fit, why: Why }

// Tinted bands behind some sections, so the page isn't one long white sheet.
const DOTS = { backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }
const bandOf = (section) => {
  if (section.steps) return 'bg-gradient-to-br from-primary-50 via-primary-50/40 to-secondary-50 dark:from-primary-500/[0.07] dark:via-transparent dark:to-secondary-500/[0.07]'
  if (section.kind === 'fit') return 'bg-secondary-50/70 dark:bg-white/[0.03]'
  return ''
}

export default function ServiceDetailPage({ slug }) {
  const service = getServiceBySlug(slug)
  const detail = SERVICE_DETAILS[slug]
  const others = SERVICES.filter((s) => s.slug !== slug)
  const pageRef = useRef(null)

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7, threshold: 0.08 })

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      <ServiceHero service={service} hero={detail.hero} />

      {/* ─── Sections ─────────────────────────────────────────── */}
      {detail.sections.map((section) => {
        const Layout = section.faqs ? Faqs : (LAYOUTS[section.kind] ?? Plain)
        const band = bandOf(section)
        return (
          <section key={section.heading} className={`relative ${band}`}>
            {section.steps ? (
              <div className="pointer-events-none absolute inset-0 text-black/[0.04] dark:text-white/[0.05]" style={DOTS} />
            ) : null}
            <div
              className={`relative mx-auto ${
                section.kind === 'why'
                  ? 'max-w-[82rem] px-3 py-6 sm:px-5'
                  : `max-w-6xl px-5 lg:px-10 ${band ? 'py-14 lg:py-16' : 'py-12 lg:py-14'}`
              }`}
            >
              <Layout section={section} />
            </div>
          </section>
        )
      })}

      {/* ─── Closing ──────────────────────────────────────────── */}
      <section className="px-3 pb-6 pt-4 sm:px-5">
        <div
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 px-6 py-10 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-20 lg:py-14 dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
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
