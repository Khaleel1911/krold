import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ServiceIcon from './icons/ServiceIcons'
import { SERVICES } from '../data/services'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function ProductsServices() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useRevealOnScroll(sectionRef, (root) => root.querySelectorAll('[data-animate]'), { y: 24, duration: 0.6 })
  useRevealOnScroll(sectionRef, () => cardRefs.current, { y: 30, duration: 0.6, stagger: 0.08, delay: 0.1 })

  return (
    <section id="products-services" ref={sectionRef} className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            What We Offer
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Products &amp;{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            A full suite of investment and protection products, tailored to where you are in your wealth journey.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              to={`/services#${service.slug}`}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative flex flex-col rounded-2xl border border-primary-100/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-400/40 hover:shadow-xl hover:shadow-primary-200/40 dark:hover:shadow-black/40"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30 transition-transform duration-300 group-hover:scale-110">
                <ServiceIcon name={service.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-black dark:text-white">{service.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-black/60 dark:text-white/60">
                {service.short}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
                Learn more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
