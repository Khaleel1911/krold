// Content for the NRI page. Every figure carries its source and period so it can be
// refreshed in one place: update the value, the source line and AS_OF together.
export const AS_OF = 'October 2026'
export const TAX_YEAR = 'Tax Year 2026-27'

export const HERO_STATS = [
  { value: '$4.15T', label: 'Size of the Indian economy', source: 'IMF, April 2026' },
  { value: '7%+', label: 'Real GDP growth, FY 2025-26', source: 'MoSPI estimates' },
  { value: '$144.8B', label: 'Sent home from abroad, FY 2025-26', source: 'RBI, net private transfers' },
  { value: '₹87L Cr', label: 'Mutual fund assets under management', source: 'AMFI, August 2026' },
]

// Rough positions on a 600×600 canvas; this is an illustration, not a map.
export const CORRIDORS = [
  { city: 'New York', x: 80, y: 240 },
  { city: 'London', x: 225, y: 150 },
  { city: 'Dubai', x: 300, y: 290 },
  { city: 'Singapore', x: 480, y: 430 },
  { city: 'Sydney', x: 515, y: 520 },
]
export const INDIA_POINT = { x: 400, y: 330 }

export const STABILITY_POINTS = [
  { title: 'Democratic governance', text: 'Regular elections at national, state and local level, with orderly transitions of power.' },
  { title: 'Policy continuity', text: 'Economic reform has stayed on course across changes of government.' },
  { title: 'Rule of law', text: 'An independent judiciary protects the rights of individuals and businesses.' },
  { title: 'Regulated markets', text: 'SEBI, RBI and IRDAI oversee the products and intermediaries you invest through.' },
]

export const RECENT_CHANGES = [
  {
    date: 'April 2026',
    title: 'A new Income-tax Act',
    text: 'The Income-tax Act, 2025 replaced the 1961 Act. A single “tax year” replaces previous year and assessment year, and sections are renumbered. The residency tests are unchanged.',
  },
  {
    date: 'Budget 2026',
    title: 'Higher equity limits for NRIs',
    text: 'The Union Budget raised the limit for an individual investor resident outside India in a listed company from 5% to 10%, and the combined limit from 10% to 24%.',
  },
  {
    date: 'October 2026',
    title: 'Simpler property sales',
    text: 'A resident buying property from an NRI can now deduct and deposit tax using their PAN, with no need to obtain a TAN.',
  },
]

export const DIVERSIFICATION = [
  'Exposure to a different growth cycle from the country you live in',
  'Mutual funds and ETFs spread money across sectors and asset classes',
  'Rupee assets to match rupee goals: family support, property, retirement in India',
  'A balanced mix across geographies makes a portfolio more resilient',
]

export const ASSET_CLASSES = [
  {
    icon: 'equity',
    title: 'Equities',
    text: 'Invest through mutual funds, direct stocks or portfolio management services. Mutual funds and SIPs run straight from your NRE or NRO account.',
    route: ['NRE', 'NRO', 'PIS for direct stocks'],
  },
  {
    icon: 'debt',
    title: 'Debt',
    text: 'Fixed deposits, government securities, corporate bonds, debt mutual funds and capital gain bonds for the stable part of a portfolio.',
    route: ['NRE', 'NRO', 'FCNR(B)'],
  },
  {
    icon: 'property',
    title: 'Real estate',
    text: 'FEMA allows NRIs to buy residential and commercial property, but not agricultural land, plantations or farmhouses. REITs offer property exposure without owning a building.',
    route: ['NRE', 'NRO'],
  },
  {
    icon: 'insurance',
    title: 'Insurance',
    text: 'Life and health cover from Indian insurers is open to NRIs who meet the insurer’s eligibility and medical requirements.',
    route: ['NRE', 'NRO'],
  },
  {
    icon: 'gold',
    title: 'Gold and commodities',
    text: 'Hold gold as jewellery, bars and coins, or more simply through gold ETFs and gold funds, with no storage to worry about.',
    route: ['NRE', 'NRO'],
  },
]

