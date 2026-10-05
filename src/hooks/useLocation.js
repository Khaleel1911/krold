import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAVIGATE_EVENT } from '../components/Link'

// Next's router hooks don't expose the URL hash, so this tracks it alongside the pathname.
// `key` changes on every navigation, including a repeat click on the current link.
export function useLocation() {
  const pathname = usePathname()
  const [location, setLocation] = useState(() => ({
    pathname,
    hash: typeof window === 'undefined' ? '' : window.location.hash,
    key: 0,
  }))

  // Route changes. The URL is already updated by the time this runs.
  useEffect(() => {
    setLocation((prev) =>
      prev.pathname === pathname ? prev : { pathname, hash: window.location.hash, key: prev.key + 1 },
    )
  }, [pathname])

  // Same-page navigations: link clicks and back/forward between hashes.
  useEffect(() => {
    const onNavigate = (e) => {
      const url = new URL(e.detail, window.location.href)
      if (url.pathname !== window.location.pathname) return
      setLocation((prev) => ({ pathname: url.pathname, hash: url.hash, key: prev.key + 1 }))
    }
    const onPopState = () => {
      setLocation((prev) =>
        prev.pathname === window.location.pathname
          ? { ...prev, hash: window.location.hash, key: prev.key + 1 }
          : prev,
      )
    }
    window.addEventListener(NAVIGATE_EVENT, onNavigate)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener(NAVIGATE_EVENT, onNavigate)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  return location
}
