import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Ensure images work correctly
  images: {
    unoptimized: false,
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable strict mode for better debugging
  reactStrictMode: true,

  // Ensure all pages are properly exported
  experimental: {
    // Helps with Railway deployment
  },
};

export default nextConfig;
