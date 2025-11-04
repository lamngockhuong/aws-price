import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSElasticachePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformElasticachePricing = createGenericTransform('elasticache');

// Default export
let elasticachePricingData: PricingEntry[] = [];

try {
  elasticachePricingData = require('./elasticache-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./elasticache.json') as AWSElasticachePricingData;
    elasticachePricingData = transformElasticachePricing(rawData);
    console.warn('Elasticache pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Elasticache pricing data not found. Run fetch:pricing first.');
  }
}

export const elasticachePricing = elasticachePricingData;

