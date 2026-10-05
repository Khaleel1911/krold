'use client'

import { useEffect } from 'react'

// Rendered last in the layout, so this runs after every component above it has set up
// its entrance animation — the page appears already in its starting state.
export default function HydrationReveal() {
  useEffect(() => {
    document.documentElement.classList.remove('hydrating')
  }, [])

  return null
}
