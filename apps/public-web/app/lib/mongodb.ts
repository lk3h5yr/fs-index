import fs from 'fs';
import path from 'path';
import { MongoClient, type Db } from 'mongodb';

/**
 * Server-side only。在本機 / Vercel 設定 MONGODB_URI，勿提交密碼到 Git。
 * 務必「每次」從 process.env 讀取：避免模組載入早於 next.config が .env を読み込むと uri が undefined のまま固定される。
 */

let clientPromise: Promise<MongoClient> | null = null;
let envLoaded = false;

function loadLocalEnvFallback(): void {
  if (envLoaded || process.env.MONGODB_URI) return;
  envLoaded = true;

  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '../../.env'),
    path.resolve(process.cwd(), 'apps/public-web/.env'),
  ];

  for (const filePath of candidates) {
    if (!fs.existsSync(filePath)) continue;

    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

function getMongoUri(): string | undefined {
  loadLocalEnvFallback();
  return process.env.MONGODB_URI?.trim();
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = getMongoUri();
  if (!uri) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        '[mongodb] MONGODB_URI が未設定です。ルート .env または apps/public-web/.env に設定し、dev サーバーを再起動してください。',
      );
    }
    return Promise.reject(new Error('MONGODB_URI is not set'));
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb(name?: string): Promise<Db> {
  const c = await getMongoClient();
  return c.db(name ?? process.env.MONGODB_DB_NAME ?? 'forestsoft');
}
