import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSPersonalizePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformPersonalizePricing = createGenericTransform('personalize');

// Default export
let personalizePricingData: PricingEntry[] = [];

try {
  personalizePricingData = require('./personalize-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./personalize.json') as AWSPersonalizePricingData;
    personalizePricingData = transformPersonalizePricing(rawData);
    console.warn('Personalize pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Personalize pricing data not found. Run fetch:pricing first.');
  }
}

export const personalizePricing = personalizePricingData;

