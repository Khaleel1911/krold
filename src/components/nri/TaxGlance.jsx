import { CARD, SectionHeading } from './parts'
import { AS_OF, RESIDENCY_TESTS, TAX_RATES, TAX_YEAR } from '../../data/nri'

export default function TaxGlance() {
  return (
    <section id="tax" className="scroll-mt-20 border-t border-black/5 bg-primary-50/40 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Tax at a glance"
            intro="Tax is deducted at source on most NRI income in India. Knowing the rates up front means no surprises when you redeem."
          >
            What you keep, <em className="text-primary-600 dark:text-primary-400">after tax</em>
          </SectionHeading>
          <p
            data-reveal
            className="rounded-full border border-secondary-300 bg-white px-4 py-1.5 text-xs font-semibold text-secondary-700 dark:border-secondary-500/40 dark:bg-transparent dark:text-secondary-400"
          >
            Rates for {TAX_YEAR}, checked {AS_OF}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TAX_RATES.map((card) => (
            <article key={card.title} data-reveal className={`${CARD} flex flex-col bg-white p-6 dark:bg-white/[0.03]`}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                {card.title}
              </h3>
              <dl className="mt-5 space-y-4">
                {card.lines.map((line) => (
                  <div key={line.label}>
                    <dd className="font-display text-4xl leading-none text-primary-600 dark:text-primary-400">{line.value}</dd>
                    <dt className="mt-1.5 text-sm text-black/65 dark:text-white/65">{line.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-auto pt-5 text-xs leading-relaxed text-black/50 dark:text-white/50">{card.note}</p>
            </article>
          ))}
        </div>
        <p data-reveal className="mt-4 text-xs text-black/50 dark:text-white/50">
          Surcharge, where applicable, and 4% health and education cess are added to all rates.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div data-reveal>
            <h3 className="font-display text-3xl text-black dark:text-white">Are you a non-resident for tax?</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-black/65 dark:text-white/65">
              Your status is decided afresh each tax year by the number of days you spend in India.
            </p>
            <dl className="mt-7 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
              {RESIDENCY_TESTS.map((test) => (
                <div key={test.value} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-display text-2xl text-primary-600 dark:text-primary-400">{test.value}</dt>
                  <dd className="text-[15px] leading-relaxed text-black/70 dark:text-white/70">{test.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside
            data-reveal
            className="self-start rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-8 text-white dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Avoiding double tax</p>
            <p className="mt-4 font-display text-6xl leading-none">85+</p>
            <p className="mt-2 text-lg font-semibold">countries have a tax treaty with India</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              A Double Taxation Avoidance Agreement stops the same income being taxed in both countries, usually by
              giving credit for tax paid in India. You will need a Tax Residency Certificate from where you live.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
