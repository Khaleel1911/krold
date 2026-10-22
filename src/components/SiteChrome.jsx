'use client'

import { usePathname } from 'next/navigation'

// The site's navbar and footer, left out of the admin area, which has its own header.
export default function SiteChrome({ children }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return children
}
