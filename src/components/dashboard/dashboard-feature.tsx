'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AniveraUniverse from './anivera-universe';
import SponsorsSection from './sponsors-section';
import CollaboratorsSection from './collaborators-section';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function DashboardFeature() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-anivera-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,584px)] lg:gap-12 lg:items-center">
          <div className="flex flex-col items-start text-left">
            <motion.p className="ai-pill mb-6" variants={fadeUp} initial="hidden" animate="show" custom={0}>
              {t.general.aiUniverseLabel}
            </motion.p>

            <motion.h1
              className="text-5xl sm:text-6xl font-bold tracking-tight text-anivera-ink"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              {t.general.brandName}
            </motion.h1>

            <motion.p
              className="mt-3 text-2xl sm:text-3xl font-bold leading-tight text-anivera-ai max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              {t.general.tagline}
            </motion.p>

            <motion.p
              className="mt-5 text-base sm:text-lg leading-relaxed text-anivera-body max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
            >
              {t.general.universeIntro}
            </motion.p>

            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
            >
              <Link
                href="#sponsors"
                className="inline-flex items-center justify-center rounded-xl bg-anivera-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-anivera-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai focus-visible:ring-offset-2"
              >
                {t.nav.sponsor}
              </Link>
              <Link
                href="/application"
                className="inline-flex items-center justify-center rounded-xl border-[1.5px] border-anivera-ink bg-white px-6 py-3.5 text-sm font-semibold text-anivera-ink hover:bg-anivera-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai focus-visible:ring-offset-2"
              >
                {t.sponsors.heroSecondary}
              </Link>
            </motion.div>
          </div>

          <AniveraUniverse />
        </div>
      </section>

      <SponsorsSection />
      <CollaboratorsSection />
    </>
  );
}
