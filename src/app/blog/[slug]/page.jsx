import { notFound } from 'next/navigation'
import BlogPostPage from '../../../views/BlogPostPage'
import { getPublishedPostBySlug, getPublishedPosts } from '../../../lib/blog/store'
import { cldUrl } from '../../../lib/blog/utils'

export async function generateStaticParams() {
  return (await getPublishedPosts()).map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return { title: 'Article not found | Krold Mfins' }
  const image = post.coverImage?.url ? cldUrl(post.coverImage.url, 'f_jpg,q_auto,c_fill,w_1200,h_630') : undefined
  return {
    title: `${post.title} | Krold Mfins`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: image ? [image] : undefined,
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const posts = await getPublishedPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  // Same category first, then the most recent of the rest.
  const related = posts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category))
    .slice(0, 3)
    .map(({ content: _content, ...rest }) => rest)

  return <BlogPostPage post={post} related={related} />
}
