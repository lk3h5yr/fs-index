'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const painPoints = [
  {
    number: 'REASON.01',
    title: '開発コストの最適化',
    description: 'クラウドネイティブアーキテクチャとDevOps手法により、開発コストを最大40%削減。スケーラブルなシステム構築で、長期的な運用コストも最適化します。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-blue-400 to-indigo-500',
    stats: '40%削減',
  },
  {
    number: 'REASON.02',
    title: '最新技術への対応',
    description: 'AI・機械學習、マイクロサービス、コンテナ技術など、最先端技術を活用したシステム開発を実現。技術トレンドに遅れない、未来志向のソリューションを提供します。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-indigo-400 to-violet-500',
    stats: '最先端',
  },
  {
    number: 'REASON.03',
    title: 'セキュリティ強化',
    description: 'ゼロトラストセキュリティモデルと多層防御により、サイバー攻撃から企業資産を保護。GDPR・個人情報保護法にも完全準拠した安全なシステムを構築します。',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: 'from-teal-400 to-cyan-500',
    stats: '100%準拠',
  },
];

export default function PainPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">REASON</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            選ばれる理由
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            最新技術と豊富な実績で、お客様のビジネスを成功に導きます
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                  {/* 卡片主體：hover 微浮起 + 底線 hover 展開 */}
                  <div className="reason-card relative p-10 rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/80 h-full flex flex-col mt-8">
                    {/* 編號（透明外圈）+ 統計 badge（微光/漸層流動） */}
                    <div className="absolute -top-6 left-8 flex items-center gap-3">
                      <div className={`reason-number-ring inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${point.gradient} text-white text-sm font-bold transition-shadow duration-300`}>
                        {point.number.split('.')[1]}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      >
                        <div className={`reason-badge inline-block px-4 py-2 bg-gradient-to-r ${point.gradient} text-white text-sm font-bold rounded-lg shadow-md`}>
                          {point.stats}
                        </div>
                      </motion.div>
                    </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 group-hover:text-indigo-500/80 transition-colors duration-300 mt-12">
                  {point.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-lg flex-grow">
                  {point.description}
                </p>

                {/* 底線：hover 時展開 */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`reason-card-bottom-line h-full bg-gradient-to-r ${point.gradient} rounded-full`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
