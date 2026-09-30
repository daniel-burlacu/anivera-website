'use client';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const ProjectDescriptionProvider: React.FC = () => {
  const { t } = useLanguage();
  const projectSections = [
    {
      title: (<Typography variant="h4" gutterBottom sx={{  fontWeight: "bold" }}>{t.project.overview}</Typography>),
      description:
        (<><Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          {t.project.overviewText1}
        </Typography>

          <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t.project.overviewText2}
          </Typography>

          <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t.project.overviewText3}
          </Typography></>),
      icon: '🌍',
    },
    {
      title: (<Typography variant="h4" gutterBottom sx={{  fontWeight: "bold" }}>{t.project.problemStatement}</Typography>),
      description:
        (
          <>
            <Typography paragraph>
              {t.project.problemText1}
            </Typography>
            <ul style={{ marginLeft: "1.2rem", marginBottom: "1rem" }}>
              <li>{t.project.problemBullet1}</li>
              <li>{t.project.problemBullet2}</li>
              <li>{t.project.problemBullet3}</li>
            </ul>
            <Typography paragraph>
              {t.project.problemText2}
            </Typography>
            <Typography>
              {t.project.problemText3}
            </Typography>
          </>
        ),
      icon: '⚠️',
    },
    {
      title: (<Typography variant="h4" gutterBottom sx={{fontWeight: "bold" }}>{t.project.ourSolution}</Typography>),
      description:
        (<><Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          {t.project.solutionText1}
        </Typography>

          <Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t.project.solutionText2}
          </Typography></>),
      icon: '💡',
    },
    {
      title: (<Typography variant="h4" gutterBottom sx={{fontWeight: "bold" }}>{t.project.ourValues}</Typography>),
      description:
        (<Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          <ul style={{ marginLeft: "1.2rem", marginBottom: "1rem" }}>
            <li>- <strong>{t.project.privacyFirst}</strong> {t.project.privacyFirstText}</li>
            <li>- <strong>{t.project.transparency}</strong> {t.project.transparencyText}</li>
            <li>- <strong>{t.project.openCollaboration}</strong> {t.project.openCollaborationText}</li>
            <li>- <strong>{t.project.innovation}</strong> {t.project.innovationText}</li>
            <li>- <strong>{t.project.animalWelfare}</strong> {t.project.animalWelfareText}</li>
          </ul>
          </Typography>),
      icon: '❤️',
    },
    {
      title: (<Typography variant="h4" gutterBottom sx={{fontWeight: "bold" }}>{t.project.keyFeatures}</Typography>),
      description:
        (<Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          <ul style={{ marginLeft: "1.2rem", marginBottom: "1rem" }}>
          <li>- {t.project.feature1}</li>
          <li>- {t.project.feature2}</li>
          <li>- {t.project.feature3}</li>
          <li>- {t.project.feature4}</li>
          </ul>
          </Typography>),
      icon: '🔑',
    },
    {
      title: (<Typography variant="h4" gutterBottom sx={{fontWeight: "bold" }}>{t.project.futureVision}</Typography>),
      description:
         (<Typography paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          {t.project.futureVisionText}</Typography>),
      icon: '🚀',
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
          {t.general.ourMission}
        </motion.h1>

        <div className="w-full max-w-4xl px-2 sm:px-4">
          {projectSections.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="text-3xl sm:text-4xl">{step.icon}</div>
              <div className="flex-1">
                {step.title}
                <p className="text-sm sm:text-base text-anivera-body whitespace-pre-line">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
