import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCloudformationPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCloudformationPricing = createGenericTransform('cloudformation');

// Default export
let cloudformationPricingData: PricingEntry[] = [];

try {
  cloudformationPricingData = require('./cloudformation-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./cloudformation.json') as AWSCloudformationPricingData;
    cloudformationPricingData = transformCloudformationPricing(rawData);
    console.warn('Cloudformation pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Cloudformation pricing data not found. Run fetch:pricing first.');
  }
}

export const cloudformationPricing = cloudformationPricingData;

