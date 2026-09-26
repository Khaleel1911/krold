import { Link } from 'react-router-dom'
import ServiceIcon from '../icons/ServiceIcons'

// Every service card is a link placed into a named `.svc-bento` grid area.
export function CardShell({ service, area, cardRef, className = '', children }) {
  return (
    <Link
      to={`/services#${service.slug}`}
      ref={cardRef}
      style={{ gridArea: area }}
      className={`svc-card group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-[translate,box-shadow,filter] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 ${className}`}
    >
      {children}
    </Link>
  )
}

export function IconBadge({ name, className = '' }) {
  return (
    <span
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${className}`}
    >
      <ServiceIcon name={name} className="h-5 w-5" />
    </span>
  )
}

export function CardText({ service, onDark = false, large = false, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <h3
        className={`font-semibold leading-tight ${large ? 'text-2xl sm:text-3xl' : 'text-lg'} ${
          onDark ? 'text-white' : 'text-black dark:text-white'
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${large ? 'sm:text-base' : ''} ${
          onDark ? 'text-white/70' : 'text-black/60 dark:text-white/60'
        }`}
      >
        {service.short}
      </p>
    </div>
  )
}

export function Chips({ items, className = '' }) {
  return (
    <div className="relative mt-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>
          {item}
        </span>
      ))}
    </div>
  )
}

export function LearnMore({ className = '' }) {
  return (
    <span className={`relative mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold ${className}`}>
      Learn more
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
