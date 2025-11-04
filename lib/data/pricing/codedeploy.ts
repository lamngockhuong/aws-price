import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCodedeployPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCodedeployPricing = createGenericTransform('codedeploy');

// Default export
let codedeployPricingData: PricingEntry[] = [];

try {
  codedeployPricingData = require('./codedeploy-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./codedeploy.json') as AWSCodedeployPricingData;
    codedeployPricingData = transformCodedeployPricing(rawData);
    console.warn('Codedeploy pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Codedeploy pricing data not found. Run fetch:pricing first.');
  }
}

export const codedeployPricing = codedeployPricingData;

