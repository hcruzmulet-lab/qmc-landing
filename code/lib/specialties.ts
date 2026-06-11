import {
  Baby,
  Stethoscope,
  Pill,
  Bone,
  Accessibility,
  Dumbbell,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export type SpecialtyFaq = { q: string; a: string };

export type Specialty = {
  slug: string;
  nombre: string;
  icon: LucideIcon;
  descCorta: string;
  descLarga: string;
  precio: string; // CONFIRMAR precios reales con la clínica
  queTratamos: string[];
  faqs: SpecialtyFaq[];
  doctorIds: string[]; // referencia a lib/doctors.ts
  foto?: string; // imagen hero de la página de especialidad (Fase 2)
  incluye?: string[]; // qué incluye la consulta (opcional)
  metaTitle: string;
  metaDescription: string;
};

// ── Contenido inicial editable (confirmar con la clínica) ──────────
export const specialties = [
  {
    slug: "pediatria",
    nombre: "Pediatría",
    icon: Baby,
    descCorta: "Cuidado de la salud de tus hijos, desde recién nacidos hasta adolescentes.",
    descLarga:
      "Atención médica integral para bebés, niños y adolescentes. Controles de crecimiento y desarrollo, vacunación y tratamiento de las enfermedades comunes de la infancia, con un enfoque cercano y preventivo.",
    precio: "$25",
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
    slug: "medicina-general",
    nombre: "Medicina General",
    icon: Stethoscope,
    descCorta: "Tu primer punto de contacto para cualquier necesidad de salud.",
    descLarga:
      "Diagnóstico, tratamiento y orientación para toda la familia. Chequeos preventivos, control de enfermedades crónicas y derivación a especialistas cuando se requiere.",
    precio: "$25",
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
    slug: "gastroenterologia",
    nombre: "Gastroenterología",
    icon: Pill,
    descCorta: "Diagnóstico y tratamiento de enfermedades del sistema digestivo.",
    descLarga:
      "Atención especializada del esófago, estómago, intestino, hígado y páncreas. Tratamiento de gastritis, reflujo, colon irritable y más, con estudios precisos.",
    precio: "$30",
    queTratamos: [
      "Gastritis y reflujo",
      "Dolor abdominal",
      "Colon irritable",
      "Endoscopía digestiva",
      "Problemas hepáticos",
      "Estreñimiento y diarrea crónica",
    ],
    faqs: [
      { q: "¿Realizan endoscopía?", a: "Sí, coordinamos el estudio en la consulta según tu caso." },
      { q: "¿Debo ir en ayunas?", a: "Para algunos estudios sí; te indicamos al agendar por WhatsApp." },
    ],
    doctorIds: [],
    metaTitle: "Gastroenterólogo en Quito — Gastroenterología | QMC Medisuport",
    metaDescription:
      "Gastroenterólogo en Quito para gastritis, reflujo, colon irritable y endoscopía. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "traumatologia",
    nombre: "Traumatología",
    icon: Bone,
    descCorta: "Atención de lesiones de huesos, articulaciones y músculos.",
    descLarga:
      "Diagnóstico y tratamiento de fracturas, esguinces, lesiones deportivas y problemas articulares y de columna, con enfoque en recuperar tu movilidad.",
    precio: "$30",
    queTratamos: [
      "Fracturas y esguinces",
      "Lesiones deportivas",
      "Dolor de rodilla y hombro",
      "Problemas de columna",
      "Artrosis",
      "Rehabilitación post-operatoria",
    ],
    faqs: [
      { q: "¿Atienden lesiones deportivas?", a: "Sí, evaluamos y tratamos lesiones deportivas de todo tipo." },
      { q: "¿Toman radiografías?", a: "Coordinamos los estudios de imagen necesarios para tu diagnóstico." },
    ],
    doctorIds: [],
    metaTitle: "Traumatólogo en Quito — Traumatología | QMC Medisuport",
    metaDescription:
      "Traumatólogo en Quito para fracturas, esguinces y lesiones deportivas. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "fisiatria",
    nombre: "Fisiatría",
    icon: Accessibility,
    descCorta: "Medicina física para recuperar movilidad y manejar el dolor.",
    descLarga:
      "Medicina física y de rehabilitación para recuperar función y movilidad, y tratar el dolor crónico sin cirugía, con planes personalizados.",
    precio: "$30",
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
    slug: "rehabilitacion",
    nombre: "Rehabilitación",
    icon: Dumbbell,
    descCorta: "Terapia física para recuperar fuerza, movilidad y calidad de vida.",
    descLarga:
      "Programas de terapia física personalizados para recuperarte de lesiones, cirugías o fracturas, y reeducar la marcha y el movimiento.",
    precio: "$20",
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
      { q: "¿Necesito orden médica?", a: "No es obligatoria; podemos evaluarte directamente." },
    ],
    doctorIds: [],
    metaTitle: "Rehabilitación y terapia física en Quito | QMC Medisuport",
    metaDescription:
      "Rehabilitación y terapia física en Quito para recuperar movilidad tras lesiones o cirugías. Agenda por WhatsApp en QMC Medisuport.",
  },
  {
    slug: "laboratorio-clinico",
    nombre: "Laboratorio Clínico",
    icon: FlaskConical,
    descCorta: "Exámenes confiables y rápidos para diagnóstico y control.",
    descLarga:
      "Toma de muestras y exámenes de laboratorio con resultados confiables para el diagnóstico y el control de tu salud, integrados a tu atención médica.",
    precio: "Desde $5",
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
