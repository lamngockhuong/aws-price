import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSBedrockPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformBedrockPricing = createGenericTransform('bedrock');

// Default export
let bedrockPricingData: PricingEntry[] = [];

try {
  bedrockPricingData = require('./bedrock-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./bedrock.json') as AWSBedrockPricingData;
    bedrockPricingData = transformBedrockPricing(rawData);
    console.warn('Bedrock pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Bedrock pricing data not found. Run fetch:pricing first.');
  }
}

export const bedrockPricing = bedrockPricingData;

