import { FiArrowUp, FiHeart, FiGlobe, FiSun, FiMoon, FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { openProtectedWhatsApp } from '../utils/safeContact';
import { useLanguage } from '../i18n';
import { useTheme } from '../context';

export default function Footer() {
  const { t, toggleLang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-[#05080E] dark:bg-[#05080E] light:bg-slate-100 border-t border-white/10 dark:border-white/10 light:border-slate-200 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5 dark:border-white/5 light:border-slate-200">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border border-[#D4AF37]/30 flex items-center justify-center font-orbitron font-black text-sm text-[#D4AF37]">
              AM
            </div>
            <div className="text-start">
              <div className="text-sm font-bold font-heading text-white dark:text-white light:text-slate-900">
                Adnan Muhammed
              </div>
              <div className="text-[11px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                Production-Ready Full-Stack Developer
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/adnan-Muhammed/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 text-[#9AA4BC] hover:text-[#D4AF37] border border-white/5 dark:border-white/5 light:border-slate-200 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/adnan-muhammed-s/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 text-[#9AA4BC] hover:text-[#D4AF37] border border-white/5 dark:border-white/5 light:border-slate-200 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <button
              type="button"
              onClick={openProtectedWhatsApp}
              className="p-2.5 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 transition-colors cursor-pointer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp size={16} />
            </button>
            <a
              href="mailto:adnan.shajahan786@gmail.com"
              className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white hover:bg-white/10 text-[#9AA4BC] hover:text-[#D4AF37] border border-white/5 dark:border-white/5 light:border-slate-200 transition-colors"
              aria-label="Email"
            >
              <FiMail size={16} />
            </a>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white text-xs font-mono text-[#9AA4BC] hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              {isDark ? <FiSun size={13} className="text-[#D4AF37]" /> : <FiMoon size={13} className="text-[#D4AF37]" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white text-xs font-mono text-[#9AA4BC] hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <FiGlobe size={13} className="text-[#22D3EE]" />
              <span>{t('nav.toggleLang', 'العربية')}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-white hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-white/5 dark:border-white/5 light:border-slate-200 transition-colors"
              aria-label="Scroll to top"
            >
              <FiArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex items-center justify-center text-xs font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 text-center">
          <div>
            <span>{t('footer.builtBy', 'Built & Maintained by')}{' '}</span>
            <a
              href="https://www.linkedin.com/in/adnan-muhammed-s/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#FAFFE6] hover:underline transition-colors font-semibold"
            >
              Adnan Muhammed
            </a>
            <span className="opacity-40 mx-2">·</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer >
  );
}
