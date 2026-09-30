"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import bedrockLogo from "../../../public/bedrock.png";

function AgentGrid({
  agents,
}: {
  agents: { icon: string; title: string; subtitle: string; description: string }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {agents.map((agent, index) => (
        <motion.article
          key={agent.title}
          className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <div className="text-3xl mb-2" aria-hidden="true">{agent.icon}</div>
          <h3 className="text-lg sm:text-xl font-semibold text-anivera-ink">{agent.title}</h3>
          <p className="text-xs sm:text-sm uppercase tracking-wider text-anivera-ai font-semibold mt-1 mb-2">
            {agent.subtitle}
          </p>
          <p className="text-sm sm:text-base text-anivera-body leading-relaxed">{agent.description}</p>
        </motion.article>
      ))}
    </div>
  );
}

export default function InvestorPresentation() {
  const { t } = useLanguage();

  const careAgents = [
    {
      icon: "🩺",
      title: t.application.doctorTitle,
      subtitle: t.application.doctorSubtitle,
      description: t.application.doctorDescription,
    },
    {
      icon: "💚",
      title: t.application.wellbeingTitle,
      subtitle: t.application.wellbeingSubtitle,
      description: t.application.wellbeingDescription,
    },
    {
      icon: "🥗",
      title: t.application.nutritionistTitle,
      subtitle: t.application.nutritionistSubtitle,
      description: t.application.nutritionistDescription,
    },
    {
      icon: "🎓",
      title: t.application.trainerTitle,
      subtitle: t.application.trainerSubtitle,
      description: t.application.trainerDescription,
    },
    {
      icon: "💬",
      title: t.application.supportTitle,
      subtitle: t.application.supportSubtitle,
      description: t.application.supportDescription,
    },
  ];

  const departmentAgents = [
    {
      icon: "🗓️",
      title: t.application.frontDeskTitle,
      subtitle: t.application.frontDeskSubtitle,
      description: t.application.frontDeskDescription,
    },
    {
      icon: "📦",
      title: t.application.operationsTitle,
      subtitle: t.application.operationsSubtitle,
      description: t.application.operationsDescription,
    },
    {
      icon: "📒",
      title: t.application.accountingTitle,
      subtitle: t.application.accountingSubtitle,
      description: t.application.accountingDescription,
    },
  ];

  const business = [
    { icon: "🐾", title: t.application.clinicsTitle, text: t.application.clinicsText },
    { icon: "🏥", title: t.application.pharmaTitle, text: t.application.pharmaText },
    { icon: "📣", title: t.application.campaignsTitle, text: t.application.campaignsText },
  ];

  return (
    <div className="bg-anivera-bg flex flex-1 flex-col items-center py-6 sm:py-10 px-4 sm:px-6">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-anivera-ink mb-3 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {t.general.brandName}
      </motion.h1>
      <motion.p
        className="text-anivera-body text-sm sm:text-base md:text-lg max-w-3xl text-center mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {t.application.subtitle}
      </motion.p>

      <a
        href="https://develop.d1ir61rx2rh3k4.amplifyapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 inline-flex items-center justify-center bg-anivera-ink text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-anivera-deep transition-colors text-sm sm:text-base"
      >
        {t.application.viewDemo}
      </a>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <a
          href="https://aws.amazon.com/bedrock/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 flex items-center gap-4"
        >
          <img src={bedrockLogo.src} alt="AWS Bedrock" className="w-12 h-12 object-contain shrink-0" />
          <span>
            <span className="block text-base sm:text-lg font-semibold text-anivera-ink">{t.general.bedrockTitle}</span>
            <span className="block text-sm text-anivera-body mt-1">{t.general.bedrockText}</span>
          </span>
        </a>
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 flex items-center gap-4"
        >
          <span className="text-3xl shrink-0" aria-hidden="true">🎙️</span>
          <span>
            <span className="block text-base sm:text-lg font-semibold text-anivera-ink">{t.general.openaiTitle}</span>
            <span className="block text-sm text-anivera-body mt-1">{t.general.openaiText}</span>
          </span>
        </a>
      </div>

      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-anivera-ink text-center mb-2">
          {t.application.aiAgentsTitle}
        </h2>
        <p className="text-anivera-body text-center text-sm sm:text-base mb-8 max-w-3xl mx-auto">
          {t.application.aiAgentsSubtitle}
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold text-anivera-ink text-center mb-2">
          {t.application.careTitle}
        </h3>
        <p className="text-anivera-body text-center text-sm sm:text-base mb-4 max-w-3xl mx-auto">
          {t.application.careSubtitle}
        </p>
        <AgentGrid agents={careAgents} />

        <h3 className="text-xl sm:text-2xl font-semibold text-anivera-ink text-center mt-8 mb-2">
          {t.application.departmentTitle}
        </h3>
        <p className="text-anivera-body text-center text-sm sm:text-base mb-4 max-w-3xl mx-auto">
          {t.application.departmentSubtitle}
        </p>
        <AgentGrid agents={departmentAgents} />
      </div>

      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-anivera-ink text-center mb-6">
          {t.application.businessModel}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {business.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 text-center">
              <div className="text-3xl mb-2" aria-hidden="true">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-anivera-ink mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-anivera-body">{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <article className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-anivera-ink mb-3">Market & Revenue</h2>
          <ul className="text-sm sm:text-base text-anivera-body space-y-2">
            <li><strong className="text-anivera-ink">Global Pet Care:</strong> $246B</li>
            <li><strong className="text-anivera-ink">Animal Health Pharma:</strong> $42B</li>
            <li><strong className="text-anivera-ink">Insurance Market:</strong> $9.3B → $30B by 2033</li>
          </ul>
        </article>
        <article className="bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-anivera-ink mb-3">Projections</h2>
          <ul className="text-sm sm:text-base text-anivera-body space-y-2 list-disc pl-5">
            <li><strong className="text-anivera-ink">Year 1:</strong> 500 clinics, 10 companies → €500K–€1M</li>
            <li><strong className="text-anivera-ink">Year 3:</strong> 5,000 clinics, 100+ companies → €5M+</li>
            <li><strong className="text-anivera-ink">Year 5:</strong> 25,000 clinics, 300+ companies → €20M+</li>
          </ul>
        </article>
      </div>

      <article className="w-full max-w-3xl bg-white rounded-2xl border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-anivera-ink mb-2">{t.application.joinJourney}</h2>
        <p className="text-sm sm:text-base text-anivera-body mb-4">{t.application.journeyDescription}</p>
        <a
          href="/contactus"
          className="inline-flex items-center justify-center bg-anivera-ink text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-anivera-deep transition-colors text-sm sm:text-base"
        >
          {t.application.contactUs}
        </a>
      </article>
    </div>
  );
}
