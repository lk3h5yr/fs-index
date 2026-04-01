'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import News from './components/News';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* 曲線背景: 最背面の z-[-1] に配置し、青系の色味でコンテンツと Footer を覆わない */}
      <div className="curve-bg fixed bottom-0 left-0 right-0 h-[45vh] min-h-[280px] max-h-[420px] pointer-events-none z-[-1]" aria-hidden>
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 360" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curve-fill-home" x1="0%" y1="100%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#a8c0d8" />
              <stop offset="100%" stopColor="#b8cce4" />
            </linearGradient>
          </defs>
          {/* 広い範囲の不規則な曲線: 左が低く右が高い波形 */}
          <path
            fill="url(#curve-fill-home)"
            d="M 0 360 L 0 240 Q 180 140 360 200 Q 540 260 720 160 Q 900 60 1080 140 Q 1140 180 1200 200 L 1200 360 Z"
          />
        </svg>
      </div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <News />
        <Pillars />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
