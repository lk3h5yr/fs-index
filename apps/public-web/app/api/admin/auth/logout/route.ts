import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, adminSessionCookieOptions } from '@/app/lib/adminSession';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, '', adminSessionCookieOptions(0));
  return res;
}
