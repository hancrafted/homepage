#!/usr/bin/env node
import { App } from "aws-cdk-lib";

import { loadDeploymentConfig } from "../lib/config";
import { HomepageDeploymentStack } from "../lib/homepage-deployment-stack";

const app = new App();
const deploymentConfig = loadDeploymentConfig(app);

new HomepageDeploymentStack(app, deploymentConfig.stackName, {
  description:
    "Low-cost CloudFront + S3 marketing site hosting and streaming Lambda chat backend for the Han Che homepage.",
  env: deploymentConfig.env,
  deploymentConfig,
});