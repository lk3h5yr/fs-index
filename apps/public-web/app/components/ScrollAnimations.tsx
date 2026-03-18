'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// MITUS 風格的滾動動畫 Hook
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: '-100px',
    ...options 
  });

  return { ref, isInView };
}

// 視差滾動效果
export function ParallaxSection({ children, speed = 0.5, className = '' }: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        ref.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// 淡入淡出動畫包裝器
export function FadeInSection({ 
  children, 
  delay = 0,
  direction = 'up',
  className = ''
}: { 
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView 
          ? 'translateY(0)' 
          : direction === 'up' ? 'translateY(60px)' : 'translateY(-60px)',
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// 數字計數器動畫
export function AnimatedNumber({ 
  value, 
  duration = 2000,
  prefix = '',
  suffix = ''
}: { 
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, isInView } = useScrollAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setDisplayValue(Math.floor(value * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
