import type { PricingEntry } from '../../types';

interface AWSNATGatewayPricingData {
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
  // Map display names to region codes (simplified)
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

function extractNATGatewayFeature(rateCodeKey: string): { feature: string; usageType?: string } {
  // NAT Gateway pricing typically includes:
  // - NAT Gateway hours
  // - Data processing (GB)

  if (rateCodeKey.toLowerCase().includes('data') || rateCodeKey.toLowerCase().includes('processing')) {
    return { feature: 'NAT Gateway', usageType: 'Data Processing' };
  }

  if (rateCodeKey.toLowerCase().includes('hour') || rateCodeKey.toLowerCase().includes('gateway')) {
    return { feature: 'NAT Gateway', usageType: 'Gateway Hours' };
  }

  // Default
  return { feature: 'NAT Gateway' };
}

function determineUnit(rateCodeKey: string): string {
  if (rateCodeKey.toLowerCase().includes('data') || rateCodeKey.toLowerCase().includes('gb')) {
    return 'USD per GB';
  }

  return 'USD per hour';
}

export function transformNATGatewayPricing(data: AWSNATGatewayPricingData): PricingEntry[] {
  const entries: PricingEntry[] = [];

  if (!data.regions) {
    return entries;
  }

  Object.entries(data.regions).forEach(([regionName, rateCodes]) => {
    const regionCode = parseRegionName(regionName);

    Object.entries(rateCodes).forEach(([rateCodeKey, rateData]) => {
      // Skip hash-based keys, only process descriptive keys
      if (rateCodeKey.length < 10 || rateCodeKey.match(/^[a-zA-Z0-9_]{20,}$/)) {
        return;
      }

      const featureInfo = extractNATGatewayFeature(rateCodeKey);
      const unit = determineUnit(rateCodeKey);

      entries.push({
        serviceId: 'natgateway',
        region: regionCode,
        attributes: {
          feature: featureInfo.feature,
          ...(featureInfo.usageType && { usageType: featureInfo.usageType }),
        },
        pricePerUnit: rateData.price || '0',
        unit,
      });
    });
  });

  return entries;
}

// Default export: load from pre-transformed JSON (much faster)
let natgatewayPricingData: PricingEntry[] = [];

try {
  // Try to load pre-transformed data first (much faster)
  natgatewayPricingData = require('./natgateway-transformed.json') as PricingEntry[];
} catch {
  // Fallback: transform on-the-fly if transformed file doesn't exist
  try {
    const rawData = require('./natgateway.json') as AWSNATGatewayPricingData;
    natgatewayPricingData = transformNATGatewayPricing(rawData);
    console.warn('NAT Gateway pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch {
    // File doesn't exist yet or error loading
    console.warn('NAT Gateway pricing data not found. Run fetch:pricing first.');
  }
}

export const natgatewayPricing = natgatewayPricingData;

