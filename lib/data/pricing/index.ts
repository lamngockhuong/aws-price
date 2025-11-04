import type { PricingEntry } from '../../types';

// Import pricing modules (uses pre-transformed data for fast loading)
// Existing services
import { ec2Pricing } from './ec2';
import { natgatewayPricing } from './natgateway';
import { s3Pricing } from './s3';
import { lambdaPricing } from './lambda';
import { cloudfrontPricing } from './cloudfront';
import { translatePricing } from './translate';
import { apigatewayPricing } from './apigateway';
import { ecsPricing } from './ecs';
import { eksPricing } from './eks';
import { redshiftPricing } from './redshift';
import { dynamodbPricing } from './dynamodb';
import { snsPricing } from './sns';

// New services (64 services)
import { amplifyPricing } from './amplify';
import { appstreamPricing } from './appstream';
import { athenaPricing } from './athena';
import { backupPricing } from './backup';
import { bedrockPricing } from './bedrock';
import { braketPricing } from './braket';
import { budgetsPricing } from './budgets';
import { chimePricing } from './chime';
import { cloudformationPricing } from './cloudformation';
import { cloudhsmPricing } from './cloudhsm';
import { cloudtrailPricing } from './cloudtrail';
import { cloudwatchPricing } from './cloudwatch';
import { codeartifactPricing } from './codeartifact';
import { codebuildPricing } from './codebuild';
import { codecommitPricing } from './codecommit';
import { codedeployPricing } from './codedeploy';
import { codeguruPricing } from './codeguru';
import { codepipelinePricing } from './codepipeline';
import { codewhispererPricing } from './codewhisperer';
import { cognitoPricing } from './cognito';
import { comprehendPricing } from './comprehend';
import { configPricing } from './config';
import { connectPricing } from './connect';
import { datasyncPricing } from './datasync';
import { deepracerPricing } from './deepracer';
import { detectivePricing } from './detective';
import { efsPricing } from './efs';
import { elasticachePricing } from './elasticache';
import { finspacePricing } from './finspace';
import { forecastPricing } from './forecast';
import { fsxPricing } from './fsx';
import { gameliftPricing } from './gamelift';
import { glacierPricing } from './glacier';
import { gluePricing } from './glue';
import { greengrassPricing } from './greengrass';
import { guarddutyPricing } from './guardduty';
import { inspectorPricing } from './inspector';
import { kendraPricing } from './kendra';
import { kinesisPricing } from './kinesis';
import { kmsPricing } from './kms';
import { lexPricing } from './lex';
import { lightsailPricing } from './lightsail';
import { maciePricing } from './macie';
import { mediaconnectPricing } from './mediaconnect';
import { mskPricing } from './msk';
import { neptunePricing } from './neptune';
import { personalizePricing } from './personalize';
import { pinpointPricing } from './pinpoint';
import { pollyPricing } from './polly';
import { qldbPricing } from './qldb';
import { quicksightPricing } from './quicksight';
import { rekognitionPricing } from './rekognition';
import { robomakerPricing } from './robomaker';
import { route53Pricing } from './route53';
import { sesPricing } from './ses';
import { shieldPricing } from './shield';
import { textractPricing } from './textract';
import { timestreamPricing } from './timestream';
import { transcribePricing } from './transcribe';
import { vpcPricing } from './vpc';
import { wafPricing } from './waf';
import { workdocsPricing } from './workdocs';
import { workmailPricing } from './workmail';
import { workspacesPricing } from './workspaces';

