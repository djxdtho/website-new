import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  basePath: "/website-new",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/website-new",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
