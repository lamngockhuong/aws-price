import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSShieldPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformShieldPricing = createGenericTransform('shield');

// Default export
let shieldPricingData: PricingEntry[] = [];

try {
  shieldPricingData = require('./shield-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./shield.json') as AWSShieldPricingData;
    shieldPricingData = transformShieldPricing(rawData);
    console.warn('Shield pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Shield pricing data not found. Run fetch:pricing first.');
  }
}

export const shieldPricing = shieldPricingData;

