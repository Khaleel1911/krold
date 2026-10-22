import { Node, ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Youtube from '@tiptap/extension-youtube'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { TableKit } from '@tiptap/extension-table'
import { CharacterCount, Placeholder } from '@tiptap/extensions'
import MediaView from './MediaView'
import { formatBytes } from '../../../lib/blog/utils'

// Images and videos are stored as <figure data-type data-align style="width:N%">, with an
// optional <figcaption>. The width is a percentage of the column so posts stay responsive.
const widthOf = (el) => {
  const w = parseFloat(el.style.width)
  return w > 0 && w <= 100 ? Math.round(w) : 100
}
const captionOf = (el) => el.querySelector('figcaption')?.textContent?.trim() || ''

const mediaAttributes = {
  width: { default: 100, rendered: false },
  align: { default: 'center', rendered: false },
  caption: { default: '', rendered: false },
}

function figure(type, node, media) {
  const { width, align, caption } = node.attrs
  const attrs = { 'data-type': type, 'data-align': align }
  if (width && width < 100) attrs.style = `width:${width}%`
  return ['figure', attrs, media, ...(caption ? [['figcaption', {}, caption]] : [])]
}

export const BlogImage = Image.extend({
  addOptions() {
    return { ...this.parent?.(), upload: null }
  },
  addAttributes() {
    return {
      src: { default: null, rendered: false },
      alt: { default: '', rendered: false },
      ...mediaAttributes,
    }
  },
  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image"]',
        getAttrs: (el) => {
          const img = el.querySelector('img')
          if (!img) return false
          return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '', width: widthOf(el), align: el.dataset.align || 'center', caption: captionOf(el) }
        },
      },
      { tag: 'img[src]:not([src^="data:"])', getAttrs: (el) => ({ src: el.getAttribute('src'), alt: el.getAttribute('alt') || '' }) },
    ]
  },
  renderHTML({ node }) {
    return figure('image', node, ['img', { src: node.attrs.src, alt: node.attrs.alt || '', loading: 'lazy' }])
  },
  addNodeView() {
    return ReactNodeViewRenderer(MediaView)
  },
})

export const BlogVideo = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addOptions() {
    return { upload: null }
  },
  addAttributes() {
    return { src: { default: null, rendered: false }, ...mediaAttributes }
  },
  parseHTML() {
    return [
      {
        tag: 'figure[data-type="video"]',
        getAttrs: (el) => {
          const video = el.querySelector('video')
          const src = video?.getAttribute('src') || video?.querySelector('source')?.getAttribute('src')
          if (!src) return false
          return { src, width: widthOf(el), align: el.dataset.align || 'center', caption: captionOf(el) }
        },
      },
      { tag: 'video[src]', getAttrs: (el) => ({ src: el.getAttribute('src') }) },
    ]
  },
  renderHTML({ node }) {
    return figure('video', node, ['video', { src: node.attrs.src, controls: 'true', preload: 'metadata', playsinline: 'true' }])
  },
  addCommands() {
    return {
      setVideo:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(MediaView)
  },
})

// A downloadable file, shown as a card with its type and size.
export const FileAttachment = Node.create({
  name: 'fileAttachment',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      href: { default: null, rendered: false },
      name: { default: 'File', rendered: false },
      size: { default: 0, rendered: false },
      format: { default: '', rendered: false },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="file"]',
        getAttrs: (el) => ({
          href: el.querySelector('a')?.getAttribute('href'),
          name: el.dataset.name || el.textContent.trim(),
          size: Number(el.dataset.size) || 0,
          format: el.dataset.format || '',
        }),
      },
    ]
  },
  renderHTML({ node }) {
    const { href, name, size, format } = node.attrs
    const meta = [format.toUpperCase(), formatBytes(size), 'Download'].filter(Boolean).join(' · ')
    return [
      'div',
      { 'data-type': 'file', 'data-name': name, 'data-size': String(size || ''), 'data-format': format },
      [
        'a',
        mergeAttributes({ href, class: 'file-card', target: '_blank', rel: 'noopener noreferrer' }),
        ['span', { class: 'file-card-icon' }, (format || 'file').slice(0, 4)],
        ['span', { class: 'file-card-body' }, ['span', { class: 'file-card-name' }, name], ['span', { class: 'file-card-meta' }, meta]],
      ],
    ]
  },
  addCommands() {
    return {
      setFileAttachment:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    }
  },
})

export function buildExtensions({ upload } = {}) {
  return [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] },
      link: {
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      },
    }),
    TextStyleKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight.configure({ multicolor: true }),
    TableKit.configure({ table: { resizable: true } }),
    BlogImage.configure({ upload }),
    BlogVideo.configure({ upload }),
    FileAttachment,
    Youtube.configure({ nocookie: true, modestBranding: true, width: 640, height: 360 }),
    Placeholder.configure({ placeholder: 'Start writing your article… (drop or paste images straight in)' }),
    CharacterCount,
  ]
}
