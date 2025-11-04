import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSGlacierPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformGlacierPricing = createGenericTransform('glacier');

// Default export
let glacierPricingData: PricingEntry[] = [];

try {
  glacierPricingData = require('./glacier-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./glacier.json') as AWSGlacierPricingData;
    glacierPricingData = transformGlacierPricing(rawData);
    console.warn('Glacier pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Glacier pricing data not found. Run fetch:pricing first.');
  }
}

export const glacierPricing = glacierPricingData;

