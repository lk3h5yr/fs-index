'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { createTicketSchema } from '@/app/lib/schemas';

const inquiryTypes = [
  { value: '', label: '選択してください' },
  { value: 'サービスについて', label: 'サービスについて' },
  { value: '開発相談', label: '開発相談' },
  { value: 'お見積もり', label: 'お見積もり' },
  { value: 'パートナー提携', label: 'パートナー提携' },
  { value: 'その他', label: 'その他' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError('お問い合わせ種別を選択してください');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const validated = createTicketSchema.parse(formData);
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '送信に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">CONTACT</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-200">
            お問い合わせ
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            要件が未整理の段階でもご相談いただけます。まずはお気軽にご連絡ください。
          </p>
          <p className="text-slate-500 text-sm mt-3">
            1〜2営業日以内を目安にご返信いたします。お預かりした情報は、お問い合わせ対応以外の目的では使用いたしません。
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-8 md:p-10 rounded-[24px] bg-slate-50/80 border border-slate-200/90 shadow-sm relative"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-6">
            <div className="contact-field">
              <label className="contact-label block mb-2 font-semibold text-slate-700">
                お名前
                <span className="contact-badge-required">必須</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="山田 太郎"
                className="contact-input w-full p-4 border-2 border-slate-200 rounded-xl bg-white outline-none"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label block mb-2 font-semibold text-slate-700">
                メールアドレス
                <span className="contact-badge-required">必須</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@company.co.jp"
                className="contact-input w-full p-4 border-2 border-slate-200 rounded-xl bg-white outline-none"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label block mb-2 font-semibold text-slate-700">
                お問い合わせ種別
                <span className="contact-badge-required">必須</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="contact-input w-full p-4 border-2 border-slate-200 rounded-xl bg-white outline-none appearance-none cursor-pointer"
                required
              >
                {inquiryTypes.map((opt) => (
                  <option key={opt.value || 'empty'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="contact-field">
              <label className="contact-label block mb-2 font-semibold text-slate-700">
                メッセージ
                <span className="contact-badge-required">必須</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="ご相談内容、ご検討中の内容、ご希望の進め方などをご記入ください。"
                rows={6}
                className="contact-input w-full p-4 border-2 border-slate-200 rounded-xl bg-white outline-none resize-none"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-700 bg-green-50 p-4 rounded-xl border border-green-200 text-sm"
              >
                送信が完了しました。ありがとうございます。
              </motion.div>
            )}

            <p className="text-slate-500 text-sm">
              ご相談内容を確認のうえ、担当者よりご連絡いたします。
            </p>

            <motion.button
              type="submit"
              disabled={submitting}
              className="contact-submit-btn"
              whileTap={submitting ? undefined : { scale: 0.99 }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  送信中...
                </span>
              ) : (
                <>
                  お問い合わせを送信する
                  <span className="contact-submit-arrow" aria-hidden>→</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
