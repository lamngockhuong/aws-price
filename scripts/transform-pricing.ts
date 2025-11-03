import { join } from 'path';
import { transformEC2Pricing } from '../lib/data/pricing/ec2';
import { transformNATGatewayPricing } from '../lib/data/pricing/natgateway';
import { saveData } from '../lib/scripts/common/processor';

const PRICING_DIR = join(process.cwd(), 'lib/data/pricing');

async function transformPricing() {
  console.log('Transforming pricing data...\n');

  // Transform EC2
  try {
    const ec2RawData = require(join(PRICING_DIR, 'ec2.json'));
    const ec2Transformed = transformEC2Pricing(ec2RawData);

    saveData(ec2Transformed, {
      outputPath: join(PRICING_DIR, 'ec2-transformed.json'),
      format: 'json',
      pretty: false // Smaller file size
    });

    console.log(`✓ Transformed EC2: ${ec2Transformed.length} entries`);
  } catch (error) {
    console.warn('⚠ EC2 transform failed:', error instanceof Error ? error.message : error);
  }

  // Transform NAT Gateway
  try {
    const natgatewayRawData = require(join(PRICING_DIR, 'natgateway.json'));
    const natgatewayTransformed = transformNATGatewayPricing(natgatewayRawData);

    saveData(natgatewayTransformed, {
      outputPath: join(PRICING_DIR, 'natgateway-transformed.json'),
      format: 'json',
      pretty: false
    });

    console.log(`✓ Transformed NAT Gateway: ${natgatewayTransformed.length} entries`);
  } catch (error) {
    console.warn('⚠ NAT Gateway transform failed:', error instanceof Error ? error.message : error);
  }

  console.log('\n✓ All pricing data transformed');
}

transformPricing().catch((error) => {
  console.error('Error transforming pricing:', error);
  process.exit(1);
});

