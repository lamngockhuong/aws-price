import type { AWSService } from '../types';

export const services: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    description: 'Elastic Compute Cloud - Virtual servers in the cloud',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    description: 'Serverless compute service',
  },
  {
    id: 'ecs',
    name: 'Amazon ECS',
    category: 'Compute',
    description: 'Elastic Container Service - Fully managed container orchestration',
  },
  {
    id: 'eks',
    name: 'Amazon EKS',
    category: 'Compute',
    description: 'Elastic Kubernetes Service - Managed Kubernetes service',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    description: 'Simple Storage Service - Object storage built to store and retrieve any amount of data',
  },
  {
    id: 'redshift',
    name: 'Amazon Redshift',
    category: 'Database',
    description: 'Fully managed data warehouse service',
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    category: 'Database',
    description: 'NoSQL database service - Fast and flexible',
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Database',
    description: 'Relational Database Service - Managed database service',
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Networking',
    description: 'Virtual Private Cloud - Isolated cloud resources',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Networking',
    description: 'Content delivery network',
  },
  {
    id: 'apigateway',
    name: 'Amazon API Gateway',
    category: 'Networking',
    description: 'Fully managed API management service',
  },
  {
    id: 'translate',
    name: 'Amazon Translate',
    category: 'Other',
    description: 'Neural machine translation service',
  },
  {
    id: 'sns',
    name: 'Amazon SNS',
    category: 'Other',
    description: 'Simple Notification Service - Pub/sub messaging service',
  },
  {
    id: 'natgateway',
    name: 'NAT Gateway',
    category: 'Networking',
    description: 'Network Address Translation Gateway - Managed NAT service',
  },
];

export function getServicesByCategory(category: string): AWSService[] {
  return services.filter((service) => service.category === category);
}

export function getServiceById(id: string): AWSService | undefined {
  return services.find((service) => service.id === id);
}

export function searchServices(query: string): AWSService[] {
  const lowerQuery = query.toLowerCase();
  return services.filter(
    (service) =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.id.toLowerCase().includes(lowerQuery) ||
      service.description.toLowerCase().includes(lowerQuery)
  );
}