export const ACCOUNTS = [
  {
    key: 'nre',
    name: 'NRE',
    full: 'Non-Resident External',
    rows: {
      currency: 'Indian rupees',
      holds: 'Money you earn abroad',
      repatriation: 'Free, principal and interest',
      tax: 'Exempt in India',
      fx: 'Yes',
    },
  },
  {
    key: 'nro',
    name: 'NRO',
    full: 'Non-Resident Ordinary',
    rows: {
      currency: 'Indian rupees',
      holds: 'Income earned in India: rent, dividends, pension',
      repatriation: 'Up to USD 1 million a financial year, after tax',
      tax: 'Taxable, TDS at 30%',
      fx: 'Yes',
    },
  },
  {
    key: 'fcnr',
    name: 'FCNR(B)',
    full: 'Foreign Currency Non-Resident',
    rows: {
      currency: 'Foreign currency (USD, GBP, EUR and others)',
      holds: 'Money you earn abroad, as a 1 to 5 year deposit',
      repatriation: 'Free, principal and interest',
      tax: 'Exempt in India',
      fx: 'None',
    },
  },
]

export const ACCOUNT_ROWS = [
  { key: 'currency', label: 'Held in' },
  { key: 'holds', label: 'What it holds' },
  { key: 'repatriation', label: 'Taking money abroad' },
  { key: 'tax', label: 'Tax on interest' },
  { key: 'fx', label: 'Exchange-rate risk' },
]

export const STEPS = [
  {
    title: 'Open the right account',
    text: 'An NRE or NRO account with an Indian bank. Which one depends on where the money comes from and whether you want to take it back.',
  },
  {
    title: 'Complete your KYC',
    text: 'PAN, passport, overseas address proof, a photograph and a FATCA declaration. We guide you through it from wherever you are.',
  },
  {
    title: 'Invest with a plan',
    text: 'A lump sum or a SIP, in a mix that reflects your goals, your time horizon and how much risk you are comfortable with.',
  },
  {
    title: 'Review and repatriate',
    text: 'Regular reviews as your life changes, and help with the paperwork when you want to move money back.',
  },
]

export const REASONS = [
  {
    icon: 'retire',
    title: 'Prepare for retirement',
    text: 'Whether you plan to return or not, a rupee corpus gives you choices later in life.',
  },
  {
    icon: 'returns',
    title: 'Take part in India’s growth',
    text: 'Invest in one of the fastest-growing major economies, with risk weighed carefully against return.',
  },
  {
    icon: 'family',
    title: 'Provide for family at home',
    text: 'Build a safety net for parents and dependants in India, ready when it is needed.',
  },
  {
    icon: 'assets',
    title: 'Build lasting assets',
    text: 'Grow a diversified portfolio of financial assets and property for long-term stability.',
  },
]

export const TAX_RATES = [
  {
    title: 'Equity funds and listed shares',
    lines: [
      { label: 'Held under 12 months', value: '20%' },
      { label: 'Held 12 months or more', value: '12.5%' },
    ],
    note: 'Long-term gains are taxed above ₹1.25 lakh a year. TDS is deducted at the same rates on redemption.',
  },
  {
    title: 'Debt funds',
    lines: [
      { label: 'Tax on gains', value: 'Slab rate' },
      { label: 'TDS on redemption', value: '30%' },
    ],
    note: 'For debt-oriented funds bought on or after 1 April 2023, whatever the holding period. No indexation.',
  },
  {
    title: 'Bank interest',
    lines: [
      { label: 'NRE and FCNR(B)', value: 'Exempt' },
      { label: 'NRO, TDS', value: '30%' },
    ],
    note: 'NRO interest has TDS from the first rupee, with no threshold.',
  },
  {
    title: 'Dividends',
    lines: [
      { label: 'Tax', value: 'Slab rate' },
      { label: 'TDS', value: '20%' },
    ],
    note: 'A lower rate may apply under your country’s tax treaty with India.',
  },
]

export const RESIDENCY_TESTS = [
  { value: '182 days', text: 'or more in India during the tax year makes you a resident.' },
  { value: '60 + 365', text: '60 days in the year and 365 days over the previous four years also does. For Indian citizens and people of Indian origin visiting India, the 60 becomes 182.' },
  { value: '120 days', text: 'replaces that 182 if your Indian income is above ₹15 lakh. You then count as resident but not ordinarily resident.' },
  { value: 'Deemed', text: 'An Indian citizen with Indian income above ₹15 lakh who is not liable to tax in any other country is treated as resident.' },
]

