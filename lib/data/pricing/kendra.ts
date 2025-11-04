import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSKendraPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformKendraPricing = createGenericTransform('kendra');

// Default export
let kendraPricingData: PricingEntry[] = [];

try {
  kendraPricingData = require('./kendra-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./kendra.json') as AWSKendraPricingData;
    kendraPricingData = transformKendraPricing(rawData);
    console.warn('Kendra pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Kendra pricing data not found. Run fetch:pricing first.');
  }
}

export const kendraPricing = kendraPricingData;

