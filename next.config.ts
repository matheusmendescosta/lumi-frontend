import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone' as 'standalone' | 'export' | undefined,
};

export default nextConfig;
