import Link from 'next/link';

export function dashboardListHref(opts: {
  newsPage: number;
  casesPage: number;
}): string {
  const q = new URLSearchParams();
  if (opts.newsPage > 1) q.set('newsPage', String(opts.newsPage));
  if (opts.casesPage > 1) q.set('casesPage', String(opts.casesPage));
  const s = q.toString();
  return s ? `/admin/dashboard?${s}` : '/admin/dashboard';
}

function rangeLabel(currentPage: number, pageSize: number, totalItems: number): string {
  if (totalItems <= 0) return '';
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);
  return `${from}–${to} 件 / 全 ${totalItems} 件`;
}

type DashboardPaginationNavProps = {
  'aria-label': string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  newsPageFixed: number;
  casesPageFixed: number;
  pageParam: 'newsPage' | 'casesPage';
};

export default function DashboardPaginationNav({
  'aria-label': ariaLabel,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  newsPageFixed,
  casesPageFixed,
  pageParam,
}: DashboardPaginationNavProps) {
  if (totalPages <= 1) return null;

  const mk = (p: number) =>
    dashboardListHref({
      newsPage: pageParam === 'newsPage' ? p : newsPageFixed,
      casesPage: pageParam === 'casesPage' ? p : casesPageFixed,
    });

  const prev = currentPage > 1;
  const next = currentPage < totalPages;
  const linkCls =
    'inline-flex items-center rounded-lg border border-[#1e3a5f]/20 px-3 py-1.5 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#1e3a5f]/5';
  const disabledCls = 'pointer-events-none opacity-35';

  const sliceText = rangeLabel(currentPage, pageSize, totalItems);

  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1e3a5f]/10 px-6 py-3"
    >
      <p className="text-xs text-slate-500">
        <span className="tabular-nums">{sliceText}</span>
        <span className="mx-1.5 text-slate-300">·</span>
        <span className="tabular-nums">{currentPage}</span>
        {' / '}
        <span className="tabular-nums">{totalPages}</span>
        <span className="ml-0.5">ページ</span>
      </p>
      <div className="flex items-center gap-2">
        {prev ? (
          <Link prefetch={false} href={mk(currentPage - 1)} className={linkCls}>
            前へ
          </Link>
        ) : (
          <span className={`${linkCls} ${disabledCls}`} aria-disabled>
            前へ
          </span>
        )}
        {next ? (
          <Link prefetch={false} href={mk(currentPage + 1)} className={linkCls}>
            次へ
          </Link>
        ) : (
          <span className={`${linkCls} ${disabledCls}`} aria-disabled>
            次へ
          </span>
        )}
      </div>
    </nav>
  );
}
