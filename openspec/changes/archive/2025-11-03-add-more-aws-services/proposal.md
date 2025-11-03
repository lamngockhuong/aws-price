# Add More AWS Services with Pricing Support

## Why

The current system only supports EC2 and NAT Gateway pricing data. Many other AWS services (S3, RDS, Lambda, CloudFront, etc.) are listed in the services catalog but lack pricing data. Users need to view and compare pricing for more AWS services to make informed decisions. We need to extend the system to support additional AWS services that have pricing data available through the AWS pricing API pattern: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`.

## What Changes

- Add configuration for additional AWS services with pricing API support
- Create transform modules for new services (S3, RDS, Lambda, CloudFront, Translate, API Gateway, etc.)
- Update data sources configuration to include new services
- Ensure only services with valid pricing API endpoints are added (validate API availability)
- Update service list to prioritize services with pricing data
- Add transform logic for each new service type's specific pricing structure
- Update prebuild and transform scripts to handle new services
- Ensure backward compatibility with existing services (EC2, NAT Gateway)

**Note:** Only services with valid pricing data through the specified API pattern will be added. Services without pricing API support will remain in the catalog but without pricing display.

## Impact

- **Affected specs:**

  - `data-fetching`: Extended to support fetching pricing for additional services
  - `service-display`: Updated to display pricing for more services

- **Affected code:**
  - `lib/config/data-sources.ts`: Add configurations for new services
  - `lib/data/pricing/`: Add transform modules for new services (s3.ts, rds.ts, lambda.ts, etc.)
  - `lib/data/pricing/index.ts`: Register new services
  - `lib/data/services.ts`: May need updates if adding new services to catalog
  - `scripts/fetch-pricing.ts`: Will automatically fetch new services
  - `scripts/transform-pricing.ts`: Will transform new services
  - `app/components/PricingTable.tsx`: May need column configurations for new service types
