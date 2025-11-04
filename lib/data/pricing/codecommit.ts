import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodecommitPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodecommitPricing = createGenericTransform('codecommit');

// Default export
let codecommitPricingData: PricingEntry[] = [];

try {
  codecommitPricingData = require('./codecommit-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codecommit.json') as AWSCodecommitPricingData;
    codecommitPricingData = transformCodecommitPricing(rawData);
    console.warn('Codecommit pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codecommit pricing data not found. Run fetch:pricing first.');
  }
}

export const codecommitPricing = codecommitPricingData;

