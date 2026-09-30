'use client';
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext';

type PhaseStatus = 'done' | 'current' | 'upcoming' | 'open';

// end 'open': the phase has no end date (fundraising stays open until its goal is reached).
function phaseStatus(start: string, end: string): PhaseStatus {
  if (end === 'open') return 'open';
  const now = Date.now();
  const startMs = new Date(`${start}T00:00:00`).getTime();
  const endMs = new Date(`${end}T23:59:59`).getTime();
  if (now > endMs) return 'done';
  if (now >= startMs) return 'current';
  return 'upcoming';
}

export const RoadMapProvider: React.FC = () => {
  const { t } = useLanguage();
  const roadmapSteps: {
    title: string;
    description: string;
    icon: string;
    start: string;
    end: string;
  }[] = [
    {
      title: t.roadmap.step1Title,
      description: t.roadmap.step1Description,
      icon: '🧪',
      start: '2024-07-09',
      end: '2025-01-12',
    },
    {
      title: t.roadmap.step2Title,
      description: t.roadmap.step2Description,
      icon: '💼',
      start: '2025-01-12',
      end: 'open',
    },
    {
      title: t.roadmap.step3Title,
      description: t.roadmap.step3Description,
      icon: '🚀',
      start: '2026-10-01',
      end: '2026-12-31',
    },
    {
      title: t.roadmap.step4Title,
      description: t.roadmap.step4Description,
      icon: '🤝',
      start: '2027-01-01',
      end: '2027-07-31',
    },
    {
      title: t.roadmap.step5Title,
      description: t.roadmap.step5Description,
      icon: '🌐',
      start: '2027-08-01',
      end: '2027-12-31',
    },
  ];

  const statusLabel: Record<PhaseStatus, string> = {
    done: t.roadmap.statusComplete,
    current: t.roadmap.statusCurrent,
    upcoming: t.roadmap.statusUpcoming,
    open: t.roadmap.statusOpen,
  };

  return (
    <div className="bg-anivera-bg flex flex-1 flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-anivera-ink mb-3 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {t.roadmap.title}
      </motion.h1>
      <motion.p
        className="text-anivera-body text-sm sm:text-base md:text-lg max-w-3xl text-center mb-8 sm:mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {t.roadmap.intro}
      </motion.p>

      <div className="w-full max-w-4xl px-1 sm:px-4 relative">
        <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-px bg-anivera-line" aria-hidden="true" />
        {roadmapSteps.map((step, index) => {
          const status = phaseStatus(step.start, step.end);
          return (
            <motion.div
              key={step.title}
              className="relative bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 mb-4 sm:mb-6 sm:ml-10"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span className="hidden sm:flex absolute -left-10 top-6 h-7 w-7 items-center justify-center rounded-full bg-anivera-ink text-white text-xs font-bold ring-4 ring-anivera-bg">
                {index + 1}
              </span>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="text-3xl" aria-hidden="true">{step.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="sm:hidden text-xs font-bold text-anivera-ink">
                      {index + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        status === 'done'
                          ? 'bg-anivera-line text-anivera-ink'
                          : status === 'current' || status === 'open'
                            ? 'bg-anivera-aiSoft text-anivera-ai'
                            : 'bg-anivera-soft text-anivera-body'
                      }`}
                    >
                      {statusLabel[status]}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-semibold text-anivera-ink mb-2">
                    {step.title}
                  </h2>
                  <p className="text-sm sm:text-base text-anivera-body leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
