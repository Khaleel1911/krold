'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Counts from 0 to `value` the first time it scrolls into view.
export default function CountUp({ value }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const counter = { val: 0 }
        gsap.to(counter, {
          val: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toLocaleString('en-IN')
          },
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>0</span>
}
