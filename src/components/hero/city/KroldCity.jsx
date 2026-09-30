import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { SERVICES } from '../../../data/services'
import ServiceIcon from '../../icons/ServiceIcons'
import { VIEW_W, VIEW_H, iso } from './geometry'
import { CityMotion, prefersReducedMotion } from './motion'
import { Ground, Lamps, Cars, Sky } from './Scenery'
import {
  PmsTower,
  StockExchange,
  SipTower,
  BondsBank,
  Plaza,
  ConstructionSite,
  InsuredHome,
  Clinic,
  RetirementCottage,
} from './Buildings'

// Listed back-to-front so later buildings correctly overlap earlier ones.
// `anchor` is the grid point (gx, gy, z) the floating pin sits on.
const SPOTS = [
  { slug: 'pms-aif', label: 'PMS / AIF', anchor: [2, 2, 186], Building: PmsTower },
  { slug: 'stock-broking', label: 'Stocks', anchor: [6.5, 2, 112], Building: StockExchange },
  { slug: 'mutual-funds', label: 'SIP & Mutual Funds', anchor: [2, 6.5, 142], Building: SipTower },
  { slug: 'bonds', label: 'Bonds', anchor: [11, 2, 92], Building: BondsBank },
  { slug: null, Building: Plaza },
  { slug: 'unlisted-shares', label: 'Pre-IPO', anchor: [1.8, 10.9, 88], Building: ConstructionSite },
  { slug: 'general-insurance', label: 'General Insurance', anchor: [11, 6.5, 86], Building: InsuredHome },
  { slug: 'insurance', label: 'Life & Health', anchor: [6.5, 10.65, 50], Building: Clinic },
  { slug: 'annuity', label: 'Annuity', anchor: [11.05, 10.75, 52], Building: RetirementCottage },
].map((spot) => {
  if (!spot.slug) return spot
  const [x, y] = iso(...spot.anchor)
  return {
    ...spot,
    service: SERVICES.find((s) => s.slug === spot.slug),
    left: (x / VIEW_W) * 100,
    top: (y / VIEW_H) * 100,
  }
})

const PINS = SPOTS.filter((s) => s.slug)

export default function KroldCity({ highlight = [] }) {
  const [active, setActive] = useState(null)
  // A hovered/focused building wins; otherwise spotlight whatever the hero asks for.
  const focus = active ? [active] : highlight
  const navigate = useNavigate()
  const rootRef = useRef(null)
  const groundRef = useRef(null)
  const carsRef = useRef(null)
  const bldgRefs = useRef([])
  const pinRefs = useRef([])
  const loopsRef = useRef(new Set())
  const visibleRef = useRef(true)

  const register = useCallback((ctx) => {
    loopsRef.current.add(ctx)
    if (!visibleRef.current) ctx.getTweens().forEach((t) => t.pause())
    return () => loopsRef.current.delete(ctx)
  }, [])
  const motion = useMemo(() => ({ register }), [register])

  // Pause ambient loops while the city is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      loopsRef.current.forEach((ctx) =>
        ctx.getTweens().forEach((t) => (entry.isIntersecting ? t.resume() : t.pause())),
      )
    })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  // Entrance: ground settles, buildings rise back-to-front, then pins pop in.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.from(rootRef.current, { opacity: 0, duration: 0.6 })
        return
      }
      gsap
        .timeline({ delay: 0.2 })
        .from(groundRef.current, { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' })
        .from(bldgRefs.current, { opacity: 0, y: 40, duration: 0.6, stagger: 0.09, ease: 'back.out(1.5)' }, '-=0.3')
        .from(carsRef.current, { opacity: 0, duration: 0.4 }, '-=0.3')
        .from(pinRefs.current, { opacity: 0, y: 10, scale: 0.6, duration: 0.35, stagger: 0.05, ease: 'back.out(2)' }, '-=0.2')
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  const hover = (slug) => (e) => e.pointerType === 'mouse' && setActive(slug)

  return (
    <CityMotion.Provider value={motion}>
      <div
        ref={rootRef}
        className="krold-city relative w-full select-none"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        data-active={focus.length ? '' : undefined}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(null)}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
          onPointerOver={(e) => e.pointerType === 'mouse' && e.target === e.currentTarget && setActive(null)}
        >
          <Sky />
          <g ref={groundRef}>
            <Ground />
            <Lamps />
          </g>
          <g ref={carsRef}>
            <Cars />
          </g>
          {SPOTS.map(({ slug, Building }, i) => (
            <g key={slug ?? 'plaza'} ref={(el) => (bldgRefs.current[i] = el)}>
              <g
                className={`city-bldg ${slug ? 'is-link' : ''} ${slug && focus.includes(slug) ? 'is-active' : ''}`}
                onPointerEnter={slug ? hover(slug) : undefined}
                onClick={slug ? () => navigate(`/services#${slug}`) : undefined}
              >
                <g className="city-lift">
                  <Building />
                </g>
              </g>
            </g>
          ))}
        </svg>

        {/* Pins are real links so the city stays keyboard and screen-reader friendly. */}
        <ul className="pointer-events-none absolute inset-0" aria-label="Krold services">
          {PINS.map((spot, i) => (
            <li key={spot.slug} className="absolute" style={{ left: `${spot.left}%`, top: `${spot.top}%` }}>
              <div className="-translate-x-1/2 -translate-y-full">
                <div ref={(el) => (pinRefs.current[i] = el)}>
                  <Link
                    to={`/services#${spot.slug}`}
                    aria-label={spot.service.title}
                    onPointerEnter={hover(spot.slug)}
                    onFocus={(e) => e.currentTarget.matches(':focus-visible') && setActive(spot.slug)}
                    onBlur={() => setActive(null)}
                    className={`city-pin pointer-events-auto group flex items-center gap-1.5 rounded-full border bg-white/95 p-1 shadow-md shadow-primary-700/10 backdrop-blur transition-all duration-300 dark:bg-neutral-900/90 dark:shadow-black/40 sm:pr-2.5 ${
                      focus.includes(spot.slug)
                        ? 'border-primary-400 -translate-y-1 dark:border-primary-400'
                        : 'border-primary-100 dark:border-white/10'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${
                        focus.includes(spot.slug)
                          ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white'
                          : 'bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400'
                      }`}
                    >
                      <ServiceIcon name={spot.service.icon} className="h-3.5 w-3.5" />
                    </span>
                    <span className="hidden whitespace-nowrap text-[11px] font-semibold text-black/75 dark:text-white/80 sm:inline">
                      {spot.label}
                    </span>
                  </Link>
                  <span className="mx-auto block h-2 w-px bg-primary-300 dark:bg-primary-400/50" />
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </CityMotion.Provider>
  )
}

