'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { label: 'ホーム', path: '/' },
  { label: '企業紹介', path: '/about' },
  { label: '会社情報', path: '/company' },
  { label: 'ニュース', path: '/news' },
  { label: '開発事例', path: '/cases' },
  { label: 'ビジネスパートナー', path: '/partners' },
  { label: '採用情報', path: '/careers' },
  { label: '資格情報', path: '/certifications' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-slate-900/90'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center h-16">
                <Image
                  src="/img/logo-black.png"
                  alt="ForestSoft"
                  width={200}
                  height={70}
                  className="h-14 w-auto"
                  priority
                  unoptimized
                />
              </Link>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-200
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-400 after:origin-left after:transition-transform after:duration-200
                    ${isActive
                      ? 'text-blue-400 after:scale-x-100'
                      : 'text-slate-300 hover:text-blue-400 after:scale-x-0 hover:after:scale-x-100'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
