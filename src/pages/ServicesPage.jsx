import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import ServiceIcon from '../components/icons/ServiceIcons'
import { SERVICES } from '../data/services'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function ServicesPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-animate]', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.1,
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-service-section]'), {
    y: 30,
    duration: 0.6,
    stagger: 0.08,
    threshold: 0.1,
  })

  return (
    <main ref={pageRef} className="relative pb-24 pt-36 lg:pt-40">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-10">
        <span
          data-animate
          className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400"
        >
          Products &amp; Services
        </span>
        <h1 data-animate className="mt-4 text-3xl font-semibold text-black dark:text-white sm:text-4xl lg:text-5xl">
          Everything you need to{' '}
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            grow and protect
          </span>{' '}
          your wealth
        </h1>
        <p data-animate className="mt-4 text-black/60 dark:text-white/60">
          From your first SIP to a fully managed portfolio — explore every product we offer below.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl space-y-6 px-5 lg:px-10">
        {SERVICES.map((service, i) => (
          <div
            key={service.slug}
            id={service.slug}
            data-service-section
            className="scroll-mt-28 rounded-[2rem] border border-primary-100/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] p-6 sm:p-10"
          >
            <div className={`grid items-start gap-8 lg:grid-cols-[auto_1fr] ${i % 2 ? '' : ''}`}>
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>

              <div>
                <h2 className="text-2xl font-semibold text-black dark:text-white">{service.title}</h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-black/65 dark:text-white/65">
                  {service.description}
                </p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        className="mt-0.5 h-4 w-4 shrink-0 text-secondary-500"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div data-animate className="mx-auto mt-16 max-w-2xl px-5 text-center lg:px-10">
        <h3 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">
          Not sure where to start?
        </h3>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Talk to us and we&rsquo;ll help you find the right mix for your goals.
        </p>
        <Link
          to="/#contact"
          className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5"
        >
          Get in Touch
        </Link>
      </div>
    </main>
  )
}
