import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSRoute53PricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformRoute53Pricing = createGenericTransform('route53');

// Default export
let route53PricingData: PricingEntry[] = [];

try {
  route53PricingData = require('./route53-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./route53.json') as AWSRoute53PricingData;
    route53PricingData = transformRoute53Pricing(rawData);
    console.warn('Route53 pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Route53 pricing data not found. Run fetch:pricing first.');
  }
}

export const route53Pricing = route53PricingData;

