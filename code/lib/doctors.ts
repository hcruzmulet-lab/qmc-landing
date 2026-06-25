import type { SpecialtySlug } from "@/lib/specialties";

export type Doctor = {
  id: string;
  nombre: string;
  foto?: string; // ruta en public/, p.ej. /doctors/nombre.jpg. Si falta, la card usa avatar con iniciales.
  credenciales: string;
  especialidades: SpecialtySlug[]; // slugs válidos de lib/specialties.ts
  bio: string;
};

// ── Equipo médico real — fuente: "Registro de Títulos del Personal de Salud"
// del establecimiento (docs/AGENTS.xlsx), confirmado por la clínica (2026-06-24).
// El N° de registro es el número de registro profesional del título (dato
// público y verificable) — refuerza Expertise/Trust (E-E-A-T) en un sitio YMYL.
// NO se publican cédulas (privacidad). Bios estrictamente factuales: especialidad
// + institución de formación reales del registro, sin inventar años ni logros.
// Fotos pendientes: mientras no existan, la card cae a un avatar con iniciales.
export const doctors: Doctor[] = [
  // ── Especialidades médicas ──────────────────────────────────────────────
  {
    id: "cantuna-tapuyo",
    nombre: "Dra. Cristina Cantuña Tapuyo",
    credenciales: "Medicina Familiar · Registro N° 1027-15-86067860",
    especialidades: ["medicina-familiar"],
    bio: "Especialista en Medicina Familiar, con formación en la Pontificia Universidad Católica del Ecuador.",
  },
  {
    id: "cabascango",
    nombre: "Dra. Marisol Cabascango",
    credenciales: "Medicina General · Registro N° 1005-2022-2548678",
    especialidades: ["medicina-general"],
    bio: "Doctora en Medicina por la Universidad Central del Ecuador.",
  },
  {
    id: "caballero-martinez",
    nombre: "Dr. Ernesto Caballero Martínez",
    credenciales: "Medicina General · Registro N° 1921218320",
    especialidades: ["medicina-general"],
    bio: "Doctor en Medicina por la Universidad de Ciencias Médicas de La Habana.",
  },
  {
    id: "cando-tapia",
    nombre: "Dr. Renato Cando Tapia",
    credenciales: "Medicina General Integral · Registro N° 1040-2021-2346375",
    especialidades: ["medicina-general"],
    bio: "Especialista en Medicina General Integral, con formación en la Universidad de las Américas.",
  },
  {
    id: "caceres-fernandez",
    nombre: "Dra. Lucía Cáceres Fernández",
    credenciales: "Pediatría · Registro N° 005-10-703911",
    especialidades: ["pediatria"],
    bio: "Especialista en Pediatría, con formación en la Universidad Central del Ecuador.",
  },
  {
    id: "torres-dominguez",
    nombre: "Dra. María Cristina Torres Domínguez",
    credenciales: "Neonatología · Registro N° 8814 R-15-23447",
    especialidades: ["pediatria"],
    bio: "Especialista de primer grado en Neonatología, con formación en el Instituto Superior de Ciencias Médicas de La Habana.",
  },
  {
    id: "argiz-muniz",
    nombre: "Dr. Alejandro Argiz Muñiz",
    credenciales: "Ginecología y Obstetricia · Registro N° CU-15-12003",
    especialidades: ["ginecologia-obstetricia"],
    bio: "Especialista en Ginecología y Obstetricia, con formación en el Instituto Superior de Ciencias Médicas de Villa Clara.",
  },
  {
    id: "carrillo-cordova",
    nombre: "Dra. Carolina Carrillo Córdova",
    credenciales: "Ginecología y Obstetricia · Registro N° 8624140389",
    especialidades: ["ginecologia-obstetricia"],
    bio: "Médico cirujano especialista en Ginecología y Obstetricia.",
  },
  {
    id: "perez-navarro",
    nombre: "Dr. Ovadys Pérez Navarro",
    credenciales: "Medicina Interna · Registro N° 1923203273",
    especialidades: ["medicina-interna"],
    bio: "Especialista de primer grado en Medicina Interna, con formación en la Universidad de Ciencias Médicas de Pinar del Río.",
  },
  {
    id: "barboza-carroz",
    nombre: "Dra. Eva Barboza Carroz",
    credenciales: "Neumología · Registro N° 8622151881",
    especialidades: ["neumologia"],
    bio: "Especialista en Neumonología y Tisiología, con formación en la Universidad del Zulia.",
  },
  {
    id: "fonseca-chamorro",
    nombre: "Dr. William Fonseca Chamorro",
    credenciales: "Urología · Registro N° 1006-2022-2523822",
    especialidades: ["urologia"],
    bio: "Especialista en Urología, con formación en la Universidad de Guayaquil.",
  },
  {
    id: "perez-suarez",
    nombre: "Dr. Frank Pérez Suárez",
    credenciales: "Gastroenterología · Registro N° 8814 R-15-24557",
    especialidades: ["gastroenterologia", "endoscopia", "colonoscopia"],
    bio: "Especialista de primer grado en Gastroenterología, con formación en el Instituto Superior de Ciencias Médicas de La Habana.",
  },
  {
    id: "marrero-falcon",
    nombre: "Dr. Miguel Ángel Marrero Falcón",
    credenciales: "Endocrinología · Registro N° 19212108",
    especialidades: ["endocrinologia"],
    bio: "Especialista de primer grado en Endocrinología, con formación en la Universidad de Ciencias Médicas de Camagüey.",
  },
  {
    id: "velez-perez",
    nombre: "Dra. Gabriela Vélez Pérez",
    credenciales: "Endocrinología · Registro N° 8624188007",
    especialidades: ["endocrinologia"],
    bio: "Especialista en Endocrinología y Enfermedades Metabólicas, con formación en el Hospital Universitario de Caracas.",
  },
  {
    id: "gonzalez-alvarez",
    nombre: "Dr. Nivaldo González Álvarez",
    credenciales: "Psiquiatría · Registro N° 1923204731",
    especialidades: ["psiquiatria"],
    bio: "Especialista de primer grado en Psiquiatría, con formación en el Instituto Superior de Ciencias Médicas de Camagüey.",
  },
  {
    id: "rosales-morales",
    nombre: "Dra. Yulka Rosales Morales",
    credenciales: "Psiquiatría · Registro N° 1923172730",
    especialidades: ["psiquiatria"],
    bio: "Especialista de primer grado en Psiquiatría, con formación en la Universidad de Ciencias Médicas de Granma.",
  },
  {
    id: "torres-artiles",
    nombre: "Dr. Reinaldo Torres Artiles",
    credenciales: "Traumatología y Ortopedia · Registro N° 8814R-14-17057",
    especialidades: ["traumatologia"],
    bio: "Especialista de primer grado en Ortopedia y Traumatología, con formación en el Instituto Superior de Ciencias Médicas de La Habana.",
  },
  {
    id: "leal-olivera",
    nombre: "Dr. Antonio Leal Olivera",
    credenciales: "Traumatología y Ortopedia · Registro N° CU-14-6739",
    especialidades: ["traumatologia"],
    bio: "Especialista de primer grado en Ortopedia y Traumatología, con formación en el Instituto Superior de Ciencias Médicas de Villa Clara.",
  },
  {
    id: "alfonso-ramirez",
    nombre: "Dra. Lisset Alfonso Ramírez",
    credenciales: "Cardiología · Registro N° 1921218118",
    especialidades: ["cardiologia"],
    bio: "Especialista de primer grado en Cardiología, con formación en la Universidad de Ciencias Médicas de Santiago de Cuba.",
  },
  {
    id: "enriquez-guerrero",
    nombre: "Dr. Fernando Enríquez Guerrero",
    credenciales: "Otorrinolaringología · Registro N° 1005-2022-2512776",
    especialidades: ["otorrinolaringologia"],
    bio: "Especialista de primer grado en Otorrinolaringología, con formación en la Universidad Central del Ecuador.",
  },
  {
    id: "aguilera-cruz",
    nombre: "Dra. Annety Aguilera Cruz",
    credenciales: "Neurología · Registro N° 1923152216",
    especialidades: ["neurologia", "neurofisiologia"],
    bio: "Especialista de primer grado en Neurología, con formación en la Universidad de Ciencias Médicas de Holguín.",
  },
  {
    id: "barbosa-rodriguez",
    nombre: "Dra. Osmarie Barbosa Rodríguez",
    credenciales: "Logopedia y Foniatría · Registro N° 1921196374",
    especialidades: ["logopedia-foniatria"],
    bio: "Especialista de primer grado en Logopedia y Foniatría, con formación en el Instituto de Ciencias Médicas de La Habana.",
  },
  {
    id: "pucha-cofrep",
    nombre: "Dr. Edwin Pucha Cofrep",
    credenciales: "Reumatología · Registro N° 1921117857",
    especialidades: ["reumatologia"],
    bio: "Médico reumatólogo, con formación en la Universidad de la Amistad de los Pueblos (Moscú).",
  },
  {
    id: "hechavarria-dominguez",
    nombre: "Dr. Rafael Hechavarría Domínguez",
    credenciales: "Reumatología · Registro N° 8814R-14-19022",
    especialidades: ["reumatologia"],
    bio: "Especialista de primer grado en Reumatología, con formación en el Instituto Superior de Ciencias Médicas de La Habana.",
  },
  {
    id: "mederos-soutuyo",
    nombre: "Dr. Miguel Mederos Soutuyo",
    credenciales: "Dermatología · Registro N° 1921166155",
    especialidades: ["dermatologia"],
    bio: "Especialista de primer grado en Dermatología, con formación en la Universidad de Ciencias Médicas de La Habana.",
  },
  {
    id: "garcia-martinez",
    nombre: "Dr. Mario García Martínez",
    credenciales: "Alergología · Registro N° CU-14-9972",
    especialidades: ["alergologia"],
    bio: "Especialista en Alergología, con formación en la Universidad de Ciencias Médicas de Ciego de Ávila.",
  },
  {
    id: "collado-llopiz",
    nombre: "Dra. Kanie Collado Llopiz",
    credenciales: "Alergología · Registro N° 1921146236",
    especialidades: ["alergologia"],
    bio: "Especialista de primer grado en Alergología, con formación en la Universidad de Ciencias Médicas de Santiago de Cuba.",
  },
  {
    id: "andres-corona",
    nombre: "Dr. Jorge Andrés Corona",
    credenciales: "Imagenología · Registro N° 8812R-14-14740",
    especialidades: ["imagenologia"],
    bio: "Especialista de primer grado en Imagenología, con formación en el Instituto Superior de Ciencias Médicas de Santiago de Cuba.",
  },

  // ── Fisiatría y rehabilitación ───────────────────────────────────────────
  {
    id: "torres-cardenas",
    nombre: "Dr. Yunio Torres Cárdenas",
    credenciales: "Medicina Física y Rehabilitación · Registro N° 8814 R-15-25388",
    especialidades: ["fisiatria", "rehabilitacion"],
    bio: "Especialista de primer grado en Medicina Física y Rehabilitación, con formación en la Universidad de Ciencias Médicas de La Habana. Representante legal de QMC Medisuport.",
  },
  {
    id: "parra-napoles",
    nombre: "Dr. Pedro Parra Nápoles",
    credenciales: "Medicina Física y Rehabilitación · Registro N° CU-15-13418",
    especialidades: ["fisiatria", "rehabilitacion"],
    bio: "Especialista de primer grado en Medicina Física y Rehabilitación, con formación en el Instituto Superior de Ciencias Médicas de Camagüey.",
  },
  {
    id: "mili-alfonso",
    nombre: "Dr. Pavel Mili Alfonso",
    credenciales: "Medicina Física y Rehabilitación · Registro N° 8814R-14-17585",
    especialidades: ["fisiatria", "rehabilitacion"],
    bio: "Especialista de primer grado en Medicina Física y Rehabilitación, con formación en el Instituto Superior de Ciencias Médicas de La Habana.",
  },

  // ── Salud mental, nutrición y laboratorio ───────────────────────────────
  {
    id: "prats-recasen",
    nombre: "Psic. Lianne Prats Recasen",
    credenciales: "Psicología · Registro N° 1034-2023-2713833",
    especialidades: ["psicologia"],
    bio: "Licenciada en Psicología por la Universidad Politécnica Salesiana.",
  },
  {
    id: "regalado-santafe",
    nombre: "Psic. Gerson Regalado Santafé",
    credenciales: "Psicología Clínica · Registro N° 1027-2023-2747341",
    especialidades: ["psicologia"],
    bio: "Licenciado en Psicología Clínica por la Pontificia Universidad Católica del Ecuador.",
  },
  {
    id: "hidrobo-garcia",
    nombre: "Nut. Andrés Hidrobo García",
    credenciales: "Nutrición · Registro N° 1027-2022-2451800",
    especialidades: ["nutricion"],
    bio: "Licenciado en Nutrición Humana por la Pontificia Universidad Católica del Ecuador.",
  },
  {
    id: "gonzalon-alcarraz",
    nombre: "BQF. Lenin Gonzalón Alcarraz",
    credenciales: "Laboratorio Clínico · Registro N° 1005-12-1103851",
    especialidades: ["laboratorio-clinico"],
    bio: "Bioquímico clínico por la Universidad Central del Ecuador, magíster en Sistemas de Gestión de Calidad.",
  },
];

export function getDoctorsForSpecialty(
  slug: string,
  source: Doctor[] = doctors
): Doctor[] {
  return source.filter((d) => d.especialidades.includes(slug));
}
