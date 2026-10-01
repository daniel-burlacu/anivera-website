import type { Language } from "@/i18n/translation";

// Copy for the "Meet our AI agents" section. Agent roles follow the Anivera blueprint (section 4 and 12)
// and the business logic brief. IDs (A02 ... A15) are the blueprint's, and live in agents-section.tsx.

export interface AgentCopy {
  name: string;
  role: string;
  description: string;
  does: [string, string];
  reviewer: string;
}

export interface BackgroundAgentCopy {
  name: string;
  role: string;
  text: string;
}

interface DepartmentCopy {
  name: string;
  tagline: string;
}

export interface AgentsCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  principle: string;
  stats: [string, string, string, string];
  reviewedBy: string;
  idLabel: string;
  depts: { care: DepartmentCopy; org: DepartmentCopy; behind: DepartmentCopy };
  care: [AgentCopy, AgentCopy, AgentCopy, AgentCopy];
  org: [AgentCopy, AgentCopy, AgentCopy];
  behind: [
    BackgroundAgentCopy,
    BackgroundAgentCopy,
    BackgroundAgentCopy,
    BackgroundAgentCopy,
    BackgroundAgentCopy,
    BackgroundAgentCopy,
    BackgroundAgentCopy,
  ];
  flow: {
    title: string;
    subtitle: string;
    steps: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ];
  };
  guard: {
    title: string;
    items: [
      { title: string; text: string },
      { title: string; text: string },
      { title: string; text: string },
    ];
  };
}

const en: AgentsCopy = {
  eyebrow: "The ANIVERA agents",
  title: "A whole care team that never clocks out",
  subtitle:
    "Fourteen specialised agents share one authorised animal record. Care agents support the animal, organisation agents run the practice, and every result is reviewed by a person before it counts.",
  principle: "AI prepares. A person decides.",
  stats: ["AI agents", "Departments", "Shared animal record", "Reviewed by a person"],
  reviewedBy: "Reviewed by",
  idLabel: "Agent",
  depts: {
    care: {
      name: "Care department",
      tagline: "Clinical and day-to-day support for the animal. These agents do not run the front desk, the stock room or the books.",
    },
    org: {
      name: "Organisation department",
      tagline: "Roles that match how you work: a hospital, a veterinary cabinet and a shelter each receive the ones they need.",
    },
    behind: {
      name: "Working behind the scenes",
      tagline: "Agents nobody has to open. They sit inside the workflow and quietly prepare the next step.",
    },
  },
  care: [
    {
      name: "Medical Adviser",
      role: "Clinical adviser & scribe",
      description:
        "Reads the animal's history, drafts the consultation note from the vet's dictation and prepares clinical proposals. Nothing enters the record until the veterinarian signs.",
      does: ["Summarises the history before the visit", "Turns dictation into a draft note, ready to sign"],
      reviewer: "Veterinarian",
    },
    {
      name: "Well-Being Coach",
      role: "Welfare & enrichment",
      description:
        "Follows welfare observations such as stress, play, rest and socialisation, and prepares enrichment activities that suit each animal.",
      does: ["Logs wellbeing and socialisation events", "Suggests enrichment matched to the animal"],
      reviewer: "Care team",
    },
    {
      name: "Nutritionist",
      role: "Feeding & weight",
      description:
        "Tracks food intake and weight over time and supports the approved feeding plan. A schedule is not a feeding, so it follows what was actually given.",
      does: ["Charts weight and every real feeding", "Supports approved feeding plans"],
      reviewer: "Veterinarian",
    },
    {
      name: "Trainer",
      role: "Handling & training",
      description:
        "Supports handling plans, animal training and the competence of the people who work with the animals, from volunteers to trained employees.",
      does: ["Builds step-by-step handling plans", "Tracks handler courses and competence"],
      reviewer: "Veterinarian",
    },
  ],
  org: [
    {
      name: "Front Desk",
      role: "Reception & appointments",
      description:
        "Serves each practice's own presentation page: answers enquiries, takes appointment requests and sends reminders on the channel the owner chose. A request is not a booking until the practice confirms it.",
      does: [
        "Request with reason, note and preferred time",
        "WhatsApp, Telegram, SMS or email, never clinical details",
      ],
      reviewer: "Reception",
    },
    {
      name: "Operations",
      role: "Stock & supply",
      description:
        "Plans supply, tracks batch and expiry, and proposes orders from stock and the animals that are due. For a shelter it shows how many days the food on hand will cover.",
      does: ["Low-stock signals become proposed orders", "Stock changes only when a delivery is received"],
      reviewer: "Manager & veterinarian",
    },
    {
      name: "Accounting",
      role: "Money & tax",
      description:
        "Prepares records, reconciliations and reports: income, expenses, donations and the figures behind tax. It flags missing records and never invents amounts or files a return.",
      does: ["Reconciles invoices, payments and donations", "Feeds the public donation and spending report"],
      reviewer: "Manager",
    },
  ],
  behind: [
    { name: "Triage & escalation", role: "Urgency", text: "Structures a health concern, supports the urgency call under approved protocols and routes it to clinical attention." },
    { name: "Daily Care Coordinator", role: "Follow-through", text: "Organises approved care: preventive reminders, pending results, missed follow-ups and shift handovers." },
    { name: "Population Health Monitor", role: "Early signals", text: "Spots possible illness clusters and capacity strain and asks the shelter vet to review. A signal to investigate, never a confirmed outbreak." },
    { name: "Registration Verification", role: "Onboarding", text: "Checks a new organisation's documents against the college register, EU VAT and existing accounts. It never approves, rejects or contacts anyone." },
    { name: "Product Support", role: "Platform help", text: "Explains Anivera's features, routes software problems and always shows the manual or urgent route." },
    { name: "Seller Stock", role: "Connected service", text: "Stock planning for food sellers and authorised professional pharmaceutical catalogues." },
    { name: "Campaign Assistant", role: "Connected service", text: "Prepares campaigns for approved audiences. Nothing is published without approval." },
  ],
  flow: {
    title: "One animal, five hand-offs",
    subtitle: "The agents pass work along defined routes. Each step names who prepared it and who decides.",
    steps: [
      { title: "An owner asks for an appointment", text: "Front Desk takes the request with its reason, note and preferred time. It stays a request until the practice confirms a vet, a time and a room." },
      { title: "A health concern appears", text: "Triage structures the concern and routes it to the duty clinical team under approved protocols." },
      { title: "The consultation", text: "The vet dictates, the Medical Adviser drafts the note, and the vet reviews and signs it." },
      { title: "Follow-through", text: "The Daily Care Coordinator tracks rechecks and pending results while Front Desk reminds the owner one day before." },
      { title: "Paid and recorded", text: "Accounting prepares the reconciliation and the reports for authorised review." },
    ],
  },
  guard: {
    title: "Built so people stay in charge",
    items: [
      { title: "AI prepares, a person decides", text: "Every AI result is reviewed before it counts, and approval applies to the exact proposal version." },
      { title: "Every value shows its source", text: "Photos and voice fill fields beside the page they came from, with a confidence level. Saving always needs a tap." },
      { title: "Failure never blocks care", text: "If a model fails, manual entry and urgent contact stay available. Documents are data, never instructions." },
    ],
  },
};

