import { useRef, useState } from 'react'

// Styles and helpers shared by the admin components.

export const INPUT =
  'w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-primary-400 focus:ring-3 focus:ring-primary-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35 dark:focus:ring-primary-500/20'

export const LABEL = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55'

export const PANEL = 'rounded-2xl border border-black/[0.07] bg-white dark:border-white/10 dark:bg-neutral-900'

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm shadow-primary-200 hover:shadow-md dark:shadow-black/30',
  secondary:
    'border border-black/10 bg-white text-black/80 hover:bg-black/[0.03] dark:border-white/15 dark:bg-white/[0.04] dark:text-white/85 dark:hover:bg-white/[0.08]',
  ghost: 'text-black/70 hover:bg-black/[0.05] dark:text-white/70 dark:hover:bg-white/[0.07]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  'danger-ghost': 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10',
}

const SIZES = { sm: 'h-8 px-3 text-xs gap-1.5', md: 'h-10 px-4 text-sm gap-2' }

// Also used to style links as buttons.
export function buttonClass(variant = 'secondary', size = 'md') {
  return `inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${SIZES[size]} ${VARIANTS[variant]}`
}

export function useToast() {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  const show = (message, type = 'success') => {
    clearTimeout(timer.current)
    setToast({ message, type })
    timer.current = setTimeout(() => setToast(null), type === 'error' ? 5000 : 2600)
  }
  return [toast, show]
}

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}
