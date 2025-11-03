// (Link no longer used here; kept for potential future sections)
import { services, getServicesByCategory } from '@/lib/data/services';
import ServiceCard from '@/app/components/ServiceCard';
import type { ServiceCategory } from '@/lib/types';
import { LinkButtonPrimary } from '@/app/components/ui/Button';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import { CategoryCard } from '@/app/components/ui/CategoryCard';

const categories: ServiceCategory[] = ['Compute', 'Networking', 'Storage', 'Database', 'Other'];

const popularServices = ['ec2', 's3', 'vpc'];

export default function Home() {
  const popularServicesData = services.filter((service) =>
    popularServices.includes(service.id)
  );

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      {/* Hero Section */}
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            AWS Price Tracker
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            View and compare pricing for AWS services in a clear, organized format
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkButtonPrimary href="/services">View All Services</LinkButtonPrimary>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader title="Popular Services" subtitle="Most commonly viewed AWS services" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader title="Browse by Category" subtitle="Explore AWS services organized by category" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryServices = getServicesByCategory(category);
            return (
              <CategoryCard
                key={category}
                href={`/services?category=${category.toLowerCase()}`}
                title={category}
                subtitle={`${categoryServices.length} service${categoryServices.length !== 1 ? 's' : ''}`}
              />
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total Services
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {services.length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Categories
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {categories.length}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Regions Supported
              </p>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                3+
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
