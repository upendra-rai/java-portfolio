import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/java-portfolio',
  trailingSlash: false,
  output: 'standalone',
}

export default nextConfig
