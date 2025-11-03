import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/components/Breadcrumb';
import PricingInfoBanner from '@/app/components/PricingInfoBanner';
import ServiceDetailContent from './ServiceDetailContent';
import { getServiceById, services } from '@/lib/data/services';
import { getPricingByServiceId } from '@/lib/data/pricing';

export function generateStaticParams() {
  return services.map((service) => ({
    serviceName: service.id,
  }));
}

interface ServiceDetailPageProps {
  params: Promise<{ serviceName: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { serviceName } = await params;
  const service = getServiceById(serviceName);

  if (!service) {
    notFound();
  }

  const allPricing = getPricingByServiceId(serviceName);

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: service.category, href: `/services` },
                { label: service.name },
              ]}
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {service.name}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{service.description}</p>
          <span className="mt-3 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {service.category}
          </span>
          <div className="mt-4">
            <PricingInfoBanner />
          </div>
        </div>

        <ServiceDetailContent serviceId={serviceName} allPricing={allPricing} />
      </div>
    </div>
  );
}

