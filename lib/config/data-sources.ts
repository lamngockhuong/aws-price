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
// Validated services with pricing API support:
// s3, lambda, cloudfront, translate, apigateway, ecs, eks, redshift, dynamodb, sns
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
  },
  {
    id: 's3-pricing',
    name: 'S3 Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/s3/USD/current/s3.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'lambda-pricing',
    name: 'Lambda Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/lambda/USD/current/lambda.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'cloudfront-pricing',
    name: 'CloudFront Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/cloudfront/USD/current/cloudfront.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'translate-pricing',
    name: 'Translate Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/translate/USD/current/translate.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'apigateway-pricing',
    name: 'API Gateway Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/apigateway/USD/current/apigateway.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'ecs-pricing',
    name: 'ECS Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ecs/USD/current/ecs.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'eks-pricing',
    name: 'EKS Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/eks/USD/current/eks.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'redshift-pricing',
    name: 'Redshift Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/redshift/USD/current/redshift.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'dynamodb-pricing',
    name: 'DynamoDB Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/dynamodb/USD/current/dynamodb.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  },
  {
    id: 'sns-pricing',
    name: 'SNS Pricing',
    url: 'https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/sns/USD/current/sns.json',
    type: 'pricing',
    transform: (data: any) => data,
    validate: (data: any) => (
      typeof data === 'object' &&
      data !== null &&
      'manifest' in data &&
      'regions' in data
    )
  }
];

export function getPricingSource(serviceId: string): DataSourceConfig | undefined {
  return pricingSources.find(source => source.id === `${serviceId}-pricing`);
}

export function getAllPricingSources(): DataSourceConfig[] {
  return pricingSources;
}

