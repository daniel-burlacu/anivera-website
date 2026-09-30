// Presentation content for /how-it-works (Penpot page "13 How it works").
// Languages without an entry here fall back to English.
import type { Language } from '@/i18n/translation';

export const CASE_KEYS = ['users', 'vets', 'shelters'] as const;
export type CaseKey = (typeof CASE_KEYS)[number];

export type RowStatus = 'ok' | 'ai' | 'warn' | 'user';
export type Row = [label: string, value: string, status: RowStatus];

export interface AgentCard {
  name: string;
  job: string;
  stat: string;
}

export interface Bar {
  label: string;
  value: number;
  max: number;
  unit: string;
  low: boolean;
}

export interface Game {
  scoreLabel: string;
  score: number;
  badge: string;
  next: string;
  progress: number; // 0..1 towards the next badge threshold
  badges: { name: string; points: number; earned: boolean }[];
  tasksLabel: string;
  tasks: [task: string, points: string][];
  feeLabel: string;
  feeFrom: string;
  feeTo: string;
  feeNote: string;
}

// A step panel shows exactly one of: rows (list or chat), agents, bars or game.
export interface Step {
  agent: string;
  title: string;
  body: string;
  panel: string;
  rows?: Row[];
  agents?: AgentCard[];
  bars?: Bar[];
  note?: string;
  game?: Game;
}

export interface Question {
  q: string;
  options: string[];
  multi?: boolean;
}

export interface CaseContent {
  tab: string;
  who: string;
  intro: { title: string; body: string; bullets: string[] };
  steps: Step[];
  questions: Question[];
}

export interface UiText {
  eyebrow: string;
  stepOf: string; // "{n}" and "{total}" are replaced
  progressIntro: string;
  progressStep: string; // "{n}" is replaced
  progressQuestions: string;
  start: string;
  next: string;
  back: string;
  toQuestions: string;
  lastStep: string;
  qTitle: string;
  qBody: string;
  questionLabel: string;
  multiHint: string;
  scaleHint: string;
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  org: Record<'vets' | 'shelters', string>;
  orgPh: Record<'vets' | 'shelters', string>;
  consent: string;
  submit: string;
  sending: string;
  missing: string;
  error: string;
  thanksTitle: string; // "{name}" is replaced with the respondent's first name
  thanksBody: string;
  another: string;
  home: string;
  status: Record<RowStatus, string>;
  lowStock: string;
  agents: string[];
}

export interface Presentation {
  ui: UiText;
  cases: Record<CaseKey, CaseContent>;
}

