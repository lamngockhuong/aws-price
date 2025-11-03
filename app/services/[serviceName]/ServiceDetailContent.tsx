'use client';

import { useState, useMemo } from 'react';
import PricingTable from '@/app/components/PricingTable';
import ServiceFilters from '@/app/components/ServiceFilters';
import type { PricingEntry } from '@/lib/types';
import { filterPricingByRegion } from '@/lib/data/pricing';

interface ServiceDetailContentProps {
  serviceId: string;
  allPricing: PricingEntry[];
}

export default function ServiceDetailContent({
  serviceId,
  allPricing,
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

