import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSChimePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformChimePricing = createGenericTransform('chime');

// Default export
let chimePricingData: PricingEntry[] = [];

try {
  chimePricingData = require('./chime-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./chime.json') as AWSChimePricingData;
    chimePricingData = transformChimePricing(rawData);
    console.warn('Chime pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Chime pricing data not found. Run fetch:pricing first.');
  }
}

export const chimePricing = chimePricingData;

