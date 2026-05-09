'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/app/components/admin/Icons';

type TopbarProps = {
  onOpenMenu: () => void;
};

type MeUser = { email: string; name: string };

type UnreadPeek = {
  id: string;
  name: string;
  inquiryType: string;
  createdAt: string;
  messagePreview: string;
};

const POLL_MS = 45_000;
/** お問い合わせベル一覧の 1 ページあたり件数 */
const PEEK_PAGE_SIZE = 8;

export default function Topbar({ onOpenMenu }: TopbarProps) {
  const router = useRouter();
  const [user, setUser] = useState<MeUser | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bellOpen, setBellOpen] = useState(false);
  const [peekLoading, setPeekLoading] = useState(false);
  const [peekItems, setPeekItems] = useState<UnreadPeek[]>([]);
  const [peekPage, setPeekPage] = useState(1);

  const bellWrapRef = useRef<HTMLDivElement>(null);

  const loadMe = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/auth/me', { credentials: 'include' });
      const data = await r.json();
      if (r.ok && data.user) {
        setUser({ email: data.user.email, name: data.user.name });
      }
    } catch {
      setUser(null);
    }
  }, []);

  const loadUnreadCount = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/contact-inquiries/unread-count', {
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await r.json();
      if (!r.ok) return;
      setUnreadCount(Number(data.unreadCount) || 0);
    } catch {
      /* 無視 */
    }
  }, []);

  const loadPeekUnread = useCallback(async (page: number) => {
    setPeekLoading(true);
    try {
      const skip = (page - 1) * PEEK_PAGE_SIZE;
      const qs = new URLSearchParams({
        unreadOnly: '1',
        limit: String(PEEK_PAGE_SIZE),
        skip: String(skip),
      });
      const r = await fetch(`/api/admin/contact-inquiries?${qs}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await r.json();
      if (!r.ok || !Array.isArray(data.items)) {
        setPeekItems([]);
        return;
      }
      setPeekItems(data.items);
      const total = Number(data.unreadCount) || 0;
      const maxPage = Math.max(1, Math.ceil(total / PEEK_PAGE_SIZE));
      if (page > maxPage && maxPage >= 1) {
        setPeekPage(maxPage);
      }
    } catch {
      setPeekItems([]);
    } finally {
      setPeekLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  useEffect(() => {
    loadUnreadCount();
    const id = window.setInterval(loadUnreadCount, POLL_MS);
    const refresh = () => loadUnreadCount();
    window.addEventListener('fs-admin-inquiries-update', refresh);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('fs-admin-inquiries-update', refresh);
    };
  }, [loadUnreadCount]);

  useEffect(() => {
    if (!bellOpen) return;
    loadPeekUnread(peekPage);
  }, [bellOpen, peekPage, loadPeekUnread]);

  useEffect(() => {
    if (!bellOpen) return;
    const tp = Math.max(1, Math.ceil(unreadCount / PEEK_PAGE_SIZE));
    if (peekPage > tp) setPeekPage(tp);
  }, [bellOpen, unreadCount, peekPage]);

  useEffect(() => {
    if (!bellOpen) return;
    if (!bellWrapRef.current) return;
    function onPointerDown(ev: MouseEvent) {
      const node = bellWrapRef.current;
      if (!node) return;
      if (!node.contains(ev.target as Node)) setBellOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [bellOpen]);

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace('/admin/login');
    router.refresh();
  }

  const displayName = user?.name || '管理者';
  const displayEmail = user?.email || '';
  const avatarLabel = displayName.slice(0, 1).toUpperCase();
  const unreadPeekTotalPages = Math.max(1, Math.ceil(unreadCount / PEEK_PAGE_SIZE));
  const showBellPeekPagerStrip =
    unreadCount > 0 && !peekLoading && unreadPeekTotalPages > 1;

  return (
    <header className="sticky top-0 z-10 border-b border-[#1e3a5f]/10 bg-fs-muted/90 px-5 py-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#1e3a5f]/15 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm lg:hidden"
        >
          <Icon name="menu" className="h-5 w-5" />
          メニュー
        </button>

        <div className="ml-auto flex items-center gap-4">
          <div ref={bellWrapRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setBellOpen((prev) => {
                  const next = !prev;
                  if (next) setPeekPage(1);
                  return next;
                })
              }
              className={`relative grid h-11 w-11 place-items-center rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-sm transition hover:text-[#1e3a5f] ${unreadCount > 0 ? 'text-[#1e3a5f]' : 'text-slate-600'}`}
              aria-label="お問い合わせ通知"
              aria-expanded={bellOpen}
            >
              <Icon name="bell" className="h-5 w-5" />
              {unreadCount > 0 ? (
                <>
                  <span className="absolute right-2 top-1.5 inline-flex min-h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-rose-600 px-[5px] text-[10px] font-bold leading-none text-white ring-2 ring-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                </>
              ) : (
                <span className="sr-only">未読のお問い合わせはありません。</span>
              )}
            </button>

            {bellOpen ? (
              <div className="absolute right-0 z-50 mt-2 w-[min(94vw,20rem)] overflow-hidden rounded-2xl border border-[#1e3a5f]/12 bg-white py-3 shadow-xl shadow-slate-900/10">
                <div className="border-b border-slate-100 px-4 pb-2">
                  <p className="text-sm font-semibold text-slate-900">お問い合わせ</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {unreadCount > 0 ? `未読が ${unreadCount} 件あります。` : '未読はありません。'}
                  </p>
                </div>

                <div className="max-h-72 overflow-y-auto px-1 py-2">
                  {peekLoading ? (
                    <p className="px-4 py-6 text-center text-xs text-slate-500">読み込み中…</p>
                  ) : unreadCount === 0 ? (
                    <p className="px-4 py-5 text-center text-xs text-slate-500">
                      新しいお問い合わせはありません。
                    </p>
                  ) : peekItems.length === 0 ? (
                    <p className="px-4 py-5 text-center text-xs text-slate-500">一覧へ進んで確認してください。</p>
                  ) : (
                    <ul className="space-y-1">
                      {peekItems.map((it) => (
                        <li key={it.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setBellOpen(false);
                              router.push(`/admin/contact-inquiries`);
                            }}
                            className="w-full rounded-xl px-3 py-2 text-left transition hover:bg-slate-50"
                          >
                            <p className="text-[11px] font-medium uppercase tracking-wide text-[#1e3a5f]/90">
                              {it.inquiryType}
                            </p>
                            <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">{it.name}</p>
                            <p className="mt-0.5 truncate text-[11px] text-slate-500">{it.messagePreview}</p>
                            <p className="mt-1 text-[11px] text-slate-400 tabular-nums">
                              {new Date(it.createdAt).toLocaleString('ja-JP')}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {showBellPeekPagerStrip ? (
                  <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3 py-2">
                    <button
                      type="button"
                      disabled={peekPage <= 1 || peekLoading}
                      onClick={() => setPeekPage((p) => Math.max(1, p - 1))}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition enabled:hover:border-[#1e3a5f]/30 enabled:hover:text-[#1e3a5f] disabled:opacity-40"
                    >
                      前へ
                    </button>
                    <span className="min-w-0 truncate text-[11px] tabular-nums text-slate-500">
                      {peekPage} / {unreadPeekTotalPages}{' '}
                      <span className="hidden sm:inline">（{PEEK_PAGE_SIZE} 件ずつ）</span>
                    </span>
                    <button
                      type="button"
                      disabled={peekPage >= unreadPeekTotalPages || peekLoading}
                      onClick={() => setPeekPage((p) => Math.min(unreadPeekTotalPages, p + 1))}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition enabled:hover:border-[#1e3a5f]/30 enabled:hover:text-[#1e3a5f] disabled:opacity-40"
                    >
                      次へ
                    </button>
                  </div>
                ) : null}

                <div
                  className={
                    showBellPeekPagerStrip
                      ? 'px-3 pt-2'
                      : 'border-t border-slate-100 px-3 pt-3'
                  }
                >
                  <Link
                    href="/admin/contact-inquiries"
                    onClick={() => setBellOpen(false)}
                    className="block rounded-xl bg-[#1e3a5f] px-3 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-[#2d4a73]"
                  >
                    お問い合わせ管理へ
                  </Link>
                  {unreadCount > 0 ? (
                    <p className="mt-2 px-1 text-[11px] leading-relaxed text-amber-800">
                      <span aria-hidden className="font-semibold">※</span>
                      新しいお問い合わせが届いています。内容の確認のみ本画面から行ってください。
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-[#1e3a5f]/10 bg-white px-3 py-2 shadow-sm sm:gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1e3a5f]/10 text-sm font-semibold text-[#1e3a5f]">
              {avatarLabel}
            </div>
            <div className="hidden min-w-0 leading-tight sm:block">
              <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
              <p className="truncate text-xs text-slate-400">{displayEmail || '—'}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-[#1e3a5f]/30 hover:text-[#1e3a5f]"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