const es: AgentsCopy = {
  eyebrow: "Los agentes de ANIVERA",
  title: "Un equipo de cuidado completo que nunca termina su turno",
  subtitle:
    "Catorce agentes especializados comparten un único historial animal autorizado. Los agentes de cuidado apoyan al animal, los de organización dirigen la práctica y cada resultado lo revisa una persona antes de que cuente.",
  principle: "La IA prepara. Una persona decide.",
  stats: ["Agentes de IA", "Departamentos", "Historial animal compartido", "Revisado por una persona"],
  reviewedBy: "Revisa",
  idLabel: "Agente",
  depts: {
    care: {
      name: "Departamento de cuidado",
      tagline: "Apoyo clínico y cotidiano para el animal. Estos agentes no llevan la recepción, el almacén ni la contabilidad.",
    },
    org: {
      name: "Departamento de organización",
      tagline: "Roles según cómo trabaja cada uno: hospital, consultorio y refugio reciben los que necesitan.",
    },
    behind: {
      name: "Trabajando entre bastidores",
      tagline: "Agentes que nadie tiene que abrir. Viven dentro del flujo de trabajo y preparan en silencio el siguiente paso.",
    },
  },
  care: [
    {
      name: "Asesor Médico",
      role: "Asesor clínico y escriba",
      description:
        "Lee el historial del animal, redacta la nota de consulta a partir del dictado del veterinario y prepara propuestas clínicas. Nada entra en el historial hasta que el veterinario firma.",
      does: ["Resume el historial antes de la visita", "Convierte el dictado en un borrador listo para firmar"],
      reviewer: "Veterinario",
    },
    {
      name: "Coach de Bienestar",
      role: "Bienestar y enriquecimiento",
      description:
        "Sigue las observaciones de bienestar, como estrés, juego, descanso y socialización, y prepara actividades de enriquecimiento adecuadas a cada animal.",
      does: ["Registra eventos de bienestar y socialización", "Sugiere enriquecimiento adaptado al animal"],
      reviewer: "Equipo de cuidado",
    },
    {
      name: "Nutricionista",
      role: "Alimentación y peso",
      description:
        "Sigue la ingesta y el peso a lo largo del tiempo y apoya el plan de alimentación aprobado. Un horario no es una comida, así que registra lo que realmente se dio.",
      does: ["Grafica el peso y cada comida real", "Apoya los planes de alimentación aprobados"],
      reviewer: "Veterinario",
    },
    {
      name: "Entrenador",
      role: "Manejo y adiestramiento",
      description:
        "Apoya los planes de manejo, el adiestramiento y la competencia de quienes trabajan con los animales, desde voluntarios hasta empleados formados.",
      does: ["Crea planes de manejo paso a paso", "Sigue cursos y competencia del personal"],
      reviewer: "Veterinario",
    },
  ],
  org: [
    {
      name: "Recepción",
      role: "Recepción y citas",
      description:
        "Atiende la página de presentación de cada práctica: responde consultas, recibe solicitudes de cita y envía recordatorios por el canal que eligió el propietario. Una solicitud no es una reserva hasta que la práctica la confirma.",
      does: [
        "Solicitud con motivo, nota y hora preferida",
        "WhatsApp, Telegram, SMS o correo, sin datos clínicos",
      ],
      reviewer: "Recepción",
    },
    {
      name: "Operaciones",
      role: "Stock y suministro",
      description:
        "Planifica el suministro, controla lote y caducidad y propone pedidos a partir del stock y de los animales que lo necesitan. En un refugio muestra cuántos días cubre el alimento disponible.",
      does: ["Las alertas de poco stock se convierten en pedidos propuestos", "El stock cambia solo al recibir la entrega"],
      reviewer: "Gerente y veterinario",
    },
    {
      name: "Contabilidad",
      role: "Dinero e impuestos",
      description:
        "Prepara registros, conciliaciones e informes: ingresos, gastos, donaciones y las cifras para los impuestos. Señala registros que faltan y nunca inventa importes ni presenta una declaración.",
      does: ["Concilia facturas, pagos y donaciones", "Alimenta el informe público de donaciones y gastos"],
      reviewer: "Gerente",
    },
  ],
  behind: [
    { name: "Triaje y escalado", role: "Urgencia", text: "Estructura una preocupación de salud, apoya la valoración de urgencia con protocolos aprobados y la dirige a atención clínica." },
    { name: "Coordinador de Cuidado Diario", role: "Seguimiento", text: "Organiza el cuidado aprobado: recordatorios preventivos, resultados pendientes, seguimientos perdidos y relevos de turno." },
    { name: "Monitor de Salud Poblacional", role: "Señales tempranas", text: "Detecta posibles brotes y saturación de capacidad y pide revisión al veterinario del refugio. Una señal a investigar, nunca un brote confirmado." },
    { name: "Verificación de Registro", role: "Alta de organizaciones", text: "Comprueba los documentos de una nueva organización con el colegio profesional, el IVA de la UE y las cuentas existentes. Nunca aprueba, rechaza ni contacta." },
    { name: "Soporte de Producto", role: "Ayuda de la plataforma", text: "Explica las funciones de Anivera, encamina los problemas de software y muestra siempre la vía manual o urgente." },
    { name: "Stock de Vendedor", role: "Servicio conectado", text: "Planificación de stock para vendedores de alimento y catálogos farmacéuticos profesionales autorizados." },
    { name: "Asistente de Campañas", role: "Servicio conectado", text: "Prepara campañas para audiencias aprobadas. Nada se publica sin aprobación." },
  ],
  flow: {
    title: "Un animal, cinco traspasos",
    subtitle: "Los agentes se pasan el trabajo por rutas definidas. Cada paso indica quién lo preparó y quién decide.",
    steps: [
      { title: "Un propietario pide una cita", text: "Recepción recoge la solicitud con motivo, nota y hora preferida. Sigue siendo una solicitud hasta que la práctica confirma veterinario, hora y sala." },
      { title: "Aparece un problema de salud", text: "Triaje estructura la preocupación y la dirige al equipo clínico de guardia con protocolos aprobados." },
      { title: "La consulta", text: "El veterinario dicta, el Asesor Médico redacta la nota y el veterinario la revisa y la firma." },
      { title: "Seguimiento", text: "El Coordinador de Cuidado Diario controla revisiones y resultados pendientes mientras Recepción avisa al propietario un día antes." },
      { title: "Cobrado y registrado", text: "Contabilidad prepara la conciliación y los informes para su revisión autorizada." },
    ],
  },
  guard: {
    title: "Diseñado para que las personas sigan al mando",
    items: [
      { title: "La IA prepara, una persona decide", text: "Cada resultado de la IA se revisa antes de que cuente, y la aprobación vale para la versión exacta de la propuesta." },
      { title: "Cada valor muestra su origen", text: "Fotos y voz rellenan campos junto a la página de origen, con su nivel de confianza. Guardar siempre requiere un toque." },
      { title: "Un fallo nunca bloquea el cuidado", text: "Si un modelo falla, la entrada manual y el contacto urgente siguen disponibles. Los documentos son datos, nunca instrucciones." },
    ],
  },
};

