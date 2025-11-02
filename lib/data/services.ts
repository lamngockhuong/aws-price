import type { AWSService } from '../types';

export const services: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    description: 'Elastic Compute Cloud - Virtual servers in the cloud',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    description: 'Simple Storage Service - Object storage built to store and retrieve any amount of data',
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Networking',
    description: 'Virtual Private Cloud - Isolated cloud resources',
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    category: 'Database',
    description: 'Relational Database Service - Managed database service',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    description: 'Serverless compute service',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    category: 'Networking',
    description: 'Content delivery network',
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

