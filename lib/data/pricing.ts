import type { PricingEntry } from '../types';
// Import from new pricing structure
import {
  getPricingByServiceId as getPricingByServiceIdFromIndex,
  filterPricingByRegion as filterPricingByRegionFromIndex,
  getUniqueRegions as getUniqueRegionsFromIndex,
  ec2Pricing,
} from './pricing/index';

// Re-export for backward compatibility
export { ec2Pricing };

// Legacy hardcoded data for services not yet migrated to file-based system
// TODO: Remove after migrating all services to file-based pricing
export const s3Pricing: PricingEntry[] = [
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.023',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'GET',
    },
    pricePerUnit: '0.0004',
    unit: 'USD per 1000 requests',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard-IA',
      requestType: 'PUT',
    },
    pricePerUnit: '0.0125',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard-IA',
      requestType: 'GET',
    },
    pricePerUnit: '0.001',
    unit: 'USD per 1000 requests',
  },
  {
    serviceId: 's3',
    region: 'us-west-2',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.023',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'ap-southeast-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.025',
    unit: 'USD per GB',
  },
];

export const vpcPricing: PricingEntry[] = [
  {
    serviceId: 'vpc',
    region: 'us-east-1',
    attributes: {
      feature: 'VPC Endpoint',
      usageType: 'Gateway',
    },
    pricePerUnit: '0.01',
    unit: 'USD per hour',
  },
  {
    serviceId: 'vpc',
    region: 'us-east-1',
    attributes: {
      feature: 'NAT Gateway',
      usageType: 'Data Processing',
    },
    pricePerUnit: '0.045',
    unit: 'USD per GB',
  },
  {
    serviceId: 'vpc',
    region: 'us-west-2',
    attributes: {
      feature: 'VPC Endpoint',
      usageType: 'Gateway',
    },
    pricePerUnit: '0.01',
    unit: 'USD per hour',
  },
];

// Delegate to new pricing structure, with fallback for legacy services
export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  const fromIndex = getPricingByServiceIdFromIndex(serviceId);
  if (fromIndex.length > 0) {
    return fromIndex;
  }

  // Fallback to legacy hardcoded data
  switch (serviceId) {
    case 's3':
      return s3Pricing;
    case 'vpc':
      return vpcPricing;
    default:
      return [];
  }
}

// Re-export utility functions from new pricing structure
export { filterPricingByRegionFromIndex as filterPricingByRegion };
export { getUniqueRegionsFromIndex as getUniqueRegions };

