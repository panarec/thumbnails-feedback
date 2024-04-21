/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require('next-plausible');

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
