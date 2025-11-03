# Implementation Tasks

## 1. Research and Validate AWS Services with Pricing API

- [ ] 1.1 Identify AWS services with pricing API support at `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
- [ ] 1.2 Test API endpoints for common services (S3, RDS, Lambda, CloudFront, Translate, API Gateway, etc.)
- [ ] 1.3 Validate which services return valid pricing data structure (manifest, sets, regions)
- [ ] 1.4 Document services that have pricing data vs. services that don't
- [ ] 1.5 Prioritize services based on popularity and user needs

## 2. Update Data Sources Configuration

- [ ] 2.1 Create or update `lib/config/data-sources.ts` with pricing sources for new services
- [ ] 2.2 Add DataSourceConfig entries for each validated service (S3, RDS, Lambda, etc.)
- [ ] 2.3 Configure URL pattern: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
- [ ] 2.4 Add validation functions for each service's pricing structure
- [ ] 2.5 Ensure transform functions are referenced (actual transforms in separate modules)

## 3. Create Transform Modules for New Services

- [ ] 3.1 Create `lib/data/pricing/s3.ts` with `transformS3Pricing()` function
- [ ] 3.2 Create `lib/data/pricing/rds.ts` with `transformRDSPricing()` function
- [ ] 3.3 Create `lib/data/pricing/lambda.ts` with `transformLambdaPricing()` function
- [ ] 3.4 Create `lib/data/pricing/cloudfront.ts` with `transformCloudFrontPricing()` function
- [ ] 3.5 Create transform modules for additional validated services (Translate, API Gateway, etc.)
- [ ] 3.6 Each transform module should:
  - Parse AWS pricing API format (regions, rateCodes)
  - Extract service-specific attributes (storage class, instance type, request type, etc.)
  - Map to internal `PricingEntry[]` format
  - Handle edge cases and invalid data

## 4. Update Pricing Index and Registry

- [ ] 4.1 Update `lib/data/pricing/index.ts` to import new transform modules
- [ ] 4.2 Add new services to pricing registry
- [ ] 4.3 Update `getPricingByServiceId()` to return pricing for new services
- [ ] 4.4 Ensure pre-transformed data loading works for new services

## 5. Update Transform Script

- [ ] 5.1 Update `scripts/transform-pricing.ts` to include transforms for new services
- [ ] 5.2 Add transform logic for S3, RDS, Lambda, CloudFront, etc.
- [ ] 5.3 Ensure all new services generate `*-transformed.json` files
- [ ] 5.4 Test transform script generates transformed files for all services

## 6. Update Service Display Components

- [ ] 6.1 Update `app/components/PricingTable.tsx` to handle new service types
- [ ] 6.2 Add column configurations for S3 (storage class, request type, etc.)
- [ ] 6.3 Add column configurations for RDS (instance type, engine, etc.)
- [ ] 6.4 Add column configurations for Lambda (memory, requests, etc.)
- [ ] 6.5 Add column configurations for CloudFront and other services
- [ ] 6.6 Ensure ServiceFilters component works with new service types

## 7. Update Services Catalog (if needed)

- [ ] 7.1 Review `lib/data/services.ts` to ensure all new services with pricing are listed
- [ ] 7.2 Add any missing services to the catalog with proper categories
- [ ] 7.3 Ensure service IDs match pricing data source IDs
- [ ] 7.4 Verify service detail pages work for all new services

## 8. Testing and Validation

- [ ] 8.1 Test `fetch:pricing` successfully fetches all new services
- [ ] 8.2 Test `transform:pricing` successfully transforms all new services
- [ ] 8.3 Verify pricing data displays correctly in UI for each new service
- [ ] 8.4 Test error handling when a service's API endpoint is unavailable
- [ ] 8.5 Validate that prebuild hook includes all new services
- [ ] 8.6 Test that services without pricing data gracefully handle missing pricing

## 9. Documentation

- [ ] 9.1 Update README.md with list of supported services
- [ ] 9.2 Document how to add new services in the future
- [ ] 9.3 Add comments in code explaining service-specific transform logic
