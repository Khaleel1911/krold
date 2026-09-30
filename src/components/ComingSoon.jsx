import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function ComingSoon({ badge, title, highlight, description }) {
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

  return (
    <main
      ref={pageRef}
      className="relative flex min-h-[70vh] items-center justify-center px-5 pb-24 pt-36 lg:px-10 lg:pt-40"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span
          data-animate
          className="inline-flex items-center gap-2 rounded-full border border-primary-100/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-500" />
          </span>
          {badge}
        </span>

        <h1 data-animate className="mt-6 text-3xl font-semibold text-black dark:text-white sm:text-4xl lg:text-5xl">
          {title}{' '}
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>

        <p data-animate className="mt-4 text-black/60 dark:text-white/60">
          {description}
        </p>

        <div data-animate className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/#home"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
          <Link
            to="/#contact"
            className="inline-flex items-center rounded-full border border-primary-200 dark:border-white/15 px-7 py-3 text-[15px] font-semibold text-primary-600 dark:text-primary-400 transition-colors duration-300 hover:bg-primary-50 dark:hover:bg-white/5"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  )
}
