import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  buildNewAdminDoc,
  getAdminUsersCollection,
} from '@/app/lib/adminUsers';

export const runtime = 'nodejs';

/** 管理者が0件のときのみ初回アカウントを作成（表示名はサーバー側で「総管理員」固定） */
export async function POST(request: Request) {
  try {
    const col = await getAdminUsersCollection();
    const count = await col.countDocuments();
    if (count > 0) {
      return NextResponse.json({ error: '既に管理者が登録されています。' }, { status: 403 });
    }

    const body = await request.json();
    const emailPlain = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!emailPlain || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'メールと8文字以上のパスワードを入力してください。' },
        { status: 400 },
      );
    }

    const passwordBcrypt = await bcrypt.hash(password, 10);
    const doc = buildNewAdminDoc({
      name: '総管理員',
      emailPlain,
      passwordBcrypt,
      permissions: { admin: true, editor: true },
    });
    await col.insertOne(doc as never);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '登録に失敗しました。' }, { status: 500 });
  }
}
