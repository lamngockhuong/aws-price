import { fetchData } from '../lib/scripts/common/fetcher';
import type { DataSourceConfig } from '../lib/scripts/common/types';
import { services } from '../lib/data/services';

// Get all service IDs from catalog
const ALL_SERVICE_IDS = services.map(service => service.id);

// Services that are already known to have pricing (read from services with pricingAvailable flag)
const KNOWN_PRICING_SERVICES = new Set(
  services.filter(service => service.pricingAvailable === true).map(service => service.id)
);

// Filter out services we already know have pricing
const CANDIDATE_SERVICES = ALL_SERVICE_IDS.filter(id => !KNOWN_PRICING_SERVICES.has(id));

async function validateService(serviceId: string): Promise<{ valid: boolean; error?: string }> {
  const url = `https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/${serviceId}/USD/current/${serviceId}.json`;

  const config: DataSourceConfig = {
    id: `${serviceId}-pricing`,
    name: `${serviceId.toUpperCase()} Pricing`,
    url,
    type: 'pricing',
    validate: (data: any) => {
      return (
        typeof data === 'object' &&
        data !== null &&
        'manifest' in data &&
        'regions' in data
      );
    },
  };

  try {
    const result = await fetchData(config, { retries: 1, timeout: 10000 });

    if (result.success && result.data) {
      // Check if it has valid structure
      const hasValidStructure = config.validate!(result.data);
      if (hasValidStructure) {
        // Check if regions exist and have data
        const hasRegions = result.data.regions && Object.keys(result.data.regions).length > 0;
        return { valid: hasRegions };
      }
      return { valid: false, error: 'Invalid structure' };
    }
    return { valid: false, error: result.error || 'Fetch failed' };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function validateAllServices() {
  console.log(`Validating AWS pricing APIs for ${CANDIDATE_SERVICES.length} services from catalog...\n`);
  console.log(`Skipping ${KNOWN_PRICING_SERVICES.size} services already known to have pricing.\n`);

  const results: Array<{ service: string; valid: boolean; error?: string }> = [];
  let processed = 0;

  // Process in batches to avoid overwhelming the API
  const BATCH_SIZE = 5;
  for (let i = 0; i < CANDIDATE_SERVICES.length; i += BATCH_SIZE) {
    const batch = CANDIDATE_SERVICES.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (service) => {
        process.stdout.write(`[${++processed}/${CANDIDATE_SERVICES.length}] Testing ${service}... `);
        const result = await validateService(service);
        results.push({ service, ...result });

        if (result.valid) {
          console.log('✓ Valid');
        } else {
          console.log(`✗ Invalid: ${result.error || 'Unknown error'}`);
        }
      })
    );

    // Small delay between batches to be respectful to the API
    if (i + BATCH_SIZE < CANDIDATE_SERVICES.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n=== Validation Results ===\n');

  const validServices = results.filter(r => r.valid);
  const invalidServices = results.filter(r => !r.valid);

  console.log(`✓ Valid services (${validServices.length}):`);
  if (validServices.length > 0) {
    validServices.forEach(r => console.log(`  - ${r.service}`));
  } else {
    console.log('  (none found)');
  }

  console.log(`\n✗ Invalid services (${invalidServices.length}):`);
  if (invalidServices.length > 0 && invalidServices.length <= 20) {
    invalidServices.forEach(r => console.log(`  - ${r.service}: ${r.error || 'Failed'}`));
  } else if (invalidServices.length > 20) {
    console.log(`  (${invalidServices.length} services failed validation - too many to list)`);
  }

  console.log('\n=== Summary ===');
  console.log(`Total services tested: ${CANDIDATE_SERVICES.length}`);
  console.log(`Valid pricing endpoints: ${validServices.length}`);
  console.log(`Invalid/No pricing: ${invalidServices.length}`);
  console.log(`Already have pricing: ${KNOWN_PRICING_SERVICES.size}`);

  if (validServices.length > 0) {
    console.log('\n=== Recommendation ===');
    console.log(`Add these services to data-sources.ts: ${validServices.map(r => r.service).join(', ')}`);
    console.log(`\nUpdate pricingAvailable flags in services.ts for:`);
    validServices.forEach(r => console.log(`  - ${r.service}: pricingAvailable: true`));
  } else {
    console.log('\n=== Recommendation ===');
    console.log('No new services with valid pricing endpoints found.');
    console.log('All catalog services have been validated.');
  }

  // Export results as JSON for programmatic use
  console.log('\n=== JSON Results ===');
  console.log(JSON.stringify({
    valid: validServices.map(r => r.service),
    invalid: invalidServices.map(r => ({ service: r.service, error: r.error })),
    summary: {
      total: CANDIDATE_SERVICES.length,
      valid: validServices.length,
      invalid: invalidServices.length,
      known: KNOWN_PRICING_SERVICES.size,
    },
  }, null, 2));
}

validateAllServices().catch(console.error);

