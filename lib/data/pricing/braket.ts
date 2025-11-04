import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSBraketPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformBraketPricing = createGenericTransform('braket');

// Default export
let braketPricingData: PricingEntry[] = [];

try {
  braketPricingData = require('./braket-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./braket.json') as AWSBraketPricingData;
    braketPricingData = transformBraketPricing(rawData);
    console.warn('Braket pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Braket pricing data not found. Run fetch:pricing first.');
  }
}

export const braketPricing = braketPricingData;

