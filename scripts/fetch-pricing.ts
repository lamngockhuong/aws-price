import { join } from 'path';
import { fetchMultiple } from '../lib/scripts/common/fetcher';
import { saveData, consolidateResults, logResults } from '../lib/scripts/common/processor';
import { getAllPricingSources } from '../lib/config/data-sources';

const OUTPUT_DIR = join(process.cwd(), 'lib/data/pricing');

async function fetchPricing() {
  console.log('Fetching AWS pricing data...\n');

  const sources = getAllPricingSources();
  const results = await fetchMultiple(sources);

  const { success, failed } = consolidateResults(results);

  if (success.length === 0) {
    console.error('All pricing fetches failed!');
    logResults(results);
    process.exit(1);
  }

  // Save each service pricing to its own file
  success.forEach(result => {
    const serviceId = result.source.replace('-pricing', '');
    const outputPath = join(OUTPUT_DIR, `${serviceId}.json`);

    saveData(result.data, {
      outputPath: outputPath,
      format: 'json',
      pretty: true
    });

    console.log(`✓ Saved ${serviceId} pricing to ${outputPath}`);
  });

  console.log(`\n✓ Successfully saved pricing data for ${success.length} services`);
  console.log(`  Output directory: ${OUTPUT_DIR}`);

  if (failed.length > 0) {
    console.log('\n⚠ Some services failed to fetch:');
    logResults(failed);
  }

  console.log('\n💡 Tip: Run "pnpm transform:pricing" to pre-transform data for faster loading');
}

fetchPricing().catch((error) => {
  console.error('Error fetching pricing:', error);
  process.exit(1);
});

