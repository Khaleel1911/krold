import { createPost, listAllPosts } from '../../../../lib/blog/store'
import { handleError, jsonError, readJson, requireAdmin } from '../../../../lib/blog/api'

// GET  /api/admin/posts  — every post, newest edit first (content left out)
// POST /api/admin/posts  — create a post
export async function GET(request) {
  const { error } = await requireAdmin(request)
  if (error) return error
  try {
    const posts = await listAllPosts()
    return Response.json({ posts: posts.map(({ content: _content, ...post }) => post) })
  } catch (err) {
    return handleError(err)
  }
}

export async function POST(request) {
  const { error } = await requireAdmin(request)
  if (error) return error
  const body = await readJson(request)
  if (!body) return jsonError('Invalid request body.')
  try {
    return Response.json({ post: await createPost(body) }, { status: 201 })
  } catch (err) {
    return handleError(err)
  }
}
