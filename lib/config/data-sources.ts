import type { DataSourceConfig } from '../scripts/common/types';

// Locations data source
export const locationsSource: DataSourceConfig = {
  id: 'aws-locations',
  name: 'AWS Locations',
  url: 'https://b0.p.awsstatic.com/locations/1.0/aws/current/locations.json',
  type: 'locations',
  transform: (data: any) => {
    // Transform if needed, otherwise return as-is
    return data;
  },
  validate: (data: any) => {
    return typeof data === 'object' && data !== null;
  }
};

// Pricing data sources - one per service
export const pricingSources: DataSourceConfig[] = [
  {
    id: 'ec2-pricing',
    name: 'EC2 Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/ec2.json',
    type: 'pricing',
    transform: (data: any) => {
      // Raw data is preserved, transform happens in ec2.ts module
      return data;
    },
    validate: (data: any) => {
      // Validate AWS pricing API structure
      return (
        typeof data === 'object' &&
        data !== null &&
        'manifest' in data &&
        'regions' in data
      );
    }
  },
  {
    id: 'natgateway-pricing',
    name: 'NAT Gateway Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/natgateway.json',
    type: 'pricing',
    transform: (data: any) => {
      // Raw data is preserved, transform happens in natgateway.ts module
      return data;
    },
    validate: (data: any) => {
      // Validate AWS pricing API structure
      return (
        typeof data === 'object' &&
        data !== null &&
        'manifest' in data &&
        'regions' in data
      );
    }
  }
];

export function getPricingSource(serviceId: string): DataSourceConfig | undefined {
  return pricingSources.find(source => source.id === `${serviceId}-pricing`);
}

export function getAllPricingSources(): DataSourceConfig[] {
  return pricingSources;
}

