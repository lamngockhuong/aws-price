import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSConnectPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformConnectPricing = createGenericTransform('connect');

// Default export
let connectPricingData: PricingEntry[] = [];

try {
  connectPricingData = require('./connect-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./connect.json') as AWSConnectPricingData;
    connectPricingData = transformConnectPricing(rawData);
    console.warn('Connect pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Connect pricing data not found. Run fetch:pricing first.');
  }
}

export const connectPricing = connectPricingData;

