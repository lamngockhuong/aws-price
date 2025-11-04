import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSWorkspacesPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformWorkspacesPricing = createGenericTransform('workspaces');

// Default export
let workspacesPricingData: PricingEntry[] = [];

try {
  workspacesPricingData = require('./workspaces-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./workspaces.json') as AWSWorkspacesPricingData;
    workspacesPricingData = transformWorkspacesPricing(rawData);
    console.warn('Workspaces pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Workspaces pricing data not found. Run fetch:pricing first.');
  }
}

export const workspacesPricing = workspacesPricingData;

