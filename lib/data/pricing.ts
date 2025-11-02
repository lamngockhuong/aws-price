import type { PricingEntry, EC2PricingAttributes, S3PricingAttributes, VPCPricingAttributes } from '../types';

export const ec2Pricing: PricingEntry[] = [
  {
    serviceId: 'ec2',
    region: 'us-east-1',
    attributes: {
      instanceType: 't3.micro',
      vcpu: '2',
      memory: '1 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.0104',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'us-east-1',
    attributes: {
      instanceType: 't3.small',
      vcpu: '2',
      memory: '2 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.0208',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'us-east-1',
    attributes: {
      instanceType: 't3.medium',
      vcpu: '2',
      memory: '4 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.0416',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'us-west-2',
    attributes: {
      instanceType: 't3.micro',
      vcpu: '2',
      memory: '1 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.0104',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'ap-southeast-1',
    attributes: {
      instanceType: 't3.micro',
      vcpu: '2',
      memory: '1 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.0117',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'us-east-1',
    attributes: {
      instanceType: 'm5.large',
      vcpu: '2',
      memory: '8 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.096',
    unit: 'USD per hour',
  },
  {
    serviceId: 'ec2',
    region: 'us-east-1',
    attributes: {
      instanceType: 'm5.xlarge',
      vcpu: '4',
      memory: '16 GB',
      operatingSystem: 'Linux',
    },
    pricePerUnit: '0.192',
    unit: 'USD per hour',
  },
];

export const s3Pricing: PricingEntry[] = [
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.023',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'GET',
    },
    pricePerUnit: '0.0004',
    unit: 'USD per 1000 requests',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard-IA',
      requestType: 'PUT',
    },
    pricePerUnit: '0.0125',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'us-east-1',
    attributes: {
      storageClass: 'Standard-IA',
      requestType: 'GET',
    },
    pricePerUnit: '0.001',
    unit: 'USD per 1000 requests',
  },
  {
    serviceId: 's3',
    region: 'us-west-2',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.023',
    unit: 'USD per GB',
  },
  {
    serviceId: 's3',
    region: 'ap-southeast-1',
    attributes: {
      storageClass: 'Standard',
      requestType: 'PUT',
    },
    pricePerUnit: '0.025',
    unit: 'USD per GB',
  },
];

export const vpcPricing: PricingEntry[] = [
  {
    serviceId: 'vpc',
    region: 'us-east-1',
    attributes: {
      feature: 'VPC Endpoint',
      usageType: 'Gateway',
    },
    pricePerUnit: '0.01',
    unit: 'USD per hour',
  },
  {
    serviceId: 'vpc',
    region: 'us-east-1',
    attributes: {
      feature: 'NAT Gateway',
      usageType: 'Data Processing',
    },
    pricePerUnit: '0.045',
    unit: 'USD per GB',
  },
  {
    serviceId: 'vpc',
    region: 'us-west-2',
    attributes: {
      feature: 'VPC Endpoint',
      usageType: 'Gateway',
    },
    pricePerUnit: '0.01',
    unit: 'USD per hour',
  },
];

export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  switch (serviceId) {
    case 'ec2':
      return ec2Pricing;
    case 's3':
      return s3Pricing;
    case 'vpc':
      return vpcPricing;
    default:
      return [];
  }
}

export function filterPricingByRegion(pricing: PricingEntry[], region?: string): PricingEntry[] {
  if (!region) return pricing;
  return pricing.filter((entry) => entry.region === region);
}

export function getUniqueRegions(pricing: PricingEntry[]): string[] {
  const regions = pricing.map((entry) => entry.region);
  return Array.from(new Set(regions)).sort();
}

