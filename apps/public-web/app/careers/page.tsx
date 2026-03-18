'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ease = [0.22, 1, 0.36, 1] as const;

type CareersSectionKey = 'recruitment' | 'application' | 'privacy';

/** 標題列：與募集要項同風格 + 點擊展開/收合 icon */
function SectionHeader({
  title,
  isOpen,
  onToggle,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="careers-section-trigger w-full flex items-center justify-between gap-3 text-left py-2 border-b border-slate-200 group"
      aria-expanded={isOpen}
    >
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
        {title}
      </h2>
      <span className="careers-section-icon shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-700 transition-colors" aria-hidden>
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </span>
    </button>
  );
}

const recruitmentItems: { label: string; value: string }[] = [
  { label: '募集職種', value: 'ソフトウェアシステム設計者（SE）, ブリッジSE, プログラム開発者(PG)' },
  { label: '勤務内容', value: '会計、金融、保険、証券等ソフトウェアの開発、ECサイトの構築' },
  { label: '採用形態', value: '正社員、契約社員、個人事業主' },
  { label: '勤務地', value: '首都圏' },
  { label: '国籍要求', value: 'なし、スキル重視' },
  { label: '学歴要求', value: '中国、日本の大学パソコン関係専攻 4年卒業' },
  { label: '日本語', value: '2級相当以上、日常会話' },
  {
    label: '技術要求',
    value: '未経験OKですが、日本語上級者優先いたします。Unix Window Java、.net（C#,VB,ASP）、Oracle、DB2、PHP等の経験がある者優先いたします。',
  },
  { label: '試用期間', value: '最初の3ヶ月間' },
  { label: '給与', value: '月給制、資格手当あり、日本語一級2万、技術資格5千円～2万円、加算可能。PG 25万円～; SE 35万円～' },
  { label: '昇給', value: '年1回' },
  {
    label: '休日',
    value: '週休二日制、有給休暇、GW、夏季休暇、年末年始、慶弔休暇、特別休暇',
  },
  { label: '保険制度', value: '各種保険制度完備' },
  { label: 'ビザ関係', value: '就労ビザ提供' },
];

const privacyItems: { num: number; text: string }[] = [
  {
    num: 1,
    text: '個人情報の利用目的：採用可否の判断、採用選考結果等の連絡、採用に関する問い合わせ回答のために利用いたします。',
  },
  {
    num: 2,
    text: '第三者提供：本人の同意がある場合、または法令に基づく場合を除き、取得した個人情報を第三者に提供することはありません。',
  },
  {
    num: 3,
    text: '委託：当社が本件により取得した個人情報の全部または一部の取扱いを委託する場合があります。その場合には、個人情報の管理水準が、当社が設定する基準を満たす企業を選定し、適切な管理、監督を行います。',
  },
  {
    num: 4,
    text: '開示等：本人からの求めにより、当社が本件により取得した開示対象個人情報の利用目的の通知・開示・内容の訂正・追加または削除・利用の停止・消去（「開示等」といいます。）に応じます。下記の個人情報保護事務局までお申出ください。',
  },
  {
    num: 5,
    text: '任意性：当社に個人情報を提供されることは任意です。ただし、当社が提供をお願いする個人情報を提供いただけない場合、採用選考や適切な社員管理に不具合が生じる場合がございます。',
  },
  { num: 6, text: '個人情報保護方針：当社ホームページのプライバシーポリシーをご覧ください。' },
];

