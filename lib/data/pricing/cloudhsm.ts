import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCloudhsmPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCloudhsmPricing = createGenericTransform('cloudhsm');

// Default export
let cloudhsmPricingData: PricingEntry[] = [];

try {
  cloudhsmPricingData = require('./cloudhsm-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./cloudhsm.json') as AWSCloudhsmPricingData;
    cloudhsmPricingData = transformCloudhsmPricing(rawData);
    console.warn('Cloudhsm pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Cloudhsm pricing data not found. Run fetch:pricing first.');
  }
}

export const cloudhsmPricing = cloudhsmPricingData;

