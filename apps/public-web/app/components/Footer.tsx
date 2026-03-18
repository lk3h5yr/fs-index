'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-800 text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 上段：公司區塊 + 三欄連結，比例 6 : 2 : 2 : 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-10">
          {/* ForestSoft + 公司理念：佔約一半寬度，文字限制最大寬度易讀 */}
          <div className="md:col-span-6 lg:col-span-6">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/img/logo-black.png"
                alt="ForestSoft"
                width={160}
                height={56}
                className="h-11 w-auto"
                unoptimized
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              フォレストソフト株式会社では事業活動および社員行動を通じ、革新的な技術で世の中を動かす企業を目指します、地域社会との調和・貢献に努めます。私たちは、社会への貢献を通じて、自身の夢を必ず手にして見せます。私たちは、未知の可能性に挑戦したいと思っています。私たちは、未来につながる世界を創造したいと思っています。
            </p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">リンク</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">企業紹介</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">ニュース</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">採用情報</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">情報</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/company" className="hover:text-white transition-colors">会社情報</Link></li>
              <li><Link href="/certifications" className="hover:text-white transition-colors">資格情報</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer">個人情報保護方針</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">連絡先</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>〒103-0023</li>
              <li>東京都中央区日本橋本町４丁目５−１３</li>
              <li>日本橋本町ＴＨビル７階</li>
              <li><a href="tel:03-3527-3652" className="hover:text-white transition-colors">03-3527-3652</a></li>
              <li><a href="mailto:info@forestsoft.jp" className="hover:text-white transition-colors">info@forestsoft.jp</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>Copyright(c) 2026 ForestSoft Co., Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
