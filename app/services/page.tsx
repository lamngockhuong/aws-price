'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ServiceCard from '@/app/components/ServiceCard';
import SearchBar from '@/app/components/SearchBar';
import { services, getServicesByCategory } from '@/lib/data/services';
import type { ServiceCategory } from '@/lib/types';

const categories: ServiceCategory[] = ['Compute', 'Networking', 'Storage', 'Database'];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>(
    categoryParam ? (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) as ServiceCategory) : 'All'
  );

  useEffect(() => {
    if (categoryParam) {
      const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) as ServiceCategory;
      if (categories.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, [categoryParam]);

  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory !== 'All') {
      filtered = getServicesByCategory(selectedCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(lowerQuery) ||
          service.id.toLowerCase().includes(lowerQuery) ||
          service.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const groupedServices = useMemo(() => {
    const groups: Record<string, typeof services> = {};

    filteredServices.forEach((service) => {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }
      groups[service.category].push(service);
    });

    return groups;
  }, [filteredServices]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">AWS Services</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            View and compare pricing for AWS services
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search services..."
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
            >
              {category}
            </button>
          ))}
        </div>

        {Object.keys(groupedServices).length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">No services found</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

