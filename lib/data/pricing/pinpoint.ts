import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSPinpointPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformPinpointPricing = createGenericTransform('pinpoint');

// Default export
let pinpointPricingData: PricingEntry[] = [];

try {
  pinpointPricingData = require('./pinpoint-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./pinpoint.json') as AWSPinpointPricingData;
    pinpointPricingData = transformPinpointPricing(rawData);
    console.warn('Pinpoint pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Pinpoint pricing data not found. Run fetch:pricing first.');
  }
}

export const pinpointPricing = pinpointPricingData;

