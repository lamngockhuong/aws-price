## MODIFIED Requirements

### Requirement: Service Detail Page

The system SHALL provide individual service detail pages at `/services/[serviceName]` that display pricing information in a table format. Pricing data SHALL be loaded from offline JSON files stored in `lib/data/pricing/` directory, with one file per service (e.g., `ec2.json`, `natgateway.json`).

#### Scenario: View EC2 pricing

- **WHEN** user navigates to `/services/ec2`
- **THEN** they see a table with columns: Instance Type, vCPU, Memory, Price/hour, Price/month, Region
- **AND** the table displays pricing data loaded from `lib/data/pricing/ec2.json`
- **AND** pricing data is transformed from AWS API format to internal `PricingEntry[]` format
- **AND** table columns are sortable

#### Scenario: View S3 pricing

- **WHEN** user navigates to `/services/s3`
- **THEN** they see a table with columns: Storage Tier, Price/GB, Request Type, Price/1000 requests, Region
- **AND** the table displays pricing data loaded from `lib/data/pricing/s3.json`
- **AND** pricing data is transformed from AWS API format to internal format
- **AND** table columns are sortable

#### Scenario: View VPC pricing

- **WHEN** user navigates to `/services/vpc`
- **THEN** they see a table with VPC-related pricing information
- **AND** the table displays pricing data loaded from `lib/data/pricing/vpc.json`
- **AND** the table displays relevant pricing metrics for VPC services

#### Scenario: Load pricing from per-service files

- **WHEN** a service detail page loads pricing data
- **THEN** it uses `getPricingByServiceId()` function from `lib/data/pricing/index.ts`
- **AND** the function dynamically loads from the appropriate service file in `lib/data/pricing/`
- **AND** data is transformed from raw JSON to `PricingEntry[]` format
- **AND** the page displays an error message if pricing data is unavailable
