'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';
import { formatNewsDateForPopup, renderNewsPopupBody } from '@/app/lib/newsPopupBody';
import {
  getNewsCategoryTagClassName,
  publishedAtToYYYYMM,
  type CmsNewsPublicItem,
} from '@/app/lib/cmsNewsShared';

const ease = [0.22, 1, 0.36, 1] as const;

type NewsItem = CmsNewsPublicItem;

function NewsPageContent() {
  const refHero = useRef(null);
  const refList = useRef(null);
  const searchParams = useSearchParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setListLoading(true);
      setListError(null);
      try {
        const r = await fetch('/api/news');
        const data = await r.json();
        if (cancelled) return;
        if (!r.ok) {
          setListError(typeof data.error === 'string' ? data.error : '読み込みに失敗しました。');
          setNewsItems([]);
          return;
        }
        setNewsItems(Array.isArray(data.items) ? data.items : []);
      } catch {
        if (!cancelled) {
          setListError('通信エラーが発生しました。');
          setNewsItems([]);
        }
      } finally {
        if (!cancelled) setListLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id || newsItems.length === 0) return;
    const item = newsItems.find((n) => n.id === id);
    if (item) setSelectedNews(item);
  }, [searchParams, newsItems]);

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="news" />
      <div className="relative z-10 isolate">
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
                <Link href="/" className="hover:text-gray-700 transition-colors">ホーム</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">ニュース</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">NEWS</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  ニュース
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  フォレストソフト株式会社の最新ニュース、イベント・セミナー開催情報を掲載しています。
                  経営・製品・サービス・お知らせ・IRに関する情報をお届けします。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={refList} className="py-16 md:py-20 bg-slate-100 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease }}
              className="text-center mb-10"
            >
              <h2 className="news-release-title">ニュース一覧</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="company-panel overflow-hidden"
            >
              {listLoading ? (
                <div className="px-8 py-16 text-center text-slate-500">読み込み中…</div>
              ) : listError ? (
                <div className="px-8 py-12 text-center text-sm text-red-700">{listError}</div>
              ) : newsItems.length === 0 ? (
                <div className="px-8 py-16 text-center text-slate-500">
                  現在掲載のニュースはありません。
                </div>
              ) : (
                newsItems.map((news) => (
                  <button
                    key={news.id}
                    type="button"
                    onClick={() => setSelectedNews(news)}
                    className="news-list-row group flex w-full cursor-pointer flex-col items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50/80 sm:flex-row sm:gap-4 sm:px-8 sm:py-5"
                  >
                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs font-medium tabular-nums text-slate-600 sm:text-sm">
                        {publishedAtToYYYYMM(news.publishedAt)}
                      </span>
                      <span className={`${getNewsCategoryTagClassName(news.category)} news-tag-fixed`}>
                        {news.category}
                      </span>
                    </div>
                    <div className="flex w-full flex-1 items-start gap-3 sm:min-w-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#0ea5e9] sm:text-base">
                          {news.title}
                        </h3>
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                          {news.description}
                        </p>
                      </div>
                      <span className="news-arrow shrink-0 self-center sm:self-start" aria-hidden>›</span>
                    </div>
                  </button>
                ))
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedNews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="news-popup-backdrop fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
              aria-hidden
            />
            <div className="news-popup-wrap pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="news-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="news-popup pointer-events-auto flex max-h-[92vh] w-[min(96vw,42rem)] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="news-popup-glow pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <div className="news-popup-header shrink-0 px-4 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
                    <span className="news-popup-tag mb-4 inline-block">{selectedNews.category}</span>
                    <h2 id="news-popup-title" className="news-popup-title font-bold leading-snug text-slate-900">
                      {selectedNews.title}
                    </h2>
                    <p className="news-popup-date mt-3 text-slate-500">
                      {formatNewsDateForPopup(selectedNews.publishedAt)}
                    </p>
                  </div>
                  <div className="news-popup-body min-h-0 flex-1 overflow-y-auto px-4 py-2 sm:px-6">
                    <div className="news-popup-content">{renderNewsPopupBody(selectedNews.body)}</div>
                  </div>
                  <div className="news-popup-footer flex shrink-0 justify-center px-4 pb-5 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedNews(null)}
                      className="news-popup-close-btn about-cta-secondary popup-close-btn"
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

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <main className="relative flex min-h-screen items-center justify-center bg-white">
          <span className="text-gray-500">読み込み中...</span>
        </main>
      }
    >
      <NewsPageContent />
    </Suspense>
  );
}
