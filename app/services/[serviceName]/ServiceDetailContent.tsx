'use client';

import { useState, useMemo } from 'react';
import PricingTable from '@/app/components/PricingTable';
import ServiceFilters from '@/app/components/ServiceFilters';
import type { PricingEntry } from '@/lib/types';
import { filterPricingByRegion } from '@/lib/data/pricing';

interface ServiceDetailContentProps {
  serviceId: string;
  allPricing: PricingEntry[];
  pricingAvailable?: boolean;
}

export default function ServiceDetailContent({
  serviceId,
  allPricing,
  pricingAvailable = false,
}: ServiceDetailContentProps) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedInstanceFamily, setSelectedInstanceFamily] = useState('');
  const [selectedOS, setSelectedOS] = useState('');

  const filteredPricing = useMemo(() => {
    let filtered = allPricing;

    if (selectedRegion) {
      filtered = filterPricingByRegion(filtered, selectedRegion);
    }

    if (serviceId === 'ec2' && selectedInstanceFamily) {
      filtered = filtered.filter((entry) => {
        const instanceType = entry.attributes.instanceType || '';
        return instanceType.startsWith(selectedInstanceFamily.toLowerCase() + '.');
      });
    }

    if (serviceId === 'ec2' && selectedOS) {
      filtered = filtered.filter((entry) => entry.attributes.operatingSystem === selectedOS);
    }

    return filtered;
  }, [allPricing, selectedRegion, selectedInstanceFamily, selectedOS, serviceId]);

  // Handle services without pricing data
  if (!pricingAvailable || allPricing.length === 0) {
    return (
      <div className="rounded-xl bg-surface border border-border p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="mb-4 flex justify-center">
            <svg
              className="h-12 w-12 text-zinc-400 dark:text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Pricing Data Not Available
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pricing information for this service is not currently available. Please check the{' '}
            <a
              href="https://aws.amazon.com/pricing/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              AWS Pricing page
            </a>{' '}
            for the latest pricing information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <ServiceFilters
          pricing={allPricing}
          serviceId={serviceId}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedOS={selectedOS}
          onOSChange={setSelectedOS}
          selectedInstanceFamily={selectedInstanceFamily}
          onInstanceFamilyChange={setSelectedInstanceFamily}
        />
      </div>
      <div className="lg:col-span-3">
        <PricingTable pricing={filteredPricing} serviceId={serviceId} />
      </div>
    </div>
  );
}

