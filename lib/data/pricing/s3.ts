import type { PricingEntry } from '../../types';

interface AWSS3PricingData {
  manifest: {
    serviceId: string;
    currencyCode: string;
    [key: string]: any;
  };
  sets: Record<string, any>;
  regions: Record<string, Record<string, {
    rateCode?: string;
    price: string;
    RegionlessRateCode?: string;
    [key: string]: any;
  }>>;
}

function parseRegionName(regionKey: string): string {
  const regionMap: Record<string, string> = {
    'US East (N. Virginia)': 'us-east-1',
    'US East (Ohio)': 'us-east-2',
    'US West (N. California)': 'us-west-1',
    'US West (Oregon)': 'us-west-2',
    'Asia Pacific (Singapore)': 'ap-southeast-1',
    'Asia Pacific (Sydney)': 'ap-southeast-2',
    'Asia Pacific (Tokyo)': 'ap-northeast-1',
    'EU (Ireland)': 'eu-west-1',
    'EU (London)': 'eu-west-2',
    'EU (Frankfurt)': 'eu-central-1',
  };

  if (regionMap[regionKey]) {
    return regionMap[regionKey];
  }

  const regionCodeMatch = regionKey.match(/^([a-z]{2}-[a-z]+-\d+)/i);
  if (regionCodeMatch) {
    return regionCodeMatch[1].toLowerCase();
  }

  return regionKey.toLowerCase().replace(/\s+/g, '-');
}

function extractS3Attributes(rateCodeKey: string): {
  storageClass?: string;
  requestType?: string;
  usageType?: string;
} {
  const attributes: { storageClass?: string; requestType?: string; usageType?: string } = {};

  // Extract storage class
  const storageClasses = ['Standard', 'Standard-IA', 'Glacier', 'Glacier-Deep-Archive', 'Intelligent-Tiering', 'OneZone-IA', 'Reduced-Redundancy'];
  for (const sc of storageClasses) {
    if (rateCodeKey.toLowerCase().includes(sc.toLowerCase().replace(/-/g, ''))) {
      attributes.storageClass = sc;
      break;
    }
  }

  // Extract request type
  if (rateCodeKey.toLowerCase().includes('put') || rateCodeKey.toLowerCase().includes('write')) {
    attributes.requestType = 'PUT';
  } else if (rateCodeKey.toLowerCase().includes('get') || rateCodeKey.toLowerCase().includes('read')) {
    attributes.requestType = 'GET';
  } else if (rateCodeKey.toLowerCase().includes('delete')) {
    attributes.requestType = 'DELETE';
  } else if (rateCodeKey.toLowerCase().includes('select') || rateCodeKey.toLowerCase().includes('sql')) {
    attributes.requestType = 'SELECT';
  } else if (rateCodeKey.toLowerCase().includes('list')) {
    attributes.requestType = 'LIST';
  }

  // Extract usage type
  if (rateCodeKey.toLowerCase().includes('storage')) {
    attributes.usageType = 'Storage';
  } else if (rateCodeKey.toLowerCase().includes('request') || rateCodeKey.toLowerCase().includes('api')) {
    attributes.usageType = 'Request';
  } else if (rateCodeKey.toLowerCase().includes('data') && rateCodeKey.toLowerCase().includes('transfer')) {
    attributes.usageType = 'DataTransfer';
  }

  return attributes;
}

function determineUnit(rateCodeKey: string): string {
  if (rateCodeKey.toLowerCase().includes('gb') || rateCodeKey.toLowerCase().includes('storage')) {
    return 'USD per GB';
  } else if (rateCodeKey.toLowerCase().includes('request') || rateCodeKey.toLowerCase().includes('api')) {
    return 'USD per 1000 requests';
  } else if (rateCodeKey.toLowerCase().includes('tb')) {
    return 'USD per TB';
  }
  return 'USD per unit';
}

export function transformS3Pricing(data: AWSS3PricingData): PricingEntry[] {
  const entries: PricingEntry[] = [];

  if (!data.regions) {
    return entries;
  }

  Object.entries(data.regions).forEach(([regionName, rateCodes]) => {
    const regionCode = parseRegionName(regionName);

    Object.entries(rateCodes).forEach(([rateCodeKey, rateData]) => {
      // Skip hash-based keys or invalid entries
      if (!rateCodeKey || rateCodeKey.length < 5 || typeof rateData !== 'object' || !rateData.price) {
        return;
      }

      const attributes = extractS3Attributes(rateCodeKey);
      const unit = determineUnit(rateCodeKey);

      // Only add entries that have meaningful attributes
      if (attributes.storageClass || attributes.requestType || attributes.usageType) {
        entries.push({
          serviceId: 's3',
          region: regionCode,
          attributes: {
            ...(attributes.storageClass && { storageClass: attributes.storageClass }),
            ...(attributes.requestType && { requestType: attributes.requestType }),
            ...(attributes.usageType && { usageType: attributes.usageType }),
          },
          pricePerUnit: rateData.price || '0',
          unit,
        });
      }
    });
  });

  return entries;
}

// Default export: load from pre-transformed JSON (much faster)
let s3PricingData: PricingEntry[] = [];

try {
  // Try to load pre-transformed data first (much faster)
  s3PricingData = require('./s3-transformed.json') as PricingEntry[];
} catch {
  // Fallback: transform on-the-fly if transformed file doesn't exist
  try {
    const rawData = require('./s3.json') as AWSS3PricingData;
    s3PricingData = transformS3Pricing(rawData);
    console.warn('S3 pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    // File doesn't exist yet or error loading
    console.warn('S3 pricing data not found. Run fetch:pricing first.');
  }
}

export const s3Pricing = s3PricingData;

