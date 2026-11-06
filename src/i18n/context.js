import { createContext } from 'react';

export const LanguageContext = createContext({
  lang: 'en',
  dir: 'ltr',
  setLang: () => {},
  toggleLang: () => {},
  t: (key, fallback) => fallback || key,
});

export default LanguageContext;
