## Why

Users struggle to scan and navigate pricing data. Key UX gaps: no autocomplete or category counts, weak breadcrumb visibility, long tables without sticky headers/sorting/pagination clarity, unclear data update context, and no compare flow. Visual design (cards, typography, icons) lacks polish.

## What Changes

- Add search suggestions (autocomplete) and highlight matches
- Show category count badges in filters/listing
- Add prominent breadcrumb on service detail and services pages
- Enhance pricing tables: sticky header, sortable columns consistently, zebra rows, right-align currency, clear empty states
- Add client-side pagination with range display (e.g., “Showing 1–50 of 5,000”)
- Add advanced filters for EC2 (Region + OS + Instance Family combinable)
- Add context banner: last updated date and data source attribution
- Add compare capability (multi-select 2–3 services) as roadmap behind a flag (not in first implementation)
- Visual/UI polish: AWS icons on service cards, category color accents, subtle hover animation
- Typography update: adopt Inter or Manrope; ensure dark/light parity
- Theme toggle (override system prefers-color-scheme)
- Footer links: About, Khuong Dev, Report issue, Data source

## Impact

- Affected specs: service-display/spec.md (ADDED/MODIFIED requirements)
- Affected code: `app/components/*` (`SearchBar.tsx`, `ServiceFilters.tsx`, `ServiceCard.tsx`, `PricingTable.tsx`, `Header.tsx`, `Footer.tsx`), `app/services/*`, `app/services/[serviceName]/*`, `app/layout.tsx`, `app/globals.css`
- Non-breaking; UI-only. Compare view introduced as feature-flagged (disabled by default) to avoid scope creep.
