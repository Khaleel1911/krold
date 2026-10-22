// Shared by the server (storage, API) and the browser (editor, preview), so no Node imports here.

export const STATUSES = ['draft', 'published', 'hidden']

export const STATUS_LABELS = {
  draft: 'Draft',
  published: 'Published',
  hidden: 'Hidden',
}

export const CATEGORIES = ['Investing Basics', 'Mutual Funds', 'Retirement', 'Tax Planning', 'Insurance', 'NRI', 'Markets']

export function slugify(text = '') {
  return text
    .toString()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function htmlToText(html = '') {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// About 200 words a minute, the usual figure for considered reading.
export function readingTime(html = '') {
  const words = htmlToText(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Inserts Cloudinary delivery transformations (f_auto, q_auto, a width...) into an upload URL.
// Anything that isn't a Cloudinary upload URL is returned untouched.
export function cldUrl(url, transform = 'f_auto,q_auto') {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/${transform}/`)
}

export function formatBytes(bytes = 0) {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`
}

export function emptyPost() {
  return {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: null,
    category: CATEGORIES[0],
    tags: [],
    author: 'Krold Mfins Team',
    disclaimer: '',
    featured: false,
    status: 'draft',
  }
}