const de: AgentsCopy = {
  eyebrow: "Die ANIVERA-Agenten",
  title: "Ein komplettes Pflegeteam, das nie Feierabend macht",
  subtitle:
    "Vierzehn spezialisierte Agenten teilen sich eine autorisierte Tierakte. Pflege-Agenten unterstützen das Tier, Organisations-Agenten führen den Betrieb, und jedes Ergebnis prüft eine Person, bevor es zählt.",
  principle: "KI bereitet vor. Ein Mensch entscheidet.",
  stats: ["KI-Agenten", "Abteilungen", "Gemeinsame Tierakte", "Von einer Person geprüft"],
  reviewedBy: "Prüft",
  idLabel: "Agent",
  depts: {
    care: {
      name: "Abteilung Pflege",
      tagline: "Klinische und alltägliche Unterstützung für das Tier. Diese Agenten führen nicht Empfang, Lager oder Buchhaltung.",
    },
    org: {
      name: "Abteilung Organisation",
      tagline: "Rollen passend zur Arbeitsweise: Klinik, Praxis und Tierheim erhalten jeweils die, die sie brauchen.",
    },
    behind: {
      name: "Im Hintergrund",
      tagline: "Agenten, die niemand öffnen muss. Sie sitzen im Ablauf und bereiten leise den nächsten Schritt vor.",
    },
  },
  care: [
    {
      name: "Medizinischer Berater",
      role: "Klinischer Berater & Schreiber",
      description:
        "Liest die Historie des Tieres, entwirft die Konsultationsnotiz aus dem Diktat der Tierärztin oder des Tierarztes und bereitet klinische Vorschläge vor. Nichts gelangt in die Akte, bevor unterschrieben wurde.",
      does: ["Fasst die Historie vor dem Termin zusammen", "Macht aus dem Diktat einen unterschriftsreifen Entwurf"],
      reviewer: "Tierarzt/Tierärztin",
    },
    {
      name: "Wohlbefinden-Coach",
      role: "Wohlbefinden & Beschäftigung",
      description:
        "Verfolgt Beobachtungen zu Stress, Spiel, Ruhe und Sozialisierung und bereitet Beschäftigungsangebote vor, die zu jedem Tier passen.",
      does: ["Erfasst Wohlbefinden und Sozialisierung", "Schlägt passende Beschäftigung vor"],
      reviewer: "Pflegeteam",
    },
    {
      name: "Ernährungsberater",
      role: "Fütterung & Gewicht",
      description:
        "Verfolgt Futteraufnahme und Gewicht über die Zeit und unterstützt den freigegebenen Fütterungsplan. Ein Plan ist keine Fütterung, daher zählt, was tatsächlich gegeben wurde.",
      does: ["Zeigt Gewicht und jede echte Fütterung", "Unterstützt freigegebene Fütterungspläne"],
      reviewer: "Tierarzt/Tierärztin",
    },
    {
      name: "Trainer",
      role: "Umgang & Training",
      description:
        "Unterstützt Umgangspläne, Tiertraining und die Kompetenz der Menschen, die mit den Tieren arbeiten, von Freiwilligen bis zu geschulten Mitarbeitenden.",
      does: ["Erstellt Umgangspläne Schritt für Schritt", "Verfolgt Kurse und Kompetenz"],
      reviewer: "Tierarzt/Tierärztin",
    },
  ],
  org: [
    {
      name: "Empfang",
      role: "Empfang & Termine",
      description:
        "Betreut die eigene Präsentationsseite jeder Praxis: beantwortet Anfragen, nimmt Terminwünsche entgegen und sendet Erinnerungen über den vom Tierhalter gewählten Kanal. Eine Anfrage ist erst eine Buchung, wenn die Praxis bestätigt.",
      does: [
        "Anfrage mit Grund, Hinweis und Wunschzeit",
        "WhatsApp, Telegram, SMS oder E-Mail, nie klinische Details",
      ],
      reviewer: "Empfang",
    },
    {
      name: "Betrieb",
      role: "Lager & Versorgung",
      description:
        "Plant die Versorgung, verfolgt Charge und Verfallsdatum und schlägt Bestellungen aus Bestand und fälligen Tieren vor. Im Tierheim zeigt er, wie viele Tage das vorhandene Futter reicht.",
      does: ["Knappe Bestände werden zu Bestellvorschlägen", "Bestand ändert sich erst beim Wareneingang"],
      reviewer: "Leitung & Tierarzt",
    },
    {
      name: "Buchhaltung",
      role: "Geld & Steuern",
      description:
        "Bereitet Belege, Abstimmungen und Berichte vor: Einnahmen, Ausgaben, Spenden und die Zahlen für die Steuer. Sie meldet fehlende Belege und erfindet keine Beträge und reicht keine Erklärung ein.",
      does: ["Gleicht Rechnungen, Zahlungen und Spenden ab", "Speist den öffentlichen Spenden- und Ausgabenbericht"],
      reviewer: "Leitung",
    },
  ],
  behind: [
    { name: "Triage & Eskalation", role: "Dringlichkeit", text: "Strukturiert ein Gesundheitsanliegen, unterstützt die Dringlichkeitseinschätzung nach freigegebenen Protokollen und leitet es an die klinische Betreuung." },
    { name: "Koordinator Tägliche Pflege", role: "Nachverfolgung", text: "Organisiert die freigegebene Pflege: Vorsorgeerinnerungen, ausstehende Befunde, verpasste Kontrollen und Schichtübergaben." },
    { name: "Bestandsgesundheits-Monitor", role: "Frühsignale", text: "Erkennt mögliche Krankheitscluster und Kapazitätsengpässe und bittet die Tierheim-Tierärzte um Prüfung. Ein Hinweis zum Nachgehen, nie ein bestätigter Ausbruch." },
    { name: "Registrierungsprüfung", role: "Onboarding", text: "Prüft die Dokumente einer neuen Organisation gegen Kammerregister, EU-USt-IdNr. und bestehende Konten. Sie genehmigt, lehnt ab oder kontaktiert nie." },
    { name: "Produktsupport", role: "Plattformhilfe", text: "Erklärt Anivera-Funktionen, leitet Softwareprobleme weiter und zeigt immer den manuellen oder dringenden Weg." },
    { name: "Verkäufer-Bestand", role: "Verbundener Dienst", text: "Bestandsplanung für Futterhändler und autorisierte professionelle Pharmakataloge." },
    { name: "Kampagnen-Assistent", role: "Verbundener Dienst", text: "Bereitet Kampagnen für freigegebene Zielgruppen vor. Ohne Freigabe wird nichts veröffentlicht." },
  ],
  flow: {
    title: "Ein Tier, fünf Übergaben",
    subtitle: "Die Agenten geben Arbeit über definierte Wege weiter. Jeder Schritt nennt, wer vorbereitet und wer entscheidet.",
    steps: [
      { title: "Ein Tierhalter bittet um einen Termin", text: "Der Empfang nimmt die Anfrage mit Grund, Hinweis und Wunschzeit auf. Sie bleibt eine Anfrage, bis die Praxis Tierarzt, Zeit und Raum bestätigt." },
      { title: "Ein Gesundheitsproblem tritt auf", text: "Die Triage strukturiert das Anliegen und leitet es nach freigegebenen Protokollen an das diensthabende klinische Team." },
      { title: "Die Konsultation", text: "Die Tierärztin diktiert, der Medizinische Berater entwirft die Notiz, und sie wird geprüft und unterschrieben." },
      { title: "Nachverfolgung", text: "Der Koordinator Tägliche Pflege verfolgt Kontrollen und Befunde, während der Empfang den Tierhalter einen Tag vorher erinnert." },
      { title: "Bezahlt und gebucht", text: "Die Buchhaltung bereitet Abstimmung und Berichte zur autorisierten Prüfung vor." },
    ],
  },
  guard: {
    title: "So gebaut, dass Menschen die Kontrolle behalten",
    items: [
      { title: "KI bereitet vor, ein Mensch entscheidet", text: "Jedes KI-Ergebnis wird geprüft, bevor es zählt, und die Freigabe gilt für genau diese Version des Vorschlags." },
      { title: "Jeder Wert zeigt seine Quelle", text: "Fotos und Sprache füllen Felder neben der Seite, aus der sie stammen, mit Sicherheitsgrad. Speichern braucht immer einen Tipp." },
      { title: "Ein Ausfall blockiert nie die Versorgung", text: "Fällt ein Modell aus, bleiben manuelle Eingabe und Notfallkontakt verfügbar. Dokumente sind Daten, nie Anweisungen." },
    ],
  },
};

