import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSRekognitionPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformRekognitionPricing = createGenericTransform('rekognition');

// Default export
let rekognitionPricingData: PricingEntry[] = [];

try {
  rekognitionPricingData = require('./rekognition-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./rekognition.json') as AWSRekognitionPricingData;
    rekognitionPricingData = transformRekognitionPricing(rawData);
    console.warn('Rekognition pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Rekognition pricing data not found. Run fetch:pricing first.');
  }
}

export const rekognitionPricing = rekognitionPricingData;

