import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BARS = [
  { x: 55, h: 90 },
  { x: 115, h: 145 },
  { x: 175, h: 110 },
  { x: 235, h: 195 },
  { x: 295, h: 235 },
]
const BASE_Y = 330

export function GrowthArt() {
  const barsRef = useRef([])
  const arrowRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.from(barsRef.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.8,
        stagger: 0.12,
        ease: 'back.out(1.6)',
      })

      const len = arrowRef.current?.getTotalLength?.() ?? 0
      if (arrowRef.current && len) {
        gsap.set(arrowRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(arrowRef.current, {
          strokeDashoffset: 0,
          duration: 1.1,
          delay: 0.55,
          ease: 'power2.out',
        })
      }

      if (!reduceMotion) {
        gsap.to(barsRef.current, {
          y: -6,
          duration: 1.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.15, from: 'end' },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full max-w-[380px]">
      <defs>
        <linearGradient id="growth-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#36a1da" />
          <stop offset="100%" stopColor="#54ba4f" />
        </linearGradient>
        <linearGradient id="growth-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#54ba4f" />
          <stop offset="100%" stopColor="#36a1da" />
        </linearGradient>
      </defs>

      <line
        x1="30"
        y1={BASE_Y}
        x2="360"
        y2={BASE_Y}
        stroke="currentColor"
        className="text-black/10 dark:text-white/10"
        strokeWidth="2"
      />

      {BARS.map((bar, i) => (
        <rect
          key={bar.x}
          ref={(el) => (barsRef.current[i] = el)}
          x={bar.x}
          y={BASE_Y - bar.h}
          width="36"
          height={bar.h}
          rx="8"
          fill="url(#growth-bar)"
          opacity="0.85"
        />
      ))}

      <path
        ref={arrowRef}
        d="M48,300 L108,238 L168,268 L228,155 L288,95"
        fill="none"
        stroke="url(#growth-arrow)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M288,95 L330,84 M288,95 L299,137"
        fill="none"
        stroke="#36a1da"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShieldArt() {
  const ringRef = useRef(null)
  const shieldRef = useRef(null)
  const checkRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.from(shieldRef.current, { scale: 0.7, opacity: 0, duration: 0.7, ease: 'back.out(1.8)' })

      const len = checkRef.current?.getTotalLength?.() ?? 0
      if (checkRef.current && len) {
        gsap.set(checkRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(checkRef.current, {
          strokeDashoffset: 0,
          duration: 0.6,
          delay: 0.55,
          ease: 'power2.out',
        })
      }

      if (!reduceMotion) {
        gsap.to(ringRef.current, {
          rotate: 360,
          transformOrigin: '50% 50%',
          duration: 26,
          repeat: -1,
          ease: 'none',
        })
        gsap.to(shieldRef.current, {
          scale: 1.03,
          duration: 2.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full max-w-[340px]">
      <defs>
        <linearGradient id="shield-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#36a1da" />
          <stop offset="100%" stopColor="#2a8fc4" />
        </linearGradient>
      </defs>

      <circle
        ref={ringRef}
        cx="200"
        cy="200"
        r="155"
        fill="none"
        stroke="#54ba4f"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeDasharray="6 10"
      />

      <g ref={shieldRef}>
        <path
          d="M200,70 L300,105 V190 C300,260 255,305 200,330 C145,305 100,260 100,190 V105 Z"
          fill="url(#shield-fill)"
        />
        <path
          ref={checkRef}
          d="M155,195 L188,228 L250,155"
          fill="none"
          stroke="#ffffff"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

const SLIDERS = [
  { y: 190, pct: 0.62 },
  { y: 224, pct: 0.82 },
  { y: 258, pct: 0.46 },
]
const TRACK_X = 90
const TRACK_W = 220
const SPARK_POINTS = [
  [90, 152],
  [132, 128],
  [168, 142],
  [206, 98],
  [246, 112],
  [292, 72],
]

export function PlanningArt() {
  const cardRef = useRef(null)
  const sparkRef = useRef(null)
  const dotsRef = useRef([])
  const fillsRef = useRef([])
  const handlesRef = useRef([])
  const resultRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, { opacity: 0, y: 24, scale: 0.94, duration: 0.6, ease: 'power3.out' })

      const len = sparkRef.current?.getTotalLength?.() ?? 0
      if (sparkRef.current && len) {
        gsap.set(sparkRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(sparkRef.current, { strokeDashoffset: 0, duration: 1, delay: 0.35, ease: 'power2.out' })
      }
      gsap.from(dotsRef.current, {
        scale: 0,
        transformOrigin: 'center',
        duration: 0.4,
        stagger: 0.07,
        delay: 0.45,
        ease: 'back.out(2)',
      })

      fillsRef.current.forEach((fill, i) => {
        if (!fill) return
        gsap.fromTo(
          fill,
          { attr: { width: 0 } },
          { attr: { width: TRACK_W * SLIDERS[i].pct }, duration: 0.8, delay: 0.15 * i, ease: 'power3.out' },
        )
      })
      handlesRef.current.forEach((handle, i) => {
        if (!handle) return
        gsap.fromTo(
          handle,
          { attr: { cx: TRACK_X } },
          {
            attr: { cx: TRACK_X + TRACK_W * SLIDERS[i].pct },
            duration: 0.8,
            delay: 0.15 * i,
            ease: 'power3.out',
          },
        )
      })

      const counter = { val: 0 }
      gsap.to(counter, {
        val: 1.2,
        duration: 1.1,
        delay: 0.55,
        ease: 'power2.out',
        onUpdate: () => {
          if (resultRef.current) resultRef.current.textContent = `₹${counter.val.toFixed(1)} Cr`
        },
      })
      gsap.from(badgeRef.current, { scale: 0, opacity: 0, duration: 0.5, delay: 1.4, ease: 'back.out(2.5)' })

      if (!reduceMotion) {
        gsap.to(cardRef.current, { y: -6, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full max-w-[340px]">
      <defs>
        <linearGradient id="plan-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eff7fc" />
        </linearGradient>
        <linearGradient id="plan-spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#36a1da" />
          <stop offset="100%" stopColor="#54ba4f" />
        </linearGradient>
        <linearGradient id="plan-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#36a1da" />
          <stop offset="100%" stopColor="#54ba4f" />
        </linearGradient>
      </defs>

      <g ref={cardRef}>
        <rect
          x="55"
          y="45"
          width="290"
          height="310"
          rx="28"
          fill="url(#plan-card)"
          stroke="#bfe1f3"
          strokeWidth="1.5"
        />

        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={85 + i * 16}
            cy="78"
            r="4"
            fill={i === 0 ? '#36a1da' : i === 1 ? '#54ba4f' : '#bfe1f3'}
          />
        ))}

        <path
          ref={sparkRef}
          d={`M${SPARK_POINTS.map((p) => p.join(',')).join(' L')}`}
          fill="none"
          stroke="url(#plan-spark)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[SPARK_POINTS[0], SPARK_POINTS[2], SPARK_POINTS[4], SPARK_POINTS[5]].map(([cx, cy], i) => (
          <circle
            key={cx}
            ref={(el) => (dotsRef.current[i] = el)}
            cx={cx}
            cy={cy}
            r="5"
            fill="#ffffff"
            stroke="#36a1da"
            strokeWidth="3"
          />
        ))}

        {SLIDERS.map((s, i) => (
          <g key={s.y}>
            <rect
              x={TRACK_X}
              y={s.y}
              width={TRACK_W}
              height="8"
              rx="4"
              fill="currentColor"
              className="text-black/10 dark:text-white/10"
            />
            <rect
              ref={(el) => (fillsRef.current[i] = el)}
              x={TRACK_X}
              y={s.y}
              width="0"
              height="8"
              rx="4"
              fill="url(#plan-fill)"
            />
            <circle
              ref={(el) => (handlesRef.current[i] = el)}
              cx={TRACK_X}
              cy={s.y + 4}
              r="9"
              fill="#ffffff"
              stroke="#36a1da"
              strokeWidth="3"
            />
          </g>
        ))}

        <text ref={resultRef} x="85" y="322" fontSize="32" fontWeight="700" className="fill-black">
          ₹0.0 Cr
        </text>
        <g ref={badgeRef} transform="translate(295,312)">
          <circle cx="0" cy="0" r="18" fill="#54ba4f" />
          <path
            d="M-7,0 L-2,6 L8,-8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}
