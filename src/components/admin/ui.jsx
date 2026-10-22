'use client'

import { useEffect, useRef, useState } from 'react'
import { LuLoaderCircle, LuX } from 'react-icons/lu'
import { STATUS_LABELS } from '../../lib/blog/utils'
import { LABEL, PANEL, INPUT, buttonClass } from './client'

export function Button({ variant = 'secondary', size = 'md', loading = false, icon: Icon, children, className = '', ...props }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      className={`${buttonClass(variant, size)} ${className}`}
    >
      {loading ? <LuLoaderCircle className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  )
}

const STATUS_STYLES = {
  published: 'bg-secondary-50 text-secondary-700 ring-secondary-200 dark:bg-secondary-500/10 dark:text-secondary-300 dark:ring-secondary-500/25',
  draft: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/25',
  hidden: 'bg-black/[0.04] text-black/60 ring-black/10 dark:bg-white/[0.06] dark:text-white/60 dark:ring-white/15',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_STYLES[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  )
}

export function Modal({ open, onClose, title, children, footer, width = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${width} ${PANEL} p-6 shadow-2xl`}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-black/50 hover:bg-black/5 dark:text-white/50 dark:hover:bg-white/10" aria-label="Close">
            <LuX className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 text-sm text-black/70 dark:text-white/70">{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  )
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', danger = false, loading, onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message}
    </Modal>
  )
}

// A small form in a dialog, replacing window.prompt: one or more text fields.
export function PromptDialog({ open, title, fields, submitLabel = 'Save', onSubmit, onClose, extra }) {
  const [values, setValues] = useState({})
  const firstRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setValues(Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ''])))
    setTimeout(() => firstRef.current?.focus(), 30)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          {extra}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="prompt-dialog-form">
            {submitLabel}
          </Button>
        </>
      }
    >
      <form
        id="prompt-dialog-form"
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}
      >
        {fields.map((field, i) => (
          <label key={field.name} className="block">
            <span className={LABEL}>{field.label}</span>
            <input
              ref={i === 0 ? firstRef : undefined}
              type={field.type || 'text'}
              value={values[field.name] ?? ''}
              placeholder={field.placeholder}
              onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
              className={INPUT}
            />
            {field.hint ? <span className="mt-1 block text-xs text-black/45 dark:text-white/45">{field.hint}</span> : null}
          </label>
        ))}
      </form>
    </Modal>
  )
}

export function Toast({ toast }) {
  if (!toast) return null
  const tone = toast.type === 'error' ? 'bg-red-600' : 'bg-neutral-900 dark:bg-white dark:text-black'
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] -translate-x-1/2" role="status" aria-live="polite">
      <div className={`rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-xl ${tone}`}>{toast.message}</div>
    </div>
  )
}
