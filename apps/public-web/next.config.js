const path = require('path');
const { loadEnvConfig } = require('@next/env');

// 先載入 monorepo 根目錄 .env，再載入 apps/public-web（覆寫用）
const repoRoot = path.join(__dirname, '../..');
const appRoot = __dirname;
loadEnvConfig(repoRoot);
loadEnvConfig(appRoot);


/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * 注意：不要把 Next 自己的 Route Handler（例：/api/admin/*）全部轉走。
   * 僅在設定 API_URL 時，將聯絡表單等既有後端路徑轉發到外部 Nest/其他服務。
   */
  async rewrites() {
    const apiBase = process.env.API_URL?.trim();
    if (!apiBase) {
      return [];
    }
    return [
      {
        source: '/api/tickets',
        destination: `${apiBase}/api/tickets`,
      },
      {
        source: '/api/tickets/:path*',
        destination: `${apiBase}/api/tickets/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
