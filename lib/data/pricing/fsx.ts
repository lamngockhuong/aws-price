import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSFsxPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformFsxPricing = createGenericTransform('fsx');

// Default export
let fsxPricingData: PricingEntry[] = [];

try {
  fsxPricingData = require('./fsx-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./fsx.json') as AWSFsxPricingData;
    fsxPricingData = transformFsxPricing(rawData);
    console.warn('Fsx pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Fsx pricing data not found. Run fetch:pricing first.');
  }
}

export const fsxPricing = fsxPricingData;

