/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    appDir: true,
  },
  output: "standalone",
};

module.exports = nextConfig;
