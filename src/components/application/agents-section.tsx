"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { agentsContent, type AgentCopy, type BackgroundAgentCopy } from "./agents-content";

// Blueprint IDs (section 4) and icons, in the same order as the copy arrays in agents-content.ts.
const CARE_META = [
  { id: "A02", icon: "🩺" },
  { id: "A06", icon: "💚" },
  { id: "A07", icon: "🥗" },
  { id: "A08", icon: "🎓" },
] as const;
const ORG_META = [
  { id: "A10", icon: "🗓️" },
  { id: "A11", icon: "📦" },
  { id: "A12", icon: "📒" },
] as const;
const BEHIND_META = [
  { id: "A03", icon: "🚦" },
  { id: "A04", icon: "📋" },
  { id: "A05", icon: "📡" },
  { id: "A15", icon: "🛂" },
  { id: "A09", icon: "💬" },
  { id: "A13", icon: "🏷️" },
  { id: "A14", icon: "📣" },
] as const;

// Agents involved in each step of the "one animal, five hand-offs" story (blueprint section 12).
const FLOW_AGENTS: string[][] = [["A10"], ["A03"], ["A02"], ["A04", "A10"], ["A12"]];

const ACCENT = {
  care: { solid: "#2F8A84", glow: "rgba(47, 138, 132, 0.14)" },
  org: { solid: "#5B3FD1", glow: "rgba(91, 63, 209, 0.12)" },
  behind: { solid: "#6B8380", glow: "rgba(107, 131, 128, 0.12)" },
} as const;
type Dept = keyof typeof ACCENT;

