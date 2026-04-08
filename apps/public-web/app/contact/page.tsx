'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const refHero = useRef(null);
  const refMain = useRef(null);
  const isInViewHero = useInView(refHero, { once: true, margin: '-100px' });
  const isInViewMain = useInView(refMain, { once: true, margin: '-80px' });

  return (
    <main className="relative min-h-screen bg-white">
      <div className="relative z-10">
        <Navbar />

        {/* 装飾の青系ブロックなし：白ベースのシンプル見出し */}
        <header
          ref={refHero}
          className="pt-24 pb-10 md:pt-28 md:pb-12 border-b border-slate-200/90 bg-white"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
              className="text-sm text-slate-500 mb-5"
              aria-label="パンくず"
            >
              <Link href="/" className="hover:text-slate-800 transition-colors">
                ホーム
              </Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-800">問い合わせ</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInViewHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-xs font-medium tracking-widest text-slate-400 mb-2">CONTACT</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                問い合わせ
              </h1>
            </motion.div>
          </div>
        </header>

        <section ref={refMain} className="py-12 md:py-16 lg:py-20 bg-slate-50/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease }}
              className="w-full"
            >
              <FAQ variant="page" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInViewMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.08, ease }}
              className="w-full"
            >
              <Contact variant="page" />
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
