'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

const certifications = [
  {
    name: 'ISO/IEC 27001:2013 (JIS Q 27001:2014)',
    description: '情報セキュリティマネジメントシステム（ISMS）の国際規格',
    date: '2020年12月取得（移転）',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: 'プライバシーマーク',
    description: '一般財団法人日本情報経済社会推進協会（JIPDEC）より認定',
    date: '2018年8月21日取得',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: '労働者派遣事業許可',
    description: '適切な労働者派遣事業の実施',
    date: '取得済み',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function CertificationsPage() {
  const refHero = useRef(null);
  const refList = useRef(null);
  const refBand = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });
  const isInViewBand = useInView(refBand, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="certifications" />
      <div className="relative z-10">
        <Navbar />

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
              <span className="text-gray-700">資格情報</span>
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-xl"
            >
              <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">CERTIFICATIONS</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                資格情報
              </h1>
              <p className="text-slate-600 mt-4 text-base leading-relaxed">
                取得資格・認証一覧
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
              className="careers-lead-core"
            >
              <p className="careers-lead-core-text">
                フォレストソフト株式会社が取得している資格・認証をご紹介します。
                情報セキュリティマネジメント（ISMS）、プライバシーマーク、労働者派遣事業許可など、品質とセキュリティへの取り組みを掲載しています。
              </p>
            </motion.div>
          </div>
          </div>
        </section>

        <section ref={refList} className="py-24 md:py-28 bg-slate-100 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="mb-12"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-2 border-b border-slate-200 mb-2">
                取得資格・認証
              </h2>
              <p className="text-slate-600 text-sm">当社が取得している資格・認証をご紹介します。</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease }}
                  className="company-profile-card p-5 sm:p-6 md:p-8 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                    {cert.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">{cert.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-4 flex-grow">{cert.description}</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={refBand} className="py-16 md:py-20 bg-slate-100 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInViewBand ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              className="p-8 md:p-10 rounded-2xl border border-slate-200/90 bg-slate-50/80"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">品質とセキュリティへの取り組み</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                フォレストソフト株式会社は、国際規格に準拠した品質管理と情報セキュリティ管理を実施し、
                お客様に安心してご利用いただけるサービスを提供しています。
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
