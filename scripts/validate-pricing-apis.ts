import { fetchData } from '../lib/scripts/common/fetcher';
import type { DataSourceConfig } from '../lib/scripts/common/types';

const CANDIDATE_SERVICES = [
  's3',
  'rds',
  'lambda',
  'cloudfront',
  'translate',
  'apigateway',
  'ecs',
  'eks',
  'redshift',
  'dynamodb',
  'sns',
  'sqs',
  'sagemaker',
];

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
  console.log('Validating AWS pricing APIs for candidate services...\n');

  const results: Array<{ service: string; valid: boolean; error?: string }> = [];

  for (const service of CANDIDATE_SERVICES) {
    process.stdout.write(`Testing ${service}... `);
    const result = await validateService(service);
    results.push({ service, ...result });

    if (result.valid) {
      console.log('✓ Valid');
    } else {
      console.log(`✗ Invalid: ${result.error || 'Unknown error'}`);
    }
  }

  console.log('\n=== Validation Results ===\n');

  const validServices = results.filter(r => r.valid);
  const invalidServices = results.filter(r => !r.valid);

  console.log(`✓ Valid services (${validServices.length}):`);
  validServices.forEach(r => console.log(`  - ${r.service}`));

  console.log(`\n✗ Invalid services (${invalidServices.length}):`);
  invalidServices.forEach(r => console.log(`  - ${r.service}: ${r.error || 'Failed'}`));

  console.log('\n=== Recommendation ===');
  console.log(`Add these services to data-sources.ts: ${validServices.map(r => r.service).join(', ')}`);
}

validateAllServices().catch(console.error);