const EASE = [0.22, 1, 0.36, 1] as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Slow drifting colour fields behind the whole section.
function Aurora() {
  const reduce = useReducedMotion();
  const blobs = [
    { cls: "-top-24 -left-20 w-[26rem] h-[26rem] bg-[#2F8A84]/15", x: [0, 70, -20, 0], y: [0, 40, 80, 0], d: 22 },
    { cls: "top-1/3 -right-24 w-[30rem] h-[30rem] bg-[#5B3FD1]/10", x: [0, -60, 20, 0], y: [0, 70, -30, 0], d: 26 },
    { cls: "-bottom-32 left-1/4 w-[28rem] h-[28rem] bg-[#9FD9D1]/45", x: [0, 50, -40, 0], y: [0, -50, 20, 0], d: 30 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.cls}`}
          animate={reduce ? undefined : { x: blob.x, y: blob.y, scale: [1, 1.12, 0.94, 1] }}
          transition={{ duration: blob.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(12,74,69,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 85%)",
        }}
      />
    </div>
  );
}

function AgentCard({
  agent,
  id,
  icon,
  dept,
  index,
  reviewedBy,
  idLabel,
}: {
  agent: AgentCopy;
  id: string;
  icon: string;
  dept: Dept;
  index: number;
  reviewedBy: string;
  idLabel: string;
}) {
  const reduce = useReducedMotion();
  const accent = ACCENT[dept];
  const px = useMotionValue(-400);
  const py = useMotionValue(-400);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(ny, [0, 1], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(nx, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${px}px ${py}px, ${accent.glow}, transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${px}px ${py}px, ${accent.solid}, transparent 70%)`;

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(event.clientX - rect.left);
    py.set(event.clientY - rect.top);
    nx.set((event.clientX - rect.left) / rect.width);
    ny.set((event.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(-400);
    py.set(-400);
    nx.set(0.5);
    ny.set(0.5);
  };

  return (
    <motion.article
      className="group relative rounded-3xl p-px h-full"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* Cursor-following light on the card edge */}
      <motion.div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: edge }} aria-hidden="true" />
      <div className="relative h-full rounded-[1.4rem] bg-white border border-anivera-line shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-5 sm:p-7 overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} aria-hidden="true" />

        <div className="relative flex items-start justify-between gap-4 mb-5">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border border-anivera-line"
            style={{ background: `linear-gradient(135deg, ${accent.glow}, rgba(255,255,255,0.9))`, boxShadow: `0 10px 30px -12px ${accent.solid}` }}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
            aria-hidden="true"
          >
            {icon}
          </motion.div>
          <span
            className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase rounded-full px-3 py-1 border"
            style={{ color: accent.solid, borderColor: `${accent.solid}55`, background: `${accent.solid}12` }}
          >
            <span className="sr-only">{idLabel} </span>
            {id}
          </span>
        </div>

        <h4 className="relative text-xl sm:text-2xl font-semibold text-anivera-ink leading-tight">{agent.name}</h4>
        <p className="relative text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold mt-1 mb-3" style={{ color: accent.solid }}>
          {agent.role}
        </p>
        <p className="relative text-sm sm:text-base text-anivera-body leading-relaxed mb-5">{agent.description}</p>

        <ul className="relative space-y-2 mb-6 text-sm text-anivera-body">
          {agent.does.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span style={{ color: accent.solid }}>
                <CheckIcon />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-auto pt-4 border-t border-anivera-line flex items-center gap-2 text-xs sm:text-sm text-anivera-body">
          <span style={{ color: accent.solid }}>
            <ShieldIcon />
          </span>
          <span>
            {reviewedBy}: <strong className="text-anivera-ink font-semibold">{agent.reviewer}</strong>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function BackgroundCard({ agent, id, icon, idLabel }: { agent: BackgroundAgentCopy; id: string; icon: string; idLabel: string }) {
  const accent = ACCENT.behind;
  return (
    <div className="w-[17.5rem] sm:w-[20rem] shrink-0 rounded-2xl border border-anivera-line bg-white shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-5 hover:border-anivera-teal/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <span className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase" style={{ color: accent.solid }}>
          <span className="sr-only">{idLabel} </span>
          {id} · {agent.role}
        </span>
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-anivera-ink mb-1.5">{agent.name}</h4>
      <p className="text-sm text-anivera-body leading-relaxed">{agent.text}</p>
    </div>
  );
}

// Endless drifting row that slows to a stop on hover; a static wrapped grid under reduced motion.
function BehindTheScenes({ agents, idLabel }: { agents: BackgroundAgentCopy[]; idLabel: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const speed = useRef(1);
  const target = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    speed.current += (target.current - speed.current) * 0.08;
    const half = trackRef.current.scrollWidth / 2;
    let next = x.get() - delta * 0.035 * speed.current;
    if (next <= -half) next += half;
    x.set(next);
  });

  const cards = agents.map((agent, i) => <BackgroundCard key={agent.name} agent={agent} id={BEHIND_META[i].id} icon={BEHIND_META[i].icon} idLabel={idLabel} />);

  if (reduce) {
    return <div className="flex flex-wrap justify-center gap-4">{cards}</div>;
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
      }}
      onPointerEnter={() => (target.current = 0)}
      onPointerLeave={() => (target.current = 1)}
    >
      <motion.div ref={trackRef} className="flex gap-4 w-max py-1" style={{ x }}>
        {cards}
        <div className="flex gap-4" aria-hidden="true">
          {agents.map((agent, i) => (
            <BackgroundCard key={`dup-${agent.name}`} agent={agent} id={BEHIND_META[i].id} icon={BEHIND_META[i].icon} idLabel="" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function DeptHeader({ dept, name, tagline, count }: { dept: Dept; name: string; tagline: string; count?: number }) {
  const accent = ACCENT[dept];
  return (
    <motion.div
      className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="flex items-center justify-center gap-3 mb-3">
        <motion.span
          className="h-px w-10 sm:w-16 origin-right"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.solid})` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-anivera-ink">{name}</h3>
        {count ? (
          <span className="text-xs font-semibold rounded-full px-2.5 py-1 border" style={{ color: accent.solid, borderColor: `${accent.solid}55` }}>
            {count}
          </span>
        ) : null}
        <motion.span
          className="h-px w-10 sm:w-16 origin-left"
          style={{ background: `linear-gradient(90deg, ${accent.solid}, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />
      </div>
      <p className="text-sm sm:text-base text-anivera-body leading-relaxed">{tagline}</p>
    </motion.div>
  );
}

export default function AgentsSection() {
  const { language } = useLanguage();
  const copy = agentsContent[language];
  const reduce = useReducedMotion();

  const nameById: Record<string, string> = {};
  copy.care.forEach((a, i) => (nameById[CARE_META[i].id] = a.name));
  copy.org.forEach((a, i) => (nameById[ORG_META[i].id] = a.name));
  copy.behind.forEach((a, i) => (nameById[BEHIND_META[i].id] = a.name));
  const deptById: Record<string, Dept> = {};
  CARE_META.forEach((m) => (deptById[m.id] = "care"));
  ORG_META.forEach((m) => (deptById[m.id] = "org"));
  BEHIND_META.forEach((m) => (deptById[m.id] = "behind"));

  const stats = [
    { to: 14, suffix: "" },
    { to: 3, suffix: "" },
    { to: 1, suffix: "" },
    { to: 100, suffix: "%" },
  ];

  return (
    <section
      aria-labelledby="agents-title"
      className="relative w-full max-w-6xl mb-12 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white via-anivera-mint/50 to-anivera-bg border border-anivera-line shadow-[0_24px_60px_-32px_rgba(12,74,69,0.35)]"
    >
      <Aurora />

      <div className="relative px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-anivera-line bg-white px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-anivera-teal"
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="relative flex h-2 w-2">
              {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-anivera-teal opacity-60" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-anivera-teal" />
            </span>
            {copy.eyebrow}
          </motion.span>

          <motion.h2
            id="agents-title"
            className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] bg-gradient-to-r from-anivera-ink via-anivera-teal to-anivera-ai bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%" }}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {copy.title}
          </motion.h2>

          <motion.p
            className="mt-5 text-base sm:text-lg text-anivera-body leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {copy.subtitle}
          </motion.p>

          <motion.p
            className="mt-6 inline-block rounded-2xl border border-[#5B3FD1]/25 bg-anivera-aiSoft px-5 py-2.5 text-base sm:text-lg font-semibold text-anivera-ai"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            ✨ {copy.principle}
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={copy.stats[i]}
              className="rounded-2xl border border-anivera-line bg-white shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] px-4 py-5 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={reduce ? undefined : { y: -4, borderColor: "rgba(47,138,132,0.5)" }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-anivera-ink tabular-nums">
                <Counter to={stat.to} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-anivera-muted">{copy.stats[i]}</div>
            </motion.div>
          ))}
        </div>

        {/* Care department */}
        <DeptHeader dept="care" name={copy.depts.care.name} tagline={copy.depts.care.tagline} count={copy.care.length} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {copy.care.map((agent, i) => (
            <AgentCard key={CARE_META[i].id} agent={agent} id={CARE_META[i].id} icon={CARE_META[i].icon} dept="care" index={i} reviewedBy={copy.reviewedBy} idLabel={copy.idLabel} />
          ))}
        </div>

        {/* Organisation department */}
        <DeptHeader dept="org" name={copy.depts.org.name} tagline={copy.depts.org.tagline} count={copy.org.length} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {copy.org.map((agent, i) => (
            <AgentCard key={ORG_META[i].id} agent={agent} id={ORG_META[i].id} icon={ORG_META[i].icon} dept="org" index={i} reviewedBy={copy.reviewedBy} idLabel={copy.idLabel} />
          ))}
        </div>

        {/* Behind the scenes */}
        <DeptHeader dept="behind" name={copy.depts.behind.name} tagline={copy.depts.behind.tagline} count={copy.behind.length} />
        <div className="-mx-4 sm:-mx-8 lg:-mx-12 mb-16 sm:mb-20">
          <BehindTheScenes agents={copy.behind} idLabel={copy.idLabel} />
        </div>

        {/* Hand-off story */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-anivera-ink mb-3">{copy.flow.title}</h3>
          <p className="text-sm sm:text-base text-anivera-body leading-relaxed">{copy.flow.subtitle}</p>
        </motion.div>

        <ol className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 mb-16 sm:mb-20">
          <motion.span
            className="absolute left-5 top-5 bottom-5 w-px origin-top lg:hidden"
            style={{ background: "linear-gradient(180deg, #2F8A84, #5B3FD1)" }}
            initial={{ scaleY: reduce ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.span
            className="hidden lg:block absolute left-5 right-5 top-5 h-px origin-left"
            style={{ background: "linear-gradient(90deg, #2F8A84, #5B3FD1 80%, transparent)" }}
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            aria-hidden="true"
          />
          {copy.flow.steps.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative pl-14 lg:pl-0 lg:pt-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.3, ease: EASE }}
            >
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-anivera-teal bg-white text-sm font-bold text-anivera-ink shadow-[0_0_0_6px_rgba(47,138,132,0.10)]">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-anivera-teal"
                    animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                )}
                {i + 1}
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-anivera-ink mb-2">{step.title}</h4>
              <p className="text-sm text-anivera-body leading-relaxed mb-3">{step.text}</p>
              <div className="flex flex-wrap gap-1.5">
                {FLOW_AGENTS[i].map((id) => (
                  <span
                    key={id}
                    className="rounded-full px-2.5 py-1 text-[0.7rem] font-semibold border"
                    style={{ color: ACCENT[deptById[id]].solid, borderColor: `${ACCENT[deptById[id]].solid}55`, background: `${ACCENT[deptById[id]].solid}14` }}
                  >
                    {id} · {nameById[id]}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Guardrails */}
        <motion.h3
          className="text-2xl sm:text-3xl font-bold tracking-tight text-anivera-ink text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {copy.guard.title}
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {copy.guard.items.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-anivera-line bg-white shadow-[0_12px_32px_-24px_rgba(12,74,69,0.45)] p-5 sm:p-6"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              whileHover={reduce ? undefined : { y: -6, borderColor: "rgba(91,63,209,0.45)" }}
            >
              <div className="mb-3 text-anivera-ai">
                <ShieldIcon />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-anivera-ink mb-2">{item.title}</h4>
              <p className="text-sm text-anivera-body leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
