import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSEfsPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformEfsPricing = createGenericTransform('efs');

// Default export
let efsPricingData: PricingEntry[] = [];

try {
  efsPricingData = require('./efs-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./efs.json') as AWSEfsPricingData;
    efsPricingData = transformEfsPricing(rawData);
    console.warn('Efs pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Efs pricing data not found. Run fetch:pricing first.');
  }
}

export const efsPricing = efsPricingData;

