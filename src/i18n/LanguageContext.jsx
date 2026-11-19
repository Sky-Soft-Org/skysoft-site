import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { translations } from './translations.js';

const STORAGE_KEY = 'skysoft-lang';
const LanguageContext = createContext(null);

// ?lang=ar|en wins, then the visitor's last choice, then English
function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'ar' || fromUrl === 'en') return fromUrl;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  // Runs before paint so Arabic visitors never see a left-to-right flash
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = translations[lang]['meta.title'];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable (private mode) */
    }
  }, [lang]);

  const t = useCallback(
    (key) => {
      const value = translations[lang][key];
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`Missing ${lang} translation:`, key);
        return translations.en[key] ?? key;
      }
      return value;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, t, toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')) }),
    [lang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
