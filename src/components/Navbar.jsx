import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact Us', href: '#contact' },
  { name: 'Calculators', href: '#calculators' },
]

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef(null)
  const logoRef = useRef(null)
  const desktopItemsRef = useRef([])
  const mobilePanelRef = useRef(null)
  const mobileItemsRef = useRef([])
  const barsRef = useRef([])

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, ...desktopItemsRef.current], { opacity: 0, y: -16 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(logoRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(
          desktopItemsRef.current,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          '-=0.35',
        )
    }, navRef)
    return () => ctx.revert()
  }, [])

  // Scroll shrink / glass effect
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 8
      setScrolled((prev) => {
        if (prev !== isScrolled) {
          gsap.to(navRef.current, {
            paddingTop: isScrolled ? 10 : 20,
            paddingBottom: isScrolled ? 10 : 20,
            duration: 0.35,
            ease: 'power2.out',
          })
        }
        return isScrolled
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hamburger <-> close morph
  useEffect(() => {
    const [top, mid, bottom] = barsRef.current
    if (!top || !mid || !bottom) return
    const tl = gsap.timeline({ defaults: { duration: 0.35, ease: 'power3.inOut' } })
    if (menuOpen) {
      tl.to(top, { y: 6, rotate: 45 }, 0)
        .to(bottom, { y: -6, rotate: -45 }, 0)
        .to(mid, { opacity: 0, scale: 0 }, 0)
    } else {
      tl.to(top, { y: 0, rotate: 0 }, 0)
        .to(bottom, { y: 0, rotate: 0 }, 0)
        .to(mid, { opacity: 1, scale: 1 }, 0)
    }
  }, [menuOpen])

  // Mobile panel open/close
  useEffect(() => {
    const panel = mobilePanelRef.current
    if (!panel) return
    const items = mobileItemsRef.current

    if (menuOpen) {
      gsap.set(panel, { display: 'flex' })
      gsap.set(items, { opacity: 0, y: -12 })
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(panel, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35 })
        .to(items, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, '-=0.15')
    } else {
      gsap
        .timeline({ defaults: { ease: 'power2.in' } })
        .to(items, { opacity: 0, y: -8, duration: 0.15, stagger: 0.03 })
        .to(panel, { height: 0, opacity: 0, duration: 0.25 }, '-=0.05')
        .set(panel, { display: 'none' })
    }
  }, [menuOpen])

  const handleNavClick = (index) => {
    setActiveIndex(index)
    setMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg shadow-lg shadow-primary-100/50 dark:shadow-black/40'
          : 'bg-white/60 dark:bg-neutral-950/60 backdrop-blur-md'
      } border-b border-primary-100/70 dark:border-white/10`}
    >
      <div className="flex items-center justify-between px-5 lg:px-10 py-5">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          onClick={() => handleNavClick(0)}
          className="flex items-center shrink-0 transition-transform duration-300 hover:scale-[1.03]"
        >
          <img src={logo} alt="Krold Mfins Private Limited" className="h-9 lg:h-11 w-auto" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item.name}
              ref={(el) => (desktopItemsRef.current[index] = el)}
              className="relative"
            >
              <a
                href={item.href}
                onClick={() => handleNavClick(index)}
                className={`group relative px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                  activeIndex === index
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-black/70 hover:text-primary-600 dark:text-white/70 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
                <span
                  className={`pointer-events-none absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    activeIndex === index ? 'scale-x-100' : ''
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={() => handleNavClick(3)}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-2.5 text-[15px] font-semibold text-white shadow-md shadow-primary-200 dark:shadow-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-200 dark:hover:shadow-black/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-50 dark:hover:bg-white/10 transition-colors duration-300"
          >
            <span className="relative flex h-4 w-6 flex-col justify-between">
              <span
                ref={(el) => (barsRef.current[0] = el)}
                className="block h-[2px] w-full rounded-full bg-primary-600 dark:bg-primary-400"
              />
              <span
                ref={(el) => (barsRef.current[1] = el)}
                className="block h-[2px] w-full rounded-full bg-primary-600 dark:bg-primary-400"
              />
              <span
                ref={(el) => (barsRef.current[2] = el)}
                className="block h-[2px] w-full rounded-full bg-primary-600 dark:bg-primary-400"
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        ref={mobilePanelRef}
        className="hidden flex-col overflow-hidden border-t border-primary-100/70 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg lg:hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.name} ref={(el) => (mobileItemsRef.current[index] = el)}>
              <a
                href={item.href}
                onClick={() => handleNavClick(index)}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300 ${
                  activeIndex === index
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400'
                    : 'text-black/70 hover:bg-primary-50 hover:text-primary-600 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li ref={(el) => (mobileItemsRef.current[NAV_ITEMS.length] = el)} className="pt-2">
            <a
              href="#contact"
              onClick={() => handleNavClick(3)}
              className="block rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-3 text-center text-base font-semibold text-white shadow-md shadow-primary-200"
            >
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
