import { NextResponse } from 'next/server';
import { listPublishedCmsNews } from '@/app/lib/cmsNews';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function parseLimit(searchParams: URLSearchParams): number | undefined {
  const raw = searchParams.get('limit');
  if (raw == null || raw === '') return undefined;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return Math.min(Math.floor(n), 200);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const items = await listPublishedCmsNews(parseLimit(searchParams));
    return NextResponse.json(
      { items },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'サービスが一時的に利用できません。', items: [] },
      { status: 503 },
    );
  }
}
