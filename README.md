# AWS Price Tracker

A website to track and compare pricing for AWS services in a clear, organized format.

🌐 **Live Site:** [https://awsprice.khuong.dev](https://awsprice.khuong.dev)

## Features

- 📊 View and compare AWS service pricing for **199 AWS services** across **14 categories**
- 🎯 **76 services** with detailed pricing data available
- 🔍 Search and filter services by category
- 📱 Responsive design with dark mode support
- 🚀 Static site generation for fast performance
- 🌍 Multi-platform deployment support (GitHub Pages, Cloudflare Pages)

### Recent UX Improvements

- 🔎 Autocomplete search with match highlight
- 🧭 Breadcrumbs on Services and Service Detail pages
- 🧮 Category counts in Services listing
- 🧱 Pricing tables: sticky header, sortable columns, zebra rows, right-aligned prices
- 📄 Pagination with range display; optional rows-per-page selector
- ⚙️ EC2 filters: Region, Operating System, Instance Family (combinable)
- 🌓 Theme toggle with persisted preference
- 🔗 Footer links: About, Khuong Dev, Report issue, Data source

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16.0.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Package Manager:** pnpm
- **Deployment:** GitHub Pages & Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 10.17.0 or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lamngockhuong/aws-price.git
cd aws-price
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the production static site:

```bash
pnpm build
```

The static files will be generated in the `out` directory.

## Project Structure

```
aws-price/
├── app/                      # Next.js App Router
│   ├── components/           # React components
│   ├── services/             # Service detail pages
│   └── page.tsx              # Home page
├── lib/                      # Utilities and data
│   ├── data/                # Service and pricing data
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── .github/workflows/       # GitHub Actions workflows
```

## Deployment

This project supports deployment to multiple platforms:

### GitHub Pages

1. Ensure GitHub Pages is enabled in repository settings
2. Push to the `main` branch
3. The workflow `.github/workflows/deploy-github-pages.yml` will automatically build and deploy

**Custom Domain:**

- Set up DNS: Point `awsprice.khuong.dev` to `lamngockhuong.github.io`
- Configure custom domain in GitHub Pages settings

### Cloudflare Pages

**Option 1: GitHub Actions (Recommended)**

1. Add secrets to GitHub repository:

   - `CLOUDFLARE_API_TOKEN`: API token with Pages:Edit permission
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. Push to the `main` branch
3. The workflow `.github/workflows/deploy-cloudflare.yml` will automatically deploy

**Option 2: Cloudflare Dashboard**

1. Go to Cloudflare Dashboard → Pages
2. Create new project → Connect to Git
3. Select repository `aws-price`
4. Build settings:
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `pnpm install && pnpm run build`
   - Build output directory: `out`
   - Root directory: `/`

## Configuration

### Deployment Platform

The project automatically detects the deployment platform via environment variables:

- `DEPLOYMENT_PLATFORM`: Set to `github-pages`, `github-pages-custom`, or `cloudflare`
- `CF_PAGES`: Automatically set by Cloudflare Pages (auto-detects Cloudflare)

### Custom Domain

For custom domain deployment, update:

- `package.json`: `homepage` field
- `public/CNAME`: Domain name (for GitHub Pages)

## Data Fetching

This project fetches AWS pricing and location data from official AWS APIs and stores them offline for better performance.

### Fetching Data

**Automatic (before build):**

```bash
pnpm build  # Automatically runs fetch:all and transform:pricing before build
```

**Manual:**

```bash
# Fetch locations data
pnpm fetch:locations

# Fetch pricing data for all services
pnpm fetch:pricing

# Fetch all data (locations + pricing)
pnpm fetch:all

# Transform pricing data (generates optimized transformed files)
pnpm transform:pricing
```

### Data Files

- **Locations**: `lib/data/locations.json` (auto-generated)
- **Pricing (raw)**: `lib/data/pricing/*.json` (auto-generated from AWS APIs)
- **Pricing (transformed)**: `lib/data/pricing/*-transformed.json` (optimized, auto-generated)

**Note**: Transformed files are generated automatically during build. Run `pnpm transform:pricing` manually if you need to refresh transformed data.

### Supported Services

The catalog includes **199 AWS services** organized into **14 categories**:

- **Compute** (15 services): EC2, Lambda, ECS, EKS, Fargate, Batch, Lightsail, and more
- **Storage** (7 services): S3, EFS, FSx, Glacier, Backup, Snow Family, and more
- **Database** (10 services): RDS, DynamoDB, Redshift, Neptune, ElastiCache, Timestream, and more
- **Networking** (13 services): VPC, CloudFront, API Gateway, Route 53, Direct Connect, and more
- **Security** (20 services): IAM, Cognito, KMS, WAF, Shield, GuardDuty, Macie, and more
- **Analytics** (17 services): Athena, EMR, Kinesis, QuickSight, OpenSearch, Glue, and more
- **ML/AI** (20 services): SageMaker, Bedrock, Comprehend, Rekognition, Translate, Lex, and more
- **Media** (8 services): MediaConvert, MediaLive, MediaPackage, IVS, and more
- **Management** (25 services): CloudFormation, CloudWatch, CloudTrail, Config, Systems Manager, and more
- **Migration** (7 services): DMS, Server Migration Service, Application Migration Service, and more
- **DevTools** (15 services): CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Cloud9, X-Ray, and more
- **IoT** (10 services): IoT Core, IoT Analytics, IoT Greengrass, IoT SiteWise, and more
- **End-User Computing** (8 services): WorkSpaces, AppStream, WorkDocs, WorkMail, Chime, and more
- **Other** (24 services): SNS, SQS, SES, Step Functions, EventBridge, Connect, and more

**76 services** currently have detailed pricing data available through the AWS pricing API. Services without pricing data display a message directing users to the [AWS Pricing page](https://aws.amazon.com/pricing/).

### Adding New Services

To add pricing support for a new AWS service:

1. **Validate the pricing endpoint:**

   ```bash
   npx tsx scripts/validate-pricing-apis.ts
   ```

   This will test all services in the catalog and identify which ones have valid pricing endpoints.

2. **Add the service to the catalog** (if not already present):

   - Edit `lib/data/services.ts`
   - Add the service with appropriate category and description
   - Set `pricingAvailable: false` initially

3. **Add pricing data source:**

   - Edit `lib/config/data-sources.ts`
   - Add the service to the `createPricingSourceConfigs()` array or add manually

4. **Create transform module:**

   - Create `lib/data/pricing/{serviceId}.ts` using the generic transform pattern:

   ```typescript
   import { createGenericTransform } from './generic';
   export const transform{ServiceName}Pricing = createGenericTransform('{serviceId}');
   ```

5. **Register in pricing registry:**

   - Edit `lib/data/pricing/index.ts`
   - Import the pricing module
   - Add to the `pricingRegistry` object

6. **Update transform script:**

   - Edit `scripts/transform-pricing.ts`
   - Import the transform function
   - Add to the `serviceTransforms` array

7. **Update pricing flag:**

   - Set `pricingAvailable: true` in `lib/data/services.ts`

8. **Fetch and transform:**

   ```bash
   pnpm fetch:pricing
   pnpm transform:pricing
   ```

**Note:** For services using the generic transform pattern, you can manually create the transform module following the pattern in existing modules (e.g., `lib/data/pricing/translate.ts`), then manually update the pricing registry and transform script.

### Data Source Context Banner

Service detail pages show a banner: “Pricing data updated on <date>”. The date comes from lightweight pricing metadata (`lib/data/pricing/metadata.json`) written by scripts, formatted in the user's locale and timezone.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production static site (automatically fetches and transforms data)
- `pnpm export` - Alias for build (generates static export)
- `pnpm start` - Start production server (for non-static deployment)
- `pnpm lint` - Run ESLint
- `pnpm fetch:locations` - Fetch AWS locations data
- `pnpm fetch:pricing` - Fetch AWS pricing data for all services
- `pnpm fetch:all` - Fetch all data (locations + pricing)
- `pnpm transform:pricing` - Transform pricing data to optimized format
- `npx tsx scripts/validate-pricing-apis.ts` - Validate pricing API endpoints for all services in catalog

## License

MIT

## Author

**Lam Ngoc Khuong**

- Website: [https://khuong.dev](https://khuong.dev)
- Email: <hi@khuong.dev>
- GitHub: [@lamngockhuong](https://github.com/lamngockhuong)
