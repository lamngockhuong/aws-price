import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSWorkdocsPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformWorkdocsPricing = createGenericTransform('workdocs');

// Default export
let workdocsPricingData: PricingEntry[] = [];

try {
  workdocsPricingData = require('./workdocs-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./workdocs.json') as AWSWorkdocsPricingData;
    workdocsPricingData = transformWorkdocsPricing(rawData);
    console.warn('Workdocs pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Workdocs pricing data not found. Run fetch:pricing first.');
  }
}

export const workdocsPricing = workdocsPricingData;

