import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSKinesisPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformKinesisPricing = createGenericTransform('kinesis');

// Default export
let kinesisPricingData: PricingEntry[] = [];

try {
  kinesisPricingData = require('./kinesis-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./kinesis.json') as AWSKinesisPricingData;
    kinesisPricingData = transformKinesisPricing(rawData);
    console.warn('Kinesis pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Kinesis pricing data not found. Run fetch:pricing first.');
  }
}

export const kinesisPricing = kinesisPricingData;

