'use client';

/**
 * 全站共用的底板：IT 感不規則曲面圖形，冷色調（水藍→深藍、淺綠→深綠）
 * 各頁面引用時傳入 idPrefix 避免 gradient ID 衝突
 */
export default function CurveBg({ idPrefix = 'curve' }: { idPrefix?: string }) {
  const g1 = `${idPrefix}-blue`;
  const g2 = `${idPrefix}-green`;
  const g3 = `${idPrefix}-teal`;

  return (
    <div
      className="curve-bg fixed bottom-0 left-0 right-0 h-[50vh] min-h-[320px] max-h-[480px] pointer-events-none z-[-1]"
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 水藍 → 深藍 */}
          <linearGradient id={g1} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="45%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          {/* 淺綠 → 深綠 */}
          <linearGradient id={g2} x1="100%" y1="80%" x2="0%" y2="20%">
            <stop offset="0%" stopColor="#ccfbf1" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          {/* 淺青 → 深青（點綴） */}
          <linearGradient id={g3} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#164e63" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        {/* 不規則曲面 1：左側大塊，水藍→深藍 */}
        <path
          fill={`url(#${g1})`}
          fillOpacity="0.42"
          d="M 0 400 L 0 220 Q 120 120 280 180 Q 440 240 520 140 Q 600 80 720 200 Q 840 280 900 100 L 1200 160 L 1200 400 Z"
        />
        {/* 不規則曲面 2：中右側，淺綠→深綠 */}
        <path
          fill={`url(#${g2})`}
          fillOpacity="0.38"
          d="M 0 400 L 0 320 Q 200 260 400 280 Q 600 240 800 200 Q 1000 160 1200 220 L 1200 400 Z"
        />
        {/* 不規則曲面 3：右側小塊，青調點綴 */}
        <path
          fill={`url(#${g3})`}
          fillOpacity="0.28"
          d="M 600 400 Q 750 280 950 260 Q 1100 240 1200 300 L 1200 400 Z"
        />
        {/* 不規則曲面 4：左側第二層，增加層次 */}
        <path
          fill={`url(#${g1})`}
          fillOpacity="0.18"
          d="M 0 400 L 0 300 Q 180 240 350 280 Q 500 320 650 260 L 800 320 L 0 400 Z"
        />
      </svg>
    </div>
  );
}
