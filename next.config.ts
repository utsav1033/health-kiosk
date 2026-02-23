import type { NextConfig } from 'next';

/**
 * Next.js Configuration
 * Medical Diagnostic Kiosk - Production Setup
 *
 * Optimizations for performance, security, and kiosk deployment
 */

const nextConfig: NextConfig = {
  /**
   * ===== GENERAL CONFIGURATION =====
   */

  // React Strict Mode: Enables additional development checks
  // Helps identify potential issues with your components
  // Can be disabled in production if no issues are found
  reactStrictMode: true,

  /**
   * ===== IMAGE OPTIMIZATION =====
   */

  // Image optimization configuration
  images: {
    /**
     * unoptimized: true
     * Set to true if images are:
     * - Already optimized
     * - Static/embedded in the app (avatars, icons, logos)
     * - Not from dynamic sources
     *
     * Set to false for next/image optimization (default)
     * Allows responsive images, format conversion, caching
     */
    unoptimized: true,

    /**
     * Supported image formats for optimization
     * Only used if unoptimized is false
     */
    formats: ['image/avif', 'image/webp'],

    /**
     * Device sizes and static sizes for responsive images
     * Can be customized if needed for kiosk displays
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * ===== PERFORMANCE & OPTIMIZATION =====
   */

  // Compression: Gzip and Brotli compression for assets
  compress: true,

  /**
   * Link prefetching: Controls automatic prefetch behavior
   * Set to false for kiosk deployments where:
   * - Network bandwidth might be limited
   * - Automatic data prefetch is not needed
   * Set to true for regular web deployments
   */
  experimental: {
    // Enables optimized package imports
    optimizePackageImports: ['@mui/icons-material'],
  },

  /**
   * ===== HEADERS & SECURITY =====
   */

  // Response headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Prevent caching of dynamic content
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      // Static assets caching (longer TTL)
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /**
   * ===== REDIRECTS & REWRITES =====
   */

  // Redirect old URLs if needed (empty for now)
  async redirects() {
    return [];
  },

  // Rewrite URLs without changing browser URL (empty for now)
  async rewrites() {
    return [];
  },

  /**
   * ===== ENVIRONMENT & DEPLOYMENT =====
   */

  // Environment variables available to browser (public)
  env: {
    NEXT_PUBLIC_APP_NAME: 'YoloHealth Medical Diagnostic Kiosk',
    NEXT_PUBLIC_APP_VERSION: '1.0.0',
  },
};

export default nextConfig;
