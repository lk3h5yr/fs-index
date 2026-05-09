import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  adminSessionCookieOptions,
  signAdminToken,
} from '@/app/lib/adminSession';
import {
  findAdminForLogin,
  getAdminUsersCollection,
  verifyAdminPassword,
} from '@/app/lib/adminUsers';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailPlain = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!emailPlain || !password) {
      return NextResponse.json({ error: 'メールアドレスとパスワードを入力してください。' }, { status: 400 });
    }

    const user = await findAdminForLogin(emailPlain);
    if (!user || !(await verifyAdminPassword(user, password))) {
      return NextResponse.json({ error: 'ログインに失敗しました。' }, { status: 401 });
    }

    const perms = user.permissions ?? { admin: false, editor: false };
    if (!perms.admin && !perms.editor) {
      return NextResponse.json({ error: 'アクセス権限がありません。' }, { status: 403 });
    }

    const col = await getAdminUsersCollection();
    await col.updateOne({ _id: user._id }, {
      $push: { lastLoginAt: new Date() },
    } as never);

    const token = await signAdminToken({
      sub: user._id.toString(),
      email: emailPlain,
      name: user.name,
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, adminSessionCookieOptions(60 * 60 * 24 * 7));
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
