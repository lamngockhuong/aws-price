import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSRedshiftPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformRedshiftPricing = createGenericTransform('redshift');

let redshiftPricingData: PricingEntry[] = [];

try {
  redshiftPricingData = require('./redshift-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./redshift.json') as AWSRedshiftPricingData;
    redshiftPricingData = transformRedshiftPricing(rawData);
    console.warn('Redshift pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('Redshift pricing data not found. Run fetch:pricing first.');
  }
}

export const redshiftPricing = redshiftPricingData;

