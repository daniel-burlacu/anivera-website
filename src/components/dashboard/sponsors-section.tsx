'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Kept as parts so the full address never sits in the page markup.
// Open slots are placeholders only; a partner's logo is added to the page by us.
const EMAIL_USER = 'contact';
const EMAIL_DOMAIN = 'anivera.xyz';
const EMAIL_DISPLAY = 'contact at anivera dot xyz';
const OPEN_SLOTS = 2;

export default function SponsorsSection() {
  const { t } = useLanguage();

  const openMail = () => {
    const subject = encodeURIComponent('Sponsoring ANIVERA');
    window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}?subject=${subject}`;
  };

  return (
    <section id="sponsors" className="scroll-mt-20 bg-white border-t border-anivera-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">{t.sponsors.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anivera-ink">{t.sponsors.title}</h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-anivera-body">{t.sponsors.intro}</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <motion.article
            className="col-span-2 flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-anivera-line bg-white p-5 sm:p-6 shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://aws.amazon.com/startups/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-24 w-full sm:w-40 shrink-0 items-center justify-center rounded-xl bg-anivera-bg px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
            >
              <img src="/sponsors/aws.svg" alt="Amazon Web Services" className="h-12 w-auto" />
            </a>
            <div>
              <span className="inline-flex rounded-full bg-anivera-aiSoft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-anivera-ai">
                {t.sponsors.awsBadge}
              </span>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-anivera-ink">{t.sponsors.awsTitle}</h3>
              <p className="mt-1 text-sm sm:text-base leading-relaxed text-anivera-body">{t.sponsors.awsText}</p>
            </div>
          </motion.article>

          {Array.from({ length: OPEN_SLOTS }, (_, i) => (
            <motion.div
              key={i}
              className="flex min-h-[9rem] items-center justify-center rounded-2xl border-2 border-dashed border-anivera-teal/35 bg-anivera-bg px-4 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-anivera-muted">{t.sponsors.slotLabel}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-3xl bg-anivera-ink px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">{t.sponsors.ctaTitle}</h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-anivera-onDark">{t.sponsors.ctaText}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="rounded-xl bg-white/10 px-4 py-3 text-sm sm:text-base text-white">
              <span className="mr-2 text-anivera-onDark">{t.contactUs.emailLabel}:</span>
              <span className="font-semibold">{EMAIL_DISPLAY}</span>
            </p>
            <button
              type="button"
              onClick={openMail}
              className="inline-flex items-center justify-center rounded-xl bg-anivera-aiSoft px-6 py-3 text-sm font-semibold text-anivera-ai hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.sponsors.emailCta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
