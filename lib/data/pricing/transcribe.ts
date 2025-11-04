import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSTranscribePricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformTranscribePricing = createGenericTransform('transcribe');

// Default export
let transcribePricingData: PricingEntry[] = [];

try {
  transcribePricingData = require('./transcribe-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./transcribe.json') as AWSTranscribePricingData;
    transcribePricingData = transformTranscribePricing(rawData);
    console.warn('Transcribe pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Transcribe pricing data not found. Run fetch:pricing first.');
  }
}

export const transcribePricing = transcribePricingData;

