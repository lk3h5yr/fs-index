'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/app/components/admin/Icons';
import {
  CASE_CATEGORIES,
  deliveredAtToMonthInput,
  formatTechStackForInput,
  type CmsCaseAdminDetailItem,
  type CmsCaseAdminListItem,
  type CmsCaseCategory,
  type CmsCaseStatus,
} from '@/app/lib/cmsCasesShared';

const ease = [0.22, 1, 0.36, 1] as const;

const emptyForm = {
  title: '',
  category: 'Webアプリケーション' as CmsCaseCategory,
  client: '',
  deliveredMonth: '',
  benefits: '',
  tech: '',
  detail: '',
  status: 'draft' as CmsCaseStatus,
};

function defaultDeliveredMonth(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export default function AdminCasesClient() {
  const [items, setItems] = useState<CmsCaseAdminListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [detailById, setDetailById] = useState<Record<string, CmsCaseAdminDetailItem>>({});
  const [expandLoadingId, setExpandLoadingId] = useState<string | null>(null);

  const [reviewItem, setReviewItem] = useState<CmsCaseAdminDetailItem | null>(null);
  const [reviewLoadingId, setReviewLoadingId] = useState<string | null>(null);

  const [dialog, setDialog] = useState<'closed' | 'create' | 'edit'>('closed');
  const [editTargetId, setEditTargetId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/cases', { credentials: 'include' });
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

  async function fetchCaseDetail(id: string): Promise<CmsCaseAdminDetailItem | null> {
    try {
      const r = await fetch(`/api/admin/cases/${id}`, { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) return null;
      return data.item as CmsCaseAdminDetailItem;
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
    const d = await fetchCaseDetail(id);
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
    let d: CmsCaseAdminDetailItem | undefined = detailById[id];
    if (!d) {
      setReviewLoadingId(id);
      const loaded = await fetchCaseDetail(id);
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
      deliveredMonth: defaultDeliveredMonth(),
    });
    setEditTargetId(null);
    setDialog('create');
  }

  async function openEdit(id: string) {
    setError(null);
    try {
      const r = await fetch(`/api/admin/cases/${id}`, { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '取得に失敗しました。');
        return;
      }
      const d = data.item as CmsCaseAdminDetailItem;
      setForm({
        title: d.title,
        category: d.category,
        client: d.client,
        deliveredMonth: deliveredAtToMonthInput(d.deliveredAt),
        benefits: d.benefits,
        tech: formatTechStackForInput(d.tech),
        detail: d.detail,
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
    if (!form.deliveredMonth.trim()) {
      setError('納品月を選択してください。');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        title: form.title.trim(),
        category: form.category,
        client: form.client.trim(),
        deliveredMonth: form.deliveredMonth,
        benefits: form.benefits,
        detail: form.detail,
        tech: form.tech,
        status: form.status,
      };

      let r: Response;
      if (dialog === 'edit' && editTargetId) {
        r = await fetch(`/api/admin/cases/${editTargetId}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        r = await fetch('/api/admin/cases', {
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
      const r = await fetch(`/api/admin/cases/${id}`, {
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
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">開発事例管理</h1>
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
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="border-b border-[#1e3a5f]/10 bg-slate-50/80 text-slate-600">
              <tr>
                <th className="w-10 px-3 py-3 font-semibold" aria-label="開閉" />
                <th className="min-w-[200px] px-5 py-3 font-semibold">タイトル</th>
                <th className="px-5 py-3 font-semibold">カテゴリ</th>
                <th className="min-w-[140px] px-5 py-3 font-semibold">クライアント</th>
                <th className="min-w-[140px] px-5 py-3 font-semibold">技術</th>
                <th className="whitespace-nowrap px-5 py-3 font-semibold">納品</th>
                <th className="px-5 py-3 font-semibold">ステータス</th>
                <th className="px-5 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                    読み込み中…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                    まだ開発事例がありません。「新規追加」から作成してください。
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
                            aria-label={open ? '折りたたむ' : '詳細を展開'}
                            onClick={() => void toggleExpand(row.id)}
                            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200/80 hover:text-[#1e3a5f]"
                          >
                            <span className="text-base font-light leading-none text-[#1e3a5f]" aria-hidden>
                              {expandLoadingId === row.id ? '…' : open ? '−' : '+'}
                            </span>
                          </button>
                        </td>
                        <td className="max-w-[220px] px-5 py-4 font-medium text-slate-900">
                          <span className="line-clamp-2">{row.title}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">{row.category}</td>
                        <td className="max-w-[160px] px-5 py-4 text-slate-600">
                          <span className="line-clamp-2">{row.client || '—'}</span>
                        </td>
                        <td className="max-w-[160px] px-5 py-4 text-slate-600">
                          <span className="line-clamp-2 text-xs">{row.techSummary || '—'}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-slate-500">{row.deliveryDateLabel}</td>
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
                          <td colSpan={8} className="border-t border-slate-100 px-5 py-4">
                            {expandLoadingId === row.id && !detail ? (
                              <p className="text-sm text-slate-500">読み込み中…</p>
                            ) : detail ? (
                              <div className="space-y-4 text-sm">
                                <div>
                                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    詳細本文
                                  </p>
                                  <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200/80 bg-white px-4 py-3 font-sans text-slate-800 leading-relaxed">
                                    {detail.detail || '（詳細なし）'}
                                  </pre>
                                </div>
                                {detail.tech.length ? (
                                  <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                      技術スタック
                                    </p>
                                    <p className="text-slate-700">{detail.tech.join(', ')}</p>
                                  </div>
                                ) : null}
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
              className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setReviewItem(null)}
              aria-hidden
            />
            <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-case-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="case-popup pointer-events-auto flex max-h-[92vh] w-[min(96vw,42rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <div className="shrink-0 border-b border-slate-200/80 px-4 pb-4 pt-6 sm:px-6 sm:pt-8">
                    <span className="mb-3 inline-block rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {reviewItem.category}
                    </span>
                    <h2
                      id="admin-case-popup-title"
                      className="mb-4 text-lg font-bold leading-snug text-slate-900 sm:text-xl"
                    >
                      {reviewItem.title}
                    </h2>
                    <div className="grid gap-2 text-xs sm:text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">クライアント：</span>
                        {reviewItem.client || '—'}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">納品：</span>
                        {reviewItem.deliveryDateLabel}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">効果・メリット：</span>
                        {reviewItem.benefits || '—'}
                      </p>
                      {reviewItem.tech.length ? (
                        <p className="text-slate-700">
                          <span className="font-semibold text-slate-600">技術：</span>
                          {reviewItem.tech.join('、')}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="case-popup-body min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed text-slate-700 sm:px-6 sm:text-[15px]">
                    <div className="whitespace-pre-line">{reviewItem.detail}</div>
                  </div>
                  <div className="shrink-0 border-t border-slate-100 px-4 pb-5 pt-4 sm:px-6 sm:pb-8">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => setReviewItem(null)}
                        className="about-cta-secondary popup-close-btn"
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
            aria-labelledby="cases-dialog-title"
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#1e3a5f]/10 bg-white p-6 shadow-xl"
          >
            <h2 id="cases-dialog-title" className="text-lg font-semibold text-slate-950">
              {dialog === 'create' ? '開発事例を追加' : '開発事例を編集'}
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
                      setForm((f) => ({ ...f, category: e.target.value as CmsCaseCategory }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  >
                    {CASE_CATEGORIES.map((c) => (
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
                      setForm((f) => ({ ...f, status: e.target.value as CmsCaseStatus }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  >
                    <option value="draft">編集中</option>
                    <option value="published">公開</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">納品月</label>
                <input
                  type="month"
                  required
                  value={form.deliveredMonth}
                  onChange={(e) => setForm((f) => ({ ...f, deliveredMonth: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">クライアント</label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder="例：製造業 A社（従業員約500名）"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">効果・メリット</label>
                <textarea
                  value={form.benefits}
                  onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  技術スタック（改行またはカンマ区切り）
                </label>
                <textarea
                  value={form.tech}
                  onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder={`React\nNode.js\nPostgreSQL`}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">詳細本文</label>
                <textarea
                  value={form.detail}
                  onChange={(e) => setForm((f) => ({ ...f, detail: e.target.value }))}
                  rows={8}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder="開発背景・施策・結果など（段落ごとに空行で区切れます）"
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
