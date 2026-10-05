// Long-form content for each service's own page (/services/<slug>), keyed by slug.
// Taken from the live site (kroldmfins.com/service). General Insurance and REITs / InvITs
// are not on the live site yet, so those two were written to the same structure.
//
// Each section has a heading, an optional intro `text`, and `items`; an item is a card with
// a title, an optional line of text and optional bullet `points`.
export const SERVICE_DETAILS = {
  'mutual-funds': {
    intro: [
      'At Krold Mfins, we offer professional and reliable Mutual Fund Distribution services designed to help you grow and manage your wealth efficiently. Whether you’re new to investing or looking to expand your investment portfolio, our team ensures you get the right guidance and access to top-performing mutual funds from trusted Asset Management Companies (AMCs).',
    ],
    sections: [
      {
        heading: 'Why choose us?',
        items: [
          {
            title: 'Extensive Fund Options',
            text: 'Access a wide range of mutual funds including Equity, Debt, Hybrid, Tax Saving (ELSS), and more — carefully selected to match your risk profile and financial objectives.',
          },
          {
            title: 'Goal-Oriented Investment Planning',
            text: 'We take time to understand your short-term and long-term financial goals and recommend mutual fund schemes that align with your needs.',
          },
          {
            title: 'Seamless Investing Experience',
            text: 'From paperless onboarding to real-time portfolio tracking, we make your investment journey smooth, secure, and stress-free.',
          },
          {
            title: 'Continuous Monitoring & Support',
            text: 'Your portfolio doesn’t end with investing. We provide regular performance updates and reviews to help you stay on track and maximize returns.',
          },
          {
            title: 'Fully Compliant & Transparent',
            text: 'As an AMFI registered distributor, we follow all regulatory guidelines and provide full transparency — no hidden charges, no biased advice.',
          },
        ],
      },
    ],
  },

  insurance: {
    intro: [
      'At Krold Mfins, we help you prepare for life’s uncertainties with reliable and personalized Life and Health Insurance solutions. Whether you’re protecting your family’s financial future or covering medical emergencies, our insurance plans ensure peace of mind when it matters the most.',
    ],
    sections: [
      {
        heading: 'Why choose us?',
        items: [
          {
            title: 'Trusted Insurance Partners',
            text: 'We work with leading life and health insurance providers in India to offer you the best options under one roof.',
          },
          {
            title: 'Tailored Coverage Plans',
            text: 'Our team understands your personal or family needs and suggests insurance products that match your goals, lifestyle, and budget.',
          },
          {
            title: 'Easy Policy Issuance & Renewals',
            text: 'Enjoy a hassle-free digital onboarding process with timely reminders for premium payments and policy renewals.',
          },
          {
            title: 'End-to-End Support',
            text: 'From selecting the right policy to assisting with claims, our advisors are with you at every step.',
          },
        ],
      },
      {
        heading: 'Our insurance offerings',
        items: [
          {
            title: 'Life Insurance',
            points: [
              'Term Life Insurance',
              'Endowment Plans',
              'ULIPs (Unit Linked Insurance Plans)',
              'Child Plans',
              'Retirement / Annuity Plans',
            ],
          },
          {
            title: 'Health Insurance',
            points: [
              'Individual Health Insurance',
              'Family Floater Plans',
              'Critical Illness Cover',
              'Senior Citizen Health Plans',
              'Personal Accident Cover',
              'Top-up and Super Top-up Plans',
            ],
          },
        ],
      },
    ],
  },

  'pms-aif': {
    intro: [
      'At Krold Mfins, we go beyond traditional investments with exclusive Portfolio Management Services (PMS) and Alternative Investment Funds (AIFs) designed for high-net-worth individuals (HNIs) and savvy investors looking for personalized, high-growth investment strategies.',
    ],
    sections: [
      {
        heading: 'What we offer',
        items: [
          {
            title: 'Portfolio Management Services (PMS)',
            text: 'Our PMS solutions offer personalized investment portfolios, professionally managed by experienced fund managers. With a focus on performance, transparency, and tailored asset allocation, PMS is ideal for investors seeking direct ownership of stocks with active management.',
            points: [
              'Customized investment strategies',
              'Dedicated fund managers',
              'Transparent reporting & real-time monitoring',
              'Suitable for investments above ₹50 Lacs',
            ],
          },
          {
            title: 'Alternative Investment Funds (AIFs)',
            text: 'AIFs provide access to specialized investment opportunities not available through mutual funds, such as private equity, venture capital, real estate, and structured credit. AIFs are best suited for sophisticated investors with higher risk appetite and long-term goals.',
            points: [
              'Diversified alternative assets',
              'Category I, II & III AIFs',
              'Professionally managed by SEBI-registered entities',
              'Suitable for investments above ₹1 Crore',
            ],
          },
        ],
      },
      {
        heading: 'Why choose Krold Mfins?',
        items: [
          {
            title: 'Access to Top Fund Houses & Strategies',
            text: 'Partnered with leading PMS & AIF providers in India.',
          },
          {
            title: 'Personalized Investment Planning',
            text: 'We understand your financial goals, risk profile, and liquidity needs before recommending any product.',
          },
          {
            title: 'Dedicated Relationship Manager',
            text: 'One-on-one service for portfolio reviews, performance insights, and support.',
          },
          {
            title: 'End-to-End Execution & Compliance',
            text: 'We ensure seamless onboarding, KYC, documentation, and reporting in compliance with SEBI norms.',
          },
        ],
      },
    ],
  },

  'general-insurance': {
    intro: [
      'At Krold Mfins, we help you protect what you have worked hard to build. Our General Insurance solutions cover your business, property, stock, machinery, vehicles and home against the unexpected — so a fire, theft, accident or breakdown does not undo years of effort.',
    ],
    sections: [
      {
        heading: 'What we cover',
        items: [
          {
            title: 'Property & Fire Insurance',
            text: 'Cover for offices, factories, shops and warehouses against fire, flood, storm, earthquake and other insured perils.',
          },
          {
            title: 'Stock & Burglary Insurance',
            text: 'Protection for raw materials, finished goods and other stock against theft, burglary and damage.',
          },
          {
            title: 'Machinery Breakdown',
            text: 'Cover for the repair or replacement of plant and machinery after sudden, accidental breakdown.',
          },
          {
            title: 'Loss of Profit',
            text: 'Business interruption cover that helps replace lost income and meet fixed costs while operations recover after an insured loss.',
          },
          {
            title: 'Marine & Transit Insurance',
            text: 'Protection for goods moving by road, rail, sea or air, from dispatch to delivery.',
          },
          {
            title: 'Motor Insurance',
            text: 'Comprehensive and third-party cover for private cars, two-wheelers and commercial vehicles.',
          },
          {
            title: 'Home Insurance',
            text: 'Cover for your home’s structure and its contents against fire, natural calamities and burglary.',
          },
          {
            title: 'Liability Insurance',
            text: 'Protection against legal claims from third parties, employees or customers arising from your business.',
          },
        ],
      },
      {
        heading: 'Why choose us?',
        items: [
          {
            title: 'Leading General Insurers',
            text: 'We work with reputed, IRDAI-registered general insurance companies to bring you a choice of options under one roof.',
          },
          {
            title: 'Cover Matched to Your Risks',
            text: 'We take time to understand your business and assets, then recommend the sum insured and add-ons that genuinely fit — not just the lowest premium.',
          },
          {
            title: 'Easy Issuance & Renewals',
            text: 'A hassle-free process with timely renewal reminders, so your cover never lapses unnoticed.',
          },
          {
            title: 'Claims Assistance',
            text: 'From intimation to documentation and follow-up, our team supports you through the claim process.',
          },
        ],
      },
    ],
  },

  annuity: {
    intro: [
      'At Krold Mfins, we help you secure your post-retirement life through Annuity Plans that offer a fixed, guaranteed income for a lifetime. Ideal for individuals seeking financial stability after retirement, annuity plans ensure you never run out of money, no matter how long you live.',
    ],
    sections: [
      {
        heading: 'What are annuity plans?',
        text: 'An annuity plan is a financial product where you invest a lump sum amount and, in return, receive a regular, guaranteed payout monthly, quarterly, or annually for a specific period or for life. These plans are especially useful after retirement when steady income becomes crucial.',
        items: [],
      },
      {
        heading: 'Key benefits of annuity plans',
        items: [
          {
            title: 'Lifetime Guaranteed Income',
            text: 'Receive fixed payments for a defined period or for the rest of your life.',
          },
          {
            title: 'Customizable Payout Options',
            text: 'Choose payout frequency and whether it should continue for a spouse or beneficiary after your lifetime.',
          },
          {
            title: 'Tax-Efficient Retirement Planning',
            text: 'Secure returns without worrying about market volatility or reinvestment risks.',
          },
          {
            title: 'One-Time Investment',
            text: 'Just invest once and enjoy worry-free income for years.',
          },
          {
            title: 'Safe & Regulated',
            text: 'Offered by leading life insurance companies and governed by IRDAI.',
          },
        ],
      },
      {
        heading: 'Types of annuity plans we offer',
        items: [
          {
            title: 'Immediate Annuity Plans',
            text: 'Begin receiving income immediately after a lump-sum payment.',
          },
          {
            title: 'Deferred Annuity Plans',
            text: 'Build a retirement corpus over time, then start receiving payouts later.',
          },
          {
            title: 'Lifetime Annuity with Spouse Benefit',
            text: 'Income continues for the spouse after the primary policyholder’s death.',
          },
          {
            title: 'Annuity with Return of Purchase Price',
            text: 'Receive annuity payouts, and your invested amount is returned to your nominee.',
          },
        ],
      },
    ],
  },

  bonds: {
    intro: [
      'Bonds are fixed-income investment instruments where you lend money to a government or corporation in exchange for regular interest payments and the return of principal at maturity. Bonds are ideal for conservative investors looking for steady, predictable returns and capital preservation.',
      'At Krold Mfins, we offer expert assistance in investing in bonds — a reliable and low-risk option for building wealth with consistent returns. Whether you’re looking to diversify your portfolio or secure fixed income, our bond investment services cater to all types of investors.',
    ],
    sections: [
      {
        heading: 'Types of bonds we offer',
        items: [
          { title: 'Government Bonds', text: 'Safe and sovereign-backed options with fixed interest.' },
          { title: 'Corporate Bonds', text: 'Bonds issued by reputed companies with competitive interest rates.' },
          { title: 'Tax-Free Bonds', text: 'Enjoy tax-free interest income on selected government-backed bonds.' },
          { title: 'RBI Floating Rate Bonds', text: 'Government-issued bonds with interest linked to market rates.' },
          { title: 'Debentures & NCDs', text: 'High-yield options issued by trusted corporates with fixed tenure.' },
        ],
      },
      {
        heading: 'Why invest in bonds?',
        items: [
          { title: 'Stable Returns', text: 'Fixed and predictable income over a period of time.' },
          { title: 'Lower Risk', text: 'Less volatile compared to equities and ideal for capital protection.' },
          { title: 'Portfolio Diversification', text: 'Balances risk and return across different asset classes.' },
          { title: 'Tax Advantages', text: 'Some bonds offer tax-free interest or indexation benefits.' },
          { title: 'Liquidity Options', text: 'Many bonds are tradable in the secondary market.' },
        ],
      },
      {
        heading: 'Why choose Krold Mfins?',
        items: [
          {
            title: 'Access to a Wide Range of Bonds',
            text: 'We source bonds from top-rated issuers and government bodies.',
          },
          {
            title: 'Tailored Recommendations',
            text: 'Our advisors help you select bonds based on your risk profile, goals, and investment horizon.',
          },
          {
            title: 'Transparent Process',
            text: 'No hidden fees, clear returns, and full regulatory compliance.',
          },
          {
            title: 'Full Support',
            text: 'From selection and documentation to demat credit and redemption tracking, we handle it all.',
          },
        ],
      },
    ],
  },

  'stock-broking': {
    intro: [
      'At Krold Mfins, we provide reliable and efficient stock broking services to help you navigate the dynamic world of equity markets. Whether you’re a beginner or an experienced trader, our expert guidance, robust platform access, and personalized support make stock investing simpler and smarter.',
    ],
    sections: [
      {
        heading: 'End-to-end stock trading services',
        items: [
          {
            title: 'Equity Trading (Cash & Delivery)',
            text: 'Buy and hold shares in top Indian companies with ease.',
          },
          {
            title: 'Derivatives Trading (Futures & Options)',
            text: 'Participate in high-leverage trading with proper risk strategies.',
          },
          {
            title: 'IPO Investments',
            text: 'Invest in upcoming Initial Public Offerings (IPOs) with full assistance.',
          },
          {
            title: 'ETFs & Index Funds',
            text: 'Diversify easily with Exchange-Traded Funds and passive index investing.',
          },
          {
            title: 'Research & Advisory Support',
            text: 'Get access to technical analysis, market insights, and actionable calls.',
          },
        ],
      },
      {
        heading: 'Why choose Krold Mfins?',
        items: [
          {
            title: 'Partnered with Leading Stock Brokers',
            text: 'Trade via reputed and SEBI-registered broking platforms with full transparency.',
          },
          {
            title: 'Easy Account Setup',
            text: 'Open your demat & trading account with minimal paperwork and full assistance.',
          },
          {
            title: 'Personalized Portfolio Guidance',
            text: 'Get tailored advice based on your risk profile and investment objectives.',
          },
          {
            title: 'Real-Time Market Access',
            text: 'Access live market data, charts, and tools through reliable platforms.',
          },
          {
            title: 'Dedicated Relationship Manager',
            text: 'For regular updates, trade support, and query resolution.',
          },
        ],
      },
    ],
  },

  'unlisted-shares': {
    intro: [
      'Unlisted shares are shares of companies that are privately held or in pre-IPO placement. These include startups, mature private companies, or subsidiaries of listed companies that have not yet gone public. They are traded through over-the-counter (OTC) platforms or private placements.',
      'At Krold Mfins, we help investors unlock the potential of unlisted shares. Investing in unlisted shares offers early access to high-growth companies, long-term wealth creation opportunities, and portfolio diversification.',
    ],
    sections: [
      {
        heading: 'Why invest in unlisted shares?',
        items: [
          {
            title: 'High Growth Potential',
            text: 'Early access to companies before they go public — get in before valuations rise.',
          },
          {
            title: 'Portfolio Diversification',
            text: 'Add unique, non-market-correlated assets to balance your investment strategy.',
          },
          {
            title: 'Pre-IPO Investment Opportunities',
            text: 'Invest in companies expected to be listed soon, potentially benefiting from IPO valuation gains.',
          },
          {
            title: 'Long-Term Wealth Creation',
            text: 'Ideal for investors with a high risk appetite and a medium to long-term investment horizon.',
          },
        ],
      },
      {
        heading: 'Why choose Krold Mfins?',
        items: [
          {
            title: 'Verified Opportunities',
            text: 'We offer access to carefully vetted unlisted shares from trusted sources.',
          },
          {
            title: 'Expert Advisory',
            text: 'Our experienced team helps you evaluate risks, valuation, and timing for entry and exit.',
          },
          {
            title: 'Transparent Transactions',
            text: 'Fair pricing, secure processing, and complete regulatory compliance.',
          },
          {
            title: 'End-to-End Support',
            text: 'From sourcing to documentation and demat transfers, we manage the entire process.',
          },
        ],
      },
    ],
  },

  'reits-invits': {
    intro: [
      'Real Estate Investment Trusts (REITs) and Infrastructure Investment Trusts (InvITs) pool money from many investors to own income-generating assets such as office parks, malls, highways and power transmission lines. Their units are listed on the stock exchanges, so you can buy and sell them through your demat account much like shares.',
      'At Krold Mfins, we help you add REITs and InvITs to your portfolio — a way to take part in large real estate and infrastructure assets without having to buy, manage or maintain a property yourself.',
    ],
    sections: [
      {
        heading: 'What we offer',
        items: [
          {
            title: 'Real Estate Investment Trusts (REITs)',
            text: 'REITs own and operate completed, rent-yielding commercial real estate and pass on most of the income they earn to unit holders.',
            points: [
              'Grade-A offices, business parks and retail malls',
              'Income from rent paid by tenants',
              'Listed on NSE and BSE',
              'Regulated by SEBI',
            ],
          },
          {
            title: 'Infrastructure Investment Trusts (InvITs)',
            text: 'InvITs hold operating infrastructure projects and distribute the cash flows those projects generate to unit holders.',
            points: [
              'Roads, power transmission, pipelines and telecom towers',
              'Income from tolls, tariffs and long-term contracts',
              'Publicly listed and privately placed options',
              'Regulated by SEBI',
            ],
          },
        ],
      },
      {
        heading: 'Why invest in REITs and InvITs?',
        items: [
          {
            title: 'Regular Income',
            text: 'Both are required to distribute the bulk of their net distributable cash flows to unit holders at regular intervals.',
          },
          {
            title: 'Low Entry Barrier',
            text: 'Own a share of large commercial and infrastructure assets for a fraction of what a direct purchase would cost.',
          },
          {
            title: 'Portfolio Diversification',
            text: 'Adds real assets to a portfolio of equity and debt, with returns that do not move in step with either.',
          },
          {
            title: 'Liquidity',
            text: 'Listed units can be bought and sold on the exchange, unlike physical property.',
          },
          {
            title: 'Professional Management',
            text: 'Assets are run by experienced managers under SEBI regulations, with regular disclosures to investors.',
          },
        ],
      },
      {
        heading: 'Why choose Krold Mfins?',
        items: [
          {
            title: 'Informed Selection',
            text: 'We help you compare trusts on asset quality, occupancy, distribution track record and valuation.',
          },
          {
            title: 'Tailored Recommendations',
            text: 'Our advisors suggest an allocation that fits your income needs, risk profile and investment horizon.',
          },
          {
            title: 'Transparent Process',
            text: 'Clear information on risks, taxation of distributions and costs before you invest.',
          },
          {
            title: 'End-to-End Support',
            text: 'From demat account setup to investing and ongoing reviews, we handle it all.',
          },
        ],
      },
    ],
  },
}
