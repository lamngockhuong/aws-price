import type { PricingEntry } from '../../types';

interface AWSLambdaPricingData {
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

function extractLambdaAttributes(rateCodeKey: string): {
  memory?: string;
  requests?: string;
  computeDuration?: string;
  usageType?: string;
} {
  const attributes: { memory?: string; requests?: string; computeDuration?: string; usageType?: string } = {};

  // Extract memory size
  const memoryMatch = rateCodeKey.match(/(\d+)\s*(?:mb|gb|memory)/i);
  if (memoryMatch) {
    attributes.memory = `${memoryMatch[1]} MB`;
  }

  // Extract usage type
  if (rateCodeKey.toLowerCase().includes('request')) {
    attributes.usageType = 'Requests';
    attributes.requests = 'Per 1M requests';
  } else if (rateCodeKey.toLowerCase().includes('compute') || rateCodeKey.toLowerCase().includes('gb-second') || rateCodeKey.toLowerCase().includes('duration')) {
    attributes.usageType = 'Compute';
    attributes.computeDuration = 'GB-second';
  }

  return attributes;
}

function determineUnit(rateCodeKey: string): string {
  if (rateCodeKey.toLowerCase().includes('request')) {
    return 'USD per 1M requests';
  } else if (rateCodeKey.toLowerCase().includes('compute') || rateCodeKey.toLowerCase().includes('gb-second')) {
    return 'USD per GB-second';
  }
  return 'USD per hour';
}

export function transformLambdaPricing(data: AWSLambdaPricingData): PricingEntry[] {
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

      const attributes = extractLambdaAttributes(rateCodeKey);
      const unit = determineUnit(rateCodeKey);

      // Only add entries that have meaningful attributes
      if (attributes.usageType) {
        entries.push({
          serviceId: 'lambda',
          region: regionCode,
          attributes: {
            ...(attributes.memory && { memory: attributes.memory }),
            ...(attributes.requests && { requests: attributes.requests }),
            ...(attributes.computeDuration && { computeDuration: attributes.computeDuration }),
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
let lambdaPricingData: PricingEntry[] = [];

try {
  // Try to load pre-transformed data first (much faster)
  lambdaPricingData = require('./lambda-transformed.json') as PricingEntry[];
} catch {
  // Fallback: transform on-the-fly if transformed file doesn't exist
  try {
    const rawData = require('./lambda.json') as AWSLambdaPricingData;
    lambdaPricingData = transformLambdaPricing(rawData);
    console.warn('Lambda pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    // File doesn't exist yet or error loading
    console.warn('Lambda pricing data not found. Run fetch:pricing first.');
  }
}

export const lambdaPricing = lambdaPricingData;

