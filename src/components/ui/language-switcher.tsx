'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translation';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

const LANGUAGES: { code: Language; name: string; displayCode: string; countryCode: string }[] = [
  { code: 'en', name: 'English', displayCode: 'UK', countryCode: 'GB' },
  { code: 'es', name: 'Español', displayCode: 'ES', countryCode: 'ES' },
  { code: 'de', name: 'Deutsch', displayCode: 'DE', countryCode: 'DE' },
  { code: 'pt', name: 'Português', displayCode: 'PT', countryCode: 'PT' },
  { code: 'fr', name: 'Français', displayCode: 'FR', countryCode: 'FR' },
  { code: 'ro', name: 'Română', displayCode: 'RO', countryCode: 'RO' },
  { code: 'it', name: 'Italiano', displayCode: 'IT', countryCode: 'IT' },
  { code: 'fi', name: 'Suomi', displayCode: 'FI', countryCode: 'FI' },
  { code: 'sv', name: 'Svenska', displayCode: 'SE', countryCode: 'SE' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-white text-anivera-ink hover:bg-anivera-bg border border-[#5F8C87] rounded-full flex items-center gap-2"
        title="Select Language"
      >
        <span className="font-semibold text-sm">{currentLanguage.displayCode}</span>
        <ReactCountryFlag countryCode={currentLanguage.countryCode} svg style={{width: '20px', height: '20px'}} />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-anivera-line rounded-xl shadow-lg z-40">
            <div className="p-2">
              {LANGUAGES.map(lang => {
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                      language === lang.code
                        ? 'bg-anivera-ink text-white'
                        : 'hover:bg-anivera-bg text-anivera-ink'
                    }`}
                    title={lang.name}
                  >
                    <ReactCountryFlag countryCode={lang.countryCode} svg style={{width: '20px', height: '20px'}} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{lang.displayCode}</div>
                      <div className="text-xs opacity-75">{lang.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function LanguageSwitcherMobile() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(lang => lang.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 bg-white text-anivera-ink hover:bg-anivera-bg border border-[#5F8C87] rounded-full flex items-center gap-1 text-xs"
        title="Select Language"
      >
        <span className="font-semibold">{currentLanguage.displayCode}</span>
        <ReactCountryFlag countryCode={currentLanguage.countryCode} svg style={{width: '16px', height: '16px'}} />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-anivera-line rounded-xl shadow-lg z-40">
            <div className="p-2">
              {LANGUAGES.map(lang => {
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors flex items-center gap-1 text-sm ${
                      language === lang.code
                        ? 'bg-anivera-ink text-white'
                        : 'hover:bg-anivera-bg text-anivera-ink'
                    }`}
                    title={lang.name}
                  >
                    <ReactCountryFlag countryCode={lang.countryCode} svg style={{width: '16px', height: '16px'}} />
                    <div className="flex-1">
                      <div className="font-semibold text-xs">{lang.displayCode}</div>
                      <div className="text-xs opacity-75">{lang.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
