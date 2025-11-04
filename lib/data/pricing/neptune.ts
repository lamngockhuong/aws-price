import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSNeptunePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformNeptunePricing = createGenericTransform('neptune');

// Default export
let neptunePricingData: PricingEntry[] = [];

try {
  neptunePricingData = require('./neptune-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./neptune.json') as AWSNeptunePricingData;
    neptunePricingData = transformNeptunePricing(rawData);
    console.warn('Neptune pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Neptune pricing data not found. Run fetch:pricing first.');
  }
}

export const neptunePricing = neptunePricingData;

