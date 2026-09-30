'use client';

// Spinning "AI universe" from Penpot page 01 Home (see its "Motion & accessibility notes" board).
// One animation-frame loop drives both orbits, the spokes and the pulses; hover, pause and
// prefers-reduced-motion bring the time scale to 0.
import { AnimatePresence, motion, useAnimationFrame } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import logo from '../../../public/SAFLogo.png';
import { useLanguage } from '@/contexts/LanguageContext';

// Scene coordinates match the Penpot universe panel (584 × 600).
const W = 584;
const H = 600;
const CX = 292;
const CY = 300;
const ORBITS = {
  inner: { rx: 150, ry: 64, period: 60000, size: 84 },
  outer: { rx: 244, ry: 104, period: 96000, size: 80 },
};

type EntityKey =
  | 'entityShelters'
  | 'entityVets'
  | 'entityHospitals'
  | 'entityOwners'
  | 'entityPharma'
  | 'entityFood'
  | 'entityInsurance';

const ENTITIES: { src: string; key: EntityKey; orbit: keyof typeof ORBITS; start: number }[] = [
  { src: '/entities/vets.png', key: 'entityVets', orbit: 'inner', start: 0.85 },
  { src: '/entities/hospitals.png', key: 'entityHospitals', orbit: 'inner', start: 1.35 },
  { src: '/entities/shelters.png', key: 'entityShelters', orbit: 'inner', start: 1.85 },
  { src: '/entities/owners.png', key: 'entityOwners', orbit: 'inner', start: 0.35 },
  { src: '/entities/pharma.png', key: 'entityPharma', orbit: 'outer', start: 0.62 },
  { src: '/entities/food.png', key: 'entityFood', orbit: 'outer', start: 1.95 },
  { src: '/entities/insurance.png', key: 'entityInsurance', orbit: 'outer', start: 1.28 },
];

const PULSE_EVERY = 1400;
const PULSE_TRAVEL = 1600;
const INTRO_MS = 900;
const INTRO_STAGGER = 90;
const INTRO_END = INTRO_MS + INTRO_STAGGER * ENTITIES.length;
const STORAGE_KEY = 'anivera-universe-paused';

type Pulse = { active: boolean; entity: number; inward: boolean; start: number };

function entityPosition(index: number, sceneTime: number, reach: number) {
  const entity = ENTITIES[index];
  const orbit = ORBITS[entity.orbit];
  const angle = entity.start * Math.PI + (sceneTime / orbit.period) * Math.PI * 2;
  const sin = Math.sin(angle);
  return {
    x: CX + orbit.rx * Math.cos(angle) * reach,
    y: CY + orbit.ry * sin * reach,
    depth: (sin + 1) / 2,
    front: sin > 0,
  };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);
}

function halfOrbit(rx: number, ry: number, front: boolean) {
  return front
    ? `M ${CX + rx} ${CY} A ${rx} ${ry} 0 0 1 ${CX - rx} ${CY}`
    : `M ${CX - rx} ${CY} A ${rx} ${ry} 0 0 1 ${CX + rx} ${CY}`;
}

