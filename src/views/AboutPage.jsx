'use client'

import { useEffect, useRef } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import { GrowthRings, RingMark } from '../components/about/Rings'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import founderPhoto from '../assets/owner2.png'

// Build → Protect → Grow → Pass Forward is a real sequence, so the steps are numbered,
// and each emblem gains a ring as wealth matures.
const STEPS = [
  {
    title: 'Build',
    text: 'Create a strong financial foundation through disciplined saving, investing and goal-based planning.',
  },
  {
    title: 'Protect',
    text: 'Safeguard your family, assets and accumulated wealth against the uncertainties life can bring.',
  },
  {
    title: 'Grow',
    text: 'Put your wealth to work through carefully considered investment strategies designed around your goals and risk profile.',
  },
  {
    title: 'Pass Forward',
    text: 'Build a financial foundation that can support not just your ambitions, but the generations that follow.',
  },
]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Eyebrow({ children, className = '' }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${className}`}>{children}</p>
}

// Icons for the vision and mission cards. Their motion is CSS (`vm-*` in index.css).
const emblemIcon = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-14 w-14',
  'aria-hidden': true,
}

// Vision: an eye looking far ahead. It glances side to side and blinks now and then.
function VisionIcon() {
  return (
    <svg {...emblemIcon}>
      <path className="vm-ray" d="M24 3.5v3.5M10.5 7.5l2 3M37.5 7.5l-2 3" />
      <g className="vm-blink">
        <path d="M4 25s7.5-12 20-12 20 12 20 12-7.5 12-20 12S4 25 4 25Z" />
        <g className="vm-look">
          <circle cx="24" cy="25" r="6" />
          <circle cx="24" cy="25" r="1.8" fill="currentColor" stroke="none" />
        </g>
      </g>
    </svg>
  )
}

// Mission: a clear target to work toward. An arrow lands in the centre, over and over.
function MissionIcon() {
  return (
    <svg {...emblemIcon}>
      <circle className="vm-ring" cx="21" cy="27" r="17" />
      <circle cx="21" cy="27" r="10" />
      <circle className="vm-hit" cx="21" cy="27" r="3" fill="currentColor" stroke="none" />
      <path className="vm-arrow" d="M21 27 41 7M41 7h-6M41 7v6" />
    </svg>
  )
}

// One card of the vision / mission pair. `tone` picks the brand colour it leans on.
const TONES = {
  primary: {
    card: 'ring-primary-100 hover:shadow-primary-200/50',
    glow: 'bg-primary-200/60 dark:bg-primary-500/15',
    icon: 'text-primary-600 dark:text-primary-400',
    label: 'text-primary-700 dark:text-primary-300',
  },
  secondary: {
    card: 'ring-secondary-100 hover:shadow-secondary-200/50',
    glow: 'bg-secondary-200/60 dark:bg-secondary-500/15',
    icon: 'text-secondary-600 dark:text-secondary-400',
    label: 'text-secondary-700 dark:text-secondary-400',
  },
}

function StatementCard({ tone, label, icon, title, children }) {
  const t = TONES[tone]
  return (
    <article
      data-reveal
      className={`relative min-w-0 overflow-hidden rounded-[2rem] bg-white p-8 ring-1 transition-shadow duration-300 hover:shadow-2xl dark:bg-white/[0.03] dark:ring-white/10 dark:hover:shadow-black/40 sm:p-10 ${t.card}`}
    >
      <div className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${t.glow}`} />
      <div className="relative">
        <div className="flex items-center gap-4">
          <span className={`inline-flex shrink-0 ${t.icon}`}>{icon}</span>
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${t.label}`}>{label}</p>
        </div>
        <h2 className="mt-7 text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-balance text-black dark:text-white sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-black/65 dark:text-white/65">{children}</p>
      </div>
    </article>
  )
}

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AboutPage() {
  const pageRef = useRef(null)
  const heroTextRef = useRef(null)
  const stepLineRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current.children, { opacity: 0, y: 26, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7 })
  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-step]'), { y: 30, duration: 0.7, stagger: 0.14 })

  // The thread joining the four steps draws across once they come into view.
  useEffect(() => {
    const line = stepLineRef.current
    if (!line || prefersReducedMotion()) return
    gsap.set(line, { scaleX: 0 })
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(line, { scaleX: 1, duration: 1.6, ease: 'power2.inOut', delay: 0.2 })
        io.disconnect()
      },
      { threshold: 0.3 },
    )
    io.observe(line.parentElement)
    return () => io.disconnect()
  }, [])

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      {/* On desktop the hero fills the screen below the 73px navbar. */}
      <section className="relative lg:flex lg:min-h-[calc(100svh-73px)] lg:items-center">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 text-black/[0.035] dark:text-white/[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:py-8">
          <div ref={heroTextRef} className="min-w-0">
            <Eyebrow className="text-primary-600 dark:text-primary-400">Building wealth that lasts</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-5xl lg:text-[clamp(2.6rem,7svh,3.5rem)]">
              For your family today.
              <span className="mt-1 block bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text pb-2 text-transparent">
                For generations to come.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/65 dark:text-white/65">
              At KROLD MFINS, we believe true wealth is more than what you accumulate. It is what you{' '}
              <span className="font-semibold text-black/85 dark:text-white/90">protect, grow and pass forward.</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/about#approach"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40"
              >
                Our approach
              </Link>
              <Link
                href="/about#founder"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-black/75 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:text-white/75 dark:hover:text-primary-400"
              >
                Meet the founder
                <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Rings shrink with the screen height so the whole hero stays in view. */}
          <div className="mx-auto w-full min-w-0 max-w-[460px] px-2 sm:px-6 lg:max-w-[min(540px,calc(100svh-170px))] lg:px-0">
            <GrowthRings />
          </div>
        </div>
      </section>

      {/* ─── Philosophy ───────────────────────────────────────── */}
      <section className="border-t border-black/5 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10 lg:py-16">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow className="text-primary-600 dark:text-primary-400">Our philosophy</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance text-black dark:text-white sm:text-4xl">
              We don’t just manage wealth.{' '}
              <span className="text-primary-600 dark:text-primary-400">We help build its future.</span>
            </h2>
          </div>

          <div data-reveal className="min-w-0 max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-black/65 dark:text-white/65">
            <p className="text-xl font-semibold leading-snug text-black/85 dark:text-white/85">
              Every family’s financial journey is different.
            </p>
            <p>
              Some are building their first significant corpus. Others are protecting what generations before them
              created. And many are thinking about what they will leave behind.
            </p>
            <p>
              Our approach is built around understanding where you are today, where you want to go and what you want
              your wealth to achieve — not just for you, but for the people who come after you.
            </p>
            <p>
              From investments and insurance to wealth management and evolving investment opportunities, we bring
              together solutions designed to help you build, protect and grow your wealth with purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Approach ─────────────────────────────────────────── */}
      <section id="approach" className="scroll-mt-20 px-3 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0b1826] text-white ring-1 ring-white/5 lg:rounded-[2.5rem]">
          <RingMark
            count={4}
            from="var(--color-primary-500)"
            to="var(--color-secondary-500)"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07]"
          />

          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div data-reveal className="max-w-2xl">
              <Eyebrow className="text-primary-300">The KROLD MFINS approach</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Build. Protect. <span className="text-secondary-400">Grow.</span>
              </h2>
            </div>

            <div className="relative mt-10 lg:mt-12">
              {/* Thread through the emblem centres (desktop only). */}
              <div className="pointer-events-none absolute left-12 right-12 top-12 hidden h-px lg:block">
                <div className="h-full w-full bg-white/10" />
                <div
                  ref={stepLineRef}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400"
                />
              </div>

              <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {STEPS.map((step, i) => (
                  <li key={step.title} data-step className="relative min-w-0">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#0b1826] text-white">
                      <RingMark count={i + 1} className="h-24 w-24" />
                    </div>
                    <p className="mt-5 text-xs font-semibold tabular-nums tracking-[0.2em] text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/65">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founder ──────────────────────────────────────────── */}
      <section id="founder" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-10 lg:py-16">
          <div data-reveal className="relative mx-auto w-full max-w-[420px]">
            <div className="relative aspect-square">
              <RingMark
                count={3}
                max={3}
                from="var(--color-primary-300)"
                to="var(--color-secondary-300)"
                className="absolute -inset-[14%] h-[128%] w-[128%] opacity-60 motion-safe:animate-[spin_90s_linear_infinite] dark:opacity-40"
              />
              {/* The gradient shows through the padding as a thin ring around the photo. */}
              <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-[3px] shadow-2xl shadow-primary-200/60 dark:shadow-black/50">
                <img
                  src={founderPhoto.src}
                  alt="Amit Kumar Mahansaria, founder of KROLD MFINS"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 left-0 flex items-center gap-3 rounded-2xl border border-primary-100 bg-white px-4 py-3 shadow-lg shadow-primary-100/60 dark:border-white/10 dark:bg-neutral-900 dark:shadow-black/40 sm:-left-4">
              <span className="text-4xl font-bold leading-none text-primary-600 dark:text-primary-400">25+</span>
              <span className="text-xs font-medium leading-snug text-black/60 dark:text-white/60">
                years in wealth
                <br />
                management
              </span>
            </div>
          </div>

          <div data-reveal className="min-w-0">
            <Eyebrow className="text-primary-600 dark:text-primary-400">Meet the founder</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance text-black dark:text-white sm:text-4xl">
              A philosophy built on{' '}
              <span className="text-primary-600 dark:text-primary-400">patience, discipline</span> and{' '}
              <span className="text-primary-600 dark:text-primary-400">trust</span>
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-xl font-semibold text-black dark:text-white">Amit Kumar Mahansaria</p>
              <div className="flex gap-1.5">
                {['CFA', 'CPM'].map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-primary-200 px-2 py-0.5 text-[11px] font-bold tracking-[0.12em] text-primary-700 dark:border-primary-400/30 dark:text-primary-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 max-w-[62ch] space-y-4 text-[17px] leading-relaxed text-black/65 dark:text-white/65">
              <p>
                With over 25 years of experience in wealth management and mutual fund distribution, Amit Kumar
                Mahansaria has helped families navigate changing markets, evolving financial goals and different stages
                of life.
              </p>
              <blockquote className="border-l-2 border-secondary-500 py-1 pl-6">
                <p className="text-xl font-semibold leading-snug text-black/85 dark:text-white/85">
                  His approach is rooted in a simple belief: wealth creation is a long-term journey.
                </p>
                <p className="mt-3">
                  It requires discipline, informed decision-making and the patience to stay focused on what truly
                  matters.
                </p>
              </blockquote>
              <p>
                At KROLD MFINS, this philosophy extends beyond building wealth for today. The aim is to help families
                create a financial foundation that can continue to serve them and the generations that follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─────────────────────────────────── */}
      <section className="px-5 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <StatementCard
            tone="primary"
            label="Our vision"
            icon={<VisionIcon />}
            title={
              <>
                To become a{' '}
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  trusted financial partner
                </span>{' '}
                across generations.
              </>
            }
          >
            To help families make informed financial decisions, build lasting wealth and create a stronger financial
            foundation for the future.
          </StatementCard>

          <StatementCard
            tone="secondary"
            label="Our mission"
            icon={<MissionIcon />}
            title={
              <>
                To make{' '}
                <span className="bg-gradient-to-r from-secondary-600 to-primary-500 bg-clip-text text-transparent">
                  disciplined saving, informed investing and thoughtful financial planning
                </span>{' '}
                a part of every family’s journey.
              </>
            }
          >
            Helping them build, protect and grow wealth for today and for generations to come.
          </StatementCard>
        </div>
      </section>

      {/* ─── Closing ──────────────────────────────────────────── */}
      <section className="px-3 py-12 sm:px-5 lg:py-16">
        <div
          data-reveal
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 px-6 py-10 text-white sm:px-12 lg:rounded-[2.5rem] lg:px-16 lg:py-14 dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
        >
          <RingMark
            count={4}
            from="#ffffff"
            to="#ffffff"
            className="pointer-events-none absolute -bottom-48 -right-32 h-[560px] w-[560px] opacity-[0.12]"
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
              Your wealth journey is longer than today.
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Let’s build something that lasts
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Whether you’re starting your investment journey, protecting what you’ve built or planning the financial
              future of your family, we’re here to help you take the next step with clarity and confidence.
            </p>
            <Link
              href="/#contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-primary-700 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a Conversation
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
