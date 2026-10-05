import { notFound } from 'next/navigation'
import ServiceDetailPage from '../../../views/ServiceDetailPage'
import { SERVICES, getServiceBySlug } from '../../../data/services'

export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return { title: `${service.title} | Krold Mfins`, description: service.short }
}

export default async function Page({ params }) {
  const { slug } = await params
  if (!getServiceBySlug(slug)) notFound()
  return <ServiceDetailPage slug={slug} />
}
