import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSMaciePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformMaciePricing = createGenericTransform('macie');

// Default export
let maciePricingData: PricingEntry[] = [];

try {
  maciePricingData = require('./macie-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./macie.json') as AWSMaciePricingData;
    maciePricingData = transformMaciePricing(rawData);
    console.warn('Macie pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Macie pricing data not found. Run fetch:pricing first.');
  }
}

export const maciePricing = maciePricingData;

