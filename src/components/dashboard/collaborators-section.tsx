'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const EMAIL_USER = 'contact';
const EMAIL_DOMAIN = 'anivera.xyz';
const EMAIL_DISPLAY = 'contact at anivera dot xyz';

type Collaborator = {
  name: string;
  image: string;
  roleKey: 'shelterRole' | 'clinicRole' | 'insuranceRole';
  // A wordmark sits in the frame. A picture fills it so the name on the image stays visible.
  fit?: 'logo' | 'picture';
  // Not every collaborator has a website; without one the card is not a link.
  url?: string;
  discountCode?: string;
};

const COLLABORATORS: Collaborator[] = [
  {
    name: 'Clínica Veterinària Benifaió',
    image: '/colaborators/clinica_vet_benifaio.jpg',
    roleKey: 'clinicRole',
    fit: 'picture',
  },
  {
    name: 'Barkibu',
    image: '/colaborators/barkibu.png',
    roleKey: 'insuranceRole',
    fit: 'logo',
    url: 'https://www.barkibu.com/',
    discountCode: 'ANIVERA25',
  },
];

export default function CollaboratorsSection() {
  const { t } = useLanguage();

  const openMail = () => {
    const subject = encodeURIComponent('Collaborating with ANIVERA');
    window.location.href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}?subject=${subject}`;
  };

  return (
    <section id="collaborators" className="scroll-mt-20 bg-anivera-bg border-t border-anivera-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 sm:py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">{t.collaborators.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-anivera-ink">{t.collaborators.title}</h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-anivera-body">{t.collaborators.intro}</p>
        </motion.div>

        <div className="mt-10 grid items-stretch gap-5 sm:gap-6 md:grid-cols-2">
          {COLLABORATORS.map((collaborator, i) => {
            const logo = collaborator.fit === 'logo';
            const frameClass = logo
              ? 'relative block aspect-square shrink-0 overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#ffffff_0%,#E3F2F4_72%,#D3EBE6_100%)]'
              : 'relative block aspect-square shrink-0 overflow-hidden bg-white';
            const body = (
              <>
                <div className={frameClass}>
                  <img
                    src={collaborator.image}
                    alt=""
                    className={logo ? 'h-full w-full object-contain p-8' : 'h-full w-full object-contain'}
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-anivera-teal">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-anivera-teal" aria-hidden="true" />
                    {t.collaborators[collaborator.roleKey]}
                  </p>
                  <h3 className="mt-3 min-h-[3.25rem] text-xl font-semibold leading-snug tracking-tight text-anivera-ink">
                    {collaborator.name}
                  </h3>
                  {collaborator.discountCode && (
                    <div className="mt-auto border-t border-anivera-line pt-4">
                      <div className="flex items-center justify-between gap-3 rounded-2xl bg-anivera-mint px-3.5 py-3 ring-1 ring-anivera-sea/70">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-anivera-teal">
                          {t.collaborators.discountLabel}
                        </span>
                        <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-sm font-bold tracking-[0.14em] text-anivera-ink shadow-[0_1px_0_rgba(12,74,69,0.06)]">
                          {collaborator.discountCode}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
            const shellClass = collaborator.url
              ? 'flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-anivera-ai'
              : 'flex h-full flex-col';

            return (
              <motion.article
                key={collaborator.name}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-anivera-line bg-white shadow-[0_18px_40px_-28px_rgba(12,74,69,0.55)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                {collaborator.url ? (
                  <a href={collaborator.url} target="_blank" rel="noopener noreferrer" className={shellClass}>
                    {body}
                  </a>
                ) : (
                  <div className={shellClass}>{body}</div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Call for new collaborators with 1-year free tier */}
        <motion.div
          className="mt-10 overflow-hidden rounded-3xl border border-anivera-teal/20 bg-gradient-to-br from-white via-anivera-mint/40 to-white p-7 sm:p-10 shadow-[0_20px_48px_-28px_rgba(12,74,69,0.35)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-anivera-teal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-anivera-teal">
                <span className="h-2 w-2 rounded-full bg-anivera-teal" aria-hidden="true" />
                {t.collaborators.ctaEyebrow}
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-anivera-ink">
                {t.collaborators.ctaTitle}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-anivera-body">
                {t.collaborators.ctaText}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 font-mono text-xs sm:text-sm font-semibold tracking-wide text-anivera-ink ring-1 ring-anivera-teal/25 shadow-sm">
                <span className="text-anivera-teal" aria-hidden="true">★</span>
                {t.collaborators.ctaPerksBadge}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col shrink-0 gap-3">
              <p className="rounded-xl bg-white px-4 py-3 text-xs sm:text-sm text-anivera-ink ring-1 ring-anivera-line shadow-sm">
                <span className="mr-2 text-anivera-muted">{t.contactUs.emailLabel}:</span>
                <span className="font-semibold">{EMAIL_DISPLAY}</span>
              </p>
              <button
                type="button"
                onClick={openMail}
                className="inline-flex items-center justify-center rounded-xl bg-anivera-teal px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-anivera-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-teal"
              >
                {t.collaborators.ctaEmailButton}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
