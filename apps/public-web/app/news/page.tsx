'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

type NewsCategory = '経営' | '製品・サービス' | 'お知らせ' | 'IR';

type NewsItem = {
  id: number;
  title: string;
  date: string;
  dateDisplay: string;
  category: NewsCategory;
  description: string;
  body: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'ベース株式会社 ベストパートナー賞を受賞しました',
    date: '2022.07.01',
    dateDisplay: '2022.07',
    category: '経営',
    description: 'ベース株式会社様より2023年度のベストパートナー賞として表彰いただきました。フォレストソフト株式会社が提供してきたサービスを高く評価いただいておりますことを深く感謝申し上げます。',
    body: `ベース株式会社様より2023年度のベストパートナー賞として表彰いただきました。
フォレストソフト株式会社が提供してきたサービスを高く評価いただいておりますことを深く感謝申し上げます。
これまでに築いてきた強い信頼関係のもと、より一層の連携を深め、今後も多くのお客様に感動いただけるサービスをご提供できるよう邁進いたします。`,
  },
  {
    id: 2,
    title: '２０２３.１２　年末年始休業のお知らせ',
    date: '2023.11.30',
    dateDisplay: 'Nov-30, 2023',
    category: 'お知らせ',
    description: '平素は格別のお引立てを賜り、厚く御礼申し上げます。誠に勝手ながら弊社では、下記の期間を年末年始休業とさせていただきます。',
    body: `平素は格別のお引立てを賜り、厚く御礼申し上げます。

誠に勝手ながら弊社では、下記の期間を年末年始休業とさせていただきます。

    2023年12月29日（金）～2024年1月3日（水）

お電話・メール等でのお問い合わせは、年始は1月4日（木）以降の対応になります。
ご不便をおかけしますが、何卒ご理解くださいますようお願い致します。`,
  },
  {
    id: 3,
    title: '2022年06月 当社の「経営革新計画」が東京都に承認されました。',
    date: '2022.07.06',
    dateDisplay: 'Jul-06, 2022',
    category: '経営',
    description: 'テーマ：FMSサービス事業の開発と販売 計画期間：令和3年10月～令和8年9月（5年計画）。当社が申請した経営革新計画について、中小企業等経営強化法に基づき承認されました。',
    body: `テーマ：FMSサービス事業の開発と販売
計画期間：令和3年10月～令和8年9月（5年計画）。
当社が申請した経営革新計画について、中小企業等経営強化法第８条第1項の規定に基づき承認されました。

これを機に、自社ソリューションサービスを開拓し、社会課題解決への貢献により、新たな成長曲線を作り出し、利益の成長性と企業価値を高め、経済価値と社会価値を創貢を献出来る企業を目指して参ります。

※「経営革新計画」とは、中小企業が新たな事業活動に取り組むことにより経営の向上を図る計画のことで、中小企業等経営強化法に基づき、国や都道府県知事の承認が行われます（計画書に記載されている商品・サービスや事業を認定するものではありません）。`,
  },
  {
    id: 4,
    title: 'JIS Q 27001:2014 (ISO/IEC 27001:2013)の認証取得（移転）',
    date: '2021.02.27',
    dateDisplay: 'Feb-27, 2021',
    category: '製品・サービス',
    description: '当社は2020年12月に情報セキュリティマネジメントシステム（ISMS）の国際規格の認証を取得（移転）しました。',
    body: `当社は2020年12月に情報セキュリティマネジメントシステム（ISMS）の国際規格である「ISO/IEC 27001:2013（以降:ISO27001）」及び国内規格「JIS Q 27001:2014」を同時に認証取得（移転）しました。

登録番号　：J0444
認証登録日：2020年12月25日
登録範囲　：
  ・システム開発、運用及び保守
  ・上記業務に関する技術者派遣
審査登録機関：エイエスアール株式会社`,
  },
  {
    id: 5,
    title: '2022年09月 資本金5000万に増資しました。',
    date: '2022.10.05',
    dateDisplay: 'Oct-05, 2022',
    category: 'IR',
    description: '2022年09月 資本金5000万に増資しました。',
    body: `2022年09月 資本金5000万に増資しました。`,
  },
  {
    id: 6,
    title: 'プライバシーマークを取得しました',
    date: '2018.08.21',
    dateDisplay: 'Aug-21, 2018',
    category: '製品・サービス',
    description: '当社は、平成30年8月21日、一般財団法人日本情報経済社会推進協会（JIPDEC）より、プライバシーマーク付与事業者に認定されました。',
    body: `当社は、平成30年8月21日、一般財団法人日本情報経済社会推進協会（JIPDEC）より、プライバシーマーク付与事業者に認定されました。

プライバシーマークは、一般財団法人日本情報経済社会推進協会が運用する「プライバシーマーク制度」に基づいて、当社の個人情報の取扱いが日本工業規格JIS Q15001「個人情報保護マネジメントシステム―要求事項」に準拠して、適正に行われていることを認定した証として、その使用を許可されたものです。
当社はこれまでも個人情報（お客様、お取引様、求人応募者様、当社社員など）を安全に管理することの重要性を十分に認識し、個人情報の適切な取扱いと保護を行うため、個人情報保護体制の構築・運営・改善を行ってきました。
今後もプライバシーマーク付与認定企業として、個人情報の取扱いにさらなる強化を図り、取り組んで参ります。

【Ｐマーク認定概要】
登録番号：第17003375(01)号
有効期間：平成30年8月21日～平成32年8月20日
指定審査機関：一般社団法人日本情報システム・ユーザー協会
事業所：東京都中央区日本橋浜町二丁目16番5号
フォレストソフト株式会社`,
  },
  {
    id: 7,
    title: '労働者派遣事業許可を取得しました',
    date: '2018.08.01',
    dateDisplay: 'Aug-01, 2018',
    category: 'お知らせ',
    description: 'この度、フォレストソフト株式会社は2018年8月1日付で労働者派遣事業許可を取得し、特定労働者派遣事業から労働派遣事業への切替えを実施しました。',
    body: `この度、フォレストソフト株式会社は2018年8月1日付で労働者派遣事業許可を取得し、特定労働者派遣事業から労働派遣事業への切替えを実施しました。

許可番号：派13-310968
許可年月日：平成30年8月1日
事業所の名称：フォレストソフト株式会社
住所：東京都中央区日本橋浜町二丁目16番５号
有効期間：平成30年8月1日から平成33年7月31日まで`,
  },
];

