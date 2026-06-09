/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [70, 75, 80, 85],
    remotePatterns: [
      {
        protocol: 'https',
        // The double asterisk '**' allows ANY subdomain (www, cdn, etc.)
        hostname: '**.adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;