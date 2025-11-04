import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCloudwatchPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCloudwatchPricing = createGenericTransform('cloudwatch');

// Default export
let cloudwatchPricingData: PricingEntry[] = [];

try {
  cloudwatchPricingData = require('./cloudwatch-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./cloudwatch.json') as AWSCloudwatchPricingData;
    cloudwatchPricingData = transformCloudwatchPricing(rawData);
    console.warn('Cloudwatch pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Cloudwatch pricing data not found. Run fetch:pricing first.');
  }
}

export const cloudwatchPricing = cloudwatchPricingData;

