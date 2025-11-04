import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodeguruPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodeguruPricing = createGenericTransform('codeguru');

// Default export
let codeguruPricingData: PricingEntry[] = [];

try {
  codeguruPricingData = require('./codeguru-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codeguru.json') as AWSCodeguruPricingData;
    codeguruPricingData = transformCodeguruPricing(rawData);
    console.warn('Codeguru pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codeguru pricing data not found. Run fetch:pricing first.');
  }
}

export const codeguruPricing = codeguruPricingData;

