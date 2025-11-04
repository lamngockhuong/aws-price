import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSForecastPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformForecastPricing = createGenericTransform('forecast');

// Default export
let forecastPricingData: PricingEntry[] = [];

try {
  forecastPricingData = require('./forecast-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./forecast.json') as AWSForecastPricingData;
    forecastPricingData = transformForecastPricing(rawData);
    console.warn('Forecast pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Forecast pricing data not found. Run fetch:pricing first.');
  }
}

export const forecastPricing = forecastPricingData;

