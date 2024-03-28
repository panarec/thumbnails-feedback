/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbnails-to-review.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
