import { Fn, CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

import type { DeploymentConfig } from "./config";

type HomepageDeploymentStackProps = StackProps & {
  deploymentConfig: DeploymentConfig;
};

export class HomepageDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: HomepageDeploymentStackProps) {
    super(scope, id, props);

    const { deploymentConfig } = props;
    const localeRouter = new cloudfront.Function(this, "LocaleRouterFunction", {
      code: cloudfront.FunctionCode.fromInline(localeRouterFunctionCode),
      comment: "Redirect / to a locale and rewrite clean localized paths to index documents.",
      functionName: `${this.stackName}-locale-router`,
    });
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
    const chatFunction = new lambda.Function(this, "ChatFunction", {
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset(deploymentConfig.chatLambdaAssetPath),
      description: "Streaming chat backend for the multilingual marketing site.",
      environment: {
        AI_CHAT_PROVIDER: deploymentConfig.chatProvider,
        DEPLOYMENT_TARGET: "aws-cdk",
        NEXT_PUBLIC_SITE_URL: deploymentConfig.siteUrl,
      },
      handler: "infra/lambda/chat-handler.handler",
      memorySize: 512,
      runtime: lambda.Runtime.NODEJS_22_X,
      timeout: Duration.seconds(20),
    });
    const chatFunctionUrl = chatFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowCredentials: false,
        allowedHeaders: ["content-type"],
        allowedMethods: [lambda.HttpMethod.POST],
        allowedOrigins: deploymentConfig.chatAllowedOrigins,
        exposedHeaders: ["x-chat-adapter"],
        maxAge: Duration.days(1),
      },
      invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
    });
    const chatOriginDomain = Fn.select(2, Fn.split("/", chatFunctionUrl.url));
    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      additionalBehaviors: {
        "api/*": {
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          compress: true,
          origin: new origins.HttpOrigin(chatOriginDomain, {
            protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
            readTimeout: Duration.seconds(60),
          }),
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
      certificate: deploymentConfig.certificateArn
        ? acm.Certificate.fromCertificateArn(this, "SiteCertificate", deploymentConfig.certificateArn)
        : undefined,
      defaultBehavior: {
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: localeRouter,
          },
        ],
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      domainNames: deploymentConfig.siteAliases,
      enableIpv6: true,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    });

    new s3deploy.BucketDeployment(this, "DeploySiteAssets", {
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
      prune: true,
      sources: [s3deploy.Source.asset(deploymentConfig.siteAssetPath)],
    });

    new CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
    });
    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });
    new CfnOutput(this, "SiteBucketName", {
      value: siteBucket.bucketName,
    });
    new CfnOutput(this, "ChatFunctionUrl", {
      value: chatFunctionUrl.url,
    });
    new CfnOutput(this, "ConfiguredSiteAssetPath", {
      value: deploymentConfig.siteAssetPath,
    });
    new CfnOutput(this, "ConfiguredChatLambdaAssetPath", {
      value: deploymentConfig.chatLambdaAssetPath,
    });
  }
}

const localeRouterFunctionCode = [
  "function handler(event) {",
  "  var request = event.request;",
  "  var uri = request.uri || '/';",
  "  if (uri.startsWith('/api/') || uri.startsWith('/_next/') || uri.indexOf('.') !== -1) {",
  "    return request;",
  "  }",
  "  if (uri === '/') {",
  "    var locale = readCookieLocale(request.headers.cookie && request.headers.cookie.value) || detectLocale(request.headers['accept-language'] && request.headers['accept-language'].value);",
  "    return {",
  "      statusCode: 307,",
  "      statusDescription: 'Temporary Redirect',",
  "      headers: {",
  "        location: { value: '/' + locale },",
  "        'cache-control': { value: 'private, no-store' }",
  "      }",
  "    };",
  "  }",
  "  request.uri = uri.endsWith('/') ? uri + 'index.html' : uri + '/index.html';",
  "  return request;",
  "}",
  "function readCookieLocale(cookieHeader) {",
  "  if (!cookieHeader) { return ''; }",
  "  var cookies = cookieHeader.split(';');",
  "  for (var i = 0; i < cookies.length; i += 1) {",
  "    var parts = cookies[i].split('=');",
  "    var key = (parts[0] || '').trim();",
  "    var value = (parts[1] || '').trim();",
  "    if (key === 'preferred-locale' && (value === 'de' || value === 'en' || value === 'zh')) {",
  "      return value;",
  "    }",
  "  }",
  "  return '';",
  "}",
  "function detectLocale(acceptLanguage) {",
  "  var value = (acceptLanguage || '').toLowerCase();",
  "  if (value.indexOf('de') !== -1) { return 'de'; }",
  "  if (value.indexOf('zh') !== -1) { return 'zh'; }",
  "  if (value.indexOf('en') !== -1) { return 'en'; }",
  "  return 'en';",
  "}",
].join("\n");