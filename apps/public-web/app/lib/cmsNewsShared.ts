/** クライアント／サーバー共通（Mongo に依存しない）。 */

export const CMS_NEWS_COLLECTION = 'cms_news';

export const NEWS_CATEGORIES = ['経営', '製品・サービス', 'お知らせ', 'IR'] as const;
export type CmsNewsCategory = (typeof NEWS_CATEGORIES)[number];

export type CmsNewsStatus = 'published' | 'draft';

export type CmsNewsAdminListItem = {
  id: string;
  title: string;
  category: CmsNewsCategory;
  publishedAt: string;
  status: CmsNewsStatus;
  statusLabel: '公開' | '編集中';
};

export type CmsNewsAdminDetailItem = CmsNewsAdminListItem & {
  description: string;
  body: string;
};

/** 公開サイト用 API レスポンス項目 */
export type CmsNewsPublicItem = {
  id: string;
  title: string;
  category: CmsNewsCategory;
  description: string;
  body: string;
  publishedAt: string;
};

export function isCmsNewsCategory(s: string): s is CmsNewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(s);
}

export function statusToLabel(s: CmsNewsStatus): '公開' | '編集中' {
  return s === 'published' ? '公開' : '編集中';
}

/** 一覧左欄・首頁リスト: ISO → YYYY.MM */
export function publishedAtToYYYYMM(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}.${m}`;
}

/** `/news` 一覧・首頁お知らせで共用するカテゴリタグ（news-tag-*） */
export function getNewsCategoryTagClassName(category: CmsNewsCategory): string {
  switch (category) {
    case '経営':
      return 'news-tag news-tag-keiei';
    case '製品・サービス':
      return 'news-tag news-tag-service';
    case 'IR':
      return 'news-tag news-tag-ir';
    default:
      return 'news-tag news-tag-info';
  }
}
