## ADDED Requirements

### Requirement: Complete AWS Services Catalog Coverage

The system SHALL present a normalized, complete catalog of AWS services with categories, stable internal IDs, and pricing availability indicators.

#### Scenario: Catalog lists all known AWS services

- **WHEN** user opens `/services`
- **THEN** all configured AWS services are shown with name, category, and badge for pricing availability
- **AND** services are searchable and filterable by category

#### Scenario: Service detail without pricing

- **WHEN** user opens `/services/[serviceName]` for a service without pricing data
- **THEN** the page renders service info and a message indicating pricing is not available
- **AND** no error state is shown

#### Scenario: Service detail with pricing

- **WHEN** user opens `/services/[serviceName]` for a pricing-enabled service
- **THEN** pricing tables render with appropriate columns per existing behavior
- **AND** the pricing-availability badge reflects availability

### Requirement: Pricing Availability Badge

The system SHALL indicate pricing availability in the catalog and detail pages.

#### Scenario: Badge states

- **WHEN** a service has transformed pricing data
- **THEN** it shows a “Pricing available” state
- **WHEN** a service has no pricing data
- **THEN** it shows a “No pricing data” state

## MODIFIED Requirements

### Requirement: Service Listing Page

The system SHALL provide a service listing page at `/services` that displays AWS services organized by categories and supports category filters and search across the expanded catalog (199 services) without performance degradation.

#### Scenario: View service categories

- **WHEN** user navigates to `/services`
- **THEN** they see services grouped by category
- **AND** each service is displayed as a card with name and icon
- **AND** clicking a service card navigates to the service detail page

#### Scenario: Navigate to service detail

- **WHEN** user clicks on a service card (e.g., EC2)
- **THEN** they are navigated to `/services/ec2`
- **AND** the service detail page displays pricing information

#### Scenario: Category filter works on expanded catalog

- **WHEN** a category is selected
- **THEN** only services in that category are listed
- **AND** search continues to filter within the selected category
