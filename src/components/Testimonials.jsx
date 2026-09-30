import CenterBadge from './testimonials/CenterBadge'
import TestimonialCard from './testimonials/TestimonialCard'
import TestimonialBurst from './testimonials/TestimonialBurst'
import { TESTIMONIALS, HAPPY_CLIENTS_COUNT } from '../data/testimonials'

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl">
            Our journey,{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              built on trust
            </span>
          </h2>
          <p className="mt-3 text-black/60 dark:text-white/60">
            From the first conversation to every milestone ahead, we strive to build relationships that last.
          </p>
        </div>
      </div>

      {/* Desktop: cards burst out of the centre count as the section scrolls in */}
      <TestimonialBurst />

      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        {/* Mobile: opposing marquee rows around a fixed center count */}
        <div className="mt-12 lg:hidden">
          <div className="-mx-5 overflow-hidden">
            <div className="flex w-max animate-[marquee-left_32s_linear_infinite] gap-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard key={`${t.id}-a-${i}`} testimonial={t} index={i} className="w-64" />
              ))}
            </div>
          </div>

          <div className="my-8 flex justify-center">
            <CenterBadge count={HAPPY_CLIENTS_COUNT} label="Happy Clients" className="h-44 w-44" />
          </div>

          <div className="-mx-5 overflow-hidden">
            <div className="flex w-max animate-[marquee-right_32s_linear_infinite] gap-4">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard key={`${t.id}-b-${i}`} testimonial={t} index={i + 1} className="w-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
