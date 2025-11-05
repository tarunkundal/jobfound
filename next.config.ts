import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // ✅ Tell Webpack how to handle Prisma-generated ESM files
    config.module.rules.push({
      test: /\.js$/,
      include: /src\/generated\/prisma/,
      type: "javascript/auto",
    });

    // ✅ Prevent Next.js from bundling the Prisma runtime incorrectly
    config.externals.push({
      "@prisma/client": "commonjs @prisma/client",
    });

    return config;
  },
};

export default nextConfig;
