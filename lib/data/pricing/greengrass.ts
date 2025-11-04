import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSGreengrassPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformGreengrassPricing = createGenericTransform('greengrass');

// Default export
let greengrassPricingData: PricingEntry[] = [];

try {
  greengrassPricingData = require('./greengrass-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./greengrass.json') as AWSGreengrassPricingData;
    greengrassPricingData = transformGreengrassPricing(rawData);
    console.warn('Greengrass pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Greengrass pricing data not found. Run fetch:pricing first.');
  }
}

export const greengrassPricing = greengrassPricingData;

