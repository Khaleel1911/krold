import { useRef } from 'react'
import MutualFundsCard from './services/MutualFundsCard'
import InsuranceCard from './services/InsuranceCard'
import PmsAifCard from './services/PmsAifCard'
import GeneralInsuranceCard from './services/GeneralInsuranceCard'
import AnnuityCard from './services/AnnuityCard'
import BondsCard from './services/BondsCard'
import StockBrokingCard from './services/StockBrokingCard'
import UnlistedSharesCard from './services/UnlistedSharesCard'
import { SERVICES } from '../data/services'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

// Each service has its own card; sizes and placement come from `.svc-bento` in index.css.
const SERVICE_CARDS = {
  'mutual-funds': MutualFundsCard,
  insurance: InsuranceCard,
  'pms-aif': PmsAifCard,
  'general-insurance': GeneralInsuranceCard,
  annuity: AnnuityCard,
  bonds: BondsCard,
  'stock-broking': StockBrokingCard,
  'unlisted-shares': UnlistedSharesCard,
}

export default function ProductsServices() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useRevealOnScroll(sectionRef, (root) => root.querySelectorAll('[data-animate]'), { y: 24, duration: 0.6 })
  useRevealOnScroll(sectionRef, () => cardRefs.current, { y: 30, duration: 0.6, stagger: 0.08, delay: 0.1 })

  return (
    <section id="products-services" ref={sectionRef} className="relative py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div data-animate className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Protect. Invest.{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Grow.
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            From everyday protection to sophisticated investments, we bring together solutions designed to help you
            navigate every stage of your financial journey.
          </p>
        </div>

        <div className="svc-bento mt-12">
          {SERVICES.map((service, i) => {
            const Card = SERVICE_CARDS[service.slug]
            return <Card key={service.slug} service={service} cardRef={(el) => (cardRefs.current[i] = el)} />
          })}
        </div>
      </div>
    </section>
  )
}
