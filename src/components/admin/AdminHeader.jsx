'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { LuExternalLink, LuLogOut } from 'react-icons/lu'
import logo from '../../assets/logo.png'
import ThemeToggle from '../ThemeToggle'

export default function AdminHeader({ username }) {
  const pathname = usePathname()
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const tab = (href, label, active) => (
    <NextLink
      href={href}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
          : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
      }`}
    >
      {label}
    </NextLink>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/85">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 lg:px-6">
        <NextLink href="/admin" className="flex shrink-0 items-center gap-3">
          <img src={logo.src} alt="Krold Mfins" className="h-7 w-auto" />
          <span className="hidden border-l border-black/10 pl-3 text-sm font-semibold text-black/70 dark:border-white/15 dark:text-white/70 sm:inline">
            Blog CMS
          </span>
        </NextLink>
        <nav className="flex items-center gap-1">
          {tab('/admin', 'Posts', pathname === '/admin' || pathname.startsWith('/admin/posts/') && pathname !== '/admin/posts/new')}
          {tab('/admin/posts/new', 'New post', pathname === '/admin/posts/new')}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white md:inline-flex"
          >
            View blog <LuExternalLink className="h-3.5 w-3.5" />
          </a>
          <ThemeToggle />
          <span className="hidden text-sm text-black/45 dark:text-white/45 lg:inline">{username}</span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <LuLogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}
