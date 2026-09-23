import { useRef, useState } from 'react'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import ContactIcon from './icons/ContactIcons'
import { CONTACT_INFO as CONTACT_DETAILS } from '../data/contactInfo'

// The share link Google gives you (`/maps?cid=...&source=embed`) sets
// X-Frame-Options: SAMEORIGIN and refuses to load in a third-party iframe.
// The `/maps/embed?pb=...` endpoint (what `output=embed` redirects to) is the
// one actually meant for embedding, so we use its resolved form directly.
const MAP_SRC = 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s17107091593126190035'

const CONTACT_INFO = [
  { icon: 'phone', label: 'Call us', value: CONTACT_DETAILS.phoneDisplay, href: CONTACT_DETAILS.phoneHref },
  { icon: 'mail', label: 'Email us', value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
  { icon: 'pin', label: 'Visit us', value: CONTACT_DETAILS.address, href: null },
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
    <section id="contact" ref={sectionRef} className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-primary-200 dark:border-primary-400/30 bg-primary-50 dark:bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Get in Touch
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-black dark:text-white sm:text-4xl">
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
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary-100/60 dark:border-white/10">
              <iframe
                title="Krold Mfins office location"
                src={MAP_SRC}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[320px] w-full grayscale-[15%] dark:grayscale-[40%] dark:contrast-125 dark:invert-[0.92] dark:hue-rotate-180"
              />
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
