import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSRobomakerPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformRobomakerPricing = createGenericTransform('robomaker');

// Default export
let robomakerPricingData: PricingEntry[] = [];

try {
  robomakerPricingData = require('./robomaker-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./robomaker.json') as AWSRobomakerPricingData;
    robomakerPricingData = transformRobomakerPricing(rawData);
    console.warn('Robomaker pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Robomaker pricing data not found. Run fetch:pricing first.');
  }
}

export const robomakerPricing = robomakerPricingData;

