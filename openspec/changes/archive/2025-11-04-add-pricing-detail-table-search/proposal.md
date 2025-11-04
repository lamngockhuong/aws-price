## Why

Users need to quickly find specific pricing entries within long pricing tables on service detail pages. Without in-table search, discovery is slow and error-prone, especially for services with hundreds/thousands of rows (e.g., EC2, RDS).

## What Changes

- Add client-side search on service detail pricing tables (search across visible columns)
- Case-insensitive, debounced input with match highlight
- Interoperability with existing filters, sorting, and pagination
- No-results state and clear-search control
- Performance guardrails for large datasets

## Impact

- Affected specs: `specs/service-display/spec.md`
- Affected code: pricing table components, table state management, optional URL/query-state sync
