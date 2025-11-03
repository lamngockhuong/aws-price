# Add Offline Data Fetching System

## Why

The application currently uses hardcoded pricing and location data, which limits scalability and maintainability. AWS provides official APIs for locations and pricing data that update regularly. To improve performance, reduce runtime dependencies, and enable offline functionality, we need a system to fetch this data during build time and store it locally. This allows the application to work offline, load faster, and be version-controlled.

## What Changes

- **ADDED**: Common data fetching utilities with retry logic and error handling (`lib/scripts/common/fetcher.ts`, `processor.ts`, `types.ts`)
- **ADDED**: Configuration system for data sources in `lib/config/data-sources.ts` (locations and pricing services)
- **ADDED**: Scripts to fetch AWS locations and pricing data from official APIs:
  - `scripts/fetch-locations.ts` - Fetch locations from `https://b0.p.awsstatic.com/locations/1.0/aws/current/locations.json`
  - `scripts/fetch-pricing.ts` - Fetch all pricing services in parallel from `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
- **ADDED**: Data transformation logic to convert AWS API format to internal `PricingEntry[]` format
- **ADDED**: Per-service pricing file structure:
  - Raw JSON files: `lib/data/pricing/ec2.json`, `lib/data/pricing/natgateway.json`, etc.
  - Transform modules: `lib/data/pricing/ec2.ts`, `lib/data/pricing/natgateway.ts`
  - Index file: `lib/data/pricing/index.ts` for unified access
- **ADDED**: Type-safe accessors for locations data (`lib/data/locations.ts`) with helper functions
- **MODIFIED**: Pricing data structure from single consolidated file to per-service files
- **MODIFIED**: `getPricingByServiceId()` to dynamically load from per-service files via `lib/data/pricing/index.ts`

## Impact

- Affected specs:
  - New capability: `data-fetching` (offline data fetching and storage)
  - Modified capability: `service-display` (update to use new data source structure)
- Affected code:
  - New: `lib/scripts/common/` - Common fetch utilities
  - New: `lib/config/data-sources.ts` - Data source configuration
  - New: `lib/data/pricing/` - Per-service pricing files
  - New: `scripts/fetch-locations.ts`, `scripts/fetch-pricing.ts`
  - Modified: `lib/data/pricing.ts` - Update to use new structure
  - Modified: `package.json` - Add fetch scripts and `prebuild` hook

