# Project Context

## Purpose

AWS Price is a web application for viewing and comparing AWS service pricing information. The project helps users understand AWS service costs across multiple services and regions. It fetches pricing data from official AWS APIs offline and displays it in an organized, searchable format.

## Tech Stack

- **Next.js 16.0.1** - React framework with App Router (static export)
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting with Next.js configs
- **pnpm 10.17.0** - Package manager
- **tsx 4.7.0** - TypeScript execution for data fetching scripts

## Project Conventions

### Code Style

- **TypeScript strict mode** enabled for maximum type safety
- **Path aliases**: Use `@/*` to reference root directory (e.g., `@/app/components`)
- **File naming**:
  - React components: PascalCase (e.g., `MyComponent.tsx`)
  - Utilities and helpers: camelCase (e.g., `formatPrice.ts`)
  - Route files: lowercase with hyphens for Next.js App Router conventions
- **Component structure**: Use functional components with TypeScript interfaces for props
- **Code formatting**: Follow Next.js and ESLint recommendations
- **Type safety**: Prefer explicit types over `any`, use `Readonly<>` for props when appropriate

### Architecture Patterns

- **Next.js App Router**: All routes defined under `app/` directory
- **Static Export**: Configured with `output: "export"` for static site generation
- **Server Components by default**: Use Client Components (`'use client'`) only when needed
- **TypeScript interfaces**: Define props types inline with `Readonly<{ ... }>` pattern
- **CSS**: Tailwind CSS for styling, with custom CSS variables for theming
- **Dark mode**: Implemented via CSS media queries (`prefers-color-scheme`)
- **Offline Data Fetching**: AWS pricing data is fetched and stored offline for performance
  - Data fetching scripts in `scripts/` directory
  - Pre-build data fetching via `prebuild` hook
  - Pre-transformed data files for faster loading
  - Service-specific transform modules for pricing data
- **Multi-platform Deployment**: Supports GitHub Pages and Cloudflare Pages with dynamic configuration
  - GitHub Pages: Custom domain support (awsprice.khuong.dev)
  - Cloudflare Pages: Automatic detection via `CF_PAGES` env variable
  - Dynamic `basePath` and `assetPrefix` configuration based on deployment platform

### Testing Strategy

- Testing approach to be defined as project evolves
- Currently no test framework configured

### Data Fetching Architecture

- **Offline-first approach**: All pricing data is fetched and stored locally before build
- **Centralized configuration**: Data source URLs and validation in `lib/config/data-sources.ts`
- **Common utilities**: Reusable fetch and processing utilities in `lib/scripts/common/`
  - `fetcher.ts`: Fetch with retry logic and exponential backoff
  - `processor.ts`: Data saving, consolidation, and logging
  - `types.ts`: Common TypeScript interfaces
- **Service-specific transforms**: Each service has its own transform module in `lib/data/pricing/`
  - Transform raw AWS API format to internal `PricingEntry[]` format
  - Pre-transform data for performance (generates `*-transformed.json` files)
  - Support for on-the-fly transformation as fallback
- **Build-time fetching**: Automatic data fetch and transform via `prebuild` hook
- **Scripts**:
  - `fetch:locations` - Fetch AWS locations data
  - `fetch:pricing` - Fetch pricing data for all services in parallel
  - `transform:pricing` - Transform raw pricing data to optimized format
  - `validate-pricing-apis` - Validate which services have pricing API support

### Git Workflow

- **Branching strategy**: To be defined
- **Commit conventions**: To be established

## Domain Context

- **AWS Services Supported**: 14 services across 5 categories
  - **Compute**: EC2, Lambda, ECS, EKS
  - **Storage**: S3
  - **Database**: Redshift, DynamoDB, RDS (pricing API not available)
  - **Networking**: VPC, CloudFront, API Gateway, NAT Gateway
  - **Other**: Translate, SNS
- **AWS Pricing APIs**: Integration with official AWS pricing APIs
  - Location data: `https://b0.p.awsstatic.com/locations/1.0/aws/current/locations.json`
  - Pricing data: `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/{service}/USD/current/{service}.json`
  - Only services with valid pricing APIs are supported (validated via script)
