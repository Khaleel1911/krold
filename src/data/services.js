export const SERVICES = [
  {
    slug: 'mutual-funds',
    icon: 'mutualFunds',
    title: 'Mutual Fund Distribution',
    short: 'Goal-based access to diversified mutual fund solutions, tailored to your financial objectives and risk profile.',
    description:
      'We help you choose from a wide universe of Equity, Debt, Hybrid and Tax-Saving (ELSS) mutual funds, matched to your risk profile and financial goals. Onboarding is fully digital, and every portfolio is tracked and reviewed on an ongoing basis so your allocation stays aligned as markets and goals evolve.',
    points: [
      'Goal-oriented fund selection, not one-size-fits-all',
      'Digital onboarding and paperless KYC',
      'Continuous portfolio monitoring and rebalancing',
      'AMFI-compliant, transparent process throughout',
    ],
  },
  {
    slug: 'insurance',
    icon: 'insurance',
    title: 'Life & Health Insurance',
    short: 'Comprehensive life and health insurance solutions designed to protect you, your family and your financial future.',
    description:
      'We work with leading life and health insurers to help you build the right protection layer for your family — before you focus on growth. Plans are chosen for genuine coverage fit, not just premium size.',
    points: [
      'Term Life, Endowment, ULIPs, Child Plans, Retirement/Annuity',
      'Individual & Family Floater health plans',
      'Critical illness, personal accident and top-up cover',
      'Senior citizen health plans',
    ],
  },
  {
    slug: 'pms-aif',
    icon: 'pmsAif',
    title: 'PMS / AIF',
    short: 'Sophisticated, professionally managed investment solutions for investors seeking access to specialised strategies.',
    description:
      'For investors ready to go beyond mutual funds, we offer access to Portfolio Management Services and Alternative Investment Funds — customised strategies run by dedicated fund managers, spanning private equity, venture capital and real estate.',
    points: [
      'Portfolio Management Services — minimum investment ₹50 Lacs',
      'Alternative Investment Funds — minimum investment ₹1 Crore',
      'Dedicated fund manager per strategy',
      'Exposure to private equity, venture capital and real estate',
    ],
  },
  {
    slug: 'general-insurance',
    icon: 'generalInsurance',
    title: 'General Insurance',
    short: 'Protect your health, home, vehicle, business and other valuable assets with comprehensive general insurance solutions.',
    description:
      'Beyond life and health, we help you protect what you have built — your home, vehicles, business and other valuable assets — with general insurance from leading insurers, chosen for the right coverage and backed by support when you need to claim.',
    points: [
      'Motor insurance for cars and two-wheelers',
      'Home and property insurance',
      'Business, shop and commercial cover',
      'Travel insurance and claims assistance',
    ],
  },
  {
    slug: 'annuity',
    icon: 'annuity',
    title: 'Annuity Plans',
    short: 'Structured income solutions designed to provide financial stability and a dependable income stream for the future.',
    description:
      'Annuity plans convert a lump sum into a guaranteed income stream for life — a steady, predictable option for retirement income planning that sits outside market volatility.',
    points: [
      'Immediate and Deferred Annuity options',
      'Spouse Benefit and Return-of-Purchase-Price variants',
      'Guaranteed income for a lifetime',
      'Tax-efficient retirement income planning',
    ],
  },
  {
    slug: 'bonds',
    icon: 'bonds',
    title: 'Bonds',
    short: 'Explore government and corporate bonds for predictable income, diversification and portfolio stability.',
    description:
      'For investors prioritising capital preservation, we offer access to Government Bonds, Corporate Bonds, Tax-Free Bonds, RBI Floating Rate Bonds and Debentures/NCDs — a way to diversify a portfolio with steadier, more predictable returns.',
    points: [
      'Government and Corporate Bonds',
      'Tax-Free Bonds and RBI Floating Rate Bonds',
      'Debentures / NCDs',
      'Built for capital preservation and diversification',
    ],
  },
  {
    slug: 'stock-broking',
    icon: 'stockBroking',
    title: 'Stock Broking',
    short: 'Access equities, IPOs, ETFs and other market opportunities with informed guidance and research-backed support.',
    description:
      'Trade equities, derivatives, IPOs, ETFs and index funds through a single account, backed by research and advisory support and real-time market access.',
    points: [
      'Equity trading — cash & delivery',
      'Derivatives — futures & options',
      'IPO applications and allotment tracking',
      'ETFs and index funds',
    ],
  },
  {
    slug: 'unlisted-shares',
    icon: 'unlistedShares',
    title: 'Unlisted Shares',
    short: 'Explore opportunities in promising companies before they enter the public markets, with informed investment guidance.',
    description:
      'Get early access to pre-IPO and private companies with strong growth potential — a specialised, medium-to-long-horizon allocation for investors comfortable with the additional risk and illiquidity of unlisted equity.',
    points: [
      'Pre-IPO company access',
      'Private, unlisted equity opportunities',
      'Medium-to-long investment horizon',
      'Suited to sophisticated investors',
    ],
  },
]

export const getServiceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)
