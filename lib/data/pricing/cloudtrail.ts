import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSCloudtrailPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformCloudtrailPricing = createGenericTransform('cloudtrail');

// Default export
let cloudtrailPricingData: PricingEntry[] = [];

try {
  cloudtrailPricingData = require('./cloudtrail-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./cloudtrail.json') as AWSCloudtrailPricingData;
    cloudtrailPricingData = transformCloudtrailPricing(rawData);
    console.warn('Cloudtrail pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Cloudtrail pricing data not found. Run fetch:pricing first.');
  }
}

export const cloudtrailPricing = cloudtrailPricingData;

