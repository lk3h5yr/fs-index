export const CONTACT_INQUIRIES_COLLECTION = 'contact_inquiries';

export type ContactInquiryAdminListItem = {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  messagePreview: string;
  read: boolean;
  createdAt: string;
};
