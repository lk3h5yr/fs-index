import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  adminUserPublic,
  getAdminUsersCollection,
  storedEmailMatchesLoginPlain,
  type AdminUserDoc,
  type AdminPermissions,
} from '@/app/lib/adminUsers';

export const runtime = 'nodejs';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  const { id } = params;
  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: '無効なIDです。' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : undefined;
    const password = typeof body.password === 'string' ? body.password : undefined;
    const permissions = body.permissions as AdminPermissions | undefined;
    const emailPlainBody = body.emailPlain;

    const col = await getAdminUsersCollection();
    const target = await col.findOne({ _id: oid });
    if (!target) {
      return NextResponse.json({ error: 'ユーザーが見つかりません。' }, { status: 404 });
    }

    const update: Record<string, unknown> = {};
    if (name !== undefined) {
      if (name.length === 0) {
        return NextResponse.json({ error: '名前を入力してください。' }, { status: 400 });
      }
      update.name = name;
    }
    if (password !== undefined && password.length > 0) {
      if (password.length < 8) {
        return NextResponse.json({ error: 'パスワードは8文字以上にしてください。' }, { status: 400 });
      }
      update.password = await bcrypt.hash(password, 10);
      if (target.passwordHash) {
        update.passwordHash = '';
      }
    }
    if (permissions !== undefined) {
      if (typeof permissions.admin === 'boolean' && typeof permissions.editor === 'boolean') {
        update.permissions = permissions;
      }
    }
    if (emailPlainBody !== undefined) {
      const trimmed =
        typeof emailPlainBody === 'string' ? emailPlainBody.trim().toLowerCase() : '';
      if (trimmed) {
        if (!storedEmailMatchesLoginPlain(target as AdminUserDoc, trimmed)) {
          return NextResponse.json(
            { error: 'このメールは該当アカウントのログイン情報と一致しません。' },
            { status: 400 },
          );
        }
        update.emailPlain = trimmed;
      }
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: '変更内容がありません。' }, { status: 400 });
    }

    await col.updateOne({ _id: oid }, { $set: update });
    const next = await col.findOne({ _id: oid });
    if (!next) {
      return NextResponse.json({ error: '更新後の取得に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ user: adminUserPublic(next as AdminUserDoc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  let oid: ObjectId;
  try {
    oid = new ObjectId(params.id);
  } catch {
    return NextResponse.json({ error: '無効なIDです。' }, { status: 400 });
  }

  if (oid.toString() === session.sub) {
    return NextResponse.json({ error: 'ログイン中の自分自身は削除できません。' }, { status: 403 });
  }

  try {
    const col = await getAdminUsersCollection();
    const total = await col.countDocuments({});
    if (total <= 1) {
      return NextResponse.json({ error: '最後の管理者アカウントは削除できません。' }, { status: 403 });
    }

    const r = await col.deleteOne({ _id: oid });
    if (r.deletedCount === 0) {
      return NextResponse.json({ error: 'ユーザーが見つかりません。' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}
