import { Accent, CARD, SectionHeading } from './parts'
import { AS_OF, CAPITAL_GAINS, EXEMPT_INCOME, TAX_YEAR } from '../../data/nri'

const CELL = 'px-3 py-3 align-top text-sm leading-snug text-black/70 dark:text-white/70'

export default function TaxGlance() {
  return (
    <section id="tax" className="scroll-mt-20 border-t border-black/5 bg-primary-50/40 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-10">
        <SectionHeading
          split
          eyebrow="Tax at a glance"
          intro="Tax is deducted at source on most NRI income in India. Knowing the rates up front means no surprises when you redeem."
          aside={
            <p className="inline-block rounded-full border border-secondary-300 bg-white px-3 py-1 text-xs font-semibold text-secondary-700 dark:border-secondary-500/40 dark:bg-transparent dark:text-secondary-400">
              Rates for {TAX_YEAR}, checked {AS_OF}
            </p>
          }
        >
          What you keep, <Accent>after tax</Accent>
        </SectionHeading>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Capital gains */}
          <article data-reveal className={`${CARD} bg-white p-5 dark:bg-white/[0.03] sm:p-6`}>
            <h3 className="text-lg font-semibold text-black dark:text-white">Capital gains for NRIs</h3>

            <table className="mt-4 hidden w-full table-fixed border-collapse text-left sm:table">
              <thead>
                <tr className="bg-primary-50 text-sm font-semibold text-black/80 dark:bg-white/5 dark:text-white/80">
                  <th scope="col" className="w-[34%] rounded-l-xl px-3 py-2.5">Asset</th>
                  <th scope="col" className="w-[28%] px-3 py-2.5">Short term</th>
                  <th scope="col" className="rounded-r-xl px-3 py-2.5">Long term</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/10">
                {CAPITAL_GAINS.rows.map((row) => (
                  <tr key={row.asset}>
                    <th scope="row" className={`${CELL} font-medium text-black/85 dark:text-white/85`}>{row.asset}</th>
                    {row.both ? (
                      <td colSpan={2} className={CELL}>{row.both}</td>
                    ) : (
                      <>
                        <td className={CELL}>{row.short}</td>
                        <td className={CELL}>{row.long}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phones: one block per asset */}
            <dl className="mt-5 divide-y divide-black/5 dark:divide-white/10 sm:hidden">
              {CAPITAL_GAINS.rows.map((row) => (
                <div key={row.asset} className="py-4">
                  <dt className="font-semibold text-black/85 dark:text-white/85">{row.asset}</dt>
                  {row.both ? (
                    <dd className="mt-1 text-[15px] leading-relaxed text-black/70 dark:text-white/70">{row.both}</dd>
                  ) : (
                    <>
                      <dd className="mt-1 text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                        <span className="font-medium text-black/50 dark:text-white/50">Short term: </span>
                        {row.short}
                      </dd>
                      <dd className="mt-0.5 text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                        <span className="font-medium text-black/50 dark:text-white/50">Long term: </span>
                        {row.long}
                      </dd>
                    </>
                  )}
                </div>
              ))}
            </dl>

            <p className="mt-3 border-t border-black/5 pt-3 text-xs leading-relaxed text-black/50 dark:border-white/10 dark:text-white/50">
              {CAPITAL_GAINS.note} Surcharge, where applicable, and 4% health and education cess are added to all rates.
            </p>
          </article>

          <div className="grid content-start gap-4">
            <aside
              data-reveal
              className="rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-6 text-white dark:from-primary-700 dark:via-primary-600 dark:to-secondary-600"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Avoiding double tax</p>
              <div className="mt-3 flex items-center gap-4">
                <p className="text-4xl font-semibold leading-none">85+</p>
                <p className="font-semibold leading-snug">countries have a tax treaty with India</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                A Double Taxation Avoidance Agreement stops the same income being taxed in both countries, usually by
                giving credit for tax paid in India. You will need a Tax Residency Certificate from where you live.
              </p>
            </aside>

            <article data-reveal className={`${CARD} bg-white p-6 dark:bg-white/[0.03]`}>
              <h3 className="font-semibold text-black dark:text-white">Exempt income</h3>
              <ul className="mt-3 space-y-2">
                {EXEMPT_INCOME.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="mt-1 h-4 w-4 shrink-0 text-secondary-500" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
