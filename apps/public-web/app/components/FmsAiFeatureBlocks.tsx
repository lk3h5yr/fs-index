'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** 企業紹介：FMS コアカード */
export default function FmsAiFeatureBlocks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="mt-10">
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.55, delay: 0.06, ease }}
        className="relative rounded-2xl overflow-hidden border border-sky-200/70 bg-gradient-to-br from-slate-50/95 via-white to-sky-50/70 shadow-[0_1px_0_0_rgba(14,165,233,0.06)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 0%, rgba(14,165,233,0.11) 0%, transparent 42%), radial-gradient(circle at 92% 78%, rgba(59,130,246,0.09) 0%, transparent 38%)',
          }}
        />
        <div className="relative p-5 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-8">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                  FMS core
                </p>
                <span className="hidden sm:inline h-3 w-px shrink-0 bg-sky-200/90" aria-hidden />
                <span className="text-[10px] sm:text-xs font-medium text-sky-700/85">
                  止めずに進めるモダナイズ
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                レガシー刷新を、
                <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  リスクを抑えて段階的に
                </span>
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-2xl">
                現状を可視化し、優先度とロールバック前提で段階移行。ダウンタイムを抑え、運用まで一気通貫で支援します。
              </p>
              <ul className="mt-4 grid sm:grid-cols-3 gap-2.5 text-slate-700">
                {[
                  { k: '可視化', v: '構成・依存・ボトルネックを整理' },
                  { k: '段階移行', v: '影響範囲を抑えた置き換え' },
                  { k: '運用まで', v: '監視と改善のサイクルを設計' },
                ].map((row) => (
                  <li
                    key={row.k}
                    className="rounded-xl border border-sky-200/55 bg-white/85 px-3 py-2.5 sm:px-3.5 sm:py-3 leading-snug shadow-sm shadow-sky-500/[0.04]"
                  >
                    <span className="block text-xs font-bold tracking-wide text-sky-800 mb-1">
                      {row.k}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-600 leading-snug">{row.v}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col gap-2.5 w-full sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col lg:items-stretch">
              <a href="/contact" className="about-cta-primary about-cta-primary--sm text-center justify-center">
                FMSの相談をする
                <span className="btn-flag-arrow" aria-hidden>→</span>
              </a>
              <a href="/cases" className="about-cta-secondary about-cta-secondary--sm text-center justify-center border-sky-200/80 hover:border-sky-300 hover:bg-sky-50/70">
                事例を見る
              </a>
            </div>
          </div>

          {/* カード幅いっぱいのプロセス帯（親の横パディングを相殺して全幅） */}
          <div
            className="-mx-5 sm:-mx-6 md:-mx-8 mt-6 border-t border-sky-100/90 bg-sky-100/40 px-3 py-3.5 sm:px-5 sm:py-4 md:px-7 md:py-4"
            aria-label="支援の流れ"
          >
            <div className="flex w-full min-w-0 items-stretch justify-between gap-1 text-[10px] leading-tight text-sky-950 sm:gap-1.5 sm:text-xs md:gap-2 md:text-[13px]">
              {(['現状診断', '段階移行', '品質・ドキュメント', '運用最適化'] as const).map((label, i) => (
                <span key={label} className="flex min-w-0 flex-1 items-center">
                  {i > 0 && (
                    <span className="shrink-0 px-0.5 text-sky-400 sm:px-1" aria-hidden>
                      →
                    </span>
                  )}
                  <span className="flex min-h-[2.5rem] min-w-0 flex-1 items-center justify-center rounded-lg bg-white/95 px-1.5 py-2 text-center font-semibold shadow-sm shadow-sky-900/[0.04] ring-1 ring-sky-200/65 sm:min-h-0 sm:px-2 sm:py-2.5">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
