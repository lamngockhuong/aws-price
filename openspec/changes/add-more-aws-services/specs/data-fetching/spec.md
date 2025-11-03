## MODIFIED Requirements

### Requirement: Fetch AWS Pricing Data Per Service

The system SHALL fetch pricing data for multiple AWS services from their respective API endpoints, supporting EC2, NAT Gateway, S3, RDS, Lambda, CloudFront, Translate, API Gateway, and other services that have valid pricing APIs.

#### Scenario: Fetch multiple services including new ones

- **WHEN** the `fetch:pricing` script is executed
- **THEN** it fetches pricing data for all configured services (EC2, NAT Gateway, S3, RDS, Lambda, CloudFront, etc.)
- **AND** uses the API pattern: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
- **AND** saves raw data to `lib/data/pricing/{service}.json` for each service
- **AND** validates that each service's API returns valid pricing structure (manifest, sets, regions)
- **AND** continues fetching other services even if one fails
- **AND** logs which services succeeded and which failed

#### Scenario: Validate service API before adding

- **WHEN** adding a new service to the configuration
- **THEN** the service's pricing API endpoint must return valid data
- **AND** the response must contain expected structure (manifest, sets, regions)
- **AND** only services with valid APIs are added to the configuration

### Requirement: Transform AWS Pricing Format

The system SHALL transform raw AWS pricing API format to the internal `PricingEntry[]` format for all supported services.

#### Scenario: Transform S3 pricing

- **WHEN** S3 pricing data is fetched and saved
- **THEN** a TypeScript transform module (`lib/data/pricing/s3.ts`) converts raw JSON to `PricingEntry[]`
- **AND** extracts storage classes, request types, regions, and prices correctly
- **AND** maps AWS rate codes to readable attributes (Standard, Standard-IA, Glacier, etc.)
- **AND** handles different pricing dimensions (storage vs. requests)

#### Scenario: Transform RDS pricing

- **WHEN** RDS pricing data is fetched and saved
- **THEN** a TypeScript transform module (`lib/data/pricing/rds.ts`) converts raw JSON to `PricingEntry[]`
- **AND** extracts instance types, database engines, regions, and prices correctly
- **AND** maps AWS rate codes to readable attributes (MySQL, PostgreSQL, MariaDB, etc.)
- **AND** handles multi-AZ options and storage pricing

#### Scenario: Transform Lambda pricing

- **WHEN** Lambda pricing data is fetched and saved
- **THEN** a TypeScript transform module (`lib/data/pricing/lambda.ts`) converts raw JSON to `PricingEntry[]`
- **AND** extracts memory sizes, request types, compute durations, regions, and prices correctly
- **AND** maps AWS rate codes to readable attributes
- **AND** handles different pricing dimensions (requests vs. compute)

#### Scenario: Transform CloudFront pricing

- **WHEN** CloudFront pricing data is fetched and saved
- **THEN** a TypeScript transform module (`lib/data/pricing/cloudfront.ts`) converts raw JSON to `PricingEntry[]`
- **AND** extracts data transfer classes, request types, regions, and prices correctly
- **AND** maps AWS rate codes to readable attributes

#### Scenario: Transform additional services

- **WHEN** pricing data for additional services (Translate, API Gateway, etc.) is fetched
- **THEN** each service has its own transform module that converts raw JSON to `PricingEntry[]`
- **AND** extracts service-specific attributes correctly
- **AND** maps AWS rate codes to human-readable attributes

### Requirement: Data Source Configuration

The system SHALL define all pricing data sources in a centralized configuration file, supporting multiple AWS services.

#### Scenario: Configure pricing sources for multiple services

- **WHEN** defining pricing data sources
- **THEN** each service (EC2, S3, RDS, Lambda, CloudFront, etc.) has its configuration in `lib/config/data-sources.ts`
- **AND** URL pattern follows: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
- **AND** each includes URL, transform function reference, and validation function
- **AND** new services can be added by adding configuration and transform module
- **AND** only services with valid pricing APIs are configured

