## ADDED Requirements

### Requirement: Pricing Endpoint Availability Validation (Advisory)

The system SHALL validate whether a service has a reachable pricing endpoint and expose this as advisory metadata for the catalog. This validation is advisory (non-blocking) and does not prevent builds from succeeding.

#### Scenario: Validate pricing endpoint

- **WHEN** validation runs for a service `serviceId`
- **THEN** the system attempts to access the pricing endpoint pattern
- **AND** records availability status without blocking builds

#### Scenario: Validation reads from services catalog

- **WHEN** validation script runs
- **THEN** it automatically reads all services from the services catalog
- **AND** it skips services that already have `pricingAvailable: true` flag set
- **AND** it tests only services that haven't been validated yet

### Requirement: Non-blocking handling for services without pricing

The data pipeline MUST skip fetch/transform for services without a valid endpoint and mark them as no-pricing in metadata.

#### Scenario: Skip transform when no pricing

- **WHEN** a service has no pricing availability
- **THEN** transform step is skipped and the catalog shows “No pricing data”
- **AND** the application build succeeds
