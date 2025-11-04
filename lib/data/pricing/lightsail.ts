import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSLightsailPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformLightsailPricing = createGenericTransform('lightsail');

// Default export
let lightsailPricingData: PricingEntry[] = [];

try {
  lightsailPricingData = require('./lightsail-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./lightsail.json') as AWSLightsailPricingData;
    lightsailPricingData = transformLightsailPricing(rawData);
    console.warn('Lightsail pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Lightsail pricing data not found. Run fetch:pricing first.');
  }
}

export const lightsailPricing = lightsailPricingData;

