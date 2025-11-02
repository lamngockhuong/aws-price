'use client';

import { useMemo } from 'react';
import type { PricingEntry } from '@/lib/types';
import { getUniqueRegions } from '@/lib/data/pricing';

interface ServiceFiltersProps {
  pricing: PricingEntry[];
  serviceId: string;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedInstanceFamily?: string;
  onInstanceFamilyChange?: (family: string) => void;
}

export default function ServiceFilters({
  pricing,
  serviceId,
  selectedRegion,
  onRegionChange,
  selectedInstanceFamily,
  onInstanceFamilyChange,
}: Readonly<ServiceFiltersProps>) {
  const regions = useMemo(() => getUniqueRegions(pricing), [pricing]);

  const instanceFamilies = useMemo(() => {
    if (serviceId !== 'ec2') return [];
    const families = new Set<string>();
    pricing.forEach((entry) => {
      const instanceType = entry.attributes.instanceType || '';
      const family = instanceType.split('.')[0];
      if (family) families.add(family);
    });
    return Array.from(families).sort();
  }, [pricing, serviceId]);

  const storageClasses = useMemo(() => {
    if (serviceId !== 's3') return [];
    const classes = new Set<string>();
    pricing.forEach((entry) => {
      const storageClass = entry.attributes.storageClass;
      if (storageClass) classes.add(storageClass);
    });
    return Array.from(classes).sort();
  }, [pricing, serviceId]);

  return (
    <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Region
        </label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {serviceId === 'ec2' && instanceFamilies.length > 0 && onInstanceFamilyChange && (
        <div>
          <label htmlFor="instance-family" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Instance Family
          </label>
          <select
            id="instance-family"
            value={selectedInstanceFamily || ''}
            onChange={(e) => onInstanceFamilyChange(e.target.value)}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          >
            <option value="">All Families</option>
            {instanceFamilies.map((family) => (
              <option key={family} value={family}>
                {family.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      {serviceId === 's3' && storageClasses.length > 0 && (
        <div>
          <label htmlFor="storage-class" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Storage Class
          </label>
          <select
            id="storage-class"
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
          >
            <option value="">All Storage Classes</option>
            {storageClasses.map((storageClass) => (
              <option key={storageClass} value={storageClass}>
                {storageClass}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

