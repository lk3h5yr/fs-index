'use client';

import { useRef, useEffect, useState } from 'react';
import Sidebar from '@/app/components/admin/Sidebar';
import Topbar from '@/app/components/admin/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-fs-muted">
      <div
        className={[
          'fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden={!sidebarOpen}
      />
      <div
        ref={panelRef}
        className={[
          'fixed inset-y-0 left-0 z-40 w-64 transform transition-transform lg:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="h-full border-r border-[#1e3a5f]/10 bg-white shadow-fs-sidebar">
          <Sidebar onNavigate={() => setSidebarOpen(false)} mobile />
        </div>
      </div>

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:pl-64">
        <Topbar onOpenMenu={() => setSidebarOpen(true)} />
        <main className="px-5 py-7 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
