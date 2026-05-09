import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/app/lib/adminSession';

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    const payload = await verifyAdminToken(token);
    const sub = typeof payload.sub === 'string' ? payload.sub : '';
    if (!sub) return null;
    return {
      sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      name: typeof payload.name === 'string' ? payload.name : '',
    };
  } catch {
    return null;
  }
}
