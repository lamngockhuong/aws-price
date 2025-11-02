import Link from 'next/link';
import { services, getServicesByCategory } from '@/lib/data/services';
import ServiceCard from '@/app/components/ServiceCard';
import type { ServiceCategory } from '@/lib/types';

const categories: ServiceCategory[] = ['Compute', 'Networking', 'Storage', 'Database'];

const popularServices = ['ec2', 's3', 'vpc'];

export default function Home() {
  const popularServicesData = services.filter((service) =>
    popularServices.includes(service.id)
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
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
            <Link
              href="/services"
              className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Popular Services
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Most commonly viewed AWS services
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularServicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Browse by Category
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Explore AWS services organized by category
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryServices = getServicesByCategory(category);
            return (
              <Link
                key={category}
                href={`/services?category=${category.toLowerCase()}`}
                className="group block rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
                  {category}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {categoryServices.length} service{categoryServices.length !== 1 ? 's' : ''}
                </p>
              </Link>
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
