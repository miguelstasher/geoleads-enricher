import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

// FORCE VERCEL DEPLOYMENT - 2025-10-22 15:36:56
// This change should trigger a new build
export const forceDeploy = true;
