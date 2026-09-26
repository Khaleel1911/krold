import { createContext, useContext, useEffect } from 'react'
import { gsap } from 'gsap'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// KroldCity provides `register`, which lets it pause every ambient loop while the
// city is scrolled out of view.
export const CityMotion = createContext({ register: () => () => {} })

// Runs an ambient GSAP loop once on mount. Skipped entirely for reduced motion.
export function useCityLoop(setup) {
  const { register } = useContext(CityMotion)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(setup)
    const unregister = register(ctx)
    return () => {
      unregister()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
