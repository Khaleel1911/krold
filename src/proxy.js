import { NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from './lib/blog/auth'

// Sends signed-out visitors of the admin pages to the login screen. The admin API routes
// check the session themselves (see lib/blog/api.js).
export async function proxy(request) {
  const { pathname, search } = request.nextUrl
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)

  if (pathname === '/admin/login') {
    return session ? NextResponse.redirect(new URL('/admin', request.url)) : NextResponse.next()
  }
  if (!session) {
    const login = new URL('/admin/login', request.url)
    login.searchParams.set('next', pathname + search)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
