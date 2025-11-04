import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSVpcPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformVpcPricing = createGenericTransform('vpc');

// Default export
let vpcPricingData: PricingEntry[] = [];

try {
  vpcPricingData = require('./vpc-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./vpc.json') as AWSVpcPricingData;
    vpcPricingData = transformVpcPricing(rawData);
    console.warn('Vpc pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Vpc pricing data not found. Run fetch:pricing first.');
  }
}

export const vpcPricing = vpcPricingData;

