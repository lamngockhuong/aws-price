import type { PricingEntry } from '../types';
// Import from new pricing structure
import {
  getPricingByServiceId as getPricingByServiceIdFromIndex,
  filterPricingByRegion as filterPricingByRegionFromIndex,
  getUniqueRegions as getUniqueRegionsFromIndex,
} from './pricing/index';

// Delegate to new pricing structure
export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  const fromIndex = getPricingByServiceIdFromIndex(serviceId);
  if (fromIndex.length > 0) {
    return fromIndex;
  }

  return [];
}

// Re-export utility functions from new pricing structure
export { filterPricingByRegionFromIndex as filterPricingByRegion };
export { getUniqueRegionsFromIndex as getUniqueRegions };

