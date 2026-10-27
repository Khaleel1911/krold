// Legal pages, linked from the footer. Terms and Disclosure follow kroldmfins.com word for word
// (with the template's stray "Dalmia Wealth" corrected to Krold Mfins). The live Privacy Policy
// page only repeated the Terms, so the policy below is a fresh draft, pending review.
//
// Each section is a heading plus blocks: { p }, { ul: [...] }, { ol: [...] } or { facts: [[label, value]] }.
import { CONTACT_INFO } from './contactInfo'

const COMPANY = 'Krold Mfins Pvt. Ltd.'
const COMPLAINTS_EMAIL = 'info@kroldmfins.com'

export const LEGAL_PAGES = {
  'privacy-policy': {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro: `This policy explains what information ${COMPANY} collects through this website, how we use it, and the choices you have.`,
    sections: [
      {
        heading: 'Information we collect',
        blocks: [
          {
            p: 'We only collect what you choose to share with us. When you fill in the contact form, we receive the details you enter:',
          },
          { ul: ['Your name', 'Email address and phone number', 'City', 'The subject and message of your enquiry'] },
          {
            p: 'The investment calculators run entirely in your browser; the figures you enter are not sent to us.',
          },
        ],
      },
      {
        heading: 'How we use it',
        blocks: [
          {
            ul: [
              'To respond to your enquiry and follow up about the services you asked about.',
              'To suggest products that suit your profile, if you choose to become a client.',
              'To meet our obligations as an AMFI-registered mutual fund distributor.',
            ],
          },
          { p: 'We do not sell or rent your personal information to anyone.' },
        ],
      },
      {
        heading: 'Sharing',
        blocks: [
          {
            p: 'We share your details only where needed to serve you, for example with mutual fund houses, registrars and KYC agencies when you invest through us, or where the law requires it.',
          },
        ],
      },
      {
        heading: 'Cookies and third-party content',
        blocks: [
          {
            p: 'The website remembers small preferences, such as light or dark mode, in your browser. Some pages show content from other services, such as maps and embedded videos, which may set their own cookies under their own privacy policies.',
          },
        ],
      },
      {
        heading: 'Keeping your information safe',
        blocks: [
          {
            p: 'We take reasonable steps to protect the information you share and keep it only for as long as we need it for the purposes above or as required by regulation.',
          },
        ],
      },
      {
        heading: 'Your choices',
        blocks: [
          {
            p: `You can ask us to see, correct or delete the personal information we hold about you by writing to ${CONTACT_INFO.email}.`,
          },
        ],
      },
      {
        heading: 'Changes to this policy',
        blocks: [{ p: 'We may update this policy from time to time. The latest version will always be on this page.' }],
      },
    ],
  },

  'terms-condition': {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    sections: [
      {
        blocks: [
          {
            ul: [
              `Visitors should use the contents of website/mobile app at their own discretion. ${COMPANY} doesn’t accept any liability for any harm/loss incurred due to usage of this website/mobile app.`,
              `The features of website/mobile can change without prior notice. Also, certain sections of the website/mobile app are dependent on third party APIs/information. At any point of time, if the said services are withdrawn or not renewed by ${COMPANY}, it could impact certain sections of the website. All visitors, specially members of the website/mobile app should be aware of this.`,
              `The website/mobile app encounters a large number of users/visitors across the country/worldwide. Users/Visitors should apply their own judgement with regard to compliance criteria of various government and regulatory bodies. ${COMPANY} assumes no liability for usage of content/services by users/visitors.`,
            ],
          },
        ],
      },
    ],
  },

  disclosure: {
    eyebrow: 'Legal',
    title: 'Disclosure',
    intro: 'KROLD MFINS Pvt. Ltd. is an AMFI registered mutual fund distributor (ARN: 266592).',
    sections: [
      {
        blocks: [
          {
            facts: [
              ['ARN', '266592'],
              ['Date of Registration', '25/03/2025'],
              ['Current Validity', '24/03/2026'],
            ],
          },
          { p: 'We suggest investment products keeping in mind the suitability profile of the client.' },
          {
            p: 'Mutual fund investments are subject to market risks. Returns are not guaranteed in mutual funds. Investors are encouraged to conduct their own due diligence before making investment decisions.',
          },
        ],
      },
      {
        heading: 'Commission',
        blocks: [
          {
            p: "As an AMFI-registered Mutual Fund Distributor, KROLD MFINS Pvt. Ltd deals with 'Regular' Plans of the mutual fund schemes. When an investor subscribes to such schemes, KROLD MFINS Pvt. Ltd. is entitled to receive a commission on the same. Investors can check the same on the website under the 'Disclosure' Tab on the footer of the website.",
          },
        ],
      },
      {
        heading: 'Risks',
        blocks: [
          {
            p: "KROLD MFINS is affiliated with a limited number of mutual fund companies/schemes and investors may want to consider alternate products of mutual fund companies before investing with KROLD MFINS. It is also brought to investors' notice of the general risks and scheme-specific risks associated when investing through mutual funds. The risks that the investor might face include but are not limited to:",
          },
          {
            ol: [
              'Returns being subject to market risk including loss of capital on account of market volatility, force majeure events, changes in the political and economic environment, default by issuers of securities to mutual funds, bankruptcy or insolvency of issuers and potential segregation of portfolio by AMC in such circumstances.',
              'Suspension of redemption facility in case the scheme faces a liquidity crisis.',
              'Risks associated with the subscription to a new fund offering of the scheme such as price volatility risk, liquidity risk and delisting risk.',
              'Winding up of schemes on account of illiquid instruments, higher volume of redemption requests from the investors or on account of unforeseen market events.',
            ],
          },
        ],
      },
      {
        heading: 'Complaints',
        blocks: [{ p: 'If you have any complaints, please write to', email: COMPLAINTS_EMAIL }],
      },
    ],
  },
}
