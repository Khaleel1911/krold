'use client'

import { useMemo, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LuExternalLink,
  LuEye,
  LuEyeOff,
  LuPencil,
  LuPlus,
  LuSearch,
  LuStar,
  LuTrash2,
  LuTriangleAlert,
} from 'react-icons/lu'
import BlogCover from '../blog/BlogCover'
import { STATUSES, STATUS_LABELS, formatDate } from '../../lib/blog/utils'
import { Button, ConfirmDialog, StatusBadge, Toast } from './ui'
import { INPUT, PANEL, api, buttonClass, useToast } from './client'

export default function Dashboard({ posts: initialPosts, loadError, cloudinary }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [toast, showToast] = useToast()

  const counts = useMemo(
    () => Object.fromEntries(['all', ...STATUSES].map((s) => [s, s === 'all' ? posts.length : posts.filter((p) => p.status === s).length])),
    [posts],
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (filter === 'all' || p.status === filter) &&
        (!q || [p.title, p.excerpt, p.category, ...(p.tags || [])].join(' ').toLowerCase().includes(q)),
    )
  }, [posts, filter, query])

  const setStatus = async (post, status) => {
    setBusy(post.id)
    try {
      const { post: updated } = await api(`/api/admin/posts/${post.id}`, { method: 'PATCH', body: { status } })
      setPosts((list) => list.map((p) => (p.id === post.id ? { ...updated, content: undefined } : p)))
      showToast(status === 'published' ? 'Post published' : status === 'hidden' ? 'Post hidden from the blog' : 'Moved to drafts')
      router.refresh()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setBusy(null)
    }
  }

  const confirmDelete = async () => {
    setBusy(deleting.id)
    try {
      await api(`/api/admin/posts/${deleting.id}`, { method: 'DELETE' })
      setPosts((list) => list.filter((p) => p.id !== deleting.id))
      showToast('Post deleted')
      setDeleting(null)
      router.refresh()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setBusy(null)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">Blog posts</h1>
          <p className="mt-1 text-sm text-black/55 dark:text-white/55">Write, publish and manage the articles on your website.</p>
        </div>
        <NextLink href="/admin/posts/new" className={buttonClass('primary')}>
          <LuPlus className="h-4 w-4" />
          New post
        </NextLink>
      </div>

      {!cloudinary ? (
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          <LuTriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Cloudinary isn&apos;t connected.</strong> Posts are being saved to a local file for development only,
            and uploads are turned off. Add the Cloudinary credentials to the environment before going live.
          </p>
        </div>
      ) : null}
      {loadError ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {loadError}
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {['all', ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`${PANEL} p-4 text-left transition-all ${filter === s ? 'ring-2 ring-primary-400' : 'hover:border-primary-200 dark:hover:border-white/20'}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/50 dark:text-white/50">
              {s === 'all' ? 'All posts' : STATUS_LABELS[s]}
            </p>
            <p className="mt-1 text-2xl font-semibold text-black dark:text-white">{counts[s]}</p>
          </button>
        ))}
      </div>

      <div className="relative mt-6">
        <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, category or tag"
          className={`${INPUT} pl-10`}
        />
      </div>

      <ul className={`${PANEL} mt-4 divide-y divide-black/[0.06] overflow-hidden dark:divide-white/10`}>
        {visible.length === 0 ? (
          <li className="p-10 text-center text-sm text-black/55 dark:text-white/55">
            {posts.length ? 'No posts match.' : 'No posts yet — create your first one.'}
          </li>
        ) : null}
        {visible.map((post) => (
          <li key={post.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <NextLink href={`/admin/posts/${post.id}`} className="flex min-w-0 flex-1 items-center gap-4">
              <div className="aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl">
                <BlogCover post={post} width={240} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={post.status} />
                  {post.featured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <LuStar className="h-3.5 w-3.5" /> Featured
                    </span>
                  ) : null}
                  <span className="text-xs text-black/45 dark:text-white/45">{post.category}</span>
                </div>
                <p className="mt-1.5 truncate font-semibold text-black dark:text-white">{post.title}</p>
                <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">
                  {post.status === 'published' ? `Published ${formatDate(post.publishedAt)}` : `Edited ${formatDate(post.updatedAt)}`}
                  {' · '}
                  {post.readingTime} min read
                </p>
              </div>
            </NextLink>
            <div className="flex flex-wrap items-center gap-1 sm:justify-end">
              <NextLink href={`/admin/posts/${post.id}`} className={buttonClass('ghost', 'sm')}>
                <LuPencil className="h-4 w-4" />
                Edit
              </NextLink>
              {post.status === 'published' ? (
                <>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={buttonClass('ghost', 'sm')}>
                    <LuExternalLink className="h-4 w-4" />
                    View
                  </a>
                  <Button size="sm" variant="ghost" icon={LuEyeOff} loading={busy === post.id} onClick={() => setStatus(post, 'hidden')}>
                    Hide
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="ghost" icon={LuEye} loading={busy === post.id} onClick={() => setStatus(post, 'published')}>
                  Publish
                </Button>
              )}
              <Button size="sm" variant="danger-ghost" icon={LuTrash2} onClick={() => setDeleting(post)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this post?"
        message={
          <>
            <strong className="text-black dark:text-white">{deleting?.title}</strong> will be removed from the blog permanently.
            If you only want to take it down for now, hide it instead.
          </>
        }
        confirmLabel="Delete post"
        danger
        loading={Boolean(deleting) && busy === deleting?.id}
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
      <Toast toast={toast} />
    </main>
  )
}
