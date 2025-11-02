# Implementation Tasks

## 1. Data Models and Types
- [x] 1.1 Create TypeScript types for `AWSService` and `PricingEntry`
- [x] 1.2 Create mock data structure for EC2, VPC, S3 services
- [x] 1.3 Create utility functions for price formatting

## 2. Service Listing Page
- [x] 2.1 Create `/services` page with category-based navigation
- [x] 2.2 Implement ServiceCard component for grid display
- [x] 2.3 Add category grouping (Compute, Networking, Storage, Database)
- [x] 2.4 Implement responsive layout (mobile-first)

## 3. Service Detail Pages
- [x] 3.1 Create `/services/[serviceName]` dynamic route
- [x] 3.2 Implement PricingTable component with sortable columns
- [x] 3.3 Add service header with name and description
- [x] 3.4 Handle service-specific attributes (instance types for EC2, storage classes for S3)

## 4. Filtering and Search
- [x] 4.1 Create ServiceFilters component (region, instance type, etc.)
- [x] 4.2 Implement SearchBar component for service search
- [x] 4.3 Add filter state management
- [x] 4.4 Connect filters to pricing table updates

## 5. Homepage
- [x] 5.1 Update homepage with service categories overview
- [x] 5.2 Add popular services section (EC2, S3, VPC)
- [x] 5.3 Add quick stats (number of services, regions)
- [x] 5.4 Create category grid navigation

## 6. Styling and UX
- [x] 6.1 Apply Tailwind CSS styling to all components
- [x] 6.2 Ensure dark mode support
- [x] 6.3 Add loading states for data fetching (not needed - static data)
- [x] 6.4 Implement responsive table design (horizontal scroll on mobile)

## 7. Testing
- [ ] 7.1 Test navigation between pages
- [ ] 7.2 Test filtering functionality
- [ ] 7.3 Test responsive layouts on mobile and desktop
- [ ] 7.4 Verify table sorting works correctly

