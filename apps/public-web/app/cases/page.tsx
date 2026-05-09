'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';
import type { CmsCasePublicItem } from '@/app/lib/cmsCasesShared';

const ease = [0.22, 1, 0.36, 1] as const;

type CaseItem = CmsCasePublicItem;

function CasesPageContent() {
  const refHero = useRef(null);
  const refList = useRef(null);
  const [casesByDate, setCasesByDate] = useState<CaseItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const r = await fetch('/api/cases');
        const data = await r.json();
        if (cancelled) return;
        if (!r.ok) {
          setListError(typeof data.error === 'string' ? data.error : '読み込みに失敗しました。');
          setCasesByDate([]);
          return;
        }
        const rows = Array.isArray(data.items) ? (data.items as CaseItem[]) : [];
        /** API は deliveredAt 降順だが、納品月文字でも近い順を保証 */
        setCasesByDate(rows);
      } catch {
        if (!cancelled) {
          setListError('通信エラーが発生しました。');
          setCasesByDate([]);
        }
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="cases" />
      <div className="relative z-10">
        <Navbar />

        {/* 導入セクション: careers と統一したスタイル */}
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
                <Link href="/" className="hover:text-gray-700 transition-colors">
                  ホーム
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">開発事例</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">CASES</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  開発事例
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  業務系Web・モバイルアプリ・クラウド移行・システム統合など、幅広い分野での開発事例を掲載しています。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={refList} className="pt-10 pb-16 md:pt-12 md:pb-20 bg-slate-100 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {listLoading ? (
              <div className="py-16 text-center text-slate-500">読み込み中…</div>
            ) : listError ? (
              <div className="py-12 text-center text-sm text-red-700">{listError}</div>
            ) : casesByDate.length === 0 ? (
              <div className="py-16 text-center text-slate-500">現在掲載の開発事例はありません。</div>
            ) : (
              <ul className="relative cases-timeline cases-timeline-zigzag">
                <span className="cases-timeline-track" aria-hidden />
                {casesByDate.map((caseItem, index) => {
                  const isLeft = index % 2 === 0;
                  const nodeColor = index % 3;

                  return (
                    <motion.li
                      key={caseItem.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="cases-timeline-item relative grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 items-start py-4 first:pt-0 last:pb-0 group"
                    >
                      {isLeft ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setSelectedCase(caseItem)}
                            className="cases-timeline-btn order-1 text-right rounded-xl py-3 px-4 transition-[background-color,color] duration-200 group/btn col-start-1 col-end-2"
                          >
                            <span className="block text-slate-500 text-xs sm:text-sm mb-0.5">
                              {caseItem.deliveryDate}
                            </span>
                            <span className="block text-base sm:text-lg font-bold text-slate-900 group-hover/btn:text-[#1e3a5f] transition-colors leading-snug">
                              {caseItem.title}
                            </span>
                          </button>
                          <div
                            className={`cases-timeline-node cases-timeline-node--${nodeColor} order-2 col-start-2 col-end-3 relative z-10 flex justify-center mt-0.5`}
                            aria-hidden
                          />
                          <div className="order-3 col-start-3 col-end-4" aria-hidden />
                        </>
                      ) : (
                        <>
                          <div className="order-1 col-start-1 col-end-2" aria-hidden />
                          <div
                            className={`cases-timeline-node cases-timeline-node--${nodeColor} order-2 col-start-2 col-end-3 relative z-10 flex justify-center mt-0.5`}
                            aria-hidden
                          />
                          <button
                            type="button"
                            onClick={() => setSelectedCase(caseItem)}
                            className="cases-timeline-btn order-3 text-left rounded-xl py-3 px-4 transition-[background-color,color] duration-200 group/btn col-start-3 col-end-4"
                          >
                            <span className="block text-slate-500 text-xs sm:text-sm mb-0.5">
                              {caseItem.deliveryDate}
                            </span>
                            <span className="block text-base sm:text-lg font-bold text-slate-900 group-hover/btn:text-[#1e3a5f] transition-colors leading-snug">
                              {caseItem.title}
                            </span>
                          </button>
                        </>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSelectedCase(null)}
              aria-hidden
            />
            <div className="case-popup-wrap fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="case-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="case-popup w-[min(96vw,42rem)] max-h-[92vh] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex flex-col flex-1 min-h-0">
                  <div className="shrink-0 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 border-b border-slate-200/80">
                    <span className="inline-block px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold mb-3">
                      {selectedCase.category}
                    </span>
                    <h2
                      id="case-popup-title"
                      className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-4"
                    >
                      {selectedCase.title}
                    </h2>
                    <div className="grid gap-2 text-xs sm:text-sm">
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">クライアント：</span>
                        {selectedCase.client}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">納品：</span>
                        {selectedCase.deliveryDate}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-600">効果・メリット：</span>
                        {selectedCase.benefits}
                      </p>
                      {selectedCase.tech.length ? (
                        <p className="text-slate-700">
                          <span className="font-semibold text-slate-600">技術：</span>
                          {selectedCase.tech.join('、')}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 min-h-0 px-4 sm:px-6 py-4 sm:py-5 text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                    <div className="case-popup-body whitespace-pre-line">{selectedCase.detail}</div>
                  </div>
                  <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-5 sm:pb-8 flex justify-center border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(null)}
                      className="about-cta-secondary popup-close-btn"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default function CasesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CasesPageContent />
    </Suspense>
  );
}
