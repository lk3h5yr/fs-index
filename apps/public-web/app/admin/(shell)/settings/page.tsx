'use client';

import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@/app/components/admin/Icons';

type Permissions = { admin: boolean; editor: boolean };

type UserRow = {
  id: string;
  name: string;
  email: string;
  permissions: Permissions;
  requireChangePassword: boolean;
  createdAt: string;
  isSelf?: boolean;
};

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newAdmin, setNewAdmin] = useState(false);
  const [newEditor, setNewEditor] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editAdmin, setEditAdmin] = useState(false);
  const [editEditor, setEditEditor] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const scrollToAddForm = () => {
    document.getElementById('admin-add-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/users', { credentials: 'include' });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '読み込みに失敗しました。');
        return;
      }
      setUsers(data.users ?? []);
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: newEmail.trim(),
          password: newPassword,
          name: newName.trim(),
          permissions: { admin: newAdmin, editor: newEditor },
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '追加に失敗しました。');
        return;
      }
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      setNewAdmin(false);
      setNewEditor(true);
      await load();
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editId) return;
    setSubmitting(true);
    setError(null);
    try {
      const body: {
        name?: string;
        password?: string;
        permissions?: Permissions;
        emailPlain?: string;
      } = {
        name: editName.trim(),
        permissions: { admin: editAdmin, editor: editEditor },
      };
      if (editPassword.trim()) body.password = editPassword;
      if (editEmail.trim()) body.emailPlain = editEmail.trim().toLowerCase();
      const r = await fetch(`/api/admin/users/${editId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '更新に失敗しました。');
        return;
      }
      setEditId(null);
      setEditName('');
      setEditEmail('');
      setEditPassword('');
      await load();
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setSubmitting(false);
    }
  }

  function openEdit(u: UserRow) {
    setEditId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
    setEditPassword('');
    setEditAdmin(u.permissions.admin);
    setEditEditor(u.permissions.editor);
  }

  async function handleDelete(u: UserRow) {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(
        `「${u.name}」のアカウントを削除しますか？この操作は取り消せません。`,
      )
    ) {
      return;
    }
    setDeletingId(u.id);
    setError(null);
    try {
      const r = await fetch(`/api/admin/users/${u.id}`, {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">管理者設定</h1>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      ) : null}

      <section
        id="admin-add-section"
        className="rounded-2xl border border-[#1e3a5f]/10 bg-white p-6 shadow-fs-card scroll-mt-6"
      >
        <h2 className="text-base font-semibold text-slate-950">管理者を追加</h2>
        <form onSubmit={handleAdd} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-600">メールアドレス</label>
              <input
                required
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">表示名</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                placeholder="管理者"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">パスワード（8文字以上）</label>
              <input
                required
                type="password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAdmin}
                onChange={(e) => setNewAdmin(e.target.checked)}
                className="rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
              <span>admin</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEditor}
                onChange={(e) => setNewEditor(e.target.checked)}
                className="rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
              <span>editor</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d4a73] disabled:opacity-60"
          >
            <Icon name="plus" className="h-4 w-4" />
            追加する
          </button>
        </form>
      </section>

      <div className="overflow-hidden rounded-2xl border border-[#1e3a5f]/10 bg-white shadow-fs-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e3a5f]/10 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-950">管理者</h2>
          <button
            type="button"
            onClick={scrollToAddForm}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#1e3a5f]/25 bg-white px-3 py-2 text-xs font-semibold text-[#1e3a5f] shadow-sm transition hover:bg-[#1e3a5f]/5"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            管理者を追加
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-[#1e3a5f]/10 bg-slate-50/80 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-semibold">表示名</th>
                <th className="px-5 py-3 font-semibold">メールアドレス</th>
                <th className="px-5 py-3 font-semibold">権限</th>
                <th className="px-5 py-3 font-semibold">登録日</th>
                <th className="px-5 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    読み込み中…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    管理者が登録されていません。
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="px-5 py-4 font-medium text-slate-900">{u.name}</td>
                    <td className="px-5 py-4 text-slate-700">
                      {u.email || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="mr-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs">
                        admin: {u.permissions.admin ? 'ON' : 'OFF'}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs">
                        editor: {u.permissions.editor ? 'ON' : 'OFF'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {new Date(u.createdAt).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex flex-wrap items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(u)}
                          className="inline-flex items-center gap-1 rounded-xl border border-[#1e3a5f]/20 px-3 py-1.5 text-xs font-medium text-[#1e3a5f] transition hover:bg-[#1e3a5f]/5"
                        >
                          <Icon name="edit" className="h-3.5 w-3.5" />
                          編集
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === u.id || submitting || u.isSelf}
                          title={u.isSelf ? 'ログイン中の自分自身は削除できません。' : undefined}
                          onClick={() => handleDelete(u)}
                          className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          <Icon name="trash" className="h-3.5 w-3.5" />
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-admin-title"
            className="w-full max-w-md rounded-2xl border border-[#1e3a5f]/10 bg-white p-6 shadow-xl"
          >
            <h2 id="edit-admin-title" className="text-lg font-semibold text-slate-950">
              アカウント編集
            </h2>
            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">メールアドレス（ログイン時と同じ）</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
                <p className="mt-1 text-xs text-slate-400">
                  一覧表示用。DB のログイン用メールハッシュと一致する必要があります。
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">表示名</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                />
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editAdmin}
                    onChange={(e) => setEditAdmin(e.target.checked)}
                    className="rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
                  />
                  <span>admin</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editEditor}
                    onChange={(e) => setEditEditor(e.target.checked)}
                    className="rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
                  />
                  <span>editor</span>
                </label>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  新しいパスワード（変更する場合のみ、8文字以上）
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                  placeholder="変更しない場合は空欄"
                  autoComplete="new-password"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setEditPassword('');
                    setEditEmail('');
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4a73] disabled:opacity-60"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
