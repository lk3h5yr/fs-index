'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const services = [
  {
    title: 'AI・機械学習開発',
    summary: '業務課題に直結するAI活用を支援します。',
    scopes: ['自然言語処理', '画像認識', '予測分析'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: 'hover:border-blue-400',
    accentText: 'group-hover:text-blue-600',
    iconText: 'text-blue-600',
  },
  {
    title: 'クラウドネイティブ開発',
    summary: 'スケーラブルで運用しやすいクラウド基盤を構築します。',
    scopes: ['AWS / Azure / GCP', 'マイクロサービス', 'コンテナ・Kubernetes'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    accent: 'hover:border-indigo-400',
    accentText: 'group-hover:text-indigo-600',
    iconText: 'text-indigo-600',
  },
  {
    title: 'モバイルアプリ開発',
    summary: '体験品質を重視したアプリをスピーディに届けます。',
    scopes: ['React Native / Flutter', 'iOS / Android', 'UI・UX設計'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    accent: 'hover:border-sky-400',
    accentText: 'group-hover:text-sky-600',
    iconText: 'text-sky-600',
  },
  {
    title: 'DX推進コンサルティング',
    summary: '業務の可視化と改善で、成果につながるDXを進めます。',
    scopes: ['業務可視化', '自動化・最適化', 'データ活用'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: 'hover:border-slate-400',
    accentText: 'group-hover:text-slate-800',
    iconText: 'text-slate-600',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-24 md:py-28 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            サービス・ソリューション
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">最先端技術でお客様のビジネスを革新</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`group relative p-9 md:p-10 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 overflow-hidden transition-colors ${service.accent}`}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`mb-6 ${service.iconText} transition-transform duration-300 group-hover:scale-[1.05]`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 text-slate-900 transition-colors ${service.accentText}`}>
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {service.summary}
                </p>

                <p className="text-sm text-slate-500 mb-6">
                  {service.scopes.join(' / ')}
                </p>

                <div className="mt-auto pt-5 border-t border-slate-100">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-slate-700 font-semibold"
                  >
                    <span className="relative">
                      詳しく見る
                      <span className="absolute left-0 -bottom-1 h-px w-0 bg-slate-700 transition-[width] duration-300 ease-out group-hover:w-full" />
                    </span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
