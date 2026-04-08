'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    step: '01',
    stepLabel: '課題整理',
    title: '要件定義・ヒアリング',
    summary: '課題と業務フローを整理し、要件の前提を固めます。',
    deliverable: 'ヒアリング整理／要件一覧',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    bgTint: 'bg-blue-50/70',
    lineClass: 'bg-blue-500',
    dotClass: 'bg-blue-500',
    iconColor: 'text-blue-500',
  },
  {
    step: '02',
    stepLabel: '設計・提案',
    title: '技術提案・設計',
    summary: '拡張性・保守性を踏まえ、構成と計画をご提案します。',
    deliverable: '提案書／設計方針／見積',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5h14v14H5V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5v14M5 10h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.5 14.5h2.5M14 7.5h3" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7.6 14.2l1.2-1.2 1.2 1.2 2.2-2.2" />
      </svg>
    ),
    bgTint: 'bg-indigo-50/60',
    lineClass: 'bg-indigo-500',
    dotClass: 'bg-indigo-500',
    iconColor: 'text-indigo-500',
  },
  {
    step: '03',
    stepLabel: '開発・運用',
    title: '開発・運用改善',
    summary: '短いサイクルで開発し、公開後の運用も継続支援します。',
    deliverable: '成果物／運用資料／改善計画',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    bgTint: 'bg-sky-50/60',
    lineClass: 'bg-sky-500',
    dotClass: 'bg-sky-500',
    iconColor: 'text-sky-500',
  },
];

export default function SolutionSteps({
  containerClassName = 'max-w-6xl',
}: {
  containerClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-14 md:py-18 bg-white relative">
      <div className={`${containerClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-1.5">PROCESS</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight pb-3 border-b border-gray-200">
            開発プロセス
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-2xl leading-snug">
            課題整理から設計・開発まで、3ステップで進めます。
          </p>
          <p className="mt-2.5 text-xs font-medium text-slate-500 tracking-wide">
            {steps.map((s) => `${s.step} ${s.stepLabel}`).join('  →  ')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: 0.06 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`process-card h-full rounded-xl border border-slate-200/90 p-4 sm:p-5 flex flex-col ${step.bgTint}`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm ${step.dotClass}`}
                  >
                    {step.step}
                  </div>
                  <div className={`${step.iconColor} opacity-90`}>{step.icon}</div>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 mb-1">{step.stepLabel}</p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">{step.summary}</p>
                <p className="mt-3 pt-2.5 border-t border-slate-200/70 text-[10px] sm:text-xs text-slate-500 leading-snug">
                  <span className="font-medium text-slate-600">成果物</span> {step.deliverable}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
