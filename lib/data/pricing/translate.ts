import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSTranslatePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformTranslatePricing = createGenericTransform('translate');

// Default export
let translatePricingData: PricingEntry[] = [];

try {
  translatePricingData = require('./translate-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./translate.json') as AWSTranslatePricingData;
    translatePricingData = transformTranslatePricing(rawData);
    console.warn('Translate pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('Translate pricing data not found. Run fetch:pricing first.');
  }
}

export const translatePricing = translatePricingData;

