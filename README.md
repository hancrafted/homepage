# homepage

Multilingual Next.js marketing site plus a streamed chat assistant for Han Che's startup coaching and consulting work.

## AWS CDK deployment path

This repo now includes a low-idle-cost AWS deployment layer under `infra/`.

### Chosen architecture

- `CloudFront` distribution as the public entrypoint
- Private `S3` bucket for the static localized site artifact
- Viewer-request `CloudFront Function` to:
  - redirect `/` to `/de`, `/en`, or `/zh` using the locale cookie / `Accept-Language`
  - rewrite clean localized paths like `/en/about` to `index.html` objects in S3
- Streaming `Lambda Function URL` behind CloudFront for `/api/*`
- Shared chat/domain logic stays in `src/lib/server/*`; AWS-specific code lives in `infra/*`

This keeps public-site idle cost near zero while preserving a serverless path for streamed chat responses.

### Repository structure

- `infra/bin/homepage.ts` — CDK app entrypoint
- `infra/lib/config.ts` — deploy-time config/env parsing
- `infra/lib/homepage-deployment-stack.ts` — CloudFront/S3/Lambda stack
- `infra/lambda/chat-handler.ts` — AWS streaming adapter that reuses shared chat logic
- `infra/site-placeholder/` — synth-safe placeholder site artifact for review builds
- `tsconfig.chat-lambda.json` — compiles the Lambda adapter bundle into `infra/.build/chat-lambda`

## Environment and config

The application already reads:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata
- `AI_CHAT_PROVIDER` — provider selector for the chat adapter (`mock` by default)

The CDK layer additionally supports:

- `CDK_STACK_NAME` — override stack name (`HanCheHomepageReview` by default)
- `DEPLOYMENT_STAGE` — label for the deployment stage (`review` by default)
- `SITE_ASSET_PATH` — path to the static site artifact to upload (defaults to `infra/site-placeholder`)
- `CHAT_LAMBDA_ASSET_PATH` — compiled Lambda asset path (defaults to `infra/.build/chat-lambda`)
- `SITE_ALIASES` — comma-separated CloudFront aliases/domains
- `SITE_CERTIFICATE_ARN` — ACM certificate ARN required when aliases are set
- `CHAT_ALLOWED_ORIGINS` — comma-separated CORS origins for the Function URL
- `CDK_DEFAULT_ACCOUNT` / `CDK_DEFAULT_REGION` — standard CDK target environment values

## Commands

Install dependencies with `pnpm`, then use:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `pnpm infra:build:chat-lambda`
- `pnpm infra:synth`

`pnpm infra:synth` runs `cdk synth` after compiling the Lambda asset.

## Reviewable deploy workflow

1. Build the app and prepare the deployable site artifact that should live in S3.
2. Point `SITE_ASSET_PATH` at that artifact directory.
3. Run `pnpm infra:synth` to review the generated CloudFormation.
4. When ready for a real AWS rollout, run `cdk bootstrap` / `cdk deploy` explicitly (not automated in this repo wave).

## Rollback / safety notes

- The site bucket uses `RemovalPolicy.RETAIN` so content is not destroyed automatically.
- The placeholder site artifact is intentionally non-production and exists only so `cdk synth` stays reviewable without a live deploy.
- Cloud-specific behavior is isolated to `infra/*`; the frontend still talks to `/api/chat` on the same origin, and CloudFront routes that path to the Lambda Function URL.
