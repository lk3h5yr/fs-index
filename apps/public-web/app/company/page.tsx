'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

const MAP_EMBED_URL = 'https://www.google.com/maps?q=35.6862,139.7742&z=17&hl=ja&output=embed';

/** 事業概要のカード（標題・本文・アイコン） */
const profileCards = [
  {
    label: 'システム・ソフトウェア',
    title: 'コンピュータシステム及びソフトウェアの企画・開発・販売・保守',
    description: '要件定義・設計・開発・テストから運用・保守まで一貫して対応し、業務効率化やお客様の課題解決を支援します。',
    accentClass: 'company-profile-card-accent--system',
    iconWrapClass: 'company-profile-card-icon-wrap--system',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: '労働者派遣事業',
    title: '人材のご紹介・派遣',
    description: '厚生労働大臣の許可に基づき、当社が雇用する人材を派遣先の指揮命令のもとで就労させる事業です。お客様のニーズに合わせた人材のご紹介・派遣を行っています。',
    accentClass: 'company-profile-card-accent--people',
    iconWrapClass: 'company-profile-card-icon-wrap--people',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function CompanyPage() {
  const refHero = useRef(null);
  const refProfile = useRef(null);
  const refDetail = useRef(null);
  const refMap = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewProfile = useInView(refProfile, { once: true, margin: '-80px' });
  const isInViewDetail = useInView(refDetail, { once: true, margin: '-80px' });
  const isInViewMap = useInView(refMap, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="company" />
      <div className="relative z-10">
        <Navbar />

        {/* 前導區塊：與 careers 同風格 */}
        <section ref={refHero} className="careers-lead relative overflow-hidden">
          <div className="careers-lead-bg" aria-hidden>
            <div className="careers-lead-bg-base" />
            <div className="careers-lead-bg-shape" />
          </div>
          <div className="careers-lead-inner relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease }}
                className="text-sm text-gray-500 mb-4"
                aria-label="パンくず"
              >
                <Link href="/" className="hover:text-gray-700 transition-colors">ホーム</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">会社情報</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">COMPANY</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  会社情報
                </h1>
                <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
                  会社概要・所在地・お問い合わせ先
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  フォレストソフト株式会社の会社概要・事業概要・所在地・お問い合わせ先をご案内しています。
                  システム・ソフトウェアの企画・開発・販売・保守、および労働者派遣事業を展開しています。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPANY PROFILE：事業概要（我々にできること同様の底圖） */}
        <section ref={refProfile} className="about-capability-section py-20 md:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewProfile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="text-center mb-10 md:mb-12"
            >
              <p className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-2">COMPANY PROFILE</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e3a5f] tracking-tight">事業概要</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {profileCards.map((card, index) => (
                <motion.article
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInViewProfile ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease }}
                  className="company-profile-card flex overflow-hidden"
                >
                  <div className={`company-profile-card-accent ${card.accentClass}`} aria-hidden />
                  <div className="flex-1 min-w-0 p-5 sm:p-6 flex gap-4">
                    <div className={`company-profile-card-icon-wrap ${card.iconWrapClass}`}>
                      {card.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1.5">{card.label}</p>
                      <h3 className="text-slate-900 font-bold text-base sm:text-lg leading-snug mb-2">{card.title}</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 会社詳細 */}
        <section ref={refDetail} className="py-16 md:py-20 relative bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewDetail ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {/* 会社概要 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">会社概要</h2>
                <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                  <li>会社名：フォレストソフト株式会社</li>
                  <li>設立日： 2012年10月1日</li>
                  <li>資本金： 5000万円</li>
                  <li>所在地： 東京都中央区日本橋本町日本橋本町ＴＨビル７階</li>
                  <li>代表取締役：朱　杰</li>
                  <li>取締役：魏　書興</li>
                </ul>
              </div>

              {/* 主な取引先 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">主な取引先</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-700 text-sm sm:text-base">
                  <li>京葉鐵鋼埠頭㈱</li>
                  <li>㈱DTS</li>
                  <li>㈱SHIFT</li>
                  <li>㈱フォーカスシステムズ</li>
                  <li>㈱アイ・エス・ビー</li>
                  <li>㈱NTTデータビジネスブレインズ</li>
                  <li>㈱アイフロント</li>
                  <li>㈱YSLソリューション</li>
                  <li>㈱エスディーシィー</li>
                  <li>㈱BASE</li>
                  <li>㈱東和コンピュータマネジメント</li>
                  <li>㈱オリゾンシステムズ</li>
                  <li>㈱CAICAテクノロジーズ</li>
                  <li>日本事務器シェアードサービス㈱</li>
                </ul>
              </div>

              {/* 売上高 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">売上高</h2>
                <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                  <li>2022年9月期：9.6億円</li>
                  <li>2023年9月期：11.8億円</li>
                  <li>2024年9月期：10.5億円</li>
                  <li>2025年9月期：12.1億円</li>
                </ul>
              </div>

              {/* 取引銀行 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">取引銀行</h2>
                <ul className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                  <li>りそな銀行　神田支店</li>
                  <li>みずほ銀行　小舟町支店</li>
                  <li>楽天銀行　第一営業支店</li>
                </ul>
              </div>

              {/* 連絡先 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">連絡先</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200/90">
                  <table className="w-full border-collapse bg-white">
                    <tbody className="company-access-table">
                      <tr className="border-b border-slate-200/80">
                        <th className="company-access-th">電話</th>
                        <td className="company-access-td">
                          <a href="tel:03-3527-3652" className="text-slate-900 hover:no-underline">03-3527-3652</a>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200/80">
                        <th className="company-access-th">メール</th>
                        <td className="company-access-td">
                          <a href="mailto:info@forestsoft.jp" className="text-slate-900 hover:no-underline">info@forestsoft.jp</a>
                        </td>
                      </tr>
                      <tr>
                        <th className="company-access-th">ウェブ</th>
                        <td className="company-access-td">
                          <a href="https://www.forestsoft.jp" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:no-underline">forestsoft.jp</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 登録・番号 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">登録・番号</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200/90">
                  <table className="w-full border-collapse bg-white">
                    <tbody className="company-access-table">
                      <tr className="border-b border-slate-200/80">
                        <th className="company-access-th">労働者派遣事業許可</th>
                        <td className="company-access-td">派１３−３１０９６８</td>
                      </tr>
                      <tr>
                        <th className="company-access-th">法人番号</th>
                        <td className="company-access-td">９－０１０５－０１０３－４４６２</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 経営革新計画 */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 sm:mb-6 pb-2 border-b border-slate-200">経営革新計画</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200/90 mb-4">
                  <table className="w-full border-collapse bg-white">
                    <tbody className="company-access-table">
                      <tr className="border-b border-slate-200/80">
                        <th className="company-access-th">テーマ</th>
                        <td className="company-access-td">FMSサービス事業の開発と販売</td>
                      </tr>
                      <tr>
                        <th className="company-access-th">計画期間</th>
                        <td className="company-access-td">令和3年10月～令和8年9月（5年計画）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  当社が申請した経営革新計画について、中小企業等経営強化法に基づき、2022年6月に東京都に承認されました。
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* アクセス・地図 */}
        <section ref={refMap} className="py-24 md:py-28 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewMap ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">ACCESS</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200 mb-6">アクセス</h2>
              <p className="text-slate-600 text-sm sm:text-base mb-4">〒103-0023 東京都中央区日本橋本町４丁目５−１３ 日本橋本町ＴＨビル７階</p>
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="フォレストソフト株式会社 所在地"
                  className="block w-full h-[280px] sm:h-[400px]"
                />
              </div>
              <a
                href="https://www.google.com/maps?q=35.6862,139.7742"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-slate-600 hover:text-[#1e3a5f] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Google マップで開く
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
