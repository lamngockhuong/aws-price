import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSTimestreamPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformTimestreamPricing = createGenericTransform('timestream');

// Default export
let timestreamPricingData: PricingEntry[] = [];

try {
  timestreamPricingData = require('./timestream-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./timestream.json') as AWSTimestreamPricingData;
    timestreamPricingData = transformTimestreamPricing(rawData);
    console.warn('Timestream pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Timestream pricing data not found. Run fetch:pricing first.');
  }
}

export const timestreamPricing = timestreamPricingData;

