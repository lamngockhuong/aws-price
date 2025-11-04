import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSGuarddutyPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformGuarddutyPricing = createGenericTransform('guardduty');

// Default export
let guarddutyPricingData: PricingEntry[] = [];

try {
  guarddutyPricingData = require('./guardduty-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./guardduty.json') as AWSGuarddutyPricingData;
    guarddutyPricingData = transformGuarddutyPricing(rawData);
    console.warn('Guardduty pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Guardduty pricing data not found. Run fetch:pricing first.');
  }
}

export const guarddutyPricing = guarddutyPricingData;

