import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Bundle a minimal self-contained server (.next/standalone/server.js) so the
  // app can run on cPanel/Node hosting without shipping all of node_modules.
  output: "standalone",

  // Pin the workspace root — a stray lockfile in the home directory
  // otherwise makes Turbopack infer the wrong root.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // Serve images as-is: shared hosting often can't build sharp (a native
    // module), which the optimizer needs. This trades per-device resizing for
    // "it just works everywhere". Source images are already sensibly sized.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Product photography is content-addressed by name and never edited.
        source: "/collagen/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
