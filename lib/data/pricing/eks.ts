import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSEKSPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformEKSPricing = createGenericTransform('eks');

let eksPricingData: PricingEntry[] = [];

try {
  eksPricingData = require('./eks-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./eks.json') as AWSEKSPricingData;
    eksPricingData = transformEKSPricing(rawData);
    console.warn('EKS pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('EKS pricing data not found. Run fetch:pricing first.');
  }
}

export const eksPricing = eksPricingData;