function getCategoryStyle(category: NewsCategory): string {
  switch (category) {
    case '経営':
      return 'news-tag news-tag-keiei';
    case '製品・サービス':
      return 'news-tag news-tag-service';
    case 'IR':
      return 'news-tag news-tag-ir';
    default:
      return 'news-tag news-tag-info';
  }
}

/** 列表用：日期只顯示到月份 YYYY.MM */
function getDateMonthOnly(dateStr: string): string {
  const parts = dateStr.split(/[.\-/]/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]}.${parts[1]}`;
  return dateStr;
}

/** 西暦 YYYY.MM.DD → 日本語日付（詳細彈窗用） */
function formatDateJa(dateStr: string): string {
  const parts = dateStr.split(/[.\-/]/).map(Number);
  const [y, m, d] = parts;
  if (!y || !m) return dateStr;
  if (d) return `${y}年${m}月${d}日`;
  return `${y}年${m}月`;
}

/** 彈窗內文：段落／Key-Value／註釋 區分 */
function renderPopupBody(body: string) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  return blocks.map((block, i) => {
    const lines = block.split('\n').filter(Boolean);
    const isNote = block.startsWith('※');
    if (isNote) {
      return (
        <p key={i} className="news-popup-note">
          {lines.map((line, j) => (
            <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
          ))}
        </p>
      );
    }
    const hasKeyValue = lines.some((l) => /[：:]/.test(l) && l.trim().length > 0);
    if (hasKeyValue && lines.length >= 1) {
      return (
        <div key={i} className="news-popup-kv">
          {lines.map((line, j) => {
            const match = line.match(/^(.+?)[\s]*[：:][\s]*(.*)$/);
            if (match) {
              return (
                <div key={j} className="news-popup-kv-row">
                  <span className="news-popup-kv-key">{match[1].trim()}</span>
                  <span className="news-popup-kv-val">{match[2].trim()}</span>
                </div>
              );
            }
            if (line.trim()) {
              return <p key={j} className="news-popup-p news-popup-p-sm">{line}</p>;
            }
            return null;
          })}
        </div>
      );
    }
    return (
      <p key={i} className="news-popup-p">
        {lines.map((line, j) => (
          <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
        ))}
      </p>
    );
  });
}

function NewsPageContent() {
  const refHero = useRef(null);
  const refList = useRef(null);
  const searchParams = useSearchParams();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const item = newsItems.find((n) => n.id === Number(id));
      if (item) setSelectedNews(item);
    }
  }, [searchParams]);

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="news" />
      <div className="relative z-10 isolate">
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
                <span className="text-gray-700">ニュース</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">NEWS</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  ニュース
                </h1>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  最新のニュース、イベント・セミナー開催情報を掲載しています
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  フォレストソフト株式会社の最新ニュース、イベント・セミナー開催情報を掲載しています。
                  経営・製品・サービス・お知らせ・IRに関する情報をお届けします。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={refList} className="py-16 md:py-20 bg-slate-100 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease }}
              className="text-center mb-10"
            >
              <h2 className="news-release-title">ニュースリリース</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="company-panel overflow-hidden"
            >
              {[...newsItems]
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((news) => (
                <button
                  key={news.id}
                  type="button"
                  onClick={() => setSelectedNews(news)}
                  className="news-list-row group flex flex-col sm:flex-row items-start gap-3 sm:gap-4 py-4 sm:py-5 px-4 sm:px-8 hover:bg-slate-50/80 transition-colors w-full text-left cursor-pointer"
                >
                  <div className="flex items-center flex-wrap gap-2 sm:gap-3 shrink-0">
                    <span className="text-slate-600 text-xs sm:text-sm font-medium tabular-nums">
                      {getDateMonthOnly(news.date)}
                    </span>
                    <span className={`${getCategoryStyle(news.category)} news-tag-fixed`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 w-full sm:flex-1 sm:min-w-0">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 font-bold text-sm sm:text-base mb-1 group-hover:text-[#0ea5e9] transition-colors leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                        {news.description}
                      </p>
                    </div>
                    <span className="news-arrow shrink-0 self-center sm:self-start" aria-hidden>›</span>
                  </div>
                </button>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Popup 彈窗：固定於視窗中央、內文左對齊、底部閉じる */}
      <AnimatePresence>
        {selectedNews && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="news-popup-backdrop fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setSelectedNews(null)}
              aria-hidden
            />
            <div className="news-popup-wrap fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="news-popup-title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease }}
                className="news-popup w-[min(96vw,42rem)] max-h-[92vh] rounded-2xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="news-popup-glow absolute inset-0 pointer-events-none rounded-2xl" aria-hidden />
                <div className="relative flex flex-col flex-1 min-h-0">
                  <div className="news-popup-header shrink-0 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
                    <span className="news-popup-tag inline-block mb-4">
                      {selectedNews.category}
                    </span>
                    <h2 id="news-popup-title" className="news-popup-title text-slate-900 font-bold leading-snug">
                      {selectedNews.title}
                    </h2>
                    <p className="news-popup-date text-slate-500 mt-3">
                      {formatDateJa(selectedNews.date)}
                    </p>
                  </div>
                  <div className="news-popup-body overflow-y-auto flex-1 min-h-0 px-4 sm:px-6 py-2">
                    <div className="news-popup-content">
                      {renderPopupBody(selectedNews.body)}
                    </div>
                  </div>
                  <div className="news-popup-footer shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-5 sm:pb-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSelectedNews(null)}
                      className="news-popup-close-btn about-cta-secondary popup-close-btn"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen bg-white flex items-center justify-center">
        <span className="text-gray-500">読み込み中...</span>
      </main>
    }>
      <NewsPageContent />
    </Suspense>
  );
}
