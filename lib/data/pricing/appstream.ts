import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSAppstreamPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformAppstreamPricing = createGenericTransform('appstream');

// Default export
let appstreamPricingData: PricingEntry[] = [];

try {
  appstreamPricingData = require('./appstream-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./appstream.json') as AWSAppstreamPricingData;
    appstreamPricingData = transformAppstreamPricing(rawData);
    console.warn('Appstream pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Appstream pricing data not found. Run fetch:pricing first.');
  }
}

export const appstreamPricing = appstreamPricingData;

