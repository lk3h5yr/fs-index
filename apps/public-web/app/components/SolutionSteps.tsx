'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const steps = [
  {
    step: '01',
    stepLabel: '課題整理',
    title: '要件定義・ヒアリング',
    summary: 'お客様の事業課題と現場運用を整理し、開発の前提を明確にします。',
    bullets: ['現状課題の整理', '業務フローの確認', '要件・優先順位の明確化'],
    deliverable: 'ヒアリング整理 / 要件一覧',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'blue',
    bgTint: 'bg-blue-50/70',
    lineClass: 'bg-blue-500',
    dotClass: 'bg-blue-500',
  },
  {
    step: '02',
    stepLabel: '設計・提案',
    title: '技術提案・設計',
    summary: '拡張性・保守性・セキュリティを踏まえ、最適な構成をご提案します。',
    bullets: ['技術選定', 'アーキテクチャ設計', '概算見積・開発計画'],
    deliverable: '提案書 / 設計方針 / 見積書',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 5h14v14H5V5z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5v14M5 10h14" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.5 14.5h2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 7.5h3" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M7.6 14.2l1.2-1.2 1.2 1.2 2.2-2.2"
        />
      </svg>
    ),
    color: 'indigo',
    bgTint: 'bg-indigo-50/60',
    lineClass: 'bg-indigo-500',
    dotClass: 'bg-indigo-500',
  },
  {
    step: '03',
    stepLabel: '開発・運用',
    title: '開発・運用改善',
    summary: '短いサイクルで開発と改善を進め、公開後の運用まで継続的に支援します。',
    bullets: ['アジャイル開発', '段階的リリース', '保守・改善対応'],
    deliverable: '開発物 / 運用資料 / 改善計画',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'sky',
    bgTint: 'bg-sky-50/60',
    lineClass: 'bg-sky-500',
    dotClass: 'bg-sky-500',
  },
];

export default function SolutionSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">PROCESS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            開発プロセス
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            お客様の課題を解決するための明確なステップ
          </p>
        </motion.div>

        {/* Step bar：01 → 02 → 03 流程軸 */}
        <motion.div
          className="process-step-bar mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {steps.map((s, i) => (
            <span key={s.step} className="flex items-center gap-2">
              <span className="flex items-center gap-2">
                <span className={`step-dot ${s.dotClass}`} aria-hidden />
                <span className="text-sm font-semibold text-slate-700">
                  {s.step} {s.stepLabel}
                </span>
              </span>
              {i < steps.length - 1 && <span className="step-connector" aria-hidden />}
            </span>
          ))}
        </motion.div>

        {/* 3枚のプロセスカード: タイトル + 要約 + 3つのポイント + 成果物 */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`process-card relative p-8 rounded-2xl border border-slate-200/90 h-full flex flex-col ${step.bgTint}`}>
                {/* 編號 + icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${step.dotClass} flex items-center justify-center text-white text-lg font-bold shadow-sm`}>
                    {step.step}
                  </div>
                  <div className={`text-slate-500 ${step.lineClass.replace('bg-', 'text-')}`}>
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {step.summary}
                </p>

                <ul className="space-y-2 mb-5 flex-grow">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${step.lineClass}`} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* 成果物 */}
                <div className="pt-4 border-t border-slate-200/80">
                  <p className="text-xs font-medium text-slate-500 mb-1">成果物</p>
                  <p className="text-xs text-slate-600">{step.deliverable}</p>
                </div>

                {/* 下線: 同系色で、hover 時により目立たせる */}
                <div className="mt-5 pt-4 border-t border-slate-200/60">
                  <div className={`process-card-line h-1 rounded-full ${step.lineClass} opacity-60`} style={{ width: '100%' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}