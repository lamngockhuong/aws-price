import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSWafPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformWafPricing = createGenericTransform('waf');

// Default export
let wafPricingData: PricingEntry[] = [];

try {
  wafPricingData = require('./waf-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./waf.json') as AWSWafPricingData;
    wafPricingData = transformWafPricing(rawData);
    console.warn('Waf pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Waf pricing data not found. Run fetch:pricing first.');
  }
}

export const wafPricing = wafPricingData;

