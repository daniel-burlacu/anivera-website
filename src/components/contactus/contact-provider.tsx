'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const links = [
  {
    labelKey: 'linkedinLabel' as const,
    value: 'Anivera',
    href: 'https://www.linkedin.com/company/anivera-xyz/',
  },
  {
    labelKey: 'emailLabel' as const,
    value: 'contact at anivera dot xyz',
  },
];

export default function ContactProvider() {
  const { t } = useLanguage();

  return (
    <div className="bg-anivera-bg flex flex-1 flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-anivera-ink mb-3 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {t.contactUs.title}
      </motion.h1>
      <motion.p
        className="text-anivera-body text-sm sm:text-base md:text-lg max-w-2xl text-center mb-6 sm:mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {t.contactUs.intro}
      </motion.p>

      <motion.ul
        className="w-full max-w-xl bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] divide-y divide-anivera-line"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {links.map((item) => (
          <li key={item.labelKey} className="p-4 sm:p-6">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-anivera-ai font-semibold">
              {t.contactUs[item.labelKey]}
            </p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-base sm:text-lg text-anivera-ink font-medium underline decoration-anivera-ai/40 underline-offset-4 hover:text-anivera-ai"
              >
                {item.value}
              </a>
            ) : (
              <p className="mt-1 text-base sm:text-lg text-anivera-ink font-medium">{item.value}</p>
            )}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
