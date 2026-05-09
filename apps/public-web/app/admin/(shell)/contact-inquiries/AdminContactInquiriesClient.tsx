'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { Icon } from '@/app/components/admin/Icons';
import type { ContactInquiryAdminListItem } from '@/app/lib/contactInquiryShared';

type DetailItem = ContactInquiryAdminListItem & { message: string };

export default function AdminContactInquiriesClient() {
  const [items, setItems] = useState<ContactInquiryAdminListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [patchingId, setPatchingId] = useState<string | null>(null);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [detailById, setDetailById] = useState<Record<string, DetailItem>>({});
  const [expandLoadingId, setExpandLoadingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/contact-inquiries', { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '読み込みに失敗しました。');
        return;
      }
      setItems(data.items ?? []);
      setExpandedIds(new Set());
      setDetailById({});
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function fetchDetail(id: string): Promise<DetailItem | null> {
    try {
      const r = await fetch(`/api/admin/contact-inquiries/${id}`, { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) return null;
      return data.item as DetailItem;
    } catch {
      return null;
    }
  }

  async function toggleExpand(id: string) {
    const wasOpen = expandedIds.has(id);
    if (wasOpen) {
      setExpandedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      return;
    }
    setExpandedIds((prev) => new Set(prev).add(id));
    if (detailById[id]) return;

    setExpandLoadingId(id);
    const d = await fetchDetail(id);
    setExpandLoadingId(null);
    if (d) {
      setDetailById((c) => ({ ...c, [id]: d }));
    } else {
      setExpandedIds((prev) => {
        const n = new Set(prev);
        n.delete(id);
        return n;
      });
      setError('内容の読み込みに失敗しました。');
    }
  }

  async function setRead(id: string, read: boolean) {
    setPatchingId(id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/contact-inquiries/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '更新に失敗しました。');
        return;
      }
      const item = data.item as DetailItem;
      setDetailById((c) => ({ ...c, [id]: item }));
      await load();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('fs-admin-inquiries-update'));
      }
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setPatchingId(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (typeof window !== 'undefined' && !window.confirm(`「${name}」様からのお問い合わせを削除しますか？`)) {
      return;
    }
    setDeletingId(id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/contact-inquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '削除に失敗しました。');
        return;
      }
      await load();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('fs-admin-inquiries-update'));
      }
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">お問い合わせ管理</h1>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-fs-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead className="border-b border-[#1e3a5f]/10 bg-slate-50/80 text-slate-600">
              <tr>
                <th className="w-10 px-3 py-3 font-semibold" aria-label="開閉" />
                <th className="whitespace-nowrap px-5 py-3 font-semibold">受信</th>
                <th className="px-5 py-3 font-semibold">種別</th>
                <th className="px-5 py-3 font-semibold">お名前</th>
                <th className="min-w-[200px] px-5 py-3 font-semibold">メール</th>
                <th className="px-5 py-3 font-semibold">状態</th>
                <th className="px-5 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    読み込み中…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    お問い合わせはまだありません。
                  </td>
                </tr>
              ) : (
                items.map((row) => {
                  const open = expandedIds.has(row.id);
                  const detail = detailById[row.id];
                  return (
                    <Fragment key={row.id}>
                      <tr className={`hover:bg-slate-50/80 ${row.read ? '' : 'bg-emerald-50/40'}`}>
                        <td className="px-3 py-4 align-middle">
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-label={open ? '折りたたむ' : '全文を表示'}
                            onClick={() => void toggleExpand(row.id)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200/80 hover:text-[#1e3a5f]"
                          >
                            <span className="text-base font-light leading-none text-[#1e3a5f]" aria-hidden>
                              {expandLoadingId === row.id ? '…' : open ? '−' : '+'}
                            </span>
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-500 tabular-nums">
                          {new Date(row.createdAt).toLocaleString('ja-JP')}
                        </td>
                        <td className="max-w-[160px] px-5 py-4 text-slate-700">{row.inquiryType}</td>
                        <td className="max-w-[160px] px-5 py-4 font-medium text-slate-900">{row.name}</td>
                        <td className="max-w-[220px] truncate px-5 py-4 text-slate-600">{row.email}</td>
                        <td className="px-5 py-4">
                          {row.read ? (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              既読
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                              未読
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <div className="inline-flex flex-wrap justify-end gap-2">
                            {row.read ? (
                              <button
                                type="button"
                                disabled={patchingId === row.id}
                                onClick={() => setRead(row.id, false)}
                                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                              >
                                未読に戻す
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={patchingId === row.id}
                                onClick={() => setRead(row.id, true)}
                                className="rounded-xl border border-[#1e3a5f]/20 px-3 py-1.5 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#1e3a5f]/5 disabled:opacity-50"
                              >
                                既読にする
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={deletingId === row.id}
                              onClick={() => handleDelete(row.id, row.name)}
                              className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              <Icon name="trash" className="h-3.5 w-3.5" />
                              削除
                            </button>
                          </div>
                        </td>
                      </tr>
                      {open ? (
                        <tr className="bg-slate-50/95">
                          <td colSpan={7} className="border-t border-slate-100 px-5 py-4">
                            {expandLoadingId === row.id && !detail ? (
                              <p className="text-sm text-slate-500">読み込み中…</p>
                            ) : detail ? (
                              <div className="space-y-3 text-sm">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  メッセージ全文（返信機能はありません）
                                </p>
                                <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200/80 bg-white px-4 py-3 font-sans text-slate-800 leading-relaxed">
                                  {detail.message || '（本文なし）'}
                                </pre>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        返信が必要な場合は、一覧のメールアドレスへメールソフトまたは既存フローでご対応ください。
      </p>
    </div>
  );
}
