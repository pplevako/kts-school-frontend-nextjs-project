import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school-strapi.ktsdev.ru",
        pathname: "/uploads/**"
      },
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
