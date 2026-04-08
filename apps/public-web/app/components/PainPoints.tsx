'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const painPoints = [
  {
    step: '01',
    title: '開発コスト最適化',
    description: 'クラウド・DevOpsで開発・運用コストを抑え、スケーラブルな構成を提案します。',
    stats: 'コスト削減',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    step: '02',
    title: '最新技術への対応',
    description: 'AI、マイクロサービス、コンテナなど、要件に合わせたモダンな技術選定を行います。',
    stats: '先端技術',
    gradient: 'from-indigo-400 to-violet-500',
  },
  {
    step: '03',
    title: 'セキュリティ強化',
    description: '多層防御とゼロトラストの考え方で、法令・ガイドラインに沿った設計を徹底します。',
    stats: '法令準拠',
    gradient: 'from-teal-400 to-cyan-500',
  },
];

export default function PainPoints({
  containerClassName = 'max-w-6xl',
}: {
  containerClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-14 md:py-16 bg-gray-50 relative overflow-hidden">
      <div className={`${containerClassName} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-1.5">REASON</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight pb-3 border-b border-gray-200">
            選ばれる理由
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-2xl leading-snug">
            コスト・技術・セキュリティの三軸で、継続的に価値を届けます。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              className="group relative"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: 0.06 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="reason-card relative flex h-full flex-col rounded-xl border border-slate-200/80 bg-white/95 p-4 sm:p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div
                    className={`reason-number-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${point.gradient} text-[11px] font-bold text-white shadow-sm`}
                  >
                    {point.step}
                  </div>
                  <span
                    className={`reason-badge rounded-md bg-gradient-to-r ${point.gradient} px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:text-xs`}
                  >
                    {point.stats}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-indigo-600/90">
                  {point.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{point.description}</p>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="h-0.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`reason-card-bottom-line h-full rounded-full bg-gradient-to-r ${point.gradient}`}
                    />
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
