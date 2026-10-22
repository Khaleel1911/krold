import { cookies } from 'next/headers'
import { SESSION_COOKIE, SESSION_MAX_AGE, checkCredentials, createSessionToken, isAuthConfigured } from '../../../../lib/blog/auth'
import { jsonError, readJson } from '../../../../lib/blog/api'

// Failed attempts per client, kept in memory: enough to slow down guessing on one instance.
const failures = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 8

function clientKey(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'local'
}

export async function POST(request) {
  if (!isAuthConfigured()) {
    return jsonError('Admin login is not set up. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET.', 503)
  }

  const key = clientKey(request)
  const record = failures.get(key)
  if (record && record.until > Date.now() && record.count >= MAX_FAILURES) {
    return jsonError('Too many attempts. Please wait 15 minutes and try again.', 429)
  }

  const body = await readJson(request)
  const ok = await checkCredentials(String(body?.username ?? ''), String(body?.password ?? ''))
  if (!ok) {
    const fresh = !record || record.until < Date.now()
    failures.set(key, { count: fresh ? 1 : record.count + 1, until: fresh ? Date.now() + WINDOW_MS : record.until })
    await new Promise((resolve) => setTimeout(resolve, 600))
    return jsonError('Incorrect username or password.', 401)
  }

  failures.delete(key)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, await createSessionToken(process.env.ADMIN_USERNAME), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return Response.json({ ok: true })
}
