import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodebuildPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodebuildPricing = createGenericTransform('codebuild');

// Default export
let codebuildPricingData: PricingEntry[] = [];

try {
  codebuildPricingData = require('./codebuild-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codebuild.json') as AWSCodebuildPricingData;
    codebuildPricingData = transformCodebuildPricing(rawData);
    console.warn('Codebuild pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codebuild pricing data not found. Run fetch:pricing first.');
  }
}

export const codebuildPricing = codebuildPricingData;

