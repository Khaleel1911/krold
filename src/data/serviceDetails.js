// Long-form content for each service's own page (/services/<slug>), keyed by slug.
//
// Each page has a `hero` (headline, supporting text, button label), an ordered list of
// `sections`, and a `closing` call to action (its button falls back to "Get in Touch").
// A section has a heading and any of:
//   text    – paragraphs
//   callout – a one-line analogy, set apart from the paragraphs
//   points  – a plain bulleted list
//   items   – cards, each with a title and a line of text
//   groups  – titled sets of items (e.g. "With Mutual Funds" / "With SIFs"), one panel each
//   steps   – a left-to-right flow of numbered steps, each with a title and a line of text
//   faqs    – questions and answers
//   note    – a closing line under the section
// and may name a `kind` ('intro', 'benefits', 'fit', 'why') to get that section's own layout.
// Where a page covers two products, they are always listed in the same order: the first
// is shown in blue and the second in green throughout the page.
const HOW_IT_WORKS = 'How it works'
const BENEFITS = 'How you benefit'
const FIT = 'Is this right for you?'
const WHY = 'Why KROLD MFINS'
const FAQS = 'Quick FAQs'

export const SERVICE_DETAILS = {
  'mutual-funds': {
    hero: {
      title: 'Invest with experts. Grow at your pace.',
      text: 'From simple monthly SIPs to sophisticated strategies, we help you choose the right Mutual Funds and Specialised Investment Funds for your goals.',
      cta: 'Talk to us',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        items: [
          {
            title: 'Mutual Funds',
            text: 'A mutual fund pools money from many investors and invests it in a mix of shares, bonds, or both. A professional fund manager makes the day-to-day decisions. You get a diversified portfolio without having to pick stocks yourself. It’s like hiring an expert to manage your money full time, at a fraction of the cost.',
          },
          {
            title: 'Specialised Investment Funds (SIFs)',
            text: 'SIFs are a newer SEBI-regulated category, introduced in 2025 for experienced investors, starting at ₹10 lakh. They give fund managers more flexibility than regular mutual funds, including the ability to take limited “short” positions. That gives the manager more tools to handle different market conditions. SIFs sit between mutual funds and portfolio management services (PMS).',
          },
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'We understand your goals.',
            text: 'What you’re investing for, your timeline, and how much risk you’re comfortable with.',
          },
          {
            title: 'We find the right fit.',
            text: 'We shortlist funds or SIF strategies that match your profile.',
          },
          {
            title: 'You invest your way.',
            text: 'Invest a lump sum or through a SIP, with simple onboarding.',
          },
          {
            title: 'We track and review.',
            text: 'You get one consolidated view of your investments, plus regular reviews to keep you on course.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        groups: [
          {
            title: 'With Mutual Funds',
            items: [
              {
                title: 'Start small',
                text: 'Begin a SIP with a modest monthly amount and increase it as your income grows.',
              },
              {
                title: 'Diversification',
                text: 'Your money is spread across many companies or bonds, not tied to one.',
              },
              {
                title: 'Easy access',
                text: 'Most open-ended funds can be redeemed on any business day.',
              },
              {
                title: 'Transparent and regulated',
                text: 'Funds are SEBI-regulated, and the value of your units (NAV) is published daily.',
              },
            ],
          },
          {
            title: 'With SIFs',
            items: [
              {
                title: 'More sophisticated strategies',
                text: 'Approaches that standard mutual funds can’t use.',
              },
              {
                title: 'Premium access, lower entry',
                text: 'Advanced strategies at a lower starting point than most PMS products.',
              },
              {
                title: 'A familiar, regulated structure',
                text: 'SIFs are offered by established fund houses under SEBI oversight.',
              },
            ],
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'Mutual Funds may suit you if you’re starting your investment journey, or building wealth for goals three or more years away, such as a home, your children’s education, or retirement.',
          'SIFs may suit you if you have ₹10 lakh or more to invest, already hold a core portfolio, and are comfortable with more complex strategies and higher risk.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'Goals first, products second.',
            text: 'We recommend what fits your plan, not what’s trending.',
          },
          { title: 'One view of everything.', text: 'All your investments are tracked in one place.' },
          { title: 'A person, not a portal.', text: 'A dedicated relationship manager is a call away.' },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'How much do I need to start?',
            a: 'Mutual fund SIPs can start from small monthly amounts; the minimum varies by scheme. SIFs need a total of ₹10 lakh across a fund house’s SIF strategies, counted per PAN.',
          },
          {
            q: 'Can I withdraw anytime?',
            a: 'Most open-ended mutual funds, yes. Some products have restrictions, such as the 3-year lock-in on tax-saving ELSS funds and fixed redemption windows on certain SIF strategies.',
          },
          {
            q: 'Are returns guaranteed?',
            a: 'No. Investment values rise and fall with markets. That’s why we match each investment to your time horizon and comfort with risk.',
          },
          {
            q: 'How are these taxed?',
            a: 'Tax depends on the type of fund and how long you hold it. We’ll walk you through it before you invest.',
          },
        ],
      },
    ],
    closing: {
      title: 'Not sure where to start? Let’s build your plan together.',
      cta: 'Talk to an expert',
    },
  },

  insurance: {
    hero: {
      title: 'Protect what matters most.',
      text: 'Life insurance secures your family’s future. Health insurance protects your savings from medical bills. We help you choose the right cover, and we stand by you when it’s time to claim.',
      cta: 'Get your cover reviewed',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        items: [
          {
            title: 'Life Insurance',
            text: 'Life insurance pays a lump sum to your family if something happens to you. The simplest and most affordable form is a term plan: you pay a small yearly premium, and your family receives a large payout if you pass away during the policy term. It replaces your income so your family’s goals don’t have to stop.',
          },
          {
            title: 'Health Insurance',
            text: 'Health insurance pays your hospital bills, so a medical emergency doesn’t wipe out years of savings. With cashless treatment at network hospitals, the insurer settles the bill directly. You focus on recovery, not paperwork.',
          },
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'We assess your needs.',
            text: 'Your income, dependents, loans, and family health history help decide how much cover is right.',
          },
          {
            title: 'We compare and shortlist.',
            text: 'We look at plans from multiple insurers and explain the fine print in plain language.',
          },
          {
            title: 'You get covered.',
            text: 'Simple application and medical checks where needed, with your policy issued digitally.',
          },
          {
            title: 'We support your claims.',
            text: 'When you need it most, we help with documents and follow-ups so the process stays smooth.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        groups: [
          {
            title: 'With Life Insurance',
            items: [
              {
                title: 'Large cover, small cost',
                text: 'Term plans give substantial protection for a modest premium, especially when bought young.',
              },
              {
                title: 'Your family stays on track',
                text: 'Loans, education, and daily expenses stay covered even in your absence.',
              },
              { title: 'Lower premiums', text: 'Individual life policies no longer attract GST.' },
            ],
          },
          {
            title: 'With Health Insurance',
            items: [
              {
                title: 'Cashless hospitalisation',
                text: 'Treatment at network hospitals without arranging large sums upfront.',
              },
              {
                title: 'Cover for the whole family',
                text: 'One family floater plan can protect your spouse, children, and parents.',
              },
              {
                title: 'Fairer rules for existing illnesses',
                text: 'Pre-existing conditions are covered after a waiting period of no more than three years.',
              },
              {
                title: 'Never too late',
                text: 'There’s no upper age limit to buy a new health policy.',
              },
            ],
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'Life insurance is essential if anyone depends on your income, such as a spouse, children, or parents, or if you have loans like a home loan.',
          'Health insurance is essential for everyone. Even if your employer covers you, a personal policy keeps you protected when you change jobs or retire.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'Unbiased comparison.',
            text: 'We look across insurers to find the plan that fits you, not the other way round.',
          },
          {
            title: 'Fine print, explained.',
            text: 'Waiting periods, sub-limits, and exclusions are made clear before you buy.',
          },
          {
            title: 'Claim support you can count on.',
            text: 'A real person helps your family when it matters most.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'How much life cover do I need?',
            a: 'A common starting point is 10–15 times your annual income, plus any outstanding loans. We’ll work out the right figure for you.',
          },
          {
            q: 'My employer gives me health cover. Do I still need my own?',
            a: 'Usually, yes. Employer cover ends when you leave the job, and it’s often not enough for a serious illness.',
          },
          {
            q: 'What if I change my mind after buying?',
            a: 'You have a 30-day free-look period after receiving the policy. Within that window, you can return it and get a refund, minus certain permitted deductions.',
          },
          {
            q: 'Are there tax benefits?',
            a: 'Premiums may qualify for tax deductions, depending on the tax regime you choose. We’ll explain what applies to you.',
          },
        ],
      },
    ],
    closing: {
      title: 'One conversation could protect your family for a lifetime.',
      cta: 'Get in Touch',
    },
  },

  'pms-aif': {
    hero: {
      title: 'Wealth management, built around you.',
      text: 'Portfolio Management Services and Alternative Investment Funds give serious investors access to dedicated expertise, personalised portfolios, and opportunities beyond the stock market.',
      cta: 'Schedule a private consultation',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        items: [
          {
            title: 'Portfolio Management Services (PMS)',
            text: 'In a PMS, a SEBI-registered portfolio manager builds and manages a portfolio of stocks just for you. Unlike a mutual fund, your money isn’t pooled with others. Every share is held directly in your own demat account, so you always see exactly what you own. If a mutual fund is a shared ride, PMS is your own car with an expert driver.',
          },
          {
            title: 'Alternative Investment Funds (AIFs)',
            text: 'AIFs are professionally managed, SEBI-regulated funds that invest in areas most investors can’t easily reach. These include startups, private companies, real estate, private credit, and advanced trading strategies. They come in three categories, ranging from early-stage businesses to sophisticated market strategies.',
          },
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'We understand your wealth.',
            text: 'Your existing portfolio, goals, liquidity needs, and appetite for risk.',
          },
          {
            title: 'We shortlist the right managers.',
            text: 'We evaluate portfolio managers and fund houses on strategy, track record, process, and fees.',
          },
          {
            title: 'You invest seamlessly.',
            text: 'We handle onboarding, documentation, and account setup end to end.',
          },
          {
            title: 'We monitor on your behalf.',
            text: 'Regular reports, periodic reviews, and an honest view of how each investment is doing.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        groups: [
          {
            title: 'With PMS',
            items: [
              {
                title: 'A portfolio of your own',
                text: 'Built around your goals, not a one-size-fits-all fund.',
              },
              {
                title: 'Complete transparency',
                text: 'You can see every stock and every transaction in your own demat account.',
              },
              {
                title: 'Direct access to the manager',
                text: 'Experienced portfolio managers with a clear, defined investment approach.',
              },
              {
                title: 'Your choice of control',
                text: 'Let the manager decide everything (discretionary), or approve each trade yourself (non-discretionary).',
              },
            ],
          },
          {
            title: 'With AIFs',
            items: [
              {
                title: 'Beyond listed markets',
                text: 'Access to private equity, venture capital, private credit, and real estate.',
              },
              {
                title: 'True diversification',
                text: 'Returns that don’t simply follow the stock market’s ups and downs.',
              },
              {
                title: 'Institutional-grade strategies',
                text: 'Approaches that are typically used by large investors and family offices.',
              },
            ],
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'PMS may suit you if you have ₹50 lakh or more to invest, prefer a personalised portfolio, and are investing for at least 3–5 years.',
          'AIFs may suit you if you can commit ₹1 crore or more, already have a well-diversified core portfolio, and can stay invested for several years. Many AIFs have fixed tenures with limited early exit.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          { title: 'Rigorous due diligence.', text: 'We assess managers on far more than past returns.' },
          {
            title: 'Open architecture.',
            text: 'We compare options across fund houses and recommend what fits you.',
          },
          {
            title: 'One consolidated view.',
            text: 'Your PMS, AIFs, and other investments are tracked together, with regular reviews.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'What is the minimum investment?',
            a: '₹50 lakh for PMS, as set by SEBI. Most AIFs require at least ₹1 crore. Lower limits apply for certain eligible “accredited investors.”',
          },
          {
            q: 'Can I withdraw my money?',
            a: 'In PMS, yes, partially or fully. After a partial withdrawal, though, your portfolio must stay above ₹50 lakh. Many AIFs are close-ended with a fixed tenure, so plan for your money to be locked in for several years.',
          },
          {
            q: 'How are fees charged?',
            a: 'PMS and AIF managers usually charge a management fee, and some also charge a share of profits. We explain every fee clearly before you invest.',
          },
          {
            q: 'How is tax handled?',
            a: 'In PMS, each transaction is taxed in your hands, since you own the stocks directly. AIF taxation depends on the category. We’ll walk you through it.',
          },
        ],
      },
    ],
    closing: {
      title: 'Ready to take your portfolio to the next level?',
      cta: 'Speak with our wealth team',
    },
  },

  'general-insurance': {
    hero: {
      title: 'Your factory runs on risk. Let’s make sure it doesn’t stop.',
      text: 'One fire, a breakdown, or a lost shipment can halt production for months. We help manufacturers and business owners protect their plant, stock, and profits with the right insurance.',
      cta: 'Get a free risk review of your business',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'General insurance protects everything that isn’t life or health: your buildings, machines, stock, goods in transit, vehicles, and your legal liabilities. For a business owner, it’s the safety net that turns a potential disaster into a manageable setback.',
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'We visit and understand your business.',
            text: 'Your premises, machinery, stock levels, supply chain, and vehicles.',
          },
          {
            title: 'We identify the gaps.',
            text: 'We look for underinsurance, missing covers, and clauses that could hurt you at claim time.',
          },
          {
            title: 'We compare and arrange cover.',
            text: 'We place the right policies with suitable insurers, explained in plain language.',
          },
          {
            title: 'We stand by you at claim time.',
            text: 'We help with surveyor visits, documents, and follow-ups until the claim is settled.',
          },
        ],
      },
      {
        heading: 'Some of the covers we help clients with',
        groups: [
          {
            title: 'For your factory and business',
            items: [
              {
                title: 'Property & Fire Insurance.',
                text: 'Covers your building, plant, machinery, and stock against fire, explosion, lightning, floods, storms, and other perils. This is the foundation of every business insurance plan.',
              },
              {
                title: 'Machinery Breakdown Insurance.',
                text: 'Pays for repairs or replacement when critical machines break down due to electrical or mechanical failure. Fire cover alone doesn’t cover this.',
              },
              {
                title: 'Loss of Profit Insurance.',
                text: 'Covers lost profits and ongoing fixed costs, such as salaries, rent, and EMIs, while your business recovers from an insured loss. Repairing the factory is half the battle; this keeps your business afloat meanwhile.',
              },
              {
                title: 'Stock & Burglary Insurance.',
                text: 'Protects your raw materials, finished goods, and valuables against theft and break-ins.',
              },
              {
                title: 'Marine & Transit Insurance.',
                text: 'Covers your goods while they move by road, rail, sea, or air, whether inbound raw materials or outbound deliveries.',
              },
              {
                title: 'Motor Insurance.',
                text: 'Covers your commercial vehicles and fleet, including the third-party cover required by law.',
              },
              {
                title: 'Liability Insurance.',
                text: 'Protects you if your business is held legally responsible for injury to people or damage to their property. For some industries, it’s mandatory.',
              },
            ],
          },
          {
            title: 'For you and your family',
            items: [
              {
                title: 'Home Insurance.',
                text: 'Protects your home and its contents against fire, natural disasters, and theft.',
              },
              {
                title: 'Car Insurance.',
                text: 'Comprehensive cover for your personal car, with add-ons like zero depreciation and roadside assistance.',
              },
            ],
          },
        ],
        note: 'Don’t see what you need? We arrange many other covers too. Just ask.',
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Business continuity.',
            text: 'Recover from a loss without draining your working capital.',
          },
          {
            title: 'No hidden gaps.',
            text: 'We check for underinsurance, so a claim isn’t cut short when you need it most.',
          },
          {
            title: 'One partner for everything.',
            text: 'Your factory, fleet, home, and car policies are managed together, with renewals tracked for you.',
          },
          {
            title: 'Claims handled with you.',
            text: 'A dedicated person supports you from the first call to final settlement.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'This is for you if you own or run a factory, manufacturing unit, warehouse, or trading business, or if you want your personal assets protected by someone who understands your whole financial picture.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'We understand manufacturing.',
            text: 'We look at your actual operations, not just a form.',
          },
          {
            title: 'Unbiased comparison.',
            text: 'We compare covers across insurers to find the right fit for your business.',
          },
          {
            title: 'Beyond insurance.',
            text: 'Once your business is protected, we can help you grow the wealth it creates through Mutual Funds, PMS, and more.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'I already have fire insurance. Isn’t that enough?',
            a: 'Often it isn’t. Fire insurance doesn’t cover machinery breakdown, theft, goods in transit, or lost profits during shutdown. We’ll show you exactly where your gaps are.',
          },
          {
            q: 'What is underinsurance, and why does it matter?',
            a: 'If your assets are insured for less than their actual value, your claim can be reduced in proportion. We help you insure at the right value.',
          },
          {
            q: 'Is there a standard policy for small and mid-sized businesses?',
            a: 'Yes. Standard fire policies called Bharat Sookshma and Bharat Laghu Udyam Suraksha are available, based on the value of your assets at each location. We’ll tell you which applies to you.',
          },
          {
            q: 'Do you help with claims?',
            a: 'Absolutely. We guide you through documentation and surveyor visits, and follow up with the insurer until settlement.',
          },
        ],
      },
    ],
    closing: { title: 'Protect what you’ve built. Then let’s help it grow.' },
  },

  annuity: {
    hero: {
      title: 'Retire with a paycheque that never stops.',
      text: 'An annuity plan turns your savings into a fixed income every month, for as long as you live. You get financial independence, without worrying about markets.',
      cta: 'Plan my retirement income',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'An annuity is a plan from a life insurance company that converts a lump sum into regular income. You invest once, or over a few years, and the insurer pays you a fixed amount monthly, quarterly, or yearly, for life or for a chosen period.',
        ],
        callout: 'Think of it as buying your own pension: the salary stops when you retire, but your income doesn’t.',
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'You invest.',
            text: 'Pay a lump sum, for example from your retirement savings, a business sale, or your NPS corpus.',
          },
          {
            title: 'You choose how you want to be paid.',
            text: 'Start income immediately or after a few years, and choose payouts for yourself alone or for you and your spouse.',
          },
          {
            title: 'Your rate is locked in.',
            text: 'The income amount is fixed at the start and stays the same for life, as per your plan terms.',
          },
          {
            title: 'You receive regular income.',
            text: 'Money arrives in your bank account like clockwork, month after month.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Guaranteed income for life.',
            text: 'Your payout is fixed by contract and doesn’t depend on market ups and downs.',
          },
          {
            title: 'Protection against outliving your savings.',
            text: 'Payments continue no matter how long you live.',
          },
          {
            title: 'Your spouse stays protected.',
            text: 'With a joint-life option, income continues for your spouse after you.',
          },
          {
            title: 'Something for your family.',
            text: 'With a “return of purchase price” option, your invested amount goes back to your nominee.',
          },
          {
            title: 'No GST on premiums.',
            text: 'Individual life insurance policies, including annuity plans, no longer attract GST.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: ['An annuity may suit you if you are:'],
        points: [
          'Nearing or in retirement and want a steady, predictable income.',
          'A business owner planning to step back, who wants personal income independent of the business.',
          'Receiving your NPS corpus at exit, part of which must go into an annuity.',
          'Looking to keep a portion of your wealth completely safe from market swings.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'We compare across insurers.',
            text: 'Annuity rates differ between insurers, and the difference adds up over a lifetime.',
          },
          {
            title: 'We design your whole retirement.',
            text: 'An annuity covers your essential expenses, while mutual funds and other investments help your wealth keep growing.',
          },
          {
            title: 'We stay with you.',
            text: 'We help with paperwork, nominee updates, and service requests for years to come.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'How much income will I get?',
            a: 'That depends on your age, the amount invested, and the option you choose. We’ll show you quotes from multiple insurers before you decide.',
          },
          {
            q: 'Can I withdraw my money later?',
            a: 'Annuities are built for income, not withdrawals, so access to the lump sum is limited. Some plans allow exits in special situations, such as critical illness. That’s why we usually recommend putting only part of your savings into an annuity.',
          },
          {
            q: 'How is the income taxed?',
            a: 'Annuity income is added to your income and taxed at your applicable slab rate.',
          },
          {
            q: 'What happens to my money after I pass away?',
            a: 'It depends on the option you chose. With joint-life or return-of-purchase-price options, your spouse or nominee continues to benefit.',
          },
        ],
      },
    ],
    closing: { title: 'Your retirement deserves a steady income. Let’s build it together.' },
  },

  bonds: {
    hero: {
      title: 'Steady income. Clear returns. Your money, working predictably.',
      text: 'Bonds pay you regular interest and return your capital at maturity. We help you pick the right ones for income, safety, and tax efficiency.',
      cta: 'Explore bond options with us',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'A bond is a loan you give to a government or a company. In return, they pay you a fixed interest rate (called the coupon) at regular intervals, and return your original amount on a fixed maturity date.',
        ],
        callout: 'Think of it as being the bank: you lend, you earn interest, and you get your principal back at the end.',
      },
      {
        heading: 'Types of bonds we help you with',
        items: [
          {
            title: 'Government Securities.',
            text: 'Issued by the central or state governments. They carry the highest level of safety.',
          },
          {
            title: 'PSU & Tax-Free Bonds.',
            text: 'Issued by government-owned companies, offering stable income and high credit quality.',
          },
          {
            title: 'Corporate Bonds & NCDs.',
            text: 'Issued by companies, typically offering higher interest in exchange for higher risk.',
          },
          {
            title: 'Capital Gains Tax-Saving Bonds.',
            text: 'Help you save tax on long-term capital gains from selling property, land, or a building.',
          },
          {
            title: 'RBI Floating Rate Savings Bonds.',
            text: 'Government-backed bonds whose interest rate resets periodically.',
          },
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'We understand your need.',
            text: 'Regular income, capital safety, saving tax, or diversifying away from equity.',
          },
          {
            title: 'We shortlist bonds.',
            text: 'We assess them on credit rating, issuer strength, interest, and maturity.',
          },
          {
            title: 'You invest easily.',
            text: 'Bonds are held safely in your demat account, with minimum investments as low as ₹10,000 for many bonds.',
          },
          {
            title: 'You earn and we track.',
            text: 'Interest is credited to your bank account, and we keep track of payment dates, maturities, and reinvestment.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Predictable income.',
            text: 'You know how much interest you’ll receive and when.',
          },
          {
            title: 'Capital returned at maturity.',
            text: 'You get your principal back on a known date, provided the issuer doesn’t default.',
          },
          {
            title: 'Balance for your portfolio.',
            text: 'Bonds steady your portfolio when equity markets are volatile.',
          },
          {
            title: 'Tax planning.',
            text: 'Capital gains bonds can reduce tax when you sell property or land.',
          },
          {
            title: 'Choice of risk level.',
            text: 'Pick from government-backed safety up to higher-yield corporate bonds.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'Bonds may suit you if you want regular income, such as monthly or yearly interest; are looking for an alternative to fixed deposits; have recently sold land, property, or a building and want to save capital gains tax; or want to balance an equity-heavy portfolio.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'Credit research first.',
            text: 'We look beyond the interest rate at the issuer’s ratings, financials, and track record.',
          },
          {
            title: 'The right mix for you.',
            text: 'We blend safety, income, and tax efficiency based on your goals.',
          },
          {
            title: 'Complete tracking.',
            text: 'Interest dates, maturities, and reinvestment are all managed with you.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'Are bonds safe?',
            a: 'That depends on the issuer. Government bonds carry the least risk. Corporate bonds carry credit risk: if the company struggles, it may delay or miss payments. Credit ratings (AAA being the highest) help you judge this, and we explain them clearly.',
          },
          {
            q: 'How are bonds different from fixed deposits?',
            a: 'Both pay fixed interest. Bonds can offer higher interest depending on the issuer, and many can be sold on the stock exchange before maturity. Unlike bank FDs, though, bonds carry no deposit insurance.',
          },
          {
            q: 'Can I sell before maturity?',
            a: 'Listed bonds can be sold on the exchange, but how easily depends on demand. The price you get may be higher or lower than what you paid. Capital gains bonds have a fixed lock-in and can’t be sold early.',
          },
          {
            q: 'How is the interest taxed?',
            a: 'Interest from most bonds is added to your income and taxed at your slab rate. Tax-free bonds are the exception, and we’ll explain which applies to you.',
          },
        ],
      },
    ],
    closing: { title: 'Want steady income without the market rollercoaster? Let’s talk bonds.' },
  },

  'stock-broking': {
    hero: {
      title: 'Own a piece of India’s growth story.',
      text: 'Invest in shares, IPOs, and ETFs with a seamless trading account and a team that’s always a call away.',
      cta: 'Open your account in minutes',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'Stock broking gives you direct access to the stock market. With a trading account, you buy and sell shares; with a demat account, your shares are held safely in electronic form.',
          'When you buy a company’s shares, you become a part-owner of that business and share in its growth over time. As a business owner, you already know the value of building something. Equity lets you own a stake in many more businesses.',
        ],
      },
      {
        heading: 'What you can invest in',
        items: [
          {
            title: 'Shares.',
            text: 'Invest in India’s leading listed companies for long-term wealth creation.',
          },
          {
            title: 'IPOs.',
            text: 'Be among the first to invest when promising companies go public.',
          },
          {
            title: 'ETFs.',
            text: 'Low-cost funds that track an index like the Nifty or Sensex, traded just like shares.',
          },
          {
            title: 'Derivatives & Commodities.',
            text: 'For experienced investors looking to hedge risk or trade actively.',
          },
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'Open your account.',
            text: 'Paperless onboarding with your PAN, Aadhaar, and bank details. We complete it with you.',
          },
          { title: 'Add funds.', text: 'Transfer money from your linked bank account.' },
          {
            title: 'Place your orders with us.',
            text: 'Simply call our team with your instructions, and we take care of the rest.',
          },
          {
            title: 'Track your wealth.',
            text: 'Receive regular statements and portfolio updates, with our team on hand whenever you need help.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Direct ownership.',
            text: 'Every share you buy belongs to you, held securely in your own demat account.',
          },
          {
            title: 'Easy, anytime access.',
            text: 'Invest from your phone or laptop, wherever you are.',
          },
          {
            title: 'Personal service.',
            text: 'A dedicated team that knows you by name, not a faceless helpline.',
          },
          {
            title: 'One complete view.',
            text: 'Your stocks, mutual funds, insurance, and other investments are managed in one place.',
          },
          {
            title: 'Liquidity.',
            text: 'Sell your shares on any trading day and receive the money in your account.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'This may suit you if you want to build long-term wealth through equity, enjoy following markets and companies, want to apply for IPOs, or prefer to invest with a trusted team behind you rather than on your own.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'Hassle-free onboarding.',
            text: 'We handle the paperwork, so you’re ready to invest quickly.',
          },
          {
            title: 'Always reachable.',
            text: 'Order placement, account queries, IPO applications: just call us.',
          },
          {
            title: 'The bigger picture.',
            text: 'We help you see how your stock investments fit into your overall financial plan.',
          },
          {
            title: 'Research-backed ideas.',
            text: 'Stock ideas from a professional research team, so you don’t have to rely on tips and guesswork.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'How long does it take to open an account?',
            a: 'Usually just a day or two once your documents are submitted. Our team guides you through every step.',
          },
          {
            q: 'What documents do I need?',
            a: 'Your PAN, Aadhaar, bank account details, and a signature. For derivatives trading, you’ll also need income proof.',
          },
          {
            q: 'Can I apply for IPOs through my account?',
            a: 'Yes. You can apply for IPOs directly from the app using UPI, and we’re happy to help.',
          },
          {
            q: 'Is there a minimum amount to start?',
            a: 'No. You can start with as little as the price of a single share.',
          },
        ],
      },
    ],
    closing: {
      title: 'Start building your stake in India’s best businesses.',
      cta: 'Open your account today',
    },
  },

  'unlisted-shares': {
    hero: {
      title: 'Invest in tomorrow’s market leaders, before they list.',
      text: 'Unlisted shares let you own a stake in established, growing companies before they go public. We help you find the right opportunities and complete the process smoothly.',
      cta: 'Explore unlisted opportunities',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'Unlisted shares are shares of companies that aren’t traded on the stock exchange yet. They include well-known, profitable businesses that are still privately held, and companies preparing for an IPO.',
          'Investors usually buy these shares from existing shareholders, such as early investors or employees holding stock options. The shares are transferred directly into your demat account, just like listed shares.',
        ],
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'Understand your goals.',
            text: 'We discuss your investment horizon, risk appetite, and how much of your portfolio suits this asset class.',
          },
          {
            title: 'Explore opportunities.',
            text: 'We share available companies, along with their business background, financials, and the price on offer.',
          },
          {
            title: 'Complete the transaction.',
            text: 'Once you decide, the shares are transferred to your demat account after payment.',
          },
          {
            title: 'Track and stay informed.',
            text: 'We keep you updated on company developments, IPO news, and options when you’re ready to sell.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Early access.',
            text: 'Invest in companies before they reach the stock market.',
          },
          {
            title: 'Potential IPO upside.',
            text: 'If the company lists at a higher valuation, early investors may benefit.',
          },
          {
            title: 'Diversification.',
            text: 'Exposure to businesses and sectors that aren’t yet available on the exchange.',
          },
          {
            title: 'Held in your demat.',
            text: 'Your shares sit in your own demat account, alongside your other investments.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'Unlisted shares may suit you if you’re an experienced investor with a long-term view, already have a well-diversified portfolio, and are comfortable keeping a small portion of your wealth in a higher-risk, less liquid investment.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'Focus on quality.',
            text: 'We look at company fundamentals, not just IPO buzz.',
          },
          {
            title: 'Transparent process.',
            text: 'Clear pricing and documentation at every step.',
          },
          {
            title: 'Your complete portfolio.',
            text: 'We help you size unlisted investments sensibly alongside your mutual funds, bonds, and other holdings.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'What are the risks?',
            a: 'Unlisted shares are harder to sell than listed shares, since there is no stock exchange to buy or sell on. Prices can vary widely between sellers, company information may be limited, and there’s no guarantee the company will ever list. We recommend investing only a small portion of your portfolio.',
          },
          {
            q: 'What happens when the company goes public?',
            a: 'Your shares become listed shares in your demat account. Pre-IPO shareholders usually have to hold them for 6 months after listing before they can sell.',
          },
          {
            q: 'How are gains taxed?',
            a: 'If you sell unlisted shares after holding them for more than 24 months, the gain is long-term and taxed at a concessional rate. Within 24 months, it’s taxed at your income slab rate. Different rules apply once the shares are listed, and we’ll walk you through them.',
          },
          {
            q: 'What is the minimum investment?',
            a: 'It varies by company and by the deal available. We’ll share the details for each opportunity.',
          },
        ],
      },
    ],
    closing: {
      title: 'Interested in investing before the IPO? Let’s talk.',
      cta: 'Speak with our team',
    },
  },

  'reits-invits': {
    hero: {
      title: 'Earn rental income from premium real estate and infrastructure, without buying property.',
      text: 'REITs and InvITs let you own a share of large office parks, malls, highways, and power networks, and receive regular income from them.',
      cta: 'Explore REITs & InvITs with us',
    },
    sections: [
      {
        heading: 'What it is',
        kind: 'intro',
        text: [
          'REITs (Real Estate Investment Trusts) own income-generating properties such as large office parks and shopping malls. Tenants pay rent, and most of that income is passed on to you as a unitholder.',
          'InvITs (Infrastructure Investment Trusts) work the same way, but own infrastructure assets such as highways, power transmission lines, and gas pipelines. They earn from tolls, tariffs, and usage fees.',
        ],
        callout:
          'Think of it as being a landlord to India’s biggest companies, without buying, managing, or maintaining a single building.',
      },
      {
        heading: HOW_IT_WORKS,
        steps: [
          {
            title: 'Understand your goals.',
            text: 'Regular income, diversification, or long-term growth: we start with what you need.',
          },
          {
            title: 'Choose the right trusts.',
            text: 'We help you compare REITs and InvITs on their assets, tenants, occupancy, payout track record, and debt.',
          },
          {
            title: 'Invest easily.',
            text: 'Units are listed on the stock exchange and held in your demat account, so you can start with a small amount.',
          },
          {
            title: 'Receive regular income.',
            text: 'Distributions are credited to your bank account, typically every quarter.',
          },
        ],
      },
      {
        heading: BENEFITS,
        kind: 'benefits',
        items: [
          {
            title: 'Regular income.',
            text: 'REITs must distribute most of their earnings to unitholders, which creates a steady payout stream.',
          },
          {
            title: 'Premium assets, small ticket.',
            text: 'Own a slice of Grade-A offices and national infrastructure for a fraction of what property costs.',
          },
          {
            title: 'No landlord headaches.',
            text: 'No tenants to find, no repairs, and no paperwork. Professional managers handle everything.',
          },
          {
            title: 'Easy to buy and sell.',
            text: 'Listed units trade on the stock exchange, unlike physical property, which can take months to sell.',
          },
          {
            title: 'Diversification.',
            text: 'Real estate and infrastructure behave differently from regular stocks and bonds.',
          },
        ],
      },
      {
        heading: FIT,
        kind: 'fit',
        text: [
          'REITs and InvITs may suit you if you want regular income from real assets, are looking to diversify beyond stocks, FDs, and physical property, or want real estate exposure without the large investment and effort of owning property.',
        ],
      },
      {
        heading: WHY,
        kind: 'why',
        items: [
          {
            title: 'We look under the hood.',
            text: 'Occupancy, tenant quality, debt levels, and asset life matter more than the headline payout.',
          },
          {
            title: 'The right blend.',
            text: 'We balance REITs and InvITs with the rest of your portfolio for income and stability.',
          },
          {
            title: 'Ongoing tracking.',
            text: 'We monitor your distributions and keep you updated on developments.',
          },
        ],
      },
      {
        heading: FAQS,
        faqs: [
          {
            q: 'How often will I receive income?',
            a: 'Most listed REITs and InvITs pay out quarterly. The amount can vary with rental income, toll collections, and the trust’s performance.',
          },
          {
            q: 'Are returns guaranteed?',
            a: 'No. Both distributions and unit prices can go up or down with property demand, interest rates, and market conditions.',
          },
          {
            q: 'How is the income taxed?',
            a: 'Payouts are made up of different components, such as interest, dividend, and repayment of debt, and each is taxed differently. Gains from selling units are taxed as capital gains. We’ll help you understand your tax position.',
          },
          {
            q: 'Can I sell anytime?',
            a: 'Yes. Listed units can be sold on the stock exchange on any trading day, though prices depend on market conditions.',
          },
        ],
      },
    ],
    closing: {
      title: 'Own a piece of India’s real estate and infrastructure. Let’s get started.',
      cta: 'Talk to our team',
    },
  },
}
