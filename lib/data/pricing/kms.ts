import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSKmsPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformKmsPricing = createGenericTransform('kms');

// Default export
let kmsPricingData: PricingEntry[] = [];

try {
  kmsPricingData = require('./kms-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./kms.json') as AWSKmsPricingData;
    kmsPricingData = transformKmsPricing(rawData);
    console.warn('Kms pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Kms pricing data not found. Run fetch:pricing first.');
  }
}

export const kmsPricing = kmsPricingData;

