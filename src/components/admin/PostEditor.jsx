'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LuArrowLeft,
  LuColumns2,
  LuExternalLink,
  LuEye,
  LuEyeOff,
  LuImage,
  LuMonitor,
  LuPencil,
  LuSend,
  LuSmartphone,
  LuStar,
  LuTablet,
  LuTrash2,
  LuUpload,
  LuX,
} from 'react-icons/lu'
import RichEditor from './editor/RichEditor'
import BlogArticle from '../blog/BlogArticle'
import { pickFiles, uploadFile } from './upload'
import { Button, ConfirmDialog, StatusBadge, Toast } from './ui'
import { INPUT, LABEL, PANEL, api, buttonClass, useToast } from './client'
import { CATEGORIES, cldUrl, emptyPost, formatDate, slugify } from '../../lib/blog/utils'

// The fields the admin edits; comparing them tells us whether there are unsaved changes.
const EDITABLE = ['title', 'slug', 'excerpt', 'content', 'coverImage', 'category', 'tags', 'author', 'disclaimer', 'featured']
const snapshot = (post) => JSON.stringify(EDITABLE.map((key) => post[key] ?? null))

const DEVICES = [
  { id: 'desktop', icon: LuMonitor, label: 'Desktop', width: '100%' },
  { id: 'tablet', icon: LuTablet, label: 'Tablet', width: '820px' },
  { id: 'mobile', icon: LuSmartphone, label: 'Mobile', width: '390px' },
]

const MODES = [
  { id: 'edit', icon: LuPencil, label: 'Edit' },
  { id: 'split', icon: LuColumns2, label: 'Split' },
  { id: 'preview', icon: LuEye, label: 'Preview' },
]

function Segmented({ value, onChange, options, className = '' }) {
  return (
    <div className={`inline-flex rounded-xl border border-black/10 bg-black/[0.03] p-0.5 dark:border-white/10 dark:bg-white/[0.04] ${className}`}>
      {options.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          title={label}
          className={`inline-flex h-8 items-center gap-1.5 rounded-[10px] px-2.5 text-xs font-semibold transition-colors ${
            value === id ? 'bg-white text-black shadow-sm dark:bg-white/15 dark:text-white' : 'text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}

// Renders the preview inside an iframe, so the article's responsive styles respond to
// the chosen device width rather than to the admin's own window.
function PreviewFrame({ width, children }) {
  const frameRef = useRef(null)
  const [body, setBody] = useState(null)

  useEffect(() => {
    const doc = frameRef.current.contentDocument
    doc.open()
    doc.write('<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>')
    doc.close()
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => doc.head.appendChild(node.cloneNode(true)))
    const syncTheme = () => doc.documentElement.classList.toggle('dark', document.documentElement.classList.contains('dark'))
    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    setBody(doc.body)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <iframe
        ref={frameRef}
        title="Article preview"
        style={{ width }}
        className="mx-auto block h-[calc(100svh-190px)] min-h-[480px] max-w-full rounded-2xl border border-black/10 bg-white shadow-sm transition-[width] duration-300 dark:border-white/10 dark:bg-neutral-950"
      />
      {body ? createPortal(children, body) : null}
    </>
  )
}

function Preview({ post, device, onDevice }) {
  const current = DEVICES.find((d) => d.id === device)
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/50 dark:text-white/50">Live preview</p>
        <Segmented value={device} onChange={onDevice} options={DEVICES} />
      </div>
      <PreviewFrame width={current.width}>
        <div className="px-5 py-10 sm:px-10 lg:py-14">
          <BlogArticle post={{ ...post, publishedAt: post.publishedAt || new Date().toISOString() }} />
        </div>
      </PreviewFrame>
    </div>
  )
}

function CoverField({ value, onChange, canUpload, notify }) {
  const [progress, setProgress] = useState(null)

  const upload = async () => {
    if (!canUpload) return notify('Uploads need Cloudinary. Add the Cloudinary credentials to the environment first.', 'error')
    const [file] = await pickFiles('image/*')
    if (!file) return
    setProgress(0)
    try {
      const r = await uploadFile(file, { resourceType: 'image', onProgress: setProgress })
      onChange({ url: r.url, publicId: r.publicId, width: r.width, height: r.height, alt: value?.alt || '' })
    } catch (err) {
      notify(err.message, 'error')
    } finally {
      setProgress(null)
    }
  }

  if (progress !== null) {
    return (
      <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary-300 bg-primary-50/40 dark:border-primary-500/40 dark:bg-primary-500/5">
        <p className="text-sm font-medium text-black/70 dark:text-white/70">Uploading… {progress}%</p>
        <span className="h-1.5 w-2/3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <span className="block h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${progress}%` }} />
        </span>
      </div>
    )
  }

  if (!value?.url) {
    return (
      <button
        type="button"
        onClick={upload}
        className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 text-black/55 transition-colors hover:border-primary-400 hover:bg-primary-50/40 hover:text-primary-600 dark:border-white/15 dark:text-white/55 dark:hover:bg-primary-500/5"
      >
        <LuUpload className="h-5 w-5" />
        <span className="text-sm font-medium">Upload cover image</span>
        <span className="text-xs opacity-70">16:9, at least 1600 × 900 px</span>
      </button>
    )
  }

  return (
    <div className="space-y-2">
      <div className="group relative aspect-[16/9] overflow-hidden rounded-xl">
        <img src={cldUrl(value.url, 'f_auto,q_auto,c_fill,w_700,ar_16:9')} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/45 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button size="sm" icon={LuImage} onClick={upload}>
            Replace
          </Button>
          <Button size="sm" icon={LuX} onClick={() => onChange(null)}>
            Remove
          </Button>
        </div>
      </div>
      <input
        className={INPUT}
        value={value.alt || ''}
        onChange={(e) => onChange({ ...value, alt: e.target.value })}
        placeholder="Describe the image (alt text)"
      />
    </div>
  )
}

