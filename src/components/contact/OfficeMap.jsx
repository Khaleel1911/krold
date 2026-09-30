import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { OFFICES } from '../../data/contactInfo'

const OFFICE_ZOOM = 17
const OVERVIEW_PADDING = [60, 60]

const pinIcon = (office, active) =>
  L.divIcon({
    className: '',
    iconSize: [0, 0],
    html: `<div class="office-pin ${active ? 'is-active' : ''}">
      <span class="office-pin-label">${office.city}</span>
      <span class="office-pin-dot"></span>
    </div>`,
  })

// Starts zoomed out on every office; `selected` (set by the toggle or a pin click) flies in on that one.
export default function OfficeMap({ selected, onSelect, onReset }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    const map = L.map(elRef.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
    map.fitBounds(L.latLngBounds(OFFICES.map((o) => o.coords)), { padding: OVERVIEW_PADDING })

    OFFICES.forEach((office) => {
      markersRef.current[office.id] = L.marker(office.coords, {
        icon: pinIcon(office, false),
        title: `${office.city} ${office.type}`,
        keyboard: true,
      })
        .on('click', () => onSelectRef.current(office.id))
        .addTo(map)
    })

    mapRef.current = map
    return () => map.remove()
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    OFFICES.forEach((office) => markersRef.current[office.id].setIcon(pinIcon(office, office.id === selected)))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (selected) {
      const office = OFFICES.find((o) => o.id === selected)
      map.flyTo(office.coords, OFFICE_ZOOM, { animate: !reduce, duration: 1.6 })
    } else {
      map.flyToBounds(L.latLngBounds(OFFICES.map((o) => o.coords)), {
        padding: OVERVIEW_PADDING,
        animate: !reduce,
        duration: 1.2,
      })
    }
  }, [selected])

  return (
    <div className="relative isolate">
      <div ref={elRef} className="office-map h-[320px] w-full" aria-label="Map of Krold Mfins offices" />
      {selected && (
        <button
          type="button"
          onClick={onReset}
          className="absolute right-3 top-3 z-[500] inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary-700 shadow-md ring-1 ring-primary-100 transition-colors hover:bg-primary-50 dark:bg-neutral-900/95 dark:text-primary-300 dark:ring-white/10 dark:hover:bg-neutral-800"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Show both offices
        </button>
      )}
    </div>
  )
}
