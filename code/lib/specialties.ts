import {
  Stethoscope,
  Users,
  Activity,
  Baby,
  Venus,
  Bone,
  Accessibility,
  Sparkles,
  HandHeart,
  Pill,
  Gauge,
  Wind,
  Droplets,
  HeartPulse,
  Ear,
  Brain,
  MessageCircle,
  Apple,
  Speech,
  HardHat,
  ScanLine,
  Microscope,
  Dumbbell,
  Leaf,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export type SpecialtyFaq = { q: string; a: string };

// Categorías de la cartera de servicios (carta de presentación QMC).
export type SpecialtyCategoria =
  | "Especialidades médicas"
  | "Diagnóstico y procedimientos"
  | "Rehabilitación"
  | "Medicina holística"
  | "Laboratorio";

export type Specialty = {
  slug: string;
  nombre: string;
  icon: LucideIcon;
  categoria: SpecialtyCategoria;
  principal?: boolean; // se muestra en el directorio destacado del home
  descCorta: string;
  descLarga: string;
  queTratamos: string[];
  faqs?: SpecialtyFaq[];
  doctorIds: string[]; // referencia a lib/doctors.ts
  foto?: string; // imagen hero de la página de especialidad (Fase 2)
  calEventSlug?: string; // slug del event-type en Cal.com si difiere del slug
  incluye?: string[]; // qué incluye la consulta (opcional)
  metaTitle: string;
  metaDescription: string;
};

// ── Cartera real de servicios — confirmada con la clínica (carta 2025) ──────
// Sin precios publicados (se confirman al agendar). Las 6 marcadas `principal`
// se destacan en el home; el listado completo vive en /especialidades.
export const specialties = [
  // ─────────────────── Especialidades médicas ───────────────────
  {
    slug: "medicina-general",
    nombre: "Medicina General",
    icon: Stethoscope,
    categoria: "Especialidades médicas",
    principal: true,
    descCorta: "Tu primer punto de contacto para cualquier necesidad de salud.",
    descLarga:
      "Diagnóstico, tratamiento y orientación para toda la familia. Chequeos preventivos, control de enfermedades crónicas y derivación a especialistas cuando se requiere.",
    queTratamos: [
      "Chequeos preventivos",
      "Control de presión y glucosa",
      "Infecciones comunes",
      "Certificados médicos",
      "Manejo de enfermedades crónicas",
      "Orientación de salud",
    ],
    faqs: [
      { q: "¿Atienden sin cita?", a: "Recomendamos agendar por WhatsApp para asegurar tu turno." },
      { q: "¿Emiten certificados médicos?", a: "Sí, emitimos certificados médicos válidos." },
    ],
    doctorIds: [],
    metaTitle: "Médico general en Quito — Medicina General | QMC Medisuport",
    metaDescription:
      "Consulta de medicina general en Quito: chequeos, control de presión y glucosa, certificados médicos. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "medicina-familiar",
    nombre: "Medicina Familiar",
    icon: Users,
    categoria: "Especialidades médicas",
    descCorta: "Atención continua y cercana para todas las edades de tu familia.",
    descLarga:
      "Acompañamiento médico integral del núcleo familiar, con enfoque preventivo y seguimiento a lo largo del tiempo, coordinando el cuidado entre las distintas etapas de la vida.",
    queTratamos: [
      "Control de salud familiar",
      "Prevención y educación en salud",
      "Enfermedades crónicas",
      "Seguimiento de tratamientos",
      "Chequeos por edad",
      "Orientación integral",
    ],
    doctorIds: [],
    metaTitle: "Medicina Familiar en Quito | QMC Medisuport",
    metaDescription:
      "Medicina familiar en Quito con enfoque preventivo y seguimiento para toda la familia. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "medicina-interna",
    nombre: "Medicina Interna",
    icon: Activity,
    categoria: "Especialidades médicas",
    descCorta: "Diagnóstico y manejo integral del paciente adulto.",
    descLarga:
      "Estudio y tratamiento de enfermedades del adulto, en especial las crónicas y complejas, integrando varios sistemas del cuerpo para un manejo coordinado.",
    queTratamos: [
      "Hipertensión y diabetes",
      "Enfermedades crónicas",
      "Chequeos integrales del adulto",
      "Control de múltiples patologías",
      "Manejo de factores de riesgo",
      "Seguimiento especializado",
    ],
    doctorIds: [],
    metaTitle: "Medicina Interna en Quito | QMC Medisuport",
    metaDescription:
      "Medicina interna en Quito para el manejo integral del adulto y enfermedades crónicas. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "pediatria",
    nombre: "Pediatría",
    icon: Baby,
    categoria: "Especialidades médicas",
    principal: true,
    descCorta: "Cuidado de la salud de tus hijos, desde recién nacidos hasta adolescentes.",
    descLarga:
      "Atención médica integral para bebés, niños y adolescentes. Controles de crecimiento y desarrollo, vacunación y tratamiento de las enfermedades comunes de la infancia, con un enfoque cercano y preventivo.",
    queTratamos: [
      "Control del niño sano",
      "Vacunación",
      "Infecciones respiratorias",
      "Problemas digestivos",
      "Control de crecimiento y desarrollo",
      "Alergias",
    ],
    faqs: [
      { q: "¿Desde qué edad atienden?", a: "Desde recién nacidos hasta los 17 años." },
      { q: "¿Necesito cita previa?", a: "Sí, agéndala fácil por WhatsApp y te confirmamos el horario." },
    ],
    doctorIds: [],
    metaTitle: "Pediatra en Quito — Pediatría | QMC Medisuport",
    metaDescription:
      "Pediatra en Quito para el cuidado de tus hijos: controles, vacunas y enfermedades de la infancia. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "ginecologia-obstetricia",
    nombre: "Ginecología y Obstetricia",
    icon: Venus,
    categoria: "Especialidades médicas",
    principal: true,
    descCorta: "Salud de la mujer en cada etapa, con acompañamiento del embarazo.",
    descLarga:
      "Atención integral de la salud femenina: controles ginecológicos, prevención, planificación familiar y seguimiento del embarazo, con consultorio equipado y privacidad.",
    queTratamos: [
      "Control ginecológico",
      "Papanicolaou y prevención",
      "Control del embarazo",
      "Planificación familiar",
      "Salud hormonal",
      "Menopausia",
    ],
    faqs: [
      { q: "¿Realizan control del embarazo?", a: "Sí, acompañamos el embarazo con controles y ecografía." },
      { q: "¿Necesito cita?", a: "Sí, agéndala por WhatsApp y coordinamos tu horario." },
    ],
    doctorIds: [],
    metaTitle: "Ginecólogo en Quito — Ginecología y Obstetricia | QMC Medisuport",
    metaDescription:
      "Ginecología y obstetricia en Quito: control ginecológico, embarazo y planificación familiar. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "traumatologia",
    nombre: "Traumatología",
    icon: Bone,
    categoria: "Especialidades médicas",
    principal: true,
    descCorta: "Atención de lesiones de huesos, articulaciones y músculos.",
    descLarga:
      "Diagnóstico y tratamiento de fracturas, esguinces y lesiones del sistema musculoesquelético, incluida traumatología infantil, con enfoque en recuperar tu movilidad.",
    queTratamos: [
      "Fracturas y esguinces",
      "Lesiones deportivas",
      "Dolor de espalda y articulaciones",
      "Traumatología infantil",
      "Lesiones de rodilla y hombro",
      "Recuperación post-lesión",
    ],
    faqs: [
      { q: "¿Atienden niños?", a: "Sí, contamos con traumatología infantil." },
      { q: "¿Hacen radiografías?", a: "Sí, contamos con imagenología para apoyar tu diagnóstico." },
    ],
    doctorIds: [],
    metaTitle: "Traumatólogo en Quito — Traumatología | QMC Medisuport",
    metaDescription:
      "Traumatólogo en Quito para fracturas, esguinces y lesiones deportivas, incluida traumatología infantil. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "fisiatria",
    nombre: "Fisiatría",
    icon: Accessibility,
    categoria: "Especialidades médicas",
    descCorta: "Medicina física para recuperar movilidad y manejar el dolor.",
    descLarga:
      "Medicina física y de rehabilitación para recuperar función y movilidad, y tratar el dolor crónico sin cirugía, con planes personalizados y sin límite de tiempo en la terapia.",
    queTratamos: [
      "Dolor crónico",
      "Rehabilitación neurológica",
      "Lesiones musculares",
      "Recuperación post-quirúrgica",
      "Problemas posturales",
      "Terapia del dolor",
    ],
    faqs: [
      { q: "¿Qué diferencia hay con traumatología?", a: "La fisiatría se centra en recuperar función y tratar el dolor sin cirugía." },
      { q: "¿Incluye terapias?", a: "Diseñamos un plan que puede incluir terapia física de seguimiento." },
    ],
    doctorIds: [],
    metaTitle: "Fisiatra en Quito — Fisiatría | QMC Medisuport",
    metaDescription:
      "Fisiatra en Quito para dolor crónico, rehabilitación y recuperación de lesiones. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "dermatologia",
    nombre: "Dermatología",
    icon: Sparkles,
    categoria: "Especialidades médicas",
    principal: true,
    descCorta: "Cuidado de la piel, cabello y uñas para toda la familia.",
    descLarga:
      "Diagnóstico y tratamiento de enfermedades de la piel, el cabello y las uñas, desde acné y dermatitis hasta el control de lunares y lesiones cutáneas.",
    queTratamos: [
      "Acné",
      "Dermatitis y alergias de piel",
      "Control de lunares",
      "Caída del cabello",
      "Infecciones de piel y uñas",
      "Manchas y lesiones cutáneas",
    ],
    doctorIds: [],
    metaTitle: "Dermatólogo en Quito — Dermatología | QMC Medisuport",
    metaDescription:
      "Dermatólogo en Quito para acné, dermatitis, control de lunares y salud de la piel. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "reumatologia",
    nombre: "Reumatología",
    icon: HandHeart,
    categoria: "Especialidades médicas",
    descCorta: "Tratamiento de enfermedades de articulaciones y autoinmunes.",
    descLarga:
      "Diagnóstico y manejo de enfermedades reumáticas y autoinmunes que afectan articulaciones, huesos y músculos, con tratamientos para controlar el dolor y la inflamación.",
    queTratamos: [
      "Artritis y artrosis",
      "Dolor articular crónico",
      "Enfermedades autoinmunes",
      "Osteoporosis",
      "Lupus y afines",
      "Fibromialgia",
    ],
    doctorIds: [],
    metaTitle: "Reumatólogo en Quito — Reumatología | QMC Medisuport",
    metaDescription:
      "Reumatólogo en Quito para artritis, dolor articular y enfermedades autoinmunes. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "gastroenterologia",
    nombre: "Gastroenterología",
    icon: Pill,
    categoria: "Especialidades médicas",
    descCorta: "Diagnóstico y tratamiento de enfermedades del sistema digestivo.",
    descLarga:
      "Atención especializada del esófago, estómago, intestino, hígado y páncreas. Tratamiento de gastritis, reflujo y colon irritable, con endoscopía y colonoscopía en sala propia.",
    queTratamos: [
      "Gastritis y reflujo",
      "Dolor abdominal",
      "Colon irritable",
      "Endoscopía digestiva",
      "Problemas hepáticos",
      "Estreñimiento y diarrea crónica",
    ],
    faqs: [
      { q: "¿Realizan endoscopía?", a: "Sí, contamos con sala de procedimientos endoscópicos propia." },
      { q: "¿Debo ir en ayunas?", a: "Para algunos estudios sí; te lo indicamos al agendar." },
    ],
    doctorIds: [],
    metaTitle: "Gastroenterólogo en Quito — Gastroenterología | QMC Medisuport",
    metaDescription:
      "Gastroenterólogo en Quito para gastritis, reflujo, colon irritable y endoscopía. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "endocrinologia",
    nombre: "Endocrinología",
    icon: Gauge,
    categoria: "Especialidades médicas",
    descCorta: "Manejo de hormonas, tiroides, diabetes y metabolismo.",
    descLarga:
      "Diagnóstico y tratamiento de trastornos hormonales y metabólicos, incluyendo diabetes, tiroides y problemas de peso, con seguimiento de laboratorio.",
    queTratamos: [
      "Diabetes",
      "Tiroides",
      "Trastornos hormonales",
      "Sobrepeso y obesidad",
      "Colesterol y triglicéridos",
      "Osteoporosis",
    ],
    doctorIds: [],
    metaTitle: "Endocrinólogo en Quito — Endocrinología | QMC Medisuport",
    metaDescription:
      "Endocrinólogo en Quito para diabetes, tiroides y trastornos hormonales. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "alergologia",
    nombre: "Alergología",
    icon: Leaf,
    categoria: "Especialidades médicas",
    descCorta: "Diagnóstico y control de alergias respiratorias y de piel.",
    descLarga:
      "Estudio y tratamiento de las alergias que afectan tu respiración y tu piel, identificando los desencadenantes para controlar los síntomas a largo plazo.",
    queTratamos: [
      "Rinitis alérgica",
      "Asma alérgica",
      "Alergias de piel",
      "Alergias alimentarias",
      "Pruebas de alergia",
      "Inmunoterapia",
    ],
    doctorIds: [],
    metaTitle: "Alergólogo en Quito — Alergología | QMC Medisuport",
    metaDescription:
      "Alergólogo en Quito para rinitis, asma y alergias de piel. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "neumologia",
    nombre: "Neumología",
    icon: Wind,
    categoria: "Especialidades médicas",
    descCorta: "Salud respiratoria, con espirometría en consulta.",
    descLarga:
      "Diagnóstico y tratamiento de enfermedades de los pulmones y las vías respiratorias, como asma y EPOC, con espirometría para medir tu función pulmonar.",
    queTratamos: [
      "Asma",
      "EPOC",
      "Tos crónica",
      "Infecciones respiratorias",
      "Espirometría",
      "Dificultad para respirar",
    ],
    doctorIds: [],
    metaTitle: "Neumólogo en Quito — Neumología | QMC Medisuport",
    metaDescription:
      "Neumólogo en Quito para asma, EPOC y espirometría. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "urologia",
    nombre: "Urología",
    icon: Droplets,
    categoria: "Especialidades médicas",
    descCorta: "Salud urinaria y reproductiva masculina.",
    descLarga:
      "Diagnóstico y tratamiento de las vías urinarias y del aparato reproductor masculino, con estudios como uroflujometría y uretrocistografía en consultorio propio.",
    queTratamos: [
      "Infecciones urinarias",
      "Próstata",
      "Cálculos renales",
      "Uroflujometría",
      "Uretrocistografía",
      "Salud sexual masculina",
    ],
    doctorIds: [],
    metaTitle: "Urólogo en Quito — Urología | QMC Medisuport",
    metaDescription:
      "Urólogo en Quito para próstata, infecciones urinarias y estudios urológicos. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "cardiologia",
    nombre: "Cardiología",
    icon: HeartPulse,
    categoria: "Especialidades médicas",
    descCorta: "Cuidado del corazón con electro y ecocardiograma.",
    descLarga:
      "Diagnóstico y control de enfermedades del corazón y la presión arterial, con electrocardiograma y ecocardiograma para evaluar tu salud cardiovascular.",
    queTratamos: [
      "Hipertensión arterial",
      "Electrocardiograma",
      "Ecocardiograma",
      "Arritmias",
      "Chequeo cardiovascular",
      "Riesgo cardíaco",
    ],
    doctorIds: [],
    metaTitle: "Cardiólogo en Quito — Cardiología | QMC Medisuport",
    metaDescription:
      "Cardiólogo en Quito con electrocardiograma y ecocardiograma. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "otorrinolaringologia",
    nombre: "Otorrinolaringología",
    icon: Ear,
    categoria: "Especialidades médicas",
    descCorta: "Oído, nariz y garganta, con estudios de audición.",
    descLarga:
      "Diagnóstico y tratamiento de problemas de oído, nariz y garganta, con cabina de audio para audiometría tonal y logoaudiometría.",
    queTratamos: [
      "Otitis y problemas de oído",
      "Sinusitis y rinitis",
      "Audiometría tonal",
      "Logoaudiometría",
      "Vértigo",
      "Amígdalas y garganta",
    ],
    doctorIds: [],
    metaTitle: "Otorrinolaringólogo en Quito | QMC Medisuport",
    metaDescription:
      "Otorrinolaringólogo en Quito para oído, nariz, garganta y audiometría. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "psiquiatria",
    nombre: "Psiquiatría",
    icon: Brain,
    categoria: "Especialidades médicas",
    descCorta: "Atención de la salud mental con criterio médico.",
    descLarga:
      "Diagnóstico y tratamiento de trastornos de salud mental como ansiedad y depresión, con un enfoque humano, confidencial y sin prejuicios.",
    queTratamos: [
      "Ansiedad",
      "Depresión",
      "Trastornos del sueño",
      "Estrés",
      "Trastornos del ánimo",
      "Seguimiento psiquiátrico",
    ],
    doctorIds: [],
    metaTitle: "Psiquiatra en Quito — Psiquiatría | QMC Medisuport",
    metaDescription:
      "Psiquiatra en Quito para ansiedad, depresión y salud mental. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "psicologia",
    nombre: "Psicología",
    icon: MessageCircle,
    categoria: "Especialidades médicas",
    descCorta: "Acompañamiento psicológico para niños, adultos y familias.",
    descLarga:
      "Terapia psicológica para manejar emociones, relaciones y momentos difíciles, con un espacio seguro y confidencial para cada etapa de la vida.",
    queTratamos: [
      "Ansiedad y estrés",
      "Terapia individual",
      "Terapia familiar",
      "Autoestima",
      "Duelo",
      "Apoyo emocional infantil",
    ],
    doctorIds: [],
    metaTitle: "Psicólogo en Quito — Psicología | QMC Medisuport",
    metaDescription:
      "Psicólogo en Quito para terapia individual, familiar e infantil. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "neurologia",
    nombre: "Neurología",
    icon: Brain,
    categoria: "Especialidades médicas",
    descCorta: "Diagnóstico y tratamiento del sistema nervioso.",
    descLarga:
      "Atención de enfermedades del cerebro, los nervios y los músculos, como migrañas, epilepsia y trastornos del movimiento, con apoyo de neurofisiología.",
    queTratamos: [
      "Migraña y cefaleas",
      "Epilepsia",
      "Mareos y vértigo",
      "Trastornos del movimiento",
      "Neuropatías",
      "Pérdida de memoria",
    ],
    doctorIds: [],
    metaTitle: "Neurólogo en Quito — Neurología | QMC Medisuport",
    metaDescription:
      "Neurólogo en Quito para migraña, epilepsia y trastornos neurológicos. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "nutricion",
    nombre: "Nutrición",
    icon: Apple,
    categoria: "Especialidades médicas",
    descCorta: "Planes de alimentación personalizados para tu salud.",
    descLarga:
      "Evaluación nutricional y planes de alimentación a tu medida para bajar de peso, controlar enfermedades o mejorar tu energía y bienestar.",
    queTratamos: [
      "Control de peso",
      "Nutrición clínica",
      "Diabetes y colesterol",
      "Alimentación deportiva",
      "Nutrición infantil",
      "Hábitos saludables",
    ],
    doctorIds: [],
    metaTitle: "Nutricionista en Quito — Nutrición | QMC Medisuport",
    metaDescription:
      "Nutricionista en Quito para control de peso y planes de alimentación. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "logopedia-foniatria",
    nombre: "Logopedia y Foniatría",
    icon: Speech,
    categoria: "Especialidades médicas",
    descCorta: "Terapia del lenguaje, habla y voz para niños y adultos.",
    descLarga:
      "Evaluación y tratamiento de los trastornos del lenguaje, el habla, la voz y la deglución, con terapia personalizada para niños y adultos.",
    queTratamos: [
      "Retraso del lenguaje",
      "Problemas de pronunciación",
      "Trastornos de la voz",
      "Tartamudez",
      "Dificultades de deglución",
      "Rehabilitación del habla",
    ],
    doctorIds: [],
    metaTitle: "Logopedia y Foniatría en Quito | QMC Medisuport",
    metaDescription:
      "Logopedia y foniatría en Quito: terapia de lenguaje, habla y voz. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "medicina-ocupacional",
    nombre: "Medicina Ocupacional",
    icon: HardHat,
    categoria: "Especialidades médicas",
    descCorta: "Salud laboral y chequeos para empresas y trabajadores.",
    descLarga:
      "Evaluaciones médicas ocupacionales para el ingreso, control y retiro del personal, ayudando a las empresas a cuidar la salud de su equipo y cumplir la normativa.",
    queTratamos: [
      "Exámenes de ingreso",
      "Chequeos periódicos",
      "Exámenes de retiro",
      "Aptitud laboral",
      "Certificados ocupacionales",
      "Salud del trabajador",
    ],
    doctorIds: [],
    metaTitle: "Medicina Ocupacional en Quito | QMC Medisuport",
    metaDescription:
      "Medicina ocupacional en Quito: exámenes de ingreso, periódicos y de retiro para empresas. Agenda por WhatsApp en QMC Medisuport.",
  },

  // ─────────────── Diagnóstico y procedimientos ───────────────
  {
    slug: "imagenologia",
    nombre: "Imagenología",
    icon: ScanLine,
    categoria: "Diagnóstico y procedimientos",
    descCorta: "Ecografías y radiografías para apoyar tu diagnóstico.",
    descLarga:
      "Estudios de imagen para diagnóstico preciso: ecografías (incluida ecografía 3D/4D/5D) y radiografías, integrados a tu atención médica.",
    queTratamos: [
      "Ecografía general",
      "Ecografía 3D / 4D / 5D",
      "Ecografía obstétrica",
      "Radiografías",
      "Estudios de abdomen",
      "Apoyo al diagnóstico",
    ],
    doctorIds: [],
    metaTitle: "Imagenología en Quito — Ecografía y Radiografía | QMC Medisuport",
    metaDescription:
      "Imagenología en Quito: ecografías 3D/4D/5D y radiografías. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "endoscopia",
    nombre: "Endoscopía digestiva alta",
    icon: Microscope,
    categoria: "Diagnóstico y procedimientos",
    descCorta: "Estudio del esófago, estómago y duodeno en sala propia.",
    descLarga:
      "Procedimiento endoscópico para examinar el tracto digestivo alto y diagnosticar gastritis, úlceras y reflujo, en una sala equipada con monitoreo y recuperación.",
    queTratamos: [
      "Gastritis y úlceras",
      "Reflujo",
      "Dolor de estómago",
      "Sangrado digestivo",
      "Toma de biopsias",
      "Diagnóstico digestivo",
    ],
    doctorIds: [],
    metaTitle: "Endoscopía digestiva en Quito | QMC Medisuport",
    metaDescription:
      "Endoscopía digestiva alta en Quito en sala equipada. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "colonoscopia",
    nombre: "Colonoscopía",
    icon: Microscope,
    categoria: "Diagnóstico y procedimientos",
    descCorta: "Estudio del colon para diagnóstico y prevención.",
    descLarga:
      "Procedimiento para examinar el intestino grueso, clave en la detección temprana de pólipos y en el estudio de síntomas digestivos, con sala de recuperación.",
    queTratamos: [
      "Detección de pólipos",
      "Estudio de colon",
      "Sangrado digestivo bajo",
      "Cambios en el hábito intestinal",
      "Prevención de cáncer de colon",
      "Toma de biopsias",
    ],
    doctorIds: [],
    metaTitle: "Colonoscopía en Quito | QMC Medisuport",
    metaDescription:
      "Colonoscopía en Quito para diagnóstico y prevención. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "neurofisiologia",
    nombre: "Neurofisiología",
    icon: Activity,
    categoria: "Diagnóstico y procedimientos",
    descCorta: "Estudios de la función de nervios y músculos.",
    descLarga:
      "Estudios neurofisiológicos para evaluar el funcionamiento de los nervios y los músculos, apoyando el diagnóstico de neuropatías y otras condiciones neurológicas.",
    queTratamos: [
      "Electromiografía",
      "Estudios de conducción nerviosa",
      "Neuropatías",
      "Túnel carpiano",
      "Dolor neuropático",
      "Apoyo a neurología",
    ],
    doctorIds: [],
    metaTitle: "Neurofisiología en Quito | QMC Medisuport",
    metaDescription:
      "Neurofisiología en Quito: estudios de nervios y músculos. Agenda por WhatsApp en QMC Medisuport.",
  },

  // ─────────────────── Rehabilitación ───────────────────
  {
    slug: "rehabilitacion",
    nombre: "Rehabilitación Física",
    icon: Dumbbell,
    categoria: "Rehabilitación",
    principal: true,
    descCorta: "Terapia física para recuperar fuerza, movilidad y calidad de vida.",
    descLarga:
      "Programas de terapia física individualizados y sin límite de tiempo, con electroterapia, ultrasonido, magnetoterapia y gimnasio para recuperarte de lesiones, cirugías o fracturas.",
    queTratamos: [
      "Terapia física",
      "Recuperación de lesiones",
      "Fortalecimiento muscular",
      "Terapia post-fractura",
      "Movilidad articular",
      "Reeducación de la marcha",
    ],
    faqs: [
      { q: "¿Cuántas sesiones necesito?", a: "Depende de tu caso; en la evaluación definimos el plan." },
      { q: "¿El tiempo de terapia es limitado?", a: "No: el tratamiento es individualizado y sin límite de tiempo." },
    ],
    doctorIds: [],
    metaTitle: "Rehabilitación y terapia física en Quito | QMC Medisuport",
    metaDescription:
      "Rehabilitación y terapia física en Quito, individualizada y sin límite de tiempo. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "rehabilitacion-respiratoria",
    nombre: "Rehabilitación Respiratoria",
    icon: Wind,
    categoria: "Rehabilitación",
    descCorta: "Terapia integral para mejorar tu capacidad respiratoria.",
    descLarga:
      "Programa de rehabilitación respiratoria integral para personas con enfermedades pulmonares o secuelas respiratorias, orientado a mejorar la respiración y la resistencia.",
    queTratamos: [
      "Secuelas respiratorias",
      "EPOC y asma",
      "Fortalecimiento respiratorio",
      "Técnicas de respiración",
      "Recuperación post-COVID",
      "Tolerancia al ejercicio",
    ],
    doctorIds: [],
    metaTitle: "Rehabilitación Respiratoria en Quito | QMC Medisuport",
    metaDescription:
      "Rehabilitación respiratoria integral en Quito para mejorar tu capacidad pulmonar. Agenda por WhatsApp en QMC Medisuport.",
  },

  // ─────────────────── Medicina holística ───────────────────
  {
    slug: "medicina-holistica",
    nombre: "Medicina Holística",
    icon: Leaf,
    categoria: "Medicina holística",
    descCorta: "Terapias alternativas que complementan tu tratamiento.",
    descLarga:
      "Terapias de medicina alternativa que complementan la atención médica: ozonoterapia, plasma rico en plaquetas (PRP), electropuntura, aromaterapia y musicoterapia, en un espacio dedicado.",
    queTratamos: [
      "Ozonoterapia",
      "Plasma rico en plaquetas (PRP)",
      "Electropuntura",
      "Aromaterapia",
      "Musicoterapia",
      "Manejo del dolor",
    ],
    doctorIds: [],
    metaTitle: "Medicina Holística en Quito — Ozonoterapia y PRP | QMC Medisuport",
    metaDescription:
      "Medicina holística en Quito: ozonoterapia, plasma rico en plaquetas y más. Agenda por WhatsApp en QMC Medisuport.",
  },

  // ─────────────────── Laboratorio ───────────────────
  {
    slug: "laboratorio-clinico",
    nombre: "Laboratorio Clínico",
    icon: FlaskConical,
    categoria: "Laboratorio",
    descCorta: "Exámenes confiables y rápidos para diagnóstico y control.",
    descLarga:
      "Toma de muestras y exámenes de laboratorio con equipos propios de hematología, química y hormonas, con resultados confiables integrados a tu atención médica.",
    queTratamos: [
      "Biometría hemática",
      "Perfil lipídico",
      "Glucosa y diabetes",
      "Pruebas hormonales",
      "Exámenes de orina",
      "Chequeos preventivos completos",
    ],
    faqs: [
      { q: "¿Debo ir en ayunas?", a: "Para varios exámenes sí; te indicamos al agendar por WhatsApp." },
      { q: "¿En cuánto entregan resultados?", a: "La mayoría el mismo día o al día siguiente." },
    ],
    doctorIds: [],
    metaTitle: "Laboratorio clínico en Quito | QMC Medisuport",
    metaDescription:
      "Laboratorio clínico en Quito: biometría, perfil lipídico, glucosa y más con resultados rápidos. Agenda por WhatsApp en QMC Medisuport.",
  },
] satisfies Specialty[];
// ───────────────────────────────────────────────────────────────────

// Unión literal de los slugs válidos — contrato de tipos para otras capas
// (p.ej. Doctor.especialidades). Un typo se vuelve error de compilación.
export type SpecialtySlug = (typeof specialties)[number]["slug"];

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

export function specialtySlugs(): string[] {
  return specialties.map((s) => s.slug);
}

// Especialidades destacadas para el directorio del home.
export function principalSpecialties(): Specialty[] {
  return specialties.filter((s) => s.principal);
}

// Orden de categorías para el listado completo (/especialidades).
export const categoriaOrden: SpecialtyCategoria[] = [
  "Especialidades médicas",
  "Diagnóstico y procedimientos",
  "Rehabilitación",
  "Medicina holística",
  "Laboratorio",
];

// Agrupa la cartera por categoría, respetando `categoriaOrden`.
export function specialtiesByCategoria(): { categoria: SpecialtyCategoria; items: Specialty[] }[] {
  return categoriaOrden
    .map((categoria) => ({
      categoria,
      items: specialties.filter((s) => s.categoria === categoria),
    }))
    .filter((g) => g.items.length > 0);
}
