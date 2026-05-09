'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '@/app/components/admin/Icons';

const navItems = [
  { label: 'ダッシュボード', href: '/admin/dashboard', icon: 'grid' as const },
  { label: 'お知らせ管理', href: '/admin/news', icon: 'newspaper' as const },
  { label: '開発事例管理', href: '/admin/cases', icon: 'briefcase' as const },
  { label: 'お問い合わせ管理', href: '/admin/contact-inquiries', icon: 'mail' as const },
];

const bottomNavItems = [{ label: '管理者設定', href: '/admin/settings', icon: 'settings' as const }];

type SidebarProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export default function Sidebar({ mobile, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        'flex h-full w-64 flex-col border-r border-[#1e3a5f]/10 bg-white/90 px-5 py-7 shadow-fs-sidebar backdrop-blur-xl',
        mobile ? '' : 'fixed inset-y-0 left-0 z-20 hidden lg:flex',
      ].join(' ')}
    >
      <Link
        href="/admin/dashboard"
        onClick={onNavigate}
        className="mb-10 flex items-center"
      >
        <Image
          src="/img/logo-black.png"
          alt="ForestSoft"
          width={200}
          height={70}
          className="h-10 w-auto"
          priority
          unoptimized
        />
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                active
                  ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#1e3a5f]',
              ].join(' ')}
            >
              <Icon name={item.icon} className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <nav className="mt-auto border-t border-[#1e3a5f]/10 pt-4">
        {bottomNavItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                active
                  ? 'bg-[#1e3a5f]/10 text-[#1e3a5f] shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#1e3a5f]',
              ].join(' ')}
            >
              <Icon name={item.icon} className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
