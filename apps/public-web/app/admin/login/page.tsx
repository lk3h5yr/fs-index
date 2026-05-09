import { Suspense } from 'react';
import AdminLoginClient from './AdminLoginClient';

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-fs-muted">
          <p className="text-sm text-slate-500">読み込み中…</p>
        </div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
