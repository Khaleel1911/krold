// Content for the "Why invest in India" page (/nri/why-invest-in-india). Every figure carries
// its source so it can be refreshed in one place: update the value and its source line together.
export const AS_OF = 'October 2026'

export const INTRO =
  'India remains one of the fastest-growing major economies in the world. A young workforce, a large and growing domestic market, world-leading digital infrastructure and a steady pipeline of reforms continue to attract investment from around the globe. This page sets out, with sources, the factors that make India a compelling long-term destination for NRI investors, and the risks worth keeping in mind.'

export const GDP_GROWTH = {
  title: 'Projected real GDP growth, 2026 (%)',
  bars: [
    { label: 'India', value: 7.0, highlight: true },
    { label: 'China', value: 4.5 },
    { label: 'World', value: 3.1 },
    { label: 'USA', value: 2.3 },
  ],
  source: 'IMF WEO, October 2026. China figure derived from the IMF’s reported 2.5-point gap with India (Rio Times).',
  textSource: 'IMF WEO Oct 2026 via Business Today; The Week; The Federal.',
}

export const PEOPLE_STATS = [
  { value: '29.2 yrs', label: 'Median age (China: 40.6)' },
  { value: '68.6%', label: 'Working age (15–64), about 1.01 bn people' },
  { value: '≈854 mn', label: 'People under 35' },
  { value: '38.3 yrs', label: 'Median age in 2050, still younger than China today' },
]

// Ordered youngest to oldest, so the bar reads as one light-to-dark ramp.
export const AGE_GROUPS = {
  title: 'Population by age group, 2026 (projection)',
  groups: [
    { label: '0–14 years', people: '351 mn', share: 23.8 },
    { label: '15–34 years', people: '503 mn', share: 34.0 },
    { label: '35–64 years', people: '510 mn', share: 34.6 },
    { label: '65+ years', people: '112 mn', share: 7.6 },
  ],
  source: 'UN World Population Prospects 2024, 2026 medium-variant projection (via populationpyramids.org); Economic Survey of India.',
}

export const UPI = {
  title: 'Annual UPI transactions (billion) and value (₹ lakh crore)',
  bars: [
    { label: 'FY22', value: 46.0, worth: '₹84 L cr' },
    { label: 'FY23', value: 83.7, worth: '₹139 L cr' },
    { label: 'FY24', value: 131.1, worth: '₹200 L cr' },
    { label: 'FY25', value: 185.9, worth: '₹261 L cr' },
    { label: 'FY26', value: 241.6, worth: '₹314 L cr', highlight: true },
  ],
  source: 'Ministry of Finance reply in Lok Sabha (Outlook Money).',
}

export const MAKE_IN_INDIA = {
  rows: [
    { sector: 'Electronics production', from: '₹1.9 lakh cr', to: '₹13.11 lakh cr', growth: '≈6.9×' },
    { sector: 'Mobile phone production', from: '₹18,900 cr', to: '₹6.27 lakh cr', growth: '≈33×' },
    { sector: 'Mobile phone exports', from: '₹1,566 cr', to: '₹2.60 lakh cr', growth: '≈166×' },
    { sector: 'Indigenous defence production', from: '₹46,429 cr', to: '₹1.78 lakh cr (record)', growth: '≈3.8×' },
  ],
  pli: [
    { value: '₹2.6 lakh cr', label: 'Investment attracted by PLI schemes' },
    { value: '₹23.8 lakh cr', label: 'Production and sales under PLI' },
    { value: '₹15.5 lakh cr+', label: 'Exports supported by PLI' },
    { value: '14.6 lakh', label: 'Jobs created under PLI (all as of June 2026)' },
  ],
  source: 'PIB / MeitY, 15 Jul 2026; StudyIQ (Make in India at 12); PIB backgrounder, Sep 2026, via Jokta Academy; Organiser.',
}

