'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AgentCard, Bar, CASE_KEYS, CaseKey, Game, Row, RowStatus, Step, getPresentation } from './content';

// Slides per case (Penpot page "13 How it works"): intro, one slide per step, questions, thank you.

const CASE_IMAGES: Record<CaseKey, string> = {
  users: '/entities/owners.png',
  vets: '/entities/vets.png',
  shelters: '/entities/shelters.png',
};

const STATUS_STYLES: Record<Exclude<RowStatus, 'user'>, { row: string; tag: string }> = {
  ok: { row: 'bg-anivera-bg', tag: 'bg-[#DDF0F3] text-[#0F758A]' },
  ai: { row: 'bg-[#F7F5FE] border border-[#DCD4FA]', tag: 'bg-anivera-aiSoft text-anivera-ai' },
  warn: { row: 'bg-anivera-bg', tag: 'bg-[#FBEFD9] text-[#9A5B00]' },
};

type Answer = number | number[] | null;
const emptyAnswers = () => Array<Answer>(10).fill(null);

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, transition: { duration: 0.25, ease: 'easeIn' } }),
};

const listVariants = { show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const itemVariants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

function UniversePanel({ image, agents }: { image: string; agents: string[] }) {
  const chipPositions = ['left-[6%] top-[10%]', 'right-[6%] top-[22%]', 'left-[4%] bottom-[22%]', 'right-[10%] bottom-[12%]'];
  return (
    <div className="universe-panel">
      <motion.div
        className="absolute left-1/2 top-1/2 w-[68%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-anivera-teal/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute left-1/2 top-1/2 w-[44%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-anivera-ai/30" />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[31%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_16px_40px_-12px_rgba(12,74,69,0.35)] flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={image} alt="" className="w-[78%] h-[78%] object-contain rounded-full" />
      </motion.div>
      {agents.map((agent, i) => (
        <motion.span
          key={agent}
          className={`absolute ${chipPositions[i]} rounded-full bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-anivera-ink shadow-[0_6px_18px_-6px_rgba(12,74,69,0.35)]`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ opacity: { delay: 0.4 + i * 0.15 }, scale: { delay: 0.4 + i * 0.15 }, y: { duration: 3, repeat: Infinity, delay: i * 0.4 } }}
        >
          <span className="mr-1.5 text-anivera-ai">●</span>
          {agent}
        </motion.span>
      ))}
    </div>
  );
}

