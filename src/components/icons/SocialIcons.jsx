import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

// Font Awesome brand marks, via react-icons.
const ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
}

export default function SocialIcon({ name, className }) {
  const Icon = ICONS[name]
  return Icon ? <Icon className={className} aria-hidden="true" /> : null
}
