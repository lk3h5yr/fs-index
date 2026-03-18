'use client';

import { motion } from 'framer-motion';

// 成功案例假資料
const successCases = [
  {
    id: 1,
    title: 'ECサイト構築',
    company: '株式会社A',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: '業務管理システム',
    company: '株式会社B',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'モバイルアプリ開発',
    company: '株式会社C',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'クラウド移行',
    company: '株式会社D',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
  },
  {
    id: 5,
    title: 'CRMシステム構築',
    company: '株式会社E',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
  },
  {
    id: 6,
    title: 'Webアプリ開発',
    company: '株式会社F',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
  },
  {
    id: 7,
    title: 'データ分析プラットフォーム',
    company: '株式会社G',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
  },
  {
    id: 8,
    title: 'IoTシステム開発',
    company: '株式会社H',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
  },
];

// 合作客戶假資料
const partners = [
  {
    id: 1,
    name: '株式会社I',
    logo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=100&fit=crop',
  },
  {
    id: 2,
    name: '株式会社J',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=100&fit=crop',
  },
  {
    id: 3,
    name: '株式会社K',
    logo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=100&fit=crop',
  },
  {
    id: 4,
    name: '株式会社L',
    logo: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=100&fit=crop',
  },
  {
    id: 5,
    name: '株式会社M',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=100&fit=crop',
  },
  {
    id: 6,
    name: '株式会社N',
    logo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=100&fit=crop',
  },
];

// 合併所有項目
const allItems = [
  ...successCases.map(item => ({ ...item, type: 'case' as const })),
  ...partners.map(item => ({ ...item, type: 'partner' as const })),
];

// 創建更多項目以實現流暢的無限循環
const duplicatedItems = [...allItems, ...allItems, ...allItems, ...allItems];

export default function InfiniteScroll() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* 3D 透視容器 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center 35%',
        }}
      >
        {/* 3D 場景容器 - 旋轉 X 軸以創建立體視角 */}
        <motion.div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg)',
          }}
          animate={{
            y: [0, -5000],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* 創建多層，從遠處（小、透明）到近處（大、清晰） */}
          {Array.from({ length: 25 }).map((_, layer) => {
            // 計算 Z 軸位置（負數表示在遠處，正數表示在近處）
            const zPosition = -3000 + layer * 200;
            // 根據 Z 位置計算縮放比例（遠處小，近處大）
            // 使用透視公式：scale = perspective / (perspective - z)
            const perspective = 2000;
            const scale = Math.max(0.05, perspective / (perspective - zPosition));
            // 根據 Z 位置計算透明度（遠處透明，近處清晰）
            const opacity = Math.max(0.05, Math.min(1, (zPosition + 3000) / 1500));
            
            return (
              <div
                key={layer}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateZ(${zPosition}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="grid grid-cols-4 gap-3"
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    width: '900px',
                  }}
                >
                  {duplicatedItems.slice(0, 4).map((item, index) => {
                    const itemIndex = (layer * 4 + index) % duplicatedItems.length;
                    const actualItem = duplicatedItems[itemIndex];
                    
                    return (
                      <div
                        key={`${layer}-${index}`}
                        className="relative w-[200px] h-[150px] rounded-lg overflow-hidden shadow-xl bg-white"
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {actualItem.type === 'case' ? (
                          <>
                            <img
                              src={actualItem.image}
                              alt={actualItem.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                              <div className="text-xs font-semibold truncate">{actualItem.title}</div>
                              <div className="text-[10px] opacity-90 truncate">{actualItem.company}</div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-50 p-3">
                            <img
                              src={actualItem.logo}
                              alt={actualItem.name}
                              className="w-full h-full object-contain opacity-60"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* 漸變遮罩 - 上下淡出效果 */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/95 to-transparent" />
      </div>
    </div>
  );
}
