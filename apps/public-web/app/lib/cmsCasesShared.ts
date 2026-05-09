/** クライアント／サーバー共通（Mongo に依存しない）。 */

export const CMS_CASES_COLLECTION = 'cms_cases';

export const CASE_CATEGORIES = [
  'Webアプリケーション',
  'モバイルアプリ',
  'インフラ構築',
  'システム統合',
  '業務システム',
] as const;
export type CmsCaseCategory = (typeof CASE_CATEGORIES)[number];

export type CmsCaseStatus = 'published' | 'draft';

export type CmsCaseAdminListItem = {
  id: string;
  title: string;
  category: CmsCaseCategory;
  client: string;
  /** ISO（deliveredAt、月の代表日） */
  deliveredAt: string;
  /** 表示用「YYYY年M月納品」 */
  deliveryDateLabel: string;
  techSummary: string;
  status: CmsCaseStatus;
  statusLabel: '公開' | '編集中';
};

export type CmsCaseAdminDetailItem = CmsCaseAdminListItem & {
  benefits: string;
  detail: string;
  tech: string[];
};

/** 公開 API・/cases 画面用 */
export type CmsCasePublicItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  deliveryDate: string;
  benefits: string;
  tech: string[];
  detail: string;
};

export function isCmsCaseCategory(s: string): s is CmsCaseCategory {
  return (CASE_CATEGORIES as readonly string[]).includes(s);
}

export function statusToCaseLabel(s: CmsCaseStatus): '公開' | '編集中' {
  return s === 'published' ? '公開' : '編集中';
}

/** DB の deliveredAt（UTC 月初）から日本語ラベル */
export function formatDeliveredAtJaFromIso(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  return `${y}年${m}月納品`;
}

/** フォーム `<input type="month" value="YYYY-MM">` → UTC 当月1日 12:00 */
export function deliveredMonthInputToUtcDate(ym: string): Date {
  const trimmed = ym.trim();
  const m = /^(\d{4})-(\d{2})$/.exec(trimmed);
  if (!m) throw new Error('invalid_month');
  const y = Number(m[1]);
  const mo = Number(m[2]);
  if (!Number.isFinite(y) || mo < 1 || mo > 12) throw new Error('invalid_month');
  return new Date(Date.UTC(y, mo - 1, 1, 12, 0, 0));
}

/** ISO（deliveredAt）→ `YYYY-MM` for month input */
export function deliveredAtToMonthInput(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getUTCFullYear();
  const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${mo}`;
}

/** textarea：改行またはカンマで分割して技術スタック配列へ */
export function parseTechStackInput(raw: string): string[] {
  const s = raw.replace(/\r\n/g, '\n').trim();
  if (!s) return [];
  const parts = s.split(/[\n,、，]+/).map((x) => x.trim()).filter(Boolean);
  return parts;
}

export function formatTechStackForInput(tech: string[]): string {
  return tech.join('\n');
}
