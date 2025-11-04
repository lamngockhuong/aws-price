import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSDeepracerPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformDeepracerPricing = createGenericTransform('deepracer');

// Default export
let deepracerPricingData: PricingEntry[] = [];

try {
  deepracerPricingData = require('./deepracer-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./deepracer.json') as AWSDeepracerPricingData;
    deepracerPricingData = transformDeepracerPricing(rawData);
    console.warn('Deepracer pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Deepracer pricing data not found. Run fetch:pricing first.');
  }
}

export const deepracerPricing = deepracerPricingData;