function TagsField({ value, onChange }) {
  const [draft, setDraft] = useState('')
  const add = () => {
    const tags = draft.split(',').map((t) => t.trim()).filter(Boolean)
    if (tags.length) onChange([...new Set([...value, ...tags])].slice(0, 12))
    setDraft('')
  }
  return (
    <div className={`${INPUT} flex flex-wrap items-center gap-1.5 !py-2`}>
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
          {tag}
          <button type="button" aria-label={`Remove ${tag}`} onClick={() => onChange(value.filter((t) => t !== tag))}>
            <LuX className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            add()
          } else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1))
        }}
        onBlur={add}
        placeholder={value.length ? '' : 'Type a tag and press Enter'}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-black/35 dark:placeholder:text-white/35"
      />
    </div>
  )
}

function AutoTextarea({ value, onChange, className, ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])
  return <textarea ref={ref} rows={1} value={value} onChange={(e) => onChange(e.target.value)} className={`resize-none overflow-hidden ${className}`} {...props} />
}

export default function PostEditor({ initialPost, cloudinary }) {
  const router = useRouter()
  const [post, setPost] = useState(() => initialPost ?? emptyPost())
  const [savedSnapshot, setSavedSnapshot] = useState(() => snapshot(initialPost ?? emptyPost()))
  // New posts take their URL from the title until the slug is edited by hand or the post goes live.
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.publishedAt))
  const [saving, setSaving] = useState(null)
  const [mode, setMode] = useState('edit')
  const [device, setDevice] = useState('desktop')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [toast, showToast] = useToast()

  const dirty = snapshot(post) !== savedSnapshot
  const isNew = !post.id
  const set = (key) => (value) => setPost((p) => ({ ...p, [key]: value }))

  const setTitle = (title) =>
    setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }))

  const onContentChange = useCallback((content) => setPost((p) => ({ ...p, content })), [])

  const save = async (status = post.status, message = 'Changes saved') => {
    if (!post.title.trim()) {
      showToast('Add a title before saving.', 'error')
      return
    }
    const payload = { ...post, status }
    setSaving(status)
    try {
      const { post: saved } = isNew
        ? await api('/api/admin/posts', { method: 'POST', body: payload })
        : await api(`/api/admin/posts/${post.id}`, { method: 'PATCH', body: payload })
      // Keep anything typed while the request was in flight; take the server's derived fields.
      const derived = {
        id: saved.id,
        slug: saved.slug,
        status: saved.status,
        publishedAt: saved.publishedAt,
        createdAt: saved.createdAt,
        updatedAt: saved.updatedAt,
        readingTime: saved.readingTime,
      }
      setPost((p) => ({ ...p, ...derived }))
      setSavedSnapshot(snapshot({ ...payload, ...derived }))
      if (saved.publishedAt) setSlugTouched(true)
      if (isNew) window.history.replaceState(null, '', `/admin/posts/${saved.id}`)
      showToast(message)
      router.refresh()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(null)
    }
  }

  const remove = async () => {
    setSaving('delete')
    try {
      await api(`/api/admin/posts/${post.id}`, { method: 'DELETE' })
      router.push('/admin')
      router.refresh()
    } catch (err) {
      showToast(err.message, 'error')
      setSaving(null)
    }
  }

  // Ctrl/Cmd+S saves; leaving with unsaved changes asks first.
  const saveRef = useRef(save)
  useEffect(() => {
    saveRef.current = save
  })
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        saveRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    if (!dirty) return
    const warn = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const actions = {
    draft: (
      <>
        <Button loading={saving === 'draft'} disabled={Boolean(saving)} onClick={() => save('draft', 'Draft saved')}>
          Save draft
        </Button>
        <Button variant="primary" icon={LuSend} loading={saving === 'published'} disabled={Boolean(saving)} onClick={() => save('published', 'Published — it’s live on the blog')}>
          Publish
        </Button>
      </>
    ),
    published: (
      <>
        <Button icon={LuEyeOff} loading={saving === 'hidden'} disabled={Boolean(saving)} onClick={() => save('hidden', 'Hidden — readers can no longer see it')}>
          <span className="hidden sm:inline">Hide</span>
        </Button>
        <Button variant="primary" loading={saving === 'published'} disabled={Boolean(saving)} onClick={() => save('published', 'Live post updated')}>
          Update
        </Button>
      </>
    ),
    hidden: (
      <>
        <Button loading={saving === 'hidden'} disabled={Boolean(saving)} onClick={() => save('hidden', 'Changes saved')}>
          Save
        </Button>
        <Button variant="primary" icon={LuSend} loading={saving === 'published'} disabled={Boolean(saving)} onClick={() => save('published', 'Published again')}>
          Publish
        </Button>
      </>
    ),
  }

  const editorColumn = (
    <div className={`min-w-0 ${mode === 'preview' ? 'hidden' : ''}`}>
      <AutoTextarea
        value={post.title}
        onChange={setTitle}
        placeholder="Post title"
        aria-label="Post title"
        className="w-full bg-transparent text-3xl font-semibold leading-tight text-black outline-none placeholder:text-black/25 dark:text-white dark:placeholder:text-white/25 sm:text-4xl"
      />
      <AutoTextarea
        value={post.excerpt}
        onChange={set('excerpt')}
        placeholder="A short summary shown on the blog page and in Google results (optional)"
        aria-label="Summary"
        maxLength={400}
        className="mt-3 w-full bg-transparent text-lg leading-relaxed text-black/65 outline-none placeholder:text-black/30 dark:text-white/65 dark:placeholder:text-white/30"
      />
      <div className="mt-6">
        <RichEditor content={post.content} onChange={onContentChange} canUpload={cloudinary} notify={showToast} toolbarTop="top-28" />
      </div>
    </div>
  )

  const sidebar = (
    <aside className="space-y-4 lg:sticky lg:top-32 lg:max-h-[calc(100svh-9rem)] lg:overflow-y-auto lg:pb-6">
      <section className={`${PANEL} p-4`}>
        <div className="flex items-center justify-between">
          <span className={LABEL + ' !mb-0'}>Status</span>
          <StatusBadge status={post.status} />
        </div>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">
          {post.status === 'published'
            ? `Live since ${formatDate(post.publishedAt)}.`
            : post.status === 'hidden'
              ? 'Hidden from the blog. Publish to show it again.'
              : 'Not visible to readers until you publish.'}
        </p>
        {post.status === 'published' ? (
          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={`${buttonClass('secondary', 'sm')} mt-3 w-full`}>
            <LuExternalLink className="h-4 w-4" /> View live post
          </a>
        ) : null}
      </section>

      <section className={`${PANEL} space-y-4 p-4`}>
        <div>
          <span className={LABEL}>Cover image</span>
          <CoverField value={post.coverImage} onChange={set('coverImage')} canUpload={cloudinary} notify={showToast} />
        </div>
        <label className="block">
          <span className={LABEL}>Web address</span>
          <div className="flex items-center rounded-xl border border-black/10 bg-white pl-3 text-sm focus-within:border-primary-400 dark:border-white/10 dark:bg-white/[0.04]">
            <span className="shrink-0 text-black/40 dark:text-white/40">/blog/</span>
            <input
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true)
                set('slug')(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
              }}
              onBlur={() => set('slug')(slugify(post.slug || post.title))}
              className="min-w-0 flex-1 bg-transparent py-2.5 pr-3 text-black outline-none dark:text-white"
              placeholder="post-url"
            />
          </div>
          {post.publishedAt ? (
            <span className="mt-1 block text-xs text-black/45 dark:text-white/45">Changing this breaks links people have already shared.</span>
          ) : null}
        </label>
        <label className="block">
          <span className={LABEL}>Category</span>
          <input list="blog-categories" className={INPUT} value={post.category} onChange={(e) => set('category')(e.target.value)} />
          <datalist id="blog-categories">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <div>
          <span className={LABEL}>Tags</span>
          <TagsField value={post.tags || []} onChange={set('tags')} />
        </div>
        <label className="block">
          <span className={LABEL}>Author</span>
          <input className={INPUT} value={post.author} onChange={(e) => set('author')(e.target.value)} />
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-black/10 p-3 dark:border-white/10">
          <input type="checkbox" checked={post.featured} onChange={(e) => set('featured')(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary-500" />
          <span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-black dark:text-white">
              <LuStar className="h-4 w-4 text-amber-500" /> Feature this post
            </span>
            <span className="mt-0.5 block text-xs text-black/50 dark:text-white/50">Shown large at the top of the blog page. Only one post can be featured.</span>
          </span>
        </label>
      </section>

      <section className={`${PANEL} p-4`}>
        <label className="block">
          <span className={LABEL}>Disclaimer</span>
          <textarea
            rows={5}
            className={`${INPUT} resize-y`}
            value={post.disclaimer}
            onChange={(e) => set('disclaimer')(e.target.value)}
            placeholder="e.g. Mutual Fund investments are subject to market risks, read all scheme related documents carefully."
          />
          <span className="mt-1 block text-xs text-black/45 dark:text-white/45">Shown in small print at the end of the article.</span>
        </label>
      </section>

      {!isNew ? (
        <section className="rounded-2xl border border-red-200 p-4 dark:border-red-500/25">
          <p className="text-sm font-semibold text-black dark:text-white">Delete post</p>
          <p className="mt-1 text-xs text-black/55 dark:text-white/55">Removes it permanently. To take it down for a while, hide it instead.</p>
          <Button variant="danger-ghost" size="sm" icon={LuTrash2} className="mt-2 -ml-2" onClick={() => setConfirmDelete(true)}>
            Delete this post
          </Button>
        </section>
      ) : null}
    </aside>
  )

  const layout = {
    edit: 'lg:grid-cols-[minmax(0,1fr)_340px]',
    split: 'xl:grid-cols-2',
    preview: '',
  }[mode]

  return (
    <div>
      <div className="sticky top-14 z-30 border-b border-black/[0.07] bg-neutral-50/90 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/90">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4 lg:px-6">
          <NextLink href="/admin" className="rounded-lg p-1.5 text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Back to posts">
            <LuArrowLeft className="h-5 w-5" />
          </NextLink>
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            <StatusBadge status={post.status} />
            <span className={`text-xs ${dirty ? 'font-medium text-amber-600 dark:text-amber-400' : 'text-black/45 dark:text-white/45'}`}>
              {dirty ? 'Unsaved changes' : isNew ? 'New post' : 'All changes saved'}
            </span>
          </div>
          <Segmented value={mode} onChange={setMode} options={MODES} className="mx-auto" />
          <div className="flex items-center gap-2">{actions[post.status]}</div>
        </div>
      </div>

      <main className={`mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:px-6 ${layout}`}>
        {editorColumn}
        {mode === 'edit' ? sidebar : null}
        {mode !== 'edit' ? <Preview post={post} device={device} onDevice={setDevice} /> : null}
      </main>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this post?"
        message="This can't be undone. The post will disappear from the blog and from this dashboard."
        confirmLabel="Delete post"
        danger
        loading={saving === 'delete'}
        onConfirm={remove}
        onClose={() => setConfirmDelete(false)}
      />
      <Toast toast={toast} />
    </div>
  )
}
