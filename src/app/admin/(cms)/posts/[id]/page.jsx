import { notFound } from 'next/navigation'
import PostEditor from '../../../../../components/admin/PostEditor'
import { getPostById } from '../../../../../lib/blog/store'
import { isCloudinaryConfigured } from '../../../../../lib/blog/cloudinary'
import { requireAdminPage } from '../../../../../lib/blog/session'

export default async function Page({ params }) {
  await requireAdminPage()
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()
  // Keyed by id, so moving from one post to another starts a fresh editor.
  return <PostEditor key={post.id} initialPost={post} cloudinary={isCloudinaryConfigured()} />
}
