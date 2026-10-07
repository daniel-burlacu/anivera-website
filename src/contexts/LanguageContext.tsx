'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, Language } from '../i18n/translation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Links such as /how-it-works?case=vets&lang=es open in the requested language.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    // Reading the URL needs the browser, so it cannot be the initial state without a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (requested && requested in translations) setLanguage(requested as Language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
