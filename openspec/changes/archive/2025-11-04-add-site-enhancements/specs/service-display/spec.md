## ADDED Requirements

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

## MODIFIED Requirements

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
