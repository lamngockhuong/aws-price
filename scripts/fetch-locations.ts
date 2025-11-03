import { join } from 'path';
import { fetchData } from '../lib/scripts/common/fetcher';
import { saveData } from '../lib/scripts/common/processor';
import { locationsSource } from '../lib/config/data-sources';

const OUTPUT_PATH = join(process.cwd(), 'lib/data/locations.json');

async function fetchLocations() {
  console.log('Fetching AWS locations...');

  const result = await fetchData(locationsSource);

  if (!result.success) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }

  saveData(result.data, {
    outputPath: OUTPUT_PATH,
    format: 'json',
    pretty: true
  });

  const count = Object.keys(result.data || {}).length;
  console.log(`✓ Successfully saved ${count} locations to ${OUTPUT_PATH}`);
}

fetchLocations().catch((error) => {
  console.error('Error fetching locations:', error);
  process.exit(1);
});

