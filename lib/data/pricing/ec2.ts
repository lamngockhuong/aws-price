import type { PricingEntry } from '../../types';

interface AWSEC2PricingData {
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

// Instance specs mapping (simplified - in production, this could be fetched from AWS API or computed)
const instanceSpecs: Record<string, { vcpu: string; memory: string }> = {
  't3.micro': { vcpu: '2', memory: '1 GB' },
  't3.small': { vcpu: '2', memory: '2 GB' },
  't3.medium': { vcpu: '2', memory: '4 GB' },
  't3.large': { vcpu: '2', memory: '8 GB' },
  't3.xlarge': { vcpu: '4', memory: '16 GB' },
  't3.2xlarge': { vcpu: '8', memory: '32 GB' },
  'm5.large': { vcpu: '2', memory: '8 GB' },
  'm5.xlarge': { vcpu: '4', memory: '16 GB' },
  'm5.2xlarge': { vcpu: '8', memory: '32 GB' },
  'm5.4xlarge': { vcpu: '16', memory: '64 GB' },
  // Add more as needed
};

function extractInstanceType(rateCodeKey: string): string | null {
  // Pattern: "OnDemand Linux-instancetype-t3.medium"
  const match = rateCodeKey.match(/instancetype-([a-z0-9.]+)$/i);
  return match ? match[1] : null;
}

function parseRegionName(regionKey: string): string {
  // Map display names to region codes (simplified)
  // In production, use locations.json to map properly
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

  // Try exact match first
  if (regionMap[regionKey]) {
    return regionMap[regionKey];
  }

  // Try partial match for region codes
  const regionCodeMatch = regionKey.match(/^([a-z]{2}-[a-z]+-\d+)/i);
  if (regionCodeMatch) {
    return regionCodeMatch[1].toLowerCase();
  }

  // Fallback: convert to lowercase slug
  return regionKey.toLowerCase().replace(/\s+/g, '-');
}

// Export transform function for use in transform script
export function transformEC2Pricing(data: AWSEC2PricingData): PricingEntry[] {
  const entries: PricingEntry[] = [];

  if (!data.regions) {
    return entries;
  }

  Object.entries(data.regions).forEach(([regionName, rateCodes]) => {
    const regionCode = parseRegionName(regionName);

    Object.entries(rateCodes).forEach(([rateCodeKey, rateData]) => {
      // Skip non-instance entries (e.g., hash keys)
      if (!rateCodeKey.includes('instancetype')) {
        return;
      }

      const instanceType = extractInstanceType(rateCodeKey);
      if (!instanceType) {
        return;
      }

      // Extract OS from rate code
      const operatingSystem = rateCodeKey.includes('Windows') ? 'Windows' : 'Linux';

      // Get instance specs
      const specs = instanceSpecs[instanceType] || { vcpu: 'N/A', memory: 'N/A' };

      entries.push({
        serviceId: 'ec2',
        region: regionCode,
        attributes: {
          instanceType,
          vcpu: specs.vcpu,
          memory: specs.memory,
          operatingSystem,
        },
        pricePerUnit: rateData.price || '0',
        unit: 'USD per hour',
      });
    });
  });

  return entries;
}

// Default export: load from pre-transformed JSON (much faster)
let ec2PricingData: PricingEntry[] = [];

try {
  // Try to load pre-transformed data first (much faster)
  ec2PricingData = require('./ec2-transformed.json') as PricingEntry[];
} catch (error) {
  // Fallback: transform on-the-fly if transformed file doesn't exist
  try {
    const rawData = require('./ec2.json') as AWSEC2PricingData;
    ec2PricingData = transformEC2Pricing(rawData);
    console.warn('EC2 pricing: Using on-the-fly transform. Run pnpm transform:pricing to pre-transform.');
  } catch (transformError) {
    // File doesn't exist yet or error loading
    console.warn('EC2 pricing data not found. Run fetch:pricing first.');
  }
}

export const ec2Pricing = ec2PricingData;

