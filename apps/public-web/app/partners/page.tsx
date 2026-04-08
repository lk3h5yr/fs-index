'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

/** 主な取引先（localLogo があれば /public/img を優先、なければ Google favicon → DuckDuckGo） */
type PartnerLogo = {
  name: string;
  domain: string;
  href: string;
  /** public 配下のパス（例: /img/foo.svg） */
  localLogo?: string;
};

const partnerLogos: readonly PartnerLogo[] = [
  { name: '京葉鐵鋼埠頭株式会社', domain: 'k-t-f.co.jp', href: 'https://k-t-f.co.jp/' },
  { name: '株式会社DTS', domain: 'dts.co.jp', href: 'https://www.dts.co.jp/' },
  {
    name: '株式会社SHIFT',
    domain: 'shiftinc.co.jp',
    href: 'https://shiftinc.co.jp/',
    localLogo: '/img/株式会社SHIFT.svg',
  },
  { name: '株式会社フォーカスシステムズ', domain: 'focus-s.com', href: 'https://www.focus-s.com/' },
  {
    name: '株式会社アイ・エス・ビー',
    domain: 'isb.co.jp',
    href: 'https://www.isb.co.jp/',
    localLogo: '/img/isb.svg',
  },
  { name: '株式会社NTTデータビジネスブレインズ', domain: 'nttdata-bb.co.jp', href: 'https://www.nttdata-bb.co.jp/' },
  { name: '株式会社アイフロント', domain: 'ifront.co.jp', href: 'https://www.ifront.co.jp/' },
  { name: '株式会社YSLソリューション', domain: 'ysl.co.jp', href: 'https://www.ysl.co.jp/' },
  { name: '株式会社エスディーシィー', domain: 'kk-sdc.co.jp', href: 'https://www.kk-sdc.co.jp/' },
  { name: '株式会社BASE', domain: 'binc.jp', href: 'https://binc.jp/' },
  { name: '株式会社東和コンピュータマネジメント', domain: 'towacm.co.jp', href: 'https://www.towacm.co.jp/' },
  { name: '株式会社オリゾンシステムズ', domain: 'orizon.co.jp', href: 'https://www.orizon.co.jp/' },
  { name: '株式会社CAICAテクノロジーズ', domain: 'caica.co.jp', href: 'https://www.caica.co.jp/' },
  { name: '日本事務器シェアードサービス株式会社', domain: 'njssc.njc.co.jp', href: 'https://www.njssc.njc.co.jp/' },
];

/** Clearbit Logo API は多くの環境で利用不可のため、Google favicon → DuckDuckGo の順で取得 */
type LogoStep = 'local' | 'google' | 'ddg' | 'fail';

function partnerLogoSrc(step: LogoStep, partner: PartnerLogo): string {
  if (step === 'local' && partner.localLogo) {
    const p = partner.localLogo;
    const slash = p.lastIndexOf('/');
    if (slash === -1) return encodeURI(p);
    return p.slice(0, slash + 1) + encodeURIComponent(p.slice(slash + 1));
  }
  if (step === 'google') {
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(partner.domain)}&sz=128`;
  }
  if (step === 'ddg') {
    return `https://icons.duckduckgo.com/ip3/${partner.domain}.ico`;
  }
  return '';
}

function PartnerMarqueeItem({ partner }: { partner: PartnerLogo }) {
  const hasLocal = Boolean(partner.localLogo);
  const [step, setStep] = useState<LogoStep>(hasLocal ? 'local' : 'google');
  const src = partnerLogoSrc(step, partner);
  const textOnly = step === 'fail';

  const handleError = () => {
    if (step === 'local') {
      setStep('google');
      return;
    }
    if (step === 'google') {
      setStep('ddg');
      return;
    }
    if (step === 'ddg') {
      setStep('fail');
    }
  };

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className="partners-logo-marquee-card flex-shrink-0 w-[200px] sm:w-[240px] h-[124px] sm:h-[132px] rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 px-3 py-3"
      aria-label={`${partner.name}（公式サイトを開く）`}
    >
      {!textOnly ? (
        <img
          key={step}
          src={src}
          alt={partner.name}
          width={160}
          height={56}
          className="max-h-12 sm:max-h-14 w-auto max-w-[92%] object-contain object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleError}
        />
      ) : (
        <span className="text-xs font-bold text-slate-700 text-center leading-snug line-clamp-3 px-1">{partner.name}</span>
      )}
      {!textOnly && (
        <span className="text-[10px] sm:text-[11px] text-slate-500 text-center leading-tight line-clamp-2">{partner.name}</span>
      )}
    </a>
  );
}

