import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSFinspacePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformFinspacePricing = createGenericTransform('finspace');

// Default export
let finspacePricingData: PricingEntry[] = [];

try {
  finspacePricingData = require('./finspace-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./finspace.json') as AWSFinspacePricingData;
    finspacePricingData = transformFinspacePricing(rawData);
    console.warn('Finspace pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Finspace pricing data not found. Run fetch:pricing first.');
  }
}

export const finspacePricing = finspacePricingData;

