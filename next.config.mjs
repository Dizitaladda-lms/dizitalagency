import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@headlessui/react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // 🛡️ Prevents Clickjacking attacks
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // 🛡️ Prevents MIME-sniffing exploits
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // 🛡️ Protects sensitive referrer data
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()", // 🛡️ Disables unused device APIs
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // 🛡️ Legacy XSS filtering
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.imgbb.com",
          },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
