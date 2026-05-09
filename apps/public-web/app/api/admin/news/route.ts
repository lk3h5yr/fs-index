import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import {
  getCmsNewsCollection,
  toAdminListItem,
  type CmsNewsDoc,
  type CmsNewsStatus,
} from '@/app/lib/cmsNews';

export const runtime = 'nodejs';

const categorySchema = z.enum(['経営', '製品・サービス', 'お知らせ', 'IR']);
const statusSchema = z.enum(['published', 'draft']);

const createBodySchema = z.object({
  title: z.string().min(1).max(500),
  category: categorySchema,
  description: z.string().max(20000).optional().default(''),
  body: z.string().max(200000).optional().default(''),
  publishedAt: z.string().optional(),
  status: statusSchema,
});

function parsePublishedAt(input: string | undefined): Date {
  if (!input?.trim()) return new Date();
  const d = new Date(input.trim());
  if (Number.isNaN(d.getTime())) {
    throw new Error('invalid_date');
  }
  return d;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  try {
    const col = await getCmsNewsCollection();
    const list = await col
      .find({})
      .sort({ publishedAt: -1, updatedAt: -1 })
      .toArray();
    return NextResponse.json({ items: list.map((d) => toAdminListItem(d as CmsNewsDoc)) });
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
    let publishedAt: Date;
    try {
      publishedAt = parsePublishedAt(parsed.data.publishedAt);
    } catch {
      return NextResponse.json({ error: '日付の形式が正しくありません。' }, { status: 400 });
    }

    const now = new Date();
    const doc = {
      title: parsed.data.title.trim(),
      category: parsed.data.category,
      description: parsed.data.description,
      body: parsed.data.body,
      publishedAt,
      status: parsed.data.status as CmsNewsStatus,
      createdAt: now,
      updatedAt: now,
    };

    const col = await getCmsNewsCollection();
    const r = await col.insertOne(doc as never);
    const created = await col.findOne({ _id: r.insertedId });
    if (!created) {
      return NextResponse.json({ error: '作成に失敗しました。' }, { status: 500 });
    }
    return NextResponse.json({ item: toAdminListItem(created as CmsNewsDoc) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
