/**
 * 開発用: 管理者 1 件を admin_users に挿入（メール SHA-256 + bcrypt）
 * Usage: リポジトリルートで  npm run seed:admin
 */
import { createHash } from 'crypto';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env') });

function hashEmail(email) {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

const PLAIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@forestsoft.jp';
const PLAIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'FsIndex_Admin_2026';
const DISPLAY_NAME = process.env.SEED_ADMIN_NAME || '総管理員';
const EMAIL_PLAIN_STORED = PLAIN_EMAIL.trim().toLowerCase();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'forestsoft';

if (!uri) {
  console.error('MONGODB_URI が .env にありません。');
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db(dbName).collection('admin_users');

  const emailHash = hashEmail(EMAIL_PLAIN_STORED);
  const existing = await col.findOne({ email: emailHash });
  if (existing) {
    if (!existing.emailPlain) {
      await col.updateOne({ _id: existing._id }, { $set: { emailPlain: EMAIL_PLAIN_STORED } });
      console.log('既存管理者に一覧表示用の emailPlain を追加しました。');
    } else {
      console.log('既に同じメールハッシュの管理者がいます。スキップします。');
    }
    await client.close();
    return;
  }

  const password = await bcrypt.hash(PLAIN_PASSWORD, 10);
  const now = new Date();

  const doc = {
    name: DISPLAY_NAME,
    email: emailHash,
    emailPlain: EMAIL_PLAIN_STORED,
    artistProfile: null,
    password,
    permissions: { admin: true, editor: true },
    lastLoginAt: [],
    requireChangePassword: false,
    date: now,
    __v: 0,
    passwordResetTokenHash: '',
    passwordResetExpires: null,
  };

  await col.insertOne(doc);
  await client.close();

  console.log('管理者を追加しました。以下でログインできます（この内容は安全な場所に記録してください）');
  console.log(' メールアドレス:', PLAIN_EMAIL);
  console.log(' パスワード:', PLAIN_PASSWORD);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
