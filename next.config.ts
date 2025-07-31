import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",  
        pathname: "**",  
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
