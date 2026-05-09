import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  getCmsCasesCollection,
  serializeCaseForDetail,
  toAdminListItem,
  type CmsCaseDoc,
  type CmsCaseStatus,
} from '@/app/lib/cmsCases';
import {
  deliveredMonthInputToUtcDate,
  isCmsCaseCategory,
  parseTechStackInput,
  type CmsCaseCategory,
} from '@/app/lib/cmsCasesShared';

export const runtime = 'nodejs';

const categorySchema = z.custom<CmsCaseCategory>(
  (v) => typeof v === 'string' && isCmsCaseCategory(v),
  { message: 'category' },
);
const statusSchema = z.enum(['published', 'draft']);
const techInputSchema = z.union([z.array(z.string()), z.string()]).optional();

const patchBodySchema = z
  .object({
    title: z.string().min(1).max(500).optional(),
    category: categorySchema.optional(),
    client: z.string().max(2000).optional(),
    deliveredMonth: z.string().min(1).optional(),
    benefits: z.string().max(20000).optional(),
    detail: z.string().max(200000).optional(),
    tech: techInputSchema,
    status: statusSchema.optional(),
  })
  .refine((o) => Object.keys(o).length > 0, { message: 'empty' });

function normalizeTech(t: unknown): string[] {
  if (Array.isArray(t)) {
    return t.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof t === 'string') {
    return parseTechStackInput(t);
  }
  return [];
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
    const col = await getCmsCasesCollection();
    const doc = await col.findOne({ _id: oid });
    if (!doc) {
      return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    }
    return NextResponse.json({ item: serializeCaseForDetail(doc as CmsCaseDoc) });
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

    const col = await getCmsCasesCollection();
    const target = await col.findOne({ _id: oid });
    if (!target) {
      return NextResponse.json({ error: '見つかりません。' }, { status: 404 });
    }

    const update: Record<string, unknown> = { updatedAt: new Date() };
    const p = parsed.data;
    if (p.title !== undefined) update.title = p.title.trim();
    if (p.category !== undefined) update.category = p.category;
    if (p.client !== undefined) update.client = p.client.trim();
    if (p.benefits !== undefined) update.benefits = p.benefits;
    if (p.detail !== undefined) update.detail = p.detail;
    if (p.status !== undefined) update.status = p.status as CmsCaseStatus;
    if (p.tech !== undefined) update.tech = normalizeTech(p.tech);
    if (p.deliveredMonth !== undefined) {
      try {
        update.deliveredAt = deliveredMonthInputToUtcDate(p.deliveredMonth);
      } catch {
        return NextResponse.json({ error: '納品月の形式が正しくありません。' }, { status: 400 });
      }
    }

    await col.updateOne({ _id: oid }, { $set: update, $unset: { description: '' } });
    const next = await col.findOne({ _id: oid });
    if (!next) {
      return NextResponse.json({ error: '更新後の取得に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ item: toAdminListItem(next as CmsCaseDoc) });
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
    const col = await getCmsCasesCollection();
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
