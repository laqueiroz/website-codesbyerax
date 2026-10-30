import type { NextConfig } from "next";

import { cspHeader } from "./src/lib/csp";

/**
 * Security headers applied to every response.
 * The CSP lives in src/lib/csp.ts so the static export can ship it as a
 * <meta> tag too (GitHub Pages ignores these headers).
 * NOTE: headers() has no effect on the static GitHub Pages export.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: cspHeader },
];

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === "1" ? "export" : undefined,
  trailingSlash: process.env.STATIC_EXPORT === "1",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    cpus: 2,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.STATIC_EXPORT === "1",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
