'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceCard from '@/app/components/ServiceCard';
import SearchBar from '@/app/components/SearchBar';
import { services, getServicesByCategory } from '@/lib/data/services';
import type { ServiceCategory } from '@/lib/types';

const categories: ServiceCategory[] = ['Compute', 'Networking', 'Storage', 'Database', 'Other'];

function ServicesContentInner() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const getInitialCategory = (): ServiceCategory | 'All' => {
    if (categoryParam) {
      const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) as ServiceCategory;
      if (categories.includes(category)) {
        return category;
      }
    }
    return 'All';
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // debounce 250ms
  useMemo(() => {
    const h = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(h);
  }, [searchQuery]);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>(getInitialCategory());

  // List filtered only by search (used for counts)
  const searchFilteredServices = useMemo(() => {
    if (!debouncedQuery) return services;
    const lowerQuery = debouncedQuery.toLowerCase();
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.id.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery)
    );
  }, [debouncedQuery]);

  const filteredServices = useMemo(() => {
    let filtered = services;

    if (selectedCategory !== 'All') {
      filtered = getServicesByCategory(selectedCategory);
    }

    if (debouncedQuery) {
      const lowerQuery = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(lowerQuery) ||
          service.id.toLowerCase().includes(lowerQuery) ||
          service.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [debouncedQuery, selectedCategory]);

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

  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { Compute: 0, Networking: 0, Storage: 0, Database: 0, Other: 0 };
    searchFilteredServices.forEach((s) => { counts[s.category] = (counts[s.category] || 0) + 1; });
    return counts;
  }, [searchFilteredServices]);

  return (
    <>
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search services..."
        />
      </div>

      <div className="mb-6">
        <div className="inline-flex items-center gap-1 rounded-full border p-1" style={{ backgroundColor: 'var(--overlay)', borderColor: 'var(--border)' }}>
          {[('All' as const), ...categories].map((category: 'All' | ServiceCategory) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1 transition-colors ${
                selectedCategory === category
                  ? 'bg-surface shadow-soft'
                  : 'hover:bg-surface/40'
              }`}
            >
              {category} ({category === 'All' ? searchFilteredServices.length : countsByCategory[category] ?? 0})
            </button>
          ))}
        </div>
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
    </>
  );
}

export default function ServicesContent() {
  return (
    <Suspense fallback={
      <div className="mb-6">
        <SearchBar value="" onChange={() => {}} placeholder="Search services..." />
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    }>
      <ServicesContentInner />
    </Suspense>
  );
}

