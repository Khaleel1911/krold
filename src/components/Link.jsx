'use client'

import NextLink from 'next/link'

export const NAVIGATE_EVENT = 'krold:navigate'

// next/link with its built-in scrolling off: ScrollToHash owns scrolling (smooth to a
// hash, top otherwise). The event tells useLocation about clicks that stay on the same
// page, which Next's router hooks don't report.
export default function Link({ href, onClick, ...props }) {
  return (
    <NextLink
      href={href}
      scroll={false}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: href }))
      }}
    />
  )
}
