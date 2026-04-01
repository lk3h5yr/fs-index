'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CurveBg from '../components/CurveBg';
import SolutionSteps from '../components/SolutionSteps';
import Services from '../components/Services';
import PainPoints from '../components/PainPoints';
import Trust from '../components/Trust';

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
  const refHero = useRef(null);
  const refGreeting = useRef(null);
  const refCta = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewGreeting = useInView(refGreeting, { once: true, margin: '-100px' });
  const isInViewCta = useInView(refCta, { once: true, margin: '-100px' });

  return (
    <main className="relative min-h-screen bg-white">
      <CurveBg idPrefix="about" />
      <div className="relative z-10">
        <Navbar />

        {/* 導入セクション: careers と統一したスタイル */}
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight pb-4 border-b border-slate-200/80">
                  企業紹介
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
                className="careers-lead-core"
              >
                <div className="careers-lead-core-text space-y-3">
                  <p>
                    フォレストソフトは、お客様の課題に向き合い、技術を価値として届けることを使命としています。
                  </p>
                  <p>
                    業務系Webシステムの開発から運用まで一貫して支援し、ERP・CRM・OSSの活用を通じて、現場で本当に機能する仕組みづくりを大切にしています。
                  </p>
                  <p>
                    また、AI活用、ERP mcframe の導入支援、独自サービスFMS(Forest Soft Modernization Service) によるシステムモダナイゼーションなど、幅広いITソリューションを提供しています。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 代表メッセージ（我々にできることの上部に配置） */}
        <section id="greeting" ref={refGreeting} className="py-20 md:py-24 bg-slate-100 about-section-03 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewGreeting ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="about-section-title text-xl sm:text-2xl font-bold tracking-tight mb-2">
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
              <div className="p-5 sm:p-7 md:p-8 lg:p-10 max-w-4xl">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 items-start sm:items-center mb-6 sm:mb-8">
                  <div className="about-greeting-photo-placeholder shrink-0 w-[152px] h-[114px] sm:w-[190px] sm:h-[142px] md:w-[220px] md:h-[165px] rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src="/img/ceo_1.jpg"
                      alt="代表"
                      width={240}
                      height={180}
                      className="w-full h-full object-cover object-top"
                      unoptimized
                    />
                  </div>

                  <blockquote className="border-l-4 border-[#1e3a5f] pl-4 sm:pl-6 py-1 sm:py-1.5 text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 leading-snug italic flex-1 min-w-0 text-center">
                    <span className="block">お客様とともに</span>
                    <span className="block">価値を前へ進める存在でありたい。</span>
                  </blockquote>
                </div>
                {/* 本文: 段落ごとの階層を明確化 */}
                <div className="space-y-4 sm:space-y-5 text-slate-700 leading-[1.75] text-sm sm:text-base md:text-lg">
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
                {/* 役員情報 */}
                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <p className="text-sm font-bold text-slate-500 mb-3">役員</p>
                  <ul className="text-slate-700 text-sm sm:text-base space-y-1">
                    <li>代表取締役：朱　杰</li>
                    <li>取締役：魏　書興</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <SolutionSteps containerClassName="max-w-4xl" />
        <Services containerClassName="max-w-4xl" />
        <PainPoints containerClassName="max-w-4xl" />
        <Trust containerClassName="max-w-4xl" />

        {/* 04 CTA */}
        <section ref={refCta} className="about-cta-band about-section-04 py-20 md:py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="about-section-label text-xs font-medium tracking-widest mb-6"/>
              <p className="about-section-title text-lg sm:text-xl md:text-2xl font-semibold mb-4 leading-relaxed">
                課題整理の段階からでも、お気軽にご相談ください。
              </p>
              <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base md:text-lg">
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
