import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CenterBadge({ count, label, className = '' }) {
  const badgeRef = useRef(null)
  const numberRef = useRef(null)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const counter = { val: 0 }
        gsap.to(counter, {
          val: count,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (numberRef.current) numberRef.current.textContent = Math.round(counter.val).toLocaleString('en-IN')
          },
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [count])

  return (
    <div
      ref={badgeRef}
      className={`relative flex h-56 w-56 shrink-0 flex-col items-center justify-center rounded-full border border-primary-200/70 dark:border-primary-400/30 bg-white/80 dark:bg-neutral-900/80 shadow-2xl shadow-primary-200/40 dark:shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-200 dark:border-white/10" />
      <p className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
        <span ref={numberRef}>0</span>
        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">+</span>
      </p>
      <p className="mt-2 text-sm font-medium text-black/60 dark:text-white/60">{label}</p>
    </div>
  )
}
