/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.graphassets.com'],
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
