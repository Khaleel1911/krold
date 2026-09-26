import { CardShell, IconBadge, CardText, LearnMore } from './CardParts'

const ENTRIES = [
  ['Fixed Deposit', 'FD'],
  ['Recurring Deposit', 'RD'],
  ['Public Provident Fund', 'PPF'],
  ['National Savings Cert.', 'NSC'],
  ['Post Office Schemes', 'POST'],
]

// A stitched passbook, one line per scheme.
function Passbook() {
  return (
    <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-amber-200/70 transition-transform duration-500 group-hover:-rotate-1 dark:bg-white/5 dark:ring-white/10">
      <div className="absolute inset-y-0 left-3 border-l-2 border-dashed border-amber-300/70 dark:border-amber-200/20" />
      <div className="flex items-center justify-between border-b border-amber-100 py-2 pl-6 pr-3 dark:border-white/10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800/80 dark:text-amber-200/70">Passbook</span>
        <span className="text-[10px] font-semibold text-black/40 dark:text-white/40">Tax-efficient</span>
      </div>
      <ul>
        {ENTRIES.map(([name, code]) => (
          <li
            key={code}
            className="flex items-center gap-2 border-b border-amber-100/80 py-1.5 pl-6 pr-3 text-[11px] last:border-0 dark:border-white/5"
          >
            <span className="w-9 shrink-0 font-bold text-amber-700 dark:text-amber-300">{code}</span>
            <span className="truncate text-black/60 dark:text-white/60">{name}</span>
            <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 dark:bg-secondary-500/20 dark:text-secondary-400">
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2.5 6.2 5 8.5 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SavingsCard({ service, cardRef }) {
  return (
    <CardShell
      service={service}
      area="sav"
      cardRef={cardRef}
      className="bg-[#fdf6e9] ring-1 ring-amber-200/60 hover:shadow-2xl hover:shadow-amber-200/50 dark:bg-[#1f1a10] dark:ring-amber-300/10 dark:hover:shadow-black/40 sm:flex-row sm:items-stretch sm:gap-5"
    >
      <div className="relative flex flex-1 flex-col">
        <IconBadge name={service.icon} className="bg-amber-400 text-amber-950 shadow-md shadow-amber-200 dark:shadow-black/30" />
        <CardText service={service} className="mt-4" />
        <LearnMore className="text-amber-800 dark:text-amber-300" />
      </div>
      <div className="relative mt-4 sm:mt-0 sm:w-[48%] sm:shrink-0">
        <Passbook />
      </div>
    </CardShell>
  )
}