export default function CareersPage() {
  const refHero = useRef(null);
  const refContent = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewContent = useInView(refContent, { once: true, margin: '-80px' });
  const [expandedSection, setExpandedSection] = useState<CareersSectionKey | null>(null);

  const toggleSection = (key: CareersSectionKey) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <main className="relative min-h-screen bg-white">
      <div className="curve-bg fixed bottom-0 left-0 right-0 h-[45vh] min-h-[280px] max-h-[420px] pointer-events-none z-[-1]" aria-hidden>
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curve-fill-careers" x1="0%" y1="100%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#a8c0d8" />
              <stop offset="100%" stopColor="#b8cce4" />
            </linearGradient>
          </defs>
          <path fill="url(#curve-fill-careers)" d="M 0 360 L 0 240 Q 180 140 360 200 Q 540 260 720 160 Q 900 60 1080 140 Q 1140 180 1200 200 L 1200 360 Z" />
        </svg>
      </div>
      <div className="relative z-10">
        <Navbar />

        {/* 採用前導區塊：主題一致、背景層次、視覺核心 */}
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
                <span className="text-gray-700">採用情報</span>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">CAREERS</p>
                <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  採用情報
                </h1>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  一緒に未来を創造しませんか？
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  フォレストソフト株式会社では事業活動および社員行動を通じ、革新的な技術で世の中を動かす企業を目指します、地域社会との調和・貢献に努めます。
                  私たちは、社会への貢献を通じて、自身の夢を必ず手にして見せます。
                  私たちは、未知の可能性に挑戦したいと思っています。
                  私たちは、未来につながる世界を創造したいと思っています。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={refContent} className="bg-slate-100 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-24 md:pb-28 space-y-6">
            {/* 募集要項：點擊標題展開／收合 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.05, ease }}
              className="careers-section-block"
            >
              <SectionHeader
                title="募集要項"
                isOpen={expandedSection === 'recruitment'}
                onToggle={() => toggleSection('recruitment')}
              />
              <AnimatePresence initial={false}>
                {expandedSection === 'recruitment' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4">
                      <div className="company-panel overflow-hidden rounded-xl">
                        <table className="w-full border-collapse">
                          <tbody>
                            {recruitmentItems.map((row) => (
                              <tr key={row.label} className="company-panel-section">
                                <th className="company-access-th">{row.label}</th>
                                <td className="company-access-td">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 応募方法：同標題風格 + 點擊展開 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.08, ease }}
              className="careers-section-block"
            >
              <SectionHeader
                title="応募方法"
                isOpen={expandedSection === 'application'}
                onToggle={() => toggleSection('application')}
              />
              <AnimatePresence initial={false}>
                {expandedSection === 'application' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 text-slate-600">
                      <p className="mb-4">応募される場合、履歴書、職務経歴書をメールにて送付ください。</p>
                      <ol className="list-decimal list-inside space-y-2 mb-6">
                        <li>下記「個人情報の取扱いについて」に同意したことをメールに明記してください。</li>
                        <li>添付ファイルにパスワードを付与し、別メールにてパスワードを知らせてください。</li>
                        <li>職務経歴書を下記のメールアドレスにご送付ください。</li>
                      </ol>
                      <p className="text-sm text-slate-500 mb-1">送付先</p>
                      <a href="mailto:jinji@forestsoft.jp" className="text-[#1e3a5f] font-semibold hover:underline">
                        jinji@forestsoft.jp
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 個人情報の取扱いについて：同標題風格 + 點擊展開 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="careers-section-block"
            >
              <SectionHeader
                title="個人情報の取扱いについて"
                isOpen={expandedSection === 'privacy'}
                onToggle={() => toggleSection('privacy')}
              />
              <AnimatePresence initial={false}>
                {expandedSection === 'privacy' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4">
                      <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
                        {privacyItems.map((item) => (
                          <li key={item.num} className="flex gap-3">
                            <span className="flex-shrink-0 font-semibold text-slate-700">{item.num}.</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-slate-700 font-semibold mb-2">フォレストソフト株式会社 個人情報保護事務局（個人情報保護責任者）</p>
                        <p className="text-slate-600 text-sm">
                          連絡先：TEL{' '}
                          <a href="tel:03-3527-3652" className="text-[#1e3a5f] hover:underline">03-3527-3652</a>
                          {' '}/ E-Mail{' '}
                          <a href="mailto:info@forestsoft.jp" className="text-[#1e3a5f] hover:underline">info@forestsoft.jp</a>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
