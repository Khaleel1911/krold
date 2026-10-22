import { deletePost, getPostById, updatePost } from '../../../../../lib/blog/store'
import { handleError, jsonError, readJson, requireAdmin } from '../../../../../lib/blog/api'

// GET    /api/admin/posts/:id  — one post with its content
// PATCH  /api/admin/posts/:id  — update any fields, including { status } to publish or hide
// DELETE /api/admin/posts/:id  — delete the post
export async function GET(request, { params }) {
  const { error } = await requireAdmin(request)
  if (error) return error
  const { id } = await params
  try {
    const post = await getPostById(id)
    return post ? Response.json({ post }) : jsonError('Post not found.', 404)
  } catch (err) {
    return handleError(err)
  }
}

export async function PATCH(request, { params }) {
  const { error } = await requireAdmin(request)
  if (error) return error
  const { id } = await params
  const body = await readJson(request)
  if (!body) return jsonError('Invalid request body.')
  try {
    const post = await updatePost(id, body)
    return post ? Response.json({ post }) : jsonError('Post not found.', 404)
  } catch (err) {
    return handleError(err)
  }
}

export async function DELETE(request, { params }) {
  const { error } = await requireAdmin(request)
  if (error) return error
  const { id } = await params
  try {
    const post = await deletePost(id)
    return post ? Response.json({ ok: true }) : jsonError('Post not found.', 404)
  } catch (err) {
    return handleError(err)
  }
}
