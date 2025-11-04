import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSTextractPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformTextractPricing = createGenericTransform('textract');

// Default export
let textractPricingData: PricingEntry[] = [];

try {
  textractPricingData = require('./textract-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./textract.json') as AWSTextractPricingData;
    textractPricingData = transformTextractPricing(rawData);
    console.warn('Textract pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Textract pricing data not found. Run fetch:pricing first.');
  }
}

export const textractPricing = textractPricingData;

