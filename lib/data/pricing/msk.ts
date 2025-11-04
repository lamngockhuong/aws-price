import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSMskPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformMskPricing = createGenericTransform('msk');

// Default export
let mskPricingData: PricingEntry[] = [];

try {
  mskPricingData = require('./msk-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./msk.json') as AWSMskPricingData;
    mskPricingData = transformMskPricing(rawData);
    console.warn('Msk pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Msk pricing data not found. Run fetch:pricing first.');
  }
}

export const mskPricing = mskPricingData;

