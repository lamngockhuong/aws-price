import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSMediaconnectPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformMediaconnectPricing = createGenericTransform('mediaconnect');

// Default export
let mediaconnectPricingData: PricingEntry[] = [];

try {
  mediaconnectPricingData = require('./mediaconnect-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./mediaconnect.json') as AWSMediaconnectPricingData;
    mediaconnectPricingData = transformMediaconnectPricing(rawData);
    console.warn('Mediaconnect pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Mediaconnect pricing data not found. Run fetch:pricing first.');
  }
}

export const mediaconnectPricing = mediaconnectPricingData;

