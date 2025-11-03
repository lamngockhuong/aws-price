# Design: Add More AWS Services with Pricing Support

## Context

The current system supports pricing for EC2 and NAT Gateway through AWS pricing APIs. Users need pricing information for additional AWS services (S3, RDS, Lambda, CloudFront, etc.) to make informed decisions. The system must be extensible to add new services easily while maintaining performance and reliability.

**Constraints:**
- Only services with valid pricing API at `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json` can be added
- Must maintain backward compatibility with existing services
- Transform logic varies by service type (each has different rate code patterns)
- Must validate API availability before adding services
- Performance: Pre-transform approach must work for all services

## Goals / Non-Goals

### Goals
- Add pricing support for major AWS services (S3, RDS, Lambda, CloudFront, Translate, API Gateway)
- Ensure only services with valid pricing APIs are added
- Maintain consistent transform pattern across services
- Keep existing services (EC2, NAT Gateway) working
- Make it easy to add new services in the future

### Non-Goals
- Adding services without pricing API support
- Supporting services with different API patterns (different URL structure)
- Real-time pricing fetching (offline-first approach)
- Supporting historical pricing data
- Supporting multiple currencies (USD only)

## Decisions

### Decision: Validate API Availability Before Adding Services
**What:** Before adding a service to the configuration, validate that the pricing API endpoint returns valid data.

**Why:** Prevents adding services that don't have pricing data, which would cause runtime errors and poor UX.

**Alternatives considered:**
- Add all services and handle errors gracefully → Too many failed requests, noisy logs
- Manual testing only → Error-prone, doesn't scale

**Trade-offs:**
- Requires initial validation step (one-time cost)
- Services added to config are guaranteed to have pricing data

### Decision: Service-Specific Transform Modules
**What:** Each service gets its own transform module (`s3.ts`, `rds.ts`, etc.) with service-specific parsing logic.

**Why:** Each AWS service has different rate code patterns and pricing structures. Keeping transforms separate improves maintainability and allows service-specific optimizations.

**Alternatives considered:**
- Single generic transform function → Too complex, hard to maintain
- Configuration-based transforms → Less flexible, harder to debug

**Trade-offs:**
- More files to manage
- Better separation of concerns and easier to maintain

### Decision: Reuse Existing Pre-Transform Approach
**What:** New services use the same pre-transform pattern (raw JSON → transformed JSON) for performance.

**Why:** Already proven effective for EC2 (reduced from 8.2MB to 3.2MB and faster loading). Consistency across services.

**Alternatives considered:**
- Transform on-the-fly → Too slow for large datasets
- Different approach per service → Inconsistent, harder to maintain

**Trade-offs:**
- Requires running `transform:pricing` for new services
- Better performance, consistent approach

### Decision: Update Column Configurations Per Service Type
**What:** `PricingTable` component has service-specific column configurations (EC2 shows instance types, S3 shows storage classes, etc.).

**Why:** Each service has different pricing dimensions that are meaningful to users. Generic columns would be confusing.

**Alternatives considered:**
- Generic columns for all services → Less useful, harder to understand
- Dynamic columns based on data → Too complex, inconsistent UX

**Trade-offs:**
- More configuration code
- Better UX, more relevant information displayed

## Architecture

```
lib/
├── config/
│   └── data-sources.ts          # All service configurations (EC2, S3, RDS, etc.)
├── data/
│   └── pricing/
│       ├── ec2.ts               # Existing
│       ├── natgateway.ts        # Existing
│       ├── s3.ts                # New: S3 transform
│       ├── rds.ts               # New: RDS transform
│       ├── lambda.ts            # New: Lambda transform
│       ├── cloudfront.ts        # New: CloudFront transform
│       ├── translate.ts         # New: Translate transform
│       ├── apigateway.ts        # New: API Gateway transform
│       └── index.ts             # Registry of all services
└── scripts/
    ├── fetch-pricing.ts         # Fetches all configured services
    └── transform-pricing.ts    # Transforms all services
```

## Service-Specific Transform Patterns

### S3
- Rate codes include: storage class (Standard, Standard-IA, Glacier, etc.)
- Attributes: storage class, request type (PUT, GET, DELETE, etc.)
- Unit: USD per GB (storage) or USD per 1000 requests (requests)

### RDS
- Rate codes include: instance type, database engine
- Attributes: instance type, engine (MySQL, PostgreSQL, etc.), multi-AZ option
- Unit: USD per hour

### Lambda
- Rate codes include: memory size, request type
- Attributes: memory (MB), requests, compute duration
- Unit: USD per 1M requests or USD per GB-second

### CloudFront
- Rate codes include: data transfer out, requests
- Attributes: region, data transfer class
- Unit: USD per GB (data transfer) or USD per 10,000 requests

## Migration Plan

1. **Phase 1: Research & Validation**
   - Test pricing API endpoints for candidate services
   - Document which services have valid pricing data
   - Create list of services to add

2. **Phase 2: Configuration**
   - Create/update `lib/config/data-sources.ts`
   - Add DataSourceConfig for each validated service
   - Test configuration with fetch script

3. **Phase 3: Transform Modules**
   - Create transform module for each service
   - Test transforms with sample data
   - Ensure all transforms produce valid `PricingEntry[]`

4. **Phase 4: Integration**
   - Update pricing index to include new services
   - Update transform script
   - Update PricingTable component for new service types

5. **Phase 5: Testing**
   - End-to-end testing: fetch → transform → display
   - Verify all services display correctly
   - Test error handling

## Risks / Trade-offs

### Risk: Some Services May Not Have Pricing API
**Mitigation:** Validate API endpoints before adding to configuration. Document which services have pricing vs. don't.

### Risk: Transform Logic Complexity
**Mitigation:** Start with simple services (S3, Lambda), iterate on complex ones (RDS with multiple engines). Use existing EC2 transform as template.

### Risk: Performance with Many Services
**Mitigation:** Pre-transform approach already optimizes loading. Pagination in UI handles large datasets. Services are loaded on-demand (lazy loading).

### Trade-off: Service-Specific vs. Generic Transforms
**Decision:** Service-specific modules are more maintainable and flexible, even if it means more files.

## Open Questions

1. Which services should be prioritized? (S3, RDS, Lambda, CloudFront are obvious candidates)
2. Should we validate API endpoints automatically or manually?
3. How to handle services with partial pricing data (some regions/features missing)?
4. Should we add a validation script that checks all service APIs periodically?

