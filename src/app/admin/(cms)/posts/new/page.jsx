import PostEditor from '../../../../../components/admin/PostEditor'
import { isCloudinaryConfigured } from '../../../../../lib/blog/cloudinary'
import { requireAdminPage } from '../../../../../lib/blog/session'

export default async function Page() {
  await requireAdminPage()
  return <PostEditor initialPost={null} cloudinary={isCloudinaryConfigured()} />
}
