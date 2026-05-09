import type { Collection, Document, ObjectId } from 'mongodb';
import { getDb } from '@/app/lib/mongodb';
import {
  CASE_CATEGORIES,
  CMS_CASES_COLLECTION,
  formatDeliveredAtJaFromIso,
  isCmsCaseCategory,
  statusToCaseLabel,
  type CmsCaseAdminDetailItem,
  type CmsCaseAdminListItem,
  type CmsCaseCategory,
  type CmsCasePublicItem,
  type CmsCaseStatus,
} from '@/app/lib/cmsCasesShared';

export {
  CMS_CASES_COLLECTION,
  CASE_CATEGORIES,
  type CmsCaseAdminDetailItem,
  type CmsCaseAdminListItem,
  type CmsCaseCategory,
  type CmsCasePublicItem,
  type CmsCaseStatus,
  isCmsCaseCategory,
  formatDeliveredAtJaFromIso,
  statusToCaseLabel,
} from '@/app/lib/cmsCasesShared';

export type CmsCaseDoc = Document & {
  _id: ObjectId;
  title: string;
  category: CmsCaseCategory;
  client: string;
  /** 納品月の代表（UTC 当月1日正午想定） */
  deliveredAt: Date;
  benefits: string;
  /** @deprecated 旧データのみ参照。新規保存では省略 */
  description?: string;
  detail: string;
  tech: string[];
  status: CmsCaseStatus;
  createdAt: Date;
  updatedAt: Date;
};

export async function getCmsCasesCollection(): Promise<Collection<CmsCaseDoc>> {
  const db = await getDb();
  return db.collection<CmsCaseDoc>(CMS_CASES_COLLECTION);
}

function deliveredAtToIso(doc: CmsCaseDoc): string {
  const v = doc.deliveredAt;
  return v instanceof Date ? v.toISOString() : String(v);
}

export function toAdminListItem(doc: CmsCaseDoc): CmsCaseAdminListItem {
  const status = doc.status === 'draft' ? 'draft' : 'published';
  const iso = deliveredAtToIso(doc);
  const techArr = Array.isArray(doc.tech) ? doc.tech.map(String) : [];
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: isCmsCaseCategory(String(doc.category)) ? doc.category : CASE_CATEGORIES[0],
    client: typeof doc.client === 'string' ? doc.client : '',
    deliveredAt: iso,
    deliveryDateLabel: formatDeliveredAtJaFromIso(iso),
    techSummary: techArr.join(', '),
    status,
    statusLabel: statusToCaseLabel(status),
  };
}

export function serializeCaseForDetail(doc: CmsCaseDoc): CmsCaseAdminDetailItem {
  const base = toAdminListItem(doc);
  const techArr = Array.isArray(doc.tech) ? doc.tech.map(String) : [];
  return {
    ...base,
    benefits: typeof doc.benefits === 'string' ? doc.benefits : '',
    detail: typeof doc.detail === 'string' ? doc.detail : '',
    tech: techArr,
  };
}

/** 公開：published のみ */
export async function listPublishedCmsCases(limit?: number): Promise<CmsCasePublicItem[]> {
  const col = await getCmsCasesCollection();
  let q = col.find({ status: 'published' }).sort({ deliveredAt: -1, updatedAt: -1 });
  if (typeof limit === 'number' && Number.isFinite(limit) && limit > 0) {
    q = q.limit(Math.min(Math.floor(limit), 200));
  }
  const docs = await q.toArray();

  return docs.map((doc) => {
    const d = doc as CmsCaseDoc;
    const iso = deliveredAtToIso(d);
    const techArr = Array.isArray(d.tech) ? d.tech.map(String) : [];
    const cat = isCmsCaseCategory(String(d.category)) ? d.category : CASE_CATEGORIES[0];
    return {
      id: d._id.toString(),
      title: typeof d.title === 'string' ? d.title : '',
      category: cat,
      client: typeof d.client === 'string' ? d.client : '',
      deliveryDate: formatDeliveredAtJaFromIso(iso),
      benefits: typeof d.benefits === 'string' ? d.benefits : '',
      tech: techArr,
      detail: typeof d.detail === 'string' ? d.detail : '',
    };
  });
}
