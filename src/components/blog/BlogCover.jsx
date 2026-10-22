import { cldUrl } from '../../lib/blog/utils'

// Posts without a cover image get a branded illustration instead; the slug picks which
// one, so a post always keeps the same art.
const MOTIFS = [
  // Rising compounding curve
  <g key="curve">
    <path d="M20 150 C 90 148, 140 130, 180 100 S 250 30, 300 18" strokeWidth="5" />
    <path d="M20 150 C 90 148, 140 130, 180 100 S 250 30, 300 18 V 170 H 20 Z" fill="currentColor" stroke="none" opacity="0.12" />
    <circle cx="300" cy="18" r="9" fill="currentColor" stroke="none" />
  </g>,
  // Growing bars
  <g key="bars" fill="currentColor" stroke="none">
    {[22, 40, 58, 82, 108, 140].map((h, i) => (
      <rect key={h} x={36 + i * 46} y={170 - h} width="28" height={h} rx="6" opacity={0.35 + i * 0.12} />
    ))}
  </g>,
  // Clock / time
  <g key="clock">
    <circle cx="160" cy="92" r="66" strokeWidth="5" />
    <path d="M160 52 V 92 L 188 110" strokeWidth="6" />
    <circle cx="160" cy="92" r="88" strokeWidth="2" opacity="0.4" strokeDasharray="4 10" />
  </g>,
]

function hash(text = '') {
  let h = 0
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) | 0
  return Math.abs(h)
}

export default function BlogCover({ post, width = 1200, className = '', sizes }) {
  if (post.coverImage?.url) {
    return (
      <img
        src={cldUrl(post.coverImage.url, `f_auto,q_auto,c_fill,w_${width},ar_16:9`)}
        alt={post.coverImage.alt || post.title}
        sizes={sizes}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }}
      />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <svg
        viewBox="0 0 320 180"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative w-3/5 max-w-[340px] drop-shadow-sm"
      >
        {MOTIFS[hash(post.slug || post.title) % MOTIFS.length]}
      </svg>
    </div>
  )
}
