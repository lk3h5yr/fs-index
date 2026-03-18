'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';

const ease = [0.22, 1, 0.36, 1] as const;

/** 我々にできること：選ばれる理由同款卡牌（number / badge / title / description / hover 底線） */
const capabilityCards = [
  {
    number: '01',
    title: '業務系Web開発',
    description: '金融業・物流業をはじめとする業務系Webシステムの開発・保守運用を通じて、お客様の課題解決を支援しています。',
    gradient: 'from-blue-400 to-indigo-500',
    stats: '業務系',
  },
  {
    number: '02',
    title: '一貫支援体制',
    description: '要件整理から設計・開発・運用保守までを一貫して担い、現場で本当に機能する仕組みづくりを大切にしています。',
    gradient: 'from-indigo-400 to-violet-500',
    stats: '一貫支援',
  },
  {
    number: '03',
    title: 'ERP・CRM・OSS 活用',
    description: 'ERP・CRM・オープンソース技術も柔軟に活用し、コストだけでなく、使いやすさ・拡張性・継続運用まで見据えた提案を行います。',
    gradient: 'from-teal-400 to-cyan-500',
    stats: 'ERP・CRM',
  },
];

const valueCards = [
  {
    title: '我々の使命',
    line1: 'お客様の課題に向き合い、技術を価値に変えて届けること。',
    line2: '一つひとつの開発を通じて、事業の前進に貢献します。',
    iconWrapClass: 'bg-sky-50/90 text-sky-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    isCenter: false,
  },
  {
    title: '文化',
    line1: '挑戦を歓迎し、学び合い、チームでより良い答えをつくる。',
    line2: 'それが、私たちが大切にしている開発文化です。',
    iconWrapClass: 'bg-rose-50/90 text-rose-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    isCenter: true,
  },
  {
    title: 'ビジョン',
    line1: '変化を恐れず、新しい可能性に挑み続ける。',
    line2: '技術の力で、未来につながる価値を生み出す企業を目指します。',
    iconWrapClass: 'bg-emerald-50/90 text-emerald-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    isCenter: false,
  },
];

