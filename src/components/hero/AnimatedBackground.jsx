import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedBackground() {
  const blobARef = useRef(null)
  const blobBRef = useRef(null)
  const blobCRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.to(blobARef.current, {
          x: 50,
          y: -30,
          duration: 9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        gsap.to(blobBRef.current, {
          x: -60,
          y: 40,
          duration: 11,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        gsap.to(blobCRef.current, {
          x: 30,
          y: 40,
          scale: 1.08,
          duration: 13,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }

      const len = pathRef.current?.getTotalLength?.() ?? 0
      if (pathRef.current && len) {
        gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2.6,
          delay: 0.3,
          ease: 'power2.inOut',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={blobARef}
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary-300/40 dark:bg-primary-500/10 blur-3xl"
      />
      <div
        ref={blobBRef}
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full bg-secondary-300/40 dark:bg-secondary-500/10 blur-3xl"
      />
      <div
        ref={blobCRef}
        className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary-200/40 dark:bg-primary-400/10 blur-3xl"
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.12]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-line-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#36a1da" />
            <stop offset="100%" stopColor="#54ba4f" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M0,600 C180,520 260,680 420,560 C560,460 620,300 780,340 C940,380 1000,220 1160,180 C1300,140 1360,240 1440,160"
          stroke="url(#hero-line-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div
        className="absolute inset-0 text-black/[0.03] dark:text-white/[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  )
}
