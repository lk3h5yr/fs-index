'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const faqs = [
  {
    question: '開発期間はどのくらいかかりますか？',
    answer: 'プロジェクトの規模により異なります。小規模なWebアプリケーションで2-3ヶ月、中規模のシステム統合で6-12ヶ月、大規模なエンタープライズシステムで12-24ヶ月程度を想定しています。アジャイル開発手法により、段階的なリリースも可能です。',
  },
  {
    question: '既存システムとの連携は可能ですか？',
    answer: 'はい、REST API、GraphQL、SOAP、データベース連携など、様々な方法で既存システムとの統合に対応しています。レガシーシステムのモダナイゼーションも実績豊富です。',
  },
  {
    question: 'クラウド移行のサポートはありますか？',
    answer: 'AWS、Azure、GCPへの移行実績が豊富です。リフト&シフトからクラウドネイティブへの再構築まで、お客様の要件に応じた最適な移行戦略を提案します。',
  },
  {
    question: 'セキュリティ対策はどうなっていますか？',
    answer: 'OWASP Top 10に準拠したセキュリティ対策を実施。ペネトレーションテスト、脆弱性診断、暗号化通信、多要素認証など、多層防御により企業資産を保護します。GDPR、個人情報保護法にも完全準拠しています。',
  },
  {
    question: '保守・運用サポートはありますか？',
    answer: '24時間365日の監視体制と、インシデント対応、パッチ適用、バックアップ管理など、包括的な保守・運用サービスを提供しています。SLAに基づいた品質保証も行います。',
  },
  {
    question: '開発チームの体制はどうなっていますか？',
    answer: 'プロジェクトマネージャー、システムアーキテクト、フロントエンド/バックエンドエンジニア、QAエンジニアなど、プロジェクト規模に応じた最適なチーム編成を提案します。オフショア開発も対応可能です。',
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </motion.span>
  );
}

export default function FAQ({ variant = 'default' }: { variant?: 'default' | 'page' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isPage = variant === 'page';

  return (
    <section
      id="faq"
      ref={ref}
      className={
        isPage
          ? 'relative scroll-mt-28'
          : 'py-16 md:py-28 bg-slate-50 relative'
      }
    >
      <div
        className={
          isPage
            ? 'rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 md:p-7 shadow-md shadow-slate-900/[0.05]'
            : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
        }
      >
        <motion.div
          className={isPage ? 'mb-6 md:mb-8' : 'mb-10 md:mb-16'}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">FAQ</p>
          <h2
            className={
              isPage
                ? 'text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-200'
                : 'text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight pb-3 md:pb-4 border-b border-slate-200'
            }
          >
            よくある質問
          </h2>
          <p className="text-slate-600 mt-3 md:mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
            {isPage
              ? '送信前に、よくあるご質問もあわせてご確認ください。'
              : 'お客様からよくいただくご質問'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-2.5 md:gap-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`rounded-xl border shadow-sm transition-[border-color,box-shadow] duration-200 ${
                  isPage ? 'bg-slate-50/90' : 'bg-white'
                } ${
                  open
                    ? 'border-[#1e3a5f]/20 shadow-md shadow-slate-200/50 ring-1 ring-[#1e3a5f]/10'
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-4 py-3.5 md:px-5 md:py-4 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-[#1e3a5f]">
                    Q
                  </span>
                  <span className="min-w-0 flex-1 text-xs font-semibold leading-snug text-slate-800 sm:text-[13px] md:text-sm">
                    {faq.question}
                  </span>
                  <Chevron open={open} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mx-3 mb-3 rounded-lg border border-slate-100 bg-slate-50/90 px-3.5 py-3 md:mx-4 md:mb-4 md:px-4 md:py-3.5">
                        <p className="text-[11px] leading-[1.7] text-slate-600 sm:text-xs md:text-[13px] md:leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
