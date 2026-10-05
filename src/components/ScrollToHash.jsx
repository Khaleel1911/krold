'use client'

import { useEffect } from 'react'
import { useLocation } from '../hooks/useLocation'
import { useHydrated } from '../hooks/useHydrated'

export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation()
  // Wait for client-only sections (the hero) to mount so the target is at its final position.
  const hydrated = useHydrated()

  useEffect(() => {
    if (!hydrated) return
    if (hash) {
      const id = hash.slice(1)
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
