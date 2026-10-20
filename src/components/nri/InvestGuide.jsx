import { RingMark } from '../about/Rings'
import { Accent, CARD, Eyebrow, NriIcon, SectionHeading } from './parts'
import { ACCOUNT_ROWS, ACCOUNTS, ASSET_CLASSES, STEPS } from '../../data/nri'

export default function InvestGuide() {
  return (
    <>
      {/* ─── Where you can invest ─────────────────────────────── */}
      <section id="guide" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 pb-12 lg:px-10">
          <SectionHeading
            split
            eyebrow="The NRI investment guide"
            intro="Whether you are aiming for growth in equity markets or prioritising safety with deposits and bonds, it helps to know what is open to you and which account each investment runs through."
          >
            Where you can invest, and <Accent>how</Accent>
          </SectionHeading>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {ASSET_CLASSES.map((asset, i) => (
              <article
                key={asset.title}
                data-reveal
                className={`${CARD} flex flex-col p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary-100/70 dark:hover:shadow-black/40 ${
                  i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                    <NriIcon name={asset.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-black dark:text-white">{asset.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{asset.text}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Accounts you can invest through">
                  {asset.route.map((r) => (
                    <li
                      key={r}
                      className="rounded-md border border-primary-200 px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-primary-700 dark:border-primary-400/30 dark:text-primary-300"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Accounts ─────────────────────────────────────────── */}
      <section id="accounts" className="scroll-mt-20 px-3 sm:px-5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0b1826] text-white ring-1 ring-white/5 lg:rounded-[2.5rem]">
          <RingMark
            count={4}
            from="var(--color-primary-500)"
            to="var(--color-secondary-500)"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.07]"
          />
          {/* Kept compact so the whole comparison fits on one laptop screen. */}
          <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-10">
            <div data-reveal className="lg:flex lg:items-end lg:justify-between lg:gap-12">
              <div>
                <Eyebrow className="text-primary-300">It starts with the right account</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  NRE, NRO or <span className="text-secondary-400">FCNR?</span>
                </h2>
              </div>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65 lg:mt-0">
                The account you invest from decides how your money is taxed and how easily it can go back abroad.
              </p>
            </div>

            {/* Desktop: comparison table */}
            <div data-reveal className="mt-8 hidden md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[20%] pb-3" />
                    {ACCOUNTS.map((a) => (
                      <th key={a.key} scope="col" className="pb-3 pl-6 align-bottom font-normal">
                        <span className="block text-2xl font-semibold">{a.name}</span>
                        <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{a.full}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNT_ROWS.map((row) => (
                    <tr key={row.key} className="border-t border-white/10">
                      <th scope="row" className="py-3 pr-4 align-top text-sm font-semibold text-white/50">
                        {row.label}
                      </th>
                      {ACCOUNTS.map((a) => (
                        <td key={a.key} className="py-3 pl-6 align-top text-[15px] leading-snug text-white/85">
                          {a.rows[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: one card per account */}
            <div className="mt-10 space-y-4 md:hidden">
              {ACCOUNTS.map((a) => (
                <div key={a.key} data-reveal className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-2xl font-semibold">{a.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{a.full}</p>
                  <dl className="mt-5 space-y-4">
                    {ACCOUNT_ROWS.map((row) => (
                      <div key={row.key}>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-white/45">{row.label}</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-white/85">{a.rows[row.key]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Steps ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-10">
        <SectionHeading eyebrow="Getting started">
          Four steps, and we handle the <Accent>paperwork</Accent>
        </SectionHeading>
        <ol className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} data-reveal className="border-t-2 border-primary-200 pt-5 dark:border-white/15">
              <p className="text-4xl font-semibold leading-none text-primary-500/70 dark:text-primary-400/70">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
