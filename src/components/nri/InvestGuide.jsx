import { RingMark } from '../about/Rings'
import { CARD, Eyebrow, NriIcon, SectionHeading } from './parts'
import { ACCOUNT_ROWS, ACCOUNTS, ASSET_CLASSES, STEPS } from '../../data/nri'

export default function InvestGuide() {
  return (
    <>
      {/* ─── Where you can invest ─────────────────────────────── */}
      <section id="guide" className="scroll-mt-20 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-28">
          <SectionHeading
            eyebrow="The NRI investment guide"
            intro="Whether you are aiming for growth in equity markets or prioritising safety with deposits and bonds, it helps to know what is open to you and which account each investment runs through."
          >
            Where you can invest, and <em className="text-primary-600 dark:text-primary-400">how</em>
          </SectionHeading>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {ASSET_CLASSES.map((asset, i) => (
              <article
                key={asset.title}
                data-reveal
                className={`${CARD} flex flex-col p-7 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary-100/70 dark:hover:shadow-black/40 ${
                  i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                  <NriIcon name={asset.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl text-black dark:text-white">{asset.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/65 dark:text-white/65">{asset.text}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Accounts you can invest through">
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
          <div className="relative px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <div data-reveal className="max-w-2xl">
              <Eyebrow className="text-primary-300">It starts with the right account</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-6xl">
                NRE, NRO or <em className="text-secondary-400">FCNR?</em>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-white/65">
                The account you invest from decides how your money is taxed and how easily it can go back abroad.
              </p>
            </div>

            {/* Desktop: comparison table */}
            <div data-reveal className="mt-12 hidden md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[22%] pb-5" />
                    {ACCOUNTS.map((a) => (
                      <th key={a.key} scope="col" className="pb-5 pl-6 align-bottom font-normal">
                        <span className="block font-display text-4xl">{a.name}</span>
                        <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{a.full}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNT_ROWS.map((row) => (
                    <tr key={row.key} className="border-t border-white/10">
                      <th scope="row" className="py-5 pr-4 align-top text-sm font-semibold text-white/50">
                        {row.label}
                      </th>
                      {ACCOUNTS.map((a) => (
                        <td key={a.key} className="py-5 pl-6 align-top text-[15px] leading-relaxed text-white/85">
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
                  <p className="font-display text-3xl">{a.name}</p>
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
      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-10 lg:py-28">
        <SectionHeading eyebrow="Getting started">
          Four steps, and we handle the <em className="text-primary-600 dark:text-primary-400">paperwork</em>
        </SectionHeading>
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} data-reveal className="border-t-2 border-primary-200 pt-6 dark:border-white/15">
              <p className="font-display text-5xl leading-none text-primary-500/70 dark:text-primary-400/70">
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