function PartnersMarquee() {
  const list = [...partnerLogos, ...partnerLogos];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-marquee gap-5 sm:gap-6 py-2">
        {list.map((partner, i) => (
          <PartnerMarqueeItem key={`${partner.domain}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

const partnerCategories = [
  { title: 'システム開発企業様', desc: '人材・案件の共有、共同受託' },
  { title: '個人事業主・フリーランス様', desc: '参画・技術支援' },
  { title: 'Sier・ベンダー様', desc: 'リソース連携、長期協業' },
];

/** 募集ブロック内の要点（短文のみ） */
const recruitHighlights = [
  {
    label: '案件・人材の連携',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    label: 'ノウハウ共有',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: '長期協業を志向',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function PartnersPage() {
  const refHero = useRef(null);
  const refRecruit = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewRecruit = useInView(refRecruit, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="partners" />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section ref={refHero} className="careers-lead relative overflow-hidden">
          <div className="careers-lead-bg" aria-hidden>
            <div className="careers-lead-bg-base" />
            <div className="careers-lead-bg-shape" />
          </div>
          <div className="careers-lead-inner relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="text-sm text-gray-500 mb-4"
                aria-label="パンくず"
              >
                <Link href="/" className="hover:text-gray-700 transition-colors">ホーム</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">ビジネスパートナー</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">PARTNERS</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  ビジネスパートナー
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  当社は、信頼できるパートナー様との協業を通じて、お客様に最高の価値を提供することを目指しています。
                  システム開発全般において、人材や案件の情報交換を行える企業様、個人事業主様との密な関係を築き、長期に渡り協業していきます。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ビジネスパートナー募集（首頁 FMS カードと同系：冷藍・ラジアル） */}
        <section ref={refRecruit} className="relative py-16 md:py-24 overflow-x-hidden bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              animate={isInViewRecruit ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.55, ease }}
              className="relative rounded-2xl overflow-hidden border border-sky-200/70 bg-gradient-to-br from-slate-50/95 via-white to-sky-50/70 shadow-[0_1px_0_0_rgba(14,165,233,0.06)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                aria-hidden
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 18% 0%, rgba(14,165,233,0.11) 0%, transparent 42%), radial-gradient(circle at 92% 78%, rgba(59,130,246,0.09) 0%, transparent 38%)',
                }}
              />
              <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                    recruit
                  </p>
                  <span className="hidden sm:inline h-3 w-px shrink-0 bg-sky-200/90" aria-hidden />
                  <span className="text-[10px] sm:text-xs font-medium text-sky-700/85">
                    法人・個人 歓迎
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                  ビジネスパートナー
                  <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    募集
                  </span>
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
                  開発現場で協力いただける法人・個人のパートナーを募集しています。案件・人材の連携を通じて、互いの強みを活かした協業を目指します。
                </p>

                <div className="mt-8 border-t border-sky-100/90 pt-8">
                  <p className="text-xs font-semibold tracking-widest text-sky-800/90 mb-4">募集対象</p>
                  <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                    {partnerCategories.map((c, i) => (
                      <div
                        key={c.title}
                        className="relative rounded-xl border border-slate-200/90 bg-white/90 pl-4 pr-3 py-3.5 shadow-sm sm:pl-4"
                      >
                        <span
                          className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-sky-500 to-blue-600"
                          aria-hidden
                        />
                        <p className="text-[11px] font-bold text-slate-400 tabular-nums mb-1">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <p className="text-xs font-bold text-slate-900 leading-snug">{c.title}</p>
                        <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-snug">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-xl border border-slate-200/80 bg-white/80">
                  <p className="border-b border-slate-100 bg-slate-50/90 px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-slate-700">
                    協業のポイント
                  </p>
                  <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {recruitHighlights.map((h) => (
                      <div
                        key={h.label}
                        className="flex flex-col items-center gap-2 px-4 py-5 text-center sm:py-6"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                          {h.icon}
                        </span>
                        <p className="text-sm font-bold text-slate-900 leading-snug">{h.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* 現在のビジネスパートナー（取引先ロゴマルキー） */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-lg sm:text-xl font-semibold text-slate-700 mb-2">現在のビジネスパートナー</p>
            <PartnersMarquee />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
