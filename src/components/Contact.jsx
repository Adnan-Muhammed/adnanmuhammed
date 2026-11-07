import { useState } from 'react';
import {
  FiMail,
  FiSend,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUpRight,
  FiLoader
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { openProtectedWhatsApp } from '../utils/safeContact';
import { useLanguage } from '../i18n';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';

export default function Contact() {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Developer Role',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'Full-Stack Developer Role',
        message: '',
      });
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Guard: Check if actual EmailJS credentials have been configured
    const isConfigured =
      serviceId &&
      templateId &&
      publicKey &&
      serviceId !== 'your_service_id_here' &&
      templateId !== 'your_template_id_here' &&
      publicKey !== 'your_public_key_here';

    if (!isConfigured) {
      console.warn('EmailJS environment variables are not configured in .env');
      setStatus('error');
      setErrorMessage(
        t(
          'contact.errorNotConfigured',
          'EmailJS is not configured yet. Please add your actual credentials in the .env file and restart the dev server (npm run dev).'
        )
      );
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        reply_to: formData.email.trim(),
        message: formData.message.trim(),
        subject: formData.subject,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      // Clear form inputs after successful submission
      setFormData({
        name: '',
        email: '',
        subject: 'Full-Stack Developer Role',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS submission error:', error);
      setStatus('error');
      setErrorMessage(
        error?.text ||
        error?.message ||
        t('contact.errorDesc', 'Unable to send message. Please verify your EmailJS credentials or try again later.')
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Full-Stack Developer Role',
      message: '',
    });
    setErrorMessage('');
    setStatus('idle');
  };

  return (
    <section className="relative py-28 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden font-sans transition-colors duration-300" id="contact">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 light:bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('contact.badge', 'Get in Touch')}
            title={
              lang === 'ar' ? (
                <>
                  تواصل لبدء{' '}
                  <span className="gold-gradient-text">العمل الهندسي</span>
                </>
              ) : (
                <>
                  Let&apos;s Build Something{' '}
                  <span className="gold-gradient-text">Resilient</span>
                </>
              )
            }
            subtitle={t('contact.subtitle', 'Available for full-time Full-Stack, Backend Engineering, and Cloud/DevOps opportunities. Let us connect.')}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-8">

          {/* Left Column: Direct channels (5 cols) - Strictly LTR */}
          <div dir="ltr" className="lg:col-span-5 flex flex-col text-left">
            <Reveal delay={0.1} className="h-full flex-1 flex flex-col">
              <GlassCard className="p-6 sm:p-7 h-full flex-1 flex flex-col justify-between" glow="gold">
                <div className="h-full flex-1 flex flex-col justify-between">
                  {/* Top Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4 text-xs font-mono">
                    <span className="font-bold text-white dark:text-white light:text-slate-900 tracking-wider uppercase">
                      {t('contact.channels', 'Direct Channels')}
                    </span>
                    <span className="text-[#10B981] flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      {t('contact.available', 'Available Now')}
                    </span>
                  </div>

                  {/* Contact Channels List */}
                  <div className="space-y-3.5 pt-5 flex-1 flex flex-col justify-between">
                    {/* WhatsApp (Protected Obfuscated Trigger - No plaintext number in DOM) */}
                    <button
                      type="button"
                      onClick={openProtectedWhatsApp}
                      className="w-full p-4 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-[#10B981]/50 transition-all flex items-center gap-4 group shadow-sm text-left cursor-pointer"
                    >
                      <div className="p-3 rounded-lg bg-[#10B981]/10 text-[#10B981] group-hover:scale-110 transition-transform">
                        <FaWhatsapp className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider font-bold">
                          Instant Messaging
                        </div>
                        <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-[#10B981] transition-colors truncate">
                          Chat on WhatsApp (HR &amp; Quick Connect)
                        </div>
                      </div>
                      <FiArrowUpRight className="text-[#10B981] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all rtl:rotate-180" />
                    </button>

                    {/* Email */}
                    <a
                      href="mailto:adnan.shajahan786@gmail.com"
                      className="p-4 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-[#D4AF37]/50 transition-all flex items-center gap-4 group shadow-sm"
                    >
                      <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-110 transition-transform">
                        <FiMail className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                          Direct Email
                        </div>
                        <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-[#D4AF37] transition-colors truncate">
                          adnan.shajahan786@gmail.com
                        </div>
                      </div>
                      <FiArrowUpRight className="text-[#D4AF37] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all rtl:rotate-180" />
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/adnan-Muhammed/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-[#22D3EE]/50 transition-all flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-lg bg-[#22D3EE]/10 text-[#22D3EE] group-hover:scale-110 transition-transform">
                        <FiGithub className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 uppercase tracking-wider">
                          GitHub Profile
                        </div>
                        <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-[#22D3EE] transition-colors truncate">
                          github.com/adnan-Muhammed
                        </div>
                      </div>
                      <FiArrowUpRight className="text-[#9AA4BC] group-hover:text-[#22D3EE] transition-colors rtl:rotate-180" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/adnan-muhammed-s/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-[#38BDF8]/50 transition-all flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] group-hover:scale-110 transition-transform">
                        <FiLinkedin className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 uppercase tracking-wider">
                          LinkedIn Profile
                        </div>
                        <div className="text-sm font-semibold text-white dark:text-white light:text-slate-900 group-hover:text-[#38BDF8] transition-colors truncate">
                          linkedin.com/in/adnan-muhammed-s
                        </div>
                      </div>
                      <FiArrowUpRight className="text-[#9AA4BC] group-hover:text-[#38BDF8] transition-colors rtl:rotate-180" />
                    </a>

                    {/* Location */}
                    <div className="p-4 rounded-xl bg-[#070A12]/40 dark:bg-[#070A12]/40 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-200 text-[#D4AF37]">
                        <FiMapPin className="text-xl" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 uppercase tracking-wider">
                          Base Location
                        </div>
                        <div className="text-sm font-medium text-white dark:text-white light:text-slate-800">
                          Kerala, India · Open for Remote &amp; Relocation
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-start">
            <Reveal delay={0.2} className="h-full flex-1 flex flex-col">
              <GlassCard className="p-6 sm:p-7 h-full flex-1 flex flex-col justify-between" glow="gold">
                <div className="h-full flex-1 flex flex-col justify-between">
                  {/* Matching Header Bar for Right Card */}
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4 text-xs font-mono">
                    <span className="font-bold text-white dark:text-white light:text-slate-900 tracking-wider uppercase">
                      {t('contact.sendDirect', 'Direct Message')}
                    </span>
                    <span className="text-[#9AA4BC] flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      {t('contact.responseTime', 'Responds within 24h')}
                    </span>
                  </div>

                  {status === 'success' ? (
                    <div className="py-12 text-center space-y-4 my-auto">
                      <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center mx-auto text-3xl">
                        <FiCheckCircle />
                      </div>
                      <h3 className="text-2xl font-bold font-heading text-white dark:text-white light:text-slate-900">
                        {t('contact.successTitle', 'Message Dispatched')}
                      </h3>
                      <p className="text-sm text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 max-w-md mx-auto">
                        {t('contact.successDesc', 'Thank you! Your message has been received. I will respond to your email promptly.')}
                      </p>
                      <button
                        onClick={handleReset}
                        className="btn-cyber-secondary text-xs px-6 py-2.5 mt-2 cursor-pointer"
                      >
                        {t('contact.sendAnother', 'Send Another Message')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="pt-5 flex-1 flex flex-col justify-between gap-4">
                      {/* Honeypot anti-spam (off-screen, invisible to users & ignored by autofill) */}
                      <div className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="_security_honeypot_field"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          tabIndex="-1"
                          autoComplete="new-password"
                        />
                      </div>

                      {/* Error Alert Banner */}
                      {status === 'error' && (
                        <div
                          role="alert"
                          className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3"
                        >
                          <FiAlertCircle className="text-lg flex-shrink-0 mt-0.5 text-red-400" />
                          <div className="flex-1">
                            <div className="font-semibold text-red-300">
                              {t('contact.errorTitle', 'Message Delivery Failed')}
                            </div>
                            <div className="text-xs text-red-300/80 mt-1 leading-relaxed">
                              {errorMessage || t('contact.errorDesc', 'Unable to send message. Please verify your EmailJS credentials or try again later.')}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 block">
                            {t('contact.nameLabel', 'Your Name *')}
                          </label>
                          <input
                            dir="ltr"
                            type="text"
                            required
                            disabled={status === 'submitting'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t('contact.namePlaceholder', "What's your name?")}
                            className="w-full px-4 py-3 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors text-left disabled:opacity-50"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 block">
                            {t('contact.emailLabel', 'Email Address *')}
                          </label>
                          <input
                            dir="ltr"
                            type="email"
                            required
                            disabled={status === 'submitting'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={t('contact.emailPlaceholder', "What's your email?")}
                            className="w-full px-4 py-3 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors text-left disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Subject / Role */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 block">
                          {t('contact.subjectLabel', 'Role / Subject *')}
                        </label>
                        <select
                          dir="ltr"
                          disabled={status === 'submitting'}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors text-left cursor-pointer disabled:opacity-50"
                        >
                          <option value="Full-Stack Developer Role">Full-Stack Developer Role (MERN / Next.js)</option>
                          <option value="Backend Engineer Opportunity">Backend Engineer Opportunity (Node.js / Express)</option>
                          <option value="Junior Cloud / DevOps Opportunity">Junior Cloud / DevOps Opportunity (AWS / Docker)</option>
                          <option value="Contract / Project Inquiries">Contract / Project Inquiries</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5 flex-1 flex flex-col">
                        <label className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 block">
                          {t('contact.messageLabel', 'Project or Opportunity Details *')}
                        </label>
                        <textarea
                          dir="ltr"
                          required
                          disabled={status === 'submitting'}
                          rows="5"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('contact.messagePlaceholder', "What would you like to say? Tell me about the role, team, or project...")}
                          className="w-full flex-1 min-h-[140px] px-4 py-3 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-sm text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none text-left disabled:opacity-50"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={status === 'submitting'}
                          className="btn-cyber-primary w-full justify-center py-3.5 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                        >
                          {status === 'submitting' ? (
                            <>
                              <FiLoader className="animate-spin text-base" />
                              <span>{t('contact.submittingBtn', 'Sending...')}</span>
                            </>
                          ) : (
                            <>
                              <FiSend size={15} />
                              <span>{t('contact.submitBtn', 'Send Message')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          </div>

        </div>
      </div >
    </section >
  );
}