export const STABILITY = [
  {
    title: 'Democratic Governance',
    text: 'Regular elections at national, state and local levels ensure an orderly, peaceful transition of power.',
  },
  {
    title: 'Policy Continuity',
    text: 'Pro-growth reforms such as GST, IBC and PLI have been built on, not reversed, providing a predictable environment for business.',
  },
  {
    title: 'Political Stability',
    text: 'Stable governments at the centre support long-term economic planning and infrastructure investment.',
  },
  {
    title: 'Rule of Law',
    text: 'An established legal system and an independent judiciary safeguard individual and business rights.',
  },
]

// BSE Sensex year-end closes. The last point is the mid-October 2026 level, drawn dashed.
export const SENSEX = {
  title: 'BSE Sensex, year-end close (2000–2025) and 13 Oct 2026',
  points: [
    [2000, 3972], [2001, 3262], [2002, 3377], [2003, 5839], [2004, 6603], [2005, 9398], [2006, 13787],
    [2007, 20287], [2008, 9647], [2009, 17465], [2010, 20509], [2011, 15455], [2012, 19427], [2013, 21171],
    [2014, 27499], [2015, 26118], [2016, 26626], [2017, 34057], [2018, 36068], [2019, 41254], [2020, 47751],
    [2021, 58254], [2022, 60841], [2023, 72240], [2024, 78139], [2025, 85221],
  ],
  latest: { x: 2025.79, value: 73086, label: '13 Oct 2026' },
}

export const INDICES = {
  title: 'BSE Sensex vs global indices, 25 years: Jan 2001 – Dec 2025',
  subtitle: 'Change in index level from the end-2000 close to the end-2025 close, in local currency',
  rows: [
    { name: 'BSE Sensex', change: 2046, cagr: '13.1%', highlight: true },
    { name: 'S&P 500', change: 419, cagr: '6.8%' },
    { name: 'DAX (Germany)*', change: 281, cagr: '5.5%' },
    { name: 'Nikkei 225', change: 265, cagr: '5.3%' },
    { name: 'Hang Seng', change: 70, cagr: '2.1%' },
  ],
  note: 'Price returns, excluding dividends, except *DAX: it is a total-return index that already includes reinvested dividends, so it is flattered relative to the others. Returns are in each index’s own currency. Past performance does not guarantee future returns.',
  levels:
    'Index levels (end-2000 → end-2025): Sensex 3,972.12 → 85,220.60 (BSE via 1Stock1; DIPAM Market Monitor); S&P 500 1,320.28 → 6,845.50 (S&P Dow Jones Indices; Globe and Mail); Nikkei 225 13,785.69 → 50,339.48 (Ámbito; DIPAM); DAX 6,433.61 → 24,490.41 (Deutsche Börse via 1Stock1; dpa-AFX); Hang Seng 15,095.53 → 25,630.54 (HKEX Fact Book 2000; DIPAM).',
}

export const DOLLAR_TERMS =
  'The rupee moved from about ₹46.7 to ₹89.9 per US dollar over the period. For an investor measuring in dollars, the Sensex grew about 11× (≈10.1% a year): still strong, and a reminder that currency risk matters for NRIs.'

export const DIVERSIFICATION = [
  {
    title: 'Geographic diversification',
    text: 'India’s growth is driven largely by domestic demand, so it can behave differently from the markets where many NRIs earn and invest.',
  },
  {
    title: 'Simple access via mutual funds',
    text: 'Mutual funds and ETFs spread money across sectors and asset classes, and SIPs average out the cost of buying through volatile periods like 2026.',
  },
  {
    title: 'Emerging-market growth',
    text: 'As an emerging market, India has the potential for higher long-term returns than developed markets, with higher volatility to match.',
  },
  {
    title: 'Know the risks',
    text: 'Rupee depreciation, market drawdowns and tax rules can all affect returns in your home currency. Plan with a long horizon and a balanced allocation.',
  },
]

export const CONCLUSION =
  'India offers NRIs a rare combination: fast economic growth, a young population, world-class digital infrastructure, deepening manufacturing and a steady reform agenda. Markets will have difficult years, and 2026 is one, but for patient, diversified investors India remains a compelling long-term opportunity.'
