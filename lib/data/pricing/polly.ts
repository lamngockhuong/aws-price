import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSPollyPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformPollyPricing = createGenericTransform('polly');

// Default export
let pollyPricingData: PricingEntry[] = [];

try {
  pollyPricingData = require('./polly-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./polly.json') as AWSPollyPricingData;
    pollyPricingData = transformPollyPricing(rawData);
    console.warn('Polly pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Polly pricing data not found. Run fetch:pricing first.');
  }
}

export const pollyPricing = pollyPricingData;

