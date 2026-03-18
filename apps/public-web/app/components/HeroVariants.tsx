'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// 設計方案 1: Web3 區塊鏈網絡 + AI 脈衝波
export const Variant1 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50"></div>
    
    {/* 區塊鏈節點網絡 */}
    <svg className="absolute inset-0 w-full h-full opacity-30">
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 35;
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;
        
        return (
          <g key={i}>
            <motion.circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="5"
              fill="#06b6d4"
              animate={{
                r: [4, 7, 4],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            {/* 連接線 */}
            {i < 14 && (
              <motion.line
                x1={`${cx}%`}
                y1={`${cy}%`}
                x2={`${50 + Math.cos((i + 1) / 15 * Math.PI * 2) * radius}%`}
                y2={`${50 + Math.sin((i + 1) / 15 * Math.PI * 2) * radius}%`}
                stroke="#3b82f6"
                strokeWidth="1.5"
                opacity="0.3"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  strokeDasharray: ['0,10', '5,5', '0,10'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
    
    {/* AI 脈衝波 */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-cyan-400 rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 1.3,
        }}
      />
    ))}
    
    {/* 柔和光暈 */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
      style={{ transform: 'translate(-50%, -50%)' }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 設計方案 2: AI 神經網絡 + 數據流動畫
export const Variant2 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50"></div>
    
    {/* 神經網絡層 */}
    <svg className="absolute inset-0 w-full h-full opacity-25">
      {/* 第一層節點 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`layer1-${i}`}>
          <motion.circle
            cx={`${20 + i * 15}%`}
            cy="25%"
            r="6"
            fill="#a855f7"
            animate={{
              r: [4, 8, 4],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        </g>
      ))}
      
      {/* 第二層節點 */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`layer2-${i}`}>
          <motion.circle
            cx={`${25 + i * 16.66}%`}
            cy="50%"
            r="7"
            fill="#ec4899"
            animate={{
              r: [5, 9, 5],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        </g>
      ))}
      
      {/* 第三層節點 */}
      {[0, 1, 2].map((i) => (
        <g key={`layer3-${i}`}>
          <motion.circle
            cx={`${33.33 + i * 16.66}%`}
            cy="75%"
            r="8"
            fill="#f43f5e"
            animate={{
              r: [6, 10, 6],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        </g>
      ))}
      
      {/* 連接線 */}
      {[0, 1, 2, 3, 4].map((i) => (
        [0, 1, 2, 3].map((j) => (
          <motion.line
            key={`line-${i}-${j}`}
            x1={`${20 + i * 15}%`}
            y1="25%"
            x2={`${25 + j * 16.66}%`}
            y2="50%"
            stroke="#a855f7"
            strokeWidth="1"
            opacity="0.2"
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i + j) * 0.1,
            }}
          />
        ))
      ))}
    </svg>
    
    {/* 數據流動畫 */}
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-24 bg-gradient-to-b from-transparent via-purple-400 to-transparent rounded-full"
        style={{
          left: `${22 + i * 18}%`,
          top: `${30 + i * 8}%`,
        }}
        animate={{
          y: [0, 200, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.6,
        }}
      />
    ))}
  </div>
);

