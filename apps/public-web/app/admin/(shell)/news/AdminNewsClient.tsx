'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/app/components/admin/Icons';
import { formatNewsDateForPopup, renderNewsPopupBody } from '@/app/lib/newsPopupBody';
import {
  NEWS_CATEGORIES,
  type CmsNewsAdminDetailItem,
  type CmsNewsAdminListItem,
  type CmsNewsCategory,
  type CmsNewsStatus,
} from '@/app/lib/cmsNewsShared';

const ease = [0.22, 1, 0.36, 1] as const;

function isoToDateInput(iso: string): string {
  try {
    return iso.slice(0, 10);
  } catch {
    return '';
  }
}

function deriveListSummaryFromBody(body: string, maxChars = 200): string {
  const oneLine = body.replace(/\s+/g, ' ').trim();
  if (!oneLine) return '';
  if (oneLine.length <= maxChars) return oneLine;
  return `${oneLine.slice(0, maxChars - 1)}…`;
}

const emptyForm = {
  title: '',
  category: 'お知らせ' as CmsNewsCategory,
  body: '',
  publishedAt: '',
  status: 'draft' as CmsNewsStatus,
};

export default function AdminNewsClient() {
  const [items, setItems] = useState<CmsNewsAdminListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [detailById, setDetailById] = useState<Record<string, CmsNewsAdminDetailItem>>({});
  const [expandLoadingId, setExpandLoadingId] = useState<string | null>(null);

  const [reviewItem, setReviewItem] = useState<CmsNewsAdminDetailItem | null>(null);
  const [reviewLoadingId, setReviewLoadingId] = useState<string | null>(null);

  const [dialog, setDialog] = useState<'closed' | 'create' | 'edit'>('closed');
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/news', { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '読み込みに失敗しました。');
        return;
      }
      setItems(data.items ?? []);
      setDetailById({});
      setExpandedIds(new Set());
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function fetchNewsDetail(id: string): Promise<CmsNewsAdminDetailItem | null> {
    try {
      const r = await fetch(`/api/admin/news/${id}`, { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) return null;
      return data.item as CmsNewsAdminDetailItem;
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
    const d = await fetchNewsDetail(id);
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

  async function openReview(id: string) {
    setError(null);
    let d: CmsNewsAdminDetailItem | undefined = detailById[id];
    if (!d) {
      setReviewLoadingId(id);
      const loaded = await fetchNewsDetail(id);
      setReviewLoadingId(null);
      if (loaded) {
        d = loaded;
        setDetailById((c) => ({ ...c, [id]: loaded }));
      }
    }
    if (d) setReviewItem(d);
    else setError('レビュー用データの取得に失敗しました。');
  }

  function closeDialog() {
    setDialog('closed');
    setEditTargetId(null);
    setForm(emptyForm);
  }

  function openCreate() {
    setForm({
      ...emptyForm,
      publishedAt: new Date().toISOString().slice(0, 10),
    });
    setEditTargetId(null);
    setDialog('create');
  }

  async function openEdit(id: string) {
    setError(null);
    try {
      const r = await fetch(`/api/admin/news/${id}`, { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '取得に失敗しました。');
        return;
      }
      const d = data.item as CmsNewsAdminDetailItem;
      setForm({
        title: d.title,
        category: d.category,
        body: d.body,
        publishedAt: isoToDateInput(d.publishedAt),
        status: d.status,
      });
      setEditTargetId(id);
      setDialog('edit');
    } catch {
      setError('通信エラーが発生しました。');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('タイトルを入力してください。');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        category: form.category,
        description: deriveListSummaryFromBody(form.body),
        body: form.body,
        publishedAt: form.publishedAt || undefined,
        status: form.status,
      };

      let r: Response;
      if (dialog === 'edit' && editTargetId) {
        r = await fetch(`/api/admin/news/${editTargetId}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        r = await fetch('/api/admin/news', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '保存に失敗しました。');
        return;
      }
      closeDialog();
      await load();
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(`「${title}」を削除しますか？この操作は取り消せません。`)
    ) {
      return;
    }
    setDeletingId(id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '削除に失敗しました。');
        return;
      }
      await load();
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">お知らせ管理</h1>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1e3a5f]/25 transition hover:bg-[#2d4a73]"
        >
          <Icon name="plus" className="h-4 w-4" />
          新規追加
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-fs-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-[#1e3a5f]/10 bg-slate-50/80 text-slate-600">
              <tr>
                <th className="w-10 px-3 py-3 font-semibold" aria-label="開閉" />
                <th className="px-5 py-3 font-semibold">タイトル</th>
                <th className="px-5 py-3 font-semibold">カテゴリ</th>
                <th className="px-5 py-3 font-semibold">掲載日付</th>
                <th className="px-5 py-3 font-semibold">ステータス</th>
                <th className="px-5 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    読み込み中…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    まだお知らせがありません。「新規追加」から作成してください。
                  </td>
                </tr>
              ) : (
                items.map((row) => {
                  const open = expandedIds.has(row.id);
                  const detail = detailById[row.id];
                  return (
                    <Fragment key={row.id}>
                      <tr className="hover:bg-slate-50/80">
                        <td className="px-3 py-4 align-middle">
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-label={open ? '折りたたむ' : '本文を展開'}
                            onClick={() => void toggleExpand(row.id)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200/80 hover:text-[#1e3a5f]"
                          >
                            <span className="text-base font-light leading-none text-[#1e3a5f]" aria-hidden>
                              {expandLoadingId === row.id ? '…' : open ? '−' : '+'}
                            </span>
                          </button>
                        </td>
                        <td className="max-w-[240px] px-5 py-4 font-medium text-slate-900">
                          <span className="line-clamp-2">{row.title}</span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{row.category}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                          {new Date(row.publishedAt).toLocaleDateString('ja-JP')}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={
                              row.status === 'published'
                                ? 'rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700'
                                : 'rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700'
                            }
                          >
                            {row.statusLabel}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <div className="inline-flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => void openReview(row.id)}
                              disabled={reviewLoadingId === row.id}
                              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-[#1e3a5f]/40 hover:bg-slate-50 disabled:opacity-50"
                            >
                              レビュー
                            </button>
                            <button
                              type="button"
                              onClick={() => openEdit(row.id)}
                              className="inline-flex items-center gap-1 rounded-xl border border-[#1e3a5f]/20 px-3 py-1.5 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#1e3a5f]/5"
                            >
                              <Icon name="edit" className="h-3.5 w-3.5" />
                              編集
                            </button>
                            <button
                              type="button"
                              disabled={deletingId === row.id}
                              onClick={() => handleDelete(row.id, row.title)}
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
                          <td colSpan={6} className="border-t border-slate-100 px-5 py-4">
                            {expandLoadingId === row.id && !detail ? (
                              <p className="text-sm text-slate-500">読み込み中…</p>
                            ) : detail ? (
                              <div className="space-y-4 text-sm">
                                <div>
                                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    本文
                                  </p>
                                  <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200/80 bg-white px-4 py-3 font-sans text-slate-800 leading-relaxed">
                                    {detail.body || (
                                      <span className="text-slate-400">（本文なし）</span>
                                    )}
                                  </pre>
                                </div>
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

      <AnimatePresence>
        {reviewItem ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="news-popup-backdrop fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setReviewItem(null)}
              aria-hidden
            />
            <div className="news-popup-wrap pointer-events-none fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-news-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="news-popup pointer-events-auto flex max-h-[92vh] w-[min(96vw,42rem)] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="news-popup-glow pointer-events-none absolute inset-0 rounded-2xl"
                  aria-hidden
                />
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <div className="news-popup-header shrink-0 px-4 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
                    <span className="news-popup-tag mb-4 inline-block">{reviewItem.category}</span>
                    <h2
                      id="admin-news-popup-title"
                      className="news-popup-title font-bold leading-snug text-slate-900"
                    >
                      {reviewItem.title}
                    </h2>
                    <p className="news-popup-date mt-3 text-slate-500">
                      {formatNewsDateForPopup(reviewItem.publishedAt)}
                    </p>
                  </div>
                  <div className="news-popup-body min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-6">
                    <div className="news-popup-content">{renderNewsPopupBody(reviewItem.body)}</div>
                  </div>
                  <div className="news-popup-footer shrink-0 px-4 pb-5 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setReviewItem(null)}
                        className="news-popup-close-btn about-cta-secondary popup-close-btn"
                      >
                        閉じる
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      {dialog !== 'closed' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-dialog-title"
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#1e3a5f]/10 bg-white p-6 shadow-xl"
          >
            <h2 id="news-dialog-title" className="text-lg font-semibold text-slate-950">
              {dialog === 'create' ? 'お知らせを追加' : 'お知らせを編集'}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">タイトル</label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">カテゴリ</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value as CmsNewsCategory }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  >
                    {NEWS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">ステータス</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, status: e.target.value as CmsNewsStatus }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  >
                    <option value="draft">編集中</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">掲載日付</label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">本文</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  rows={8}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder="詳細本文"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4a73] disabled:opacity-60"
                >
                  {submitting ? '保存中…' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
