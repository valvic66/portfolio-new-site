/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
    loader: 'akamai',
    path: 'path',
  },
};

module.exports = nextConfig;