// 設計方案 3: Web3 區塊鏈 + AI 智能節點
export const Variant3 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
    
    {/* 區塊鏈結構 */}
    <svg className="absolute inset-0 w-full h-full opacity-20">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {/* 區塊 */}
          <motion.rect
            x={`${15 + i * 18}%`}
            y="40%"
            width="12%"
            height="8%"
            rx="8"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.4"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: ['40%', '38%', '40%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
          {/* 連接鏈 */}
          {i < 4 && (
            <motion.line
              x1={`${27 + i * 18}%`}
              y1="44%"
              x2={`${15 + (i + 1) * 18}%`}
              y2="44%"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.3"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          )}
        </g>
      ))}
    </svg>
    
    {/* AI 智能節點脈衝 */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${21 + i * 18}%`,
          top: '44%',
        }}
      >
        <motion.div
          className="w-4 h-4 bg-emerald-400 rounded-full"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.5,
          }}
        />
      </motion.div>
    ))}
    
    {/* 柔和背景光暈 */}
    <motion.div
      className="absolute top-1/3 left-1/2 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl"
      style={{ transform: 'translateX(-50%)' }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.15, 0.3, 0.15],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 設計方案 4: AI 大數據可視化 + Web3 粒子效果
export const Variant4 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
    
    {/* 數據可視化圖表 */}
    <svg className="absolute inset-0 w-full h-full opacity-25">
      {/* 柱狀圖動畫 */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.rect
          key={i}
          x={`${10 + i * 12}%`}
          y={`${60 - (i % 3) * 10}%`}
          width="8%"
          height={`${20 + (i % 3) * 15}%`}
          rx="4"
          fill="url(#barGradient)"
          animate={{
            height: [`${20 + (i % 3) * 15}%`, `${30 + (i % 3) * 20}%`, `${20 + (i % 3) * 15}%`],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
    
    {/* Web3 粒子效果 */}
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-indigo-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.sin(i) * 15, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2,
        }}
      />
    ))}
    
    {/* 中心脈衝波 */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-indigo-400 rounded-full"
      style={{ transform: 'translate(-50%, -50%)' }}
      animate={{
        scale: [1, 3.5, 1],
        opacity: [0.5, 0, 0.5],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  </div>
);

// 設計方案 5: Web3 去中心化網絡 + AI 智能連接
export const Variant5 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50"></div>
    
    {/* 去中心化節點網絡 */}
    <svg className="absolute inset-0 w-full h-full opacity-30">
      {[
        { x: 50, y: 30 },
        { x: 25, y: 50 },
        { x: 75, y: 50 },
        { x: 15, y: 70 },
        { x: 50, y: 70 },
        { x: 85, y: 70 },
      ].map((node, i) => (
        <g key={i}>
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="8"
            fill="#8b5cf6"
            animate={{
              r: [6, 10, 6],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
          {/* 連接所有節點到中心 */}
          {node.x !== 50 || node.y !== 30 ? (
            <motion.line
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2="50%"
              y2="30%"
              stroke="#a855f7"
              strokeWidth="1.5"
              opacity="0.25"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                strokeDasharray: ['0,10', '5,5', '0,10'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ) : null}
        </g>
      ))}
    </svg>
    
    {/* AI 智能脈衝波 */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute top-[30%] left-1/2 w-24 h-24 border-2 border-violet-400 rounded-full"
        style={{ transform: 'translateX(-50%)' }}
        animate={{
          scale: [1, 5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 1.3,
        }}
      />
    ))}
    
    {/* 數據傳輸動畫 */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-16 bg-gradient-to-b from-transparent via-violet-400 to-transparent rounded-full"
        style={{
          left: `${25 + i * 12.5}%`,
          top: `${35 + i * 5}%`,
        }}
        animate={{
          y: [0, 150, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 2.5 + i * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.4,
        }}
      />
    ))}
  </div>
);

// 設計方案 6: AI 深度學習網絡 + Web3 區塊鏈脈衝
export const Variant6 = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50"></div>
    
    {/* 多層神經網絡 */}
    <svg className="absolute inset-0 w-full h-full opacity-25">
      {/* 輸入層 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={`input-${i}`}
          cx={`${15 + i * 17.5}%`}
          cy="20%"
          r="6"
          fill="#0ea5e9"
          animate={{
            r: [4, 8, 4],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
      
      {/* 隱藏層 */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`hidden-${i}`}
          cx={`${20 + i * 20}%`}
          cy="50%"
          r="7"
          fill="#3b82f6"
          animate={{
            r: [5, 9, 5],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* 輸出層 */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`output-${i}`}
          cx={`${30 + i * 20}%`}
          cy="80%"
          r="8"
          fill="#6366f1"
          animate={{
            r: [6, 10, 6],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}
      
      {/* 連接線 */}
      {[0, 1, 2, 3, 4].map((i) => (
        [0, 1, 2, 3].map((j) => (
          <motion.line
            key={`conn-${i}-${j}`}
            x1={`${15 + i * 17.5}%`}
            y1="20%"
            x2={`${20 + j * 20}%`}
            y2="50%"
            stroke="#0ea5e9"
            strokeWidth="1"
            opacity="0.2"
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i + j) * 0.1,
            }}
          />
        ))
      ))}
    </svg>
    
    {/* Web3 區塊鏈脈衝 */}
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-sky-400 rounded-lg"
        style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.5, 0, 0.5],
          rotate: [45, 225, 45],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: i * 1,
        }}
      />
    ))}
    
    {/* 柔和光暈背景 */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-300/15 rounded-full blur-3xl"
      style={{ transform: 'translate(-50%, -50%)' }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.35, 0.2],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// 主組件 - 用於預覽所有方案
export default function HeroVariantsPreview() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  
  const variants = [
    { 
      name: '方案 1: Web3 區塊鏈網絡 + AI 脈衝波', 
      component: Variant1,
      description: '區塊鏈節點網絡 + 中心脈衝波，柔和藍綠色系'
    },
    { 
      name: '方案 2: AI 神經網絡 + 數據流', 
      component: Variant2,
      description: '多層神經網絡 + 垂直數據流，柔和紫粉色系'
    },
    { 
      name: '方案 3: Web3 區塊鏈 + AI 智能節點', 
      component: Variant3,
      description: '區塊鏈結構 + 智能節點脈衝，柔和綠色系'
    },
    { 
      name: '方案 4: AI 大數據可視化 + Web3 粒子', 
      component: Variant4,
      description: '數據柱狀圖 + 浮動粒子 + 脈衝波，柔和藍紫色系'
    },
    { 
      name: '方案 5: Web3 去中心化網絡 + AI 智能連接', 
      component: Variant5,
      description: '去中心化節點 + 智能脈衝 + 數據傳輸，柔和紫粉色系'
    },
    { 
      name: '方案 6: AI 深度學習網絡 + Web3 區塊鏈脈衝', 
      component: Variant6,
      description: '多層神經網絡 + 區塊鏈脈衝，柔和藍色系'
    },
  ];

  const SelectedComponent = selectedVariant !== null ? variants[selectedVariant].component : null;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-900">Web3 + AI 設計方案預覽</h1>
        <p className="text-center text-slate-600 mb-8">6 個結合 Web3 風格與 AI 大數據效果的柔和配色方案</p>
        
        {/* 方案選擇按鈕 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {variants.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedVariant(index)}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                selectedVariant === index
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-slate-300 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="font-semibold text-slate-800 mb-2">{variant.name}</div>
              <div className="text-sm text-slate-600">{variant.description}</div>
            </button>
          ))}
        </div>

        {/* 預覽區域 */}
        {SelectedComponent && (
          <div className="relative h-[600px] rounded-2xl overflow-hidden border-4 border-slate-300 shadow-2xl">
            <SelectedComponent />
            {/* 模擬文字內容 */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center px-8">
                <h2 className="text-5xl font-bold text-slate-800 mb-4 drop-shadow-lg">
                  次世代のシステム開発
                </h2>
                <p className="text-xl text-slate-600 drop-shadow-md">
                  AI・Web3・大數據でビジネスの成長を加速させます
                </p>
              </div>
            </div>
          </div>
        )}

        {!SelectedComponent && (
          <div className="text-center py-20 text-slate-500 bg-white rounded-xl border-2 border-dashed border-slate-300">
            <div className="text-2xl mb-2">👆</div>
            <div className="text-lg">請選擇一個設計方案進行預覽</div>
          </div>
        )}
      </div>
    </div>
  );
}
