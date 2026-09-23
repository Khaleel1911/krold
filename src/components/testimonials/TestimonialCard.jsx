import Avatar from './Avatar'

export default function TestimonialCard({ testimonial, index = 0, className = '' }) {
  return (
    <div
      className={`flex w-72 shrink-0 flex-col rounded-2xl border border-primary-100/60 dark:border-white/10 bg-white/90 dark:bg-neutral-900/90 p-5 shadow-xl shadow-primary-200/30 dark:shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary-300 dark:text-primary-500/40">
        <path d="M7.17 6C4.87 6 3 7.87 3 10.17c0 2.3 1.87 4.16 4.17 4.16.4 0 .78-.06 1.14-.16C7.92 16.1 6.32 17.5 4 18v2.5c4.5-.5 7.5-3.5 7.5-8.83V10.17C11.5 7.87 9.63 6 7.33 6h-.16Zm10 0C14.87 6 13 7.87 13 10.17c0 2.3 1.87 4.16 4.17 4.16.4 0 .78-.06 1.14-.16-.39 1.93-1.99 3.33-4.31 3.83v2.5c4.5-.5 7.5-3.5 7.5-8.83V10.17C21.5 7.87 19.63 6 17.33 6h-.16Z" />
      </svg>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-black/70 dark:text-white/70">
        {testimonial.description}
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-black/5 dark:border-white/10 pt-4">
        <Avatar name={testimonial.name} index={index} className="h-10 w-10 text-sm" />
        <div>
          <p className="text-sm font-semibold text-black dark:text-white">{testimonial.name}</p>
          <p className="text-xs text-black/50 dark:text-white/50">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  )
}
