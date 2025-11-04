## Why

The current catalog only includes a subset of AWS services and is inconsistent with a more complete list provided by the user. We need a canonical, normalized catalog of AWS services with clear categories, internal IDs, and pricing-availability flags to support navigation, discovery, and future pricing expansion.

## What Changes

- Normalize and complete the AWS services catalog (names, slugs, categories) based on the provided list
- Map each service to an internal stable `serviceId` and indicate pricing availability
- Add pricing availability indicator to service list/detail pages (e.g., "Pricing available" / "No pricing data")
- Ensure routes and detail pages render for all services; show graceful message when pricing is unavailable
- Add validation step to detect services with valid pricing endpoints (non-blocking, advisory)
- Keep existing pricing-enabled services working as-is
- **Expand pricing data support**: Validate and add pricing data fetching for new services that have pricing API endpoints
- Update validation script to test all services from the catalog (not just hardcoded list)
- Add pricing data sources, transform modules, and UI support for newly validated services

## Impact

- Affected specs:

  - `service-display`: Catalog completeness, badges, and detail-page behavior without pricing
  - `data-fetching`: Validation of pricing endpoint availability (advisory)

- Affected code:
  - `lib/data/services.ts` — expand and normalize catalog entries
  - `app/services/page.tsx` and `app/services/[serviceName]/page.tsx` — display catalog and pricing-availability states
  - `app/components/ServiceCard.tsx`, `ServiceFilters.tsx` — category and badge display
  - `scripts/validate-pricing-apis.ts` — advisory validation for pricing endpoints (enhanced to test all catalog services)
  - `lib/config/data-sources.ts` — add pricing data source configurations for new services
  - `lib/data/pricing/` — create transform modules for new services with pricing
  - `lib/data/pricing/index.ts` — register new services in pricing registry
  - `scripts/fetch-pricing.ts` — fetch pricing data for new services
  - `scripts/transform-pricing.ts` — transform pricing data for new services
  - `app/components/PricingTable.tsx` — add column configurations for new service types (if needed)
