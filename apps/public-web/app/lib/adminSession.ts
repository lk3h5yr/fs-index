import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export const ADMIN_COOKIE_NAME = 'fs_admin_token';

/** ログイン応答／middleware で同一属性に揃える（HttpOnly 不一致だと削除に失敗し、無限に login に戻る原因になる） */
export function adminSessionCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/' as const,
    maxAge: maxAgeSec,
  };
}

function getJwtSecretKey(): Uint8Array {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s || s.length < 16) {
    throw new Error('ADMIN_JWT_SECRET must be set and at least 16 characters');
  }
  return new TextEncoder().encode(s);
}

export type AdminJwtPayload = JWTPayload & {
  email?: string;
  name?: string;
};

export async function signAdminToken(params: {
  sub: string;
  email: string;
  name: string;
}): Promise<string> {
  const key = getJwtSecretKey();
  return new SignJWT({ email: params.email, name: params.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(params.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload> {
  const key = getJwtSecretKey();
  const { payload } = await jwtVerify(token, key);
  return payload;
}
