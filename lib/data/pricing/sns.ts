import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSSNSPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformSNSPricing = createGenericTransform('sns');

let snsPricingData: PricingEntry[] = [];

try {
  snsPricingData = require('./sns-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./sns.json') as AWSSNSPricingData;
    snsPricingData = transformSNSPricing(rawData);
    console.warn('SNS pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('SNS pricing data not found. Run fetch:pricing first.');
  }
}

export const snsPricing = snsPricingData;

