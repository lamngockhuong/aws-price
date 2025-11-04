export type ServiceCategory =
  | 'Compute'
  | 'Networking'
  | 'Storage'
  | 'Database'
  | 'Security'
  | 'Analytics'
  | 'ML/AI'
  | 'Media'
  | 'Management'
  | 'Migration'
  | 'DevTools'
  | 'IoT'
  | 'End-User Computing'
  | 'Other';

export interface AWSService {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  icon?: string;
  pricingAvailable?: boolean;
}

export interface PricingEntry {
  serviceId: string;
  region: string;
  attributes: Record<string, string>;
  pricePerUnit: string;
  unit: string;
  effectiveDate?: Date;
}

export interface EC2PricingAttributes {
  instanceType: string;
  vcpu: number;
  memory: string;
  operatingSystem: string;
}

export interface S3PricingAttributes {
  storageClass: string;
  requestType?: string;
}

export interface VPCPricingAttributes {
  feature: string;
  usageType?: string;
}