// Registry of all pricing data by service ID
const pricingRegistry: Record<string, PricingEntry[]> = {
  ec2: ec2Pricing,
  natgateway: natgatewayPricing,
  s3: s3Pricing,
  lambda: lambdaPricing,
  cloudfront: cloudfrontPricing,
  translate: translatePricing,
  apigateway: apigatewayPricing,
  ecs: ecsPricing,
  eks: eksPricing,
  redshift: redshiftPricing,
  dynamodb: dynamodbPricing,
  sns: snsPricing,
  amplify: amplifyPricing,
  appstream: appstreamPricing,
  athena: athenaPricing,
  backup: backupPricing,
  bedrock: bedrockPricing,
  braket: braketPricing,
  budgets: budgetsPricing,
  chime: chimePricing,
  cloudformation: cloudformationPricing,
  cloudhsm: cloudhsmPricing,
  cloudtrail: cloudtrailPricing,
  cloudwatch: cloudwatchPricing,
  codeartifact: codeartifactPricing,
  codebuild: codebuildPricing,
  codecommit: codecommitPricing,
  codedeploy: codedeployPricing,
  codeguru: codeguruPricing,
  codepipeline: codepipelinePricing,
  codewhisperer: codewhispererPricing,
  cognito: cognitoPricing,
  comprehend: comprehendPricing,
  config: configPricing,
  connect: connectPricing,
  datasync: datasyncPricing,
  deepracer: deepracerPricing,
  detective: detectivePricing,
  efs: efsPricing,
  elasticache: elasticachePricing,
  finspace: finspacePricing,
  forecast: forecastPricing,
  fsx: fsxPricing,
  gamelift: gameliftPricing,
  glacier: glacierPricing,
  glue: gluePricing,
  greengrass: greengrassPricing,
  guardduty: guarddutyPricing,
  inspector: inspectorPricing,
  kendra: kendraPricing,
  kinesis: kinesisPricing,
  kms: kmsPricing,
  lex: lexPricing,
  lightsail: lightsailPricing,
  macie: maciePricing,
  mediaconnect: mediaconnectPricing,
  msk: mskPricing,
  neptune: neptunePricing,
  personalize: personalizePricing,
  pinpoint: pinpointPricing,
  polly: pollyPricing,
  qldb: qldbPricing,
  quicksight: quicksightPricing,
  rekognition: rekognitionPricing,
  robomaker: robomakerPricing,
  route53: route53Pricing,
  ses: sesPricing,
  shield: shieldPricing,
  textract: textractPricing,
  timestream: timestreamPricing,
  transcribe: transcribePricing,
  vpc: vpcPricing,
  waf: wafPricing,
  workdocs: workdocsPricing,
  workmail: workmailPricing,
  workspaces: workspacesPricing,
};

export function getPricingByServiceId(serviceId: string): PricingEntry[] {
  return pricingRegistry[serviceId] || [];
}

export function getAllPricingServices(): string[] {
  return Object.keys(pricingRegistry);
}

export function filterPricingByRegion(pricing: PricingEntry[], region?: string): PricingEntry[] {
  if (!region) return pricing;
  return pricing.filter((entry) => entry.region === region);
}

export function getUniqueRegions(pricing: PricingEntry[]): string[] {
  const regions = pricing.map((entry) => entry.region);
  return Array.from(new Set(regions)).sort();
}

// Re-export for convenience
export {
  ec2Pricing,
  natgatewayPricing,
  s3Pricing,
  lambdaPricing,
  cloudfrontPricing,
  translatePricing,
  apigatewayPricing,
  ecsPricing,
  eksPricing,
  redshiftPricing,
  dynamodbPricing,
  snsPricing,
  amplifyPricing,
  appstreamPricing,
  athenaPricing,
  backupPricing,
  bedrockPricing,
  braketPricing,
  budgetsPricing,
  chimePricing,
  cloudformationPricing,
  cloudhsmPricing,
  cloudtrailPricing,
  cloudwatchPricing,
  codeartifactPricing,
  codebuildPricing,
  codecommitPricing,
  codedeployPricing,
  codeguruPricing,
  codepipelinePricing,
  codewhispererPricing,
  cognitoPricing,
  comprehendPricing,
  configPricing,
  connectPricing,
  datasyncPricing,
  deepracerPricing,
  detectivePricing,
  efsPricing,
  elasticachePricing,
  finspacePricing,
  forecastPricing,
  fsxPricing,
  gameliftPricing,
  glacierPricing,
  gluePricing,
  greengrassPricing,
  guarddutyPricing,
  inspectorPricing,
  kendraPricing,
  kinesisPricing,
  kmsPricing,
  lexPricing,
  lightsailPricing,
  maciePricing,
  mediaconnectPricing,
  mskPricing,
  neptunePricing,
  personalizePricing,
  pinpointPricing,
  pollyPricing,
  qldbPricing,
  quicksightPricing,
  rekognitionPricing,
  robomakerPricing,
  route53Pricing,
  sesPricing,
  shieldPricing,
  textractPricing,
  timestreamPricing,
  transcribePricing,
  vpcPricing,
  wafPricing,
  workdocsPricing,
  workmailPricing,
  workspacesPricing,
};

