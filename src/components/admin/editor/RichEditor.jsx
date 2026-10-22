'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { LuLoaderCircle } from 'react-icons/lu'
import Toolbar from './Toolbar'
import { buildExtensions } from './extensions'
import { pickFiles, resourceTypeFor, uploadFile } from '../upload'
import { PromptDialog } from '../ui'
import { cldUrl } from '../../../lib/blog/utils'

const FILE_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.zip'

function normaliseUrl(url) {
  const value = url.trim()
  if (!value) return ''
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(value)) return value
  return `https://${value}`
}

function WordCount({ editor }) {
  const { words, characters } = useEditorState({
    editor,
    selector: ({ editor: e }) => ({ words: e.storage.characterCount.words(), characters: e.storage.characterCount.characters() }),
  })
  return (
    <span>
      {words.toLocaleString('en-IN')} words · {characters.toLocaleString('en-IN')} characters · about {Math.max(1, Math.round(words / 200))} min read
    </span>
  )
}

export default function RichEditor({ content, onChange, canUpload, notify, toolbarTop = 'top-14' }) {
  const [uploads, setUploads] = useState([])
  const [dialog, setDialog] = useState(null)
  const editorRef = useRef(null)
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // Uploads one file, showing its progress, and resolves to what the editor needs to
  // insert it — or null if it failed (the error is shown as a toast).
  const uploadRef = useRef(null)
  const insertFilesRef = useRef(null)
  useEffect(() => {
    uploadRef.current = async (file, resourceType = resourceTypeFor(file)) => {
      if (!canUpload) {
        notify('Uploads need Cloudinary. Add the Cloudinary credentials to the environment first.', 'error')
        return null
      }
      const id = `${Date.now()}-${Math.random()}`
      setUploads((list) => [...list, { id, name: file.name, progress: 0 }])
      try {
        const result = await uploadFile(file, {
          resourceType,
          onProgress: (progress) => setUploads((list) => list.map((u) => (u.id === id ? { ...u, progress } : u))),
        })
        // Images are delivered resized and in the best format for each browser.
        const src = result.resourceType === 'image' ? cldUrl(result.url, 'f_auto,q_auto,c_limit,w_2000') : result.url
        return { ...result, src }
      } catch (err) {
        notify(err.message, 'error')
        return null
      } finally {
        setUploads((list) => list.filter((u) => u.id !== id))
      }
    }

    insertFilesRef.current = async (files, pos) => {
      const results = await Promise.all(files.map((file) => uploadRef.current(file)))
      const nodes = results.filter(Boolean).map((r) => {
        if (r.resourceType === 'image') return { type: 'image', attrs: { src: r.src, alt: '' } }
        if (r.resourceType === 'video') return { type: 'video', attrs: { src: r.src } }
        return { type: 'fileAttachment', attrs: { href: r.url, name: r.name, size: r.bytes, format: r.format } }
      })
      const editor = editorRef.current
      if (!nodes.length || !editor || editor.isDestroyed) return
      if (typeof pos === 'number') editor.chain().focus().insertContentAt(pos, nodes).run()
      else editor.chain().focus().insertContent(nodes).run()
    }
  })

  const extensions = useMemo(() => buildExtensions({ upload: (file, type) => uploadRef.current(file, type) }), [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content,
    editorProps: {
      attributes: { class: 'blog-prose' },
      handleDrop: (view, event, _slice, moved) => {
        const files = Array.from(event.dataTransfer?.files || [])
        if (moved || !files.length) return false
        event.preventDefault()
        insertFilesRef.current(files, view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos)
        return true
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files || [])
        if (!files.length) return false
        insertFilesRef.current(files)
        return true
      },
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault()
          setDialog('link')
          return true
        }
        return false
      },
    },
    onUpdate: ({ editor: e }) => onChangeRef.current(e.getHTML()),
  })
  useEffect(() => {
    editorRef.current = editor
  }, [editor])

  const pick = (accept, multiple) => async () => {
    const files = await pickFiles(accept, multiple)
    if (files.length) insertFilesRef.current(files)
  }

  const applyLink = ({ url }) => {
    const href = normaliseUrl(url || '')
    const chain = editor.chain().focus()
    if (!href) chain.extendMarkRange('link').unsetLink().run()
    else if (editor.state.selection.empty && !editor.isActive('link')) {
      chain.insertContent({ type: 'text', text: url.trim(), marks: [{ type: 'link', attrs: { href } }] }).run()
    } else chain.extendMarkRange('link').setLink({ href }).run()
    setDialog(null)
  }

  const applyYoutube = ({ url }) => {
    if (!editor.chain().focus().setYoutubeVideo({ src: (url || '').trim() }).run()) {
      notify('That doesn’t look like a YouTube link. Paste the address of the video page.', 'error')
      return
    }
    setDialog(null)
  }

  if (!editor) {
    return <div className="blog-editor min-h-[560px] animate-pulse rounded-2xl border border-black/[0.07] bg-white dark:border-white/10 dark:bg-neutral-900" />
  }

  return (
    <div className="blog-editor rounded-2xl border border-black/[0.07] bg-white dark:border-white/10 dark:bg-neutral-900">
      <Toolbar
        editor={editor}
        top={toolbarTop}
        onImage={pick('image/*', true)}
        onVideo={pick('video/*', false)}
        onFile={pick(FILE_TYPES, true)}
        onYoutube={() => setDialog('youtube')}
        onLink={() => setDialog('link')}
      />

      {uploads.length ? (
        <div className="space-y-1.5 border-b border-black/[0.06] bg-primary-50/50 px-4 py-2.5 dark:border-white/10 dark:bg-primary-500/5">
          {uploads.map((u) => (
            <div key={u.id} className="flex items-center gap-3 text-xs text-black/70 dark:text-white/70">
              <LuLoaderCircle className="h-3.5 w-3.5 shrink-0 animate-spin text-primary-500" />
              <span className="w-40 truncate sm:w-64">Uploading {u.name}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <span className="block h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all" style={{ width: `${u.progress}%` }} />
              </span>
              <span className="w-9 text-right tabular-nums">{u.progress}%</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="px-5 py-8 sm:px-10 lg:px-14">
        <EditorContent editor={editor} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-b-2xl border-t border-black/[0.06] px-4 py-2.5 text-xs text-black/45 dark:border-white/10 dark:text-white/45">
        <WordCount editor={editor} />
        <span className="hidden md:inline">Tip: click an image or video to resize, align or caption it. Drag it to move it.</span>
      </div>

      <PromptDialog
        open={dialog === 'link'}
        title="Insert link"
        fields={[{ name: 'url', label: 'Web address', placeholder: 'https://… or /services', defaultValue: editor.getAttributes('link').href || '' }]}
        submitLabel="Apply"
        onSubmit={applyLink}
        onClose={() => setDialog(null)}
        extra={
          editor.isActive('link') ? (
            <button type="button" className="mr-auto text-sm font-medium text-red-600 dark:text-red-400" onClick={() => applyLink({ url: '' })}>
              Remove link
            </button>
          ) : null
        }
      />
      <PromptDialog
        open={dialog === 'youtube'}
        title="Embed a YouTube video"
        fields={[{ name: 'url', label: 'YouTube link', placeholder: 'https://www.youtube.com/watch?v=…', hint: 'Shorts and youtu.be links work too.' }]}
        submitLabel="Embed"
        onSubmit={applyYoutube}
        onClose={() => setDialog(null)}
      />
    </div>
  )
}
