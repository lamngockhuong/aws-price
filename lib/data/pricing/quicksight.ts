import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSQuicksightPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformQuicksightPricing = createGenericTransform('quicksight');

// Default export
let quicksightPricingData: PricingEntry[] = [];

try {
  quicksightPricingData = require('./quicksight-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./quicksight.json') as AWSQuicksightPricingData;
    quicksightPricingData = transformQuicksightPricing(rawData);
    console.warn('Quicksight pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Quicksight pricing data not found. Run fetch:pricing first.');
  }
}

export const quicksightPricing = quicksightPricingData;

