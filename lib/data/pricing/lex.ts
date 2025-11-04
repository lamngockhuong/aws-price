import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSLexPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformLexPricing = createGenericTransform('lex');

// Default export
let lexPricingData: PricingEntry[] = [];

try {
  lexPricingData = require('./lex-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./lex.json') as AWSLexPricingData;
    lexPricingData = transformLexPricing(rawData);
    console.warn('Lex pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Lex pricing data not found. Run fetch:pricing first.');
  }
}

export const lexPricing = lexPricingData;

