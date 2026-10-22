'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import BlogArticle from '../components/blog/BlogArticle'
import BlogCover from '../components/blog/BlogCover'
import GetInTouch from '../components/GetInTouch'
import { formatDate } from '../lib/blog/utils'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ShareBar({ post }) {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => setUrl(window.location.href), [])

  const text = encodeURIComponent(post.title)
  const link = encodeURIComponent(url)
  const targets = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${link}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
    { name: 'X', href: `https://x.com/intent/post?text=${text}&url=${link}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${link}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard access can be refused; the share links still work.
    }
  }

  const chip =
    'rounded-full border border-primary-100 px-3.5 py-1.5 text-sm font-medium text-black/70 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-white/70 dark:hover:text-primary-400'

  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center gap-2 border-t border-primary-100/70 pt-8 dark:border-white/10">
      <span className="mr-2 text-sm font-semibold text-black dark:text-white">Share this article</span>
      {targets.map((target) => (
        <a key={target.name} href={target.href} target="_blank" rel="noopener noreferrer" className={chip}>
          {target.name}
        </a>
      ))}
      <button type="button" onClick={copy} className={chip}>
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  )
}

export default function BlogPostPage({ post, related }) {
  const pageRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-intro]', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,var(--color-primary-50),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(54,161,218,0.08),transparent_65%)]" />

      <div data-intro className="px-5 pb-16 pt-10 lg:px-10 lg:pt-16">
        <div className="mx-auto mb-8 max-w-3xl">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All articles
          </Link>
        </div>
        <BlogArticle post={post} />
        <ShareBar post={post} />
      </div>

      {related.length ? (
        <section className="border-t border-primary-100/70 bg-primary-50/30 px-5 py-16 dark:border-white/10 dark:bg-white/[0.015] lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Keep reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group flex gap-4 rounded-3xl border border-primary-100/70 bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary-100/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/30"
                >
                  <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-2xl">
                    <BlogCover post={item} width={240} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-400">
                      {item.category}
                    </p>
                    <h3 className="mt-1.5 line-clamp-3 font-semibold leading-snug text-black transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-black/50 dark:text-white/50">
                      {formatDate(item.publishedAt)} · {item.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <GetInTouch />
    </main>
  )
}
