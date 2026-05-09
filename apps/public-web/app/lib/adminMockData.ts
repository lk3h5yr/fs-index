/** 管理画面用モック（後で MongoDB と差し替え） */
export type MockNewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: '公開' | '編集中';
};

export const mockNewsList: MockNewsItem[] = [
  {
    id: '1',
    title: 'ベース株式会社 ベストパートナー賞を受賞しました',
    category: '経営',
    date: '2022-07-01',
    status: '公開',
  },
  {
    id: '2',
    title: '年末年始休業のお知らせ',
    category: 'お知らせ',
    date: '2023-11-30',
    status: '公開',
  },
  {
    id: '3',
    title: '経営革新計画が東京都に承認されました',
    category: '経営',
    date: '2022-07-06',
    status: '編集中',
  },
];

export type MockCaseItem = {
  id: string;
  industry: string;
  title: string;
  summary: string;
  stack: string;
  updatedAt: string;
};

export const mockCaseList: MockCaseItem[] = [
  {
    id: 'c1',
    industry: '保険・金融',
    title: '契約・請求リマインドの一元管理',
    summary: '複数代理店の契約・更新・請求をデジタル化し、リマインドと請求 PDF を自動化。',
    stack: '.NET / SQL Server / Azure',
    updatedAt: '2024-03-12',
  },
  {
    id: 'c2',
    industry: '製造',
    title: '生産ラインと在庫の可視化ダッシュボード',
    summary: '現場端末からの実績取込と KPI 集計をリアルタイム表示。',
    stack: 'React / Node.js / PostgreSQL',
    updatedAt: '2024-01-28',
  },
  {
    id: 'c3',
    industry: '小売',
    title: '店舗 POS 連携キャンペーン管理',
    summary: 'POS ログと会員 ID を突合し、キャンペーン効果を週次レポート化。',
    stack: 'Next.js / GCP',
    updatedAt: '2023-11-05',
  },
];

export const dashboardStats = [
  { label: 'お知らせ件数', value: '12', delta: '編集中 2 件を含む', icon: 'newspaper' as const },
  { label: '導入実績', value: '8', delta: '今月の更新はなし', icon: 'briefcase' as const },
];
