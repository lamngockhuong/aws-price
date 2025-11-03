# Design: Offline Data Fetching System

## Context

AWS provides official APIs for locations and pricing data:
- Locations: `https://b0.p.awsstatic.com/locations/1.0/aws/current/locations.json`
- Pricing Pattern: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
  - EC2: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/ec2.json`
  - NAT Gateway: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/natgateway.json`

The AWS pricing API format is complex with nested structures:
- Top level: `{ manifest, sets, regions }`
- Regions: Object keys are region names, values contain rate codes
- Rate codes: Unique identifiers mapping to prices
- Prices: Stored as strings with decimal precision

This requires transformation to our internal `PricingEntry[]` format with fields: `serviceId`, `region`, `attributes`, `pricePerUnit`, `unit`. Data updates regularly, so we need a reliable fetching system that can run during build time.

## Goals

- Fetch AWS data offline during build time
- Store data in version-controlled files
- Transform AWS API format to internal format
- Support multiple services with different data structures
- Enable offline functionality (no runtime API calls)
- Improve performance (local file access faster than HTTP)

## Non-Goals

- Real-time pricing updates (data is fetched at build time only)
- Multi-currency support initially (USD only)
- Historical pricing data tracking

## Decisions

### Decision: Per-Service Pricing Files

**What**: Store pricing data in separate JSON files per service (`ec2.json`, `natgateway.json`, etc.)

**Why**:
- Scales better as we add more services
- Easier to update individual services
- Better for version control (smaller, focused diffs)
- Enables code splitting and lazy loading

**Alternatives considered**:
- Single consolidated file: Rejected - becomes unwieldy with many services
- Single TypeScript file: Rejected - no separation between raw data and transforms

### Decision: JSON for Raw Data, TypeScript for Transforms

**What**: Store raw API responses as JSON, create TypeScript modules for transforms

**Why**:
- JSON preserves original data integrity
- TypeScript modules provide type safety and validation
- Separation of concerns: raw data vs. processed data
- Easier to debug data issues

**Alternatives considered**:
- TypeScript only: Rejected - harder to inspect raw API responses
- JSON only: Rejected - loses type safety benefits

### Decision: Common Utilities Pattern

**What**: Create reusable fetch utilities (`fetcher.ts`, `processor.ts`) used by all data sources

**Why**:
- DRY principle - avoid duplicating retry logic, error handling
- Consistent behavior across all data fetches
- Easier to maintain and test
- Centralized configuration (timeouts, retries)

**Alternatives considered**:
- Per-script utilities: Rejected - code duplication
- External library: Rejected - simple enough to implement, full control

### Decision: Configuration-Driven Approach

**What**: Define all data sources in `lib/config/data-sources.ts` with transform/validate functions

**Why**:
- Easy to add new services (just add config)
- Centralized URL management
- Enables parallel fetching with same code
- Transform functions colocated with source definition

**Alternatives considered**:
- Hardcoded URLs in scripts: Rejected - harder to maintain
- External config file: Rejected - TypeScript provides better tooling

### Decision: Prebuild Hook

**What**: Automatically run `fetch:all` before `next build`

**Why**:
- Ensures data is always fresh before deployment
- Reduces manual steps
- Prevents stale data issues

**Alternatives considered**:
- Manual fetch only: Rejected - too easy to forget
- CI/CD only: Rejected - developers need local data too

## Risks / Trade-offs

- **Risk**: AWS API changes format → Mitigation: Validate data structure, fail gracefully
- **Risk**: Large pricing files slow build → Mitigation: Per-service files enable incremental updates
- **Risk**: API rate limiting → Mitigation: Implement retry with backoff, fetch in parallel carefully
- **Trade-off**: Build time vs. runtime fetching → Chosen build time for performance and offline support
- **Trade-off**: Data freshness vs. stability → Accept that data is only as fresh as last build

## Migration Plan

1. Create new structure alongside existing code
2. Update `lib/data/pricing.ts` to use new structure
3. Test with existing components
4. Remove old hardcoded data after validation
5. Update documentation

## Transform Logic Details

### EC2 Pricing Transform
1. Parse `regions` object from raw JSON
2. For each region, iterate through rate code entries
3. Extract instance type from rate code key (e.g., "OnDemand Linux-instancetype-t3.medium")
4. Map rate codes to instance attributes (instanceType, vcpu, memory, operatingSystem)
5. Create `PricingEntry[]` with region, attributes, price, unit ("USD per hour")

### NAT Gateway Pricing Transform
1. Parse `regions` object from raw JSON
2. Extract NAT Gateway specific rate codes
3. Map rate codes to NAT Gateway attributes (feature, usageType)
4. Determine unit based on rate code type (hourly vs. per GB)
5. Create `PricingEntry[]` with appropriate attributes

### General Transform Pattern
- Identify service-specific rate code patterns
- Map rate codes to human-readable attributes
- Extract price and unit information
- Group by region for easier filtering

## Open Questions

- Should we implement caching to avoid re-fetching unchanged data?
- Do we need to support partial updates (update one service without fetching all)?
- Should fetch failures block the build or just warn?

