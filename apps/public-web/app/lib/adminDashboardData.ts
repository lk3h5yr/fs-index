import { getCmsNewsCollection, type CmsNewsDoc } from '@/app/lib/cmsNews';
import { getCmsCasesCollection, type CmsCaseDoc } from '@/app/lib/cmsCases';
import { statusToLabel } from '@/app/lib/cmsNewsShared';

/** 一覧（お知らせ・開発事例）のページあたり件数 */
export const DASHBOARD_LIST_PAGE_SIZE = 5;

export type DashboardNewsPreview = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: '公開' | '編集中';
};

export type DashboardCasePreview = {
  id: string;
  category: string;
  title: string;
  summary: string;
};

export type DashboardListQuery = {
  newsPage?: number;
  casesPage?: number;
};

export type AdminDashboardSnapshot = {
  newsTotal: number;
  newsDraftCount: number;
  newsPublishedCount: number;
  casesTotal: number;
  casesDraftCount: number;
  casesPublishedCount: number;
  casesUpdatedThisMonthCount: number;
  recentNews: DashboardNewsPreview[];
  recentCases: DashboardCasePreview[];
  newsPage: number;
  newsTotalPages: number;
  casesPage: number;
  casesTotalPages: number;
  listPageSize: number;
};

function startOfUtcMonth(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

function clampPositiveInt(raw: unknown, fallback: number): number {
  const n = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.floor(n);
}

/** クエリパラメータ `-page` を 1 以上に変換（不正・欠落時は 1） */
export function parseDashboardPageParam(raw: string | undefined): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

/** 管理ダッシュボード用（認証はルート／middleware 側で担保） */
export async function loadAdminDashboardSnapshot(
  query?: DashboardListQuery,
): Promise<AdminDashboardSnapshot> {
  const pageSize = DASHBOARD_LIST_PAGE_SIZE;

  const newsCol = await getCmsNewsCollection();
  const casesCol = await getCmsCasesCollection();

  const now = new Date();
  const monthStart = startOfUtcMonth(now);

  const [newsTotal, newsDraftCount, casesTotal, casesDraftCount, casesUpdatedThisMonthCount] =
    await Promise.all([
      newsCol.countDocuments({}),
      newsCol.countDocuments({ status: 'draft' }),
      casesCol.countDocuments({}),
      casesCol.countDocuments({ status: 'draft' }),
      casesCol.countDocuments({ updatedAt: { $gte: monthStart } }),
    ]);

  const newsTotalPages =
    newsTotal > 0 ? Math.ceil(newsTotal / pageSize) : 0;
  const casesTotalPages =
    casesTotal > 0 ? Math.ceil(casesTotal / pageSize) : 0;

  let newsPage = clampPositiveInt(query?.newsPage ?? 1, 1);
  let casesPage = clampPositiveInt(query?.casesPage ?? 1, 1);
  if (newsTotalPages > 0) newsPage = Math.min(newsPage, newsTotalPages);
  if (casesTotalPages > 0) casesPage = Math.min(casesPage, casesTotalPages);

  const newsSkip = (newsPage - 1) * pageSize;
  const casesSkip = (casesPage - 1) * pageSize;

  const newsPublishedCount = newsTotal - newsDraftCount;
  const casesPublishedCount = casesTotal - casesDraftCount;

  const [newsSlice, casesSlice] = await Promise.all([
    newsCol
      .find({})
      .sort({ publishedAt: -1, updatedAt: -1 })
      .skip(newsSkip)
      .limit(pageSize)
      .toArray(),
    casesCol
      .find({})
      .sort({ deliveredAt: -1, updatedAt: -1 })
      .skip(casesSkip)
      .limit(pageSize)
      .toArray(),
  ]);

  const recentNews: DashboardNewsPreview[] = (newsSlice as CmsNewsDoc[]).map((d) => {
    const pub = d.publishedAt instanceof Date ? d.publishedAt : new Date(String(d.publishedAt));
    const status = d.status === 'draft' ? 'draft' : 'published';
    return {
      id: d._id.toString(),
      title: typeof d.title === 'string' ? d.title : '',
      category: typeof d.category === 'string' ? d.category : '',
      date: Number.isNaN(pub.getTime()) ? '—' : pub.toLocaleDateString('ja-JP'),
      status: statusToLabel(status),
    };
  });

  const recentCases: DashboardCasePreview[] = (casesSlice as CmsCaseDoc[]).map((d) => ({
    id: d._id.toString(),
    category: typeof d.category === 'string' ? d.category : '',
    title: typeof d.title === 'string' ? d.title : '',
    summary:
      typeof d.detail === 'string' && d.detail.trim()
        ? d.detail.replace(/\s+/g, ' ').trim().slice(0, 160)
        : '',
  }));

  return {
    newsTotal,
    newsDraftCount,
    newsPublishedCount,
    casesTotal,
    casesDraftCount,
    casesPublishedCount,
    casesUpdatedThisMonthCount,
    recentNews,
    recentCases,
    newsPage,
    newsTotalPages,
    casesPage,
    casesTotalPages,
    listPageSize: pageSize,
  };
}

export function emptyAdminDashboardSnapshot(): AdminDashboardSnapshot {
  return {
    newsTotal: 0,
    newsDraftCount: 0,
    newsPublishedCount: 0,
    casesTotal: 0,
    casesDraftCount: 0,
    casesPublishedCount: 0,
    casesUpdatedThisMonthCount: 0,
    recentNews: [],
    recentCases: [],
    newsPage: 1,
    newsTotalPages: 0,
    casesPage: 1,
    casesTotalPages: 0,
    listPageSize: DASHBOARD_LIST_PAGE_SIZE,
  };
}
