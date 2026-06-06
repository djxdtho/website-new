import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  basePath: "/website-new",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
