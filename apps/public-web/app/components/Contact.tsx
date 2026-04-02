'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { createTicketSchema } from '@/app/lib/schemas';

type SubmitOverlay = 'idle' | 'loading' | 'success';

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
  const [submitOverlay, setSubmitOverlay] = useState<SubmitOverlay>('idle');
  const [formExpanded, setFormExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      setError('お問い合わせ種別を選択してください');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess(false);
    setSubmitOverlay('loading');
    const loadingStartedAt = Date.now();

    try {
      createTicketSchema.parse(formData);

      /* 送信 API 未実装のためモード：常に成功。実装後は fetch('/api/tickets', …) に差し替え */
      const minLoadingMs = 2000;
      const elapsed = Date.now() - loadingStartedAt;
      if (elapsed < minLoadingMs) {
        await new Promise((r) => setTimeout(r, minLoadingMs - elapsed));
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setSuccess(true);
      setFormExpanded(true);
      setSubmitOverlay('success');
      await new Promise((r) => setTimeout(r, 2500));
      setSubmitOverlay('idle');
    } catch (err: unknown) {
      setSubmitOverlay('idle');
      setError(err instanceof Error ? err.message : '送信に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-0"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] md:text-xs font-medium tracking-widest text-gray-400 mb-1.5 md:mb-2">CONTACT</p>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight pb-3 md:pb-4 border-b border-gray-200">
            お問い合わせ
          </h2>
          <p className="text-gray-600 mt-3 md:mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
            要件が未整理の段階でもご相談いただけます。まずはお気軽にご連絡ください。
          </p>
          <p className="text-slate-500 text-xs md:text-sm mt-2 md:mt-3 leading-relaxed">
            1〜2営業日以内を目安にご返信いたします。お預かりした情報は、お問い合わせ対応以外の目的では使用いたしません。
          </p>
          <button
            type="button"
            onClick={() => setFormExpanded((v) => !v)}
            className="about-cta-primary about-cta-primary--sm mt-5 md:mt-6"
            aria-expanded={formExpanded}
            aria-controls="contact-form-panel"
          >
            {formExpanded ? 'フォームを閉じる' : 'お問い合わせフォームを開く'}
          </button>
        </motion.div>

        <div
          id="contact-form-panel"
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            formExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          aria-hidden={!formExpanded}
        >
          <div className="min-h-0 overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="mt-6 md:mt-8 p-5 sm:p-7 md:p-10 rounded-2xl md:rounded-[24px] bg-slate-50/80 border border-slate-200/90 shadow-sm relative overflow-hidden"
            >
              <AnimatePresence>
                {submitOverlay !== 'idle' && (
                  <motion.div
                    key="contact-overlay"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl md:rounded-[24px] bg-white/92 backdrop-blur-md px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {submitOverlay === 'loading' && (
                      <motion.div
                        key="loading"
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                      >
                        <motion.span
                          className="inline-block w-12 h-12 border-[3px] border-[#1e3a5f] border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                        />
                        <p className="text-sm md:text-base font-semibold text-slate-800 tracking-wide">送信中です…</p>
                        <p className="text-xs md:text-sm text-slate-500 text-center max-w-xs">しばらくそのままお待ちください</p>
                      </motion.div>
                    )}
                    {submitOverlay === 'success' && (
                      <motion.div
                        key="success"
                        className="flex flex-col items-center gap-3 text-center max-w-sm"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      >
                        <motion.span
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.08, stiffness: 400, damping: 18 }}
                        >
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.span>
                        <p className="text-base md:text-lg font-bold text-slate-900">お問い合わせを受け付けました</p>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                          送信が完了しました。担当よりご連絡いたします。
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`space-y-5 md:space-y-6 ${submitOverlay !== 'idle' ? 'pointer-events-none opacity-40' : ''}`}>
                <div className="contact-field">
              <label className="contact-label block mb-1.5 md:mb-2 font-semibold text-slate-700 text-sm md:text-base">
                お名前
                <span className="contact-badge-required">必須</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="山田 太郎"
                className="contact-input w-full p-3 md:p-4 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white outline-none"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label block mb-1.5 md:mb-2 font-semibold text-slate-700 text-sm md:text-base">
                メールアドレス
                <span className="contact-badge-required">必須</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@company.co.jp"
                className="contact-input w-full p-3 md:p-4 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white outline-none"
                required
              />
            </div>
            <div className="contact-field">
              <label className="contact-label block mb-1.5 md:mb-2 font-semibold text-slate-700 text-sm md:text-base">
                お問い合わせ種別
                <span className="contact-badge-required">必須</span>
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="contact-input w-full p-3 md:p-4 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white outline-none appearance-none cursor-pointer"
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
              <label className="contact-label block mb-1.5 md:mb-2 font-semibold text-slate-700 text-sm md:text-base">
                メッセージ
                <span className="contact-badge-required">必須</span>
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="ご相談内容、ご検討中の内容、ご希望の進め方などをご記入ください。"
                rows={6}
                className="contact-input w-full p-3 md:p-4 text-sm md:text-base border-2 border-slate-200 rounded-xl bg-white outline-none resize-none"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-600 bg-red-50 p-3 md:p-4 rounded-xl border border-red-200 text-xs md:text-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-800 bg-green-50 p-3 md:p-4 rounded-xl border border-green-200 text-xs md:text-sm"
              >
                送信が完了しました。ありがとうございます。
              </motion.div>
            )}

            <p className="text-slate-500 text-xs md:text-sm">
              ご相談内容を確認のうえ、担当者よりご連絡いたします。
            </p>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="contact-submit-btn"
                  whileTap={submitting ? undefined : { scale: 0.99 }}
                >
                  {submitting ? (
                    <span>送信中…</span>
                  ) : (
                    <>
                      お問い合わせを送信する
                      <span className="contact-submit-arrow" aria-hidden>→</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
