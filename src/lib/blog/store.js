import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache'
import { DB_PUBLIC_ID, getCloudinary, isCloudinaryConfigured } from './cloudinary'
import { CATEGORIES, STATUSES, readingTime, slugify } from './utils'
import { SEED_POSTS } from '../../data/blogPosts'

// All posts are kept in one JSON document. In production that document is a raw file in
// Cloudinary, so the blog needs no database of its own; in local development without
// Cloudinary credentials it falls back to a gitignored file in the project.
export const POSTS_TAG = 'blog-posts'
const LOCAL_FILE = path.join(process.cwd(), '.blog-data', 'posts.json')
const canUseLocalFile = () => process.env.NODE_ENV !== 'production'

async function readDocument() {
  if (isCloudinaryConfigured()) {
    const cloudinary = getCloudinary()
    let resource
    try {
      resource = await cloudinary.api.resource(DB_PUBLIC_ID, { resource_type: 'raw' })
    } catch (err) {
      if (err?.error?.http_code === 404) return null
      throw new Error(`Could not read blog posts from Cloudinary: ${err?.error?.message || err?.message || err}`)
    }
    // The versioned URL is unique per save, so the CDN can never hand back an older copy.
    const res = await fetch(resource.secure_url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Could not download blog posts from Cloudinary (${res.status})`)
    return res.json()
  }

  if (!canUseLocalFile()) return null
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') return null
    throw err
  }
}

async function writeDocument(doc) {
  const body = JSON.stringify(doc, null, 2)

  if (isCloudinaryConfigured()) {
    const cloudinary = getCloudinary()
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: DB_PUBLIC_ID, overwrite: true, invalidate: true },
        (err, result) => (err ? reject(new Error(err.message || 'Cloudinary upload failed')) : resolve(result)),
      )
      stream.end(Buffer.from(body, 'utf8'))
    })
    return
  }

  if (!canUseLocalFile()) {
    throw new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.',
    )
  }
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true })
  await fs.writeFile(LOCAL_FILE, body, 'utf8')
}

// Until the first save the store doesn't exist yet, and the blog shows the seed posts.
async function loadPosts() {
  const doc = await readDocument()
  const posts = doc?.posts ?? SEED_POSTS
  return posts.map((post) => ({ ...post, readingTime: post.readingTime ?? readingTime(post.content) }))
}

// Writes from one server instance run one at a time, so two quick saves can't drop each other.
let queue = Promise.resolve()
function mutate(change) {
  const run = queue.then(async () => {
    const posts = await loadPosts()
    const { posts: next, result } = await change(posts)
    await writeDocument({ version: 1, updatedAt: new Date().toISOString(), posts: next })
    revalidateTag(POSTS_TAG, { expire: 0 })
    revalidatePath('/blog', 'layout')
    return result
  })
  queue = run.catch(() => {})
  return run
}

const byNewest = (key) => (a, b) => new Date(b[key] || 0) - new Date(a[key] || 0)

/* ─── Reads ──────────────────────────────────────────────────────── */

export async function listAllPosts() {
  return (await loadPosts()).sort(byNewest('updatedAt'))
}

export async function getPostById(id) {
  return (await loadPosts()).find((post) => post.id === id) ?? null
}

// The public site reads through Next's data cache; every save clears it (see mutate).
export const getPublishedPosts = unstable_cache(
  async () => (await loadPosts()).filter((post) => post.status === 'published').sort(byNewest('publishedAt')),
  ['blog-published-posts'],
  { tags: [POSTS_TAG], revalidate: 3600 },
)

export async function getPublishedPostBySlug(slug) {
  return (await getPublishedPosts()).find((post) => post.slug === slug) ?? null
}

/* ─── Writes ─────────────────────────────────────────────────────── */

export class ValidationError extends Error {}

const ALLOWED_IFRAME = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i

// The editor only produces its own schema, but the API accepts any HTML, so strip the
// obvious script vectors before it is stored and rendered on the public site.
function cleanHtml(html = '') {
  return String(html)
    .replace(/<(script|style|object|embed|form)[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(script|style|object|embed|form)[^>]*\/?>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'>\s]*\2/gi, '$1="#"')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, (tag) => {
      const src = tag.match(/\ssrc=["']([^"']+)["']/i)?.[1] || ''
      return ALLOWED_IFRAME.test(src) ? tag : ''
    })
}

const text = (value, max) => String(value ?? '').trim().slice(0, max)

function cleanMedia(media) {
  if (!media || typeof media !== 'object' || !media.url) return null
  return {
    url: text(media.url, 1000),
    publicId: text(media.publicId, 300),
    width: Number(media.width) || null,
    height: Number(media.height) || null,
    alt: text(media.alt, 300),
  }
}

function uniqueSlug(base, posts, ownId) {
  const root = base || 'post'
  let slug = root
  for (let n = 2; posts.some((p) => p.slug === slug && p.id !== ownId); n++) slug = `${root}-${n}`
  return slug
}

function buildPost(input, existing, posts) {
  const merged = { ...existing, ...input }
  const title = text(merged.title, 200)
  if (!title) throw new ValidationError('A title is required.')

  const status = STATUSES.includes(merged.status) ? merged.status : 'draft'
  const content = cleanHtml(merged.content)
  const now = new Date().toISOString()
  const id = existing?.id ?? randomUUID()

  return {
    id,
    title,
    slug: uniqueSlug(slugify(merged.slug || title), posts, id),
    excerpt: text(merged.excerpt, 400),
    content,
    coverImage: cleanMedia(merged.coverImage),
    category: text(merged.category, 60) || CATEGORIES[0],
    tags: (Array.isArray(merged.tags) ? merged.tags : String(merged.tags || '').split(','))
      .map((tag) => text(tag, 40))
      .filter(Boolean)
      .slice(0, 12),
    author: text(merged.author, 80) || 'Krold Mfins Team',
    disclaimer: text(merged.disclaimer, 1500),
    featured: Boolean(merged.featured),
    status,
    readingTime: readingTime(content),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    // Kept through hide/unhide, so a post returns to its original place in the list.
    publishedAt: status === 'published' ? existing?.publishedAt || now : existing?.publishedAt || null,
  }
}

export function createPost(input) {
  return mutate((posts) => {
    const post = buildPost(input, null, posts)
    const others = post.featured ? posts.map((p) => ({ ...p, featured: false })) : posts
    return { posts: [post, ...others], result: post }
  })
}

export function updatePost(id, input) {
  return mutate((posts) => {
    const existing = posts.find((p) => p.id === id)
    if (!existing) return { posts, result: null }
    const post = buildPost(input, existing, posts)
    // Only one post can be the featured one.
    const next = posts.map((p) => (p.id === id ? post : post.featured ? { ...p, featured: false } : p))
    return { posts: next, result: post }
  })
}

export function deletePost(id) {
  return mutate((posts) => {
    const existing = posts.find((p) => p.id === id)
    return { posts: posts.filter((p) => p.id !== id), result: existing ?? null }
  })
}
