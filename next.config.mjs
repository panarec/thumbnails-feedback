/** @type {import('next').NextConfig} */

import { withPlausibleProxy } from 'next-plausible';

const nextConfig = withPlausibleProxy()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.S3_HOSTNAME,
      },
    ],
  },
});

export default nextConfig;