const en: Presentation = {
  ui: {
    eyebrow: 'How Anivera works',
    stepOf: 'Step {n} of {total}',
    progressIntro: 'Intro',
    progressStep: 'Step {n}',
    progressQuestions: 'Questions',
    start: 'See how it works',
    next: 'Next',
    back: 'Back',
    toQuestions: 'Answer 10 questions',
    lastStep: 'Last step · about 2 minutes',
    qTitle: 'Would Anivera work for you?',
    qBody: 'Ten quick questions. Your answers tell us what to build first and whether a pilot fits you.',
    questionLabel: 'Question',
    multiHint: 'Choose all that apply',
    scaleHint: '1 = not at all · 5 = very',
    name: 'Your name',
    namePh: 'e.g. Ana García',
    email: 'Email (optional)',
    emailPh: 'So we can invite you to the pilot',
    org: { vets: 'Practice name', shelters: 'Shelter name' },
    orgPh: { vets: 'e.g. Clínica Veterinaria Sol', shelters: 'e.g. Refugio Esperanza' },
    consent: 'I agree that Anivera stores my answers to contact me about the product. No marketing lists, delete any time.',
    submit: 'Send answers',
    sending: 'Sending…',
    missing: 'Please add your name, answer all 10 questions and accept the consent.',
    error: 'Your answers could not be saved. Please try again.',
    thanksTitle: 'Thank you, {name}!',
    thanksBody: 'Your answers are saved. If you left an email, we will invite you to the pilot as soon as it opens.',
    another: 'See another case',
    home: 'Back to home',
    status: { ok: '✓ Done', ai: 'AI · review', warn: 'Attention', user: 'You' },
    lowStock: 'Low',
    agents: ['Front Desk', 'Medical Adviser', 'Operations', 'Accounting'],
  },
  cases: {
    users: {
      tab: 'For animal owners',
      who: 'Animal owners',
      intro: {
        title: 'Every animal, one record you control.',
        body: 'Anivera keeps your animal’s passport, vaccines, visits, food and questions in one place — and AI agents do the paperwork for you.',
        bullets: ['Small monthly fee — shelter tasks can bring it to €0', 'AI agents that know your animal’s medical history', 'You decide who sees the record'],
      },
      steps: [
        {
          agent: 'Photo-to-text',
          title: 'Snap the passport. AI fills the record.',
          body: 'Take a photo of the pet passport. Anivera reads name, chip, breed and vaccines. You check every field before it is saved.',
          panel: 'New animal · passport',
          rows: [
            ['Name', 'Luna', 'ok'],
            ['Microchip', '941 000 024 519 873', 'ok'],
            ['Species · Breed', 'Dog · Border Collie', 'ok'],
            ['Rabies vaccine', '12 Mar 2026', 'ai'],
            ['Next booster', '12 Mar 2027', 'ai'],
          ],
        },
        {
          agent: 'Front Desk',
          title: 'Book the vet. Never miss a visit.',
          body: 'Book with your vet in a few taps. The day before, you get a reminder on WhatsApp, Telegram, SMS or email with Confirm and Cancel.',
          panel: 'Visit tomorrow · 10:30',
          rows: [
            ['Clinic', 'Clínica Veterinaria Sol', 'ok'],
            ['Reason', 'Annual check-up + booster', 'ok'],
            ['Reminder via', 'WhatsApp', 'ok'],
            ['Your answer', 'Confirm · Cancel', 'ai'],
          ],
        },
        {
          agent: 'Care agents',
          title: 'AI agents that know your animal.',
          body: 'Your agents read Luna’s full medical history — vaccines, visits, allergies and treatments — so every answer fits her. Ask the Medical Adviser, Nutritionist, Well-Being Coach or Trainer. Your vet still decides treatment.',
          panel: 'Ask Anivera',
          rows: [
            ['You', 'Luna is scratching her ears a lot', 'user'],
            ['Medical Adviser', 'She had an ear infection in March and it may be back. Book a vet check this week.', 'ai'],
            ['Nutritionist', 'Her record shows a chicken allergy. This food has no chicken — safe for her.', 'ai'],
          ],
        },
        {
          agent: 'Volunteer rewards',
          title: 'Help at a shelter. Earn badges. Pay less.',
          body: 'Volunteer at shelters near you: scan the cage QR code, then walk, feed, groom or clean. Every task earns 10 points and unlocks badges — and enough tasks in a month bring your subscription down to €0.',
          panel: 'Your volunteer score',
          game: {
            scoreLabel: 'Points',
            score: 340,
            badge: 'Regular walker',
            next: 'Next badge: Shelter hand at 700',
            progress: 0.1,
            badges: [
              { name: 'New paw', points: 30, earned: true },
              { name: 'Kennel friend', points: 100, earned: true },
              { name: 'Regular walker', points: 300, earned: true },
              { name: 'Shelter hand', points: 700, earned: false },
              { name: 'Guardian', points: 1500, earned: false },
            ],
            tasksLabel: 'This week',
            tasks: [
              ['Walk · Rocky · Refugio Esperanza', '+10'],
              ['Feed · Kira', '+10'],
              ['Clean cage B-12', '+10'],
            ],
            feeLabel: 'Subscription this month',
            feeFrom: '€5',
            feeTo: '€0',
            feeNote: 'Covered by 12 shelter tasks',
          },
        },
        {
          agent: 'Consent',
          title: 'Share the record. Stay in charge.',
          body: 'Give your vet, an insurer or a new owner access with one tap and take it back when you want. Adopting from a shelter? The history comes with the animal.',
          panel: 'Who can see Luna’s record',
          rows: [
            ['Clínica Veterinaria Sol', 'Full record', 'ok'],
            ['Hospital Retiro (referral)', 'Until 30 Oct', 'warn'],
            ['Vetsure insurance', 'Claims only', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'How many animals do you live with?', options: ['1', '2–3', '4 or more', 'None yet'] },
        { q: 'Which animals?', options: ['Dog', 'Cat', 'Bird', 'Small mammal', 'Reptile', 'Other'], multi: true },
        { q: 'Where are their health records today?', options: ['Paper passport', 'Only at the vet', 'Photos on my phone', 'An app', 'Nowhere'] },
        { q: 'How many vet visits per year?', options: ['0–1', '2–3', '4 or more'] },
        { q: 'Missed a vaccine or visit in the last year?', options: ['Yes', 'No', 'Not sure'] },
        { q: 'Which feature would you use most?', options: ['Passport scan', 'Reminders', 'Ask the AI agents', 'Volunteer rewards', 'Insurance', 'Find a shelter'] },
        { q: 'Would you volunteer at a shelter to lower your fee?', options: ['Yes', 'Maybe', 'No'] },
        { q: 'Comfortable letting the AI agents read the medical history?', options: ['1', '2', '3', '4', '5'] },
        { q: 'What monthly price feels fair?', options: ['Only free', 'Up to €3', '€3–6', '€6–10', 'More'] },
        { q: 'Join the beta when it opens?', options: ['Yes', 'Maybe later', 'No'] },
      ],
    },
    vets: {
      tab: 'For veterinary cabinets',
      who: 'Veterinary cabinets',
      intro: {
        title: 'Less paperwork. More time with the animal.',
        body: 'Anivera gives your practice AI agents for the front desk, medical advice, stock and accounting. Every clinical decision stays with the vet.',
        bullets: ['Front Desk, Medical Adviser, Operations and Accounting agents', 'Speak visit notes; AI structures them for you', 'Stock and medicines charted, orders drafted'],
      },
      steps: [
        {
          agent: 'AI agent team',
          title: 'Meet your AI agents.',
          body: 'Four agents share the practice’s routine work. They work from each animal’s full medical history. Each one prepares; a person approves.',
          panel: 'Agents at work · today',
          agents: [
            { name: 'Front Desk', job: 'Bookings, reminders and patient flow', stat: '18 bookings' },
            { name: 'Medical Adviser', job: 'Reads the full history, flags risks and options', stat: '3 notes to review' },
            { name: 'Operations', job: 'Stock, batches, expiry dates and orders', stat: '2 items low' },
            { name: 'Accounting', job: 'Invoices, payments and the monthly report', stat: '€4,280 this month' },
          ],
        },
        {
          agent: 'Front Desk',
          title: 'The Front Desk agent runs the day.',
          body: 'Owners book online. Reminders go out the day before with Confirm and Cancel, so no-shows drop and freed slots are re-offered.',
          panel: 'Patient flow · today',
          rows: [
            ['Arrived', 'Luna · Border Collie', 'ok'],
            ['Triage', 'Max · urgent, limping', 'warn'],
            ['In consultation', 'Nala · vaccines', 'ok'],
            ['Leaving', 'Simba · collect by 18:30', 'ok'],
          ],
        },
        {
          agent: 'Medical Adviser',
          title: 'Speak the visit. The history is checked.',
          body: 'Dictate during or after the consultation. The AI writes structured notes and the Medical Adviser checks them against Max’s full medical history. You review and sign.',
          panel: 'Visit notes · Max',
          rows: [
            ['History', 'Limping right hind leg for 3 days', 'ai'],
            ['Findings', 'Pain on stifle flexion, no swelling', 'ai'],
            ['Plan', 'Rest 10 days, NSAID 5 days', 'ai'],
            ['Medical Adviser', 'Stomach upset on NSAID in 2025 — consider a gastroprotector', 'warn'],
          ],
        },
        {
          agent: 'Operations',
          title: 'Stock and medicines, at a glance.',
          body: 'Snap medicine labels, supplier invoices and lab results. The Operations agent keeps stock, batches and expiry dates up to date, charts what runs low and drafts the order for you to approve.',
          panel: 'Stock & medicines',
          bars: [
            { label: 'Rabies vaccine', value: 20, max: 40, unit: 'doses', low: false },
            { label: 'Meloxicam 1.5 mg/ml', value: 3, max: 12, unit: 'bottles', low: true },
            { label: 'Amoxicillin 250 mg', value: 18, max: 30, unit: 'boxes', low: false },
            { label: 'Microchips', value: 6, max: 50, unit: 'units', low: true },
          ],
          note: '2 items below minimum · order drafted for approval · next expiry: rabies batch 04/2027',
        },
        {
          agent: 'Accounting',
          title: 'The Accounting agent closes the day.',
          body: 'Invoices are prepared from the visit, payments are matched and insurance claims leave from the record. Referrals go to hospitals by the services they offer.',
          panel: 'Accounting · today',
          rows: [
            ['Invoice · Max', '€68.00 · prepared', 'ok'],
            ['Unpaid invoices', '3 · reminders drafted', 'warn'],
            ['Insurance claim', 'Vetsure · ready to send', 'ai'],
            ['Referral', 'Hospital Retiro · imaging', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Your role in the practice?', options: ['Owner / lead vet', 'Vet', 'Nurse / technician', 'Reception / manager'] },
        { q: 'How many vets work there?', options: ['Just me', '2–3', '4–7', '8 or more'] },
        { q: 'What do you use for records today?', options: ['Paper', 'Spreadsheets', 'Practice software', 'Mix'] },
        { q: 'Hours of admin per vet each week?', options: ['Under 3', '3–6', '6–10', 'Over 10'] },
        { q: 'Biggest time sink?', options: ['No-shows', 'Writing notes', 'Stock', 'Invoices', 'Referrals', 'Insurance forms'], multi: true },
        { q: 'Which AI agents would you switch on first?', options: ['Front Desk', 'Medical Adviser', 'Operations', 'Accounting'], multi: true },
        { q: 'Would you dictate visit notes?', options: ['Yes', 'Maybe', 'No'] },
        { q: 'How important is EU data hosting?', options: ['1', '2', '3', '4', '5'] },
        { q: 'What monthly price per practice?', options: ['Under €50', '€50–100', '€100–200', 'Over €200'] },
        { q: 'Run a free 3-month pilot?', options: ['Yes', 'Maybe later', 'No'] },
      ],
    },
    shelters: {
      tab: 'For animal shelters',
      who: 'Animal shelters',
      intro: {
        title: 'Run the shelter. Let AI do the admin.',
        body: 'From intake to adoption, Anivera tracks every animal, cage, treatment and bag of food — on a desktop in the office and on a phone on the floor.',
        bullets: ['Front Desk, Medical Adviser, Operations and Accounting agents', 'Voice intake and a care board for the whole team', 'Food and medicine stock charted for you'],
      },
      steps: [
        {
          agent: 'AI agent team',
          title: 'Meet your AI agents.',
          body: 'Four agents take the admin off your team. They work from each animal’s full medical history. Each one prepares; a person approves.',
          panel: 'Agents at work · today',
          agents: [
            { name: 'Front Desk', job: 'Visits, walk requests and adopter messages', stat: '6 visits today' },
            { name: 'Medical Adviser', job: 'Reads each animal’s history, flags what is due', stat: '4 due this week' },
            { name: 'Operations', job: 'Food, medicines, supplies and expiry dates', stat: '2 items low' },
            { name: 'Accounting', job: 'Donations, adoption fees and the spending report', stat: '€1,240 donated' },
          ],
        },
        {
          agent: 'Voice + photo',
          title: 'Intake in two minutes.',
          body: 'Scan the chip or passport and say what you see — “Speak to fill” completes the form. Custody status, arrival inspection and cage are set at the door.',
          panel: 'New intake',
          rows: [
            ['Animal', 'Male dog · approx. 3 years', 'ai'],
            ['Microchip', 'Not found', 'warn'],
            ['Custody', 'Unresolved', 'warn'],
            ['Cage', 'B-12 · quarantine', 'ok'],
          ],
        },
        {
          agent: 'Care board',
          title: 'One care board for the team.',
          body: 'Every animal moves through Arrival → Inspection → Ward → Treatment → Watching → Leaving. Staff and volunteers see their tasks on their phones, and volunteers earn points for every task.',
          panel: 'Care board · today',
          rows: [
            ['Inspection', '3 new arrivals', 'warn'],
            ['Treatment', 'Kira · antibiotics 2×/day', 'ok'],
            ['Watching', 'Rocky · after surgery', 'ok'],
            ['Volunteers', '14 tasks done today', 'ok'],
          ],
        },
        {
          agent: 'Operations',
          title: 'Food and medicine, charted for you.',
          body: 'Photograph food labels and supplier invoices. The Operations agent reads composition, calories and expiry, charts stock and drafts the order before anything runs out.',
          panel: 'Stock · food & medicines',
          bars: [
            { label: 'Adult dry food 15 kg', value: 6, max: 20, unit: 'bags', low: true },
            { label: 'Puppy food 3 kg', value: 14, max: 15, unit: 'bags', low: false },
            { label: 'Cat food 10 kg', value: 9, max: 12, unit: 'bags', low: false },
            { label: 'Antiparasitic', value: 4, max: 30, unit: 'doses', low: true },
          ],
          note: 'Food for 9 days · order drafted · label read: protein 26%, 3,650 kcal/kg',
        },
        {
          agent: 'Accounting',
          title: 'Adoption and accounting, done right.',
          body: 'Adopters pass one readiness assessment, your vet approves and the full record goes with the animal. The Accounting agent tracks donations and adoption fees and prepares the spending report.',
          panel: 'Adoption & accounting',
          rows: [
            ['Toby · adoption', 'Assessment passed · vet approved', 'ok'],
            ['Record', 'Transferred to the new owner', 'ai'],
            ['Donations this month', '€1,240', 'ok'],
            ['Spending report', 'Ready for review', 'ai'],
          ],
        },
      ],
      questions: [
        { q: 'Your role at the shelter?', options: ['Director', 'Vet', 'Caretaker', 'Volunteer lead', 'Admin'] },
        { q: 'Animals in care at one time?', options: ['Under 20', '20–50', '50–150', 'Over 150'] },
        { q: 'Staff and volunteers?', options: ['1–5', '6–15', '16–40', 'Over 40'] },
        { q: 'How do you track animals today?', options: ['Paper', 'Spreadsheets', 'Shelter software', 'Mix'] },
        { q: 'Biggest time sink?', options: ['Intake paperwork', 'Medical tracking', 'Food & stock', 'Adoptions', 'Reports & donors'], multi: true },
        { q: 'Which AI agents would you switch on first?', options: ['Front Desk', 'Medical Adviser', 'Operations', 'Accounting'], multi: true },
        { q: 'Who is your vet?', options: ['In-house vet', 'Visiting vet', 'External clinic'] },
        { q: 'Would staff and volunteers use phones on the floor?', options: ['Yes', 'Some', 'No'] },
        { q: 'What monthly budget fits?', options: ['Need a free plan', 'Under €30', '€30–80', 'Over €80'] },
        { q: 'Run a free 3-month pilot?', options: ['Yes', 'Maybe later', 'No'] },
      ],
    },
  },
};

const es: Presentation = {
  ui: {
    eyebrow: 'Cómo funciona Anivera',
    stepOf: 'Paso {n} de {total}',
    progressIntro: 'Inicio',
    progressStep: 'Paso {n}',
    progressQuestions: 'Preguntas',
    start: 'Ver cómo funciona',
    next: 'Siguiente',
    back: 'Atrás',
    toQuestions: 'Responder 10 preguntas',
    lastStep: 'Último paso · unos 2 minutos',
    qTitle: '¿Anivera encaja contigo?',
    qBody: 'Diez preguntas rápidas. Tus respuestas nos dicen qué construir primero y si un piloto encaja contigo.',
    questionLabel: 'Pregunta',
    multiHint: 'Elige todas las que correspondan',
    scaleHint: '1 = nada · 5 = mucho',
    name: 'Tu nombre',
    namePh: 'p. ej. Ana García',
    email: 'Email (opcional)',
    emailPh: 'Para invitarte al piloto',
    org: { vets: 'Nombre de la clínica', shelters: 'Nombre del refugio' },
    orgPh: { vets: 'p. ej. Clínica Veterinaria Sol', shelters: 'p. ej. Refugio Esperanza' },
    consent: 'Acepto que Anivera guarde mis respuestas para contactarme sobre el producto. Sin listas de marketing; puedes borrarlas cuando quieras.',
    submit: 'Enviar respuestas',
    sending: 'Enviando…',
    missing: 'Añade tu nombre, responde las 10 preguntas y acepta el consentimiento.',
    error: 'No se pudieron guardar tus respuestas. Inténtalo de nuevo.',
    thanksTitle: '¡Gracias, {name}!',
    thanksBody: 'Tus respuestas están guardadas. Si dejaste un email, te invitaremos al piloto en cuanto se abra.',
    another: 'Ver otro caso',
    home: 'Volver al inicio',
    status: { ok: '✓ Listo', ai: 'IA · revisar', warn: 'Atención', user: 'Tú' },
    lowStock: 'Bajo',
    agents: ['Recepción', 'Asesor médico', 'Operaciones', 'Contabilidad'],
  },
  cases: {
    users: {
      tab: 'Para dueños de animales',
      who: 'Dueños de animales',
      intro: {
        title: 'Cada animal, un historial que tú controlas.',
        body: 'Anivera guarda el pasaporte, las vacunas, las visitas, la comida y tus dudas en un solo lugar, y los agentes de IA hacen el papeleo por ti.',
        bullets: ['Cuota mensual pequeña: las tareas en refugios pueden dejarla en 0 €', 'Agentes de IA que conocen el historial médico de tu animal', 'Tú decides quién ve el historial'],
      },
      steps: [
        {
          agent: 'Foto a texto',
          title: 'Haz una foto al pasaporte. La IA rellena el historial.',
          body: 'Fotografía el pasaporte de tu mascota. Anivera lee el nombre, el chip, la raza y las vacunas. Tú revisas cada campo antes de guardarlo.',
          panel: 'Nuevo animal · pasaporte',
          rows: [
            ['Nombre', 'Luna', 'ok'],
            ['Microchip', '941 000 024 519 873', 'ok'],
            ['Especie · Raza', 'Perro · Border Collie', 'ok'],
            ['Vacuna antirrábica', '12 mar 2026', 'ai'],
            ['Próximo refuerzo', '12 mar 2027', 'ai'],
          ],
        },
        {
          agent: 'Recepción',
          title: 'Pide cita al veterinario. No te pierdas ninguna visita.',
          body: 'Reserva con tu veterinario en unos toques. El día antes recibes un recordatorio por WhatsApp, Telegram, SMS o email con Confirmar y Cancelar.',
          panel: 'Visita mañana · 10:30',
          rows: [
            ['Clínica', 'Clínica Veterinaria Sol', 'ok'],
            ['Motivo', 'Revisión anual + refuerzo', 'ok'],
            ['Recordatorio por', 'WhatsApp', 'ok'],
            ['Tu respuesta', 'Confirmar · Cancelar', 'ai'],
          ],
        },
        {
          agent: 'Agentes de cuidado',
          title: 'Agentes de IA que conocen a tu animal.',
          body: 'Tus agentes leen todo el historial médico de Luna — vacunas, visitas, alergias y tratamientos — para que cada respuesta sea para ella. Pregunta al Asesor médico, al Nutricionista, al Coach de bienestar o al Adiestrador. El tratamiento lo decide tu veterinario.',
          panel: 'Pregunta a Anivera',
          rows: [
            ['Tú', 'Luna se rasca mucho las orejas', 'user'],
            ['Asesor médico', 'Tuvo una otitis en marzo y puede haber vuelto. Pide cita esta semana.', 'ai'],
            ['Nutricionista', 'Su historial indica alergia al pollo. Este pienso no lleva pollo: es seguro para ella.', 'ai'],
          ],
        },
        {
          agent: 'Recompensas por voluntariado',
          title: 'Ayuda en un refugio. Gana insignias. Paga menos.',
          body: 'Hazte voluntario en refugios cercanos: escanea el código QR de la jaula y pasea, alimenta, cepilla o limpia. Cada tarea suma 10 puntos y desbloquea insignias, y con suficientes tareas al mes tu suscripción baja hasta 0 €.',
          panel: 'Tu puntuación de voluntario',
          game: {
            scoreLabel: 'Puntos',
            score: 340,
            badge: 'Paseador habitual',
            next: 'Siguiente insignia: Mano del refugio con 700',
            progress: 0.1,
            badges: [
              { name: 'Nueva huella', points: 30, earned: true },
              { name: 'Amigo del refugio', points: 100, earned: true },
              { name: 'Paseador habitual', points: 300, earned: true },
              { name: 'Mano del refugio', points: 700, earned: false },
              { name: 'Guardián', points: 1500, earned: false },
            ],
            tasksLabel: 'Esta semana',
            tasks: [
              ['Paseo · Rocky · Refugio Esperanza', '+10'],
              ['Comida · Kira', '+10'],
              ['Limpieza jaula B-12', '+10'],
            ],
            feeLabel: 'Suscripción de este mes',
            feeFrom: '5 €',
            feeTo: '0 €',
            feeNote: 'Cubierta con 12 tareas en refugios',
          },
        },
        {
          agent: 'Consentimiento',
          title: 'Comparte el historial. Tú mandas.',
          body: 'Da acceso a tu veterinario, a una aseguradora o a un nuevo dueño con un toque y retíralo cuando quieras. ¿Adoptas en un refugio? El historial viene con el animal.',
          panel: 'Quién ve el historial de Luna',
          rows: [
            ['Clínica Veterinaria Sol', 'Historial completo', 'ok'],
            ['Hospital Retiro (derivación)', 'Hasta el 30 oct', 'warn'],
            ['Seguro Vetsure', 'Solo reclamaciones', 'ok'],
          ],
        },
      ],
      questions: [
        { q: '¿Con cuántos animales vives?', options: ['1', '2–3', '4 o más', 'Ninguno aún'] },
        { q: '¿Qué animales?', options: ['Perro', 'Gato', 'Ave', 'Pequeño mamífero', 'Reptil', 'Otro'], multi: true },
        { q: '¿Dónde está hoy su historial de salud?', options: ['Pasaporte en papel', 'Solo en el veterinario', 'Fotos en el móvil', 'Una app', 'En ningún sitio'] },
        { q: '¿Cuántas visitas al veterinario al año?', options: ['0–1', '2–3', '4 o más'] },
        { q: '¿Se te pasó una vacuna o visita el último año?', options: ['Sí', 'No', 'No lo sé'] },
        { q: '¿Qué función usarías más?', options: ['Escanear pasaporte', 'Recordatorios', 'Preguntar a los agentes', 'Recompensas por voluntariado', 'Seguro', 'Buscar refugio'] },
        { q: '¿Harías voluntariado en un refugio para pagar menos?', options: ['Sí', 'Quizá', 'No'] },
        { q: '¿Te parece bien que los agentes de IA lean el historial médico?', options: ['1', '2', '3', '4', '5'] },
        { q: '¿Qué precio mensual te parece justo?', options: ['Solo gratis', 'Hasta 3 €', '3–6 €', '6–10 €', 'Más'] },
        { q: '¿Te unirías a la beta cuando abra?', options: ['Sí', 'Más adelante', 'No'] },
      ],
    },
    vets: {
      tab: 'Para clínicas veterinarias',
      who: 'Clínicas veterinarias',
      intro: {
        title: 'Menos papeleo. Más tiempo con el animal.',
        body: 'Anivera da a tu clínica agentes de IA para la recepción, el asesoramiento médico, el stock y la contabilidad. Cada decisión clínica sigue siendo del veterinario.',
        bullets: ['Agentes de Recepción, Asesor médico, Operaciones y Contabilidad', 'Dicta las notas; la IA las estructura por ti', 'Stock y medicamentos en gráficos, pedidos preparados'],
      },
      steps: [
        {
          agent: 'Equipo de agentes IA',
          title: 'Conoce a tus agentes de IA.',
          body: 'Cuatro agentes se reparten el trabajo rutinario de la clínica. Trabajan con el historial médico completo de cada animal. Cada uno prepara; una persona aprueba.',
          panel: 'Agentes trabajando · hoy',
          agents: [
            { name: 'Recepción', job: 'Citas, recordatorios y flujo de pacientes', stat: '18 citas' },
            { name: 'Asesor médico', job: 'Lee todo el historial, señala riesgos y opciones', stat: '3 notas por revisar' },
            { name: 'Operaciones', job: 'Stock, lotes, caducidades y pedidos', stat: '2 productos bajos' },
            { name: 'Contabilidad', job: 'Facturas, cobros e informe mensual', stat: '4.280 € este mes' },
          ],
        },
        {
          agent: 'Recepción',
          title: 'El agente de Recepción organiza el día.',
          body: 'Los dueños reservan online. El día antes salen recordatorios con Confirmar y Cancelar, así bajan las ausencias y los huecos libres se vuelven a ofrecer.',
          panel: 'Flujo de pacientes · hoy',
          rows: [
            ['Llegado', 'Luna · Border Collie', 'ok'],
            ['Triaje', 'Max · urgente, cojea', 'warn'],
            ['En consulta', 'Nala · vacunas', 'ok'],
            ['Salida', 'Simba · recoger a las 18:30', 'ok'],
          ],
        },
        {
          agent: 'Asesor médico',
          title: 'Dicta la consulta. El historial se revisa.',
          body: 'Dicta durante o después de la consulta. La IA escribe notas estructuradas y el Asesor médico las contrasta con todo el historial médico de Max. Tú revisas y firmas.',
          panel: 'Notas de consulta · Max',
          rows: [
            ['Anamnesis', 'Cojera posterior derecha desde hace 3 días', 'ai'],
            ['Hallazgos', 'Dolor a la flexión de rodilla, sin inflamación', 'ai'],
            ['Plan', 'Reposo 10 días, AINE 5 días', 'ai'],
            ['Asesor médico', 'Molestias gástricas con AINE en 2025: valorar un protector gástrico', 'warn'],
          ],
        },
        {
          agent: 'Operaciones',
          title: 'Stock y medicamentos, de un vistazo.',
          body: 'Fotografía etiquetas de medicamentos, facturas de proveedores y resultados de laboratorio. El agente de Operaciones mantiene al día stock, lotes y caducidades, muestra en gráficos lo que se acaba y prepara el pedido para que lo apruebes.',
          panel: 'Stock y medicamentos',
          bars: [
            { label: 'Vacuna antirrábica', value: 20, max: 40, unit: 'dosis', low: false },
            { label: 'Meloxicam 1,5 mg/ml', value: 3, max: 12, unit: 'frascos', low: true },
            { label: 'Amoxicilina 250 mg', value: 18, max: 30, unit: 'cajas', low: false },
            { label: 'Microchips', value: 6, max: 50, unit: 'uds.', low: true },
          ],
          note: '2 productos bajo mínimos · pedido preparado para aprobar · próxima caducidad: lote antirrábica 04/2027',
        },
        {
          agent: 'Contabilidad',
          title: 'El agente de Contabilidad cierra el día.',
          body: 'Las facturas se preparan desde la consulta, los cobros se concilian y las reclamaciones al seguro salen del historial. Las derivaciones van a hospitales según sus servicios.',
          panel: 'Contabilidad · hoy',
          rows: [
            ['Factura · Max', '68,00 € · preparada', 'ok'],
            ['Facturas pendientes', '3 · recordatorios preparados', 'warn'],
            ['Reclamación al seguro', 'Vetsure · lista para enviar', 'ai'],
            ['Derivación', 'Hospital Retiro · diagnóstico por imagen', 'ok'],
          ],
        },
      ],
      questions: [
        { q: '¿Tu papel en la clínica?', options: ['Dueño / veterinario jefe', 'Veterinario', 'Auxiliar / técnico', 'Recepción / gerencia'] },
        { q: '¿Cuántos veterinarios trabajan allí?', options: ['Solo yo', '2–3', '4–7', '8 o más'] },
        { q: '¿Qué usáis hoy para los historiales?', options: ['Papel', 'Hojas de cálculo', 'Software de gestión', 'Una mezcla'] },
        { q: '¿Horas de papeleo por veterinario a la semana?', options: ['Menos de 3', '3–6', '6–10', 'Más de 10'] },
        { q: '¿Qué os quita más tiempo?', options: ['Ausencias', 'Escribir notas', 'Stock', 'Facturas', 'Derivaciones', 'Partes de seguro'], multi: true },
        { q: '¿Qué agentes de IA activaríais primero?', options: ['Recepción', 'Asesor médico', 'Operaciones', 'Contabilidad'], multi: true },
        { q: '¿Dictarías las notas de consulta?', options: ['Sí', 'Quizá', 'No'] },
        { q: '¿Qué importancia tiene alojar los datos en la UE?', options: ['1', '2', '3', '4', '5'] },
        { q: '¿Qué precio mensual por clínica?', options: ['Menos de 50 €', '50–100 €', '100–200 €', 'Más de 200 €'] },
        { q: '¿Haríais un piloto gratuito de 3 meses?', options: ['Sí', 'Más adelante', 'No'] },
      ],
    },
    shelters: {
      tab: 'Para refugios de animales',
      who: 'Refugios de animales',
      intro: {
        title: 'Dirige el refugio. Deja el papeleo a la IA.',
        body: 'Desde la entrada hasta la adopción, Anivera controla cada animal, jaula, tratamiento y saco de pienso, en el ordenador de la oficina y en el móvil en las instalaciones.',
        bullets: ['Agentes de Recepción, Asesor médico, Operaciones y Contabilidad', 'Entradas por voz y un tablero de cuidados para todo el equipo', 'Stock de comida y medicamentos en gráficos'],
      },
      steps: [
        {
          agent: 'Equipo de agentes IA',
          title: 'Conoce a tus agentes de IA.',
          body: 'Cuatro agentes quitan el papeleo a tu equipo. Trabajan con el historial médico completo de cada animal. Cada uno prepara; una persona aprueba.',
          panel: 'Agentes trabajando · hoy',
          agents: [
            { name: 'Recepción', job: 'Visitas, solicitudes de paseo y mensajes de adoptantes', stat: '6 visitas hoy' },
            { name: 'Asesor médico', job: 'Lee el historial de cada animal y avisa de lo pendiente', stat: '4 esta semana' },
            { name: 'Operaciones', job: 'Comida, medicamentos, material y caducidades', stat: '2 productos bajos' },
            { name: 'Contabilidad', job: 'Donaciones, tasas de adopción e informe de gastos', stat: '1.240 € donados' },
          ],
        },
        {
          agent: 'Voz + foto',
          title: 'Una entrada en dos minutos.',
          body: 'Escanea el chip o el pasaporte y di lo que ves: «Habla para rellenar» completa el formulario. La custodia, la inspección de llegada y la jaula se fijan en la puerta.',
          panel: 'Nueva entrada',
          rows: [
            ['Animal', 'Perro macho · aprox. 3 años', 'ai'],
            ['Microchip', 'No encontrado', 'warn'],
            ['Custodia', 'Sin resolver', 'warn'],
            ['Jaula', 'B-12 · cuarentena', 'ok'],
          ],
        },
        {
          agent: 'Tablero de cuidados',
          title: 'Un tablero de cuidados para el equipo.',
          body: 'Cada animal pasa por Llegada → Inspección → Sala → Tratamiento → Vigilancia → Salida. Personal y voluntarios ven sus tareas en el móvil, y los voluntarios ganan puntos con cada tarea.',
          panel: 'Tablero de cuidados · hoy',
          rows: [
            ['Inspección', '3 llegadas nuevas', 'warn'],
            ['Tratamiento', 'Kira · antibiótico 2 veces/día', 'ok'],
            ['Vigilancia', 'Rocky · tras cirugía', 'ok'],
            ['Voluntarios', '14 tareas hechas hoy', 'ok'],
          ],
        },
        {
          agent: 'Operaciones',
          title: 'Comida y medicamentos, en gráficos.',
          body: 'Fotografía etiquetas de pienso y facturas de proveedores. El agente de Operaciones lee composición, calorías y caducidad, muestra el stock en gráficos y prepara el pedido antes de que falte nada.',
          panel: 'Stock · comida y medicamentos',
          bars: [
            { label: 'Pienso adulto 15 kg', value: 6, max: 20, unit: 'sacos', low: true },
            { label: 'Pienso cachorro 3 kg', value: 14, max: 15, unit: 'sacos', low: false },
            { label: 'Pienso gato 10 kg', value: 9, max: 12, unit: 'sacos', low: false },
            { label: 'Antiparasitario', value: 4, max: 30, unit: 'dosis', low: true },
          ],
          note: 'Comida para 9 días · pedido preparado · etiqueta leída: proteína 26 %, 3.650 kcal/kg',
        },
        {
          agent: 'Contabilidad',
          title: 'Adopción y contabilidad, bien hechas.',
          body: 'Los adoptantes pasan una evaluación de idoneidad, tu veterinario aprueba y el historial completo se va con el animal. El agente de Contabilidad registra donaciones y tasas de adopción y prepara el informe de gastos.',
          panel: 'Adopción y contabilidad',
          rows: [
            ['Toby · adopción', 'Evaluación superada · aprobada por el veterinario', 'ok'],
            ['Historial', 'Transferido al nuevo dueño', 'ai'],
            ['Donaciones este mes', '1.240 €', 'ok'],
            ['Informe de gastos', 'Listo para revisar', 'ai'],
          ],
        },
      ],
      questions: [
        { q: '¿Tu papel en el refugio?', options: ['Dirección', 'Veterinario', 'Cuidador', 'Coordinación de voluntarios', 'Administración'] },
        { q: '¿Animales a vuestro cargo a la vez?', options: ['Menos de 20', '20–50', '50–150', 'Más de 150'] },
        { q: '¿Personal y voluntarios?', options: ['1–5', '6–15', '16–40', 'Más de 40'] },
        { q: '¿Cómo controláis hoy a los animales?', options: ['Papel', 'Hojas de cálculo', 'Software de refugio', 'Una mezcla'] },
        { q: '¿Qué os quita más tiempo?', options: ['Papeleo de entradas', 'Seguimiento médico', 'Comida y stock', 'Adopciones', 'Informes y donantes'], multi: true },
        { q: '¿Qué agentes de IA activaríais primero?', options: ['Recepción', 'Asesor médico', 'Operaciones', 'Contabilidad'], multi: true },
        { q: '¿Quién es vuestro veterinario?', options: ['Veterinario propio', 'Veterinario que os visita', 'Clínica externa'] },
        { q: '¿Usarían personal y voluntarios el móvil en las instalaciones?', options: ['Sí', 'Algunos', 'No'] },
        { q: '¿Qué presupuesto mensual encaja?', options: ['Necesitamos un plan gratuito', 'Menos de 30 €', '30–80 €', 'Más de 80 €'] },
        { q: '¿Haríais un piloto gratuito de 3 meses?', options: ['Sí', 'Más adelante', 'No'] },
      ],
    },
  },
};

const de: Presentation = {
  ui: {
    eyebrow: 'So funktioniert Anivera',
    stepOf: 'Schritt {n} von {total}',
    progressIntro: 'Intro',
    progressStep: 'Schritt {n}',
    progressQuestions: 'Fragen',
    start: 'So funktioniert’s',
    next: 'Weiter',
    back: 'Zurück',
    toQuestions: '10 Fragen beantworten',
    lastStep: 'Letzter Schritt · etwa 2 Minuten',
    qTitle: 'Passt Anivera zu Ihnen?',
    qBody: 'Zehn kurze Fragen. Ihre Antworten zeigen uns, was wir zuerst bauen und ob ein Pilotprojekt zu Ihnen passt.',
    questionLabel: 'Frage',
    multiHint: 'Mehrfachauswahl möglich',
    scaleHint: '1 = gar nicht · 5 = sehr',
    name: 'Ihr Name',
    namePh: 'z. B. Anna Müller',
    email: 'E-Mail (optional)',
    emailPh: 'Damit wir Sie zum Pilotprojekt einladen können',
    org: { vets: 'Name der Praxis', shelters: 'Name des Tierheims' },
    orgPh: { vets: 'z. B. Tierarztpraxis Sonnenhof', shelters: 'z. B. Tierheim Hoffnung' },
    consent: 'Ich bin einverstanden, dass Anivera meine Antworten speichert, um mich zum Produkt zu kontaktieren. Keine Marketinglisten, jederzeit löschbar.',
    submit: 'Antworten senden',
    sending: 'Wird gesendet…',
    missing: 'Bitte Namen eintragen, alle 10 Fragen beantworten und die Einwilligung bestätigen.',
    error: 'Ihre Antworten konnten nicht gespeichert werden. Bitte erneut versuchen.',
    thanksTitle: 'Danke, {name}!',
    thanksBody: 'Ihre Antworten sind gespeichert. Wenn Sie eine E-Mail angegeben haben, laden wir Sie zum Pilotprojekt ein, sobald es startet.',
    another: 'Anderen Fall ansehen',
    home: 'Zur Startseite',
    status: { ok: '✓ Erledigt', ai: 'KI · prüfen', warn: 'Achtung', user: 'Sie' },
    lowStock: 'Niedrig',
    agents: ['Empfang', 'Medizinischer Berater', 'Betrieb', 'Buchhaltung'],
  },
  cases: {
    users: {
      tab: 'Für Tierhalter',
      who: 'Tierhalter',
      intro: {
        title: 'Jedes Tier, eine Akte in Ihrer Hand.',
        body: 'Anivera bündelt Heimtierausweis, Impfungen, Tierarztbesuche, Futter und Fragen an einem Ort – und KI-Agenten erledigen den Papierkram für Sie.',
        bullets: ['Kleines Monatsabo – Aufgaben im Tierheim senken es bis auf 0 €', 'KI-Agenten, die die Krankengeschichte Ihres Tieres kennen', 'Sie entscheiden, wer die Akte sieht'],
      },
      steps: [
        {
          agent: 'Foto zu Text',
          title: 'Ausweis fotografieren. Die KI füllt die Akte.',
          body: 'Fotografieren Sie den Heimtierausweis. Anivera liest Name, Chip, Rasse und Impfungen. Sie prüfen jedes Feld, bevor es gespeichert wird.',
          panel: 'Neues Tier · Ausweis',
          rows: [
            ['Name', 'Luna', 'ok'],
            ['Mikrochip', '941 000 024 519 873', 'ok'],
            ['Tierart · Rasse', 'Hund · Border Collie', 'ok'],
            ['Tollwutimpfung', '12. März 2026', 'ai'],
            ['Nächste Auffrischung', '12. März 2027', 'ai'],
          ],
        },
        {
          agent: 'Empfang',
          title: 'Tierarzttermin buchen. Keinen Besuch verpassen.',
          body: 'Buchen Sie mit wenigen Klicks bei Ihrer Praxis. Am Vortag kommt eine Erinnerung per WhatsApp, Telegram, SMS oder E-Mail mit Bestätigen und Absagen.',
          panel: 'Termin morgen · 10:30',
          rows: [
            ['Praxis', 'Clínica Veterinaria Sol', 'ok'],
            ['Grund', 'Jahrescheck + Auffrischung', 'ok'],
            ['Erinnerung per', 'WhatsApp', 'ok'],
            ['Ihre Antwort', 'Bestätigen · Absagen', 'ai'],
          ],
        },
        {
          agent: 'Pflege-Agenten',
          title: 'KI-Agenten, die Ihr Tier kennen.',
          body: 'Ihre Agenten lesen Lunas gesamte Krankengeschichte – Impfungen, Besuche, Allergien und Behandlungen –, damit jede Antwort zu ihr passt. Fragen Sie den Medizinischen Berater, den Ernährungsberater, den Wohlfühl-Coach oder den Trainer. Die Behandlung entscheidet weiterhin Ihr Tierarzt.',
          panel: 'Anivera fragen',
          rows: [
            ['Sie', 'Luna kratzt sich oft an den Ohren', 'user'],
            ['Medizinischer Berater', 'Sie hatte im März eine Ohrentzündung, die zurück sein könnte. Buchen Sie diese Woche einen Termin.', 'ai'],
            ['Ernährungsberater', 'Laut Akte hat sie eine Hühnerallergie. Dieses Futter enthält kein Huhn – sicher für sie.', 'ai'],
          ],
        },
        {
          agent: 'Ehrenamts-Belohnungen',
          title: 'Im Tierheim helfen. Abzeichen sammeln. Weniger zahlen.',
          body: 'Helfen Sie in Tierheimen in Ihrer Nähe: QR-Code am Zwinger scannen, dann Gassi gehen, füttern, pflegen oder reinigen. Jede Aufgabe bringt 10 Punkte und schaltet Abzeichen frei – und mit genug Aufgaben im Monat sinkt Ihr Abo auf 0 €.',
          panel: 'Ihr Ehrenamts-Punktestand',
          game: {
            scoreLabel: 'Punkte',
            score: 340,
            badge: 'Stammgassigeher',
            next: 'Nächstes Abzeichen: Tierheim-Hand bei 700',
            progress: 0.1,
            badges: [
              { name: 'Neue Pfote', points: 30, earned: true },
              { name: 'Zwingerfreund', points: 100, earned: true },
              { name: 'Stammgassigeher', points: 300, earned: true },
              { name: 'Tierheim-Hand', points: 700, earned: false },
              { name: 'Beschützer', points: 1500, earned: false },
            ],
            tasksLabel: 'Diese Woche',
            tasks: [
              ['Gassi · Rocky · Refugio Esperanza', '+10'],
              ['Füttern · Kira', '+10'],
              ['Zwinger B-12 reinigen', '+10'],
            ],
            feeLabel: 'Abo in diesem Monat',
            feeFrom: '5 €',
            feeTo: '0 €',
            feeNote: 'Gedeckt durch 12 Aufgaben im Tierheim',
          },
        },
        {
          agent: 'Einwilligung',
          title: 'Akte teilen. Die Kontrolle behalten.',
          body: 'Geben Sie Ihrer Praxis, einer Versicherung oder neuen Haltern mit einem Klick Zugriff und entziehen Sie ihn jederzeit. Tier aus dem Tierheim? Die Vorgeschichte kommt mit.',
          panel: 'Wer Lunas Akte sieht',
          rows: [
            ['Clínica Veterinaria Sol', 'Vollständige Akte', 'ok'],
            ['Hospital Retiro (Überweisung)', 'Bis 30. Okt.', 'warn'],
            ['Vetsure Versicherung', 'Nur Schadensfälle', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Mit wie vielen Tieren leben Sie?', options: ['1', '2–3', '4 oder mehr', 'Noch keins'] },
        { q: 'Welche Tiere?', options: ['Hund', 'Katze', 'Vogel', 'Kleinsäuger', 'Reptil', 'Andere'], multi: true },
        { q: 'Wo sind ihre Gesundheitsdaten heute?', options: ['Papierausweis', 'Nur beim Tierarzt', 'Fotos auf dem Handy', 'Eine App', 'Nirgends'] },
        { q: 'Wie viele Tierarztbesuche pro Jahr?', options: ['0–1', '2–3', '4 oder mehr'] },
        { q: 'Im letzten Jahr eine Impfung oder einen Termin verpasst?', options: ['Ja', 'Nein', 'Weiß nicht'] },
        { q: 'Welche Funktion würden Sie am meisten nutzen?', options: ['Ausweis-Scan', 'Erinnerungen', 'KI-Agenten fragen', 'Ehrenamts-Belohnungen', 'Versicherung', 'Tierheim finden'] },
        { q: 'Würden Sie im Tierheim helfen, um weniger zu zahlen?', options: ['Ja', 'Vielleicht', 'Nein'] },
        { q: 'Dürfen die KI-Agenten die Krankengeschichte lesen?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Welcher Monatspreis ist fair?', options: ['Nur kostenlos', 'Bis 3 €', '3–6 €', '6–10 €', 'Mehr'] },
        { q: 'Bei der Beta mitmachen, sobald sie startet?', options: ['Ja', 'Vielleicht später', 'Nein'] },
      ],
    },
    vets: {
      tab: 'Für Tierarztpraxen',
      who: 'Tierarztpraxen',
      intro: {
        title: 'Weniger Papierkram. Mehr Zeit für das Tier.',
        body: 'Anivera gibt Ihrer Praxis KI-Agenten für Empfang, medizinische Beratung, Lager und Buchhaltung. Jede klinische Entscheidung bleibt beim Tierarzt.',
        bullets: ['Agenten für Empfang, medizinische Beratung, Betrieb und Buchhaltung', 'Notizen diktieren – die KI strukturiert sie', 'Lager und Medikamente als Grafik, Bestellungen vorbereitet'],
      },
      steps: [
        {
          agent: 'KI-Agenten-Team',
          title: 'Ihre KI-Agenten.',
          body: 'Vier Agenten teilen sich die Routinearbeit der Praxis. Sie arbeiten mit der gesamten Krankengeschichte jedes Tieres. Jeder bereitet vor; ein Mensch gibt frei.',
          panel: 'Agenten im Einsatz · heute',
          agents: [
            { name: 'Empfang', job: 'Termine, Erinnerungen und Patientenfluss', stat: '18 Termine' },
            { name: 'Medizinischer Berater', job: 'Liest die ganze Akte, zeigt Risiken und Optionen', stat: '3 Notizen zu prüfen' },
            { name: 'Betrieb', job: 'Lager, Chargen, Verfallsdaten und Bestellungen', stat: '2 Artikel knapp' },
            { name: 'Buchhaltung', job: 'Rechnungen, Zahlungen und Monatsbericht', stat: '4.280 € diesen Monat' },
          ],
        },
        {
          agent: 'Empfang',
          title: 'Der Empfangs-Agent organisiert den Tag.',
          body: 'Halter buchen online. Am Vortag gehen Erinnerungen mit Bestätigen und Absagen raus – weniger Ausfälle, freie Termine werden neu vergeben.',
          panel: 'Patientenfluss · heute',
          rows: [
            ['Angekommen', 'Luna · Border Collie', 'ok'],
            ['Triage', 'Max · dringend, lahmt', 'warn'],
            ['In Behandlung', 'Nala · Impfungen', 'ok'],
            ['Entlassung', 'Simba · Abholung bis 18:30', 'ok'],
          ],
        },
        {
          agent: 'Medizinischer Berater',
          title: 'Behandlung diktieren. Die Akte wird geprüft.',
          body: 'Diktieren Sie während oder nach der Behandlung. Die KI schreibt strukturierte Notizen, und der Medizinische Berater gleicht sie mit Max’ gesamter Krankengeschichte ab. Sie prüfen und signieren.',
          panel: 'Behandlungsnotizen · Max',
          rows: [
            ['Anamnese', 'Lahmheit hinten rechts seit 3 Tagen', 'ai'],
            ['Befund', 'Schmerz bei Kniebeugung, keine Schwellung', 'ai'],
            ['Plan', '10 Tage Ruhe, NSAID 5 Tage', 'ai'],
            ['Medizinischer Berater', 'Magenprobleme unter NSAID 2025 – Magenschutz erwägen', 'warn'],
          ],
        },
        {
          agent: 'Betrieb',
          title: 'Lager und Medikamente auf einen Blick.',
          body: 'Fotografieren Sie Medikamentenetiketten, Lieferantenrechnungen und Laborbefunde. Der Betriebs-Agent hält Bestand, Chargen und Verfallsdaten aktuell, zeigt Knappes als Grafik und bereitet die Bestellung zur Freigabe vor.',
          panel: 'Lager & Medikamente',
          bars: [
            { label: 'Tollwutimpfstoff', value: 20, max: 40, unit: 'Dosen', low: false },
            { label: 'Meloxicam 1,5 mg/ml', value: 3, max: 12, unit: 'Flaschen', low: true },
            { label: 'Amoxicillin 250 mg', value: 18, max: 30, unit: 'Packungen', low: false },
            { label: 'Mikrochips', value: 6, max: 50, unit: 'Stück', low: true },
          ],
          note: '2 Artikel unter Mindestbestand · Bestellung zur Freigabe vorbereitet · nächster Verfall: Tollwut-Charge 04/2027',
        },
        {
          agent: 'Buchhaltung',
          title: 'Der Buchhaltungs-Agent schließt den Tag ab.',
          body: 'Rechnungen entstehen aus der Behandlung, Zahlungen werden abgeglichen und Versicherungsfälle gehen direkt aus der Akte raus. Überweisungen gehen an Kliniken nach deren Leistungen.',
          panel: 'Buchhaltung · heute',
          rows: [
            ['Rechnung · Max', '68,00 € · vorbereitet', 'ok'],
            ['Offene Rechnungen', '3 · Mahnungen vorbereitet', 'warn'],
            ['Versicherungsfall', 'Vetsure · bereit zum Senden', 'ai'],
            ['Überweisung', 'Hospital Retiro · Bildgebung', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Ihre Rolle in der Praxis?', options: ['Inhaber / leitender Tierarzt', 'Tierarzt', 'TFA / Techniker', 'Empfang / Praxismanagement'] },
        { q: 'Wie viele Tierärzte arbeiten dort?', options: ['Nur ich', '2–3', '4–7', '8 oder mehr'] },
        { q: 'Womit dokumentieren Sie heute?', options: ['Papier', 'Tabellen', 'Praxissoftware', 'Gemischt'] },
        { q: 'Stunden Verwaltung pro Tierarzt und Woche?', options: ['Unter 3', '3–6', '6–10', 'Über 10'] },
        { q: 'Größter Zeitfresser?', options: ['Terminausfälle', 'Notizen schreiben', 'Lager', 'Rechnungen', 'Überweisungen', 'Versicherungsformulare'], multi: true },
        { q: 'Welche KI-Agenten würden Sie zuerst einschalten?', options: ['Empfang', 'Medizinischer Berater', 'Betrieb', 'Buchhaltung'], multi: true },
        { q: 'Würden Sie Behandlungsnotizen diktieren?', options: ['Ja', 'Vielleicht', 'Nein'] },
        { q: 'Wie wichtig ist Datenhosting in der EU?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Welcher Monatspreis pro Praxis?', options: ['Unter 50 €', '50–100 €', '100–200 €', 'Über 200 €'] },
        { q: 'Kostenloses 3-Monats-Pilotprojekt?', options: ['Ja', 'Vielleicht später', 'Nein'] },
      ],
    },
    shelters: {
      tab: 'Für Tierheime',
      who: 'Tierheime',
      intro: {
        title: 'Führen Sie das Tierheim. Die KI macht die Verwaltung.',
        body: 'Von der Aufnahme bis zur Vermittlung erfasst Anivera jedes Tier, jeden Zwinger, jede Behandlung und jeden Futtersack – am PC im Büro und am Handy im Tierbereich.',
        bullets: ['Agenten für Empfang, medizinische Beratung, Betrieb und Buchhaltung', 'Aufnahme per Stimme und eine Pflegetafel für das ganze Team', 'Futter- und Medikamentenbestand als Grafik'],
      },
      steps: [
        {
          agent: 'KI-Agenten-Team',
          title: 'Ihre KI-Agenten.',
          body: 'Vier Agenten nehmen Ihrem Team die Verwaltung ab. Sie arbeiten mit der gesamten Krankengeschichte jedes Tieres. Jeder bereitet vor; ein Mensch gibt frei.',
          panel: 'Agenten im Einsatz · heute',
          agents: [
            { name: 'Empfang', job: 'Besuche, Gassi-Anfragen und Nachrichten von Adoptanten', stat: '6 Besuche heute' },
            { name: 'Medizinischer Berater', job: 'Liest die Akte jedes Tieres, meldet Fälliges', stat: '4 diese Woche fällig' },
            { name: 'Betrieb', job: 'Futter, Medikamente, Material und Verfallsdaten', stat: '2 Artikel knapp' },
            { name: 'Buchhaltung', job: 'Spenden, Schutzgebühren und Ausgabenbericht', stat: '1.240 € gespendet' },
          ],
        },
        {
          agent: 'Stimme + Foto',
          title: 'Aufnahme in zwei Minuten.',
          body: 'Chip oder Ausweis scannen und sagen, was Sie sehen – „Sprechen zum Ausfüllen“ vervollständigt das Formular. Obhut, Eingangsuntersuchung und Zwinger werden direkt festgelegt.',
          panel: 'Neue Aufnahme',
          rows: [
            ['Tier', 'Rüde · ca. 3 Jahre', 'ai'],
            ['Mikrochip', 'Nicht gefunden', 'warn'],
            ['Obhut', 'Ungeklärt', 'warn'],
            ['Zwinger', 'B-12 · Quarantäne', 'ok'],
          ],
        },
        {
          agent: 'Pflegetafel',
          title: 'Eine Pflegetafel für das Team.',
          body: 'Jedes Tier durchläuft Ankunft → Untersuchung → Station → Behandlung → Beobachtung → Abgang. Team und Ehrenamtliche sehen ihre Aufgaben auf dem Handy, und Ehrenamtliche sammeln für jede Aufgabe Punkte.',
          panel: 'Pflegetafel · heute',
          rows: [
            ['Untersuchung', '3 Neuankömmlinge', 'warn'],
            ['Behandlung', 'Kira · Antibiotikum 2×/Tag', 'ok'],
            ['Beobachtung', 'Rocky · nach OP', 'ok'],
            ['Ehrenamtliche', '14 Aufgaben heute erledigt', 'ok'],
          ],
        },
        {
          agent: 'Betrieb',
          title: 'Futter und Medikamente als Grafik.',
          body: 'Fotografieren Sie Futteretiketten und Lieferantenrechnungen. Der Betriebs-Agent liest Zusammensetzung, Kalorien und Haltbarkeit, zeigt den Bestand als Grafik und bereitet die Bestellung vor, bevor etwas ausgeht.',
          panel: 'Lager · Futter & Medikamente',
          bars: [
            { label: 'Trockenfutter adult 15 kg', value: 6, max: 20, unit: 'Säcke', low: true },
            { label: 'Welpenfutter 3 kg', value: 14, max: 15, unit: 'Säcke', low: false },
            { label: 'Katzenfutter 10 kg', value: 9, max: 12, unit: 'Säcke', low: false },
            { label: 'Antiparasitikum', value: 4, max: 30, unit: 'Dosen', low: true },
          ],
          note: 'Futter für 9 Tage · Bestellung vorbereitet · Etikett gelesen: Protein 26 %, 3.650 kcal/kg',
        },
        {
          agent: 'Buchhaltung',
          title: 'Vermittlung und Buchhaltung, richtig gemacht.',
          body: 'Interessenten bestehen eine Eignungsprüfung, Ihr Tierarzt gibt frei, und die ganze Akte geht mit dem Tier. Der Buchhaltungs-Agent erfasst Spenden und Schutzgebühren und erstellt den Ausgabenbericht.',
          panel: 'Vermittlung & Buchhaltung',
          rows: [
            ['Toby · Vermittlung', 'Prüfung bestanden · Tierarzt hat freigegeben', 'ok'],
            ['Akte', 'An neue Halter übertragen', 'ai'],
            ['Spenden diesen Monat', '1.240 €', 'ok'],
            ['Ausgabenbericht', 'Bereit zur Prüfung', 'ai'],
          ],
        },
      ],
      questions: [
        { q: 'Ihre Rolle im Tierheim?', options: ['Leitung', 'Tierarzt', 'Tierpfleger', 'Ehrenamtskoordination', 'Verwaltung'] },
        { q: 'Tiere gleichzeitig in Obhut?', options: ['Unter 20', '20–50', '50–150', 'Über 150'] },
        { q: 'Mitarbeitende und Ehrenamtliche?', options: ['1–5', '6–15', '16–40', 'Über 40'] },
        { q: 'Wie erfassen Sie Tiere heute?', options: ['Papier', 'Tabellen', 'Tierheimsoftware', 'Gemischt'] },
        { q: 'Größter Zeitfresser?', options: ['Aufnahmeformulare', 'Medizinische Nachverfolgung', 'Futter & Lager', 'Vermittlungen', 'Berichte & Spender'], multi: true },
        { q: 'Welche KI-Agenten würden Sie zuerst einschalten?', options: ['Empfang', 'Medizinischer Berater', 'Betrieb', 'Buchhaltung'], multi: true },
        { q: 'Wer ist Ihr Tierarzt?', options: ['Eigener Tierarzt', 'Tierarzt kommt vorbei', 'Externe Praxis'] },
        { q: 'Würden Team und Ehrenamtliche Handys im Tierbereich nutzen?', options: ['Ja', 'Teilweise', 'Nein'] },
        { q: 'Welches Monatsbudget passt?', options: ['Wir brauchen einen Gratistarif', 'Unter 30 €', '30–80 €', 'Über 80 €'] },
        { q: 'Kostenloses 3-Monats-Pilotprojekt?', options: ['Ja', 'Vielleicht später', 'Nein'] },
      ],
    },
  },
};

const ro: Presentation = {
  ui: {
    eyebrow: 'Cum funcționează Anivera',
    stepOf: 'Pasul {n} din {total}',
    progressIntro: 'Intro',
    progressStep: 'Pasul {n}',
    progressQuestions: 'Întrebări',
    start: 'Vezi cum funcționează',
    next: 'Înainte',
    back: 'Înapoi',
    toQuestions: 'Răspunde la 10 întrebări',
    lastStep: 'Ultimul pas · cam 2 minute',
    qTitle: 'Ți s-ar potrivi Anivera?',
    qBody: 'Zece întrebări scurte. Răspunsurile tale ne spun ce construim mai întâi și dacă un pilot ți se potrivește.',
    questionLabel: 'Întrebarea',
    multiHint: 'Alege toate variantele potrivite',
    scaleHint: '1 = deloc · 5 = foarte mult',
    name: 'Numele tău',
    namePh: 'ex. Ana Popescu',
    email: 'Email (opțional)',
    emailPh: 'Ca să te invităm la pilot',
    org: { vets: 'Numele cabinetului', shelters: 'Numele adăpostului' },
    orgPh: { vets: 'ex. Cabinet Veterinar Soare', shelters: 'ex. Adăpostul Speranța' },
    consent: 'Sunt de acord ca Anivera să îmi păstreze răspunsurile pentru a mă contacta despre produs. Fără liste de marketing, le poți șterge oricând.',
    submit: 'Trimite răspunsurile',
    sending: 'Se trimite…',
    missing: 'Adaugă-ți numele, răspunde la toate cele 10 întrebări și bifează acordul.',
    error: 'Răspunsurile nu au putut fi salvate. Încearcă din nou.',
    thanksTitle: 'Mulțumim, {name}!',
    thanksBody: 'Răspunsurile tale au fost salvate. Dacă ai lăsat un email, te invităm la pilot imediat ce pornește.',
    another: 'Vezi alt caz',
    home: 'Înapoi acasă',
    status: { ok: '✓ Gata', ai: 'AI · verifică', warn: 'Atenție', user: 'Tu' },
    lowStock: 'Scăzut',
    agents: ['Recepție', 'Consilier medical', 'Operațiuni', 'Contabilitate'],
  },
  cases: {
    users: {
      tab: 'Pentru stăpâni de animale',
      who: 'Stăpâni de animale',
      intro: {
        title: 'Fiecare animal, un dosar controlat de tine.',
        body: 'Anivera păstrează pașaportul, vaccinurile, vizitele, hrana și întrebările despre animalul tău într-un singur loc – iar agenții AI se ocupă de hârtii în locul tău.',
        bullets: ['Abonament lunar mic – sarcinile la adăpost îl pot aduce la 0 €', 'Agenți AI care cunosc istoricul medical al animalului tău', 'Tu decizi cine vede dosarul'],
      },
      steps: [
        {
          agent: 'Foto în text',
          title: 'Fotografiază pașaportul. AI completează dosarul.',
          body: 'Fă o poză pașaportului. Anivera citește numele, cipul, rasa și vaccinurile. Tu verifici fiecare câmp înainte de salvare.',
          panel: 'Animal nou · pașaport',
          rows: [
            ['Nume', 'Luna', 'ok'],
            ['Microcip', '941 000 024 519 873', 'ok'],
            ['Specie · Rasă', 'Câine · Border Collie', 'ok'],
            ['Vaccin antirabic', '12 mar. 2026', 'ai'],
            ['Următorul rapel', '12 mar. 2027', 'ai'],
          ],
        },
        {
          agent: 'Recepție',
          title: 'Programează-te la veterinar. Nu mai rata nicio vizită.',
          body: 'Faci programarea în câteva atingeri. Cu o zi înainte primești un memento pe WhatsApp, Telegram, SMS sau email, cu Confirmă și Anulează.',
          panel: 'Vizită mâine · 10:30',
          rows: [
            ['Cabinet', 'Clínica Veterinaria Sol', 'ok'],
            ['Motiv', 'Control anual + rapel', 'ok'],
            ['Memento prin', 'WhatsApp', 'ok'],
            ['Răspunsul tău', 'Confirmă · Anulează', 'ai'],
          ],
        },
        {
          agent: 'Agenți de îngrijire',
          title: 'Agenți AI care îți cunosc animalul.',
          body: 'Agenții tăi citesc tot istoricul medical al Lunei – vaccinuri, vizite, alergii și tratamente – ca fiecare răspuns să fie potrivit pentru ea. Întreabă Consilierul medical, Nutriționistul, Coach-ul de bunăstare sau Dresorul. Tratamentul îl decide tot medicul veterinar.',
          panel: 'Întreabă Anivera',
          rows: [
            ['Tu', 'Luna se scarpină des la urechi', 'user'],
            ['Consilier medical', 'A avut o otită în martie și poate a revenit. Programează un control săptămâna asta.', 'ai'],
            ['Nutriționist', 'Dosarul arată alergie la pui. Hrana asta nu conține pui – e sigură pentru ea.', 'ai'],
          ],
        },
        {
          agent: 'Recompense de voluntariat',
          title: 'Ajută la un adăpost. Câștigă insigne. Plătește mai puțin.',
          body: 'Fă voluntariat la adăposturi din apropiere: scanezi codul QR al cuștii, apoi plimbi, hrănești, periezi sau cureți. Fiecare sarcină aduce 10 puncte și deblochează insigne – iar cu destule sarcini într-o lună abonamentul ajunge la 0 €.',
          panel: 'Scorul tău de voluntar',
          game: {
            scoreLabel: 'Puncte',
            score: 340,
            badge: 'Plimbăreț de bază',
            next: 'Următoarea insignă: Mâna adăpostului la 700',
            progress: 0.1,
            badges: [
              { name: 'Lăbuță nouă', points: 30, earned: true },
              { name: 'Prieten de adăpost', points: 100, earned: true },
              { name: 'Plimbăreț de bază', points: 300, earned: true },
              { name: 'Mâna adăpostului', points: 700, earned: false },
              { name: 'Ocrotitor', points: 1500, earned: false },
            ],
            tasksLabel: 'Săptămâna asta',
            tasks: [
              ['Plimbare · Rocky · Refugio Esperanza', '+10'],
              ['Hrănire · Kira', '+10'],
              ['Curățat cușca B-12', '+10'],
            ],
            feeLabel: 'Abonamentul lunii acesteia',
            feeFrom: '5 €',
            feeTo: '0 €',
            feeNote: 'Acoperit de 12 sarcini la adăpost',
          },
        },
        {
          agent: 'Consimțământ',
          title: 'Partajezi dosarul. Rămâi la control.',
          body: 'Dai acces medicului, unei asigurări sau unui nou stăpân cu o atingere și îl retragi când vrei. Adopți de la un adăpost? Istoricul vine odată cu animalul.',
          panel: 'Cine vede dosarul Lunei',
          rows: [
            ['Clínica Veterinaria Sol', 'Dosar complet', 'ok'],
            ['Hospital Retiro (trimitere)', 'Până pe 30 oct.', 'warn'],
            ['Asigurare Vetsure', 'Doar daune', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Cu câte animale locuiești?', options: ['1', '2–3', '4 sau mai multe', 'Încă niciunul'] },
        { q: 'Ce animale?', options: ['Câine', 'Pisică', 'Pasăre', 'Mamifer mic', 'Reptilă', 'Altul'], multi: true },
        { q: 'Unde sunt azi datele lor medicale?', options: ['Pașaport pe hârtie', 'Doar la veterinar', 'Poze pe telefon', 'O aplicație', 'Nicăieri'] },
        { q: 'Câte vizite la veterinar pe an?', options: ['0–1', '2–3', '4 sau mai multe'] },
        { q: 'Ai ratat un vaccin sau o vizită anul trecut?', options: ['Da', 'Nu', 'Nu știu'] },
        { q: 'Ce funcție ai folosi cel mai mult?', options: ['Scanare pașaport', 'Mementouri', 'Întreabă agenții AI', 'Recompense de voluntariat', 'Asigurare', 'Găsește un adăpost'] },
        { q: 'Ai face voluntariat la un adăpost ca să plătești mai puțin?', options: ['Da', 'Poate', 'Nu'] },
        { q: 'Ești de acord ca agenții AI să citească istoricul medical?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Ce preț lunar ți se pare corect?', options: ['Doar gratuit', 'Până la 3 €', '3–6 €', '6–10 €', 'Mai mult'] },
        { q: 'Intri în beta când se deschide?', options: ['Da', 'Poate mai târziu', 'Nu'] },
      ],
    },
    vets: {
      tab: 'Pentru cabinete veterinare',
      who: 'Cabinete veterinare',
      intro: {
        title: 'Mai puține hârtii. Mai mult timp cu animalul.',
        body: 'Anivera dă cabinetului tău agenți AI pentru recepție, consiliere medicală, stoc și contabilitate. Fiecare decizie clinică rămâne a medicului.',
        bullets: ['Agenți de Recepție, Consilier medical, Operațiuni și Contabilitate', 'Dictezi notițele; AI le structurează', 'Stoc și medicamente în grafice, comenzi pregătite'],
      },
      steps: [
        {
          agent: 'Echipa de agenți AI',
          title: 'Cunoaște-ți agenții AI.',
          body: 'Patru agenți își împart munca de rutină a cabinetului. Lucrează cu tot istoricul medical al fiecărui animal. Fiecare pregătește; un om aprobă.',
          panel: 'Agenți la lucru · azi',
          agents: [
            { name: 'Recepție', job: 'Programări, mementouri și fluxul pacienților', stat: '18 programări' },
            { name: 'Consilier medical', job: 'Citește tot istoricul, semnalează riscuri și opțiuni', stat: '3 notițe de verificat' },
            { name: 'Operațiuni', job: 'Stoc, loturi, termene de expirare și comenzi', stat: '2 produse pe terminate' },
            { name: 'Contabilitate', job: 'Facturi, plăți și raportul lunar', stat: '4.280 € luna asta' },
          ],
        },
        {
          agent: 'Recepție',
          title: 'Agentul de Recepție organizează ziua.',
          body: 'Stăpânii se programează online. Cu o zi înainte pleacă mementouri cu Confirmă și Anulează, așa că neprezentările scad, iar locurile libere sunt oferite din nou.',
          panel: 'Fluxul pacienților · azi',
          rows: [
            ['Sosit', 'Luna · Border Collie', 'ok'],
            ['Triaj', 'Max · urgent, șchiopătează', 'warn'],
            ['În consultație', 'Nala · vaccinuri', 'ok'],
            ['Plecare', 'Simba · ridicare până la 18:30', 'ok'],
          ],
        },
        {
          agent: 'Consilier medical',
          title: 'Dictezi consultația. Istoricul e verificat.',
          body: 'Dictezi în timpul sau după consultație. AI scrie notițe structurate, iar Consilierul medical le compară cu tot istoricul medical al lui Max. Tu verifici și semnezi.',
          panel: 'Notițe consultație · Max',
          rows: [
            ['Anamneză', 'Șchiopătează pe piciorul posterior drept de 3 zile', 'ai'],
            ['Constatări', 'Durere la flexia genunchiului, fără umflătură', 'ai'],
            ['Plan', 'Repaus 10 zile, AINS 5 zile', 'ai'],
            ['Consilier medical', 'Probleme gastrice la AINS în 2025 – ia în calcul un protector gastric', 'warn'],
          ],
        },
        {
          agent: 'Operațiuni',
          title: 'Stoc și medicamente, dintr-o privire.',
          body: 'Fotografiezi etichete de medicamente, facturi de la furnizori și rezultate de laborator. Agentul de Operațiuni ține la zi stocul, loturile și termenele, arată în grafice ce se termină și pregătește comanda pentru aprobarea ta.',
          panel: 'Stoc și medicamente',
          bars: [
            { label: 'Vaccin antirabic', value: 20, max: 40, unit: 'doze', low: false },
            { label: 'Meloxicam 1,5 mg/ml', value: 3, max: 12, unit: 'flacoane', low: true },
            { label: 'Amoxicilină 250 mg', value: 18, max: 30, unit: 'cutii', low: false },
            { label: 'Microcipuri', value: 6, max: 50, unit: 'buc.', low: true },
          ],
          note: '2 produse sub minim · comandă pregătită pentru aprobare · următoarea expirare: lot antirabic 04/2027',
        },
        {
          agent: 'Contabilitate',
          title: 'Agentul de Contabilitate închide ziua.',
          body: 'Facturile se pregătesc din consultație, plățile sunt reconciliate, iar dosarele de daună pleacă din fișă. Trimiterile merg la spitale după serviciile oferite.',
          panel: 'Contabilitate · azi',
          rows: [
            ['Factură · Max', '68,00 € · pregătită', 'ok'],
            ['Facturi neplătite', '3 · mementouri pregătite', 'warn'],
            ['Dosar de daună', 'Vetsure · gata de trimis', 'ai'],
            ['Trimitere', 'Hospital Retiro · imagistică', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Rolul tău în cabinet?', options: ['Proprietar / medic șef', 'Medic veterinar', 'Asistent / tehnician', 'Recepție / manager'] },
        { q: 'Câți medici lucrează acolo?', options: ['Doar eu', '2–3', '4–7', '8 sau mai mulți'] },
        { q: 'Ce folosiți azi pentru fișe?', options: ['Hârtie', 'Tabele Excel', 'Program de cabinet', 'Un mix'] },
        { q: 'Ore de birocrație pe medic pe săptămână?', options: ['Sub 3', '3–6', '6–10', 'Peste 10'] },
        { q: 'Ce vă consumă cel mai mult timp?', options: ['Neprezentări', 'Scrierea notițelor', 'Stocul', 'Facturile', 'Trimiterile', 'Formulare de asigurare'], multi: true },
        { q: 'Ce agenți AI ați porni primii?', options: ['Recepție', 'Consilier medical', 'Operațiuni', 'Contabilitate'], multi: true },
        { q: 'Ai dicta notițele consultației?', options: ['Da', 'Poate', 'Nu'] },
        { q: 'Cât de important e ca datele să fie găzduite în UE?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Ce preț lunar pe cabinet?', options: ['Sub 50 €', '50–100 €', '100–200 €', 'Peste 200 €'] },
        { q: 'Faceți un pilot gratuit de 3 luni?', options: ['Da', 'Poate mai târziu', 'Nu'] },
      ],
    },
    shelters: {
      tab: 'Pentru adăposturi de animale',
      who: 'Adăposturi de animale',
      intro: {
        title: 'Conduci adăpostul. AI se ocupă de administrativ.',
        body: 'De la preluare la adopție, Anivera urmărește fiecare animal, cușcă, tratament și sac de hrană – pe calculatorul din birou și pe telefon, printre țarcuri.',
        bullets: ['Agenți de Recepție, Consilier medical, Operațiuni și Contabilitate', 'Preluare prin voce și un panou de îngrijire pentru toată echipa', 'Stocul de hrană și medicamente în grafice'],
      },
      steps: [
        {
          agent: 'Echipa de agenți AI',
          title: 'Cunoaște-ți agenții AI.',
          body: 'Patru agenți iau administrativul de pe umerii echipei. Lucrează cu tot istoricul medical al fiecărui animal. Fiecare pregătește; un om aprobă.',
          panel: 'Agenți la lucru · azi',
          agents: [
            { name: 'Recepție', job: 'Vizite, cereri de plimbare și mesaje de la adoptatori', stat: '6 vizite azi' },
            { name: 'Consilier medical', job: 'Citește istoricul fiecărui animal, semnalează ce urmează', stat: '4 săptămâna asta' },
            { name: 'Operațiuni', job: 'Hrană, medicamente, materiale și termene', stat: '2 produse pe terminate' },
            { name: 'Contabilitate', job: 'Donații, taxe de adopție și raportul de cheltuieli', stat: '1.240 € donați' },
          ],
        },
        {
          agent: 'Voce + foto',
          title: 'Preluare în două minute.',
          body: 'Scanezi cipul sau pașaportul și spui ce vezi – „Vorbește ca să completezi” umple formularul. Custodia, inspecția la sosire și cușca se stabilesc la intrare.',
          panel: 'Preluare nouă',
          rows: [
            ['Animal', 'Câine mascul · cca. 3 ani', 'ai'],
            ['Microcip', 'Negăsit', 'warn'],
            ['Custodie', 'Nerezolvată', 'warn'],
            ['Cușcă', 'B-12 · carantină', 'ok'],
          ],
        },
        {
          agent: 'Panou de îngrijire',
          title: 'Un panou de îngrijire pentru echipă.',
          body: 'Fiecare animal trece prin Sosire → Inspecție → Secție → Tratament → Observație → Plecare. Echipa și voluntarii își văd sarcinile pe telefon, iar voluntarii câștigă puncte pentru fiecare sarcină.',
          panel: 'Panou de îngrijire · azi',
          rows: [
            ['Inspecție', '3 sosiri noi', 'warn'],
            ['Tratament', 'Kira · antibiotic de 2×/zi', 'ok'],
            ['Observație', 'Rocky · după operație', 'ok'],
            ['Voluntari', '14 sarcini făcute azi', 'ok'],
          ],
        },
        {
          agent: 'Operațiuni',
          title: 'Hrană și medicamente, în grafice.',
          body: 'Fotografiezi etichetele hranei și facturile furnizorilor. Agentul de Operațiuni citește compoziția, caloriile și expirarea, arată stocul în grafice și pregătește comanda înainte să se termine ceva.',
          panel: 'Stoc · hrană și medicamente',
          bars: [
            { label: 'Hrană uscată adult 15 kg', value: 6, max: 20, unit: 'saci', low: true },
            { label: 'Hrană pui 3 kg', value: 14, max: 15, unit: 'saci', low: false },
            { label: 'Hrană pisici 10 kg', value: 9, max: 12, unit: 'saci', low: false },
            { label: 'Antiparazitar', value: 4, max: 30, unit: 'doze', low: true },
          ],
          note: 'Hrană pentru 9 zile · comandă pregătită · etichetă citită: proteine 26%, 3.650 kcal/kg',
        },
        {
          agent: 'Contabilitate',
          title: 'Adopție și contabilitate, făcute cum trebuie.',
          body: 'Adoptatorii trec o evaluare, medicul adăpostului aprobă, iar tot dosarul pleacă odată cu animalul. Agentul de Contabilitate ține evidența donațiilor și a taxelor de adopție și pregătește raportul de cheltuieli.',
          panel: 'Adopție și contabilitate',
          rows: [
            ['Toby · adopție', 'Evaluare trecută · aprobat de medic', 'ok'],
            ['Dosar', 'Transferat noului stăpân', 'ai'],
            ['Donații luna asta', '1.240 €', 'ok'],
            ['Raport de cheltuieli', 'Gata de verificat', 'ai'],
          ],
        },
      ],
      questions: [
        { q: 'Rolul tău în adăpost?', options: ['Director', 'Medic veterinar', 'Îngrijitor', 'Coordonator voluntari', 'Administrativ'] },
        { q: 'Câte animale aveți în grijă simultan?', options: ['Sub 20', '20–50', '50–150', 'Peste 150'] },
        { q: 'Angajați și voluntari?', options: ['1–5', '6–15', '16–40', 'Peste 40'] },
        { q: 'Cum țineți evidența animalelor azi?', options: ['Hârtie', 'Tabele Excel', 'Program de adăpost', 'Un mix'] },
        { q: 'Ce vă consumă cel mai mult timp?', options: ['Actele de preluare', 'Urmărirea medicală', 'Hrană și stoc', 'Adopțiile', 'Rapoarte și donatori'], multi: true },
        { q: 'Ce agenți AI ați porni primii?', options: ['Recepție', 'Consilier medical', 'Operațiuni', 'Contabilitate'], multi: true },
        { q: 'Cine este medicul vostru?', options: ['Medic propriu', 'Medic care vine în vizită', 'Cabinet extern'] },
        { q: 'Ar folosi echipa și voluntarii telefoanele printre țarcuri?', options: ['Da', 'Unii', 'Nu'] },
        { q: 'Ce buget lunar vă permiteți?', options: ['Avem nevoie de un plan gratuit', 'Sub 30 €', '30–80 €', 'Peste 80 €'] },
        { q: 'Faceți un pilot gratuit de 3 luni?', options: ['Da', 'Poate mai târziu', 'Nu'] },
      ],
    },
  },
};

const sv: Presentation = {
  ui: {
    eyebrow: 'Så fungerar Anivera',
    stepOf: 'Steg {n} av {total}',
    progressIntro: 'Intro',
    progressStep: 'Steg {n}',
    progressQuestions: 'Frågor',
    start: 'Se hur det fungerar',
    next: 'Nästa',
    back: 'Tillbaka',
    toQuestions: 'Svara på 10 frågor',
    lastStep: 'Sista steget · ungefär 2 minuter',
    qTitle: 'Passar Anivera dig?',
    qBody: 'Tio snabba frågor. Dina svar visar oss vad vi ska bygga först och om ett pilotprojekt passar dig.',
    questionLabel: 'Fråga',
    multiHint: 'Välj alla som passar',
    scaleHint: '1 = inte alls · 5 = mycket',
    name: 'Ditt namn',
    namePh: 't.ex. Anna Svensson',
    email: 'E-post (valfritt)',
    emailPh: 'Så att vi kan bjuda in dig till piloten',
    org: { vets: 'Klinikens namn', shelters: 'Djurhemmets namn' },
    orgPh: { vets: 't.ex. Djurkliniken Solen', shelters: 't.ex. Djurhemmet Hoppet' },
    consent: 'Jag godkänner att Anivera sparar mina svar för att kontakta mig om produkten. Inga marknadsföringslistor, radera när du vill.',
    submit: 'Skicka svar',
    sending: 'Skickar…',
    missing: 'Fyll i ditt namn, svara på alla 10 frågor och godkänn samtycket.',
    error: 'Dina svar kunde inte sparas. Försök igen.',
    thanksTitle: 'Tack, {name}!',
    thanksBody: 'Dina svar är sparade. Om du lämnade en e-postadress bjuder vi in dig till piloten så snart den startar.',
    another: 'Se ett annat fall',
    home: 'Till startsidan',
    status: { ok: '✓ Klart', ai: 'AI · granska', warn: 'Obs', user: 'Du' },
    lowStock: 'Lågt',
    agents: ['Reception', 'Medicinsk rådgivare', 'Drift', 'Ekonomi'],
  },
  cases: {
    users: {
      tab: 'För djurägare',
      who: 'Djurägare',
      intro: {
        title: 'Varje djur, en journal som du styr.',
        body: 'Anivera samlar ditt djurs pass, vaccinationer, besök, foder och frågor på ett ställe – och AI-agenter sköter pappersarbetet åt dig.',
        bullets: ['Liten månadsavgift – uppgifter på djurhem kan sänka den till 0 €', 'AI-agenter som känner ditt djurs sjukdomshistorik', 'Du bestämmer vem som ser journalen'],
      },
      steps: [
        {
          agent: 'Foto till text',
          title: 'Fota passet. AI fyller i journalen.',
          body: 'Ta ett foto av djurets pass. Anivera läser namn, chip, ras och vaccinationer. Du kontrollerar varje fält innan det sparas.',
          panel: 'Nytt djur · pass',
          rows: [
            ['Namn', 'Luna', 'ok'],
            ['Mikrochip', '941 000 024 519 873', 'ok'],
            ['Art · Ras', 'Hund · Border Collie', 'ok'],
            ['Rabiesvaccin', '12 mars 2026', 'ai'],
            ['Nästa påfyllnad', '12 mars 2027', 'ai'],
          ],
        },
        {
          agent: 'Reception',
          title: 'Boka veterinären. Missa aldrig ett besök.',
          body: 'Boka hos din veterinär med några tryck. Dagen innan får du en påminnelse via WhatsApp, Telegram, SMS eller e-post med Bekräfta och Avboka.',
          panel: 'Besök i morgon · 10:30',
          rows: [
            ['Klinik', 'Clínica Veterinaria Sol', 'ok'],
            ['Anledning', 'Årskontroll + påfyllnad', 'ok'],
            ['Påminnelse via', 'WhatsApp', 'ok'],
            ['Ditt svar', 'Bekräfta · Avboka', 'ai'],
          ],
        },
        {
          agent: 'Omsorgsagenter',
          title: 'AI-agenter som känner ditt djur.',
          body: 'Dina agenter läser Lunas hela sjukdomshistorik – vaccinationer, besök, allergier och behandlingar – så att varje svar passar just henne. Fråga Medicinsk rådgivare, Nutritionisten, Välmåendecoachen eller Tränaren. Veterinären bestämmer fortfarande behandlingen.',
          panel: 'Fråga Anivera',
          rows: [
            ['Du', 'Luna kliar sig mycket i öronen', 'user'],
            ['Medicinsk rådgivare', 'Hon hade en öroninflammation i mars och den kan ha kommit tillbaka. Boka en kontroll denna vecka.', 'ai'],
            ['Nutritionist', 'Journalen visar kycklingallergi. Det här fodret innehåller ingen kyckling – säkert för henne.', 'ai'],
          ],
        },
        {
          agent: 'Volontärbelöningar',
          title: 'Hjälp till på ett djurhem. Samla märken. Betala mindre.',
          body: 'Volontära på djurhem nära dig: skanna burens QR-kod och gå ut med, mata, borsta eller städa. Varje uppgift ger 10 poäng och låser upp märken – och med tillräckligt många uppgifter i månaden sjunker din prenumeration till 0 €.',
          panel: 'Din volontärpoäng',
          game: {
            scoreLabel: 'Poäng',
            score: 340,
            badge: 'Stammis-promenerare',
            next: 'Nästa märke: Djurhemshjälte vid 700',
            progress: 0.1,
            badges: [
              { name: 'Ny tass', points: 30, earned: true },
              { name: 'Kennelvän', points: 100, earned: true },
              { name: 'Stammis-promenerare', points: 300, earned: true },
              { name: 'Djurhemshjälte', points: 700, earned: false },
              { name: 'Beskyddare', points: 1500, earned: false },
            ],
            tasksLabel: 'Den här veckan',
            tasks: [
              ['Promenad · Rocky · Refugio Esperanza', '+10'],
              ['Matning · Kira', '+10'],
              ['Städa bur B-12', '+10'],
            ],
            feeLabel: 'Prenumeration denna månad',
            feeFrom: '5 €',
            feeTo: '0 €',
            feeNote: 'Täckt av 12 uppgifter på djurhem',
          },
        },
        {
          agent: 'Samtycke',
          title: 'Dela journalen. Behåll kontrollen.',
          body: 'Ge veterinären, ett försäkringsbolag eller en ny ägare åtkomst med ett tryck och ta tillbaka den när du vill. Adopterar du från ett djurhem? Historiken följer med djuret.',
          panel: 'Vem ser Lunas journal',
          rows: [
            ['Clínica Veterinaria Sol', 'Hela journalen', 'ok'],
            ['Hospital Retiro (remiss)', 'Till 30 okt', 'warn'],
            ['Vetsure försäkring', 'Endast skadeärenden', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Hur många djur bor du med?', options: ['1', '2–3', '4 eller fler', 'Inga än'] },
        { q: 'Vilka djur?', options: ['Hund', 'Katt', 'Fågel', 'Smådjur', 'Reptil', 'Annat'], multi: true },
        { q: 'Var finns deras hälsouppgifter i dag?', options: ['Pass på papper', 'Bara hos veterinären', 'Foton i mobilen', 'En app', 'Ingenstans'] },
        { q: 'Hur många veterinärbesök per år?', options: ['0–1', '2–3', '4 eller fler'] },
        { q: 'Missat en vaccination eller ett besök det senaste året?', options: ['Ja', 'Nej', 'Vet inte'] },
        { q: 'Vilken funktion skulle du använda mest?', options: ['Skanna pass', 'Påminnelser', 'Fråga AI-agenterna', 'Volontärbelöningar', 'Försäkring', 'Hitta djurhem'] },
        { q: 'Skulle du volontära på ett djurhem för att betala mindre?', options: ['Ja', 'Kanske', 'Nej'] },
        { q: 'Okej att AI-agenterna läser sjukdomshistoriken?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Vilket månadspris känns rimligt?', options: ['Bara gratis', 'Upp till 3 €', '3–6 €', '6–10 €', 'Mer'] },
        { q: 'Gå med i betan när den öppnar?', options: ['Ja', 'Kanske senare', 'Nej'] },
      ],
    },
    vets: {
      tab: 'För veterinärkliniker',
      who: 'Veterinärkliniker',
      intro: {
        title: 'Mindre pappersarbete. Mer tid med djuret.',
        body: 'Anivera ger din klinik AI-agenter för reception, medicinsk rådgivning, lager och ekonomi. Varje kliniskt beslut stannar hos veterinären.',
        bullets: ['Agenter för reception, medicinsk rådgivning, drift och ekonomi', 'Diktera anteckningar – AI strukturerar dem', 'Lager och läkemedel i diagram, beställningar förberedda'],
      },
      steps: [
        {
          agent: 'AI-agentteam',
          title: 'Möt dina AI-agenter.',
          body: 'Fyra agenter delar på klinikens rutinarbete. De arbetar utifrån varje djurs hela sjukdomshistorik. Var och en förbereder; en människa godkänner.',
          panel: 'Agenter i arbete · i dag',
          agents: [
            { name: 'Reception', job: 'Bokningar, påminnelser och patientflöde', stat: '18 bokningar' },
            { name: 'Medicinsk rådgivare', job: 'Läser hela historiken, flaggar risker och alternativ', stat: '3 anteckningar att granska' },
            { name: 'Drift', job: 'Lager, batcher, utgångsdatum och beställningar', stat: '2 artiklar låga' },
            { name: 'Ekonomi', job: 'Fakturor, betalningar och månadsrapport', stat: '4 280 € denna månad' },
          ],
        },
        {
          agent: 'Reception',
          title: 'Receptionsagenten sköter dagen.',
          body: 'Djurägare bokar online. Dagen innan skickas påminnelser med Bekräfta och Avboka, så uteblivna besök minskar och lediga tider erbjuds igen.',
          panel: 'Patientflöde · i dag',
          rows: [
            ['Anlänt', 'Luna · Border Collie', 'ok'],
            ['Triage', 'Max · akut, haltar', 'warn'],
            ['Under besök', 'Nala · vaccinationer', 'ok'],
            ['Hemgång', 'Simba · hämtas senast 18:30', 'ok'],
          ],
        },
        {
          agent: 'Medicinsk rådgivare',
          title: 'Prata in besöket. Historiken kontrolleras.',
          body: 'Diktera under eller efter besöket. AI skriver strukturerade anteckningar och Medicinsk rådgivare jämför dem med Max hela sjukdomshistorik. Du granskar och signerar.',
          panel: 'Journal · Max',
          rows: [
            ['Anamnes', 'Haltar på höger bakben sedan 3 dagar', 'ai'],
            ['Fynd', 'Smärta vid böjning av knäleden, ingen svullnad', 'ai'],
            ['Plan', 'Vila 10 dagar, NSAID 5 dagar', 'ai'],
            ['Medicinsk rådgivare', 'Magbesvär av NSAID 2025 – överväg magskydd', 'warn'],
          ],
        },
        {
          agent: 'Drift',
          title: 'Lager och läkemedel i en överblick.',
          body: 'Fota läkemedelsetiketter, leverantörsfakturor och labbsvar. Driftagenten håller lager, batcher och utgångsdatum uppdaterade, visar i diagram vad som tar slut och förbereder beställningen för ditt godkännande.',
          panel: 'Lager & läkemedel',
          bars: [
            { label: 'Rabiesvaccin', value: 20, max: 40, unit: 'doser', low: false },
            { label: 'Meloxikam 1,5 mg/ml', value: 3, max: 12, unit: 'flaskor', low: true },
            { label: 'Amoxicillin 250 mg', value: 18, max: 30, unit: 'askar', low: false },
            { label: 'Mikrochip', value: 6, max: 50, unit: 'st', low: true },
          ],
          note: '2 artiklar under miniminivå · beställning förberedd för godkännande · nästa utgång: rabiesbatch 04/2027',
        },
        {
          agent: 'Ekonomi',
          title: 'Ekonomiagenten stänger dagen.',
          body: 'Fakturor skapas från besöket, betalningar stäms av och försäkringsärenden skickas direkt från journalen. Remisser går till djursjukhus utifrån deras tjänster.',
          panel: 'Ekonomi · i dag',
          rows: [
            ['Faktura · Max', '68,00 € · förberedd', 'ok'],
            ['Obetalda fakturor', '3 · påminnelser förberedda', 'warn'],
            ['Försäkringsärende', 'Vetsure · klart att skicka', 'ai'],
            ['Remiss', 'Hospital Retiro · bilddiagnostik', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Din roll på kliniken?', options: ['Ägare / chefsveterinär', 'Veterinär', 'Djursjukskötare / tekniker', 'Reception / chef'] },
        { q: 'Hur många veterinärer arbetar där?', options: ['Bara jag', '2–3', '4–7', '8 eller fler'] },
        { q: 'Vad använder ni för journaler i dag?', options: ['Papper', 'Kalkylark', 'Journalsystem', 'En blandning'] },
        { q: 'Timmar administration per veterinär och vecka?', options: ['Under 3', '3–6', '6–10', 'Över 10'] },
        { q: 'Största tidstjuven?', options: ['Uteblivna besök', 'Skriva journal', 'Lager', 'Fakturor', 'Remisser', 'Försäkringsblanketter'], multi: true },
        { q: 'Vilka AI-agenter skulle ni slå på först?', options: ['Reception', 'Medicinsk rådgivare', 'Drift', 'Ekonomi'], multi: true },
        { q: 'Skulle du diktera journalanteckningar?', options: ['Ja', 'Kanske', 'Nej'] },
        { q: 'Hur viktigt är datalagring inom EU?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Vilket månadspris per klinik?', options: ['Under 50 €', '50–100 €', '100–200 €', 'Över 200 €'] },
        { q: 'Köra en gratis pilot i 3 månader?', options: ['Ja', 'Kanske senare', 'Nej'] },
      ],
    },
    shelters: {
      tab: 'För djurhem',
      who: 'Djurhem',
      intro: {
        title: 'Driv djurhemmet. Låt AI sköta administrationen.',
        body: 'Från intag till adoption håller Anivera koll på varje djur, bur, behandling och foderpåse – på datorn på kontoret och i mobilen ute bland djuren.',
        bullets: ['Agenter för reception, medicinsk rådgivning, drift och ekonomi', 'Intag med rösten och en omsorgstavla för hela teamet', 'Foder- och läkemedelslager i diagram'],
      },
      steps: [
        {
          agent: 'AI-agentteam',
          title: 'Möt dina AI-agenter.',
          body: 'Fyra agenter tar administrationen från ert team. De arbetar utifrån varje djurs hela sjukdomshistorik. Var och en förbereder; en människa godkänner.',
          panel: 'Agenter i arbete · i dag',
          agents: [
            { name: 'Reception', job: 'Besök, promenadförfrågningar och meddelanden från adoptanter', stat: '6 besök i dag' },
            { name: 'Medicinsk rådgivare', job: 'Läser varje djurs historik, flaggar det som ska göras', stat: '4 denna vecka' },
            { name: 'Drift', job: 'Foder, läkemedel, förnödenheter och utgångsdatum', stat: '2 artiklar låga' },
            { name: 'Ekonomi', job: 'Gåvor, adoptionsavgifter och utgiftsrapport', stat: '1 240 € i gåvor' },
          ],
        },
        {
          agent: 'Röst + foto',
          title: 'Intag på två minuter.',
          body: 'Skanna chipet eller passet och säg vad du ser – ”Prata för att fylla i” fyller i formuläret. Vårdnad, ankomstbesiktning och bur bestäms direkt vid dörren.',
          panel: 'Nytt intag',
          rows: [
            ['Djur', 'Hanhund · ca 3 år', 'ai'],
            ['Mikrochip', 'Hittades inte', 'warn'],
            ['Vårdnad', 'Ej löst', 'warn'],
            ['Bur', 'B-12 · karantän', 'ok'],
          ],
        },
        {
          agent: 'Omsorgstavla',
          title: 'En omsorgstavla för teamet.',
          body: 'Varje djur går genom Ankomst → Besiktning → Avdelning → Behandling → Observation → Utskrivning. Personal och volontärer ser sina uppgifter i mobilen, och volontärer får poäng för varje uppgift.',
          panel: 'Omsorgstavla · i dag',
          rows: [
            ['Besiktning', '3 nya ankomster', 'warn'],
            ['Behandling', 'Kira · antibiotika 2 ggr/dag', 'ok'],
            ['Observation', 'Rocky · efter operation', 'ok'],
            ['Volontärer', '14 uppgifter klara i dag', 'ok'],
          ],
        },
        {
          agent: 'Drift',
          title: 'Foder och läkemedel i diagram.',
          body: 'Fota foderetiketter och leverantörsfakturor. Driftagenten läser innehåll, kalorier och bäst före-datum, visar lagret i diagram och förbereder beställningen innan något tar slut.',
          panel: 'Lager · foder & läkemedel',
          bars: [
            { label: 'Torrfoder vuxen 15 kg', value: 6, max: 20, unit: 'säckar', low: true },
            { label: 'Valpfoder 3 kg', value: 14, max: 15, unit: 'säckar', low: false },
            { label: 'Kattfoder 10 kg', value: 9, max: 12, unit: 'säckar', low: false },
            { label: 'Antiparasitmedel', value: 4, max: 30, unit: 'doser', low: true },
          ],
          note: 'Foder för 9 dagar · beställning förberedd · etikett läst: protein 26 %, 3 650 kcal/kg',
        },
        {
          agent: 'Ekonomi',
          title: 'Adoption och ekonomi, rätt gjort.',
          body: 'Adoptanter går igenom en lämplighetsbedömning, er veterinär godkänner och hela journalen följer med djuret. Ekonomiagenten håller koll på gåvor och adoptionsavgifter och förbereder utgiftsrapporten.',
          panel: 'Adoption & ekonomi',
          rows: [
            ['Toby · adoption', 'Bedömning godkänd · veterinären har godkänt', 'ok'],
            ['Journal', 'Överförd till ny ägare', 'ai'],
            ['Gåvor denna månad', '1 240 €', 'ok'],
            ['Utgiftsrapport', 'Klar för granskning', 'ai'],
          ],
        },
      ],
      questions: [
        { q: 'Din roll på djurhemmet?', options: ['Föreståndare', 'Veterinär', 'Djurskötare', 'Volontärsamordnare', 'Administration'] },
        { q: 'Djur i er vård samtidigt?', options: ['Under 20', '20–50', '50–150', 'Över 150'] },
        { q: 'Personal och volontärer?', options: ['1–5', '6–15', '16–40', 'Över 40'] },
        { q: 'Hur håller ni koll på djuren i dag?', options: ['Papper', 'Kalkylark', 'Djurhemssystem', 'En blandning'] },
        { q: 'Största tidstjuven?', options: ['Intagspapper', 'Medicinsk uppföljning', 'Foder & lager', 'Adoptioner', 'Rapporter & givare'], multi: true },
        { q: 'Vilka AI-agenter skulle ni slå på först?', options: ['Reception', 'Medicinsk rådgivare', 'Drift', 'Ekonomi'], multi: true },
        { q: 'Vem är er veterinär?', options: ['Egen veterinär', 'Besökande veterinär', 'Extern klinik'] },
        { q: 'Skulle personal och volontärer använda mobilen ute bland djuren?', options: ['Ja', 'Några', 'Nej'] },
        { q: 'Vilken månadsbudget passar?', options: ['Vi behöver en gratisplan', 'Under 30 €', '30–80 €', 'Över 80 €'] },
        { q: 'Köra en gratis pilot i 3 månader?', options: ['Ja', 'Kanske senare', 'Nej'] },
      ],
    },
  },
};

const fi: Presentation = {
  ui: {
    eyebrow: 'Näin Anivera toimii',
    stepOf: 'Vaihe {n}/{total}',
    progressIntro: 'Intro',
    progressStep: 'Vaihe {n}',
    progressQuestions: 'Kysymykset',
    start: 'Katso, miten se toimii',
    next: 'Seuraava',
    back: 'Takaisin',
    toQuestions: 'Vastaa 10 kysymykseen',
    lastStep: 'Viimeinen vaihe · noin 2 minuuttia',
    qTitle: 'Sopisiko Anivera sinulle?',
    qBody: 'Kymmenen nopeaa kysymystä. Vastauksistasi näemme, mitä rakennamme ensin ja sopiiko pilotti sinulle.',
    questionLabel: 'Kysymys',
    multiHint: 'Valitse kaikki sopivat',
    scaleHint: '1 = ei lainkaan · 5 = erittäin',
    name: 'Nimesi',
    namePh: 'esim. Anna Virtanen',
    email: 'Sähköposti (valinnainen)',
    emailPh: 'Jotta voimme kutsua sinut pilottiin',
    org: { vets: 'Klinikan nimi', shelters: 'Eläinsuojan nimi' },
    orgPh: { vets: 'esim. Eläinklinikka Aurinko', shelters: 'esim. Eläinsuoja Toivo' },
    consent: 'Hyväksyn, että Anivera tallentaa vastaukseni ottaakseen minuun yhteyttä tuotteesta. Ei markkinointilistoja, voit poistaa ne milloin tahansa.',
    submit: 'Lähetä vastaukset',
    sending: 'Lähetetään…',
    missing: 'Lisää nimesi, vastaa kaikkiin 10 kysymykseen ja hyväksy suostumus.',
    error: 'Vastauksia ei voitu tallentaa. Yritä uudelleen.',
    thanksTitle: 'Kiitos, {name}!',
    thanksBody: 'Vastauksesi on tallennettu. Jos jätit sähköpostiosoitteen, kutsumme sinut pilottiin heti kun se alkaa.',
    another: 'Katso toinen tapaus',
    home: 'Etusivulle',
    status: { ok: '✓ Valmis', ai: 'Tekoäly · tarkista', warn: 'Huomio', user: 'Sinä' },
    lowStock: 'Vähissä',
    agents: ['Vastaanotto', 'Lääketieteellinen neuvoja', 'Toiminnot', 'Kirjanpito'],
  },
  cases: {
    users: {
      tab: 'Eläinten omistajille',
      who: 'Eläinten omistajat',
      intro: {
        title: 'Jokaiselle eläimelle yksi tietue, jota sinä hallitset.',
        body: 'Anivera kokoaa lemmikkisi passin, rokotukset, käynnit, ruoan ja kysymykset yhteen paikkaan – ja tekoälyagentit hoitavat paperityöt puolestasi.',
        bullets: ['Pieni kuukausimaksu – eläinsuojan tehtävät voivat laskea sen 0 euroon', 'Tekoälyagentit, jotka tuntevat eläimesi sairaushistorian', 'Sinä päätät, kuka näkee tiedot'],
      },
      steps: [
        {
          agent: 'Kuvasta tekstiksi',
          title: 'Kuvaa passi. Tekoäly täyttää tiedot.',
          body: 'Ota kuva lemmikkipassista. Anivera lukee nimen, sirun, rodun ja rokotukset. Tarkistat jokaisen kentän ennen tallennusta.',
          panel: 'Uusi eläin · passi',
          rows: [
            ['Nimi', 'Luna', 'ok'],
            ['Mikrosiru', '941 000 024 519 873', 'ok'],
            ['Laji · Rotu', 'Koira · Bordercollie', 'ok'],
            ['Raivotautirokote', '12.3.2026', 'ai'],
            ['Seuraava tehoste', '12.3.2027', 'ai'],
          ],
        },
        {
          agent: 'Vastaanotto',
          title: 'Varaa eläinlääkäri. Älä unohda käyntejä.',
          body: 'Varaa aika eläinlääkäriltä muutamalla napautuksella. Edellisenä päivänä saat muistutuksen WhatsAppiin, Telegramiin, tekstiviestinä tai sähköpostiin – Vahvista tai Peru.',
          panel: 'Käynti huomenna · 10.30',
          rows: [
            ['Klinikka', 'Clínica Veterinaria Sol', 'ok'],
            ['Syy', 'Vuositarkastus + tehoste', 'ok'],
            ['Muistutus', 'WhatsApp', 'ok'],
            ['Vastauksesi', 'Vahvista · Peru', 'ai'],
          ],
        },
        {
          agent: 'Hoitoagentit',
          title: 'Tekoälyagentit, jotka tuntevat eläimesi.',
          body: 'Agenttisi lukevat Lunan koko sairaushistorian – rokotukset, käynnit, allergiat ja hoidot – jotta jokainen vastaus sopii juuri hänelle. Kysy Lääketieteelliseltä neuvojalta, Ravitsemusneuvojalta, Hyvinvointivalmentajalta tai Kouluttajalta. Hoidosta päättää silti eläinlääkäri.',
          panel: 'Kysy Aniveralta',
          rows: [
            ['Sinä', 'Luna raapii korviaan paljon', 'user'],
            ['Lääketieteellinen neuvoja', 'Hänellä oli korvatulehdus maaliskuussa, ja se voi olla palannut. Varaa tarkastus tälle viikolle.', 'ai'],
            ['Ravitsemusneuvoja', 'Tiedoissa on kana-allergia. Tässä ruoassa ei ole kanaa – turvallinen hänelle.', 'ai'],
          ],
        },
        {
          agent: 'Vapaaehtoispalkinnot',
          title: 'Auta eläinsuojassa. Kerää merkkejä. Maksa vähemmän.',
          body: 'Toimi vapaaehtoisena lähistön eläinsuojissa: skannaa häkin QR-koodi ja ulkoiluta, ruoki, harjaa tai siivoa. Jokainen tehtävä tuo 10 pistettä ja avaa merkkejä – ja kun tehtäviä on kuussa tarpeeksi, tilauksesi laskee 0 euroon.',
          panel: 'Vapaaehtoispisteesi',
          game: {
            scoreLabel: 'Pisteet',
            score: 340,
            badge: 'Vakiolenkkeilijä',
            next: 'Seuraava merkki: Suojan tukija 700 pisteellä',
            progress: 0.1,
            badges: [
              { name: 'Uusi tassu', points: 30, earned: true },
              { name: 'Tarhaystävä', points: 100, earned: true },
              { name: 'Vakiolenkkeilijä', points: 300, earned: true },
              { name: 'Suojan tukija', points: 700, earned: false },
              { name: 'Suojelija', points: 1500, earned: false },
            ],
            tasksLabel: 'Tällä viikolla',
            tasks: [
              ['Ulkoilutus · Rocky · Refugio Esperanza', '+10'],
              ['Ruokinta · Kira', '+10'],
              ['Häkin B-12 siivous', '+10'],
            ],
            feeLabel: 'Tämän kuun tilaus',
            feeFrom: '5 €',
            feeTo: '0 €',
            feeNote: 'Katettu 12 eläinsuojatehtävällä',
          },
        },
        {
          agent: 'Suostumus',
          title: 'Jaa tiedot. Pidä ohjat käsissäsi.',
          body: 'Anna eläinlääkärille, vakuutusyhtiölle tai uudelle omistajalle pääsy yhdellä napautuksella ja peru se milloin haluat. Adoptoitko eläinsuojasta? Historia tulee eläimen mukana.',
          panel: 'Kuka näkee Lunan tiedot',
          rows: [
            ['Clínica Veterinaria Sol', 'Kaikki tiedot', 'ok'],
            ['Hospital Retiro (lähete)', '30.10. asti', 'warn'],
            ['Vetsure-vakuutus', 'Vain korvaushakemukset', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Montako eläintä kanssasi asuu?', options: ['1', '2–3', '4 tai enemmän', 'Ei vielä yhtään'] },
        { q: 'Mitä eläimiä?', options: ['Koira', 'Kissa', 'Lintu', 'Pieneläin', 'Matelija', 'Muu'], multi: true },
        { q: 'Missä niiden terveystiedot ovat nyt?', options: ['Paperipassi', 'Vain eläinlääkärillä', 'Kuvat puhelimessa', 'Sovellus', 'Ei missään'] },
        { q: 'Montako eläinlääkärikäyntiä vuodessa?', options: ['0–1', '2–3', '4 tai enemmän'] },
        { q: 'Onko rokotus tai käynti unohtunut viime vuonna?', options: ['Kyllä', 'Ei', 'En tiedä'] },
        { q: 'Mitä ominaisuutta käyttäisit eniten?', options: ['Passin skannaus', 'Muistutukset', 'Kysy agenteilta', 'Vapaaehtoispalkinnot', 'Vakuutus', 'Löydä eläinsuoja'] },
        { q: 'Tekisitkö vapaaehtoistyötä eläinsuojassa maksaaksesi vähemmän?', options: ['Kyllä', 'Ehkä', 'En'] },
        { q: 'Saavatko tekoälyagentit lukea sairaushistorian?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Mikä kuukausihinta tuntuu reilulta?', options: ['Vain ilmainen', 'Enintään 3 €', '3–6 €', '6–10 €', 'Enemmän'] },
        { q: 'Liitytkö betaan, kun se avautuu?', options: ['Kyllä', 'Ehkä myöhemmin', 'En'] },
      ],
    },
    vets: {
      tab: 'Eläinlääkäriasemille',
      who: 'Eläinlääkäriasemat',
      intro: {
        title: 'Vähemmän paperityötä. Enemmän aikaa eläimelle.',
        body: 'Anivera antaa vastaanotollesi tekoälyagentit ajanvaraukseen, lääketieteelliseen neuvontaan, varastoon ja kirjanpitoon. Jokainen kliininen päätös jää eläinlääkärille.',
        bullets: ['Vastaanotto-, neuvonta-, toiminto- ja kirjanpitoagentit', 'Sanele merkinnät – tekoäly jäsentää ne', 'Varasto ja lääkkeet kaavioina, tilaukset valmiina'],
      },
      steps: [
        {
          agent: 'Tekoälyagenttitiimi',
          title: 'Tapaa tekoälyagenttisi.',
          body: 'Neljä agenttia jakaa vastaanoton rutiinityöt. Ne työskentelevät jokaisen eläimen koko sairaushistorian pohjalta. Jokainen valmistelee; ihminen hyväksyy.',
          panel: 'Agentit työssä · tänään',
          agents: [
            { name: 'Vastaanotto', job: 'Ajanvaraukset, muistutukset ja potilasvirta', stat: '18 varausta' },
            { name: 'Lääketieteellinen neuvoja', job: 'Lukee koko historian, nostaa esiin riskit ja vaihtoehdot', stat: '3 merkintää tarkistettavana' },
            { name: 'Toiminnot', job: 'Varasto, erät, viimeiset käyttöpäivät ja tilaukset', stat: '2 tuotetta vähissä' },
            { name: 'Kirjanpito', job: 'Laskut, maksut ja kuukausiraportti', stat: '4 280 € tässä kuussa' },
          ],
        },
        {
          agent: 'Vastaanotto',
          title: 'Vastaanottoagentti pyörittää päivää.',
          body: 'Omistajat varaavat ajan verkossa. Edellisenä päivänä lähtevät muistutukset, joissa on Vahvista ja Peru – poisjäännit vähenevät ja vapautuneet ajat tarjotaan uudelleen.',
          panel: 'Potilasvirta · tänään',
          rows: [
            ['Saapunut', 'Luna · Bordercollie', 'ok'],
            ['Triage', 'Max · kiireellinen, ontuu', 'warn'],
            ['Vastaanotolla', 'Nala · rokotukset', 'ok'],
            ['Lähdössä', 'Simba · haku klo 18.30 mennessä', 'ok'],
          ],
        },
        {
          agent: 'Lääketieteellinen neuvoja',
          title: 'Sanele käynti. Historia tarkistetaan.',
          body: 'Sanele käynnin aikana tai sen jälkeen. Tekoäly kirjoittaa jäsennellyt merkinnät, ja Lääketieteellinen neuvoja vertaa niitä Maxin koko sairaushistoriaan. Sinä tarkistat ja allekirjoitat.',
          panel: 'Käyntimerkinnät · Max',
          rows: [
            ['Esitiedot', 'Ontunut oikeaa takajalkaa 3 päivää', 'ai'],
            ['Löydökset', 'Kipua polven koukistuksessa, ei turvotusta', 'ai'],
            ['Suunnitelma', 'Lepo 10 päivää, tulehduskipulääke 5 päivää', 'ai'],
            ['Lääketieteellinen neuvoja', 'Vatsavaivoja tulehduskipulääkkeestä 2025 – harkitse mahansuojaa', 'warn'],
          ],
        },
        {
          agent: 'Toiminnot',
          title: 'Varasto ja lääkkeet yhdellä silmäyksellä.',
          body: 'Kuvaa lääke-etiketit, toimittajien laskut ja laboratoriotulokset. Toimintoagentti pitää varaston, erät ja viimeiset käyttöpäivät ajan tasalla, näyttää kaaviona mikä on loppumassa ja valmistelee tilauksen hyväksyttäväksesi.',
          panel: 'Varasto & lääkkeet',
          bars: [
            { label: 'Raivotautirokote', value: 20, max: 40, unit: 'annosta', low: false },
            { label: 'Meloksikaami 1,5 mg/ml', value: 3, max: 12, unit: 'pulloa', low: true },
            { label: 'Amoksisilliini 250 mg', value: 18, max: 30, unit: 'pakkausta', low: false },
            { label: 'Mikrosirut', value: 6, max: 50, unit: 'kpl', low: true },
          ],
          note: '2 tuotetta alle minimin · tilaus valmiina hyväksyttäväksi · seuraava vanheneminen: raivotautierä 04/2027',
        },
        {
          agent: 'Kirjanpito',
          title: 'Kirjanpitoagentti päättää päivän.',
          body: 'Laskut syntyvät käynnistä, maksut täsmäytetään ja vakuutuskorvaushakemukset lähtevät suoraan tiedoista. Lähetteet menevät sairaaloihin niiden palveluiden mukaan.',
          panel: 'Kirjanpito · tänään',
          rows: [
            ['Lasku · Max', '68,00 € · valmisteltu', 'ok'],
            ['Maksamattomat laskut', '3 · muistutukset valmiina', 'warn'],
            ['Korvaushakemus', 'Vetsure · valmis lähetettäväksi', 'ai'],
            ['Lähete', 'Hospital Retiro · kuvantaminen', 'ok'],
          ],
        },
      ],
      questions: [
        { q: 'Roolisi vastaanotolla?', options: ['Omistaja / vastaava eläinlääkäri', 'Eläinlääkäri', 'Eläinhoitaja / teknikko', 'Vastaanotto / esihenkilö'] },
        { q: 'Montako eläinlääkäriä siellä työskentelee?', options: ['Vain minä', '2–3', '4–7', '8 tai enemmän'] },
        { q: 'Millä kirjaatte tiedot nyt?', options: ['Paperilla', 'Taulukoilla', 'Potilastieto-ohjelmalla', 'Sekaisin'] },
        { q: 'Hallintotyötunteja eläinlääkäriä kohden viikossa?', options: ['Alle 3', '3–6', '6–10', 'Yli 10'] },
        { q: 'Suurin ajanhukka?', options: ['Poisjäännit', 'Merkintöjen kirjoitus', 'Varasto', 'Laskut', 'Lähetteet', 'Vakuutuslomakkeet'], multi: true },
        { q: 'Mitkä tekoälyagentit ottaisitte käyttöön ensin?', options: ['Vastaanotto', 'Lääketieteellinen neuvoja', 'Toiminnot', 'Kirjanpito'], multi: true },
        { q: 'Sanelisitko käyntimerkinnät?', options: ['Kyllä', 'Ehkä', 'En'] },
        { q: 'Kuinka tärkeää on tietojen säilytys EU:ssa?', options: ['1', '2', '3', '4', '5'] },
        { q: 'Mikä kuukausihinta vastaanottoa kohden?', options: ['Alle 50 €', '50–100 €', '100–200 €', 'Yli 200 €'] },
        { q: 'Kokeiletteko ilmaista 3 kuukauden pilottia?', options: ['Kyllä', 'Ehkä myöhemmin', 'Ei'] },
      ],
    },
    shelters: {
      tab: 'Eläinsuojille',
      who: 'Eläinsuojat',
      intro: {
        title: 'Johda eläinsuojaa. Tekoäly hoitaa hallinnon.',
        body: 'Vastaanotosta adoptioon Anivera seuraa jokaista eläintä, häkkiä, hoitoa ja ruokasäkkiä – toimiston tietokoneella ja puhelimessa eläinten luona.',
        bullets: ['Vastaanotto-, neuvonta-, toiminto- ja kirjanpitoagentit', 'Vastaanotto puheella ja hoitotaulu koko tiimille', 'Ruoka- ja lääkevarasto kaavioina'],
      },
      steps: [
        {
          agent: 'Tekoälyagenttitiimi',
          title: 'Tapaa tekoälyagenttisi.',
          body: 'Neljä agenttia vie hallintotyön tiimiltänne. Ne työskentelevät jokaisen eläimen koko sairaushistorian pohjalta. Jokainen valmistelee; ihminen hyväksyy.',
          panel: 'Agentit työssä · tänään',
          agents: [
            { name: 'Vastaanotto', job: 'Vierailut, ulkoilutuspyynnöt ja adoptoijien viestit', stat: '6 vierailua tänään' },
            { name: 'Lääketieteellinen neuvoja', job: 'Lukee jokaisen eläimen historian, muistuttaa erääntyvistä', stat: '4 tällä viikolla' },
            { name: 'Toiminnot', job: 'Ruoka, lääkkeet, tarvikkeet ja viimeiset käyttöpäivät', stat: '2 tuotetta vähissä' },
            { name: 'Kirjanpito', job: 'Lahjoitukset, adoptiomaksut ja kuluraportti', stat: '1 240 € lahjoituksia' },
          ],
        },
        {
          agent: 'Puhe + kuva',
          title: 'Vastaanotto kahdessa minuutissa.',
          body: 'Skannaa siru tai passi ja kerro, mitä näet – ”Täytä puhumalla” täydentää lomakkeen. Huoltajuus, saapumistarkastus ja häkki määritetään heti ovella.',
          panel: 'Uusi vastaanotto',
          rows: [
            ['Eläin', 'Uroskoira · n. 3 vuotta', 'ai'],
            ['Mikrosiru', 'Ei löytynyt', 'warn'],
            ['Huoltajuus', 'Selvittämättä', 'warn'],
            ['Häkki', 'B-12 · karanteeni', 'ok'],
          ],
        },
        {
          agent: 'Hoitotaulu',
          title: 'Yksi hoitotaulu koko tiimille.',
          body: 'Jokainen eläin kulkee vaiheet Saapuminen → Tarkastus → Osasto → Hoito → Seuranta → Lähtö. Henkilökunta ja vapaaehtoiset näkevät tehtävänsä puhelimessa, ja vapaaehtoiset saavat pisteitä jokaisesta tehtävästä.',
          panel: 'Hoitotaulu · tänään',
          rows: [
            ['Tarkastus', '3 uutta tulokasta', 'warn'],
            ['Hoito', 'Kira · antibiootti 2×/päivä', 'ok'],
            ['Seuranta', 'Rocky · leikkauksen jälkeen', 'ok'],
            ['Vapaaehtoiset', '14 tehtävää tehty tänään', 'ok'],
          ],
        },
        {
          agent: 'Toiminnot',
          title: 'Ruoka ja lääkkeet kaavioina.',
          body: 'Kuvaa ruokaetiketit ja toimittajien laskut. Toimintoagentti lukee koostumuksen, kalorit ja parasta ennen -päivät, näyttää varaston kaaviona ja valmistelee tilauksen ennen kuin mitään loppuu.',
          panel: 'Varasto · ruoka & lääkkeet',
          bars: [
            { label: 'Aikuisten kuivaruoka 15 kg', value: 6, max: 20, unit: 'säkkiä', low: true },
            { label: 'Penturuoka 3 kg', value: 14, max: 15, unit: 'säkkiä', low: false },
            { label: 'Kissanruoka 10 kg', value: 9, max: 12, unit: 'säkkiä', low: false },
            { label: 'Loislääke', value: 4, max: 30, unit: 'annosta', low: true },
          ],
          note: 'Ruokaa 9 päiväksi · tilaus valmiina · etiketti luettu: proteiini 26 %, 3 650 kcal/kg',
        },
        {
          agent: 'Kirjanpito',
          title: 'Adoptio ja kirjanpito oikein hoidettuna.',
          body: 'Adoptoijat läpäisevät soveltuvuusarvion, eläinlääkärinne hyväksyy, ja kaikki tiedot siirtyvät eläimen mukana. Kirjanpitoagentti seuraa lahjoituksia ja adoptiomaksuja ja valmistelee kuluraportin.',
          panel: 'Adoptio & kirjanpito',
          rows: [
            ['Toby · adoptio', 'Arvio läpäisty · eläinlääkäri hyväksynyt', 'ok'],
            ['Tiedot', 'Siirretty uudelle omistajalle', 'ai'],
            ['Lahjoitukset tässä kuussa', '1 240 €', 'ok'],
            ['Kuluraportti', 'Valmis tarkistettavaksi', 'ai'],
          ],
        },
      ],
      questions: [
        { q: 'Roolisi eläinsuojassa?', options: ['Johtaja', 'Eläinlääkäri', 'Hoitaja', 'Vapaaehtoiskoordinaattori', 'Hallinto'] },
        { q: 'Eläimiä hoidossa kerrallaan?', options: ['Alle 20', '20–50', '50–150', 'Yli 150'] },
        { q: 'Henkilökuntaa ja vapaaehtoisia?', options: ['1–5', '6–15', '16–40', 'Yli 40'] },
        { q: 'Miten seuraatte eläimiä nyt?', options: ['Paperilla', 'Taulukoilla', 'Eläinsuojaohjelmalla', 'Sekaisin'] },
        { q: 'Suurin ajanhukka?', options: ['Vastaanoton paperit', 'Terveyden seuranta', 'Ruoka & varasto', 'Adoptiot', 'Raportit & lahjoittajat'], multi: true },
        { q: 'Mitkä tekoälyagentit ottaisitte käyttöön ensin?', options: ['Vastaanotto', 'Lääketieteellinen neuvoja', 'Toiminnot', 'Kirjanpito'], multi: true },
        { q: 'Kuka on eläinlääkärinne?', options: ['Oma eläinlääkäri', 'Vieraileva eläinlääkäri', 'Ulkoinen klinikka'] },
        { q: 'Käyttäisivätkö henkilökunta ja vapaaehtoiset puhelimia eläinten luona?', options: ['Kyllä', 'Osa', 'Ei'] },
        { q: 'Mikä kuukausibudjetti sopii?', options: ['Tarvitsemme ilmaisen paketin', 'Alle 30 €', '30–80 €', 'Yli 80 €'] },
        { q: 'Kokeiletteko ilmaista 3 kuukauden pilottia?', options: ['Kyllä', 'Ehkä myöhemmin', 'Ei'] },
      ],
    },
  },
};

const presentations: Partial<Record<Language, Presentation>> = { en, es, de, ro, sv, fi };

export function getPresentation(language: Language): Presentation {
  return presentations[language] ?? en;
}

// Answers are stored in English so every response in the JSON file is comparable.
export const canonicalPresentation = en;
