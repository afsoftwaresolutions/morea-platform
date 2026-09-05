import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  allowedDevOrigins: [
    "192.168.1.30",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.core.windows.net",
      },
    ],
  },

};

export default nextConfig;
