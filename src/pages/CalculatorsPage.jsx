import Calculators from '../components/Calculators'
import { ALL_CALCULATORS } from '../components/calculators/configs'

export default function CalculatorsPage() {
  return (
    <main>
      <Calculators calculators={ALL_CALCULATORS} asPage />
    </main>
  )
}
