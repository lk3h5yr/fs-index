'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

/** マルキー用: トップページの Trust と同系統（Unsplash / Picsum の商用利用可画像） */
const marqueeItems = [
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=320&h=180&fit=crop', alt: 'Office' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=320&h=180&fit=crop', alt: 'Team' },
  { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=320&h=180&fit=crop', alt: 'Business' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=320&h=180&fit=crop', alt: 'Meeting' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=320&h=180&fit=crop', alt: 'Workspace' },
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=320&h=180&fit=crop', alt: 'Collaboration' },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=320&h=180&fit=crop', alt: 'Tech' },
  { src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=320&h=180&fit=crop', alt: 'Corporate' },
  { src: 'https://picsum.photos/seed/office1/320/180', alt: 'Office 1' },
  { src: 'https://picsum.photos/seed/business2/320/180', alt: 'Business 2' },
];

/** マルキーセクション（トップページの Trust と同じ構成） */
function PartnersMarquee() {
  const list = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-marquee gap-6 py-2">
        {list.map((item, i) => (
          <a
            key={i}
            href="#"
            className="flex-shrink-0 w-[220px] h-[124px] sm:w-[280px] sm:h-[158px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 hover:border-slate-300 hover:shadow-lg transition-all"
            aria-label={item.alt}
          >
            <img
              src={item.src}
              alt={item.alt}
              width={280}
              height={158}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

const partnerCategories = [
  { title: 'システム開発企業様', desc: '人材・案件の情報交換、共同受託' },
  { title: '個人事業主・フリーランス様', desc: '案件への参画、技術支援' },
  { title: 'Sier・ベンダー様', desc: '相互リソースの活用、長期協業' },
];

const benefits = [
  {
    label: '案件・人材の情報交換',
    icon: '📋',
    desc: 'システム開発における人材・案件のマッチングと情報共有で、相互の強みを活かした協業を実現します。',
  },
  {
    label: '技術ノウハウの共有',
    icon: '🔧',
    desc: '開発手法・ツール・知見を共有し、品質と効率を高め合うパートナーシップを築きます。',
  },
  {
    label: '長期・密な協業関係',
    icon: '🤝',
    desc: '単発ではなく、相互に尊敬し共に発展し合える関係を大切にし、長期的な協業を目指します。',
  },
];

/** パートナー協業例: 3枚のカード（我々にできることと同系統） */
const partnerExampleCards = [
  {
    number: '01',
    title: 'システム開発企業様',
    description: '人材・案件の情報交換、共同受託、技術リソースの相互活用により、お客様に最適な体制をご提供します。',
    gradient: 'from-blue-400 to-indigo-500',
    stats: '企業連携',
  },
  {
    number: '02',
    title: '個人事業主・フリーランス様',
    description: '案件への参画、技術支援、納品協力など、柔軟な形態でご協力いただける方を募集しています。',
    gradient: 'from-indigo-400 to-violet-500',
    stats: '個人参画',
  },
  {
    number: '03',
    title: 'Sier・ベンダー様',
    description: '相互リソースの活用、長期協業、共同提案を通じて、より大きなビジネス機会を創出します。',
    gradient: 'from-teal-400 to-cyan-500',
    stats: '長期協業',
  },
];

export default function PartnersPage() {
  const refHero = useRef(null);
  const refRecruit = useRef(null);
  const refList = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewRecruit = useInView(refRecruit, { once: true, margin: '-80px' });
  const isInViewList = useInView(refList, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="partners" />
      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
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
                <span className="text-gray-700">ビジネスパートナー</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">PARTNERS</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  ビジネスパートナー
                </h1>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  信頼できるパートナーとの協業で、共に成長
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  当社は、信頼できるパートナー様との協業を通じて、お客様に最高の価値を提供することを目指しています。
                  システム開発全般において、人材や案件の情報交換を行える企業様、個人事業主様との密な関係を築き、長期に渡り協業していきます。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 現在のビジネスパートナー: マルキー表示（トップページの Trust と同系統） */}
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-lg sm:text-xl font-semibold text-slate-700 mb-8 sm:mb-10">現在のビジネスパートナー</p>
            <PartnersMarquee />
          </div>
        </section>

        {/* ビジネスパートナー募集（メインメッセージ） */}
        <section ref={refRecruit} className="bg-slate-100 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInViewRecruit ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              className="company-panel overflow-hidden"
            >
              <div className="px-5 py-6 sm:px-10 sm:py-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-200 mb-6">
                  ビジネスパートナー募集
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                  弊社では、ビジネスパートナーとして業務にご協力いただける法人、個人を募集しています。
                </p>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  システム開発全般において、人材や案件の情報交換を行える企業様、案件にご参画いただける個人事業主様、相互に尊敬、共に発展し合える企業様と密な関係を築き、長期に渡り協業していきたいと思っております。
                </p>
                <p className="text-slate-600 text-sm mb-6">お気軽に、お問い合わせください。</p>
                <a
                  href="mailto:info@forestsoft.jp"
                  className="partners-cta-email inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#1e3a5f] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                >
                  <span aria-hidden>✉</span>
                  info@forestsoft.jp
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 協業のメリット（エフェクト追加 + 下部テキストの再配置） */}
        <section className="py-14 md:py-18 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6 sm:mb-8">協業のメリット</h3>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewRecruit ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
              className="grid sm:grid-cols-3 gap-6 mb-12"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="partners-benefit-card group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm px-4 sm:px-5 py-5 sm:py-6 text-left overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInViewRecruit ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className="partners-benefit-icon-wrap mb-4 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 text-2xl sm:text-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-50">
                    <span aria-hidden>{b.icon}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {b.label}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="partners-benefit-line h-full w-0 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInViewRecruit ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.2, ease }}
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4">ご協力いただける形態</h3>
              <div className="space-y-3">
                {partnerCategories.map((c) => (
                  <div key={c.title} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2 border-b border-slate-100">
                    <span className="font-semibold text-sm sm:text-base text-slate-800 shrink-0">{c.title}</span>
                    <span className="text-slate-600 text-xs sm:text-sm">{c.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* パートナー協業例（我々にできることと同系統の3枚カード） */}
        <section ref={refList} className="about-capability-section py-24 md:py-28 bg-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="about-section-title text-xl sm:text-2xl font-bold tracking-tight pb-2 border-b mb-2">
                パートナー協業例
              </h2>
              <p className="text-slate-600 text-sm">当社と協業いただいているパートナー形態の例です。</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {partnerExampleCards.map((point, index) => (
                <motion.div
                  key={point.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInViewList ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="reason-card reason-card--compact relative p-6 rounded-2xl bg-white/75 backdrop-blur-sm border border-slate-200/70 h-full flex flex-col mt-5">
                    <div className="absolute -top-4 left-6 flex items-center gap-2">
                      <div className={`reason-number-ring inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${point.gradient} text-white text-[11px] sm:text-xs font-bold transition-shadow duration-300`}>
                        {point.number}
                      </div>
                      <div className={`reason-badge inline-block px-3 py-1.5 bg-gradient-to-r ${point.gradient} text-white text-xs font-bold rounded-lg shadow-md`}>
                        {point.stats}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-3 text-slate-900 group-hover:text-indigo-500/80 transition-colors duration-300 mt-8">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm flex-grow">
                      {point.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`reason-card-bottom-line h-full bg-gradient-to-r ${point.gradient} rounded-full`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
