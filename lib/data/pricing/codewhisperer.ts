import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodewhispererPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodewhispererPricing = createGenericTransform('codewhisperer');

// Default export
let codewhispererPricingData: PricingEntry[] = [];

try {
  codewhispererPricingData = require('./codewhisperer-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codewhisperer.json') as AWSCodewhispererPricingData;
    codewhispererPricingData = transformCodewhispererPricing(rawData);
    console.warn('Codewhisperer pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codewhisperer pricing data not found. Run fetch:pricing first.');
  }
}

export const codewhispererPricing = codewhispererPricingData;

