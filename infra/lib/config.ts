import { existsSync } from "node:fs";
import path from "node:path";

import type { App, Environment } from "aws-cdk-lib";

export type DeploymentConfig = {
  stackName: string;
  deploymentStage: string;
  env?: Environment;
  siteUrl: string;
  siteAliases: string[];
  certificateArn?: string;
  siteAssetPath: string;
  chatLambdaAssetPath: string;
  chatAllowedOrigins: string[];
  chatProvider: string;
};

const DEFAULT_STACK_NAME = "HanCheHomepageReview";
const DEFAULT_SITE_ASSET_PATH = path.join("infra", "site-placeholder");
const DEFAULT_CHAT_LAMBDA_ASSET_PATH = path.join("infra", ".build", "chat-lambda");

export function loadDeploymentConfig(app: App): DeploymentConfig {
  const siteAliases = readListValue(app, "siteAliases", "SITE_ALIASES");
  const certificateArn = readStringValue(app, "certificateArn", "SITE_CERTIFICATE_ARN");

  if (siteAliases.length > 0 && !certificateArn) {
    throw new Error("SITE_CERTIFICATE_ARN is required when SITE_ALIASES are configured.");
  }

  const siteAssetPath = resolveExistingPath(
    readStringValue(app, "siteAssetPath", "SITE_ASSET_PATH", DEFAULT_SITE_ASSET_PATH),
    "siteAssetPath",
  );
  const chatLambdaAssetPath = resolveExistingPath(
    readStringValue(app, "chatLambdaAssetPath", "CHAT_LAMBDA_ASSET_PATH", DEFAULT_CHAT_LAMBDA_ASSET_PATH),
    "chatLambdaAssetPath",
  );
  const deploymentStage = readStringValue(app, "deploymentStage", "DEPLOYMENT_STAGE", "review") || "review";
  const stackName = readStringValue(app, "stackName", "CDK_STACK_NAME", DEFAULT_STACK_NAME) || DEFAULT_STACK_NAME;
  const siteUrl = readStringValue(
    app,
    "siteUrl",
    "NEXT_PUBLIC_SITE_URL",
    siteAliases[0] ? `https://${siteAliases[0]}` : "https://example.com",
  ) || "https://example.com";
  const chatAllowedOrigins = readListValue(app, "chatAllowedOrigins", "CHAT_ALLOWED_ORIGINS");
  const env = buildEnvironment();

  return {
    stackName,
    deploymentStage,
    env,
    siteUrl,
    siteAliases,
    certificateArn: certificateArn || undefined,
    siteAssetPath,
    chatLambdaAssetPath,
    chatAllowedOrigins:
      chatAllowedOrigins.length > 0
        ? chatAllowedOrigins
        : siteAliases.length > 0
          ? siteAliases.map((alias) => `https://${alias}`)
          : ["*"],
    chatProvider: readStringValue(app, "chatProvider", "AI_CHAT_PROVIDER", "mock") || "mock",
  };
}

function readStringValue(app: App, contextKey: string, envKey: string, fallback = "") {
  const contextValue = app.node.tryGetContext(contextKey);

  if (typeof contextValue === "string" && contextValue.trim().length > 0) {
    return contextValue.trim();
  }

  const envValue = process.env[envKey];
  return envValue?.trim() || fallback;
}

function readListValue(app: App, contextKey: string, envKey: string) {
  const contextValue = app.node.tryGetContext(contextKey);

  if (Array.isArray(contextValue)) {
    return normalizeList(contextValue);
  }

  if (typeof contextValue === "string") {
    return normalizeList(contextValue.split(","));
  }

  return normalizeList((process.env[envKey] || "").split(","));
}

function normalizeList(values: unknown[]) {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);
}

function buildEnvironment(): Environment | undefined {
  const account = process.env.CDK_DEFAULT_ACCOUNT;
  const region = process.env.CDK_DEFAULT_REGION;

  if (!account && !region) {
    return undefined;
  }

  return {
    account,
    region,
  };
}

function resolveExistingPath(inputPath: string, label: string) {
  const resolvedPath = path.resolve(inputPath);

  if (!existsSync(resolvedPath)) {
    throw new Error(`Configured ${label} does not exist: ${resolvedPath}`);
  }

  return resolvedPath;
}