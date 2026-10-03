import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Add your image CDN / storage bucket here once real crop photos are uploaded.
    remotePatterns: [],
  },
};

export default nextConfig;
