'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** 首頁：A案 — FMS を主軸、AI は加速・付加価値として配置 */
export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          id="fms"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, ease }}
          className="mb-10"
        >
          <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">FLAGSHIP</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight pb-4 border-b border-slate-200">
            独自サービス FMS で、既存システムを止めずに前へ
          </h2>
          <p
            lang="ja"
            className="text-slate-800 mt-4 w-full max-w-none leading-relaxed text-pretty [word-break:keep-all]"
          >
            <span className="whitespace-nowrap max-[420px]:whitespace-normal">
              Forest Soft Modernization Service（FMS）
            </span>
            を核に、調査から段階移行・運用まで一気通貫で支援します。<br/>
            AI活用は、その過程と成果をさらに押し上げる加速器として組み合わせます。
          </p>
        </motion.div>

        {/* メイン：FMS（冷藍トーン・AI ブロックと同型のレイアウト） */}
        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.55, delay: 0.06, ease }}
          className="relative rounded-2xl overflow-hidden border border-sky-200/70 bg-gradient-to-br from-slate-50/95 via-white to-sky-50/70 shadow-[0_1px_0_0_rgba(14,165,233,0.06)] mb-6"
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
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5">
                  <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                    FMS core
                  </p>
                  <span className="hidden sm:inline h-3 w-px shrink-0 bg-sky-200/90" aria-hidden />
                  <span className="text-[10px] sm:text-xs font-medium text-sky-700/85">
                    診断から運用まで、止めずに進めるモダナイズ
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                  レガシー刷新を、
                  <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    リスクを抑えて段階的に
                  </span>
                </h3>
                <p className="text-sm sm:text-[15px] mt-2.5 leading-relaxed max-w-3xl font-medium text-sky-950/85">
                  ブラックボックス化した資産でも、現状を可視化し、優先順位とロールバック前提で前に進める。
                </p>
                <p className="text-slate-600 text-sm sm:text-[15px] mt-2.5 leading-relaxed max-w-none">
                  仕様が追いきれない・止められないシステムでも、現状診断と優先度設計のうえで移行を進めます。段階的な置き換えでダウンタイムと学習コストを抑え、品質・ドキュメント・監視まで含めた運用まで見据えたモダナイズへつなげます。
                </p>
                <ul className="mt-4 grid sm:grid-cols-3 gap-2.5 text-slate-700">
                  {[
                    { k: '可視化', v: '構成・依存・ボトルネックを整理し、意思決定の材料に。' },
                    { k: '段階移行', v: 'クリティカル領域から着手し、影響範囲をコントロール。' },
                    { k: '運用まで', v: 'リリース後の観測と改善サイクルを設計に組み込む。' },
                  ].map((row) => (
                    <li
                      key={row.k}
                      className="rounded-xl border border-sky-200/55 bg-white/85 px-3.5 py-3 leading-snug shadow-sm shadow-sky-500/[0.04]"
                    >
                      <span className="block text-xs font-bold tracking-wide text-sky-800 mb-1.5">
                        {row.k}
                      </span>
                      <span className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{row.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 flex flex-col gap-2.5 w-full sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col lg:items-stretch">
                <a href="#contact" className="about-cta-primary text-center justify-center">
                  FMSの相談をする
                  <span className="btn-flag-arrow" aria-hidden>→</span>
                </a>
                <a href="/cases" className="about-cta-secondary text-center justify-center border-sky-200/80 hover:border-sky-300 hover:bg-sky-50/70">
                  事例を見る
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-sky-100/90 grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { title: '現状診断', desc: '資産棚卸しと課題の構造化、移行ロードマップの素地づくり' },
                { title: '段階移行', desc: 'ストラングラー等の手法で、業務継続を優先した置き換え' },
                { title: '品質・ドキュメント', desc: 'テスト観点とナレッジを残し、引き継ぎしやすく' },
                { title: '運用最適化', desc: 'メトリクスとアラートで見える化、継続的なチューニング' },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl bg-white/90 border border-sky-200/50 p-3.5 sm:p-4 shadow-sm shadow-sky-500/[0.03]"
                >
                  <p className="text-[15px] sm:text-base font-bold text-slate-900 mb-1.5">{s.title}</p>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.article>

        {/* サブ：AI は加速器（FMS と同系の冷藍・見出しグラデは一段浅め） */}
        <motion.aside
          id="ai"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="relative rounded-2xl border border-sky-200/70 bg-gradient-to-br from-slate-50/95 via-white to-sky-50/70 shadow-[0_1px_0_0_rgba(14,165,233,0.06)] overflow-x-visible overflow-y-visible"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 18% 0%, rgba(14,165,233,0.11) 0%, transparent 42%), radial-gradient(circle at 92% 78%, rgba(59,130,246,0.09) 0%, transparent 38%)',
              }}
            />
          </div>
          <div className="relative p-5 sm:p-6 md:p-8">
            {/* 見出し・本文・CTA：幅 約 2/3（コンテナ基準） */}
            <div className="w-full md:w-2/3 md:max-w-none max-w-full">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5">
                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                  AI accelerator
                </p>
                <span className="hidden sm:inline h-3 w-px shrink-0 bg-sky-200/90" aria-hidden />
                <span className="text-[10px] sm:text-xs font-medium text-sky-700/85">
                  推論・検索・生成を、業務と開発フローに組み込む
                </span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 leading-snug w-full">
                <span className="inline-block whitespace-nowrap max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  FMS・業務開発を、
                  <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">                    AI活用
                  </span>
                  でさらに効かせる
                </span>
              </h3>
              <p className="text-slate-600 text-sm sm:text-[15px] mt-2.5 leading-relaxed">
                社内ナレッジの
                <abbr title="Retrieval-Augmented Generation" className="no-underline border-b border-dotted border-sky-400/90 cursor-help">
                  RAG
                </abbr>
                検索、レガシー帳票の読み取り、コード補助やレビュー下書き、定型オペの自動化まで。目的はデモではなく、
                <span className="font-semibold text-slate-800">移行判断を早く・安全に</span>
                し、現場のスループットを上げることです。
              </p>
              <p className="text-xs text-sky-800/80 mt-2.5 leading-relaxed sm:text-[13px]">
                モデル選定・プロンプト設計・ガバナンス（ログ・権限・人間による最終確認）まで、実装可能な形で伴走します。
              </p>
              <a
                href="#contact"
                className="about-cta-secondary mt-5 inline-flex text-center justify-center text-sm py-2.5 border-sky-200/80 hover:border-sky-300 hover:bg-sky-50/70 w-full sm:w-auto min-w-[200px]"
              >
                AI活用を相談
              </a>
            </div>

            {/* タグ：本文の下・カード幅いっぱいの 1 列（5 等分） */}
            <div
              className="mt-6 sm:mt-7 flex w-full min-w-0 flex-nowrap gap-1.5 sm:gap-2"
              role="list"
              aria-label="AI 活用領域"
            >
              {[
                'RAG / ナレッジ',
                'コードアシスト',
                '帳票・OCR',
                'レビュー補助',
                '業務自動化',
              ].map((t) => (
                <span
                  key={t}
                  role="listitem"
                  className="flex min-w-0 flex-1 items-center justify-center rounded-lg border border-sky-200/60 bg-white/90 px-1 py-2 sm:px-2 sm:py-2.5 text-center text-[9px] font-semibold leading-tight text-sky-900 shadow-sm shadow-sky-500/[0.06] sm:text-[11px] md:text-xs"
                >
                  <span className="line-clamp-2 sm:line-clamp-none">{t}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
