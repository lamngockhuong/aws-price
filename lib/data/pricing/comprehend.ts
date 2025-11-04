import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSComprehendPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformComprehendPricing = createGenericTransform('comprehend');

// Default export
let comprehendPricingData: PricingEntry[] = [];

try {
  comprehendPricingData = require('./comprehend-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./comprehend.json') as AWSComprehendPricingData;
    comprehendPricingData = transformComprehendPricing(rawData);
    console.warn('Comprehend pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Comprehend pricing data not found. Run fetch:pricing first.');
  }
}

export const comprehendPricing = comprehendPricingData;

