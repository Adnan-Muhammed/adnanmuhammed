import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiAward,
  FiShield,
  FiArrowUpRight,
  FiLayers,
  FiEye,
  FiX,
  FiMaximize2
} from 'react-icons/fi';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { trackEvent } from '../utils/analytics';
import { cyberAudio } from '../utils/cyberAudio';
import { useLanguage } from '../i18n';

export default function CVSection() {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);
  const downloadCvPath = '/cv/Adnan-Muhammed-CV.pdf';
  const previewCvPath = '/cv/Adnan-Muhammed-CV-preview.pdf';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowPreview(false);
    };
    if (showPreview) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPreview]);

  const handleDownload = (source = 'cv_section') => {
    try {
      cyberAudio.playCoin();
    } catch {
      // Audio optional
    }
    trackEvent('cv_download', { file: 'Adnan-Muhammed-CV.pdf', source, location: source });
  };

  const handleOpenTab = (source = 'cv_section') => {
    try {
      cyberAudio.playSoftClick();
    } catch {
      // Audio optional
    }
    trackEvent('cv_new_tab_open', { file: 'Adnan-Muhammed-CV-preview.pdf', source, location: source });
  };

  const handleOpenPreview = (source = 'cv_section') => {
    try {
      cyberAudio.playSoftClick();
    } catch {
      // Audio optional
    }
    setShowPreview(true);
    trackEvent('cv_preview_open', { file: 'Adnan-Muhammed-CV-preview.pdf', source, location: source });
  };

  return (
    <section
      className="relative py-16 sm:py-20 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden font-sans transition-colors duration-300"
      id="cv"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 -end-40 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 light:bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('cvSection.badge', 'Curriculum Vitae')}
            title={
              <>
                {t('cvSection.title', 'Verified Engineering Resume &')}{' '}
                <span className="gold-gradient-text">
                  {t('cvSection.titleHighlight', 'Qualifications')}
                </span>
              </>
            }
            subtitle={t(
              'cvSection.subtitle',
              'Complete technical background, production architecture track record, and verified engineering credentials.'
            )}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-8">
          {/* Left Column: Structured Resume Summary (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center my-auto">
            <Reveal delay={0.1}>
              <GlassCard className="p-6 sm:p-7 space-y-5 flex flex-col" glow="gold">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#070A12] dark:bg-[#070A12] light:bg-slate-100 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-orbitron font-black text-lg shadow-sm">
                        AM
                      </div>
                      <div className="text-start">
                        <h4 className="text-lg font-bold font-heading text-white dark:text-white light:text-slate-900">
                          {t('hero.name', 'Adnan Muhammed')}
                        </h4>
                        <span className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 block">
                          {t('cvSection.role', 'Production-Ready Full-Stack Developer')}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/30 font-bold whitespace-nowrap">
                      {t('cvSection.status', 'READY FOR HIRE')}
                    </span>
                  </div>

                  {/* Core Specialization */}
                  <div className="p-3.5 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-1.5 text-start">
                    <span className="text-[10px] font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <FiLayers size={12} />
                      <span>{t('cvSection.coreSpecializationTitle', 'CORE ARCHITECTURE & SYSTEMS')}</span>
                    </span>
                    <p className="text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-700 text-xs leading-relaxed font-sans">
                      {t(
                        'cvSection.coreSpecialization',
                        'Full-Stack Engineering (Next.js, React 19, TypeScript, Node.js, Express) with distributed databases (PostgreSQL/Supabase, MongoDB), WebRTC/Socket.IO real-time channels, and automated AWS Cloud CI/CD.'
                      )}
                    </p>
                  </div>

                  {/* Education, Languages & Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
                    <div className="p-3 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 uppercase block font-bold">
                        {t('cvSection.educationTitle', 'EDUCATION & BACKGROUND')}
                      </span>
                      <span className="text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800 text-xs font-medium block leading-snug">
                        {t('cvSection.education', 'Self-Taught & Project-Based Software Engineering, Computer Science & Systems Fundamentals')}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-1">
                      <span className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 uppercase block font-bold">
                        {t('cvSection.languagesTitle', 'LANGUAGES')}
                      </span>
                      <span className="text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800 text-xs font-medium block leading-snug">
                        {t('cvSection.languages', 'English (Professional), Malayalam (Native)')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download & Preview Actions */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-wrap items-center gap-2.5">
                  {/* Preview Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenPreview('cv_card_preview_btn')}
                    className="py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-1.5 hover:brightness-105 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <FiEye size={15} />
                    <span>Preview CV</span>
                  </button>

                  {/* Open in New Tab Button */}
                  <a
                    href={previewCvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOpenTab('cv_card_new_tab_btn')}
                    className="py-2.5 px-3.5 rounded-full bg-[#141A2B] dark:bg-[#141A2B] light:bg-slate-100 text-white dark:text-white light:text-slate-800 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37] text-xs font-heading font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
                    title={t('cvSection.openInTab', 'Open in New Tab')}
                  >
                    <span>Open in New Tab</span>
                    <FiExternalLink size={14} />
                  </a>

                  {/* Download PDF Button */}
                  <a
                    href={downloadCvPath}
                    download="Adnan-Muhammed-CV.pdf"
                    onClick={() => handleDownload('cv_card_download_icon')}
                    className="p-2.5 rounded-full bg-[#0E1320] dark:bg-[#0E1320] light:bg-white text-[#9AA4BC] hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/50 transition-all hover:scale-105 cursor-pointer"
                    title={t('cvSection.downloadPdf', 'Download CV (PDF)')}
                    aria-label="Download CV (PDF)"
                  >
                    <FiDownload size={15} />
                  </a>

                  {/* Contact Button */}
                  <a
                    href="#contact"
                    onClick={() => {
                      trackEvent('cta_click', { target: '#contact', source: 'cv_section', location: 'cv_card' });
                    }}
                    className="py-2.5 px-3.5 rounded-full bg-[#0E1320] dark:bg-[#0E1320] light:bg-white text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 font-heading font-bold text-xs tracking-wide border border-[#D4AF37]/30 hover:border-[#D4AF37] flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <span>{t('cvSection.hireMe', 'Contact')}</span>
                    <FiArrowUpRight size={13} className="rtl:rotate-180" />
                  </a>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Live Embedded PDF Viewer (7 cols) with internal scroll */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <GlassCard className="p-4 sm:p-5 flex flex-col justify-between" glow="gold">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-3 mb-3 text-xs font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                    <div className="flex items-center gap-1.5 text-white dark:text-white light:text-slate-900 font-medium min-w-0">
                      <FiAward className="text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-600 shrink-0" />
                      <span className="truncate text-[11px]">
                        {t('cvSection.documentPreview', 'DOCUMENT PREVIEW // Adnan-Muhammed-CV.pdf')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto text-[11px]">
                      <button
                        type="button"
                        onClick={() => handleOpenPreview('cv_viewer_header')}
                        className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
                      >
                        <FiMaximize2 size={12} />
                        <span>Preview</span>
                      </button>
                      <span className="text-white/20">•</span>
                      <a
                        href={previewCvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOpenTab('cv_viewer_header_new_tab')}
                        className="text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
                      >
                        <FiExternalLink size={12} />
                        <span>New Tab</span>
                      </a>
                    </div>
                  </div>

                  {/* PDF Document Frame - Full Width & Clean Aspect Ratio */}
                  <div className="w-full">
                    <div
                      onClick={() => handleOpenPreview('cv_frame_click')}
                      className="relative w-full h-[420px] sm:h-[540px] rounded-2xl overflow-hidden bg-[#0A0D18] border border-white/10 shadow-2xl group/viewer cursor-pointer"
                      title="Click to view full preview"
                    >
                      <object
                        data={`${previewCvPath}#toolbar=0&navpanes=0&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full hidden sm:block pointer-events-none"
                      >
                        <iframe
                          src={`${previewCvPath}#toolbar=0&navpanes=0&view=FitH`}
                          title="Adnan Muhammed CV Preview"
                          className="w-full h-full border-0 hidden sm:block pointer-events-none"
                        />
                      </object>

                      {/* Hover Action Overlay - No backdrop-blur to prevent GPU text blur */}
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover/viewer:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPreview('cv_hover_overlay');
                          }}
                          className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#070A12] font-heading font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all cursor-pointer"
                        >
                          <FiMaximize2 size={13} />
                          <span>Preview Full CV</span>
                        </button>
                        <a
                          href={previewCvPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenTab('cv_hover_overlay_new_tab');
                          }}
                          className="px-4 py-2 rounded-full bg-[#141A2B] text-white border border-white/20 font-heading font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all cursor-pointer"
                        >
                          <FiExternalLink size={13} />
                          <span>Open in New Tab</span>
                        </a>
                      </div>

                      {/* Graceful Mobile Preview Card */}
                      <div className="flex sm:hidden flex-col items-center justify-center h-full p-6 text-center space-y-4 bg-[#070A12]">
                        <div className="w-16 h-16 rounded-2xl bg-[#0E1320] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-2xl shadow-lg">
                          <FiFileText />
                        </div>
                        <div>
                          <h5 className="font-heading font-bold text-white text-base">
                            {t('cvSection.mobileFallbackTitle', 'Adnan Muhammed — Engineering Resume')}
                          </h5>
                          <p className="text-xs text-[#9AA4BC] mt-1 max-w-xs">
                            {t('cvSection.mobileFallbackDesc', 'Production-Ready Full-Stack Developer (MERN & Next.js, Docker, AWS EC2)')}
                          </p>
                        </div>
                        <div className="flex flex-col w-full gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => handleOpenPreview('cv_mobile_fallback_preview')}
                            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-bold text-xs text-center shadow-md flex items-center justify-center gap-1.5"
                          >
                            <FiEye size={14} />
                            <span>Preview CV</span>
                          </button>
                          <a
                            href={previewCvPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleOpenTab('cv_mobile_fallback_new_tab')}
                            className="w-full py-2.5 rounded-full bg-[#141A2B] text-white border border-white/10 text-xs text-center flex items-center justify-center gap-1.5"
                          >
                            <FiExternalLink size={14} />
                            <span>Open in New Tab</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 gap-2 border-t border-white/10 dark:border-white/10 light:border-slate-200 mt-2">
                  <span className="flex items-center gap-1.5">
                    <FiShield className="text-[#10B981]" />
                    <span>{t('cvSection.format', 'FORMAT: PDF · PRINT & ATS OPTIMIZED')}</span>
                  </span>
                  <span>{t('cvSection.fileSize', 'FILE SIZE: ~117 KB')}</span>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Full-Screen CV Lightbox / Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[460px] md:max-w-4xl lg:max-w-5xl h-[540px] md:h-[90vh] max-h-[88vh] md:max-h-[92vh] bg-[#0E1320] border border-white/15 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col cursor-default"
            >
              {/* Modal Top Bar */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#141A2B] border-b border-white/10 flex items-center justify-between gap-2 text-xs font-mono shrink-0">
                {/* Document Title */}
                <div className="flex items-center gap-1.5 sm:gap-2 text-white font-medium min-w-0 flex-1">
                  <FiFileText className="text-[#D4AF37] shrink-0" size={15} />
                  <span className="truncate text-[11px] sm:text-xs">
                    {t('cvSection.modalTitle', 'Adnan Muhammed — Curriculum Vitae (PDF)')}
                  </span>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {/* Open in New Tab Button */}
                  <a
                    href={previewCvPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleOpenTab('cv_modal_top_bar_new_tab')}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-[#D4AF37] border border-white/10 transition-colors text-xs font-medium whitespace-nowrap cursor-pointer shrink-0"
                    title={t('cvSection.openInTab', 'Open in New Tab')}
                  >
                    <FiExternalLink size={12} className="shrink-0" />
                    <span className="hidden sm:inline">{t('cvSection.openInTab', 'Open in New Tab')}</span>
                    <span className="sm:hidden">New Tab</span>
                  </a>

                  {/* Download Button */}
                  <a
                    href={downloadCvPath}
                    download="Adnan-Muhammed-CV.pdf"
                    onClick={() => handleDownload('cv_modal_top_bar_download')}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#070A12] font-semibold hover:brightness-110 transition-colors text-xs whitespace-nowrap cursor-pointer shrink-0"
                    title={t('cvSection.downloadPdf', 'Download CV')}
                  >
                    <FiDownload size={13} className="shrink-0" />
                    <span className="hidden sm:inline">{t('cvSection.downloadPdf', 'Download')}</span>
                  </a>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('cv_modal_close', { location: 'cv_modal' });
                      setShowPreview(false);
                    }}
                    className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                    aria-label="Close preview"
                    title="Close preview"
                  >
                    <FiX size={17} />
                  </button>
                </div>
              </div>

              {/* Modal PDF Viewport with internal scroll */}
              <div className="flex-1 w-full h-full bg-[#0E1320] overflow-hidden relative">
                {/* Desktop PDF Viewer */}
                <div className="hidden sm:block w-full h-full">
                  <object
                    data={`${previewCvPath}#view=FitH&toolbar=1`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <iframe
                      src={`${previewCvPath}#view=FitH&toolbar=1`}
                      title="Adnan Muhammed CV"
                      className="w-full h-full border-0"
                    />
                  </object>
                </div>

                {/* Mobile-Friendly Native Viewer fallback (prevents 'refused to connect' on phones) */}
                <div className="flex sm:hidden flex-col items-center justify-center h-full p-6 text-center space-y-4 bg-[#070A12]">
                  <div className="w-16 h-16 rounded-2xl bg-[#0E1320] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-2xl shadow-lg">
                    <FiFileText />
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-white text-base">
                      {t('cvSection.mobileFallbackTitle', 'Adnan Muhammed — Engineering Resume')}
                    </h5>
                    <p className="text-xs text-[#9AA4BC] mt-1 max-w-xs">
                      {t('cvSection.mobileFallbackDesc', 'Production-Ready Full-Stack Developer (MERN & Next.js, Docker, AWS EC2)')}
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-2.5 pt-2">
                    <a
                      href={previewCvPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOpenTab('cv_modal_mobile_new_tab')}
                      className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-bold text-xs text-center shadow-md flex items-center justify-center gap-1.5"
                    >
                      <FiExternalLink size={14} />
                      <span>{t('cvSection.openInTab', 'Open PDF in Full Screen')}</span>
                    </a>
                    <a
                      href={downloadCvPath}
                      download="Adnan-Muhammed-CV.pdf"
                      onClick={() => handleDownload('cv_modal_mobile_download')}
                      className="w-full py-2.5 rounded-full bg-[#141A2B] text-white border border-white/10 text-xs text-center flex items-center justify-center gap-1.5"
                    >
                      <FiDownload size={14} />
                      <span>{t('cvSection.downloadPdf', 'Download PDF Document')}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Bar - Replaces blank bottom space with thumb-friendly controls */}
              <div className="px-4 py-2.5 bg-[#141A2B] border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9AA4BC] shrink-0">
                <span className="flex items-center gap-1.5 text-[#10B981] text-[11px]">
                  <FiShield size={13} className="shrink-0" />
                  <span>{t('cvSection.format', 'FORMAT: PDF · PRINT & ATS OPTIMIZED')}</span>
                </span>
                <a
                  href={downloadCvPath}
                  download="Adnan-Muhammed-CV.pdf"
                  onClick={() => handleDownload('cv_modal_bottom_bar_download')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37] text-[#070A12] font-heading font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-sm"
                >
                  <FiDownload size={12} />
                  <span>Download PDF</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )
        }
      </AnimatePresence >
    </section >
  );
}
