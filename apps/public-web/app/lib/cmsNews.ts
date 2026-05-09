import type { Collection, Document, ObjectId } from 'mongodb';
import { getDb } from '@/app/lib/mongodb';
import {
  CMS_NEWS_COLLECTION,
  isCmsNewsCategory,
  statusToLabel,
  type CmsNewsAdminDetailItem,
  type CmsNewsAdminListItem,
  type CmsNewsCategory,
  type CmsNewsPublicItem,
  type CmsNewsStatus,
} from '@/app/lib/cmsNewsShared';

export {
  CMS_NEWS_COLLECTION,
  NEWS_CATEGORIES,
  type CmsNewsAdminDetailItem,
  type CmsNewsAdminListItem,
  type CmsNewsCategory,
  type CmsNewsPublicItem,
  type CmsNewsStatus,
  isCmsNewsCategory,
  statusToLabel,
} from '@/app/lib/cmsNewsShared';

/**
 * MongoDB コレクション: cms_news
 *
 * 想定インデックス（本番は手動または migration で作成推奨）
 * - { publishedAt: -1 }
 * - { status: 1, publishedAt: -1 }
 */
export type CmsNewsDoc = Document & {
  _id: ObjectId;
  title: string;
  category: CmsNewsCategory;
  description: string;
  body: string;
  publishedAt: Date;
  status: CmsNewsStatus;
  createdAt: Date;
  updatedAt: Date;
};

export async function getCmsNewsCollection(): Promise<Collection<CmsNewsDoc>> {
  const db = await getDb();
  return db.collection<CmsNewsDoc>(CMS_NEWS_COLLECTION);
}

export function toAdminListItem(doc: CmsNewsDoc): CmsNewsAdminListItem {
  const status = doc.status === 'draft' ? 'draft' : 'published';
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    publishedAt:
      doc.publishedAt instanceof Date ? doc.publishedAt.toISOString() : String(doc.publishedAt),
    status,
    statusLabel: statusToLabel(status),
  };
}

export function serializeNewsForDetail(doc: CmsNewsDoc): CmsNewsAdminDetailItem {
  return {
    ...toAdminListItem(doc),
    description: typeof doc.description === 'string' ? doc.description : '',
    body: typeof doc.body === 'string' ? doc.body : '',
  };
}

/** 公開サイトのみ：status が published のドキュメント */
export async function listPublishedCmsNews(limit?: number): Promise<CmsNewsPublicItem[]> {
  const col = await getCmsNewsCollection();
  let q = col.find({ status: 'published' }).sort({ publishedAt: -1, updatedAt: -1 });
  if (typeof limit === 'number' && Number.isFinite(limit) && limit > 0) {
    q = q.limit(Math.min(Math.floor(limit), 200));
  }
  const docs = await q.toArray();

  return docs.map((doc) => {
    const d = doc as CmsNewsDoc;
    const publishedAt =
      d.publishedAt instanceof Date ? d.publishedAt.toISOString() : String(d.publishedAt);
    return {
      id: d._id.toString(),
      title: typeof d.title === 'string' ? d.title : '',
      category: (isCmsNewsCategory(String(d.category)) ? d.category : 'お知らせ') as CmsNewsCategory,
      description: typeof d.description === 'string' ? d.description : '',
      body: typeof d.body === 'string' ? d.body : '',
      publishedAt,
    };
  });
}
