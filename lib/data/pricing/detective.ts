import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSDetectivePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformDetectivePricing = createGenericTransform('detective');

// Default export
let detectivePricingData: PricingEntry[] = [];

try {
  detectivePricingData = require('./detective-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./detective.json') as AWSDetectivePricingData;
    detectivePricingData = transformDetectivePricing(rawData);
    console.warn('Detective pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Detective pricing data not found. Run fetch:pricing first.');
  }
}

export const detectivePricing = detectivePricingData;

