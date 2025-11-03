import type { PricingEntry } from '../../types';

// Import pricing modules (uses pre-transformed data for fast loading)
import { ec2Pricing } from './ec2';
import { natgatewayPricing } from './natgateway';
import { s3Pricing } from './s3';
import { lambdaPricing } from './lambda';
import { cloudfrontPricing } from './cloudfront';
import { translatePricing } from './translate';
import { apigatewayPricing } from './apigateway';
import { ecsPricing } from './ecs';
import { eksPricing } from './eks';
import { redshiftPricing } from './redshift';
import { dynamodbPricing } from './dynamodb';
import { snsPricing } from './sns';

// Registry of all pricing data by service ID
const pricingRegistry: Record<string, PricingEntry[]> = {
  ec2: ec2Pricing,
  natgateway: natgatewayPricing,
  s3: s3Pricing,
  lambda: lambdaPricing,
  cloudfront: cloudfrontPricing,
  translate: translatePricing,
  apigateway: apigatewayPricing,
  ecs: ecsPricing,
  eks: eksPricing,
  redshift: redshiftPricing,
  dynamodb: dynamodbPricing,
  sns: snsPricing,
};

export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  return pricingRegistry[serviceId] || [];
}

export function getAllPricingServices(): string[] {
  return Object.keys(pricingRegistry);
}

export function filterPricingByRegion(pricing: PricingEntry[], region?: string): PricingEntry[] {
  if (!region) return pricing;
  return pricing.filter((entry) => entry.region === region);
}

export function getUniqueRegions(pricing: PricingEntry[]): string[] {
  const regions = pricing.map((entry) => entry.region);
  return Array.from(new Set(regions)).sort();
}

// Re-export for convenience
export {
  ec2Pricing,
  natgatewayPricing,
  s3Pricing,
  lambdaPricing,
  cloudfrontPricing,
  translatePricing,
  apigatewayPricing,
  ecsPricing,
  eksPricing,
  redshiftPricing,
  dynamodbPricing,
  snsPricing,
};

