# Service Display Requirements

## ADDED Requirements

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
The system SHALL provide individual service detail pages at `/services/[serviceName]` that display pricing information in a table format.

#### Scenario: View EC2 pricing
- **WHEN** user navigates to `/services/ec2`
- **THEN** they see a table with columns: Instance Type, vCPU, Memory, Price/hour, Price/month, Region
- **AND** the table displays pricing data for different EC2 instance types
- **AND** table columns are sortable

#### Scenario: View S3 pricing
- **WHEN** user navigates to `/services/s3`
- **THEN** they see a table with columns: Storage Tier, Price/GB, Request Type, Price/1000 requests, Region
- **AND** the table displays pricing data for different S3 storage classes
- **AND** table columns are sortable

#### Scenario: View VPC pricing
- **WHEN** user navigates to `/services/vpc`
- **THEN** they see a table with VPC-related pricing information
- **AND** the table displays relevant pricing metrics for VPC services

### Requirement: Region Filtering
The system SHALL allow users to filter pricing data by AWS region.

#### Scenario: Filter by region
- **WHEN** user selects a region from the filter dropdown (e.g., "us-east-1")
- **THEN** the pricing table updates to show only pricing for the selected region
- **AND** the table displays "No data" if no pricing exists for that region

#### Scenario: Clear region filter
- **WHEN** user clears the region filter
- **THEN** the pricing table shows all available regions
- **AND** rows may be grouped or duplicated by region

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

