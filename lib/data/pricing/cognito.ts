import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCognitoPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCognitoPricing = createGenericTransform('cognito');

// Default export
let cognitoPricingData: PricingEntry[] = [];

try {
  cognitoPricingData = require('./cognito-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./cognito.json') as AWSCognitoPricingData;
    cognitoPricingData = transformCognitoPricing(rawData);
    console.warn('Cognito pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Cognito pricing data not found. Run fetch:pricing first.');
  }
}

export const cognitoPricing = cognitoPricingData;

