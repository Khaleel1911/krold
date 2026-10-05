'use client'

import { useRef } from 'react'
import { TOOLS } from '../data/tools'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-6 w-6',
  'aria-hidden': true,
}

const ICONS = {
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </>
  ),
  forms: (
    <>
      <path d="M7 3h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </>
  ),
  quiz: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.6 2.3c-.8.5-1.2 1-1.2 1.9M12 16.8h.01" />
    </>
  ),
  journey: (
    <>
      <path d="M5 20V5M5 5h9l-1.5 3 1.5 3H5" />
      <path d="M10 20c1.5-2.5 4-2 5.5-4s3-1.5 3.5-1.5" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
    </>
  ),
  risk: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const EXPLORE =
  'group/btn mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-primary-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-secondary-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 dark:shadow-black/40'

// Until a tool has an href (see data/tools.js) its button is a placeholder that does nothing.
function ExploreButton({ tool }) {
  const label = `Explore ${tool.title}`
  if (!tool.href) {
    return (
      <button type="button" aria-label={label} className={EXPLORE}>
        Explore <Arrow />
      </button>
    )
  }
  return (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" aria-label={label} className={EXPLORE}>
      Explore <Arrow />
    </a>
  )
}

// Larger line drawings for the mosaic beside the tools (48px grid). `fill-[--tile]` paints a
// shape in the tile's own colour so it can sit in front of the lines behind it.
const ART = {
  bank: (
    <>
      <circle cx="24" cy="8" r="4.5" />
      <path d="M24 6.5v3M6 23l18-9 18 9H6ZM11 23v13M19 23v13M29 23v13M37 23v13M6 36h36M4 41.5h40" />
    </>
  ),
  bars: (
    <>
      <path d="M8 6v34h34" />
      <rect x="14" y="26" width="5.5" height="14" rx="1" />
      <rect x="23.5" y="17" width="5.5" height="23" rx="1" />
      <rect x="33" y="10" width="5.5" height="30" rx="1" />
    </>
  ),
  bag: (
    <>
      <path d="M17 14l-3.5-8h21L31 14M17 14h14M17 14C11 19 7 26 7 33a8 8 0 0 0 8 8h18a8 8 0 0 0 8-8c0-7-4-14-10-19" />
      <circle cx="24" cy="29" r="5.5" />
      <path d="M24 27v4" />
    </>
  ),
  calculator: (
    <>
      <path d="M15 34H8V6h20v5M13 13h9M13 19h2" />
      <rect x="18" y="14" width="22" height="28" rx="3" className="fill-[--tile]" />
      <rect x="22.5" y="18.5" width="13" height="6" rx="1" />
      <path d="M23.5 30.5h.01M29 30.5h.01M34.5 30.5h.01M23.5 36.5h.01M29 36.5h.01M34.5 36.5h.01" strokeWidth="3.2" />
    </>
  ),
  cash: (
    <>
      <g transform="rotate(-14 26 17)">
        <rect x="11" y="8" width="30" height="18" rx="2" />
        <circle cx="26" cy="17" r="4.5" />
      </g>
      <rect x="6" y="23" width="32" height="19" rx="3" className="fill-[--tile]" />
      <path d="M6 30h32M11 36.5h8" />
    </>
  ),
  monitor: (
    <>
      <rect x="5" y="7" width="38" height="26" rx="3" />
      <path d="M24 33v7M15 41h18M14 27v-5M21 27V16M28 27v-8M35 27V13" />
    </>
  ),
  piggy: (
    <>
      <path d="M10.5 28H7v-6h3.5C12 17 17.5 14 25 14c8 0 14 5 14 12 0 4-2 7-5 9v5h-5v-3h-8v3h-5v-5c-2.5-1.5-4.5-3.8-5.5-7ZM17.5 15.5 16 10l6 3.5M21 19h7M32 23.5h.01" />
      <path d="M39 24c2 0 3.5-1.2 3.5-3" />
    </>
  ),
  form: (
    <>
      <path d="M13 5h16l8 8v28a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M29 5v8h8M17 22h14M17 28h14M17 34h8" />
    </>
  ),
  shield: (
    <>
      <path d="M24 5l15 6v11c0 10-6 17-15 21-9-4-15-11-15-21V11l15-6Z" />
      <path d="M17 24l5 5 9-10" />
    </>
  ),
  quiz: (
    <>
      <path d="M8 8h32v25H23l-9 7.5V33H8V8Z" />
      <path d="M20.5 17a3.5 3.5 0 1 1 5 3.2c-1 .7-1.5 1.4-1.5 2.8M24 27.5h.01" />
    </>
  ),
  flag: (
    <>
      <path d="M12 43V6M12 8h22l-4.5 7.5L34 23H12" />
      <path d="M20 43c3-4 7-2.5 10-6s6-2.5 8-3" strokeDasharray="1 5" />
    </>
  ),
  pie: (
    <>
      <path d="M22 9a17 17 0 1 0 17 17H22V9Z" />
      <path d="M28 4a16 16 0 0 1 16 16H28V4Z" />
    </>
  ),
}

// Three columns of tiles, each starting at a different height so the rows don't line up.
const MOSAIC = [
  { shift: '-mt-10', icons: ['bank', 'calculator', 'piggy', 'quiz'] },
  { shift: 'mt-12', icons: ['bars', 'bag', 'cash', 'shield'] },
  { shift: '-mt-24', icons: ['flag', 'form', 'monitor', 'pie'] },
]

// Decorative wall of finance icons, tilted and fading out at the edges.
function ToolsMosaic() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[300px] w-full max-w-lg overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_78%)] sm:h-[380px]"
    >
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] gap-4 sm:gap-5">
        {MOSAIC.map((column, c) => (
          <div key={c} className={`flex flex-col gap-4 sm:gap-5 ${column.shift}`}>
            {column.icons.map((name, i) => (
              <div
                key={name}
                className={`flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-transparent bg-white text-neutral-900 shadow-lg shadow-primary-200/40 [--tile:#fff] dark:bg-neutral-900 dark:text-white dark:shadow-black/40 dark:[--tile:var(--color-neutral-900)] sm:h-32 sm:w-32 ${
                  (c + i) % 2 ? 'border-b-secondary-400 border-l-secondary-400' : 'border-b-primary-400 border-l-primary-400'
                }`}
              >
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 sm:h-[5.25rem] sm:w-[5.25rem]">
                  {ART[name]}
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WebsiteTools() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useRevealOnScroll(sectionRef, (root) => root.querySelectorAll('[data-animate]'), { y: 24, duration: 0.6 })
  useRevealOnScroll(sectionRef, () => cardRefs.current, { y: 30, duration: 0.6, stagger: 0.08, delay: 0.1 })

  return (
    <section id="tools" ref={sectionRef} className="relative overflow-x-clip py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Tools to plan with{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              confidence
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            Handy resources to help you explore, understand and stay on top of your investments.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-animate>
            <ToolsMosaic />
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-10">
            {TOOLS.map((tool, i) => (
              <li key={tool.id} ref={(el) => (cardRefs.current[i] = el)} className="group flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-1 ring-primary-100 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:text-white group-hover:ring-transparent dark:bg-primary-500/10 dark:text-primary-300 dark:ring-white/10 sm:h-14 sm:w-14">
                  <svg {...iconProps}>{ICONS[tool.icon]}</svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold leading-tight text-black dark:text-white sm:text-base">{tool.title}</h3>
                  <ExploreButton tool={tool} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
