/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiBase = process.env.API_URL || 'http://localhost:3002';
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