export default function AboutPage() {
  const refHero = useRef(null);
  const refCapability = useRef(null);
  const refValues = useRef(null);
  const refGreeting = useRef(null);
  const refCta = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewCapability = useInView(refCapability, { once: true, margin: '-100px' });
  const isInViewValues = useInView(refValues, { once: true, margin: '-100px' });
  const isInViewGreeting = useInView(refGreeting, { once: true, margin: '-100px' });
  const isInViewCta = useInView(refCta, { once: true, margin: '-100px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="about" />
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
                <span className="text-gray-700">企業紹介</span>
              </motion.nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-xl"
              >
                <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">ABOUT</p>
                <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  企業紹介
                </h1>
                <p className="text-slate-600 mt-4 text-base leading-relaxed">
                  想い・強み・未来への取り組みをご紹介します。
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <p className="careers-lead-core-text">
                  フォレストソフトは、お客様の課題に向き合い、技術を価値に変えて届けることを使命としています。
                  業務系Web開発から一貫支援体制、ERP・CRM・OSSの活用まで、現場で本当に機能する仕組みづくりを大切にしています。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 代表メッセージ（我々にできることの上に配置） */}
        <section id="greeting" ref={refGreeting} className="py-24 md:py-28 bg-slate-100 about-section-03 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewGreeting ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="about-section-title text-2xl font-bold tracking-tight mb-2">
                代表メッセージ
              </h2>
              <p className="text-slate-600 text-sm">ご挨拶</p>
            </motion.div>

            <motion.div
              className="about-greeting-card rounded-[20px] overflow-hidden border border-slate-200/80 shadow-sm bg-white"
              initial={{ opacity: 0, y: 40 }}
              animate={isInViewGreeting ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
            >
              <div className="p-8 md:p-10 lg:p-12 max-w-4xl">
                {/* 開頭一句 ＋ 右側預留照片空間（排版不變形） */}
                <div className="flex flex-wrap gap-6 items-start mb-8">
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed flex-1 min-w-0">
                    お客様とともに価値をつくる企業でありたいと考えています。
                  </p>
                  <div className="about-greeting-photo-placeholder shrink-0 w-[200px] h-[150px] md:w-[240px] md:h-[180px] rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src="/img/ceo.png"
                      alt="代表"
                      width={240}
                      height={180}
                      className="w-full h-full object-cover object-top"
                      unoptimized
                    />
                  </div>
                </div>
                {/* 主引句：視覺焦點 */}
                <blockquote className="border-l-4 border-[#1e3a5f] pl-6 py-2 mb-10 text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed italic">
                  お客様とともに、価値を前へ進める存在でありたい。
                </blockquote>
                {/* 正文：段落層次 */}
                <div className="space-y-6 text-slate-700 leading-[1.85] text-base md:text-lg">
                  <p>
                    当社は、ソフトウェア開発を通じてお客様の課題解決と事業成長を支援してきました。
                  </p>
                  <p>
                    私たちが大切にしているのは、技術そのものではなく、技術を通じて現場に役立つ価値を生み出すことです。企画から開発、運用まで、お客様と同じ方向を見ながら着実に前へ進める存在でありたいと考えています。
                  </p>
                  <p>
                    これからも、変化に柔軟に向き合いながら、信頼されるパートナーとして挑戦を続けてまいります。
                  </p>
                </div>
                {/* 役員 */}
                <div className="mt-10 pt-8 border-t border-slate-200/80">
                  <p className="text-sm font-bold text-slate-500 mb-3">役員</p>
                  <ul className="text-slate-700 text-base space-y-1">
                    <li>代表取締役：朱　杰</li>
                    <li>取締役：魏　書興</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 我々にできること（卡片縮短・半透明底） */}
        <section ref={refCapability} className="about-capability-section py-24 md:py-28 bg-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewCapability ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="about-section-title text-2xl font-bold tracking-tight pb-2 border-b mb-2">
                我々にできること
              </h2>
              <p className="text-slate-600 text-sm">お客様の業務課題に応じて、最適な技術と体制をご提案します。</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {capabilityCards.map((point, index) => (
                <motion.div
                  key={point.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInViewCapability ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="reason-card reason-card--compact relative p-6 rounded-2xl bg-white/75 backdrop-blur-sm border border-slate-200/70 h-full flex flex-col mt-5">
                    <div className="absolute -top-4 left-6 flex items-center gap-2">
                      <div className={`reason-number-ring inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${point.gradient} text-white text-xs font-bold transition-shadow duration-300`}>
                        {point.number}
                      </div>
                      <div className={`reason-badge inline-block px-3 py-1.5 bg-gradient-to-r ${point.gradient} text-white text-xs font-bold rounded-lg shadow-md`}>
                        {point.stats}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-indigo-500/80 transition-colors duration-300 mt-8">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm flex-grow">
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

        {/* 使命・文化・ビジョン（卡片縮短・半透明底） */}
        <section ref={refValues} className="py-24 md:py-28 bg-slate-100 about-section-02 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewValues ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="about-section-title text-2xl font-bold tracking-tight pb-2 border-b mb-2">
                使命・文化・ビジョン
              </h2>
              <p className="text-slate-600 text-sm">私たちが大切にしている価値観をご紹介します。</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {valueCards.map((block, index) => (
                <motion.div
                  key={block.title}
                  className={`group relative ${block.isCenter ? 'mt-2' : 'mt-4'}`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInViewValues ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease }}
                >
                  <div className={`reason-card relative rounded-2xl bg-white/75 backdrop-blur-sm border border-slate-200/70 h-full flex flex-col p-5 shadow-sm hover:shadow-md transition-shadow ${block.isCenter ? 'about-value-card--main' : ''}`}>
                    <div className={`about-value-icon-wrap mb-3 flex items-center justify-center w-12 h-12 rounded-full ${block.iconWrapClass} transition-transform duration-300 group-hover:scale-105`}>
                      {block.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-600 transition-colors duration-300">
                      {block.title}
                    </h3>
                    <p className="text-slate-600 text-[14px] leading-[1.65] mb-2 flex-grow">
                      {block.line1}
                    </p>
                    <p className="text-slate-600 text-[14px] leading-[1.65]">
                      {block.line2}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                        <div className="reason-card-bottom-line about-value-card-bottom-line h-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 CTA */}
        <section ref={refCta} className="about-cta-band about-section-04 py-24 md:py-28 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="about-section-label text-xs font-medium tracking-widest mb-6"/>
              <p className="about-section-title text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
                課題整理の段階からでも、お気軽にご相談ください。
              </p>
              <p className="text-gray-600 mb-10 text-base md:text-lg">
                フォレストソフトは、技術と実行力で次の一歩を支えます。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/#contact" className="about-cta-primary">
                  お問い合わせする
                  <span className="btn-flag-arrow" aria-hidden>→</span>
                </Link>
                <Link href="/company" className="about-cta-secondary">
                  会社情報を見る
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
