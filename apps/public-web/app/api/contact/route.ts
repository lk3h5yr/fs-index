import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getContactInquiriesCollection } from '@/app/lib/contactInquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  name: z.string().trim().min(1, '名前を入力してください。').max(200),
  email: z.string().trim().email('有効なメールアドレスを入力してください。'),
  /** フォーム項目「お問い合わせ種別」 */
  subject: z.string().trim().min(1, 'お問い合わせ種別を選択してください。').max(120),
  message: z.string().trim().min(1, 'メッセージを入力してください。').max(30000),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        first.name?.[0] ||
        first.email?.[0] ||
        first.subject?.[0] ||
        first.message?.[0] ||
        '入力内容を確認してください。';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const now = new Date();
    const doc = {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      inquiryType: parsed.data.subject,
      message: parsed.data.message,
      read: false,
      createdAt: now,
      updatedAt: now,
    };

    const col = await getContactInquiriesCollection();
    await col.insertOne(doc as never);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: '送信処理に失敗しました。時間をおいて再度お試しください。' }, { status: 500 });
  }
}
