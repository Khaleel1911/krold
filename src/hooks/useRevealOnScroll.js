import { useEffect } from 'react'
import { gsap } from 'gsap'

// One-shot scroll-reveal via IntersectionObserver instead of GSAP ScrollTrigger.
// Avoids ScrollTrigger's refresh-on-layout-shift recalculation, which can
// interrupt an in-flight (non-scrubbed) stagger tween and leave it stuck
// mid-animation — observed as elements permanently frozen at partial opacity.
// Each target is observed independently so widely-spaced elements (e.g. long
// page sections) reveal as they individually enter view; a per-index delay
// keeps the staggered-cascade look for grouped elements (e.g. a card grid).
export function useRevealOnScroll(rootRef, getTargets, options = {}) {
  const { y = 24, duration = 0.6, stagger = 0, delay = 0, threshold = 0.15 } = options

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const els = getTargets(root)
    const list = els instanceof NodeList || Array.isArray(els) ? Array.from(els) : [els]
    if (list.length === 0 || !list[0]) return

    gsap.set(list, { opacity: 0, y })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = list.indexOf(entry.target)
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration,
            delay: delay + Math.max(index, 0) * stagger,
            ease: 'power3.out',
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold },
    )
    list.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
