import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSQldbPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformQldbPricing = createGenericTransform('qldb');

// Default export
let qldbPricingData: PricingEntry[] = [];

try {
  qldbPricingData = require('./qldb-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./qldb.json') as AWSQldbPricingData;
    qldbPricingData = transformQldbPricing(rawData);
    console.warn('Qldb pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Qldb pricing data not found. Run fetch:pricing first.');
  }
}

export const qldbPricing = qldbPricingData;

