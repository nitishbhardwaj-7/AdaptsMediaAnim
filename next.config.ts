/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // @ts-expect-error - qualities is a valid config in Next.js 15+ but might lack TS definition in this version
    qualities: [70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'adaptsmedia.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
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