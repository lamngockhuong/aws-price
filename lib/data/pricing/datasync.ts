import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSDatasyncPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformDatasyncPricing = createGenericTransform('datasync');

// Default export
let datasyncPricingData: PricingEntry[] = [];

try {
  datasyncPricingData = require('./datasync-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./datasync.json') as AWSDatasyncPricingData;
    datasyncPricingData = transformDatasyncPricing(rawData);
    console.warn('Datasync pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Datasync pricing data not found. Run fetch:pricing first.');
  }
}

export const datasyncPricing = datasyncPricingData;

