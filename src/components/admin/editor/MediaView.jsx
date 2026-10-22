'use client'

import { useRef, useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import { LuAlignCenter, LuAlignLeft, LuAlignRight, LuRefreshCw, LuTrash2 } from 'react-icons/lu'
import { pickFiles } from '../upload'

const PRESETS = [25, 50, 75, 100]
const ALIGNS = [
  { value: 'left', icon: LuAlignLeft, label: 'Float left, text wraps on the right' },
  { value: 'center', icon: LuAlignCenter, label: 'Centre' },
  { value: 'right', icon: LuAlignRight, label: 'Float right, text wraps on the left' },
]
const MIN_WIDTH = 15

function ToolButton({ active, label, onClick, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs font-semibold transition-colors ${
        active ? 'bg-primary-500 text-white' : 'text-white/80 hover:bg-white/15 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

// The editor view for images and videos: the same <figure> the site renders, plus a
// toolbar and resize handles while it's selected.
export default function MediaView({ node, updateAttributes, deleteNode, selected, editor, extension }) {
  const { src, alt, width, align, caption } = node.attrs
  const isVideo = node.type.name === 'video'
  const figureRef = useRef(null)
  const [liveWidth, setLiveWidth] = useState(null)
  const [replacing, setReplacing] = useState(false)
  const editable = editor.isEditable
  const shown = liveWidth ?? width

  const startResize = (e, side) => {
    e.preventDefault()
    const handle = e.currentTarget
    handle.setPointerCapture(e.pointerId)
    const column = editor.view.dom.clientWidth
    const startX = e.clientX
    const startWidth = figureRef.current.offsetWidth
    // A centred figure grows on both sides, so the pointer only moves half the distance.
    const factor = (align === 'center' ? 2 : 1) * (side === 'left' ? -1 : 1)
    let next = width

    const move = (ev) => {
      const px = startWidth + (ev.clientX - startX) * factor
      next = Math.min(100, Math.max(MIN_WIDTH, Math.round((px / column) * 100)))
      setLiveWidth(next)
    }
    const end = () => {
      handle.removeEventListener('pointermove', move)
      handle.removeEventListener('pointerup', end)
      handle.removeEventListener('pointercancel', end)
      setLiveWidth(null)
      updateAttributes({ width: next })
    }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', end)
    handle.addEventListener('pointercancel', end)
  }

  const replace = async () => {
    const upload = extension.options.upload
    if (!upload) return
    const [file] = await pickFiles(isVideo ? 'video/*' : 'image/*')
    if (!file) return
    setReplacing(true)
    try {
      const result = await upload(file, isVideo ? 'video' : 'image')
      if (result) updateAttributes({ src: result.src })
    } finally {
      setReplacing(false)
    }
  }

  const active = selected && editable

  return (
    <NodeViewWrapper
      as="figure"
      ref={figureRef}
      data-type={node.type.name}
      data-align={align}
      style={shown < 100 ? { width: `${shown}%` } : undefined}
      className={`relative ${active ? 'z-10' : ''}`}
      data-drag-handle
    >
      <div className={`relative rounded-2xl ${active ? 'ring-2 ring-primary-400 ring-offset-4 ring-offset-white dark:ring-offset-neutral-900' : ''}`}>
        {isVideo ? (
          <video src={src} controls preload="metadata" playsInline className={replacing ? 'opacity-40' : ''} />
        ) : (
          <img src={src} alt={alt || ''} draggable={false} className={replacing ? 'opacity-40' : ''} />
        )}

        {active ? (
          <>
            <div className="absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-0.5 whitespace-nowrap rounded-lg bg-neutral-900/90 p-1 shadow-lg backdrop-blur">
              {PRESETS.map((p) => (
                <ToolButton key={p} active={width === p} label={`${p}% width`} onClick={() => updateAttributes({ width: p })}>
                  {p}%
                </ToolButton>
              ))}
              <span className="mx-1 h-4 w-px bg-white/20" />
              {ALIGNS.map(({ value, icon: Icon, label }) => (
                <ToolButton key={value} active={align === value} label={label} onClick={() => updateAttributes({ align: value })}>
                  <Icon className="h-4 w-4" />
                </ToolButton>
              ))}
              <span className="mx-1 h-4 w-px bg-white/20" />
              {extension.options.upload ? (
                <ToolButton label={`Replace ${isVideo ? 'video' : 'image'}`} onClick={replace}>
                  <LuRefreshCw className={`h-4 w-4 ${replacing ? 'animate-spin' : ''}`} />
                </ToolButton>
              ) : null}
              <ToolButton label="Remove" onClick={deleteNode}>
                <LuTrash2 className="h-4 w-4" />
              </ToolButton>
            </div>
            <span className="absolute bottom-2 left-2 rounded-md bg-neutral-900/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
              {shown}%
            </span>
            {['left', 'right'].map((side) => (
              <button
                key={side}
                type="button"
                aria-label="Drag to resize"
                onPointerDown={(e) => startResize(e, side)}
                className={`absolute top-1/2 h-12 w-3 -translate-y-1/2 cursor-ew-resize touch-none rounded-full border-2 border-white bg-primary-500 shadow ${
                  side === 'left' ? '-left-1.5' : '-right-1.5'
                }`}
              />
            ))}
          </>
        ) : null}
      </div>

      {active ? (
        <div className="mt-2 space-y-1.5" contentEditable={false}>
          <input
            value={caption}
            onChange={(e) => updateAttributes({ caption: e.target.value })}
            placeholder="Add a caption (optional)"
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-1.5 text-center text-sm text-black/70 outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          />
          {!isVideo ? (
            <input
              value={alt || ''}
              onChange={(e) => updateAttributes({ alt: e.target.value })}
              placeholder="Alt text — describe the image for screen readers and Google"
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs text-black/60 outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
            />
          ) : null}
        </div>
      ) : caption ? (
        <figcaption>{caption}</figcaption>
      ) : null}
    </NodeViewWrapper>
  )
}
