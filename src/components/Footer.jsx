import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import ServiceIcon from './icons/ServiceIcons'
import ContactIcon from './icons/ContactIcons'
import SocialIcon from './icons/SocialIcons'
import { SERVICES } from '../data/services'
import { CONTACT_INFO } from '../data/contactInfo'

const QUICK_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'About Us', href: '/#about' },
  { name: 'Products & Services', href: '/services' },
  { name: 'Calculators', href: '/#calculators' },
  { name: 'Contact Us', href: '/#contact' },
]

const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Disclosure', href: '#' },
]

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1.1fr_1.2fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link to="/#home" className="inline-flex items-center rounded-lg bg-white/95 px-3 py-2">
              <img src={logo} alt="Krold Mfins Private Limited" className="h-8 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              An AMFI-registered wealth management practice helping families save wisely and invest with clarity —
              building wealth that lasts across generations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 hover:text-white"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Quick Links</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/60 transition-colors duration-200 hover:text-primary-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Our Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-primary-400"
                  >
                    <ServiceIcon name={service.icon} className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">Get in Touch</h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <ContactIcon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <a href={CONTACT_INFO.phoneHref} className="text-sm text-white/60 hover:text-primary-400">
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ContactIcon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-white/60 hover:text-primary-400">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ContactIcon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-sm text-white/60">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/40">
            Krold Mfins Private Limited is an AMFI-registered Mutual Fund Distributor. Mutual fund investments are
            subject to market risks; please read all scheme-related documents carefully before investing.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {year} Krold Mfins Private Limited. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-xs text-white/50 transition-colors duration-200 hover:text-primary-400">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
