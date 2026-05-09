import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  getCmsNewsCollection,
  serializeNewsForDetail,
  toAdminListItem,
  type CmsNewsDoc,
  type CmsNewsStatus,
} from '@/app/lib/cmsNews';

export const runtime = 'nodejs';

const categorySchema = z.enum(['経営', '製品・サービス', 'お知らせ', 'IR']);
const statusSchema = z.enum(['published', 'draft']);

const patchBodySchema = z
  .object({
    title: z.string().min(1).max(500).optional(),
    category: categorySchema.optional(),
    description: z.string().max(20000).optional(),
    body: z.string().max(200000).optional(),
    publishedAt: z.string().optional(),
    status: statusSchema.optional(),
  })
  .refine((o) => Object.keys(o).length > 0, { message: 'empty' });

function parsePublishedAt(input: string): Date {
  const d = new Date(input.trim());
  if (Number.isNaN(d.getTime())) throw new Error('invalid_date');
  return d;
}

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
    const col = await getCmsNewsCollection();
    const doc = await col.findOne({ _id: oid });
    if (!doc) {
      return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    }
    return NextResponse.json({ item: serializeNewsForDetail(doc as CmsNewsDoc) });
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
    const parsed = patchBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: '変更内容を確認してください。' }, { status: 400 });
    }

    const col = await getCmsNewsCollection();
    const target = await col.findOne({ _id: oid });
    if (!target) {
      return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    }

    const update: Record<string, unknown> = { updatedAt: new Date() };
    const p = parsed.data;
    if (p.title !== undefined) update.title = p.title.trim();
    if (p.category !== undefined) update.category = p.category;
    if (p.description !== undefined) update.description = p.description;
    if (p.body !== undefined) update.body = p.body;
    if (p.status !== undefined) update.status = p.status as CmsNewsStatus;
    if (p.publishedAt !== undefined) {
      try {
        update.publishedAt = parsePublishedAt(p.publishedAt);
      } catch {
        return NextResponse.json({ error: '日付の形式が正しくありません。' }, { status: 400 });
      }
    }

    await col.updateOne({ _id: oid }, { $set: update });
    const next = await col.findOne({ _id: oid });
    if (!next) {
      return NextResponse.json({ error: '更新後の取得に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ item: toAdminListItem(next as CmsNewsDoc) });
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
    const col = await getCmsNewsCollection();
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
