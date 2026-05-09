import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  getCmsCasesCollection,
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

const createBodySchema = z.object({
  title: z.string().min(1).max(500),
  category: categorySchema,
  client: z.string().max(2000).optional().default(''),
  deliveredMonth: z.string().min(1),
  benefits: z.string().max(20000).optional().default(''),
  detail: z.string().max(200000).optional().default(''),
  tech: techInputSchema.default([]),
  status: statusSchema,
});

function normalizeTech(t: unknown): string[] {
  if (Array.isArray(t)) {
    return t.map((x) => String(x).trim()).filter(Boolean);
  }
  if (typeof t === 'string') {
    return parseTechStackInput(t);
  }
  return [];
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  try {
    const col = await getCmsCasesCollection();
    const list = await col.find({}).sort({ deliveredAt: -1, updatedAt: -1 }).toArray();
    return NextResponse.json({ items: list.map((d) => toAdminListItem(d as CmsCaseDoc)) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  try {
    const raw = await request.json();
    const parsed = createBodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json({ error: '入力内容を確認してください。' }, { status: 400 });
    }
    let deliveredAt: Date;
    try {
      deliveredAt = deliveredMonthInputToUtcDate(parsed.data.deliveredMonth);
    } catch {
      return NextResponse.json({ error: '納品月の形式が正しくありません。' }, { status: 400 });
    }

    const tech = normalizeTech(parsed.data.tech);
    const now = new Date();
    const doc = {
      title: parsed.data.title.trim(),
      category: parsed.data.category,
      client: parsed.data.client?.trim() ?? '',
      deliveredAt,
      benefits: parsed.data.benefits,
      detail: parsed.data.detail,
      tech,
      status: parsed.data.status as CmsCaseStatus,
      createdAt: now,
      updatedAt: now,
    };

    const col = await getCmsCasesCollection();
    const r = await col.insertOne(doc as never);
    const created = await col.findOne({ _id: r.insertedId });
    if (!created) {
      return NextResponse.json({ error: '作成に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ item: toAdminListItem(created as CmsCaseDoc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