export default function AniveraUniverse() {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [chips, setChips] = useState([0, 4, 5, 3]);

  const panelRef = useRef<HTMLDivElement>(null);
  const entityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spokeRefs = useRef<(SVGLineElement | null)[]>([]);
  const pulseRefs = useRef<(SVGGElement | null)[]>([]);
  const rippleRef = useRef<HTMLDivElement>(null);

  const scene = useRef({
    ready: false,
    time: 0,
    scale: 1,
    introStart: 0,
    skipIntro: false,
    nextPulse: INTRO_END,
    pulses: [0, 1, 2].map((): Pulse => ({ active: false, entity: 0, inward: true, start: 0 })),
    paused: false,
    hovered: null as number | null,
    nextChip: 6,
    chipSlot: 0,
  });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be blocked; the default then applies.
    }
    const startPaused = stored === 'true' || (reduced && stored !== 'false');
    const s = scene.current;
    s.paused = startPaused;
    s.scale = startPaused ? 0 : 1;
    s.skipIntro = startPaused;
    s.ready = true;
    // Browser-only preferences, read after hydration so server and client markup match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaused(startPaused);
  }, []);

  useEffect(() => {
    scene.current.paused = paused;
  }, [paused]);

  useEffect(() => {
    scene.current.hovered = hovered;
  }, [hovered]);

  // Agent chips: every 4 s one slot fades to the next agent not on screen.
  useEffect(() => {
    const id = window.setInterval(() => {
      const s = scene.current;
      if (s.paused || s.hovered !== null) return;
      const slot = s.chipSlot;
      const agent = s.nextChip;
      s.chipSlot = (slot + 1) % 4;
      setChips((current) => {
        const next = [...current];
        next[slot] = agent;
        let candidate = (agent + 1) % 7;
        while (next.includes(candidate)) candidate = (candidate + 1) % 7;
        s.nextChip = candidate;
        return next;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useAnimationFrame((now, delta) => {
    const s = scene.current;
    if (!s.ready) return;
    if (!s.introStart) s.introStart = now;

    const target = s.paused || s.hovered !== null ? 0 : 1;
    s.scale = s.scale < target ? Math.min(target, s.scale + delta / 600) : Math.max(target, s.scale - delta / 400);
    s.time += Math.min(delta, 100) * s.scale;

    const introElapsed = s.skipIntro ? Infinity : now - s.introStart;
    const positions = ENTITIES.map((_, i) => {
      const reach = easeOut((introElapsed - i * INTRO_STAGGER) / INTRO_MS);
      return { ...entityPosition(i, s.time, 0.15 + 0.85 * reach), reach };
    });

    // Pulses: mint = data recorded (entity → core), violet = agent acted (core → entity).
    const narrow = (panelRef.current?.clientWidth ?? W) < 480;
    const maxPulses = narrow ? 2 : 3;
    if (introElapsed > INTRO_END && s.time >= s.nextPulse) {
      const free = s.pulses.slice(0, maxPulses).find((p) => !p.active);
      if (free) {
        free.active = true;
        free.entity = Math.floor(Math.random() * ENTITIES.length);
        free.inward = Math.random() < 0.7;
        free.start = s.time;
      }
      s.nextPulse = s.time + PULSE_EVERY;
    }

    const carrying = new Set<number>();
    s.pulses.forEach((pulse, i) => {
      const el = pulseRefs.current[i];
      if (!el) return;
      if (!pulse.active) {
        el.style.opacity = '0';
        return;
      }
      const progress = (s.time - pulse.start) / PULSE_TRAVEL;
      if (progress >= 1) {
        pulse.active = false;
        el.style.opacity = '0';
        if (pulse.inward && rippleRef.current?.animate) {
          rippleRef.current.animate(
            [
              { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.55 },
              { transform: 'translate(-50%, -50%) scale(1.4)', opacity: 0 },
            ],
            { duration: 900, easing: 'ease-out' },
          );
        }
        return;
      }
      carrying.add(pulse.entity);
      const p = positions[pulse.entity];
      const k = pulse.inward ? progress : 1 - progress;
      el.setAttribute('transform', `translate(${p.x + (CX - p.x) * k} ${p.y + (CY - p.y) * k})`);
      el.style.opacity = String(Math.sin(Math.PI * Math.min(progress * 1.25, 1)) * 0.6 + 0.4);
      el.style.color = pulse.inward ? '#2F8A84' : '#5B3FD1';
    });

    positions.forEach((p, i) => {
      const el = entityRefs.current[i];
      if (el) {
        const size = 0.7 + 0.3 * p.depth;
        el.style.left = `${(p.x / W) * 100}%`;
        el.style.top = `${(p.y / H) * 100}%`;
        el.style.transform = `translate(-50%, -50%) scale(${size * (0.4 + 0.6 * p.reach)})`;
        el.style.opacity = String((0.6 + 0.4 * p.depth) * p.reach);
        el.style.zIndex = p.front ? '5' : '2';
      }
      const spoke = spokeRefs.current[i];
      if (spoke) {
        spoke.setAttribute('x2', String(p.x));
        spoke.setAttribute('y2', String(p.y));
        spoke.style.opacity = String(carrying.has(i) ? 0.85 : (0.16 + 0.29 * p.depth) * p.reach);
      }
    });
  });

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Not remembered when storage is blocked.
    }
  };

  const agents = [
    { name: t.application.doctorSubtitle, task: t.universe.taskMedical },
    { name: t.application.wellbeingTitle, task: t.universe.taskWellbeing },
    { name: t.application.nutritionistTitle, task: t.universe.taskNutrition },
    { name: t.application.trainerTitle, task: t.universe.taskTrainer },
    { name: t.application.frontDeskTitle, task: t.universe.taskFrontDesk },
    { name: t.application.operationsTitle, task: t.universe.taskOperations },
    { name: t.application.accountingTitle, task: t.universe.taskAccounting },
  ];

  return (
    <div className="w-full">
      <div
        ref={panelRef}
        className={`universe-panel ${paused ? 'is-paused' : ''} ${hovered !== null ? 'has-focus' : ''}`}
        role="group"
        aria-label={t.general.universeAria}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setHovered(null);
        }}
      >
        <svg className="universe-layer" style={{ zIndex: 1 }} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path d={halfOrbit(ORBITS.outer.rx, ORBITS.outer.ry, false)} className="universe-orbit-back" />
          <path d={halfOrbit(ORBITS.inner.rx, ORBITS.inner.ry, false)} className="universe-orbit-back" />
          {ENTITIES.map((entity, i) => (
            <line
              key={entity.key}
              ref={(el) => {
                spokeRefs.current[i] = el;
              }}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY}
              className="universe-spoke"
            />
          ))}
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              ref={(el) => {
                pulseRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <circle r="10.5" fill="currentColor" opacity="0.3" />
              <circle r="3.5" fill="currentColor" />
            </g>
          ))}
        </svg>

        <div className="universe-core" aria-hidden="true">
          <div className="universe-core-glow" />
          <div ref={rippleRef} className="universe-core-ripple" />
          <div className="universe-core-ring" />
          <div className="universe-core-disc" />
          <img className="universe-core-logo" src={logo.src} alt="" />
        </div>

        <svg className="universe-layer" style={{ zIndex: 4 }} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path d={halfOrbit(ORBITS.inner.rx, ORBITS.inner.ry, true)} className="universe-orbit-front" />
          <path d={halfOrbit(ORBITS.outer.rx, ORBITS.outer.ry, true)} className="universe-orbit-front" />
        </svg>

        {ENTITIES.map((entity, i) => (
          <div
            key={entity.key}
            ref={(el) => {
              entityRefs.current[i] = el;
            }}
            className="universe-entity"
            style={{
              width: `${(ORBITS[entity.orbit].size / W) * 100}%`,
              left: '50%',
              top: '50%',
              opacity: 0,
            }}
          >
            <button
              type="button"
              className={`universe-entity-face ${hovered === i ? 'is-active' : ''}`}
              aria-label={t.general[entity.key]}
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <span className="universe-entity-glow" aria-hidden="true" />
              <img src={entity.src} alt="" draggable={false} />
              {hovered === i && <span className="universe-entity-chip">{t.general[entity.key]}</span>}
            </button>
          </div>
        ))}

        {chips.map((agentIndex, slot) => (
          <div key={slot} className={`universe-chip universe-chip-${slot}`} aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={agentIndex}
                className="universe-chip-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="universe-chip-dot" />
                <span className="min-w-0">
                  <span className="block font-semibold text-anivera-ink truncate">{agents[agentIndex].name}</span>
                  <span className="block text-anivera-body truncate">{agents[agentIndex].task}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}

        <button
          type="button"
          className="universe-pause"
          onClick={togglePause}
          aria-pressed={paused}
          aria-label={paused ? t.universe.play : t.universe.pause}
          title={paused ? t.universe.play : t.universe.pause}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" fill="currentColor" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" fill="currentColor" />
            </svg>
          )}
        </button>

        <p className="universe-note">{t.universe.exampleNote}</p>
      </div>

      <ul className="universe-legend">
        {ENTITIES.map((entity) => (
          <li key={entity.key}>
            <img src={entity.src} alt="" />
            <span>{t.general[entity.key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
