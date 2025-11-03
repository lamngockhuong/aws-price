import type { PricingEntry } from '../../types';

interface AWSCloudFrontPricingData {
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

function extractCloudFrontAttributes(rateCodeKey: string): {
  feature?: string;
  usageType?: string;
  dataTransferClass?: string;
} {
  const attributes: { feature?: string; usageType?: string; dataTransferClass?: string } = {};

  // Extract feature/usage type
  if (rateCodeKey.toLowerCase().includes('data') && rateCodeKey.toLowerCase().includes('transfer')) {
    attributes.feature = 'Data Transfer';
    attributes.usageType = 'Data Transfer Out';
  } else if (rateCodeKey.toLowerCase().includes('request') || rateCodeKey.toLowerCase().includes('http')) {
    attributes.feature = 'Requests';
    attributes.usageType = 'HTTP/HTTPS Requests';
  } else if (rateCodeKey.toLowerCase().includes('origin') || rateCodeKey.toLowerCase().includes('shield')) {
    attributes.feature = 'Origin Shield';
    attributes.usageType = 'Data Transfer';
  }

  // Extract data transfer class
  if (rateCodeKey.toLowerCase().includes('origin')) {
    attributes.dataTransferClass = 'Origin';
  } else if (rateCodeKey.toLowerCase().includes('edge')) {
    attributes.dataTransferClass = 'Edge';
  }

  return attributes;
}

function determineUnit(rateCodeKey: string): string {
  if (rateCodeKey.toLowerCase().includes('gb') || rateCodeKey.toLowerCase().includes('data')) {
    return 'USD per GB';
  } else if (rateCodeKey.toLowerCase().includes('request')) {
    return 'USD per 10,000 requests';
  }
  return 'USD per unit';
}

export function transformCloudFrontPricing(data: AWSCloudFrontPricingData): PricingEntry[] {
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

      const attributes = extractCloudFrontAttributes(rateCodeKey);
      const unit = determineUnit(rateCodeKey);

      // Only add entries that have meaningful attributes
      if (attributes.feature || attributes.usageType) {
        entries.push({
          serviceId: 'cloudfront',
          region: regionCode,
          attributes: {
            ...(attributes.feature && { feature: attributes.feature }),
            ...(attributes.usageType && { usageType: attributes.usageType }),
            ...(attributes.dataTransferClass && { dataTransferClass: attributes.dataTransferClass }),
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
let cloudfrontPricingData: PricingEntry[] = [];

try {
  cloudfrontPricingData = require('./cloudfront-transformed.json') as PricingEntry[];
} catch (error) {
  try {
    const rawData = require('./cloudfront.json') as AWSCloudFrontPricingData;
    cloudfrontPricingData = transformCloudFrontPricing(rawData);
    console.warn('CloudFront pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    console.warn('CloudFront pricing data not found. Run fetch:pricing first.');
  }
}

export const cloudfrontPricing = cloudfrontPricingData;

