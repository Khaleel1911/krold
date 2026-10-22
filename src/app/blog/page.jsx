import BlogPage from '../../views/BlogPage'
import { getPublishedPosts } from '../../lib/blog/store'

export const metadata = {
  title: 'Blog | Krold Mfins',
  description: 'Practical reads on investing, saving and financial planning from the Krold Mfins team.',
}

export default async function Page() {
  // The list doesn't need article bodies, so they stay on the server.
  const posts = (await getPublishedPosts()).map(({ content: _content, ...post }) => post)
  return <BlogPage posts={posts} />
}
