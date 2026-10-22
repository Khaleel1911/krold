import 'server-only'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySessionToken } from './auth'
import { ValidationError } from './store'

export const jsonError = (message, status = 400) => Response.json({ error: message }, { status })

// Every admin route checks the session itself — proxy.js only redirects pages — and
// changes are only accepted from this site's own pages.
export async function requireAdmin(request) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const session = await verifySessionToken(token)
  if (!session) return { error: jsonError('Your session has expired. Please sign in again.', 401) }

  if (request.method !== 'GET') {
    const origin = request.headers.get('origin')
    if (origin && origin !== new URL(request.url).origin) return { error: jsonError('Cross-site request blocked.', 403) }
  }
  return { session }
}

export function handleError(err) {
  if (err instanceof ValidationError) return jsonError(err.message, 422)
  console.error('[blog-admin]', err)
  return jsonError(err?.message || 'Something went wrong.', 500)
}

export async function readJson(request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}