const pt: AgentsCopy = {
  eyebrow: "Os agentes da ANIVERA",
  title: "Uma equipa de cuidado completa que nunca sai de turno",
  subtitle:
    "Catorze agentes especializados partilham um único registo animal autorizado. Os agentes de cuidado apoiam o animal, os de organização gerem a prática e cada resultado é revisto por uma pessoa antes de contar.",
  principle: "A IA prepara. Uma pessoa decide.",
  stats: ["Agentes de IA", "Departamentos", "Registo animal partilhado", "Revisto por uma pessoa"],
  reviewedBy: "Revê",
  idLabel: "Agente",
  depts: {
    care: {
      name: "Departamento de cuidado",
      tagline: "Apoio clínico e diário ao animal. Estes agentes não tratam da receção, do stock nem da contabilidade.",
    },
    org: {
      name: "Departamento de organização",
      tagline: "Papéis conforme o modo de trabalhar: hospital, consultório e abrigo recebem os que precisam.",
    },
    behind: {
      name: "Nos bastidores",
      tagline: "Agentes que ninguém precisa de abrir. Vivem dentro do fluxo e preparam em silêncio o passo seguinte.",
    },
  },
  care: [
    {
      name: "Conselheiro Médico",
      role: "Conselheiro clínico e escriba",
      description:
        "Lê o histórico do animal, redige a nota de consulta a partir do ditado do veterinário e prepara propostas clínicas. Nada entra no registo até o veterinário assinar.",
      does: ["Resume o histórico antes da consulta", "Transforma o ditado num rascunho pronto a assinar"],
      reviewer: "Veterinário",
    },
    {
      name: "Coach de Bem-estar",
      role: "Bem-estar e enriquecimento",
      description:
        "Acompanha observações de bem-estar, como stress, brincadeira, descanso e socialização, e prepara atividades de enriquecimento adequadas a cada animal.",
      does: ["Regista eventos de bem-estar e socialização", "Sugere enriquecimento adaptado ao animal"],
      reviewer: "Equipa de cuidado",
    },
    {
      name: "Nutricionista",
      role: "Alimentação e peso",
      description:
        "Acompanha a ingestão e o peso ao longo do tempo e apoia o plano alimentar aprovado. Um horário não é uma refeição, por isso regista o que foi realmente dado.",
      does: ["Mostra o peso e cada refeição real", "Apoia planos alimentares aprovados"],
      reviewer: "Veterinário",
    },
    {
      name: "Treinador",
      role: "Maneio e treino",
      description:
        "Apoia planos de maneio, treino animal e a competência de quem trabalha com os animais, de voluntários a funcionários formados.",
      does: ["Cria planos de maneio passo a passo", "Acompanha cursos e competência"],
      reviewer: "Veterinário",
    },
  ],
  org: [
    {
      name: "Receção",
      role: "Receção e marcações",
      description:
        "Serve a página de apresentação de cada prática: responde a pedidos, recebe pedidos de marcação e envia lembretes pelo canal escolhido pelo tutor. Um pedido só é marcação quando a prática o confirma.",
      does: [
        "Pedido com motivo, nota e hora preferida",
        "WhatsApp, Telegram, SMS ou email, nunca dados clínicos",
      ],
      reviewer: "Receção",
    },
    {
      name: "Operações",
      role: "Stock e abastecimento",
      description:
        "Planeia o abastecimento, controla lote e validade e propõe encomendas a partir do stock e dos animais que precisam. Num abrigo mostra quantos dias a comida disponível cobre.",
      does: ["Alertas de stock baixo viram propostas de encomenda", "O stock só muda quando a entrega é recebida"],
      reviewer: "Gestor e veterinário",
    },
    {
      name: "Contabilidade",
      role: "Dinheiro e impostos",
      description:
        "Prepara registos, reconciliações e relatórios: receitas, despesas, donativos e os valores para impostos. Assinala registos em falta e nunca inventa montantes nem entrega declarações.",
      does: ["Reconcilia faturas, pagamentos e donativos", "Alimenta o relatório público de donativos e despesas"],
      reviewer: "Gestor",
    },
  ],
  behind: [
    { name: "Triagem e escalada", role: "Urgência", text: "Estrutura uma preocupação de saúde, apoia a avaliação de urgência com protocolos aprovados e encaminha-a para atenção clínica." },
    { name: "Coordenador de Cuidado Diário", role: "Acompanhamento", text: "Organiza o cuidado aprovado: lembretes preventivos, resultados pendentes, seguimentos em falta e passagens de turno." },
    { name: "Monitor de Saúde Populacional", role: "Sinais precoces", text: "Deteta possíveis surtos e sobrecarga de capacidade e pede revisão ao veterinário do abrigo. Um sinal a investigar, nunca um surto confirmado." },
    { name: "Verificação de Registo", role: "Entrada de organizações", text: "Confere os documentos de uma nova organização com a ordem profissional, o IVA da UE e contas existentes. Nunca aprova, rejeita nem contacta." },
    { name: "Suporte de Produto", role: "Ajuda da plataforma", text: "Explica as funções da Anivera, encaminha problemas de software e mostra sempre a via manual ou urgente." },
    { name: "Stock de Vendedor", role: "Serviço ligado", text: "Planeamento de stock para vendedores de alimento e catálogos farmacêuticos profissionais autorizados." },
    { name: "Assistente de Campanhas", role: "Serviço ligado", text: "Prepara campanhas para públicos aprovados. Nada é publicado sem aprovação." },
  ],
  flow: {
    title: "Um animal, cinco passagens",
    subtitle: "Os agentes passam o trabalho por percursos definidos. Cada passo indica quem preparou e quem decide.",
    steps: [
      { title: "Um tutor pede uma marcação", text: "A Receção recolhe o pedido com motivo, nota e hora preferida. Continua a ser um pedido até a prática confirmar veterinário, hora e sala." },
      { title: "Surge uma preocupação de saúde", text: "A Triagem estrutura a preocupação e encaminha-a para a equipa clínica de serviço com protocolos aprovados." },
      { title: "A consulta", text: "O veterinário dita, o Conselheiro Médico redige a nota e o veterinário revê e assina." },
      { title: "Acompanhamento", text: "O Coordenador de Cuidado Diário acompanha revisões e resultados pendentes enquanto a Receção lembra o tutor um dia antes." },
      { title: "Pago e registado", text: "A Contabilidade prepara a reconciliação e os relatórios para revisão autorizada." },
    ],
  },
  guard: {
    title: "Construído para as pessoas continuarem no comando",
    items: [
      { title: "A IA prepara, uma pessoa decide", text: "Cada resultado de IA é revisto antes de contar, e a aprovação vale para a versão exata da proposta." },
      { title: "Cada valor mostra a sua origem", text: "Fotos e voz preenchem campos junto à página de origem, com nível de confiança. Guardar exige sempre um toque." },
      { title: "Uma falha nunca bloqueia o cuidado", text: "Se um modelo falhar, a introdução manual e o contacto urgente continuam disponíveis. Documentos são dados, nunca instruções." },
    ],
  },
};

const fr: AgentsCopy = {
  eyebrow: "Les agents ANIVERA",
  title: "Une équipe de soins complète qui ne s'arrête jamais",
  subtitle:
    "Quatorze agents spécialisés partagent un seul dossier animal autorisé. Les agents de soins soutiennent l'animal, ceux de l'organisation font tourner la structure, et chaque résultat est relu par une personne avant de compter.",
  principle: "L'IA prépare. Une personne décide.",
  stats: ["Agents IA", "Départements", "Dossier animal partagé", "Relu par une personne"],
  reviewedBy: "Relecture",
  idLabel: "Agent",
  depts: {
    care: {
      name: "Département soins",
      tagline: "Soutien clinique et quotidien pour l'animal. Ces agents ne tiennent ni l'accueil, ni le stock, ni les comptes.",
    },
    org: {
      name: "Département organisation",
      tagline: "Des rôles adaptés à votre façon de travailler : hôpital, cabinet et refuge reçoivent ceux dont ils ont besoin.",
    },
    behind: {
      name: "En coulisses",
      tagline: "Des agents que personne n'a besoin d'ouvrir. Ils vivent dans le flux de travail et préparent discrètement l'étape suivante.",
    },
  },
  care: [
    {
      name: "Conseiller Médical",
      role: "Conseiller clinique et scribe",
      description:
        "Lit l'historique de l'animal, rédige la note de consultation à partir de la dictée du vétérinaire et prépare des propositions cliniques. Rien n'entre au dossier avant la signature du vétérinaire.",
      does: ["Résume l'historique avant la visite", "Transforme la dictée en brouillon prêt à signer"],
      reviewer: "Vétérinaire",
    },
    {
      name: "Coach de Bien-être",
      role: "Bien-être et enrichissement",
      description:
        "Suit les observations de bien-être, comme le stress, le jeu, le repos et la socialisation, et prépare des activités d'enrichissement adaptées à chaque animal.",
      does: ["Consigne bien-être et socialisation", "Propose un enrichissement adapté à l'animal"],
      reviewer: "Équipe de soins",
    },
    {
      name: "Nutritionniste",
      role: "Alimentation et poids",
      description:
        "Suit la prise alimentaire et le poids dans le temps et soutient le plan d'alimentation validé. Un horaire n'est pas un repas : il suit ce qui a réellement été donné.",
      does: ["Trace le poids et chaque repas réel", "Soutient les plans d'alimentation validés"],
      reviewer: "Vétérinaire",
    },
    {
      name: "Entraîneur",
      role: "Manipulation et éducation",
      description:
        "Soutient les plans de manipulation, l'éducation des animaux et la compétence de ceux qui travaillent avec eux, des bénévoles aux employés formés.",
      does: ["Construit des plans de manipulation pas à pas", "Suit formations et compétences"],
      reviewer: "Vétérinaire",
    },
  ],
  org: [
    {
      name: "Accueil",
      role: "Accueil et rendez-vous",
      description:
        "Anime la page de présentation de chaque structure : répond aux demandes, reçoit les demandes de rendez-vous et envoie des rappels sur le canal choisi par le propriétaire. Une demande n'est un rendez-vous qu'une fois confirmée par la structure.",
      does: [
        "Demande avec motif, note et horaire souhaité",
        "WhatsApp, Telegram, SMS ou e-mail, jamais de détails cliniques",
      ],
      reviewer: "Accueil",
    },
    {
      name: "Opérations",
      role: "Stock et approvisionnement",
      description:
        "Planifie l'approvisionnement, suit lots et péremptions et propose des commandes selon le stock et les animaux concernés. Pour un refuge, il indique combien de jours couvre la nourriture disponible.",
      does: ["Les alertes de stock bas deviennent des commandes proposées", "Le stock ne change qu'à la réception"],
      reviewer: "Responsable et vétérinaire",
    },
    {
      name: "Comptabilité",
      role: "Argent et impôts",
      description:
        "Prépare écritures, rapprochements et rapports : recettes, dépenses, dons et chiffres pour les impôts. Elle signale les pièces manquantes, n'invente aucun montant et ne dépose aucune déclaration.",
      does: ["Rapproche factures, paiements et dons", "Alimente le rapport public des dons et dépenses"],
      reviewer: "Responsable",
    },
  ],
  behind: [
    { name: "Triage et escalade", role: "Urgence", text: "Structure une préoccupation de santé, appuie l'évaluation de l'urgence selon des protocoles validés et l'oriente vers l'équipe clinique." },
    { name: "Coordinateur des Soins Quotidiens", role: "Suivi", text: "Organise les soins validés : rappels préventifs, résultats en attente, suivis manqués et transmissions d'équipe." },
    { name: "Veille Santé Collective", role: "Signaux précoces", text: "Repère de possibles foyers et des tensions de capacité et demande une revue au vétérinaire du refuge. Un signal à investiguer, jamais une épidémie confirmée." },
    { name: "Vérification d'Inscription", role: "Intégration", text: "Contrôle les documents d'une nouvelle structure auprès de l'ordre, de la TVA UE et des comptes existants. Elle n'approuve, ne rejette et ne contacte jamais." },
    { name: "Support Produit", role: "Aide plateforme", text: "Explique les fonctions d'Anivera, oriente les problèmes logiciels et montre toujours la voie manuelle ou urgente." },
    { name: "Stock Vendeur", role: "Service connecté", text: "Planification des stocks pour les vendeurs d'alimentation et les catalogues pharmaceutiques professionnels autorisés." },
    { name: "Assistant Campagnes", role: "Service connecté", text: "Prépare des campagnes pour des audiences validées. Rien n'est publié sans approbation." },
  ],
  flow: {
    title: "Un animal, cinq relais",
    subtitle: "Les agents se passent le travail par des voies définies. Chaque étape indique qui a préparé et qui décide.",
    steps: [
      { title: "Un propriétaire demande un rendez-vous", text: "L'Accueil recueille la demande avec motif, note et horaire souhaité. Elle reste une demande jusqu'à ce que la structure confirme vétérinaire, heure et salle." },
      { title: "Une préoccupation de santé apparaît", text: "Le Triage structure la situation et l'oriente vers l'équipe clinique de garde selon des protocoles validés." },
      { title: "La consultation", text: "Le vétérinaire dicte, le Conseiller Médical rédige la note, et le vétérinaire la relit et la signe." },
      { title: "Suivi", text: "Le Coordinateur des Soins Quotidiens suit contrôles et résultats en attente pendant que l'Accueil rappelle le propriétaire la veille." },
      { title: "Payé et enregistré", text: "La Comptabilité prépare le rapprochement et les rapports pour relecture autorisée." },
    ],
  },
  guard: {
    title: "Conçu pour que les personnes gardent la main",
    items: [
      { title: "L'IA prépare, une personne décide", text: "Chaque résultat IA est relu avant de compter, et l'approbation vaut pour la version exacte de la proposition." },
      { title: "Chaque valeur montre sa source", text: "Photos et voix remplissent les champs à côté de la page d'origine, avec un niveau de confiance. Enregistrer demande toujours un geste." },
      { title: "Une panne ne bloque jamais les soins", text: "Si un modèle tombe, la saisie manuelle et le contact d'urgence restent disponibles. Les documents sont des données, jamais des instructions." },
    ],
  },
};

