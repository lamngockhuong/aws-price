import type { PricingEntry } from '../../types';
import { createGenericTransform } from './generic';

interface AWSBackupPricingData {
  manifest: { serviceId: string; currencyCode: string; [key: string]: any };
  sets: Record<string, any>;
  regions: Record<string, Record<string, { rateCode?: string; price: string; [key: string]: any }>>;
}

export const transformBackupPricing = createGenericTransform('backup');

// Default export
let backupPricingData: PricingEntry[] = [];

try {
  backupPricingData = require('./backup-transformed.json') as PricingEntry[];
} catch {
  try {
    const rawData = require('./backup.json') as AWSBackupPricingData;
    backupPricingData = transformBackupPricing(rawData);
    console.warn('Backup pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    console.warn('Backup pricing data not found. Run fetch:pricing first.');
  }
}

export const backupPricing = backupPricingData;

