'use client'

import { useState } from 'react'
import { Accent, SectionHeading } from './parts'
import { FAQ_GROUPS } from '../../data/nri'

function Answer({ a }) {
  if (Array.isArray(a)) {
    return (
      <ul className="list-disc space-y-2 pl-5">
        {a.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    )
  }
  return <p>{a}</p>
}

export default function NriFaq() {
  const [active, setActive] = useState(FAQ_GROUPS[0].key)
  const group = FAQ_GROUPS.find((g) => g.key === active)

  return (
    <section id="faq" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions NRIs ask us"
            intro="Short answers to the questions that come up most. For anything specific to your situation, ask us directly."
          >
            Clear answers, <Accent>no jargon</Accent>
          </SectionHeading>

          <div data-reveal role="tablist" aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2">
            {FAQ_GROUPS.map((g) => {
              const selected = g.key === active
              return (
                <button
                  key={g.key}
                  type="button"
                  role="tab"
                  id={`faq-tab-${g.key}`}
                  aria-selected={selected}
                  aria-controls="faq-panel"
                  onClick={() => setActive(g.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                    selected
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm'
                      : 'border border-primary-100 text-black/65 hover:text-primary-600 dark:border-white/10 dark:text-white/65 dark:hover:text-primary-400'
                  }`}
                >
                  {g.label}
                  <span className={`ml-1.5 tabular-nums ${selected ? 'text-white/75' : 'text-black/35 dark:text-white/35'}`}>
                    {g.items.length}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Keyed by topic so open questions reset when the topic changes. */}
        <div
          key={active}
          id="faq-panel"
          role="tabpanel"
          aria-labelledby={`faq-tab-${active}`}
          className="min-w-0 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10"
        >
          {group.items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[17px] font-semibold text-black transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:text-white dark:hover:text-primary-400 [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-1 h-5 w-5 shrink-0 text-primary-500 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="max-w-[62ch] pb-6 text-[15px] leading-[1.75] text-black/70 dark:text-white/70">
                <Answer a={item.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
