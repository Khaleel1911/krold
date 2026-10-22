'use client'

import { useEffect, useRef, useState } from 'react'
import { useEditorState } from '@tiptap/react'
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBaseline,
  LuBetweenHorizontalStart,
  LuBetweenVerticalStart,
  LuBold,
  LuCode,
  LuGrid2X2,
  LuHighlighter,
  LuImage,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuMinus,
  LuPaperclip,
  LuQuote,
  LuRedo2,
  LuRemoveFormatting,
  LuStrikethrough,
  LuTable,
  LuTableRowsSplit,
  LuTrash2,
  LuUnderline,
  LuUndo2,
  LuVideo,
  LuYoutube,
} from 'react-icons/lu'

const FONTS = [
  { label: 'Default', value: '' },
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
]

const SIZES = ['12px', '14px', '16px', '17px', '18px', '20px', '24px', '28px', '32px', '40px', '48px']
const LINE_HEIGHTS = ['1.2', '1.5', '1.8', '2', '2.4']

const TEXT_COLORS = ['#000000', '#404040', '#737373', '#27749d', '#36a1da', '#3c8639', '#54ba4f', '#b45309', '#dc2626', '#7c3aed', '#db2777', '#ffffff']
const HIGHLIGHTS = ['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff', '#fed7aa', '#dbeef8', '#e0f3df']

