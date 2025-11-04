import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSWorkmailPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformWorkmailPricing = createGenericTransform('workmail');

// Default export
let workmailPricingData: PricingEntry[] = [];

try {
  workmailPricingData = require('./workmail-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./workmail.json') as AWSWorkmailPricingData;
    workmailPricingData = transformWorkmailPricing(rawData);
    console.warn('Workmail pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Workmail pricing data not found. Run fetch:pricing first.');
  }
}

export const workmailPricing = workmailPricingData;

