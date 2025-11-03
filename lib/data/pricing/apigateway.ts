import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSAPIGatewayPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformAPIGatewayPricing = createGenericTransform('apigateway');

let apigatewayPricingData: PricingEntry[] = [];

try {
  apigatewayPricingData = require('./apigateway-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./apigateway.json') as AWSAPIGatewayPricingData;
    apigatewayPricingData = transformAPIGatewayPricing(rawData);
    console.warn('API Gateway pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('API Gateway pricing data not found. Run fetch:pricing first.');
  }
}

export const apigatewayPricing = apigatewayPricingData;

