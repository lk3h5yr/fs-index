import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  getContactInquiriesCollection,
  inquiryToAdminListItem,
  type ContactInquiryDoc,
} from '@/app/lib/contactInquiry';

export const runtime = 'nodejs';

const patchSchema = z
  .object({
    read: z.boolean().optional(),
  })
  .refine((o) => Object.keys(o).length > 0, { message: 'empty' });

export async function GET(_request: Request, { params }: { params: { id: string } }) {
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

  try {
    const col = await getContactInquiriesCollection();
    const doc = await col.findOne({ _id: oid });
    if (!doc) return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    const d = doc as ContactInquiryDoc;
    return NextResponse.json({
      item: {
        ...inquiryToAdminListItem(d),
        message: typeof d.message === 'string' ? d.message : '',
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

  try {
    const raw = await request.json();
    const parsed = patchSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: '変更内容を確認してください。' }, { status: 400 });
    }

    const col = await getContactInquiriesCollection();
    const exists = await col.findOne({ _id: oid });
    if (!exists) return NextResponse.json({ error: '見つかりません。' }, { status: 404 });

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (parsed.data.read !== undefined) update.read = parsed.data.read;

    await col.updateOne({ _id: oid }, { $set: update });
    const next = await col.findOne({ _id: oid });
    if (!next) return NextResponse.json({ error: '更新後の取得に失敗しました。' }, { status: 500 });

    return NextResponse.json({
      item: {
        ...inquiryToAdminListItem(next as ContactInquiryDoc),
        message: typeof (next as ContactInquiryDoc).message === 'string' ? (next as ContactInquiryDoc).message : '',
      },
    });
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

  try {
    const col = await getContactInquiriesCollection();
    const r = await col.deleteOne({ _id: oid });
    if (r.deletedCount === 0) {
      return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}
