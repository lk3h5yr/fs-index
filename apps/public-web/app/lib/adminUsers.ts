import type { Collection, Db, Document, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { hashEmailForStorage } from '@/app/lib/adminEmailHash';
import { getDb } from '@/app/lib/mongodb';

export const ADMIN_USERS_COLLECTION = 'admin_users';

export type AdminPermissions = {
  admin: boolean;
  editor: boolean;
};

/** サンプルに合わせた管理者ドキュメント（email は SHA-256 十六進、一覧表示用に emailPlain を推奨） */
export type AdminUserDoc = Document & {
  _id: ObjectId;
  name: string;
  /** SHA-256 メールハッシュ、または移行用の平文メール */
  email: string;
  /** 管理画面一覧用の平文メール（ログイン照合は email のハッシュで行う） */
  emailPlain?: string | null;
  artistProfile: ObjectId | null;
  /** bcrypt ハッシュ */
  password: string;
  permissions: AdminPermissions;
  lastLoginAt: Date[];
  requireChangePassword: boolean;
  date: Date;
  __v?: number;
  passwordResetTokenHash?: string | null;
  passwordResetExpires?: Date | null;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getAdminUsersCollection(): Promise<Collection<AdminUserDoc>> {
  const db: Db = await getDb();
  return db.collection<AdminUserDoc>(ADMIN_USERS_COLLECTION);
}

export function buildNewAdminDoc(params: {
  name: string;
  emailPlain: string;
  passwordBcrypt: string;
  permissions?: AdminPermissions;
}): Omit<AdminUserDoc, '_id'> {
  const now = new Date();
  const normalized = params.emailPlain.trim().toLowerCase();
  return {
    name: params.name,
    email: hashEmailForStorage(normalized),
    emailPlain: normalized,
    artistProfile: null,
    password: params.passwordBcrypt,
    permissions: params.permissions ?? { admin: true, editor: true },
    lastLoginAt: [],
    requireChangePassword: false,
    date: now,
    __v: 0,
    passwordResetTokenHash: '',
    passwordResetExpires: null,
  };
}

function getPasswordHashField(u: AdminUserDoc): string | undefined {
  return u.password ?? u.passwordHash;
}

/** DB の email（ハッシュまたは平文移行）が、入力したログインメールと同一ユーザーか（一覧用 emailPlain を安全に設定するために使用） */
export function storedEmailMatchesLoginPlain(doc: AdminUserDoc, plainNormalized: string): boolean {
  const n = plainNormalized.trim().toLowerCase();
  if (!n) return false;
  return doc.email === hashEmailForStorage(n) || doc.email === n;
}

export async function findAdminForLogin(emailPlain: string): Promise<AdminUserDoc | null> {
  const col = await getAdminUsersCollection();
  const normalized = emailPlain.trim().toLowerCase();
  const hashed = hashEmailForStorage(normalized);
  let u = await col.findOne({ email: hashed });
  if (!u) {
    u = await col.findOne({ email: normalized });
  }
  return u as AdminUserDoc | null;
}

export function verifyAdminPassword(u: AdminUserDoc, plainPassword: string): Promise<boolean> {
  const stored = getPasswordHashField(u);
  if (!stored) return Promise.resolve(false);
  return bcrypt.compare(plainPassword, stored);
}

export type AdminUserPublic = {
  id: string;
  name: string;
  /** 一覧表示用（旧データで emailPlain が無い場合は空） */
  email: string;
  permissions: AdminPermissions;
  requireChangePassword: boolean;
  createdAt: string;
};

/** 一覧表示用メール（emailPlain が無く email がハッシュのみの場合は空） */
export function adminDisplayEmail(u: AdminUserDoc): string {
  const plain = typeof u.emailPlain === 'string' ? u.emailPlain.trim() : '';
  if (plain) return plain;
  const stored = typeof u.email === 'string' ? u.email.trim() : '';
  if (stored.includes('@')) return stored.toLowerCase();
  return '';
}

export function adminUserPublic(u: AdminUserDoc): AdminUserPublic {
  const created = u.date ?? u.createdAt ?? new Date(0);
  return {
    id: u._id.toString(),
    name: u.name,
    email: adminDisplayEmail(u),
    permissions: u.permissions ?? { admin: false, editor: false },
    requireChangePassword: u.requireChangePassword ?? false,
    createdAt: created instanceof Date ? created.toISOString() : String(created),
  };
}
