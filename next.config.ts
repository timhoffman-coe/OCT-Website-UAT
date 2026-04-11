import type { NextConfig } from "next";
import { InjectManifest } from "workbox-webpack-plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.10.10.45'],
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://placehold.co; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://servicehealth-prod.edmonton.ca https://docs.google.com; frame-src https://maps.google.com https://www.google.com; manifest-src 'self' https://accounts.google.com https://iap.googleapis.com; frame-ancestors 'none';",
          },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://oct.edmonton.ca' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
  serverExternalPackages: [
    'pdf-parse',
    '@napi-rs/canvas',
    'google-auth-library',
    '@prisma/client',
    // OpenTelemetry SDK packages must be loaded at runtime, not bundled by
    // webpack. Bundling them traverses optional peer deps (winston, bunyan,
    // pino, gRPC) and either fails or emits noisy "Module not found" warnings.
    '@opentelemetry/api',
    '@opentelemetry/api-logs',
    '@opentelemetry/sdk-node',
    '@opentelemetry/sdk-logs',
    '@opentelemetry/sdk-metrics',
    '@opentelemetry/auto-instrumentations-node',
    '@opentelemetry/exporter-trace-otlp-http',
    '@opentelemetry/exporter-metrics-otlp-http',
    '@opentelemetry/exporter-logs-otlp-http',
    '@opentelemetry/resources',
    '@opentelemetry/semantic-conventions',
  ],
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new InjectManifest({
          swSrc: './app/sw.ts',
          swDest: '../public/sw.js',
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          exclude: [/\.map$/, /^manifest.*\.js$/, /middleware-build-manifest\.js$/, /middleware-manifest\.json$/],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