const ro: AgentsCopy = {
  eyebrow: "Agenții ANIVERA",
  title: "O echipă de îngrijire completă care nu își termină niciodată tura",
  subtitle:
    "Paisprezece agenți specializați împart un singur dosar animal autorizat. Agenții de îngrijire sprijină animalul, cei de organizare conduc cabinetul, iar fiecare rezultat este verificat de o persoană înainte să conteze.",
  principle: "IA pregătește. O persoană decide.",
  stats: ["Agenți IA", "Departamente", "Dosar animal comun", "Verificat de o persoană"],
  reviewedBy: "Verifică",
  idLabel: "Agent",
  depts: {
    care: {
      name: "Departamentul de îngrijire",
      tagline: "Sprijin clinic și zilnic pentru animal. Acești agenți nu conduc recepția, depozitul sau contabilitatea.",
    },
    org: {
      name: "Departamentul de organizare",
      tagline: "Roluri potrivite modului tău de lucru: spitalul, cabinetul și adăpostul primesc ce au nevoie.",
    },
    behind: {
      name: "În culise",
      tagline: "Agenți pe care nimeni nu trebuie să îi deschidă. Trăiesc în fluxul de lucru și pregătesc discret pasul următor.",
    },
  },
  care: [
    {
      name: "Consilier Medical",
      role: "Consilier clinic și scrib",
      description:
        "Citește istoricul animalului, redactează nota de consultație din dictarea medicului veterinar și pregătește propuneri clinice. Nimic nu intră în dosar până nu semnează medicul veterinar.",
      does: ["Rezumă istoricul înainte de vizită", "Transformă dictarea într-o ciornă gata de semnat"],
      reviewer: "Medic veterinar",
    },
    {
      name: "Antrenor de Bine",
      role: "Bunăstare și îmbogățire",
      description:
        "Urmărește observațiile de bunăstare, precum stresul, jocul, odihna și socializarea, și pregătește activități de îmbogățire potrivite fiecărui animal.",
      does: ["Înregistrează bunăstarea și socializarea", "Propune activități potrivite animalului"],
      reviewer: "Echipa de îngrijire",
    },
    {
      name: "Nutriționist",
      role: "Hrănire și greutate",
      description:
        "Urmărește consumul și greutatea în timp și sprijină planul de hrănire aprobat. Un program nu este o hrănire, deci urmărește ce s-a dat cu adevărat.",
      does: ["Arată greutatea și fiecare hrănire reală", "Sprijină planurile de hrănire aprobate"],
      reviewer: "Medic veterinar",
    },
    {
      name: "Antrenor",
      role: "Manevrare și dresaj",
      description:
        "Sprijină planurile de manevrare, dresajul și competența celor care lucrează cu animalele, de la voluntari la angajați instruiți.",
      does: ["Creează planuri de manevrare pas cu pas", "Urmărește cursurile și competența"],
      reviewer: "Medic veterinar",
    },
  ],
  org: [
    {
      name: "Recepție",
      role: "Recepție și programări",
      description:
        "Deservește pagina de prezentare a fiecărui cabinet: răspunde la întrebări, primește cereri de programare și trimite memento-uri pe canalul ales de proprietar. O cerere nu este programare până nu o confirmă cabinetul.",
      does: [
        "Cerere cu motiv, notă și ora preferată",
        "WhatsApp, Telegram, SMS sau e-mail, fără detalii clinice",
      ],
      reviewer: "Recepție",
    },
    {
      name: "Operațiuni",
      role: "Stoc și aprovizionare",
      description:
        "Planifică aprovizionarea, urmărește lotul și expirarea și propune comenzi pe baza stocului și a animalelor care au nevoie. Pentru un adăpost arată câte zile acoperă hrana disponibilă.",
      does: ["Semnalele de stoc redus devin comenzi propuse", "Stocul se schimbă doar la recepția livrării"],
      reviewer: "Manager și medic veterinar",
    },
    {
      name: "Contabilitate",
      role: "Bani și taxe",
      description:
        "Pregătește evidențe, reconcilieri și rapoarte: venituri, cheltuieli, donații și cifrele pentru taxe. Semnalează evidențele lipsă și nu inventează sume și nu depune declarații.",
      does: ["Reconciliază facturi, plăți și donații", "Alimentează raportul public de donații și cheltuieli"],
      reviewer: "Manager",
    },
  ],
  behind: [
    { name: "Triaj și escaladare", role: "Urgență", text: "Structurează o problemă de sănătate, sprijină evaluarea urgenței pe baza protocoalelor aprobate și o îndrumă spre atenție clinică." },
    { name: "Coordonator Îngrijire Zilnică", role: "Urmărire", text: "Organizează îngrijirea aprobată: memento-uri preventive, rezultate în așteptare, controale ratate și predări de tură." },
    { name: "Monitor Sănătate Populație", role: "Semnale timpurii", text: "Depistează posibile focare și presiune pe capacitate și cere verificarea medicului veterinar al adăpostului. Un semnal de investigat, niciodată un focar confirmat." },
    { name: "Verificare Înregistrare", role: "Integrare", text: "Verifică documentele unei organizații noi în registrul colegiului, TVA UE și conturile existente. Nu aprobă, nu respinge și nu contactează niciodată." },
    { name: "Suport Produs", role: "Ajutor platformă", text: "Explică funcțiile Anivera, îndrumă problemele de software și arată mereu calea manuală sau urgentă." },
    { name: "Stoc Vânzător", role: "Serviciu conectat", text: "Planificarea stocului pentru vânzători de hrană și cataloage farmaceutice profesionale autorizate." },
    { name: "Asistent Campanii", role: "Serviciu conectat", text: "Pregătește campanii pentru audiențe aprobate. Nimic nu se publică fără aprobare." },
  ],
  flow: {
    title: "Un animal, cinci predări",
    subtitle: "Agenții își pasează munca pe trasee definite. Fiecare pas arată cine a pregătit și cine decide.",
    steps: [
      { title: "Un proprietar cere o programare", text: "Recepția preia cererea cu motiv, notă și ora preferată. Rămâne cerere până când cabinetul confirmă medicul, ora și sala." },
      { title: "Apare o problemă de sănătate", text: "Triajul structurează problema și o îndrumă către echipa clinică de gardă, pe baza protocoalelor aprobate." },
      { title: "Consultația", text: "Medicul dictează, Consilierul Medical redactează nota, iar medicul o verifică și o semnează." },
      { title: "Urmărire", text: "Coordonatorul Îngrijirii Zilnice urmărește controalele și rezultatele în așteptare, iar Recepția amintește proprietarului cu o zi înainte." },
      { title: "Plătit și înregistrat", text: "Contabilitatea pregătește reconcilierea și rapoartele pentru verificare autorizată." },
    ],
  },
  guard: {
    title: "Construit ca oamenii să rămână la comandă",
    items: [
      { title: "IA pregătește, o persoană decide", text: "Fiecare rezultat IA este verificat înainte să conteze, iar aprobarea se aplică versiunii exacte a propunerii." },
      { title: "Fiecare valoare își arată sursa", text: "Pozele și vocea completează câmpurile lângă pagina de origine, cu nivel de încredere. Salvarea cere mereu o atingere." },
      { title: "O defecțiune nu blochează niciodată îngrijirea", text: "Dacă un model cade, introducerea manuală și contactul urgent rămân disponibile. Documentele sunt date, nu instrucțiuni." },
    ],
  },
};

