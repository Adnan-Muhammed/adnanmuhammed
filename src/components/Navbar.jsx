import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiDownload,
  FiSun,
  FiMoon,
  FiGlobe,
  FiTerminal,
  FiArrowUpRight,
  FiCode
} from 'react-icons/fi';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { openProtectedWhatsApp } from '../utils/safeContact';
import { useLanguage } from '../i18n';
import { useTheme } from '../context';

export default function Navbar() {
  const { lang, toggleLang, t, isRTL } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: t('nav.home', 'Home'), href: '#hero', id: 'hero' },
    { label: t('nav.about', 'About'), href: '#about', id: 'about' },
    { label: t('nav.skills', 'Skills'), href: '#skills', id: 'skills' },
    { label: t('nav.projects', 'Projects'), href: '#projects', id: 'projects' },
    { label: t('nav.architecture', 'Architecture'), href: '#architecture', id: 'architecture' },
    { label: t('nav.cv', 'Resume'), href: '#cv', id: 'cv' },
    { label: t('nav.terminal', 'Terminal'), href: '#terminal', id: 'terminal' },
    { label: t('nav.contact', 'Contact'), href: '#contact', id: 'contact' },
  ];

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'architecture', 'cv', 'terminal', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-25% 0px -45% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans ${scrolled
          ? 'bg-[#070A12]/85 dark:bg-[#070A12]/90 light:bg-white/90 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)] light:shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Monogram: AM (Adnan Muhammed) */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Adnan Muhammed Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-[#D4AF37]/40 dark:border-[#D4AF37]/40 light:border-amber-500/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#D4AF37] transition-all duration-200">
              <span className="text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-600 font-orbitron font-black text-sm tracking-wider">
                AM
              </span>
              <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            </div>
            <div className="flex flex-col text-start">
              <span className="font-heading font-bold text-sm tracking-wide text-white dark:text-white light:text-slate-900 group-hover:text-[#D4AF37] transition-colors">
                {t('hero.name', 'Adnan Muhammed')}
              </span>
              <span className="text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 tracking-wider">
                Production-Ready Full-Stack
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0E1320]/70 dark:bg-[#0E1320]/80 light:bg-slate-100/80 border border-white/10 dark:border-white/10 light:border-slate-200 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-heading font-medium tracking-wide px-3 py-1.5 rounded-full transition-all duration-200 relative ${isActive
                    ? 'text-[#070A12] bg-[#D4AF37] font-bold shadow-[0_2px_10px_rgba(212,175,55,0.35)]'
                    : 'text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5 light:hover:bg-slate-200/60'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster: Theme Toggle + Language Toggle + Contact/CV */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
              title={isDark ? t('nav.themeLight', 'Switch to Light Mode') : t('nav.themeDark', 'Switch to Dark Mode')}
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Language Toggle (EN / AR) */}
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 hover:border-[#D4AF37]/50 text-xs font-mono text-[#cbd5e1] dark:text-[#cbd5e1] light:text-slate-700 hover:text-white flex items-center gap-1.5 transition-all"
              title="Toggle Language (English / العربية)"
            >
              <FiGlobe className="text-[#22D3EE]" size={14} />
              <span className="font-bold">{t('nav.toggleLang', 'العربية')}</span>
            </button>

            {/* Direct WhatsApp CTA (Protected Obfuscated Trigger) */}
            <button
              type="button"
              onClick={openProtectedWhatsApp}
              className="p-2 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 hover:border-[#10B981] text-[#10B981] hover:scale-105 transition-all cursor-pointer"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={16} />
            </button>

            {/* Resume / Contact Button */}
            <a
              href="#contact"
              className="text-xs font-heading font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] shadow-[0_2px_12px_rgba(212,175,55,0.3)] hover:brightness-105 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>{t('hero.ctaContact', "Let's Talk")}</span>
              <FiArrowUpRight className="rtl:rotate-180" size={14} />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-[#D4AF37]"
              aria-label="Toggle Theme"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono text-white dark:text-white light:text-slate-900"
            >
              {t('nav.toggleLang', 'AR')}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-white dark:text-white light:text-slate-900"
              aria-label="Open mobile navigation menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Spring Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#22D3EE] via-[#D4AF37] to-[#10B981] origin-left"
          style={{ scaleX }}
        />
      </header >

      {/* Mobile Navigation Drawer */}
      < AnimatePresence >
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 p-4 bg-[#070A12]/95 dark:bg-[#070A12]/95 light:bg-white/95 backdrop-blur-2xl border-b border-white/10 dark:border-white/10 light:border-slate-200 shadow-2xl md:hidden font-sans"
          >
            <div className="space-y-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-heading font-medium transition-colors ${activeSection === link.id
                    ? 'bg-[#D4AF37] text-[#070A12] font-bold'
                    : 'text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-between gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-bold text-xs text-center shadow-md"
                >
                  {t('hero.ctaContact', "Let's Talk")}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openProtectedWhatsApp();
                  }}
                  className="p-2.5 rounded-xl bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </button>
              </div>
            </div>
          </motion.div >
        )
        }
      </AnimatePresence >
    </>
  );
}
