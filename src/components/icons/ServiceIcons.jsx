const shared = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function MutualFundsIcon(props) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
      <path d="M21 12A9 9 0 0 0 12 3v9h9Z" opacity="0.45" />
    </svg>
  )
}

function InsuranceIcon(props) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 3 5 5.5V11c0 4.8 3 8.4 7 10 4-1.6 7-5.2 7-10V5.5L12 3Z" />
      <path d="M12 15.3 9.1 12.5a1.9 1.9 0 1 1 2.7-2.7l.2.2.2-.2a1.9 1.9 0 1 1 2.7 2.7L12 15.3Z" />
    </svg>
  )
}

function PmsAifIcon(props) {
  return (
    <svg {...shared} {...props}>
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3.5 12.5h17" />
    </svg>
  )
}

function AnnuityIcon(props) {
  return (
    <svg {...shared} {...props}>
      <path d="M4 12a8 8 0 0 1 13.66-5.66" />
      <path d="M20 12a8 8 0 0 1-13.66 5.66" />
      <path d="M17 3v4h-4" />
      <path d="M7 21v-4h4" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  )
}

function BondsIcon(props) {
  return (
    <svg {...shared} {...props}>
      <rect x="4" y="3" width="16" height="12" rx="1.5" />
      <path d="M7 7h10" />
      <path d="M7 10.3h7" />
      <path d="M9 15v6l3-2 3 2v-6" />
    </svg>
  )
}

function StockBrokingIcon(props) {
  return (
    <svg {...shared} {...props}>
      <path d="M5 20v-4M5 8V4" />
      <rect x="3.4" y="8" width="3.2" height="8" rx="0.6" />
      <path d="M12 20v-7M12 11V4" />
      <rect x="10.4" y="6" width="3.2" height="5" rx="0.6" />
      <path d="M19 20v-5M19 6V4" />
      <rect x="17.4" y="9" width="3.2" height="6" rx="0.6" />
    </svg>
  )
}

function UnlistedSharesIcon(props) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 21v-10" />
      <path d="M12 12c0-3.5 2.5-6 6-6.5-.5 3.5-3 6-6 6.5Z" />
      <path d="M12 15c0-3-2-5-5.5-5.5C7 12.5 9 15 12 15Z" />
    </svg>
  )
}

function SavingsSchemesIcon(props) {
  return (
    <svg {...shared} {...props}>
      <ellipse cx="12" cy="13" rx="7" ry="5" />
      <path d="M9 8.5c1-1.2 2-1.8 3-1.8s2 .6 3 1.8" />
      <path d="M11 9.3h2" />
      <circle cx="15.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8 17.5v2M16 17.5v2" />
      <path d="M5.2 13.2c-1 0-1.7-.8-1.7-1.7" />
    </svg>
  )
}

export const SERVICE_ICONS = {
  mutualFunds: MutualFundsIcon,
  insurance: InsuranceIcon,
  pmsAif: PmsAifIcon,
  annuity: AnnuityIcon,
  bonds: BondsIcon,
  stockBroking: StockBrokingIcon,
  unlistedShares: UnlistedSharesIcon,
  savingsSchemes: SavingsSchemesIcon,
}

export default function ServiceIcon({ name, className }) {
  const Icon = SERVICE_ICONS[name]
  if (!Icon) return null
  return <Icon className={className} />
}
