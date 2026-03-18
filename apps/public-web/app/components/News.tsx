'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';

const newsItems = [
  { id: 1, date: '2023.12.15', tag: '受賞情報', title: 'ベース株式会社様より2023年度のベストパートナー賞を受賞' },
  { id: 2, date: '2023.11.30', tag: 'お知らせ', title: '年末年始休業のお知らせ' },
  { id: 3, date: '2023.10.12', tag: 'ニュース', title: '新サービス提供開始のお知らせ' },
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 標題區：標題淡入上移 + 副標與一覧を見る延遲淡入 */}
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
                className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight news-title-line"
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

        {/* 三筆列表：stagger 進場 */}
        <ul className="space-y-1">
          {newsItems.map((item, index) => (
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
              <Link href={`/news?id=${item.id}`} className="news-list-row flex flex-wrap items-center gap-x-4 gap-y-2 py-4 px-5 rounded-xl">
                <span className="text-slate-500 text-sm tabular-nums">{item.date}</span>
                <span className="news-row-tag inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium transition-colors duration-250">
                  {item.tag}
                </span>
                <span className="news-row-title flex-1 min-w-0 text-slate-800 font-medium text-base md:text-lg transition-all duration-250">
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
      </div>
    </section>
  );
}
