import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSConfigPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformConfigPricing = createGenericTransform('config');

// Default export
let configPricingData: PricingEntry[] = [];

try {
  configPricingData = require('./config-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./config.json') as AWSConfigPricingData;
    configPricingData = transformConfigPricing(rawData);
    console.warn('Config pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Config pricing data not found. Run fetch:pricing first.');
  }
}

export const configPricing = configPricingData;

