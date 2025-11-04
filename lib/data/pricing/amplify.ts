import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSAmplifyPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformAmplifyPricing = createGenericTransform('amplify');

// Default export
let amplifyPricingData: PricingEntry[] = [];

try {
  amplifyPricingData = require('./amplify-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./amplify.json') as AWSAmplifyPricingData;
    amplifyPricingData = transformAmplifyPricing(rawData);
    console.warn('Amplify pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Amplify pricing data not found. Run fetch:pricing first.');
  }
}

export const amplifyPricing = amplifyPricingData;

