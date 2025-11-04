"use client";

import InfoBanner from '@/app/components/InfoBanner';
import pricingMetadata from '@/lib/data/pricing/metadata.json';

export default function PricingInfoBanner() {
  const iso = (pricingMetadata as { lastPricingFetchAt?: string; lastTransformAt?: string }).lastTransformAt
    ?? (pricingMetadata as { lastPricingFetchAt?: string }).lastPricingFetchAt;

  // Compute only on client to avoid SSR/CSR mismatch
  const updatedAt = typeof window === 'undefined' || !iso
    ? undefined
    : new Date(iso).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });

  return <InfoBanner updatedAt={updatedAt} />;
}