export const FAQ_GROUPS = [
  {
    key: 'accounts',
    label: 'Bank accounts',
    items: [
      {
        q: 'How many types of bank account can an NRI open?',
        a: 'Three main types: an NRE (Non-Resident External) account, an NRO (Non-Resident Ordinary) account and an FCNR(B) (Foreign Currency Non-Resident) deposit.',
      },
      {
        q: 'What is an NRE account, and who can open one?',
        a: 'A rupee account for money you earn abroad. It is liquid, the interest is exempt from Indian tax, and both principal and interest can be sent back abroad freely. NRIs and Overseas Citizens of India (including former PIO card holders) can open one.',
      },
      {
        q: 'What is an NRO account?',
        a: 'A rupee account for income you earn in India, such as rent, dividends or pension. It can receive funds in rupees or foreign currency. Interest is taxable in India.',
      },
      {
        q: 'What is an FCNR(B) account?',
        a: 'A fixed deposit held in a foreign currency, for a term of one to five years. Because the money never converts to rupees, you carry no exchange-rate risk. It is open to NRIs and OCIs.',
      },
      {
        q: 'Is interest on NRI bank accounts tax-free?',
        a: 'Interest on NRE and FCNR(B) accounts is exempt from tax in India while you are a non-resident. Interest on an NRO account is fully taxable, with TDS at 30% plus surcharge and cess and no threshold.',
      },
      {
        q: 'Can a resident power of attorney holder open or close an NRE account?',
        a: 'No. A resident power of attorney holder can operate the account for permitted local payments and investments, but cannot open or close it.',
      },
      {
        q: 'What is FEMA?',
        a: 'The Foreign Exchange Management Act, 1999 governs how foreign exchange moves in and out of India. It sets the rules for NRI bank accounts, investments, property purchases and repatriation.',
      },
    ],
  },
  {
    key: 'funds',
    label: 'Mutual funds',
    items: [
      {
        q: 'Can NRIs invest in mutual funds in India?',
        a: 'Yes. NRIs and OCIs can invest in Indian mutual funds on a repatriable or non-repatriable basis, once KYC and regulatory requirements are complete.',
      },
      {
        q: 'Are there restrictions for NRIs in the US and Canada?',
        a: 'Some fund houses do not accept investments from residents of the US and Canada, or accept them only with additional declarations, because of FATCA reporting rules. Several do accept them. We can tell you which.',
      },
      {
        q: 'Can NRIs invest through a SIP?',
        a: 'Yes. A SIP can run from your NRE or NRO account like any other mutual fund investment.',
      },
      {
        q: 'Can NRIs choose between Growth and IDCW options?',
        a: 'Yes, both are available. IDCW (Income Distribution cum Capital Withdrawal) is the current name for what used to be called the dividend option.',
      },
      {
        q: 'Can I send my redemption money abroad whenever I want?',
        a: 'Proceeds credited to an NRE account can be sent abroad freely. Proceeds credited to an NRO account can also be sent abroad, up to USD 1 million per financial year across all your NRO balances, after tax and with a chartered accountant’s certificate (Form 15CA/15CB).',
      },
      {
        q: 'What is the process for investing?',
        a: [
          'Open an NRE or NRO account with an Indian bank.',
          'Complete KYC with your PAN, passport, overseas address proof, a photograph and a FATCA declaration.',
          'Submit the fund application. Payment must come from your NRE or NRO account.',
          'If you appoint a power of attorney holder to invest for you, both signatures are needed on the documents.',
        ],
      },
      {
        q: 'What rules apply at redemption?',
        a: [
          'Tax is deducted at source on your gains before the money is paid out.',
          'If the investment was made on a non-repatriable basis, proceeds are credited only to your NRO account.',
          'If more tax was deducted than you owe, you can claim a refund by filing an income tax return in India.',
        ],
      },
    ],
  },
  {
    key: 'tax',
    label: 'Tax',
    items: [
      {
        q: 'How are NRI mutual fund investors taxed?',
        a: [
          'Equity-oriented funds: 20% on short-term gains (held under 12 months) and 12.5% on long-term gains above ₹1.25 lakh a year, with no indexation.',
          'Debt-oriented funds bought on or after 1 April 2023: gains are taxed at your slab rate whatever the holding period.',
          'Surcharge, where it applies, and 4% cess are added to these rates.',
        ],
      },
      {
        q: 'What is the TDS rate when an NRI redeems?',
        a: 'For equity-oriented funds, 20% on short-term and 12.5% on long-term gains. For debt-oriented funds taxed at slab rates, 30%. Surcharge and cess are added. Unlike residents, NRIs cannot submit Form 15G or 15H to avoid TDS.',
      },
      {
        q: 'Do NRIs need to file an income tax return in India?',
        a: 'Yes, if your total income in India exceeds the basic exemption limit: ₹4 lakh under the new tax regime, which is the default, or ₹2.5 lakh under the old regime. Note that the basic exemption cannot be set against capital gains taxed at special rates. Filing is also how you claim a refund of excess TDS.',
      },
      {
        q: 'Will I be taxed again in the country where I live?',
        a: 'India has Double Taxation Avoidance Agreements with more than 85 countries. If you live in one of them, the treaty lets you avoid paying tax twice on the same income, usually through a credit for tax paid in India. You will need a Tax Residency Certificate from your country.',
      },
      {
        q: 'Can NRIs claim the ₹1.5 lakh deduction for ELSS and similar investments?',
        a: 'Yes, but only under the old tax regime. The deduction, formerly Section 80C and now Section 123 of the Income-tax Act, 2025, covers ELSS funds, life insurance premiums, children’s tuition fees, home loan principal repayment and ULIPs.',
      },
      {
        q: 'Which of those investments are not open to NRIs?',
        a: 'NRIs cannot open a new Public Provident Fund account or invest in National Savings Certificates, the five-year Post Office deposit or the Senior Citizens’ Savings Scheme.',
      },
      {
        q: 'Is a life insurance payout taxable?',
        a: 'Maturity proceeds are exempt if the annual premium does not exceed 10% of the sum assured, for policies issued after 1 April 2012. The exemption does not apply to ULIPs with annual premiums above ₹2.5 lakh or other policies with aggregate annual premiums above ₹5 lakh. Death benefits remain exempt.',
      },
    ],
  },
  {
    key: 'residency',
    label: 'Residency',
    items: [
      {
        q: 'What residential statuses does Indian tax law recognise?',
        a: 'Three: Resident and Ordinarily Resident (ROR), Resident but Not Ordinarily Resident (RNOR), and Non-Resident (NR).',
      },
      {
        q: 'How is residential status decided?',
        a: [
          'You are resident if you are in India for 182 days or more in the tax year.',
          'You are also resident if you are in India for 60 days or more in the year and 365 days or more over the previous four years. For Indian citizens and people of Indian origin visiting India, that 60 is read as 182.',
          'If your Indian income is above ₹15 lakh, the 182 in the visiting rule is read as 120.',
          'If you meet neither test, you are a non-resident.',
        ],
      },
      {
        q: 'What is Resident but Not Ordinarily Resident (RNOR)?',
        a: 'A resident who has been a non-resident in nine of the previous ten years, or has spent 729 days or fewer in India over the previous seven years. People who become resident under the 120-day rule or the deemed residency rule are also RNOR. An RNOR is generally not taxed in India on foreign income, which makes it a useful status for returning NRIs.',
      },
      {
        q: 'What does “deemed resident” mean?',
        a: 'An Indian citizen whose Indian income exceeds ₹15 lakh and who is not liable to tax in any other country by reason of domicile or residence is treated as resident in India, even without visiting. They are classed as RNOR.',
      },
      {
        q: 'What is the difference between an NRI, a PIO and an OCI?',
        a: 'An NRI is an Indian citizen who lives abroad. A Person of Indian Origin is a foreign citizen with Indian roots. The separate PIO card was merged into the Overseas Citizen of India (OCI) scheme in 2015, so OCI is the status that applies today. For most investments, NRIs and OCIs are treated alike.',
      },
      {
        q: 'Can a Hindu Undivided Family be a non-resident?',
        a: 'Yes, but only if the control and management of its affairs is wholly outside India during the year. The karta’s own residential status does not decide whether the HUF is resident, though it does decide whether a resident HUF is ordinarily resident.',
      },
    ],
  },
]
