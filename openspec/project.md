# Project Context

## Purpose

AWS Price is a web application for viewing and managing AWS pricing information. The project helps users understand and compare AWS service costs.

## Tech Stack

- **Next.js 16.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting with Next.js configs
- **pnpm 10.17.0** - Package manager

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
- **Server Components by default**: Use Client Components (`'use client'`) only when needed
- **TypeScript interfaces**: Define props types inline with `Readonly<{ ... }>` pattern
- **Font optimization**: Use `next/font` for Google Fonts (Geist Sans and Geist Mono)
- **CSS**: Tailwind CSS for styling, with custom CSS variables for theming
- **Dark mode**: Implemented via CSS media queries (`prefers-color-scheme`)

### Testing Strategy

- Testing approach to be defined as project evolves
- Currently no test framework configured

### Git Workflow

- **Branching strategy**: To be defined
- **Commit conventions**: To be established

## Domain Context

- **AWS Pricing**: The application deals with AWS service pricing data
- **Price comparison**: Users may need to compare prices across different AWS services or regions
- **Currency handling**: Pricing may involve multiple currencies

## Important Constraints

- **TypeScript strict mode**: All code must pass strict type checking
- **ESLint**: Code must pass Next.js ESLint rules (core-web-vitals and TypeScript)
- **Package manager**: Use pnpm for all package management operations

## External Dependencies

- **AWS Pricing APIs**: Integration with AWS pricing services (to be implemented)
- **Next.js**: Framework dependency
- **Vercel**: Likely deployment platform (based on Next.js defaults)
