## Why

Improve site navigation, discoverability, and SEO by adding an About page, sitemap, header icon, and better mobile category filter UX.

## What Changes

- Add site icon to header logo
- Add About page at `/about` with project information, tech stack, and contact details
- Add dynamic sitemap.xml with all routes (203 URLs)
- Improve category filter UI with responsive flex-wrap layout (replacing horizontal scroll)
- Add pre-commit hook for linting

## Impact

- Affected specs: `service-display`
- Affected code:
  - `app/components/Header.tsx` - Added icon
  - `app/about/page.tsx` - New About page
  - `app/sitemap.ts` - New sitemap generation
  - `app/services/ServicesContent.tsx` - Improved category filter UI
  - `.husky/pre-commit` - Added lint hook
