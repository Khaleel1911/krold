import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE, verifySessionToken } from './auth'

// For admin pages: proxy.js already redirects signed-out visitors, this checks again
// next to the data.
export async function requireAdminPage() {
  const session = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
  if (!session) redirect('/admin/login')
  return session
}
