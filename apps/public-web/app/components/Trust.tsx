'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { number: '150+', label: 'プロジェクト実績', description: '多様な業界での成功事例' },
  { number: '80+', label: 'お取引企業様', description: '上場企業からスタートアップまで' },
  { number: '15+', label: '年の実績', description: '長年の信頼とノウハウ' },
  { number: '99%', label: '顧客満足度', description: '継続的な改善とサポート' },
];

/* 無料の画像ソース: Unsplash（商用利用可）と Picsum をマルキー用に使用 */
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

export default function Trust({
  containerClassName = 'max-w-6xl',
}: {
  containerClassName?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-28 bg-white relative">
      <div className={`${containerClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">TRACK RECORD</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            実績と信頼
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">多くの企業様に選ばれている実績</p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-10 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-500 hover:shadow-2xl transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.05 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative z-10">
                <div className="text-5xl font-bold mb-3 text-blue-600">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-slate-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-slate-600">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* お取引企業様 - 横方向のマルキー */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center text-xl font-semibold text-slate-700 mb-10">お取引企業様</p>
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-marquee gap-6 py-2">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex-shrink-0 w-[280px] h-[158px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 hover:border-slate-300 hover:shadow-lg transition-all"
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
        </motion.div>
      </div>
    </section>
  );
}
