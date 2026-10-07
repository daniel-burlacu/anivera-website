'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

type Collaborator = {
  name: string;
  image: string;
  roleKey: 'shelterRole' | 'clinicRole';
  // Not every collaborator has a website; without one the card is not a link.
  website?: { url: string; label: string };
};

const COLLABORATORS: Collaborator[] = [
  {
    name: 'Protectora Modepran',
    image: '/colaborators/modepran.png',
    roleKey: 'shelterRole',
    website: { url: 'https://protectoramodepran.com/', label: 'protectoramodepran.com' },
  },
  {
    name: 'Clínica Veterinària Benifaió',
    image: '/colaborators/clinica_vet_benifaio.jpg',
    roleKey: 'clinicRole',
  },
];

export default function CollaboratorsSection() {
  const { t } = useLanguage();

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

        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
          {COLLABORATORS.map((collaborator, i) => {
            const image = (
              <img
                src={collaborator.image}
                alt={collaborator.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            );
            const imageBoxClass =
              'block h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-anivera-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai';

            return (
              <motion.article
                key={collaborator.name}
                className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-anivera-line bg-white p-5 sm:p-6 shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                {collaborator.website ? (
                  <a
                    href={collaborator.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className={imageBoxClass}
                  >
                    {image}
                  </a>
                ) : (
                  <div className={imageBoxClass}>{image}</div>
                )}
                <div>
                  <span className="inline-flex rounded-full bg-anivera-aiSoft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-anivera-ai">
                    {t.collaborators[collaborator.roleKey]}
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold text-anivera-ink">{collaborator.name}</h3>
                  {collaborator.website && (
                    <a
                      href={collaborator.website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm sm:text-base font-semibold text-anivera-ai hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
                    >
                      {collaborator.website.label}
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
