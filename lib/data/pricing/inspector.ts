import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSInspectorPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformInspectorPricing = createGenericTransform('inspector');

// Default export
let inspectorPricingData: PricingEntry[] = [];

try {
  inspectorPricingData = require('./inspector-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./inspector.json') as AWSInspectorPricingData;
    inspectorPricingData = transformInspectorPricing(rawData);
    console.warn('Inspector pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Inspector pricing data not found. Run fetch:pricing first.');
  }
}

export const inspectorPricing = inspectorPricingData;

