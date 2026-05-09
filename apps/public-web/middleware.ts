import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, adminSessionCookieOptions } from '@/app/lib/adminSession';

const LOGIN = '/admin/login';

/**
 * Middleware は Edge で動くため `ADMIN_JWT_SECRET` が組み込み時に欠けることがあり
 * （monorepo ルートのみ .env など）。JWT 検証は Node の Route に任せる。
 */
async function hasValidAdminSession(request: NextRequest): Promise<boolean> {
  const cookie = request.headers.get('cookie');
  if (!cookie?.includes(`${ADMIN_COOKIE_NAME}=`)) {
    return false;
  }
  const verifyUrl = new URL('/api/admin/auth/me', request.nextUrl.origin);
  try {
    const res = await fetch(verifyUrl, {
      headers: { cookie },
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const hasCookie = cookieHeader.includes(`${ADMIN_COOKIE_NAME}=`);

  if (pathname === LOGIN) {
    if (!hasCookie) {
      return NextResponse.next();
    }
    if (await hasValidAdminSession(request)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    const res = NextResponse.next();
    res.cookies.set(ADMIN_COOKIE_NAME, '', adminSessionCookieOptions(0));
    return res;
  }

  if (!hasCookie) {
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!(await hasValidAdminSession(request))) {
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set('from', pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set(ADMIN_COOKIE_NAME, '', adminSessionCookieOptions(0));
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
