import type { PricingEntry } from '../../types';

// Import pricing modules (uses pre-transformed data for fast loading)
import { ec2Pricing } from './ec2';
import { natgatewayPricing } from './natgateway';

// Registry of all pricing data by service ID
const pricingRegistry: Record<string, PricingEntry[]> = {
  ec2: ec2Pricing,
  natgateway: natgatewayPricing,
};

export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  return pricingRegistry[serviceId] || [];
}

export function getAllPricingServices(): string[] {
  return Object.keys(pricingRegistry);
}

export function filterPricingByRegion(pricing: PricingEntry[], region?: string): PricingEntry[] {
  if (!region) return pricing;
  return pricing.filter((entry) => entry.region === region);
}

export function getUniqueRegions(pricing: PricingEntry[]): string[] {
  const regions = pricing.map((entry) => entry.region);
  return Array.from(new Set(regions)).sort();
}

// Re-export for convenience
export { ec2Pricing, natgatewayPricing };

