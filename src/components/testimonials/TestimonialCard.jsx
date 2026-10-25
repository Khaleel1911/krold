import Avatar from './Avatar'

// Bubbles alternate by index: a plain white one, then one filled with the brand gradient.
// The gradient uses the dark end of both ramps so white text stays readable on it, and runs
// left to right so the tail (a flat colour) matches the bubble's left edge.
const TONES = {
  plain: {
    bubble: 'bg-white dark:bg-neutral-900',
    tail: 'bg-white dark:bg-neutral-900',
    body: 'text-black/70 dark:text-white/70',
    stars: 'text-secondary-500',
  },
  gradient: {
    bubble: 'bg-gradient-to-r from-primary-700 to-secondary-700',
    tail: 'bg-primary-700',
    body: 'text-white',
    stars: 'text-white',
  },
}

const STAR = 'M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z'

// A speech bubble holding the quote, with whoever said it credited underneath its tail.
export default function TestimonialCard({ testimonial, index = 0, className = '' }) {
  const isBusiness = testimonial.type === 'business'
  const tone = index % 2 === 1 ? TONES.gradient : TONES.plain
  return (
    <figure className={`flex w-72 shrink-0 flex-col ${className}`}>
      {/* The shadow is a filter so it follows the tail as well as the bubble. */}
      <div className="relative flex flex-1 flex-col drop-shadow-[0_10px_18px_rgb(39_116_157/0.16)] dark:drop-shadow-[0_10px_18px_rgb(0_0_0/0.45)]">
        <blockquote className={`flex flex-1 flex-col rounded-3xl rounded-bl-none p-6 ${tone.bubble}`}>
          <p className={`flex-1 text-sm leading-relaxed ${tone.body}`}>{testimonial.description}</p>
          <div className={`mt-5 flex gap-0.5 ${tone.stars}`} role="img" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((n) => (
              <svg key={n} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d={STAR} />
              </svg>
            ))}
          </div>
        </blockquote>
        <span className={`absolute left-0 top-full -mt-px h-5 w-6 [clip-path:polygon(0_0,100%_0,0_100%)] ${tone.tail}`} aria-hidden="true" />
      </div>

      <figcaption className="mt-3 flex items-center gap-3 pl-8">
        <Avatar name={isBusiness ? testimonial.name : undefined} index={index} className="h-10 w-10 text-sm" />
        <div className="min-w-0">
          {/* Business owners: name, then company · location. Professionals: profession, then location. */}
          <p className="text-sm font-semibold text-black dark:text-white">
            {isBusiness ? testimonial.name : testimonial.profession}
          </p>
          <p className="flex flex-wrap items-center gap-x-1.5 text-xs text-black/55 dark:text-white/55">
            {isBusiness && (
              <>
                <span className="font-medium text-primary-600 dark:text-primary-400">{testimonial.company}</span>
                {testimonial.location && <span className="text-black/25 dark:text-white/25" aria-hidden="true">·</span>}
              </>
            )}
            {testimonial.location && (
              <span className="inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 shrink-0" aria-hidden="true">
                  <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
                {testimonial.location}
              </span>
            )}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
