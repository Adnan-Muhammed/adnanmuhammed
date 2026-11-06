import { useState, useEffect, useMemo, useCallback } from 'react';
import { LanguageContext } from './context';
import en from './en';
import ar from './ar';

const dictionaries = { en, ar };

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('spc_lang');
      if (stored === 'en' || stored === 'ar') return stored;
      if (navigator.language && navigator.language.startsWith('ar')) {
        return 'ar';
      }
    }
    return 'en';
  });

  const [arabicSuggestion, setArabicSuggestion] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('spc_lang');
      const dismissed = sessionStorage.getItem('spc_ar_suggest_dismissed');
      if (!stored && !dismissed && navigator.language && navigator.language.startsWith('ar')) {
        return true;
      }
    }
    return false;
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('spc_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
      if (dir === 'rtl') {
        document.documentElement.classList.add('rtl-mode');
        document.body.classList.add('font-cairo');
      } else {
        document.documentElement.classList.remove('rtl-mode');
        document.body.classList.remove('font-cairo');
      }
    }
  }, [lang, dir]);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      // Trigger achievement event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('spc_achievement_trigger', { detail: { id: 'bilingual' } }));
      }
      return next;
    });
    setArabicSuggestion(false);
  }, []);

  const setLang = useCallback((nextLang) => {
    if (nextLang === 'en' || nextLang === 'ar') {
      setLangState(nextLang);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('spc_achievement_trigger', { detail: { id: 'bilingual' } }));
      }
      setArabicSuggestion(false);
    }
  }, []);

  const dismissSuggestion = useCallback(() => {
    setArabicSuggestion(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('spc_ar_suggest_dismissed', 'true');
    }
  }, []);

  // Nested key resolver: t('nav.home', 'Home')
  const t = useCallback(
    (path, fallback) => {
      const dict = dictionaries[lang] || dictionaries.en;
      const parts = path.split('.');
      let cur = dict;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = cur[p];
        } else {
          // Fall back to English dictionary before raw path
          let engCur = dictionaries.en;
          for (const ep of parts) {
            if (engCur && typeof engCur === 'object' && ep in engCur) {
              engCur = engCur[ep];
            } else {
              return fallback || path;
            }
          }
          return typeof engCur === 'string' ? engCur : (fallback || path);
        }
      }
      return typeof cur === 'string' ? cur : (fallback || path);
    },
    [lang]
  );

  const value = useMemo(
    () => ({
      lang,
      dir,
      isRTL: dir === 'rtl',
      setLang,
      toggleLang,
      t,
      arabicSuggestion,
      dismissSuggestion,
    }),
    [lang, dir, setLang, toggleLang, t, arabicSuggestion, dismissSuggestion]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
