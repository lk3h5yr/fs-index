'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState<{ label: string; x: number; y: number } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
    
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[58vh] sm:min-h-[68vh] md:min-h-screen flex items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Web3 + AI 設計 - 方案2 風格 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 上半部白、下半部透出首頁曲線底 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white from-40% to-transparent"></div>
        {/* AI 神經網絡 - 右上角，佔2/3面積 */}
        <div
            ref={containerRef}
            className="absolute bottom-0 right-0 w-[84vw] aspect-[11/10] md:top-0 md:bottom-auto md:w-2/3 md:h-full md:aspect-auto opacity-45"
          >          <svg className="absolute inset-0 w-full h-full">
            {/* 不規則節點分佈 - 不規則大小 */}
            {[
              // 第一區域 - 左上（大小差異更大）
              { x: 12, y: 8, r: 8, color: '#a855f7', delay: 0, label: 'AI' },
              { x: 28, y: 15, r: 18, color: '#a855f7', delay: 0.15, label: 'ML' },
              { x: 18, y: 22, r: 6, color: '#a855f7', delay: 0.3, label: 'DL' },
              { x: 35, y: 10, r: 22, color: '#a855f7', delay: 0.45, label: 'NLP' },
              { x: 45, y: 18, r: 10, color: '#a855f7', delay: 0.6, label: 'CV' },
              { x: 52, y: 5, r: 14, color: '#a855f7', delay: 0.75, label: 'GPU' },
              { x: 25, y: 28, r: 16, color: '#a855f7', delay: 0.9, label: 'Tensor' },
              
              // 第二區域 - 中上
              { x: 15, y: 38, r: 20, color: '#06b6d4', delay: 1.05, label: 'Cloud' },
              { x: 32, y: 42, r: 7, color: '#06b6d4', delay: 1.2, label: 'AWS' },
              { x: 48, y: 35, r: 24, color: '#06b6d4', delay: 1.35, label: 'Azure' },
              { x: 22, y: 52, r: 12, color: '#06b6d4', delay: 1.5, label: 'GCP' },
              { x: 38, y: 48, r: 9, color: '#06b6d4', delay: 1.65, label: 'K8s' },
              { x: 55, y: 45, r: 19, color: '#06b6d4', delay: 1.8, label: 'Docker' },
              { x: 42, y: 58, r: 15, color: '#06b6d4', delay: 1.95, label: 'Micro' },
              { x: 28, y: 62, r: 11, color: '#06b6d4', delay: 2.1, label: 'API' },
              
              // 第三區域 - 中下
              { x: 18, y: 68, r: 13, color: '#3b82f6', delay: 2.25, label: 'React' },
              { x: 35, y: 72, r: 21, color: '#3b82f6', delay: 2.4, label: 'Vue' },
              { x: 52, y: 68, r: 8, color: '#3b82f6', delay: 2.55, label: 'Next' },
              { x: 25, y: 78, r: 17, color: '#3b82f6', delay: 2.7, label: 'Node' },
              { x: 45, y: 82, r: 5, color: '#3b82f6', delay: 2.85, label: 'Type' },
              { x: 38, y: 88, r: 23, color: '#3b82f6', delay: 3.0, label: 'GraphQL' },
              { x: 58, y: 75, r: 10, color: '#3b82f6', delay: 3.15, label: 'Mongo' },
              
              // 第四區域 - 右下
              { x: 22, y: 92, r: 16, color: '#6366f1', delay: 3.3, label: 'Redis' },
              { x: 42, y: 95, r: 9, color: '#6366f1', delay: 3.45, label: 'Postgres' },
              { x: 58, y: 88, r: 20, color: '#6366f1', delay: 3.6, label: 'MySQL' },
              { x: 35, y: 98, r: 7, color: '#6366f1', delay: 3.75, label: 'Elastic' },
              { x: 48, y: 92, r: 14, color: '#6366f1', delay: 3.9, label: 'Kafka' },
              
              // 額外散佈節點
              { x: 8, y: 45, r: 11, color: '#a855f7', delay: 4.05, label: 'PyTorch' },
              { x: 62, y: 25, r: 19, color: '#06b6d4', delay: 4.2, label: 'Lambda' },
              { x: 5, y: 72, r: 6, color: '#3b82f6', delay: 4.35, label: 'S3' },
              { x: 65, y: 55, r: 25, color: '#06b6d4', delay: 4.5, label: 'EC2' },
              { x: 12, y: 58, r: 8, color: '#a855f7', delay: 4.65, label: 'TF' },
              { x: 68, y: 82, r: 12, color: '#6366f1', delay: 4.8, label: 'RDS' },
            ].map((node, i) => {
              const isHovered = hoveredNode?.label === node.label;
              const baseR = isMobile ? node.r * 0.5 : node.r;
              
              // 為每個節點生成穩定的漂浮參數（基於索引）
              const floatOffset = (i % 5) * 0.8 + 2;  // 漂浮幅度：2-5.2
              const floatDuration = 3 + (i % 4) * 0.5;  // 漂浮速度：3-4.5秒
              const floatDelay = (i % 3) * 0.3;  // 漂浮延遲：0-0.6秒
              
              // 技術對應的URL
              const techUrls: { [key: string]: string } = {
                'AI': 'https://www.ibm.com/topics/artificial-intelligence',
                'ML': 'https://www.tensorflow.org/learn',
                'DL': 'https://www.tensorflow.org/tutorials',
                'NLP': 'https://cloud.google.com/learn/what-is-natural-language-processing',
                'CV': 'https://opencv.org/',
                'GPU': 'https://www.nvidia.com/en-us/',
                'Tensor': 'https://www.tensorflow.org/',
                'Cloud': 'https://aws.amazon.com/what-is-cloud-computing/',
                'AWS': 'https://aws.amazon.com/',
                'Azure': 'https://azure.microsoft.com/',
                'GCP': 'https://cloud.google.com/',
                'K8s': 'https://kubernetes.io/',
                'Docker': 'https://www.docker.com/',
                'Micro': 'https://microservices.io/',
                'API': 'https://restfulapi.net/',
                'React': 'https://react.dev/',
                'Vue': 'https://vuejs.org/',
                'Next': 'https://nextjs.org/',
                'Node': 'https://nodejs.org/',
                'Type': 'https://www.typescriptlang.org/',
                'GraphQL': 'https://graphql.org/',
                'Mongo': 'https://www.mongodb.com/',
                'Redis': 'https://redis.io/',
                'Postgres': 'https://www.postgresql.org/',
                'MySQL': 'https://www.mysql.com/',
                'Elastic': 'https://www.elastic.co/',
                'Kafka': 'https://kafka.apache.org/',
                'PyTorch': 'https://pytorch.org/',
                'Lambda': 'https://aws.amazon.com/lambda/',
                'S3': 'https://aws.amazon.com/s3/',
                'EC2': 'https://aws.amazon.com/ec2/',
                'TF': 'https://www.terraform.io/',
                'RDS': 'https://aws.amazon.com/rds/',
              };
              
              const handleClick = () => {
                const url = techUrls[node.label];
                if (url) {
                  window.open(url, '_blank', 'noopener,noreferrer');
                }
              };
              
              return (
                <g 
                  key={`node-${i}`}
                  onMouseEnter={() => {
                    if (containerRef.current) {
                      const rect = containerRef.current.getBoundingClientRect();
                      setHoveredNode({
                        label: node.label,
                        x: (node.x / 100) * rect.width + rect.left,
                        y: (node.y / 100) * rect.height + rect.top,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.g
                    animate={{
                      y: isHovered 
                        ? 0  // hover 時停止漂浮
                        : [
                            -floatOffset,  // 向上移動
                            floatOffset,   // 向下移動
                            -floatOffset,  // 回到向上
                          ],
                    }}
                    transition={{
                      duration: floatDuration,  // 每個節點不同的漂浮速度
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: node.delay + floatDelay,
                    }}
                  >
                    <motion.circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r={baseR}
                      fill={node.color}
                      animate={{
                        r: isHovered 
                          ? baseR * 1.1  // hover 時稍微放大，但保持固定
                          : [baseR * 0.7, baseR * 1.3, baseR * 0.7],
                        opacity: isHovered ? 1 : [0.5, 0.9, 0.5],
                      }}
                      transition={{
                        duration: isHovered ? 0.3 : 2 + Math.random() * 1.5,
                        repeat: isHovered ? 0 : Infinity,
                        ease: "easeInOut",
                        delay: isHovered ? 0 : node.delay + Math.random() * 0.3,
                      }}
                    />
                  </motion.g>
                  {/* 懸停時的波紋擴散效果 */}
                  {isHovered && (
                    <motion.g
                      animate={{
                        y: 0,  // hover 時波紋不漂浮
                      }}
                    >
                      {/* 第一層波紋 */}
                      <motion.circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={baseR}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        opacity={0.6}
                        animate={{
                          r: [baseR, baseR * 3],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                      {/* 第二層波紋 */}
                      <motion.circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={baseR}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        opacity={0.6}
                        animate={{
                          r: [baseR, baseR * 3],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.8,
                        }}
                      />
                      {/* 第三層波紋 */}
                      <motion.circle
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r={baseR}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        opacity={0.6}
                        animate={{
                          r: [baseR, baseR * 3],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 1.6,
                        }}
                      />
                    </motion.g>
                  )}
                </g>
              );
            })}
            
            {/* 不規則連接線 - 有機網絡連接 */}
            {[
              // 第一區域內部連接
              { x1: 12, y1: 8, x2: 28, y2: 15, color: '#a855f7', delay: 0 },
              { x1: 18, y1: 22, x2: 35, y2: 10, color: '#a855f7', delay: 0.2 },
              { x1: 45, y1: 18, x2: 52, y2: 5, color: '#a855f7', delay: 0.4 },
              { x1: 25, y1: 28, x2: 18, y2: 22, color: '#a855f7', delay: 0.6 },
              
              // 第一到第二區域連接
              { x1: 28, y1: 15, x2: 15, y2: 38, color: '#a855f7', delay: 0.8 },
              { x1: 35, y1: 10, x2: 32, y2: 42, color: '#a855f7', delay: 1.0 },
              { x1: 45, y1: 18, x2: 48, y2: 35, color: '#a855f7', delay: 1.2 },
              { x1: 18, y1: 22, x2: 22, y2: 52, color: '#a855f7', delay: 1.4 },
              
              // 第二區域內部連接
              { x1: 15, y1: 38, x2: 32, y2: 42, color: '#06b6d4', delay: 1.6 },
              { x1: 32, y1: 42, x2: 48, y2: 35, color: '#06b6d4', delay: 1.8 },
              { x1: 22, y1: 52, x2: 38, y2: 48, color: '#06b6d4', delay: 2.0 },
              { x1: 38, y1: 48, x2: 55, y2: 45, color: '#06b6d4', delay: 2.2 },
              { x1: 42, y1: 58, x2: 28, y2: 62, color: '#06b6d4', delay: 2.4 },
              
              // 第二到第三區域連接
              { x1: 15, y1: 38, x2: 18, y2: 68, color: '#06b6d4', delay: 2.6 },
              { x1: 32, y1: 42, x2: 35, y2: 72, color: '#06b6d4', delay: 2.8 },
              { x1: 48, y1: 35, x2: 52, y2: 68, color: '#06b6d4', delay: 3.0 },
              { x1: 22, y1: 52, x2: 25, y2: 78, color: '#06b6d4', delay: 3.2 },
              { x1: 42, y1: 58, x2: 45, y2: 82, color: '#06b6d4', delay: 3.4 },
              
              // 第三區域內部連接
              { x1: 18, y1: 68, x2: 35, y2: 72, color: '#3b82f6', delay: 3.6 },
              { x1: 35, y1: 72, x2: 52, y2: 68, color: '#3b82f6', delay: 3.8 },
              { x1: 25, y1: 78, x2: 45, y2: 82, color: '#3b82f6', delay: 4.0 },
              { x1: 38, y1: 88, x2: 45, y2: 82, color: '#3b82f6', delay: 4.2 },
              { x1: 58, y1: 75, x2: 52, y2: 68, color: '#3b82f6', delay: 4.4 },
              
              // 第三到第四區域連接
              { x1: 25, y1: 78, x2: 22, y2: 92, color: '#3b82f6', delay: 4.6 },
              { x1: 45, y1: 82, x2: 42, y2: 95, color: '#3b82f6', delay: 4.8 },
              { x1: 38, y1: 88, x2: 35, y2: 98, color: '#3b82f6', delay: 5.0 },
              { x1: 58, y1: 75, x2: 58, y2: 88, color: '#3b82f6', delay: 5.2 },
              
              // 第四區域內部連接
              { x1: 22, y1: 92, x2: 42, y2: 95, color: '#6366f1', delay: 5.4 },
              { x1: 42, y1: 95, x2: 58, y2: 88, color: '#6366f1', delay: 5.6 },
              { x1: 35, y1: 98, x2: 48, y2: 92, color: '#6366f1', delay: 5.8 },
              
              // 跨區域不規則連接
              { x1: 12, y1: 8, x2: 8, y2: 45, color: '#a855f7', delay: 6.0 },
              { x1: 52, y1: 5, x2: 62, y2: 25, color: '#a855f7', delay: 6.2 },
              { x1: 8, y1: 45, x2: 5, y2: 72, color: '#06b6d4', delay: 6.4 },
              { x1: 62, y1: 25, x2: 65, y2: 55, color: '#06b6d4', delay: 6.6 },
              { x1: 5, y1: 72, x2: 12, y2: 58, color: '#3b82f6', delay: 6.8 },
              { x1: 65, y1: 55, x2: 68, y2: 82, color: '#3b82f6', delay: 7.0 },
              { x1: 68, y1: 82, x2: 58, y2: 88, color: '#6366f1', delay: 7.2 },
              
              // 更多隨機連接
              { x1: 28, y1: 15, x2: 22, y2: 52, color: '#a855f7', delay: 7.4 },
              { x1: 48, y1: 35, x2: 42, y2: 58, color: '#06b6d4', delay: 7.6 },
              { x1: 35, y1: 72, x2: 38, y2: 88, color: '#3b82f6', delay: 7.8 },
              { x1: 25, y1: 78, x2: 48, y2: 92, color: '#3b82f6', delay: 8.0 },
            ].map((line, i) => (
              <motion.line
                key={`line-${i}`}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke={line.color}
                strokeWidth="1.8"
                opacity="0.25"
                animate={{
                  opacity: [0.15, 0.45, 0.15],
                  pathLength: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: line.delay + Math.random() * 0.5,
                }}
              />
            ))}
          </svg>
        </div>
        
        {/* 冷色調背景光暈 */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* IT 內容工具提示 */}
      {hoveredNode && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y - 15}px`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-2xl border border-cyan-400/50 min-w-[120px]">
            <div className="text-sm font-bold text-cyan-400 mb-1">{hoveredNode.label}</div>
            <div className="text-xs text-slate-300 mb-2">
              {hoveredNode.label === 'AI' && '人工知能・機械学習'}
              {hoveredNode.label === 'ML' && 'Machine Learning'}
              {hoveredNode.label === 'DL' && 'Deep Learning'}
              {hoveredNode.label === 'NLP' && '自然言語処理'}
              {hoveredNode.label === 'CV' && 'Computer Vision'}
              {hoveredNode.label === 'GPU' && 'GPU 高速計算'}
              {hoveredNode.label === 'Tensor' && 'TensorFlow フレームワーク'}
              {hoveredNode.label === 'Cloud' && 'クラウドコンピューティング'}
              {hoveredNode.label === 'AWS' && 'Amazon Web Services'}
              {hoveredNode.label === 'Azure' && 'Microsoft Azure'}
              {hoveredNode.label === 'GCP' && 'Google Cloud Platform'}
              {hoveredNode.label === 'K8s' && 'Kubernetes オーケストレーション'}
              {hoveredNode.label === 'Docker' && 'Docker コンテナ技術'}
              {hoveredNode.label === 'Micro' && 'マイクロサービス'}
              {hoveredNode.label === 'API' && 'RESTful API 設計'}
              {hoveredNode.label === 'React' && 'React フロントエンド'}
              {hoveredNode.label === 'Vue' && 'Vue.js フレームワーク'}
              {hoveredNode.label === 'Next' && 'Next.js フルスタック'}
              {hoveredNode.label === 'Node' && 'Node.js バックエンド'}
              {hoveredNode.label === 'Type' && 'TypeScript 型安全'}
              {hoveredNode.label === 'GraphQL' && 'GraphQL API'}
              {hoveredNode.label === 'Mongo' && 'MongoDB NoSQL'}
              {hoveredNode.label === 'Redis' && 'Redis キャッシュ'}
              {hoveredNode.label === 'Postgres' && 'PostgreSQL データベース'}
              {hoveredNode.label === 'MySQL' && 'MySQL リレーショナルDB'}
              {hoveredNode.label === 'Elastic' && 'Elasticsearch 検索'}
              {hoveredNode.label === 'Kafka' && 'Apache Kafka ストリーミング'}
              {hoveredNode.label === 'PyTorch' && 'PyTorch 深層学習'}
              {hoveredNode.label === 'Lambda' && 'AWS Lambda サーバーレス'}
              {hoveredNode.label === 'S3' && 'Amazon S3 ストレージ'}
              {hoveredNode.label === 'EC2' && 'Amazon EC2 コンピュート'}
              {hoveredNode.label === 'TF' && 'Terraform IaC'}
              {hoveredNode.label === 'RDS' && 'Amazon RDS データベース'}
            </div>
            <div className="text-xs text-cyan-400/80 italic mt-2 border-t border-cyan-400/30 pt-2">
              クリックして詳細を見る →
            </div>
          </div>
        </motion.div>
      )}

      {/* 文字內容層 - 在左側區域 */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:inline-block px-5 py-2.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-8"
          >
            デジタルトランスフォーメーション
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-5 md:mb-8 text-slate-800 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            次世代の
            <br />
            <span className="gradient-text">
              システム開発
            </span>
            <br />
            で未来を創る
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-00 mb-6 md:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            AI・クラウド・モバイルアプリ開発まで、
            <br />
            最先端技術でビジネスの成長を加速させます。
          </motion.p>
        </div>
      </div>
    </section>
  );
}