- **Price comparison**: Users can compare prices across different AWS services, regions, and instance types
- **Currency**: Currently USD only (hardcoded in API URLs)
- **Regions**: Multiple AWS regions supported per service

## Important Constraints

- **TypeScript strict mode**: All code must pass strict type checking
- **ESLint**: Code must pass Next.js ESLint rules (core-web-vitals and TypeScript)
- **Package manager**: Use pnpm for all package management operations (version pinned in `package.json`)
- **Static export only**: Must use Next.js static export (`output: "export"`)
  - No server-side features (API routes, SSR, etc.)
  - Client-side hooks must be wrapped in Suspense boundaries
  - Dynamic routes must use `generateStaticParams()`
- **Offline data requirement**: Pricing data must be fetched before build (via `prebuild` hook)

## External Dependencies

- **AWS Pricing APIs**: Integration with official AWS pricing APIs
  - Locations API: Fetched and stored in `lib/data/locations.json`
  - Pricing APIs: Fetched per service and stored in `lib/data/pricing/{service}.json`
  - Data fetched offline during build time, not at runtime
- **Next.js**: Framework dependency (static export mode)
- **Deployment Platforms**:
  - **GitHub Pages**: Primary deployment with custom domain (awsprice.khuong.dev)
  - **Cloudflare Pages**: Secondary deployment option
  - Both configured via GitHub Actions workflows
- **CI/CD**: GitHub Actions for automated deployment
  - `.github/workflows/deploy-github-pages.yml` - GitHub Pages deployment
  - `.github/workflows/deploy-cloudflare.yml` - Cloudflare Pages deployment

## Project Structure

```
aws-price/
├── app/                          # Next.js App Router
│   ├── components/               # React components (PricingTable, ServiceCard, etc.)
│   ├── services/                 # Service listing and detail pages
│   │   ├── page.tsx              # Services listing page
│   │   ├── ServicesContent.tsx   # Client component with filters
│   │   └── [serviceName]/        # Dynamic service detail pages
│   └── page.tsx                  # Home page
├── lib/                          # Utilities and data
│   ├── config/                   # Configuration files
│   │   └── data-sources.ts       # AWS API data source configurations
│   ├── data/                     # Service and pricing data
│   │   ├── locations.json        # AWS locations data (auto-generated)
│   │   ├── locations.ts          # Location data accessors
│   │   ├── pricing/              # Per-service pricing data and transforms
│   │   │   ├── {service}.json    # Raw pricing data (auto-generated)
│   │   │   ├── {service}-transformed.json  # Pre-transformed data (auto-generated)
│   │   │   ├── {service}.ts      # Service-specific transform modules
│   │   │   ├── generic.ts        # Generic transform utilities
│   │   │   └── index.ts          # Pricing registry and accessors
│   │   ├── pricing.ts            # Legacy pricing data (backward compatibility)
│   │   └── services.ts           # Service catalog (14 services)
│   ├── scripts/                  # Data fetching scripts utilities
│   │   └── common/               # Common utilities for fetching
│   │       ├── fetcher.ts        # Fetch with retry logic
│   │       ├── processor.ts      # Data processing utilities
│   │       └── types.ts          # Common TypeScript interfaces
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── scripts/                       # Data fetching scripts
│   ├── fetch-locations.ts        # Fetch AWS locations
│   ├── fetch-pricing.ts          # Fetch pricing for all services
│   ├── transform-pricing.ts      # Transform pricing data
│   └── validate-pricing-apis.ts  # Validate service pricing APIs
├── public/                       # Static assets
│   └── CNAME                     # Custom domain (GitHub Pages)
├── .github/workflows/            # GitHub Actions workflows
│   ├── deploy-github-pages.yml   # GitHub Pages deployment
│   └── deploy-cloudflare.yml     # Cloudflare Pages deployment
└── openspec/                     # OpenSpec specifications
    ├── specs/                    # Current specifications
    └── changes/                  # Proposed changes
```
