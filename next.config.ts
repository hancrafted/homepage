import type { NextConfig } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/homepage' : '');

function getTransitionStyleFromConfig(): string {
  try {
    const configPath = path.join(process.cwd(), 'src/config.yaml');
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf8');
      const match = raw.match(/^\s*transition_style\s*:\s*([a-zA-Z0-9_-]+)/m);
      if (match?.[1]) {
        return match[1].trim().toLowerCase();
      }
    }
  } catch (error) {
    console.warn('[config.yaml] Could not read transition_style:', error);
  }
  return 'liquid';
}

const transitionStyle = getTransitionStyleFromConfig();

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_TRANSITION_STYLE: transitionStyle,
  },
};

export default nextConfig;
