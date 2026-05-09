'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import {
  getNewsCategoryTagClassName,
  publishedAtToYYYYMM,
  type CmsNewsPublicItem,
} from '@/app/lib/cmsNewsShared';

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [items, setItems] = useState<CmsNewsPublicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const r = await fetch('/api/news?limit=5');
        const data = await r.json();
        if (cancelled) return;
        if (!r.ok) {
          setError(typeof data.error === 'string' ? data.error : '読み込みに失敗しました。');
          setItems([]);
          return;
        }
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch {
        if (!cancelled) {
          setError('通信エラーが発生しました。');
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section ref={ref} className="pt-14 pb-24 sm:pt-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 見出しエリア: タイトルはフェードインしながら上昇、副題と「一覧を見る」は少し遅れて表示 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
          <div className="flex-1">
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-medium tracking-widest text-gray-400">NEWS</p>
            </motion.div>
            <div className="relative pb-4">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight news-title-line"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                お知らせ
              </motion.h2>
              <motion.div
                className="absolute left-0 right-0 bottom-0 h-px bg-gray-200 news-title-line"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            <motion.p
              className="text-gray-600 mt-4 max-w-xl"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              会社からの最新情報をお届けします。
            </motion.p>
          </div>
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Link href="/news" className="news-cta-link text-blue-600 font-semibold text-sm">
              一覧を見る
              <span className="news-cta-arrow" aria-hidden>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">読み込み中…</p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-700">{error}</p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">現在掲載のニュースはありません。</p>
        ) : (
          <ul className="space-y-1">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/news?id=${encodeURIComponent(item.id)}`}
                  className="news-list-row flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl"
                >
                  <span className="text-xs font-medium tabular-nums text-slate-600 sm:text-sm">
                    {publishedAtToYYYYMM(item.publishedAt)}
                  </span>
                  <span className={`${getNewsCategoryTagClassName(item.category)} news-tag-fixed`}>
                    {item.category}
                  </span>
                  <span className="news-row-title flex-1 min-w-0 text-slate-800 font-medium text-sm sm:text-base md:text-lg transition-all duration-250">
                    {item.title}
                  </span>
                  <span className="news-row-arrow text-slate-400 transition-transform duration-250">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
