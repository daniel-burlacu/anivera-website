'use client';
import { motion } from "framer-motion";
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutUsProvider: React.FC = () => {
  const { t } = useLanguage();
  const projectSections = [
    {
      title: t.aboutUs.projectDescriptionTitle,
      description: t.aboutUs.projectDescriptionText,
      icon: '🌍',
    },
    {
      title: t.aboutUs.visionariesTitle,
      description: t.aboutUs.visionariesDescription,
      icon: '👥',
      teamMembers: [
        {
          name: 'Ioana Irina',
          link: 'https://www.linkedin.com/in/ioanairina/',
          description: t.aboutUs.ioanaDescription,
        },
        {
          name: 'Daniel Burlacu',
          link: 'https://www.linkedin.com/in/daniel-burlacu-3879a689/',
          description: t.aboutUs.danielDescription,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-anivera-bg flex flex-1 flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-anivera-ink mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t.aboutUs.title}
        </motion.h1>

        <div className="w-full max-w-4xl px-2 sm:px-4">
          {projectSections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="text-3xl sm:text-4xl">{section.icon}</div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-semibold text-anivera-ink mb-2">{section.title}</h2>
                {section.description && (
                  <p className="text-sm sm:text-base text-anivera-body whitespace-pre-line">{section.description}</p>
                )}
                {section.teamMembers && (
                  <ul className="mt-4 space-y-2">
                    {section.teamMembers.map((member, idx) => (
                      <li key={idx}>
                        <a
                          href={member.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-anivera-ai hover:underline font-semibold text-sm sm:text-base"
                        >
                          {member.name}
                        </a>
                        <p className="text-sm sm:text-base text-anivera-body">{member.description}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
