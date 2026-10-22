import LoginForm from '../../../components/admin/LoginForm'
import { isAuthConfigured } from '../../../lib/blog/auth'

export const metadata = {
  title: 'Sign in | Krold Mfins Admin',
  robots: { index: false, follow: false },
}

export default async function Page({ searchParams }) {
  const { next } = await searchParams
  // Only same-site paths, so the login can't be used to bounce visitors elsewhere.
  const target = typeof next === 'string' && next.startsWith('/admin') ? next : '/admin'
  return <LoginForm next={target} configured={isAuthConfigured()} />
}
