/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Ignore punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
  output: 'standalone',
  // Enable static compression
  compress: true,
  // Add trailing slash handling
  trailingSlash: false,
  // Disable powered by header
  poweredByHeader: false,
  // Add production specific settings
  distDir: '.next',
  reactStrictMode: true,
  // Configure API routes
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`
      }
    ]
  },
  // File tracing configuration
  outputFileTracingRoot: process.env.NODE_ENV === "production" 
    ? process.platform === "win32" 
      ? process.cwd()
      : "/opt/render/project/src/frontend" 
    : undefined,
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  }
};

module.exports = nextConfig;
