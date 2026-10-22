import BlogCover from './BlogCover'
import { formatDate, readingTime } from '../../lib/blog/utils'

export function PostMeta({ post, className = '' }) {
  const minutes = post.readingTime ?? readingTime(post.content)
  const date = post.publishedAt || post.updatedAt
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-black/55 dark:text-white/55 ${className}`}>
      {post.author ? <span className="font-medium text-black/75 dark:text-white/75">{post.author}</span> : null}
      {post.author && date ? <span aria-hidden="true">·</span> : null}
      {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
      <span aria-hidden="true">·</span>
      <span>{minutes} min read</span>
    </p>
  )
}

// The article itself, used by the public post page and by the admin preview.
export default function BlogArticle({ post }) {
  return (
    <article>
      <header className="mx-auto max-w-3xl">
        {post.category ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            {post.category}
          </p>
        ) : null}
        <h1 className="mt-4 text-3xl font-semibold leading-[1.15] text-balance text-black dark:text-white sm:text-4xl lg:text-[2.75rem]">
          {post.title || 'Untitled post'}
        </h1>
        {post.excerpt ? (
          <p className="mt-5 text-lg leading-relaxed text-black/65 dark:text-white/65">{post.excerpt}</p>
        ) : null}
        <PostMeta post={post} className="mt-6" />
      </header>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-primary-100/70 aspect-[16/9] dark:border-white/10">
        <BlogCover post={post} width={1600} />
      </div>

      <div className="blog-prose mx-auto mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content || '' }} />

      {post.disclaimer || post.tags?.length ? (
        <footer className="mx-auto mt-12 max-w-3xl space-y-6">
          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-primary-100 bg-primary-50/60 px-3 py-1 text-xs font-medium text-primary-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-primary-300"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}
          {post.disclaimer ? (
            <aside className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-5 text-xs leading-relaxed text-black/55 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/50">
              <p className="mb-1.5 font-semibold uppercase tracking-[0.14em] text-black/65 dark:text-white/60">Disclaimer</p>
              {post.disclaimer}
            </aside>
          ) : null}
        </footer>
      ) : null}
    </article>
  )
}
