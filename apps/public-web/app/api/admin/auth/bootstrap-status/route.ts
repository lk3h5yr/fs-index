import { NextResponse } from 'next/server';
import { getAdminUsersCollection } from '@/app/lib/adminUsers';

export const runtime = 'nodejs';

/** GET: 初回セットアップが必要か（管理者0件か） */
export async function GET() {
  try {
    const col = await getAdminUsersCollection();
    const count = await col.countDocuments();
    return NextResponse.json({ needsBootstrap: count === 0 });
  } catch {
    return NextResponse.json({ needsBootstrap: false, dbError: true });
  }
}
