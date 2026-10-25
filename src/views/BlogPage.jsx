'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from '../components/Link'
import { gsap } from 'gsap'
import BlogCover from '../components/blog/BlogCover'
import { PostMeta } from '../components/blog/BlogArticle'
import { Accent, Eyebrow } from '../components/nri/parts'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const ALL = 'All'

function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeaturedPost({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-primary-100/70 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40 lg:grid-cols-[0.8fr_1fr]"
    >
      <div className="aspect-[16/9] max-h-72 overflow-hidden lg:aspect-auto lg:max-h-none">
        <BlogCover post={post} width={1200} className="transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Featured
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
            {post.category}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold leading-snug text-balance text-black transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 sm:text-3xl">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="mt-4 leading-relaxed text-black/65 dark:text-white/65">{post.excerpt}</p>
        ) : null}
        <PostMeta post={post} className="mt-6" />
        <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary-600 dark:text-primary-400">
          Read the article <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-card
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary-100/70 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-100/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:border-white/10 dark:bg-white/[0.03] dark:hover:shadow-black/40"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <BlogCover post={post} width={720} className="transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">{post.category}</p>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-black transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-black/60 dark:text-white/60">{post.excerpt}</p>
        ) : null}
        <PostMeta post={post} className="mt-auto pt-5 text-[13px]" />
      </div>
    </Link>
  )
}

export default function BlogPage({ posts }) {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const categories = useMemo(() => [ALL, ...new Set(posts.map((p) => p.category).filter(Boolean))], [posts])
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const filtering = category !== ALL || query.trim() !== ''

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (!filtering && post === featured) return false
      if (category !== ALL && post.category !== category) return false
      if (!q) return true
      return [post.title, post.excerpt, post.category, ...(post.tags || [])].join(' ').toLowerCase().includes(q)
    })
  }, [posts, featured, category, query, filtering])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useRevealOnScroll(pageRef, (root) => root.querySelectorAll('[data-reveal]'), { y: 28, duration: 0.7, threshold: 0.08 })

  return (
    <main ref={pageRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] text-black/[0.035] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:text-white/[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 lg:px-10 lg:pb-14 lg:pt-20">
        <div ref={heroRef} className="max-w-3xl">
          <Eyebrow>Insights &amp; ideas</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-5xl">
            Money matters, <Accent>made simple.</Accent>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/65 dark:text-white/65">
            Short, practical reads on investing, saving and planning ahead — written by our team to help you make
            calmer, better-informed decisions with your money.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-10">
          <div className="rounded-3xl border border-dashed border-primary-200 p-12 text-center dark:border-white/15">
            <p className="text-lg font-semibold text-black dark:text-white">New articles are on their way.</p>
            <p className="mt-2 text-black/60 dark:text-white/60">Check back soon for our first posts.</p>
          </div>
        </section>
      ) : (
        <>
          {!filtering && featured ? (
            <section data-reveal className="mx-auto max-w-7xl px-5 lg:px-10">
              <FeaturedPost post={featured} />
            </section>
          ) : null}

          <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-10 lg:pb-28">
            <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
                {categories.map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={category === name}
                    onClick={() => setCategory(name)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                      category === name
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm'
                        : 'border border-primary-100 text-black/70 hover:bg-primary-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <label className="relative block sm:w-72">
                <span className="sr-only">Search articles</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  className="w-full rounded-full border border-primary-100 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/40"
                />
              </label>
            </div>

            {visible.length ? (
              <div data-reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-10 rounded-3xl border border-dashed border-primary-200 p-10 text-center text-black/60 dark:border-white/15 dark:text-white/60">
                {filtering ? 'No articles match your search.' : 'More articles are on their way.'}
              </p>
            )}
          </section>
        </>
      )}
    </main>
  )
}