const it: AgentsCopy = {
  eyebrow: "Gli agenti ANIVERA",
  title: "Un intero team di cura che non stacca mai",
  subtitle:
    "Quattordici agenti specializzati condividono un'unica cartella animale autorizzata. Gli agenti di cura supportano l'animale, quelli di organizzazione gestiscono la struttura e ogni risultato è rivisto da una persona prima di contare.",
  principle: "L'IA prepara. Una persona decide.",
  stats: ["Agenti IA", "Reparti", "Cartella animale condivisa", "Rivisto da una persona"],
  reviewedBy: "Revisione",
  idLabel: "Agente",
  depts: {
    care: {
      name: "Reparto cura",
      tagline: "Supporto clinico e quotidiano per l'animale. Questi agenti non gestiscono reception, magazzino o contabilità.",
    },
    org: {
      name: "Reparto organizzazione",
      tagline: "Ruoli adatti al tuo modo di lavorare: ospedale, ambulatorio e rifugio ricevono quelli che servono.",
    },
    behind: {
      name: "Dietro le quinte",
      tagline: "Agenti che nessuno deve aprire. Vivono nel flusso di lavoro e preparano in silenzio il passo successivo.",
    },
  },
  care: [
    {
      name: "Consulente Medico",
      role: "Consulente clinico e scriba",
      description:
        "Legge la storia dell'animale, redige la nota di visita dalla dettatura del veterinario e prepara proposte cliniche. Nulla entra nella cartella finché il veterinario non firma.",
      does: ["Riassume la storia prima della visita", "Trasforma la dettatura in una bozza pronta da firmare"],
      reviewer: "Veterinario",
    },
    {
      name: "Coach di Benessere",
      role: "Benessere e arricchimento",
      description:
        "Segue le osservazioni di benessere, come stress, gioco, riposo e socializzazione, e prepara attività di arricchimento adatte a ogni animale.",
      does: ["Registra eventi di benessere e socializzazione", "Suggerisce arricchimenti adatti all'animale"],
      reviewer: "Team di cura",
    },
    {
      name: "Nutrizionista",
      role: "Alimentazione e peso",
      description:
        "Segue assunzione di cibo e peso nel tempo e supporta il piano alimentare approvato. Un programma non è un pasto, quindi registra ciò che è stato davvero dato.",
      does: ["Mostra il peso e ogni pasto reale", "Supporta i piani alimentari approvati"],
      reviewer: "Veterinario",
    },
    {
      name: "Allenatore",
      role: "Gestione e addestramento",
      description:
        "Supporta piani di gestione, addestramento e la competenza di chi lavora con gli animali, dai volontari ai dipendenti formati.",
      does: ["Crea piani di gestione passo dopo passo", "Segue corsi e competenze"],
      reviewer: "Veterinario",
    },
  ],
  org: [
    {
      name: "Reception",
      role: "Reception e appuntamenti",
      description:
        "Gestisce la pagina di presentazione di ogni struttura: risponde alle richieste, riceve richieste di appuntamento e invia promemoria sul canale scelto dal proprietario. Una richiesta non è una prenotazione finché la struttura non la conferma.",
      does: [
        "Richiesta con motivo, nota e orario preferito",
        "WhatsApp, Telegram, SMS o email, mai dettagli clinici",
      ],
      reviewer: "Reception",
    },
    {
      name: "Operazioni",
      role: "Scorte e fornitura",
      description:
        "Pianifica le forniture, tiene traccia di lotto e scadenza e propone ordini in base alle scorte e agli animali in scadenza di dose. Per un rifugio mostra per quanti giorni basta il cibo disponibile.",
      does: ["Le segnalazioni di scorta bassa diventano ordini proposti", "Le scorte cambiano solo alla ricezione della consegna"],
      reviewer: "Responsabile e veterinario",
    },
    {
      name: "Contabilità",
      role: "Denaro e tasse",
      description:
        "Prepara registrazioni, riconciliazioni e rapporti: entrate, spese, donazioni e i dati per le tasse. Segnala le registrazioni mancanti, non inventa importi e non presenta dichiarazioni.",
      does: ["Riconcilia fatture, pagamenti e donazioni", "Alimenta il rapporto pubblico su donazioni e spese"],
      reviewer: "Responsabile",
    },
  ],
  behind: [
    { name: "Triage e escalation", role: "Urgenza", text: "Struttura un problema di salute, supporta la valutazione dell'urgenza con protocolli approvati e lo indirizza all'attenzione clinica." },
    { name: "Coordinatore Cura Quotidiana", role: "Follow-up", text: "Organizza la cura approvata: promemoria preventivi, risultati in attesa, controlli saltati e passaggi di turno." },
    { name: "Monitor Salute della Popolazione", role: "Segnali precoci", text: "Individua possibili focolai e pressione sulla capacità e chiede la revisione del veterinario del rifugio. Un segnale da verificare, mai un focolaio confermato." },
    { name: "Verifica Registrazione", role: "Onboarding", text: "Controlla i documenti di una nuova organizzazione con l'albo, la partita IVA UE e gli account esistenti. Non approva, non rifiuta e non contatta mai." },
    { name: "Supporto Prodotto", role: "Aiuto piattaforma", text: "Spiega le funzioni di Anivera, instrada i problemi software e mostra sempre il percorso manuale o urgente." },
    { name: "Scorte Venditore", role: "Servizio collegato", text: "Pianificazione delle scorte per venditori di alimenti e cataloghi farmaceutici professionali autorizzati." },
    { name: "Assistente Campagne", role: "Servizio collegato", text: "Prepara campagne per pubblici approvati. Nulla viene pubblicato senza approvazione." },
  ],
  flow: {
    title: "Un animale, cinque passaggi",
    subtitle: "Gli agenti si passano il lavoro su percorsi definiti. Ogni passo indica chi ha preparato e chi decide.",
    steps: [
      { title: "Un proprietario chiede un appuntamento", text: "La Reception raccoglie la richiesta con motivo, nota e orario preferito. Resta una richiesta finché la struttura non conferma veterinario, ora e sala." },
      { title: "Emerge un problema di salute", text: "Il Triage struttura il problema e lo indirizza al team clinico di turno con protocolli approvati." },
      { title: "La visita", text: "Il veterinario detta, il Consulente Medico redige la nota e il veterinario la rivede e la firma." },
      { title: "Follow-up", text: "Il Coordinatore Cura Quotidiana segue controlli e risultati in attesa mentre la Reception ricorda al proprietario il giorno prima." },
      { title: "Pagato e registrato", text: "La Contabilità prepara la riconciliazione e i rapporti per la revisione autorizzata." },
    ],
  },
  guard: {
    title: "Pensato perché le persone restino al comando",
    items: [
      { title: "L'IA prepara, una persona decide", text: "Ogni risultato IA è rivisto prima di contare, e l'approvazione vale per l'esatta versione della proposta." },
      { title: "Ogni valore mostra la sua fonte", text: "Foto e voce compilano i campi accanto alla pagina d'origine, con livello di fiducia. Salvare richiede sempre un tocco." },
      { title: "Un guasto non blocca mai la cura", text: "Se un modello si ferma, inserimento manuale e contatto urgente restano disponibili. I documenti sono dati, mai istruzioni." },
    ],
  },
};

