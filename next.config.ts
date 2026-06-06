import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  basePath: "/website-new",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/website-new",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
