# service-display Specification

## Purpose
TBD - created by archiving change add-services-pricing-display. Update Purpose after archive.
## Requirements
### Requirement: Service Listing Page
The system SHALL provide a service listing page at `/services` that displays AWS services organized by categories (Compute, Networking, Storage, Database).

#### Scenario: View service categories
- **WHEN** user navigates to `/services`
- **THEN** they see services grouped by category
- **AND** each service is displayed as a card with name and icon
- **AND** clicking a service card navigates to the service detail page

#### Scenario: Navigate to service detail
- **WHEN** user clicks on a service card (e.g., EC2)
- **THEN** they are navigated to `/services/ec2`
- **AND** the service detail page displays pricing information

### Requirement: Service Detail Page

The system SHALL provide individual service detail pages at `/services/[serviceName]` that display pricing information in a table format, supporting multiple AWS service types with service-specific column configurations.

#### Scenario: View S3 pricing

- **WHEN** user navigates to `/services/s3`
- **THEN** they see a table with columns: Storage Class, Request Type, Price/GB or Price/1000 requests, Region
- **AND** the table displays pricing data for different S3 storage classes (Standard, Standard-IA, Glacier, etc.)
- **AND** table columns are sortable
- **AND** pricing data is fetched from pre-transformed S3 pricing files

#### Scenario: View RDS pricing

- **WHEN** user navigates to `/services/rds`
- **THEN** they see a table with columns: Instance Type, Engine, Multi-AZ, Price/hour, Region
- **AND** the table displays pricing data for different RDS instance types and database engines
- **AND** table columns are sortable
- **AND** pricing data is fetched from pre-transformed RDS pricing files

#### Scenario: View Lambda pricing

- **WHEN** user navigates to `/services/lambda`
- **THEN** they see a table with columns: Memory (MB), Requests, Compute Duration, Price/1M requests, Price/GB-second, Region
- **AND** the table displays pricing data for different Lambda configurations
- **AND** table columns are sortable
- **AND** pricing data is fetched from pre-transformed Lambda pricing files

#### Scenario: View CloudFront pricing

- **WHEN** user navigates to `/services/cloudfront`
- **THEN** they see a table with CloudFront-specific pricing columns
- **AND** the table displays pricing data for data transfer and requests
- **AND** table columns are sortable
- **AND** pricing data is fetched from pre-transformed CloudFront pricing files

#### Scenario: View additional services pricing

- **WHEN** user navigates to a service detail page for any supported service (Translate, API Gateway, etc.)
- **THEN** they see a table with service-specific columns relevant to that service's pricing structure
- **AND** the table displays pricing data correctly
- **AND** table columns are sortable
- **AND** pricing data is fetched from pre-transformed pricing files

#### Scenario: Service without pricing data

- **WHEN** user navigates to a service detail page for a service without pricing API support
- **THEN** they see a message indicating that pricing data is not available
- **AND** the page still displays service information (name, description, category)
- **AND** the page does not show an error or broken state

### Requirement: Region Filtering

The system SHALL allow users to filter pricing data by AWS region for all services with pricing data.

#### Scenario: Filter by region for any service

- **WHEN** user selects a region from the filter dropdown for any service (EC2, S3, RDS, Lambda, etc.)
- **THEN** the pricing table displays only pricing entries for that region
- **AND** the filter works consistently across all service types
- **AND** the filtered results maintain sortable columns

### Requirement: Service-Specific Filtering
The system SHALL provide service-specific filters based on service type.

#### Scenario: Filter EC2 by instance type
- **WHEN** user is on `/services/ec2`
- **THEN** they see an instance type filter
- **AND** when they select an instance family (e.g., "t3", "m5"), the table shows only matching instances

#### Scenario: Filter S3 by storage class
- **WHEN** user is on `/services/s3`
- **THEN** they see a storage class filter
- **AND** when they select a storage class (e.g., "Standard", "Standard-IA"), the table shows only matching storage tiers

### Requirement: Search Functionality
The system SHALL provide a search bar to find services by name.

#### Scenario: Search for service
- **WHEN** user types "ec2" in the search bar
- **THEN** the service listing page shows only services matching "ec2"
- **AND** search is case-insensitive
- **AND** search results highlight matching text

#### Scenario: Clear search
- **WHEN** user clears the search input
- **THEN** all services are displayed again

### Requirement: Homepage Overview
The system SHALL provide a homepage that displays an overview of AWS service categories and popular services.

#### Scenario: View homepage
- **WHEN** user navigates to `/`
- **THEN** they see a hero section with application title
- **AND** they see a grid of service categories (Compute, Networking, Storage, Database)
- **AND** they see a section with popular services (EC2, S3, VPC)
- **AND** clicking a category navigates to filtered service listing
- **AND** clicking a popular service navigates directly to its detail page

### Requirement: Responsive Design
The system SHALL display pricing tables and navigation appropriately on mobile and desktop devices.

#### Scenario: View on mobile
- **WHEN** user views the application on a mobile device
- **THEN** navigation uses a hamburger menu instead of sidebar
- **AND** pricing tables have horizontal scroll capability
- **AND** filters are displayed in an accordion/collapsible format

#### Scenario: View on desktop
- **WHEN** user views the application on a desktop device
- **THEN** navigation sidebar is visible
- **AND** pricing tables display all columns without horizontal scroll
- **AND** filters are displayed in a sidebar or top bar

### Requirement: Dark Mode Support
The system SHALL support dark mode for all service display pages.

#### Scenario: View in dark mode
- **WHEN** user's system prefers dark mode
- **THEN** all pages display with dark theme
- **AND** tables have appropriate contrast for readability
- **AND** text and background colors follow dark mode palette

### Requirement: Service-Specific Table Columns

The system SHALL display service-specific columns in pricing tables based on the service type's pricing structure.

#### Scenario: S3 shows storage and request columns

- **WHEN** viewing S3 pricing
- **THEN** the table shows columns specific to S3: Storage Class, Request Type, Price/GB, Price/1000 requests, Region
- **AND** columns are relevant to S3's pricing model (storage + requests)

#### Scenario: RDS shows database columns

- **WHEN** viewing RDS pricing
- **THEN** the table shows columns specific to RDS: Instance Type, Engine, Multi-AZ, Price/hour, Region
- **AND** columns are relevant to RDS's pricing model (instances + engines)

#### Scenario: Lambda shows compute columns

- **WHEN** viewing Lambda pricing
- **THEN** the table shows columns specific to Lambda: Memory (MB), Requests, Compute Duration, Price/1M requests, Price/GB-second, Region
- **AND** columns are relevant to Lambda's pricing model (requests + compute)

#### Scenario: Column configuration is extensible

- **WHEN** a new service is added with pricing support
- **THEN** column configuration can be added to `PricingTable` component
- **AND** the new service's pricing displays with appropriate columns
- **AND** existing services continue to work correctly

