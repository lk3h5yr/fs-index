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

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-28 bg-gray-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            よくある質問
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">お客様からよくいただくご質問</p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl overflow-hidden transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors relative z-10"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-900 text-lg">
                  {faq.question}
                </span>
                <motion.span
                  className="text-2xl text-blue-600 font-bold"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t-2 border-slate-200">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