function RowList({ rows, status }: { rows: Row[]; status: Record<RowStatus, string> }) {
  const chat = rows.some(([, , s]) => s === 'user');
  return (
    <motion.ul className="space-y-3" variants={listVariants} initial="hidden" animate="show">
      {rows.map(([label, value, s]) =>
        chat ? (
          <motion.li
            key={label + value}
            variants={itemVariants}
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${s === 'user' ? 'ml-auto bg-anivera-ink text-white' : 'bg-anivera-aiSoft text-anivera-deep'}`}
          >
            <p className={`text-xs font-semibold ${s === 'user' ? 'text-anivera-sea' : 'text-anivera-ai'}`}>{s === 'user' ? status.user : label}</p>
            <p className="mt-1 text-sm sm:text-base font-medium leading-snug">{value}</p>
          </motion.li>
        ) : (
          <motion.li
            key={label}
            variants={itemVariants}
            className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 ${STATUS_STYLES[s as Exclude<RowStatus, 'user'>].row}`}
          >
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-anivera-muted">{label}</p>
              <p className="text-sm sm:text-base font-semibold text-anivera-deep">{value}</p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[s as Exclude<RowStatus, 'user'>].tag}`}>
              {status[s]}
            </span>
          </motion.li>
        )
      )}
    </motion.ul>
  );
}

function AgentGrid({ agents }: { agents: AgentCard[] }) {
  return (
    <motion.ul className="grid gap-3 sm:grid-cols-2" variants={listVariants} initial="hidden" animate="show">
      {agents.map((agent) => (
        <motion.li key={agent.name} variants={itemVariants} className="rounded-2xl border border-[#DCD4FA] bg-[#F7F5FE] p-4">
          <div className="flex items-center gap-2">
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-anivera-ai"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <p className="font-semibold text-anivera-ink">{agent.name}</p>
          </div>
          <p className="mt-2 text-sm leading-snug text-anivera-body">{agent.job}</p>
          <p className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-anivera-ai">{agent.stat}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function StockChart({ bars, note, lowLabel }: { bars: Bar[]; note?: string; lowLabel: string }) {
  return (
    <div>
      <ul className="space-y-4">
        {bars.map((bar, i) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-anivera-deep">{bar.label}</span>
              <span className={`shrink-0 font-semibold ${bar.low ? 'text-[#9A5B00]' : 'text-anivera-body'}`}>
                {bar.value} / {bar.max} {bar.unit}
                {bar.low && <span className="ml-2 rounded-full bg-[#FBEFD9] px-2 py-0.5 text-xs">{lowLabel}</span>}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-anivera-soft">
              <motion.div
                className={`h-full rounded-full ${bar.low ? 'bg-[#C98A1B]' : 'bg-anivera-teal'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(bar.value / bar.max) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
              />
            </div>
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 rounded-2xl bg-[#F7F5FE] border border-[#DCD4FA] px-4 py-3 text-sm text-anivera-deep">✦ {note}</p>}
    </div>
  );
}

function VolunteerScore({ game }: { game: Game }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-2xl bg-anivera-ink p-4 text-white">
        <motion.div
          className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-white/10"
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.2 }}
        >
          <span className="text-xl font-bold leading-none">{game.score}</span>
          <span className="text-[10px] uppercase tracking-wider text-anivera-sea">{game.scoreLabel}</span>
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">🏅 {game.badge}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-anivera-sea"
              initial={{ width: 0 }}
              animate={{ width: `${game.progress * 100}%` }}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
          </div>
          <p className="mt-1.5 text-xs text-anivera-onDark">{game.next}</p>
        </div>
      </div>

      <motion.ul className="flex flex-wrap gap-2" variants={listVariants} initial="hidden" animate="show">
        {game.badges.map((badge) => (
          <motion.li
            key={badge.name}
            variants={itemVariants}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              badge.earned ? 'bg-anivera-aiSoft text-anivera-ai' : 'border border-dashed border-anivera-line text-anivera-muted'
            }`}
          >
            {badge.earned ? '★' : '☆'} {badge.name} · {badge.points}
          </motion.li>
        ))}
      </motion.ul>

      <div className="rounded-2xl bg-anivera-bg px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-anivera-muted">{game.tasksLabel}</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {game.tasks.map(([task, points]) => (
            <li key={task} className="flex justify-between gap-3 text-anivera-deep">
              <span>{task}</span>
              <span className="font-semibold text-[#0F758A]">{points}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#DCD4FA] bg-[#F7F5FE] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-anivera-deep">{game.feeLabel}</p>
          <p className="text-xs text-anivera-body">{game.feeNote}</p>
        </div>
        <p className="shrink-0 text-lg font-bold">
          <span className="mr-2 text-anivera-muted line-through">{game.feeFrom}</span>
          <motion.span
            className="text-anivera-ai"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 260 }}
          >
            {game.feeTo}
          </motion.span>
        </p>
      </div>
    </div>
  );
}

function AppPanel({ step, status, lowLabel }: { step: Step; status: Record<RowStatus, string>; lowLabel: string }) {
  return (
    <div className="w-full max-w-[584px] mx-auto rounded-[28px] border border-anivera-line bg-white p-5 sm:p-8 shadow-[0_24px_60px_-32px_rgba(12,74,69,0.35)]">
      <div className="mb-5 flex items-start justify-between gap-3 border-b border-anivera-line pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-anivera-ink">{step.panel}</h3>
        <span className="shrink-0 rounded-full bg-anivera-aiSoft px-3 py-1 text-xs font-semibold text-anivera-ai">✦ {step.agent}</span>
      </div>
      {step.rows && <RowList rows={step.rows} status={status} />}
      {step.agents && <AgentGrid agents={step.agents} />}
      {step.bars && <StockChart bars={step.bars} note={step.note} lowLabel={lowLabel} />}
      {step.game && <VolunteerScore game={step.game} />}
    </div>
  );
}

export default function HowItWorksFeature() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ui, cases } = getPresentation(language);

  const initialCase = searchParams.get('case') as CaseKey | null;
  const [caseKey, setCaseKey] = useState<CaseKey>(initialCase && CASE_KEYS.includes(initialCase) ? initialCase : 'users');
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [consent, setConsent] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>(emptyAnswers);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const content = cases[caseKey];
  const stepCount = content.steps.length;
  const QUESTIONS_SLIDE = stepCount + 1;
  const THANKS_SLIDE = stepCount + 2;
  const progressLabels = [
    ui.progressIntro,
    ...content.steps.map((_, i) => ui.progressStep.replace('{n}', String(i + 1))),
    ui.progressQuestions,
  ];

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next > QUESTIONS_SLIDE || next === slide) return;
      setDirection(next > slide ? 1 : -1);
      setSlide(next);
      if (window.scrollY > 120) window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [slide, QUESTIONS_SLIDE]
  );

  const selectCase = (key: CaseKey) => {
    setCaseKey(key);
    setDirection(1);
    setSlide(0);
    setAnswers(emptyAnswers());
    setOrganisation('');
    setError('');
    router.replace(`/how-it-works?case=${key}`, { scroll: false });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (slide >= QUESTIONS_SLIDE || ['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName)) return;
      if (e.key === 'ArrowRight') goTo(slide + 1);
      if (e.key === 'ArrowLeft') goTo(slide - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slide, goTo, QUESTIONS_SLIDE]);

  const pick = (qi: number, oi: number, multi?: boolean) => {
    setAnswers((prev) => {
      const next = [...prev];
      if (multi) {
        const current = Array.isArray(prev[qi]) ? (prev[qi] as number[]) : [];
        next[qi] = current.includes(oi) ? current.filter((x) => x !== oi) : [...current, oi];
      } else {
        next[qi] = oi;
      }
      return next;
    });
  };

  const isPicked = (qi: number, oi: number) => {
    const a = answers[qi];
    return Array.isArray(a) ? a.includes(oi) : a === oi;
  };

  const complete = answers.every((a) => (Array.isArray(a) ? a.length > 0 : a !== null));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !consent || !complete) {
      setError(ui.missing);
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/presentation-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseKey, name, email, organisation, consent, language, answers }),
      });
      if (!res.ok) throw new Error(await res.text());
      setDirection(1);
      setSlide(THANKS_SLIDE);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(ui.error);
    } finally {
      setSending(false);
    }
  };

  const nextCase = CASE_KEYS[(CASE_KEYS.indexOf(caseKey) + 1) % CASE_KEYS.length];

  return (
    <section className="bg-anivera-bg flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="ai-pill self-start">{ui.eyebrow}</p>
          <div role="tablist" className="flex flex-wrap gap-2">
            {CASE_KEYS.map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={key === caseKey}
                onClick={() => selectCase(key)}
                className={`rounded-full px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai ${
                  key === caseKey
                    ? 'bg-anivera-ink text-white font-semibold'
                    : 'bg-white text-anivera-ink font-medium border border-anivera-line hover:bg-anivera-soft'
                }`}
              >
                {cases[key].tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 sm:mt-10 min-h-[560px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${caseKey}-${slide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {slide === 0 && (
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <p className="eyebrow">{content.who}</p>
                    <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-anivera-ink leading-tight">{content.intro.title}</h1>
                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-anivera-body">{content.intro.body}</p>
                    <motion.ul className="mt-6 space-y-3" variants={listVariants} initial="hidden" animate="show">
                      {content.intro.bullets.map((b) => (
                        <motion.li key={b} variants={itemVariants} className="flex items-center gap-3 text-anivera-deep font-medium">
                          <span className="h-3 w-3 shrink-0 rounded-full bg-anivera-teal" />
                          {b}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                  <UniversePanel image={CASE_IMAGES[caseKey]} agents={ui.agents} />
                </div>
              )}

              {slide >= 1 && slide <= stepCount && (
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div className="relative">
                    <p className="ai-pill">
                      {ui.stepOf.replace('{n}', String(slide)).replace('{total}', String(stepCount))} · {content.steps[slide - 1].agent}
                    </p>
                    <h2 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-anivera-ink leading-tight">{content.steps[slide - 1].title}</h2>
                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-anivera-body">{content.steps[slide - 1].body}</p>
                    <p aria-hidden className="hidden lg:block mt-8 text-[140px] leading-none font-extrabold text-anivera-line select-none">
                      {String(slide).padStart(2, '0')}
                    </p>
                  </div>
                  <AppPanel step={content.steps[slide - 1]} status={ui.status} lowLabel={ui.lowStock} />
                </div>
              )}

              {slide === QUESTIONS_SLIDE && (
                <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
                  <div className="lg:sticky lg:top-24 self-start">
                    <p className="ai-pill">{ui.lastStep}</p>
                    <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-anivera-ink">{ui.qTitle}</h2>
                    <p className="mt-4 text-anivera-body leading-relaxed">{ui.qBody}</p>

                    <label className="mt-6 block text-sm font-semibold text-anivera-deep">
                      {ui.name} *
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={ui.namePh}
                        maxLength={120}
                        className="mt-2 w-full rounded-xl border border-[#5F8C87] bg-white px-4 py-3 font-normal text-anivera-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
                      />
                    </label>
                    <label className="mt-4 block text-sm font-semibold text-anivera-deep">
                      {ui.email}
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={ui.emailPh}
                        maxLength={200}
                        className="mt-2 w-full rounded-xl border border-[#5F8C87] bg-white px-4 py-3 font-normal text-anivera-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
                      />
                    </label>
                    {caseKey !== 'users' && (
                      <label className="mt-4 block text-sm font-semibold text-anivera-deep">
                        {ui.org[caseKey]}
                        <input
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          placeholder={ui.orgPh[caseKey]}
                          maxLength={200}
                          className="mt-2 w-full rounded-xl border border-[#5F8C87] bg-white px-4 py-3 font-normal text-anivera-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
                        />
                      </label>
                    )}
                    <label className="mt-5 flex items-start gap-3 text-sm text-anivera-body">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="checkbox checkbox-sm mt-0.5 border-[#5F8C87]"
                      />
                      {ui.consent}
                    </label>
                    {error && (
                      <p role="alert" className="mt-4 text-sm font-medium text-[#9B273A]">
                        {error}
                      </p>
                    )}
                  </div>

                  <ol className="grid gap-4 md:grid-cols-2">
                    {content.questions.map((question, qi) => (
                      <li key={question.q} className="rounded-2xl border border-anivera-line bg-white p-5">
                        <p className="text-xs font-semibold text-anivera-ai">
                          {ui.questionLabel} {qi + 1}
                        </p>
                        <p className="mt-1 font-semibold text-anivera-ink">{question.q}</p>
                        {(question.multi || question.options[0] === '1') && (
                          <p className="mt-1 text-xs text-anivera-muted">{question.multi ? ui.multiHint : ui.scaleHint}</p>
                        )}
                        <div className="mt-3 flex flex-wrap gap-2" role={question.multi ? 'group' : 'radiogroup'} aria-label={question.q}>
                          {question.options.map((option, oi) => (
                            <button
                              type="button"
                              key={option}
                              role={question.multi ? 'checkbox' : 'radio'}
                              aria-checked={isPicked(qi, oi)}
                              onClick={() => pick(qi, oi, question.multi)}
                              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai ${
                                isPicked(qi, oi) ? 'bg-anivera-ink text-white' : 'bg-anivera-bg text-anivera-deep hover:bg-anivera-line'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="lg:col-span-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => goTo(QUESTIONS_SLIDE - 1)}
                      className="rounded-xl border-[1.5px] border-anivera-ink bg-white px-6 py-3.5 text-sm font-semibold text-anivera-ink hover:bg-anivera-bg"
                    >
                      ← {ui.back}
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="rounded-xl bg-anivera-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-anivera-deep disabled:opacity-60"
                    >
                      {sending ? ui.sending : `${ui.submit} →`}
                    </button>
                  </div>
                </form>
              )}

              {slide === THANKS_SLIDE && (
                <div className="flex flex-col items-center text-center py-10">
                  <motion.div
                    className="flex h-28 w-28 items-center justify-center rounded-full bg-anivera-aiSoft text-5xl font-bold text-anivera-ai"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  >
                    ✓
                  </motion.div>
                  <h2 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight text-anivera-ink">
                    {ui.thanksTitle.replace('{name}', name.trim().split(/\s+/)[0])}
                  </h2>
                  <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-anivera-body">{ui.thanksBody}</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => selectCase(nextCase)}
                      className="rounded-xl border-[1.5px] border-anivera-ink bg-white px-6 py-3.5 text-sm font-semibold text-anivera-ink hover:bg-anivera-bg"
                    >
                      {ui.another}
                    </button>
                    <Link href="/" className="rounded-xl bg-anivera-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-anivera-deep">
                      {ui.home}
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {slide < QUESTIONS_SLIDE && (
          <div className="mt-10 border-t border-anivera-line pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <ol className="flex gap-2 overflow-x-auto">
              {progressLabels.map((label, i) => (
                <li key={label}>
                  <button onClick={() => goTo(i)} className="group w-10 sm:w-20 text-left" aria-current={i === slide ? 'step' : undefined}>
                    <span className={`block h-1.5 rounded-full ${i === slide ? 'bg-anivera-ai' : i < slide ? 'bg-anivera-teal' : 'bg-anivera-line group-hover:bg-anivera-sea'}`} />
                    <span className={`mt-2 block text-xs ${i === slide ? 'font-semibold text-anivera-ai' : 'text-anivera-muted'}`}>{label}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="flex gap-3 self-end sm:self-auto">
              {slide > 0 && (
                <button
                  onClick={() => goTo(slide - 1)}
                  className="rounded-xl border-[1.5px] border-anivera-ink bg-white px-6 py-3.5 text-sm font-semibold text-anivera-ink hover:bg-anivera-bg"
                >
                  ← {ui.back}
                </button>
              )}
              <button onClick={() => goTo(slide + 1)} className="rounded-xl bg-anivera-ink px-6 py-3.5 text-sm font-semibold text-white hover:bg-anivera-deep">
                {slide === 0 ? ui.start : slide === stepCount ? ui.toQuestions : ui.next} →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
