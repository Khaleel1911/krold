import AdminHeader from '../../../components/admin/AdminHeader'
import { requireAdminPage } from '../../../lib/blog/session'

export const metadata = {
  title: 'Blog CMS | Krold Mfins',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }) {
  const session = await requireAdminPage()
  return (
    <div className="min-h-svh bg-neutral-50 dark:bg-neutral-950">
      <AdminHeader username={session.username} />
      {children}
    </div>
  )
}
