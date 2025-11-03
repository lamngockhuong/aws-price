import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSECSPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformECSPricing = createGenericTransform('ecs');

let ecsPricingData: PricingEntry[] = [];

try {
  ecsPricingData = require('./ecs-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./ecs.json') as AWSECSPricingData;
    ecsPricingData = transformECSPricing(rawData);
    console.warn('ECS pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('ECS pricing data not found. Run fetch:pricing first.');
  }
}

export const ecsPricing = ecsPricingData;

