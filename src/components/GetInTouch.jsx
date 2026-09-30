import { lazy, Suspense, useRef, useState } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import ContactIcon from './icons/ContactIcons'
import { CONTACT_INFO as CONTACT_DETAILS, OFFICES } from '../data/contactInfo'

// Leaflet is only needed for the map, so keep it out of the main bundle.
const OfficeMap = lazy(() => import('./contact/OfficeMap'))

const CONTACT_INFO = [
  { icon: 'phone', label: 'Call us', value: CONTACT_DETAILS.phoneDisplay, href: CONTACT_DETAILS.phoneHref },
  { icon: 'mail', label: 'Email us', value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
]

function Field({ label, textarea, ...props }) {
  const cls =
    'w-full rounded-xl border border-primary-100 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-500/20'
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-black/70 dark:text-white/70">{label}</span>
      {textarea ? <textarea {...props} className={`${cls} resize-none`} /> : <input {...props} className={cls} />}
    </label>
  )
}

const initialForm = { name: '', email: '', phone: '', city: '', subject: '', message: '' }

export default function GetInTouch() {
  const sectionRef = useRef(null)
  useRevealOnScroll(sectionRef, (root) => root.querySelectorAll('[data-animate]'), {
    y: 26,
    duration: 0.6,
    stagger: 0.1,
  })

  const [form, setForm] = useState(initialForm)
  // `officeId` drives the address shown; `mapFocus` is null while the map shows both offices.
  const [officeId, setOfficeId] = useState(OFFICES[0].id)
  const [mapFocus, setMapFocus] = useState(null)
  const office = OFFICES.find((o) => o.id === officeId)
  const selectOffice = (id) => {
    setOfficeId(id)
    setMapFocus(id)
  }
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send `form` to the Google Sheets integration once it's wired up.
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Let&rsquo;s talk about your{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              financial goals
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            Reach out and we&rsquo;ll get back to you within one business day.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Info + map */}
          <div data-animate className="flex flex-col gap-6">
            <div className="rounded-3xl border border-primary-100/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] p-6 sm:p-8">
              <ul className="flex flex-col gap-5">
                {CONTACT_INFO.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                      <ContactIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-sm font-medium text-black dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-black dark:text-white">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-200 dark:shadow-black/30">
                    <ContactIcon name="pin" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-black/40 dark:text-white/40">
                        Visit us
                      </p>
                      <div
                        role="group"
                        aria-label="Choose office"
                        className="inline-flex rounded-full border border-primary-100 bg-primary-50/60 p-0.5 dark:border-white/10 dark:bg-white/5"
                      >
                        {OFFICES.map((o) => (
                          <button
                            key={o.id}
                            type="button"
                            aria-pressed={o.id === officeId}
                            onClick={() => selectOffice(o.id)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                              o.id === officeId
                                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-sm'
                                : 'text-black/60 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-400'
                            }`}
                          >
                            {o.city}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                      {office.type}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-black dark:text-white">{office.address}</p>
                    <a
                      href={office.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Get directions
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3 w-3" aria-hidden="true">
                        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary-100/60 dark:border-white/10">
              <Suspense fallback={<div className="office-map h-[320px] w-full" />}>
                <OfficeMap selected={mapFocus} onSelect={selectOffice} onReset={() => setMapFocus(null)} />
              </Suspense>
            </div>
          </div>

          {/* Form */}
          <div
            data-animate
            className="rounded-3xl border border-primary-100/60 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-7 w-7">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-semibold text-black dark:text-white">Message sent</h3>
                <p className="mt-2 max-w-sm text-sm text-black/60 dark:text-white/60">
                  Thanks, {form.name.split(' ')[0] || 'there'} — we&rsquo;ll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm)
                    setSubmitted(false)
                  }}
                  className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Kolkata"
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
                <Field
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us a bit about what you're looking for..."
                  rows={5}
                  textarea
                  required
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