function Btn({ icon: Icon, label, active, disabled, onClick, children }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg px-1.5 text-sm transition-colors disabled:opacity-35 ${
        active
          ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300'
          : 'text-black/70 hover:bg-black/[0.05] dark:text-white/70 dark:hover:bg-white/10'
      }`}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  )
}

const Divider = () => <span className="mx-1 h-5 w-px shrink-0 bg-black/10 dark:bg-white/10" />

function Select({ label, value, onChange, options, className = '' }) {
  return (
    <select
      aria-label={label}
      title={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 rounded-lg border border-black/10 bg-white px-2 text-sm text-black/80 outline-none focus:border-primary-400 dark:border-white/10 dark:bg-neutral-900 dark:text-white/80 ${className}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function ColorPicker({ icon, label, colors, value, onPick, onClear }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <Btn icon={icon} label={label} active={open} onClick={() => setOpen((o) => !o)}>
        <span className="h-1 w-3 rounded-full" style={{ background: value || 'currentColor', opacity: value ? 1 : 0.3 }} />
      </Btn>
      {open ? (
        <div className="absolute left-0 top-10 z-30 w-48 rounded-xl border border-black/10 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-neutral-900">
          <div className="grid grid-cols-6 gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(c)
                  setOpen(false)
                }}
                className={`h-6 w-6 rounded-md border border-black/10 dark:border-white/20 ${value === c ? 'ring-2 ring-primary-500 ring-offset-1' : ''}`}
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <label className="flex flex-1 items-center gap-2 text-xs text-black/60 dark:text-white/60">
              <input type="color" value={value || '#000000'} onChange={(e) => onPick(e.target.value)} className="h-7 w-9 cursor-pointer rounded border-0 bg-transparent p-0" />
              Custom
            </label>
            <button
              type="button"
              onClick={() => {
                onClear()
                setOpen(false)
              }}
              className="rounded-md px-2 py-1 text-xs font-medium text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function Toolbar({ editor, top = 'top-14', onImage, onVideo, onFile, onYoutube, onLink }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const style = e.getAttributes('textStyle')
      return {
        block: e.isActive('heading', { level: 2 })
          ? 'h2'
          : e.isActive('heading', { level: 3 })
            ? 'h3'
            : e.isActive('heading', { level: 4 })
              ? 'h4'
              : 'p',
        fontFamily: style.fontFamily || '',
        fontSize: style.fontSize || '',
        lineHeight: style.lineHeight || '',
        color: style.color || '',
        highlight: e.getAttributes('highlight').color || '',
        bold: e.isActive('bold'),
        italic: e.isActive('italic'),
        underline: e.isActive('underline'),
        strike: e.isActive('strike'),
        code: e.isActive('code'),
        link: e.isActive('link'),
        bullet: e.isActive('bulletList'),
        ordered: e.isActive('orderedList'),
        quote: e.isActive('blockquote'),
        align: ['left', 'center', 'right', 'justify'].find((a) => e.isActive({ textAlign: a })) || 'left',
        table: e.isActive('table'),
        canUndo: e.can().undo(),
        canRedo: e.can().redo(),
      }
    },
  })

  const chain = () => editor.chain().focus()
  const setBlock = (value) => {
    if (value === 'p') chain().setParagraph().run()
    else chain().setHeading({ level: Number(value.slice(1)) }).run()
  }

  return (
    <div className={`sticky ${top} z-20 rounded-t-2xl border-b border-black/[0.07] bg-white/95 backdrop-blur dark:border-white/10 dark:bg-neutral-900/95`}>
      <div className="flex flex-wrap items-center gap-0.5 p-2">
        <Btn icon={LuUndo2} label="Undo (Ctrl+Z)" disabled={!state.canUndo} onClick={() => chain().undo().run()} />
        <Btn icon={LuRedo2} label="Redo (Ctrl+Shift+Z)" disabled={!state.canRedo} onClick={() => chain().redo().run()} />
        <Divider />
        <Select
          label="Text style"
          value={state.block}
          onChange={setBlock}
          className="w-[118px]"
          options={[
            { label: 'Paragraph', value: 'p' },
            { label: 'Heading', value: 'h2' },
            { label: 'Subheading', value: 'h3' },
            { label: 'Small heading', value: 'h4' },
          ]}
        />
        <Select
          label="Font"
          value={state.fontFamily}
          onChange={(v) => (v ? chain().setFontFamily(v).run() : chain().unsetFontFamily().run())}
          className="w-[128px]"
          options={FONTS.some((f) => f.value === state.fontFamily) ? FONTS : [...FONTS, { label: 'Custom', value: state.fontFamily }]}
        />
        <Select
          label="Font size"
          value={state.fontSize}
          onChange={(v) => (v ? chain().setFontSize(v).run() : chain().unsetFontSize().run())}
          className="w-[84px]"
          options={[{ label: 'Size', value: '' }, ...SIZES.map((s) => ({ label: s.replace('px', ''), value: s })), ...(state.fontSize && !SIZES.includes(state.fontSize) ? [{ label: state.fontSize, value: state.fontSize }] : [])]}
        />
        <Select
          label="Line spacing"
          value={state.lineHeight}
          onChange={(v) => (v ? chain().setLineHeight(v).run() : chain().unsetLineHeight().run())}
          className="w-[92px]"
          options={[{ label: 'Spacing', value: '' }, ...LINE_HEIGHTS.map((s) => ({ label: s, value: s }))]}
        />
        <Divider />
        <Btn icon={LuBold} label="Bold (Ctrl+B)" active={state.bold} onClick={() => chain().toggleBold().run()} />
        <Btn icon={LuItalic} label="Italic (Ctrl+I)" active={state.italic} onClick={() => chain().toggleItalic().run()} />
        <Btn icon={LuUnderline} label="Underline (Ctrl+U)" active={state.underline} onClick={() => chain().toggleUnderline().run()} />
        <Btn icon={LuStrikethrough} label="Strikethrough" active={state.strike} onClick={() => chain().toggleStrike().run()} />
        <Btn icon={LuCode} label="Inline code" active={state.code} onClick={() => chain().toggleCode().run()} />
        <ColorPicker
          icon={LuBaseline}
          label="Text colour"
          colors={TEXT_COLORS}
          value={state.color}
          onPick={(c) => chain().setColor(c).run()}
          onClear={() => chain().unsetColor().run()}
        />
        <ColorPicker
          icon={LuHighlighter}
          label="Highlight"
          colors={HIGHLIGHTS}
          value={state.highlight}
          onPick={(c) => chain().setHighlight({ color: c }).run()}
          onClear={() => chain().unsetHighlight().run()}
        />
        <Divider />
        <Btn icon={LuAlignLeft} label="Align left" active={state.align === 'left'} onClick={() => chain().setTextAlign('left').run()} />
        <Btn icon={LuAlignCenter} label="Align centre" active={state.align === 'center'} onClick={() => chain().setTextAlign('center').run()} />
        <Btn icon={LuAlignRight} label="Align right" active={state.align === 'right'} onClick={() => chain().setTextAlign('right').run()} />
        <Btn icon={LuAlignJustify} label="Justify" active={state.align === 'justify'} onClick={() => chain().setTextAlign('justify').run()} />
        <Divider />
        <Btn icon={LuList} label="Bulleted list" active={state.bullet} onClick={() => chain().toggleBulletList().run()} />
        <Btn icon={LuListOrdered} label="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()} />
        <Btn icon={LuQuote} label="Quote" active={state.quote} onClick={() => chain().toggleBlockquote().run()} />
        <Btn icon={LuMinus} label="Divider line" onClick={() => chain().setHorizontalRule().run()} />
        <Btn icon={LuLink} label="Link (Ctrl+K)" active={state.link} onClick={onLink} />
        <Divider />
        <Btn icon={LuImage} label="Insert image" onClick={onImage} />
        <Btn icon={LuVideo} label="Upload video" onClick={onVideo} />
        <Btn icon={LuYoutube} label="Embed YouTube video" onClick={onYoutube} />
        <Btn icon={LuPaperclip} label="Attach a file (PDF, Excel, …)" onClick={onFile} />
        <Btn icon={LuTable} label="Insert table" active={state.table} onClick={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
        <Divider />
        <Btn icon={LuRemoveFormatting} label="Clear formatting" onClick={() => chain().unsetAllMarks().clearNodes().run()} />
      </div>

      {state.table ? (
        <div className="flex flex-wrap items-center gap-0.5 border-t border-black/[0.06] px-2 py-1.5 text-xs dark:border-white/10">
          <span className="mr-1 px-1 text-xs font-semibold uppercase tracking-[0.1em] text-black/45 dark:text-white/45">Table</span>
          <Btn icon={LuBetweenHorizontalStart} label="Add row below" onClick={() => chain().addRowAfter().run()}>
            <span className="text-xs">Row</span>
          </Btn>
          <Btn icon={LuBetweenVerticalStart} label="Add column to the right" onClick={() => chain().addColumnAfter().run()}>
            <span className="text-xs">Column</span>
          </Btn>
          <Btn label="Delete row" onClick={() => chain().deleteRow().run()}>
            <span className="text-xs">− Row</span>
          </Btn>
          <Btn label="Delete column" onClick={() => chain().deleteColumn().run()}>
            <span className="text-xs">− Column</span>
          </Btn>
          <Divider />
          <Btn icon={LuGrid2X2} label="Toggle header row" onClick={() => chain().toggleHeaderRow().run()}>
            <span className="text-xs">Header row</span>
          </Btn>
          <Btn icon={LuTableRowsSplit} label="Merge or split cells" onClick={() => chain().mergeOrSplit().run()}>
            <span className="text-xs">Merge/split</span>
          </Btn>
          <Divider />
          <Btn icon={LuTrash2} label="Delete table" onClick={() => chain().deleteTable().run()}>
            <span className="text-xs">Delete table</span>
          </Btn>
        </div>
      ) : null}
    </div>
  )
}
