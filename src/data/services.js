export const SERVICES = [
  {
    slug: 'mutual-funds',
    icon: 'mutualFunds',
    title: 'Mutual Funds and SIFs',
    short: 'Access professionally managed Mutual Funds and SIFs designed to help you build long-term wealth.',
  },
  {
    slug: 'insurance',
    icon: 'insurance',
    title: 'Life & Health Insurance',
    short: 'Comprehensive life and health insurance solutions designed to protect you, your family and your financial future.',
  },
  {
    slug: 'pms-aif',
    icon: 'pmsAif',
    title: 'PMS / AIF',
    short: 'Sophisticated, professionally managed investment solutions for investors seeking access to specialised strategies.',
  },
  {
    slug: 'general-insurance',
    icon: 'generalInsurance',
    title: 'General Insurance',
    short: 'Protect your business, warehouse, machinery, profits and other valuable assets with comprehensive general insurance solutions.',
  },
  {
    slug: 'annuity',
    icon: 'annuity',
    title: 'Annuity Plans',
    short: 'Structured income solutions designed to provide financial stability and a dependable income stream for the future.',
  },
  {
    slug: 'bonds',
    icon: 'bonds',
    title: 'Bonds',
    short: 'Explore government and corporate bonds for predictable income, diversification and portfolio stability.',
  },
  {
    slug: 'stock-broking',
    icon: 'stockBroking',
    title: 'Stock Broking',
    short: 'Access equities, IPOs, ETFs and other market opportunities with informed guidance and research-backed support.',
  },
  {
    slug: 'unlisted-shares',
    icon: 'unlistedShares',
    title: 'Unlisted Shares',
    short: 'Explore opportunities in promising companies before they enter the public markets, with informed investment guidance.',
  },
  {
    slug: 'reits-invits',
    icon: 'reitsInvits',
    title: 'REITs / InvITs',
    short: 'Explore REITs and InvITs offering access to income-generating real estate and infrastructure assets.',
  },
]

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)
