import type { PricingEntry } from '../../types';

interface AWSGenericPricingData {
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

function extractGenericAttributes(rateCodeKey: string): Record<string, string> {
  const attributes: Record<string, string> = {};

  // Extract common patterns
  if (rateCodeKey.toLowerCase().includes('request')) {
    attributes.usageType = 'Request';
  } else if (rateCodeKey.toLowerCase().includes('storage')) {
    attributes.usageType = 'Storage';
  } else if (rateCodeKey.toLowerCase().includes('compute') || rateCodeKey.toLowerCase().includes('hour')) {
    attributes.usageType = 'Compute';
  } else if (rateCodeKey.toLowerCase().includes('data') || rateCodeKey.toLowerCase().includes('transfer')) {
    attributes.usageType = 'Data Transfer';
  }

  // Extract feature if present
  const featureMatch = rateCodeKey.match(/([A-Z][a-z]+(?:-[A-Z][a-z]+)*)/);
  if (featureMatch && featureMatch[1].length > 3) {
    attributes.feature = featureMatch[1];
  }

  return attributes;
}

function determineUnit(rateCodeKey: string): string {
  if (rateCodeKey.toLowerCase().includes('gb')) {
    return 'USD per GB';
  } else if (rateCodeKey.toLowerCase().includes('tb')) {
    return 'USD per TB';
  } else if (rateCodeKey.toLowerCase().includes('request')) {
    return 'USD per 1M requests';
  } else if (rateCodeKey.toLowerCase().includes('hour')) {
    return 'USD per hour';
  }
  return 'USD per unit';
}

export function createGenericTransform(serviceId: string) {
  return function transformGenericPricing(data: AWSGenericPricingData): PricingEntry[] {
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

        const attributes = extractGenericAttributes(rateCodeKey);
        const unit = determineUnit(rateCodeKey);

        // Add entry if we have at least one attribute
        if (Object.keys(attributes).length > 0) {
          entries.push({
            serviceId,
            region: regionCode,
            attributes,
            pricePerUnit: rateData.price || '0',
            unit,
          });
        }
      });
    });

    return entries;
  };
}

