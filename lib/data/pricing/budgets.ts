import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSBudgetsPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformBudgetsPricing = createGenericTransform('budgets');

// Default export
let budgetsPricingData: PricingEntry[] = [];

try {
  budgetsPricingData = require('./budgets-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./budgets.json') as AWSBudgetsPricingData;
    budgetsPricingData = transformBudgetsPricing(rawData);
    console.warn('Budgets pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Budgets pricing data not found. Run fetch:pricing first.');
  }
}

export const budgetsPricing = budgetsPricingData;

