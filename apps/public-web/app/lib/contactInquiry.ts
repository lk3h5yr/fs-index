import type { Collection, Document, ObjectId } from 'mongodb';
import { getDb } from '@/app/lib/mongodb';
import {
  CONTACT_INQUIRIES_COLLECTION,
  type ContactInquiryAdminListItem,
} from '@/app/lib/contactInquiryShared';

export { CONTACT_INQUIRIES_COLLECTION } from '@/app/lib/contactInquiryShared';

export type ContactInquiryDoc = Document & {
  _id: ObjectId;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getContactInquiriesCollection(): Promise<Collection<ContactInquiryDoc>> {
  const db = await getDb();
  return db.collection<ContactInquiryDoc>(CONTACT_INQUIRIES_COLLECTION);
}

export function inquiryToAdminListItem(
  doc: ContactInquiryDoc,
  previewMax = 120,
): ContactInquiryAdminListItem {
  const msg = typeof doc.message === 'string' ? doc.message : '';
  const one = msg.replace(/\s+/g, ' ').trim();
  const preview =
    one.length <= previewMax ? one : `${one.slice(0, previewMax - 1)}…`;
  const ca = doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt);
  return {
    id: doc._id.toString(),
    name: typeof doc.name === 'string' ? doc.name : '',
    email: typeof doc.email === 'string' ? doc.email : '',
    inquiryType: typeof doc.inquiryType === 'string' ? doc.inquiryType : '',
    messagePreview: preview,
    read: !!doc.read,
    createdAt: Number.isNaN(ca.getTime()) ? new Date(0).toISOString() : ca.toISOString(),
  };
}
