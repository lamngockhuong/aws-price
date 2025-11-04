# service-display Specification

## Purpose

TBD - created by archiving change add-services-pricing-display. Update Purpose after archive.
## Requirements
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

The system SHALL provide a search bar to find services by name, with optional suggestions and highlight.

#### Scenario: Search for service

- **WHEN** user types a query (e.g., "ec2") in the search bar
- **THEN** the service listing page shows only services matching
- **AND** search is case-insensitive
- **AND** search results highlight matching text
- **AND** if suggestions are visible, selecting one navigates or filters accordingly

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

The system SHALL display pricing tables and navigation appropriately on mobile and desktop devices, including ensuring category filters are usable without horizontal scrolling.

#### Scenario: Category filters wrap on mobile

- **WHEN** the user views the services page on a mobile device
- **THEN** the category filter buttons wrap to multiple lines using flex-wrap
- **AND** no horizontal scroll is required to access all categories
- **AND** spacing and visual hierarchy remain readable and tappable

#### Scenario: Category filter visual design

- **WHEN** category filters render
- **THEN** the selected category uses a highlighted background and contrasting text
- **AND** unselected categories use a neutral background and border
- **AND** category labels are readable with counts in a lighter tone
- **AND** buttons include smooth hover/tap transitions

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

### Requirement: Search Autocomplete and Highlight

The system SHALL provide search suggestions with highlighted matches in the services search.

#### Scenario: Show suggestions while typing

- **WHEN** the user types at least 1 character in the search input
- **THEN** a suggestion list appears with up to 8 matching services
- **AND** matched substrings are highlighted
- **AND** arrow keys and Enter can select a suggestion

#### Scenario: No results state

- **WHEN** no services match the query
- **THEN** a “No matches” hint is shown without breaking layout

### Requirement: Category Count Badges

The system SHALL display counts per category in the category filter and listing.

#### Scenario: Show counts

- **WHEN** the services page renders
- **THEN** each category label includes its current service count (e.g., "Compute (4)")
- **AND** counts update when filters/search are applied

### Requirement: Breadcrumb Navigation

The system SHALL show a breadcrumb on services and service detail pages.

#### Scenario: Services breadcrumb

- **WHEN** the user is on `/services`
- **THEN** breadcrumb shows `Home / Services`

#### Scenario: Service detail breadcrumb

- **WHEN** the user is on `/services/[serviceName]`
- **THEN** breadcrumb shows `Home / [Category] / [Service Name]`
- **AND** intermediate crumbs are clickable

### Requirement: Pricing Table Interactions

The system SHALL improve readability and usability of pricing tables.

#### Scenario: Sticky header and sorting

- **WHEN** the pricing table scrolls vertically
- **THEN** the header remains visible (sticky)
- **AND** all columns are sortable with clear sort indicators

#### Scenario: Visual hierarchy

- **WHEN** the table renders
- **THEN** rows use zebra striping for readability
- **AND** numeric price columns are right-aligned with consistent formatting

### Requirement: Pricing Table Pagination

The system SHALL paginate long pricing tables on the client.

#### Scenario: Range display and navigation

- **WHEN** there are more rows than the page size
- **THEN** pagination controls appear with page size options (e.g., 25/50/100)
- **AND** a range label shows “Showing X–Y of Z”

### Requirement: Advanced EC2 Filters

The system SHALL support combinable filters for EC2 pricing (Region, OS, Instance Family).

#### Scenario: Combine filters

- **WHEN** the user selects Region, OS, and Instance Family
- **THEN** the table shows only rows matching all selected values
- **AND** clearing a filter updates results immediately

### Requirement: Data Source Context Banner

The system SHALL show a banner with last updated timestamp.

#### Scenario: Show update info

- **WHEN** a service detail page loads
- **THEN** a banner displays “Pricing data updated on <date>” where <date> is derived from pricing metadata and formatted in the user's locale/timezone.
- **AND** the source text links to the official AWS pricing docs or API endpoint

### Requirement: Theme Toggle

The system SHALL provide a manual light/dark theme toggle overriding system preference.

#### Scenario: Toggle theme and persist

- **WHEN** the user toggles theme
- **THEN** the site theme switches immediately
- **AND** the choice persists across sessions

### Requirement: Service Cards Visual Polish

The system SHALL enhance service cards with AWS icons, category accents, and subtle hover animation.

#### Scenario: Icon and hover

- **WHEN** service cards render
- **THEN** each card shows an appropriate AWS icon and category accent color
- **AND** hover applies a soft shadow and ~1.03x scale without layout shift

### Requirement: Footer Navigation Links

The system SHALL add footer links for About, Khuong Dev, Report issue, and Data source.

#### Scenario: Footer links available

- **WHEN** the footer renders
- **THEN** it shows links to About, Khuong Dev, Report issue, and Data source attribution

### Requirement: Compare Services (Feature-Flagged)

The system SHALL support selecting up to 3 services for side-by-side comparison when the feature flag is enabled.

#### Scenario: Select up to three services

- **WHEN** the compare feature flag is ON and the user selects services
- **THEN** selection is limited to 3 services
- **AND** a compare action navigates to a compare view showing key pricing attributes side-by-side

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

### Requirement: Site Icon in Header

The system SHALL display a site icon next to the logo text in the header.

#### Scenario: Header displays icon

- **WHEN** the header renders
- **THEN** the site icon appears next to "AWS Price Tracker" text
- **AND** the icon is clickable and links to home page
- **AND** the icon uses Next.js Image component with unoptimized prop for SVG

### Requirement: About Page

The system SHALL provide an About page at `/about` that displays project information, features, tech stack, data source, and contact details.

#### Scenario: View About page

- **WHEN** user navigates to `/about`
- **THEN** they see project overview, features, tech stack, data source information, and contact links
- **AND** the page displays dynamic statistics (total services, categories, services with pricing)
- **AND** the page includes a CTA button to explore services

#### Scenario: About page metadata

- **WHEN** the About page loads
- **THEN** it has proper SEO metadata (title: "About | AWS Price Tracker", description)
- **AND** the page is responsive with dark mode support

### Requirement: Sitemap Generation

The system SHALL generate a dynamic sitemap.xml that includes all static and dynamic routes.

#### Scenario: Sitemap includes all routes

- **WHEN** the sitemap is generated
- **THEN** it includes all static routes (/, /about, /services, /services/compare)
- **AND** it includes all dynamic service detail pages (/services/[serviceName])
- **AND** each URL has proper metadata (lastModified, changeFrequency, priority)
- **AND** the sitemap is accessible at `/sitemap.xml`

#### Scenario: Sitemap priority assignment

- **WHEN** the sitemap is generated
- **THEN** home page has priority 1.0
- **AND** services page has priority 0.9
- **AND** about page has priority 0.8
- **AND** service detail pages with pricing have priority 0.8
- **AND** service detail pages without pricing have priority 0.6

