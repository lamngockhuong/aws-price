import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSGluePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformGluePricing = createGenericTransform('glue');

// Default export
let gluePricingData: PricingEntry[] = [];

try {
  gluePricingData = require('./glue-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./glue.json') as AWSGluePricingData;
    gluePricingData = transformGluePricing(rawData);
    console.warn('Glue pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Glue pricing data not found. Run fetch:pricing first.');
  }
}

export const gluePricing = gluePricingData;

