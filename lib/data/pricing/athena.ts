import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSAthenaPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformAthenaPricing = createGenericTransform('athena');

// Default export
let athenaPricingData: PricingEntry[] = [];

try {
  athenaPricingData = require('./athena-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./athena.json') as AWSAthenaPricingData;
    athenaPricingData = transformAthenaPricing(rawData);
    console.warn('Athena pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Athena pricing data not found. Run fetch:pricing first.');
  }
}

export const athenaPricing = athenaPricingData;

