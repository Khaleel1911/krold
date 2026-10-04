import { CARD, SectionHeading, Source } from './parts'
import { DIVERSIFICATION, RECENT_CHANGES, STABILITY_POINTS } from '../../data/nri'

const BIG = 'font-display text-6xl leading-none text-primary-600 dark:text-primary-400 sm:text-7xl'
const TITLE = 'text-lg font-semibold text-black dark:text-white'
const BODY = 'mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65'

// A labelled bar whose width is the value itself, so the two rows compare honestly.
function Bar({ label, value, width, tone }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-black/60 dark:text-white/60">{label}</span>
        <span className="font-semibold tabular-nums text-black dark:text-white">{value}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-primary-100/70 dark:bg-white/10">
        <div className={`h-full rounded-full ${tone}`} style={{ width }} />
      </div>
    </div>
  )
}

function ShareRing({ share }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="10" className="stroke-primary-100/80 dark:stroke-white/10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${c * share} ${c}`}
        className="stroke-secondary-500"
      />
    </svg>
  )
}

export default function WhyIndia() {
  return (
    <section id="why-india" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Why India"
          intro="A large, young and fast-growing economy, with deepening capital markets and a stable framework for investors. Here is where things stand today."
        >
          The case for investing <em className="text-primary-600 dark:text-primary-400">back home</em>
        </SectionHeading>

        <div className="mt-12 grid gap-5 lg:grid-cols-6">
          {/* Growth */}
          <article data-reveal className={`${CARD} p-7 sm:p-9 lg:col-span-4`}>
            <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
              <div>
                <p className={BIG}>7%+</p>
                <p className="mt-2 text-sm font-medium text-black/55 dark:text-white/55">real GDP growth, FY 2025-26</p>
              </div>
              <div>
                <h3 className={TITLE}>The fastest-growing major economy</h3>
                <p className={BODY}>
                  Strong domestic demand, with manufacturing and services both expanding. At about $4.15 trillion,
                  India is the world’s sixth-largest economy by nominal GDP, and the IMF projects it will move to
                  fourth in 2027.
                </p>
              </div>
            </div>
            <div className="mt-7 space-y-4">
              <Bar label="Nominal GDP, 2026" value="$4.15T" width="90.6%" tone="bg-primary-500" />
              <Bar label="Nominal GDP, 2027 (projected)" value="$4.58T" width="100%" tone="bg-secondary-500" />
            </div>
            <Source className="mt-5">IMF World Economic Outlook, April 2026; MoSPI estimates for FY 2025-26.</Source>
          </article>

          {/* Demographics */}
          <article data-reveal className={`${CARD} flex flex-col p-7 sm:p-9 lg:col-span-2`}>
            <div className="flex items-center gap-5">
              <ShareRing share={0.65} />
              <p className={BIG}>65%</p>
            </div>
            <h3 className={`${TITLE} mt-6`}>of the population is under 35</h3>
            <p className={BODY}>
              With a median age of about 29, India has the largest young workforce in the world, and decades of
              earning and spending ahead of it.
            </p>
            <Source className="mt-auto pt-5">UN World Population Prospects 2024.</Source>
          </article>

          {/* Digital */}
          <article data-reveal className={`${CARD} p-7 sm:p-9 lg:col-span-3`}>
            <h3 className={TITLE}>A digital economy growing twice as fast</h3>
            <p className={BODY}>
              The digital economy is expanding at nearly double the pace of the wider economy, driven by payments,
              technology services and a thriving startup sector.
            </p>
            <div className="mt-6 space-y-4">
              <Bar label="Share of GDP, 2022-23" value="11.74%" width="58.7%" tone="bg-primary-500" />
              <Bar label="Share of GDP, 2029-30 (projected)" value="~20%" width="100%" tone="bg-secondary-500" />
            </div>
            <Source className="mt-5">MeitY and ICRIER, Estimation and Measurement of India’s Digital Economy.</Source>
          </article>

          {/* Markets */}
          <article data-reveal className={`${CARD} p-7 sm:p-9 lg:col-span-3`}>
            <h3 className={TITLE}>Deep, regulated capital markets</h3>
            <p className={BODY}>
              Indian households now invest through mutual funds at a scale that gives the market real depth, month
              after month.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4">
              {[
                ['₹87L Cr', 'industry assets'],
                ['₹32,297 Cr', 'monthly SIP inflow'],
                ['10 Cr+', 'active SIP accounts'],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0">
                  <dt className="whitespace-nowrap font-display text-xl leading-tight text-primary-600 dark:text-primary-400 sm:text-2xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-black/55 dark:text-white/55">{label}</dd>
                </div>
              ))}
            </dl>
            <Source className="mt-5">AMFI, August 2026.</Source>
          </article>
        </div>

        {/* Stability */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <h3 className="font-display text-3xl leading-tight text-balance text-black dark:text-white sm:text-4xl">
              A stable place to commit capital for the long term
            </h3>
            <p className="mt-4 text-[17px] leading-relaxed text-black/65 dark:text-white/65">
              India has been a continuous democracy since 1947. Its constitutional framework and independent courts
              give investors a predictable environment to plan in.
            </p>
          </div>
          <ul data-reveal className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {STABILITY_POINTS.map((p) => (
              <li key={p.title} className="border-l-2 border-secondary-500 pl-5">
                <p className="font-semibold text-black dark:text-white">{p.title}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* What changed recently */}
        <div data-reveal className="mt-20">
          <h3 className="font-display text-3xl text-black dark:text-white">What has changed for NRIs in 2026</h3>
          <ol className="mt-7 grid gap-5 md:grid-cols-3">
            {RECENT_CHANGES.map((c) => (
              <li key={c.title} className={`${CARD} p-6`}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary-600 dark:text-secondary-400">
                  {c.date}
                </p>
                <p className="mt-3 text-lg font-semibold text-black dark:text-white">{c.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Diversification */}
        <div
          data-reveal
          className="mt-8 rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-7 ring-1 ring-primary-100 dark:from-primary-500/10 dark:to-secondary-500/10 dark:ring-white/10 sm:p-10"
        >
          <h3 className="font-display text-3xl text-black dark:text-white">And it diversifies what you already hold</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {DIVERSIFICATION.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-1 h-4 w-4 shrink-0 text-secondary-500" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
