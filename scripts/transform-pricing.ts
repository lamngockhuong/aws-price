import { join } from 'path';
import { writeFileSync } from 'fs';
import { transformEC2Pricing } from '../lib/data/pricing/ec2';
import { transformNATGatewayPricing } from '../lib/data/pricing/natgateway';
import { transformS3Pricing } from '../lib/data/pricing/s3';
import { transformLambdaPricing } from '../lib/data/pricing/lambda';
import { transformCloudFrontPricing } from '../lib/data/pricing/cloudfront';
import { transformTranslatePricing } from '../lib/data/pricing/translate';
import { transformAPIGatewayPricing } from '../lib/data/pricing/apigateway';
import { transformECSPricing } from '../lib/data/pricing/ecs';
import { transformEKSPricing } from '../lib/data/pricing/eks';
import { transformRedshiftPricing } from '../lib/data/pricing/redshift';
import { transformDynamoDBPricing } from '../lib/data/pricing/dynamodb';
import { transformSNSPricing } from '../lib/data/pricing/sns';
import { saveData } from '../lib/scripts/common/processor';

const PRICING_DIR = join(process.cwd(), 'lib/data/pricing');

// Service transform configurations
const serviceTransforms: Array<{
  id: string;
  name: string;
  transform: (data: any) => any;
}> = [
  { id: 'ec2', name: 'EC2', transform: transformEC2Pricing },
  { id: 'natgateway', name: 'NAT Gateway', transform: transformNATGatewayPricing },
  { id: 's3', name: 'S3', transform: transformS3Pricing },
  { id: 'lambda', name: 'Lambda', transform: transformLambdaPricing },
  { id: 'cloudfront', name: 'CloudFront', transform: transformCloudFrontPricing },
  { id: 'translate', name: 'Translate', transform: transformTranslatePricing },
  { id: 'apigateway', name: 'API Gateway', transform: transformAPIGatewayPricing },
  { id: 'ecs', name: 'ECS', transform: transformECSPricing },
  { id: 'eks', name: 'EKS', transform: transformEKSPricing },
  { id: 'redshift', name: 'Redshift', transform: transformRedshiftPricing },
  { id: 'dynamodb', name: 'DynamoDB', transform: transformDynamoDBPricing },
  { id: 'sns', name: 'SNS', transform: transformSNSPricing },
];

async function transformPricing() {
  console.log('Transforming pricing data...\n');

  let successCount = 0;
  let failCount = 0;

  for (const service of serviceTransforms) {
    try {
      const rawData = require(join(PRICING_DIR, `${service.id}.json`));
      const transformed = service.transform(rawData);

      saveData(transformed, {
        outputPath: join(PRICING_DIR, `${service.id}-transformed.json`),
        format: 'json',
        pretty: false // Smaller file size
      });

      console.log(`✓ Transformed ${service.name}: ${transformed.length} entries`);
      successCount++;
    } catch (error) {
      console.warn(`⚠ ${service.name} transform failed:`, error instanceof Error ? error.message : error);
      failCount++;
    }
  }

  console.log(`\n✓ Transformed ${successCount} services successfully`);
  if (failCount > 0) {
    console.log(`⚠ ${failCount} services failed to transform`);
  }

  // Write/update metadata for last transform time
  try {
    const metadataPath = join(PRICING_DIR, 'metadata.json');
    const nowIso = new Date().toISOString();
    let metadata: any = {};
    try {
      metadata = require(metadataPath);
    } catch {}
    metadata.lastTransformAt = nowIso;
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
    console.log(`\n🕒 Updated metadata: lastTransformAt=${nowIso}`);
  } catch (e) {
    console.warn('Could not write pricing metadata.json:', e);
  }
}

transformPricing().catch((error) => {
  console.error('Error transforming pricing:', error);
  process.exit(1);
});

