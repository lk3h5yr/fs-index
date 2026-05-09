import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getContactInquiriesCollection,
  inquiryToAdminListItem,
  type ContactInquiryDoc,
} from '@/app/lib/contactInquiry';
import { getAdminSession } from '@/app/lib/adminApiAuth';

export const runtime = 'nodejs';

const listQuerySchema = z.object({
  unreadOnly: z.enum(['1', '0']).optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(200),
  skip: z.coerce.number().int().min(0).max(10_000).optional().default(0),
});

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = listQuerySchema.safeParse({
    unreadOnly: searchParams.get('unreadOnly') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    skip: searchParams.get('skip') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'クエリが不正です。' }, { status: 400 });
  }

  const filter: Record<string, unknown> =
    parsed.data.unreadOnly === '1' ? { read: false } : {};

  try {
    const col = await getContactInquiriesCollection();
    const list = await col
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(parsed.data.skip)
      .limit(parsed.data.limit)
      .toArray();
    const items = list.map((d) => inquiryToAdminListItem(d as ContactInquiryDoc));
    const unreadCount = await col.countDocuments({ read: false });
    return NextResponse.json({ items, unreadCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}
