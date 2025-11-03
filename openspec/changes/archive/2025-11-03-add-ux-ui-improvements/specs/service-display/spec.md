## ADDED Requirements

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

The system SHALL show a banner with last updated timestamp and data source attribution.

#### Scenario: Show update info

- **WHEN** a service detail page loads
- **THEN** a banner displays “Pricing data updated on <YYYY-MM-DD> — Source: AWS Calculator API”
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

The system SHALL add footer links for About, GitHub, Feedback, and Data source.

#### Scenario: Footer links available

- **WHEN** the footer renders
- **THEN** it shows links to About, GitHub repo, Feedback channel, and Data source attribution

### Requirement: Compare Services (Feature-Flagged)

The system SHALL support selecting up to 3 services for side-by-side comparison when the feature flag is enabled.

#### Scenario: Select up to three services

- **WHEN** the compare feature flag is ON and the user selects services
- **THEN** selection is limited to 3 services
- **AND** a compare action navigates to a compare view showing key pricing attributes side-by-side

## MODIFIED Requirements

### Requirement: Search Functionality

The system SHALL provide a search bar to find services by name, with optional suggestions and highlight.

#### Scenario: Search for service

- **WHEN** user types a query (e.g., "ec2") in the search bar
- **THEN** the service listing page shows only services matching
- **AND** search is case-insensitive
- **AND** search results highlight matching text
- **AND** if suggestions are visible, selecting one navigates or filters accordingly
