import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/app/lib/adminSession';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    const payload = await verifyAdminToken(token);
    const sub = typeof payload.sub === 'string' ? payload.sub : '';
    if (!sub) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: sub,
        email: payload.email ?? '',
        name: payload.name ?? '',
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
