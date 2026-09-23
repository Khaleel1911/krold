import Hero from '../components/Hero'
import ProductsServices from '../components/ProductsServices'
import Testimonials from '../components/Testimonials'
import Calculators from '../components/Calculators'
import GetInTouch from '../components/GetInTouch'

export default function Home() {
  return (
    <>
      <Hero />
      <Calculators />
      <ProductsServices />
      <Testimonials />
      <GetInTouch />
    </>
  )
}
