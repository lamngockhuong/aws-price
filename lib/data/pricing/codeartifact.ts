import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodeartifactPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodeartifactPricing = createGenericTransform('codeartifact');

// Default export
let codeartifactPricingData: PricingEntry[] = [];

try {
  codeartifactPricingData = require('./codeartifact-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codeartifact.json') as AWSCodeartifactPricingData;
    codeartifactPricingData = transformCodeartifactPricing(rawData);
    console.warn('Codeartifact pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codeartifact pricing data not found. Run fetch:pricing first.');
  }
}

export const codeartifactPricing = codeartifactPricingData;

