import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodepipelinePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodepipelinePricing = createGenericTransform('codepipeline');

// Default export
let codepipelinePricingData: PricingEntry[] = [];

try {
  codepipelinePricingData = require('./codepipeline-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codepipeline.json') as AWSCodepipelinePricingData;
    codepipelinePricingData = transformCodepipelinePricing(rawData);
    console.warn('Codepipeline pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codepipeline pricing data not found. Run fetch:pricing first.');
  }
}

export const codepipelinePricing = codepipelinePricingData;

