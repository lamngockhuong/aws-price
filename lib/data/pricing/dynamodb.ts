import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSDynamoDBPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformDynamoDBPricing = createGenericTransform('dynamodb');

let dynamodbPricingData: PricingEntry[] = [];

try {
  dynamodbPricingData = require('./dynamodb-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./dynamodb.json') as AWSDynamoDBPricingData;
    dynamodbPricingData = transformDynamoDBPricing(rawData);
    console.warn('DynamoDB pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('DynamoDB pricing data not found. Run fetch:pricing first.');
  }
}

export const dynamodbPricing = dynamodbPricingData;

