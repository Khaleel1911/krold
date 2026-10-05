import CountUp from './CountUp'

export default function CenterBadge({ count, label, className = '' }) {
  return (
    <div
      className={`relative flex h-56 w-56 shrink-0 flex-col items-center justify-center rounded-full border border-primary-200/70 dark:border-primary-400/30 bg-white/80 dark:bg-neutral-900/80 shadow-2xl shadow-primary-200/40 dark:shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-200 dark:border-white/10" />
      <p className="text-4xl font-bold text-black dark:text-white sm:text-5xl">
        <CountUp value={count} />
        <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">+</span>
      </p>
      <p className="mt-2 text-sm font-medium text-black/60 dark:text-white/60">{label}</p>
    </div>
  )
}