const fi: AgentsCopy = {
  eyebrow: "ANIVERAn agentit",
  title: "Kokonainen hoitotiimi, joka ei koskaan lopeta vuoroaan",
  subtitle:
    "Neljätoista erikoistunutta agenttia jakaa yhden valtuutetun eläintietueen. Hoitoagentit tukevat eläintä, organisaatioagentit pyörittävät toimintaa, ja ihminen tarkistaa jokaisen tuloksen ennen kuin se otetaan huomioon.",
  principle: "Tekoäly valmistelee. Ihminen päättää.",
  stats: ["Tekoälyagenttia", "Osastoa", "Yhteinen eläintietue", "Ihmisen tarkistama"],
  reviewedBy: "Tarkistaa",
  idLabel: "Agentti",
  depts: {
    care: {
      name: "Hoito-osasto",
      tagline: "Kliinistä ja arjen tukea eläimelle. Nämä agentit eivät hoida vastaanottoa, varastoa tai kirjanpitoa.",
    },
    org: {
      name: "Organisaatio-osasto",
      tagline: "Roolit työtapasi mukaan: klinikka, vastaanotto ja eläinsuoja saavat tarvitsemansa.",
    },
    behind: {
      name: "Taustalla työskentelevät",
      tagline: "Agentit, joita kenenkään ei tarvitse avata. Ne toimivat työnkulussa ja valmistelevat hiljaa seuraavan vaiheen.",
    },
  },
  care: [
    {
      name: "Lääketieteen Neuvoja",
      role: "Kliininen neuvoja ja kirjuri",
      description:
        "Lukee eläimen historian, laatii vastaanottomerkinnän eläinlääkärin sanelusta ja valmistelee kliinisiä ehdotuksia. Mikään ei päädy tietueeseen ennen kuin eläinlääkäri allekirjoittaa.",
      does: ["Tiivistää historian ennen käyntiä", "Muuttaa sanelun allekirjoitusvalmiiksi luonnokseksi"],
      reviewer: "Eläinlääkäri",
    },
    {
      name: "Hyvinvoinnin Valmentaja",
      role: "Hyvinvointi ja virikkeet",
      description:
        "Seuraa hyvinvointihavaintoja, kuten stressiä, leikkiä, lepoa ja sosiaalistamista, ja valmistelee kullekin eläimelle sopivia virikkeitä.",
      does: ["Kirjaa hyvinvointi- ja sosiaalistamistapahtumat", "Ehdottaa eläimelle sopivia virikkeitä"],
      reviewer: "Hoitotiimi",
    },
    {
      name: "Ravitsemisasiantuntija",
      role: "Ruokinta ja paino",
      description:
        "Seuraa ruoan saantia ja painoa ajan mittaan ja tukee hyväksyttyä ruokintasuunnitelmaa. Aikataulu ei ole ruokinta, joten se seuraa sitä, mitä oikeasti annettiin.",
      does: ["Näyttää painon ja jokaisen toteutuneen ruokinnan", "Tukee hyväksyttyjä ruokintasuunnitelmia"],
      reviewer: "Eläinlääkäri",
    },
    {
      name: "Valmentaja",
      role: "Käsittely ja koulutus",
      description:
        "Tukee käsittelysuunnitelmia, eläinten koulutusta ja eläinten kanssa työskentelevien osaamista vapaaehtoisista koulutettuihin työntekijöihin.",
      does: ["Laatii käsittelysuunnitelmat vaihe vaiheelta", "Seuraa kursseja ja osaamista"],
      reviewer: "Eläinlääkäri",
    },
  ],
  org: [
    {
      name: "Vastaanotto",
      role: "Vastaanotto ja ajanvaraus",
      description:
        "Palvelee jokaisen toimipisteen omaa esittelysivua: vastaa tiedusteluihin, ottaa vastaan aikapyyntöjä ja lähettää muistutukset omistajan valitsemaa kanavaa pitkin. Pyyntö ei ole varaus ennen kuin toimipiste vahvistaa sen.",
      does: [
        "Pyyntö syyn, huomautuksen ja toiveajan kanssa",
        "WhatsApp, Telegram, tekstiviesti tai sähköposti, ei koskaan kliinisiä tietoja",
      ],
      reviewer: "Vastaanotto",
    },
    {
      name: "Toiminnot",
      role: "Varasto ja hankinta",
      description:
        "Suunnittelee hankinnat, seuraa eriä ja viimeisiä käyttöpäiviä ja ehdottaa tilauksia varaston ja annosta odottavien eläinten perusteella. Eläinsuojalle se näyttää, kuinka monta päivää ruoka riittää.",
      does: ["Vähäisen varaston signaalit muuttuvat tilausehdotuksiksi", "Varasto muuttuu vasta toimituksen vastaanotossa"],
      reviewer: "Johtaja ja eläinlääkäri",
    },
    {
      name: "Kirjanpito",
      role: "Raha ja verot",
      description:
        "Valmistelee kirjaukset, täsmäytykset ja raportit: tulot, menot, lahjoitukset ja verotuksen luvut. Se huomauttaa puuttuvista tositteista, eikä keksi summia tai jätä veroilmoitusta.",
      does: ["Täsmäyttää laskut, maksut ja lahjoitukset", "Syöttää julkista lahjoitus- ja menoraporttia"],
      reviewer: "Johtaja",
    },
  ],
  behind: [
    { name: "Kiireellisyysarvio", role: "Kiireellisyys", text: "Jäsentää terveyshuolen, tukee kiireellisyyden arviointia hyväksyttyjen protokollien mukaan ja ohjaa sen kliiniseen hoitoon." },
    { name: "Päivittäisen Hoidon Koordinaattori", role: "Seuranta", text: "Järjestää hyväksytyn hoidon: ennaltaehkäisevät muistutukset, odottavat tulokset, väliin jääneet seurannat ja vuoronvaihdot." },
    { name: "Väestön Terveysseuranta", role: "Varhaiset signaalit", text: "Huomaa mahdolliset sairausryppäät ja kapasiteetin kiristymisen ja pyytää eläinsuojan eläinlääkäriä arvioimaan. Signaali tutkittavaksi, ei koskaan vahvistettu epidemia." },
    { name: "Rekisteröinnin Tarkistus", role: "Käyttöönotto", text: "Tarkistaa uuden organisaation asiakirjat ammattirekisteristä, EU:n ALV-numerosta ja olemassa olevista tileistä. Se ei koskaan hyväksy, hylkää tai ota yhteyttä." },
    { name: "Tuotetuki", role: "Alustan apu", text: "Selittää Anivera-toiminnot, ohjaa ohjelmisto-ongelmat ja näyttää aina manuaalisen tai kiireellisen reitin." },
    { name: "Myyjän Varasto", role: "Liitetty palvelu", text: "Varastosuunnittelu ruokamyyjille ja valtuutetuille ammattimaisille lääkekatalogeille." },
    { name: "Kampanja-avustaja", role: "Liitetty palvelu", text: "Valmistelee kampanjat hyväksytyille kohderyhmille. Mitään ei julkaista ilman hyväksyntää." },
  ],
  flow: {
    title: "Yksi eläin, viisi luovutusta",
    subtitle: "Agentit välittävät työn määriteltyjä reittejä pitkin. Jokainen vaihe kertoo, kuka valmisteli ja kuka päättää.",
    steps: [
      { title: "Omistaja pyytää aikaa", text: "Vastaanotto ottaa pyynnön vastaan syyn, huomautuksen ja toiveajan kanssa. Se on pyyntö, kunnes toimipiste vahvistaa eläinlääkärin, ajan ja huoneen." },
      { title: "Terveyshuoli ilmenee", text: "Kiireellisyysarvio jäsentää huolen ja ohjaa sen päivystävälle kliiniselle tiimille hyväksyttyjen protokollien mukaan." },
      { title: "Vastaanotto", text: "Eläinlääkäri sanelee, Lääketieteen Neuvoja laatii merkinnän, ja eläinlääkäri tarkistaa ja allekirjoittaa sen." },
      { title: "Seuranta", text: "Päivittäisen Hoidon Koordinaattori seuraa uusintakäyntejä ja odottavia tuloksia, ja Vastaanotto muistuttaa omistajaa päivää ennen." },
      { title: "Maksettu ja kirjattu", text: "Kirjanpito valmistelee täsmäytyksen ja raportit valtuutettua tarkistusta varten." },
    ],
  },
  guard: {
    title: "Rakennettu niin, että ihmiset pysyvät ohjaksissa",
    items: [
      { title: "Tekoäly valmistelee, ihminen päättää", text: "Jokainen tekoälyn tulos tarkistetaan ennen kuin se otetaan huomioon, ja hyväksyntä koskee täsmälleen kyseistä ehdotuksen versiota." },
      { title: "Jokainen arvo näyttää lähteensä", text: "Kuvat ja puhe täyttävät kentät alkuperäisen sivun vieressä luotettavuustasoineen. Tallennus vaatii aina napautuksen." },
      { title: "Vika ei koskaan estä hoitoa", text: "Jos malli pettää, manuaalinen syöttö ja kiireellinen yhteys pysyvät käytettävissä. Asiakirjat ovat dataa, eivät ohjeita." },
    ],
  },
};

