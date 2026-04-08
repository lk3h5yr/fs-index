'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** 全ページ共通：右下固定の問い合わせ導線 */
export default function ContactFab() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <Link
      href="/contact"
      className="contact-fab fixed z-40 inline-flex items-center gap-1.5 rounded-full bg-[#1e3a5f] px-3 py-2 text-xs font-semibold text-white shadow-md shadow-[#1e3a5f]/30 transition-[transform,box-shadow,filter] duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-[#1e3a5f]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 active:scale-[0.98] sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[13px]"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1rem, env(safe-area-inset-right, 0px))',
      }}
      aria-label="問い合わせページへ移動"
    >
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-7 sm:w-7"
        aria-hidden
      >
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </span>
      <span className="pr-0.5 tracking-wide max-sm:text-[11px]">問い合わせ</span>
    </Link>
  );
}
