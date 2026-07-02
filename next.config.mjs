/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@headlessui/react"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Fix: /contact (lowercase) → /Contact (actual folder name on server)
      {
        source: "/contact",
        destination: "/Contact",
        permanent: false,
      },
      // Fix: /contact-us → /Contact
      {
        source: "/contact-us",
        destination: "/Contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
