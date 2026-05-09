'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginClient() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/admin/dashboard';

  const [needsBootstrap, setNeedsBootstrap] = useState<boolean | null>(null);
  const [dbError, setDbError] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('/api/admin/auth/bootstrap-status');
        const data = await r.json();
        if (cancelled) return;
        setNeedsBootstrap(data.needsBootstrap === true);
        setDbError(data.dbError === true);
      } catch {
        if (!cancelled) setNeedsBootstrap(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? 'ログインに失敗しました。');
        return;
      }
      const target = from.startsWith('/admin') && from !== '/admin/login' ? from : '/admin/dashboard';
      window.location.assign(target);
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }

  async function handleBootstrap(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/auth/register-first', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data.error ?? '登録に失敗しました。');
        return;
      }
      const loginRes = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!loginRes.ok) {
        setError('登録は完了しました。再度ログインしてください。');
        setNeedsBootstrap(false);
        return;
      }
      window.location.assign('/admin/dashboard');
    } catch {
      setError('通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }

  if (needsBootstrap === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-fs-muted">
        <p className="text-sm text-slate-500">読み込み中…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-fs-muted px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#1e3a5f]/10 bg-white p-8 shadow-fs-card">
        <div className="mb-8 text-center">
          <Link href="/" className="mx-auto mb-4 inline-flex items-center justify-center">
            <Image
              src="/img/logo-black.png"
              alt="ForestSoft"
              width={200}
              height={70}
              className="h-12 w-auto"
              priority
              unoptimized
            />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">
            {needsBootstrap ? '管理者の初期登録' : '管理画面'}
          </h1>
        </div>

        {dbError ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
            データベースに接続できません。MONGODB_URI を確認してください。
          </p>
        ) : null}

        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
        ) : null}

        {needsBootstrap ? (
          <form onSubmit={handleBootstrap} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">メールアドレス</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">パスワード（8文字以上）</label>
              <input
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#1e3a5f] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d4a73] disabled:opacity-60"
            >
              {loading ? '処理中…' : '登録してログイン'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">メールアドレス</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">パスワード</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-[#1e3a5f] focus:ring-2"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#1e3a5f] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d4a73] disabled:opacity-60"
            >
              {loading ? 'ログイン中…' : 'ログイン'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-slate-400">
          <Link href="/" className="text-[#1e3a5f] hover:underline">
            サイトに戻る
          </Link>
        </p>
      </div>
    </div>
  );
}
