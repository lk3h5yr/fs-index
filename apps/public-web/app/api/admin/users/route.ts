import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { hashEmailForStorage } from '@/app/lib/adminEmailHash';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  adminDisplayEmail,
  adminUserPublic,
  buildNewAdminDoc,
  getAdminUsersCollection,
  type AdminUserDoc,
  type AdminPermissions,
} from '@/app/lib/adminUsers';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  const col = await getAdminUsersCollection();
  const list = (await col.find({}).sort({ date: 1 }).toArray()) as AdminUserDoc[];

  for (const u of list) {
    if (adminDisplayEmail(u)) continue;
    if (u._id.toString() === session.sub && session.email.trim()) {
      const plain = session.email.trim().toLowerCase();
      await col.updateOne({ _id: u._id }, { $set: { emailPlain: plain } });
      u.emailPlain = plain;
    }
  }

  return NextResponse.json({
    users: list.map((u) => ({
      ...adminUserPublic(u),
      isSelf: u._id.toString() === session.sub,
    })),
  });}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const emailPlain = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const permissions = body.permissions as AdminPermissions | undefined;

    if (!emailPlain || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'メールと8文字以上のパスワードを入力してください。' },
        { status: 400 },
      );
    }

    const col = await getAdminUsersCollection();
    const hashed = hashEmailForStorage(emailPlain);
    const exists =
      (await col.findOne({ email: hashed })) ?? (await col.findOne({ email: emailPlain }));
    if (exists) {
      return NextResponse.json({ error: 'このメールアドレスは既に登録されています。' }, { status: 409 });
    }

    const passwordBcrypt = await bcrypt.hash(password, 10);
    const doc = buildNewAdminDoc({
      name: name || '管理者',
      emailPlain,
      passwordBcrypt,
      permissions: permissions ?? { admin: false, editor: true },
    });
    const r = await col.insertOne(doc as never);
    const created = await col.findOne({ _id: r.insertedId });
    if (!created) {
      return NextResponse.json({ error: '作成に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ user: adminUserPublic(created as AdminUserDoc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
