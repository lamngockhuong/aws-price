## ADDED Requirements

### Requirement: Pricing Table Search on Service Detail Page

The system SHALL provide an in-table search on service detail pricing tables that filters rows by a free-text query across visible columns, working seamlessly with existing filters, sorting, and pagination without degrading performance.

#### Scenario: Filter rows by query across visible columns

- **WHEN** the user types a query in the pricing table search input
- **THEN** only rows containing the query in any visible column remain
- **AND** matching is case-insensitive and trims surrounding whitespace

#### Scenario: Debounced input and clear control

- **WHEN** the user types rapidly
- **THEN** filtering applies with a debounce of 200–300ms
- **AND** a clear action resets the query and restores the full result set

#### Scenario: Interoperability with existing filters and sorting

- **WHEN** region/service-specific filters and column sorting are applied
- **THEN** search filters the already-filtered dataset
- **AND** current sort order is preserved on the filtered results

#### Scenario: Pagination after filtering

- **WHEN** a query is active
- **THEN** pagination reflects the filtered row count (e.g., “Showing X–Y of Z”)
- **AND** page navigation operates on the filtered dataset

#### Scenario: No results state

- **WHEN** no rows match the query
- **THEN** the table displays a “No matching results” state without breaking layout

#### Scenario: Match highlighting

- **WHEN** rows match the query
- **THEN** matched substrings in visible cells are highlighted for readability

#### Scenario: Performance guardrails

- **WHEN** filtering runs on large datasets (e.g., >1,000 rows)
- **THEN** filtering uses memoization and efficient search (
  early exits, pre-normalized strings) to keep interactions responsive

#### Scenario: Accessibility and keyboard support

- **WHEN** using keyboard navigation
- **THEN** the search input is focusable with a visible focus style
- **AND** screen readers announce the search field and result count updates
