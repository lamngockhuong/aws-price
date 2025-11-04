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
import { transformAmplifyPricing } from '../lib/data/pricing/amplify';
import { transformAppstreamPricing } from '../lib/data/pricing/appstream';
import { transformAthenaPricing } from '../lib/data/pricing/athena';
import { transformBackupPricing } from '../lib/data/pricing/backup';
import { transformBedrockPricing } from '../lib/data/pricing/bedrock';
import { transformBraketPricing } from '../lib/data/pricing/braket';
import { transformBudgetsPricing } from '../lib/data/pricing/budgets';
import { transformChimePricing } from '../lib/data/pricing/chime';
import { transformCloudformationPricing } from '../lib/data/pricing/cloudformation';
import { transformCloudhsmPricing } from '../lib/data/pricing/cloudhsm';
import { transformCloudtrailPricing } from '../lib/data/pricing/cloudtrail';
import { transformCloudwatchPricing } from '../lib/data/pricing/cloudwatch';
import { transformCodeartifactPricing } from '../lib/data/pricing/codeartifact';
import { transformCodebuildPricing } from '../lib/data/pricing/codebuild';
import { transformCodecommitPricing } from '../lib/data/pricing/codecommit';
import { transformCodedeployPricing } from '../lib/data/pricing/codedeploy';
import { transformCodeguruPricing } from '../lib/data/pricing/codeguru';
import { transformCodepipelinePricing } from '../lib/data/pricing/codepipeline';
import { transformCodewhispererPricing } from '../lib/data/pricing/codewhisperer';
import { transformCognitoPricing } from '../lib/data/pricing/cognito';
import { transformComprehendPricing } from '../lib/data/pricing/comprehend';
import { transformConfigPricing } from '../lib/data/pricing/config';
import { transformConnectPricing } from '../lib/data/pricing/connect';
import { transformDatasyncPricing } from '../lib/data/pricing/datasync';
import { transformDeepracerPricing } from '../lib/data/pricing/deepracer';
import { transformDetectivePricing } from '../lib/data/pricing/detective';
import { transformEfsPricing } from '../lib/data/pricing/efs';
import { transformElasticachePricing } from '../lib/data/pricing/elasticache';
import { transformFinspacePricing } from '../lib/data/pricing/finspace';
import { transformForecastPricing } from '../lib/data/pricing/forecast';
import { transformFsxPricing } from '../lib/data/pricing/fsx';
import { transformGameliftPricing } from '../lib/data/pricing/gamelift';
import { transformGlacierPricing } from '../lib/data/pricing/glacier';
import { transformGluePricing } from '../lib/data/pricing/glue';
import { transformGreengrassPricing } from '../lib/data/pricing/greengrass';
import { transformGuarddutyPricing } from '../lib/data/pricing/guardduty';
import { transformInspectorPricing } from '../lib/data/pricing/inspector';
import { transformKendraPricing } from '../lib/data/pricing/kendra';
import { transformKinesisPricing } from '../lib/data/pricing/kinesis';
import { transformKmsPricing } from '../lib/data/pricing/kms';
import { transformLexPricing } from '../lib/data/pricing/lex';
import { transformLightsailPricing } from '../lib/data/pricing/lightsail';
import { transformMaciePricing } from '../lib/data/pricing/macie';
import { transformMediaconnectPricing } from '../lib/data/pricing/mediaconnect';
import { transformMskPricing } from '../lib/data/pricing/msk';
import { transformNeptunePricing } from '../lib/data/pricing/neptune';
import { transformPersonalizePricing } from '../lib/data/pricing/personalize';
import { transformPinpointPricing } from '../lib/data/pricing/pinpoint';
import { transformPollyPricing } from '../lib/data/pricing/polly';
import { transformQldbPricing } from '../lib/data/pricing/qldb';
import { transformQuicksightPricing } from '../lib/data/pricing/quicksight';
import { transformRekognitionPricing } from '../lib/data/pricing/rekognition';
import { transformRobomakerPricing } from '../lib/data/pricing/robomaker';
import { transformRoute53Pricing } from '../lib/data/pricing/route53';
import { transformSesPricing } from '../lib/data/pricing/ses';
import { transformShieldPricing } from '../lib/data/pricing/shield';
import { transformTextractPricing } from '../lib/data/pricing/textract';
import { transformTimestreamPricing } from '../lib/data/pricing/timestream';
import { transformTranscribePricing } from '../lib/data/pricing/transcribe';
import { transformVpcPricing } from '../lib/data/pricing/vpc';
import { transformWafPricing } from '../lib/data/pricing/waf';
import { transformWorkdocsPricing } from '../lib/data/pricing/workdocs';
import { transformWorkmailPricing } from '../lib/data/pricing/workmail';
import { transformWorkspacesPricing } from '../lib/data/pricing/workspaces';
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
  { id: 'amplify', name: 'Amplify', transform: transformAmplifyPricing },
  { id: 'appstream', name: 'Appstream', transform: transformAppstreamPricing },
  { id: 'athena', name: 'Athena', transform: transformAthenaPricing },
  { id: 'backup', name: 'Backup', transform: transformBackupPricing },
  { id: 'bedrock', name: 'Bedrock', transform: transformBedrockPricing },
  { id: 'braket', name: 'Braket', transform: transformBraketPricing },
  { id: 'budgets', name: 'Budgets', transform: transformBudgetsPricing },
  { id: 'chime', name: 'Chime', transform: transformChimePricing },
  { id: 'cloudformation', name: 'Cloudformation', transform: transformCloudformationPricing },
  { id: 'cloudhsm', name: 'Cloudhsm', transform: transformCloudhsmPricing },
  { id: 'cloudtrail', name: 'Cloudtrail', transform: transformCloudtrailPricing },
  { id: 'cloudwatch', name: 'Cloudwatch', transform: transformCloudwatchPricing },
  { id: 'codeartifact', name: 'Codeartifact', transform: transformCodeartifactPricing },
  { id: 'codebuild', name: 'Codebuild', transform: transformCodebuildPricing },
  { id: 'codecommit', name: 'Codecommit', transform: transformCodecommitPricing },
  { id: 'codedeploy', name: 'Codedeploy', transform: transformCodedeployPricing },
  { id: 'codeguru', name: 'Codeguru', transform: transformCodeguruPricing },
  { id: 'codepipeline', name: 'Codepipeline', transform: transformCodepipelinePricing },
  { id: 'codewhisperer', name: 'Codewhisperer', transform: transformCodewhispererPricing },
  { id: 'cognito', name: 'Cognito', transform: transformCognitoPricing },
  { id: 'comprehend', name: 'Comprehend', transform: transformComprehendPricing },
  { id: 'config', name: 'Config', transform: transformConfigPricing },
  { id: 'connect', name: 'Connect', transform: transformConnectPricing },
  { id: 'datasync', name: 'Datasync', transform: transformDatasyncPricing },
  { id: 'deepracer', name: 'Deepracer', transform: transformDeepracerPricing },
  { id: 'detective', name: 'Detective', transform: transformDetectivePricing },
  { id: 'efs', name: 'Efs', transform: transformEfsPricing },
  { id: 'elasticache', name: 'Elasticache', transform: transformElasticachePricing },
  { id: 'finspace', name: 'Finspace', transform: transformFinspacePricing },
  { id: 'forecast', name: 'Forecast', transform: transformForecastPricing },
  { id: 'fsx', name: 'Fsx', transform: transformFsxPricing },
  { id: 'gamelift', name: 'Gamelift', transform: transformGameliftPricing },
  { id: 'glacier', name: 'Glacier', transform: transformGlacierPricing },
  { id: 'glue', name: 'Glue', transform: transformGluePricing },
  { id: 'greengrass', name: 'Greengrass', transform: transformGreengrassPricing },
  { id: 'guardduty', name: 'Guardduty', transform: transformGuarddutyPricing },
  { id: 'inspector', name: 'Inspector', transform: transformInspectorPricing },
  { id: 'kendra', name: 'Kendra', transform: transformKendraPricing },
  { id: 'kinesis', name: 'Kinesis', transform: transformKinesisPricing },
  { id: 'kms', name: 'Kms', transform: transformKmsPricing },
  { id: 'lex', name: 'Lex', transform: transformLexPricing },
  { id: 'lightsail', name: 'Lightsail', transform: transformLightsailPricing },
  { id: 'macie', name: 'Macie', transform: transformMaciePricing },
  { id: 'mediaconnect', name: 'Mediaconnect', transform: transformMediaconnectPricing },
  { id: 'msk', name: 'Msk', transform: transformMskPricing },
  { id: 'neptune', name: 'Neptune', transform: transformNeptunePricing },
  { id: 'personalize', name: 'Personalize', transform: transformPersonalizePricing },
  { id: 'pinpoint', name: 'Pinpoint', transform: transformPinpointPricing },
  { id: 'polly', name: 'Polly', transform: transformPollyPricing },
  { id: 'qldb', name: 'Qldb', transform: transformQldbPricing },
  { id: 'quicksight', name: 'Quicksight', transform: transformQuicksightPricing },
  { id: 'rekognition', name: 'Rekognition', transform: transformRekognitionPricing },
  { id: 'robomaker', name: 'Robomaker', transform: transformRobomakerPricing },
  { id: 'route53', name: 'Route53', transform: transformRoute53Pricing },
  { id: 'ses', name: 'Ses', transform: transformSesPricing },
  { id: 'shield', name: 'Shield', transform: transformShieldPricing },
  { id: 'textract', name: 'Textract', transform: transformTextractPricing },
  { id: 'timestream', name: 'Timestream', transform: transformTimestreamPricing },
  { id: 'transcribe', name: 'Transcribe', transform: transformTranscribePricing },
  { id: 'vpc', name: 'Vpc', transform: transformVpcPricing },
  { id: 'waf', name: 'Waf', transform: transformWafPricing },
  { id: 'workdocs', name: 'Workdocs', transform: transformWorkdocsPricing },
  { id: 'workmail', name: 'Workmail', transform: transformWorkmailPricing },
  { id: 'workspaces', name: 'Workspaces', transform: transformWorkspacesPricing },
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

