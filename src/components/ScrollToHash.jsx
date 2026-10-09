'use client'

import { useEffect, useRef } from 'react'
import { useLocation } from '../hooks/useLocation'
import { useHydrated } from '../hooks/useHydrated'

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation()
  // Wait for client-only sections (the hero) to mount so the target is at its final position.
  const hydrated = useHydrated()
  const lastPathname = useRef(null)

  useEffect(() => {
    if (!hydrated) return
    // Glide to a hash on the page you're already on; arriving from another page (or on
    // first load) starts at the target, rather than scrolling the whole page past you.
    const behavior = lastPathname.current === pathname ? 'smooth' : 'instant'
    lastPathname.current = pathname
    if (hash) {
      const id = hash.slice(1)
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior, block: 'start' })
          return true
        }
        return false
      }
      if (!scroll()) {
        const timer = setTimeout(scroll, 80)
        return () => clearTimeout(timer)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }
    // key changes on every navigation, so re-clicking a hash link scrolls again
  }, [hydrated, pathname, hash, key])

  return null
}
