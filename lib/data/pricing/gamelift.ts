import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSGameliftPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformGameliftPricing = createGenericTransform('gamelift');

// Default export
let gameliftPricingData: PricingEntry[] = [];

try {
  gameliftPricingData = require('./gamelift-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./gamelift.json') as AWSGameliftPricingData;
    gameliftPricingData = transformGameliftPricing(rawData);
    console.warn('Gamelift pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Gamelift pricing data not found. Run fetch:pricing first.');
  }
}

export const gameliftPricing = gameliftPricingData;

