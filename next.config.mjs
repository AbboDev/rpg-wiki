/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@zenstackhq/runtime'],
  },
};

export default nextConfig;
