import { NextResponse } from 'next/server';
import { getAdminSession } from '@/app/lib/adminApiAuth';
import { getContactInquiriesCollection } from '@/app/lib/contactInquiry';

export const runtime = 'nodejs';

/** ヘッダー通知用・未読件数 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: '認証が必要です。' }, { status: 401 });
  }

  try {
    const col = await getContactInquiriesCollection();
    const unreadCount = await col.countDocuments({ read: false });
    return NextResponse.json({ unreadCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'データベースに接続できません。' }, { status: 500 });
  }
}
