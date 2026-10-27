import { Eyebrow } from '../components/nri/parts'
import { LEGAL_PAGES } from '../data/legal'

const BODY = 'text-base leading-relaxed text-black/70 dark:text-white/70'
const LINK = 'font-medium text-primary-600 underline-offset-4 hover:underline dark:text-primary-400'

function Block({ block }) {
  if (block.ul) {
    return (
      <ul className={`flex list-disc flex-col gap-3 pl-5 marker:text-primary-500 ${BODY}`}>
        {block.ul.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
  if (block.ol) {
    return (
      <ol className={`flex list-decimal flex-col gap-3 pl-5 marker:font-semibold marker:text-primary-500 ${BODY}`}>
        {block.ol.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    )
  }
  if (block.facts) {
    return (
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
        {block.facts.map(([label, value]) => (
          <div key={label} className="bg-white px-5 py-4 dark:bg-neutral-900">
            <dt className="text-xs font-semibold uppercase tracking-wide text-black/50 dark:text-white/50">{label}</dt>
            <dd className="mt-1 text-lg font-semibold text-black dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
    )
  }
  return (
    <p className={BODY}>
      {block.p}
      {block.email && (
        <>
          {' '}
          <a href={`mailto:${block.email}`} className={LINK}>
            {block.email}
          </a>
          .
        </>
      )}
    </p>
  )
}

// One layout for the Privacy Policy, Terms and Disclosure pages; the text lives in data/legal.js.
export default function LegalPage({ slug }) {
  const page = LEGAL_PAGES[slug]
  return (
    <main>
      <section className="relative border-b border-black/5 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary-50),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(54,161,218,0.08),transparent_55%)]" />
        <div className="mx-auto max-w-3xl px-5 py-12 lg:py-16">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-balance text-black dark:text-white sm:text-5xl">
            {page.title}
          </h1>
          {page.intro && <p className={`mt-5 ${BODY}`}>{page.intro}</p>}
        </div>
      </section>

      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-12 lg:py-16">
        {page.sections.map((section, i) => (
          <section key={section.heading ?? i} className="flex flex-col gap-4">
            {section.heading && (
              <h2 className="text-xl font-semibold text-black dark:text-white sm:text-2xl">{section.heading}</h2>
            )}
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
