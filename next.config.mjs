/** @type {import('next').NextConfig} */

import { withPlausibleProxy } from 'next-plausible';

const nextConfig = withPlausibleProxy()({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnails-to-review.s3.us-east-1.amazonaws.com',
      },
    ],
  },
});

export default nextConfig;
