import StatCard from '@/app/components/admin/StatCard';
import DashboardPaginationNav from '@/app/components/admin/DashboardPaginationNav';
import {
  emptyAdminDashboardSnapshot,
  loadAdminDashboardSnapshot,
  parseDashboardPageParam,
} from '@/app/lib/adminDashboardData';

type SearchParamsLike = {
  newsPage?: string;
  casesPage?: string;
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParamsLike;
}) {
  let snap = emptyAdminDashboardSnapshot();
  let loadError: string | null = null;
  try {
    snap = await loadAdminDashboardSnapshot({
      newsPage: parseDashboardPageParam(searchParams.newsPage),
      casesPage: parseDashboardPageParam(searchParams.casesPage),
    });
  } catch (e) {
    console.error(e);
    loadError = 'データベースの読み込みに失敗しました。環境変数と接続を確認してください。';
  }

  const stats = [
    {
      label: 'お知らせ件数',
      value: String(snap.newsTotal),
      delta: `公開 ${snap.newsPublishedCount} 件・編集中 ${snap.newsDraftCount} 件`,
      icon: 'newspaper' as const,
    },
    {
      label: '開発事例',
      value: String(snap.casesTotal),
      delta:
        snap.casesUpdatedThisMonthCount > 0
          ? `今月更新 ${snap.casesUpdatedThisMonthCount} 件 · 公開 ${snap.casesPublishedCount} · 編集中 ${snap.casesDraftCount}`
          : `公開 ${snap.casesPublishedCount} 件・編集中 ${snap.casesDraftCount} 件`,
      icon: 'briefcase' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">ダッシュボード</h1>
      </div>

      {loadError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.9fr] xl:items-stretch">
        <section className="flex flex-col overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-fs-card">
          <div className="flex shrink-0 items-center justify-between border-b border-[#1e3a5f]/10 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-950">最近のお知らせ</h2>
            <span className="text-sm font-medium text-[#1e3a5f]">全 {snap.newsTotal} 件</span>
          </div>
          <div className="flex min-h-[12rem] flex-1 flex-col">
            <div className="flex-1 divide-y divide-slate-100">
              {snap.recentNews.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-slate-500">
                  お知らせはまだ登録されていません。
                </div>
              ) : (
                snap.recentNews.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-1 px-6 py-4 text-sm md:grid-cols-[1fr_auto_auto] md:items-center"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.category}</p>
                    </div>
                    <span className="text-slate-500">{item.date}</span>
                    <span
                      className={
                        item.status === '公開'
                          ? 'text-emerald-600 md:text-right'
                          : 'text-amber-600 md:text-right'
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
            <DashboardPaginationNav
              aria-label="お知らせ一覧のページ"
              currentPage={snap.newsPage}
              totalPages={snap.newsTotalPages}
              totalItems={snap.newsTotal}
              pageSize={snap.listPageSize}
              newsPageFixed={snap.newsPage}
              casesPageFixed={snap.casesPage}
              pageParam="newsPage"
            />
          </div>
        </section>

        <section className="flex flex-col overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-fs-card">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#1e3a5f]/10 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-950">開発事例プレビュー</h2>
            <span className="text-xs font-medium text-[#1e3a5f]/80">全 {snap.casesTotal} 件</span>
          </div>
          <div className="flex min-h-[12rem] flex-1 flex-col px-6 pb-0 pt-6">
            {snap.recentCases.length === 0 ? (
              <p className="flex-1 pb-6 text-center text-sm text-slate-500">
                開発事例はまだ登録されていません。
              </p>
            ) : (
              <ul className="flex-1 space-y-4 pb-4">
                {snap.recentCases.map((c) => (
                  <li key={c.id} className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#1e3a5f]/80">
                      {c.category}
                    </p>
                    <p className="mt-1 font-medium text-slate-900">{c.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">{c.summary || '—'}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mx-[-1.5rem] mt-auto shrink-0">
              <DashboardPaginationNav
                aria-label="開発事例一覧のページ"
                currentPage={snap.casesPage}
                totalPages={snap.casesTotalPages}
                totalItems={snap.casesTotal}
                pageSize={snap.listPageSize}
                newsPageFixed={snap.newsPage}
                casesPageFixed={snap.casesPage}
                pageParam="casesPage"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
