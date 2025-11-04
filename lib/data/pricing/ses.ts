import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSSesPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformSesPricing = createGenericTransform('ses');

// Default export
let sesPricingData: PricingEntry[] = [];

try {
  sesPricingData = require('./ses-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./ses.json') as AWSSesPricingData;
    sesPricingData = transformSesPricing(rawData);
    console.warn('Ses pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Ses pricing data not found. Run fetch:pricing first.');
  }
}

export const sesPricing = sesPricingData;

