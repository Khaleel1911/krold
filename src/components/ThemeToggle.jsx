import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const sunRef = useRef(null)
  const moonRef = useRef(null)
  const isFirstRun = useRef(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore write failures (e.g. private browsing)
    }

    const showSun = theme === 'dark'
    const enter = showSun ? sunRef.current : moonRef.current
    const leave = showSun ? moonRef.current : sunRef.current

    if (isFirstRun.current) {
      gsap.set(enter, { opacity: 1, scale: 1, rotate: 0 })
      gsap.set(leave, { opacity: 0, scale: 0.4, rotate: -90 })
      isFirstRun.current = false
      return
    }

    const tl = gsap.timeline({ defaults: { duration: 0.4, ease: 'back.out(2)' } })
    tl.to(leave, { opacity: 0, scale: 0.4, rotate: 90, duration: 0.25, ease: 'power2.in' }, 0).to(
      enter,
      { opacity: 1, scale: 1, rotate: 0 },
      0.1,
    )
  }, [theme])

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-600 transition-colors duration-300 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-white/10 ${className}`}
    >
      <svg
        ref={sunRef}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-5 w-5"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        ref={moonRef}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-5 w-5"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </button>
  )
}