const sv: AgentsCopy = {
  eyebrow: "ANIVERA-agenterna",
  title: "Ett helt vårdteam som aldrig går av sitt pass",
  subtitle:
    "Fjorton specialiserade agenter delar en enda behörig djurjournal. Vårdagenterna stöttar djuret, organisationsagenterna driver verksamheten och varje resultat granskas av en person innan det räknas.",
  principle: "AI förbereder. En person bestämmer.",
  stats: ["AI-agenter", "Avdelningar", "Gemensam djurjournal", "Granskat av en person"],
  reviewedBy: "Granskas av",
  idLabel: "Agent",
  depts: {
    care: {
      name: "Vårdavdelningen",
      tagline: "Kliniskt och dagligt stöd för djuret. Dessa agenter sköter inte receptionen, lagret eller bokföringen.",
    },
    org: {
      name: "Organisationsavdelningen",
      tagline: "Roller som passar ditt sätt att arbeta: sjukhus, klinik och djurhem får de de behöver.",
    },
    behind: {
      name: "Bakom kulisserna",
      tagline: "Agenter som ingen behöver öppna. De sitter i arbetsflödet och förbereder tyst nästa steg.",
    },
  },
  care: [
    {
      name: "Medicinsk Rådgivare",
      role: "Klinisk rådgivare och skrivare",
      description:
        "Läser djurets historik, skriver utkast till journalanteckningen utifrån veterinärens diktering och förbereder kliniska förslag. Inget förs in i journalen förrän veterinären signerat.",
      does: ["Sammanfattar historiken före besöket", "Gör dikteringen till ett utkast redo att signera"],
      reviewer: "Veterinär",
    },
    {
      name: "Välbefinnandecoach",
      role: "Välfärd och berikning",
      description:
        "Följer välfärdsobservationer som stress, lek, vila och socialisering och förbereder berikningsaktiviteter som passar varje djur.",
      does: ["Loggar välbefinnande och socialisering", "Föreslår berikning anpassad till djuret"],
      reviewer: "Vårdteam",
    },
    {
      name: "Nutritionist",
      role: "Utfodring och vikt",
      description:
        "Följer foderintag och vikt över tid och stöder den godkända utfodringsplanen. Ett schema är ingen utfodring, så den följer vad som faktiskt gavs.",
      does: ["Visar vikt och varje faktisk utfodring", "Stöder godkända utfodringsplaner"],
      reviewer: "Veterinär",
    },
    {
      name: "Tränare",
      role: "Hantering och träning",
      description:
        "Stöder hanteringsplaner, djurträning och kompetensen hos dem som arbetar med djuren, från volontärer till utbildade medarbetare.",
      does: ["Bygger hanteringsplaner steg för steg", "Följer kurser och kompetens"],
      reviewer: "Veterinär",
    },
  ],
  org: [
    {
      name: "Reception",
      role: "Reception och tidsbokning",
      description:
        "Betjänar varje verksamhets egen presentationssida: svarar på frågor, tar emot bokningsförfrågningar och skickar påminnelser via den kanal djurägaren valt. En förfrågan är ingen bokning förrän verksamheten bekräftat den.",
      does: [
        "Förfrågan med orsak, notering och önskad tid",
        "WhatsApp, Telegram, sms eller e-post, aldrig kliniska uppgifter",
      ],
      reviewer: "Reception",
    },
    {
      name: "Drift",
      role: "Lager och försörjning",
      description:
        "Planerar försörjningen, följer parti och utgångsdatum och föreslår beställningar utifrån lager och djur som står på tur. För ett djurhem visar den hur många dagar fodret räcker.",
      does: ["Låga lagernivåer blir föreslagna beställningar", "Lagret ändras först när leveransen tas emot"],
      reviewer: "Chef och veterinär",
    },
    {
      name: "Redovisning",
      role: "Pengar och skatt",
      description:
        "Förbereder bokföring, avstämningar och rapporter: intäkter, kostnader, donationer och siffrorna bakom skatten. Den flaggar saknade underlag och hittar aldrig på belopp eller lämnar in en deklaration.",
      does: ["Stämmer av fakturor, betalningar och donationer", "Matar den offentliga donations- och utgiftsrapporten"],
      reviewer: "Chef",
    },
  ],
  behind: [
    { name: "Triage och eskalering", role: "Brådska", text: "Strukturerar ett hälsoproblem, stöder brådskebedömningen enligt godkända protokoll och leder det till klinisk uppmärksamhet." },
    { name: "Koordinator Daglig Vård", role: "Uppföljning", text: "Organiserar godkänd vård: förebyggande påminnelser, väntande svar, missade uppföljningar och skiftöverlämningar." },
    { name: "Populationshälsovakt", role: "Tidiga signaler", text: "Upptäcker möjliga sjukdomskluster och kapacitetsbrist och ber djurhemmets veterinär granska. En signal att utreda, aldrig ett bekräftat utbrott." },
    { name: "Registreringskontroll", role: "Introduktion", text: "Kontrollerar en ny organisations dokument mot yrkesregistret, EU-momsnumret och befintliga konton. Den godkänner, avslår eller kontaktar aldrig." },
    { name: "Produktsupport", role: "Plattformshjälp", text: "Förklarar Anivera-funktioner, leder programvaruproblem rätt och visar alltid den manuella eller brådskande vägen." },
    { name: "Säljarlager", role: "Ansluten tjänst", text: "Lagerplanering för foderförsäljare och behöriga professionella läkemedelskataloger." },
    { name: "Kampanjassistent", role: "Ansluten tjänst", text: "Förbereder kampanjer för godkända målgrupper. Inget publiceras utan godkännande." },
  ],
  flow: {
    title: "Ett djur, fem överlämningar",
    subtitle: "Agenterna för arbetet vidare längs definierade vägar. Varje steg visar vem som förberett och vem som bestämmer.",
    steps: [
      { title: "En djurägare begär en tid", text: "Receptionen tar emot förfrågan med orsak, notering och önskad tid. Den förblir en förfrågan tills verksamheten bekräftat veterinär, tid och rum." },
      { title: "Ett hälsoproblem uppstår", text: "Triage strukturerar problemet och leder det till det jourhavande kliniska teamet enligt godkända protokoll." },
      { title: "Konsultationen", text: "Veterinären dikterar, den Medicinska Rådgivaren skriver utkastet och veterinären granskar och signerar." },
      { title: "Uppföljning", text: "Koordinatorn för Daglig Vård följer återbesök och väntande svar medan Receptionen påminner djurägaren en dag före." },
      { title: "Betalt och bokfört", text: "Redovisningen förbereder avstämningen och rapporterna för behörig granskning." },
    ],
  },
  guard: {
    title: "Byggt så att människor förblir ansvariga",
    items: [
      { title: "AI förbereder, en person bestämmer", text: "Varje AI-resultat granskas innan det räknas, och godkännandet gäller exakt den versionen av förslaget." },
      { title: "Varje värde visar sin källa", text: "Foton och röst fyller fält bredvid sidan de kom från, med säkerhetsnivå. Att spara kräver alltid ett tryck." },
      { title: "Ett fel stoppar aldrig vården", text: "Om en modell fallerar finns manuell inmatning och brådskande kontakt kvar. Dokument är data, aldrig instruktioner." },
    ],
  },
};

export const agentsContent: Record<Language, AgentsCopy> = { en, es, de, pt, fr, ro, it, fi, sv };
