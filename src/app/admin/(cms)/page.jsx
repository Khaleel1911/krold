import Dashboard from '../../../components/admin/Dashboard'
import { listAllPosts } from '../../../lib/blog/store'
import { isCloudinaryConfigured } from '../../../lib/blog/cloudinary'
import { requireAdminPage } from '../../../lib/blog/session'

export default async function Page() {
  await requireAdminPage()
  let posts = []
  let loadError = null
  try {
    posts = (await listAllPosts()).map(({ content: _content, ...post }) => post)
  } catch (err) {
    loadError = err.message
  }
  return <Dashboard posts={posts} loadError={loadError} cloudinary={isCloudinaryConfigured()} />
}
