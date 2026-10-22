'use client'

import { useState } from 'react'
import { LuLock } from 'react-icons/lu'
import logo from '../../assets/logo.png'
import { Button } from './ui'
import { INPUT, LABEL, PANEL } from './client'

export default function LoginForm({ next, configured }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not sign in.')
      window.location.href = next
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src={logo.src} alt="Krold Mfins" className="h-11 w-auto" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">Blog admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-black dark:text-white">Sign in to continue</h1>
        </div>

        <form onSubmit={submit} className={`${PANEL} space-y-4 p-6 shadow-sm`}>
          {!configured ? (
            <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              Admin login isn&apos;t set up yet. Add <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code> and{' '}
              <code>ADMIN_SESSION_SECRET</code> to the environment.
            </p>
          ) : null}
          <label className="block">
            <span className={LABEL}>Username</span>
            <input className={INPUT} autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </label>
          <label className="block">
            <span className={LABEL}>Password</span>
            <input
              className={INPUT}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error ? <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p> : null}
          <Button type="submit" variant="primary" icon={LuLock} loading={loading} className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          <a href="/" className="text-black/50 hover:text-primary-600 dark:text-white/50 dark:hover:text-primary-400">
            ← Back to the website
          </a>
        </p>
      </div>
    </main>
  )
}
