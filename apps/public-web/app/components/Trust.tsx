'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { number: '150+', label: 'プロジェクト実績', description: '多様な業界での成功事例' },
  { number: '80+', label: 'お取引企業様', description: '上場企業からスタートアップまで' },
  { number: '15+', label: '年の実績', description: '長年の信頼とノウハウ' },
  { number: '99%', label: '顧客満足度', description: '継続的な改善とサポート' },
];

export default function Trust({
  containerClassName = 'max-w-6xl',
}: {
  containerClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-28 bg-white relative">
      <div className={`${containerClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">TRACK RECORD</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            実績と信頼
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">多くの企業様に選ばれている実績</p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center px-4 py-5 sm:px-5 sm:py-6 rounded-xl bg-white border border-slate-200 hover:border-blue-400/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-blue-600 tabular-nums">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-snug">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* お取引企業様 → パートナー（帯ではなく区切り線＋コンパクトな1行導線） */}
        <motion.div
          className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8">
            <div className="min-w-0 flex gap-4">
              <span
                className="hidden sm:block w-1 shrink-0 rounded-full bg-slate-300/90 self-stretch min-h-[3rem]"
                aria-hidden
              />
              <div>
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-1">PARTNER</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  お取引企業様
                </p>
                <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                  協業・取引に関する詳細は、ビジネスパートナーページをご覧ください。
                </p>
              </div>
            </div>
            <Link
              href="/partners"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-[#1e3a5f]/40 hover:bg-slate-50 hover:text-[#1e3a5f] sm:min-w-[11rem]"
            >
              パートナーを見る
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
