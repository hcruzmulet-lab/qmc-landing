# QMC Rediseño — Fase 1: Fundación · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establecer la base del rediseño — paleta oficial de marca, tipografía familiar/segura, modelo de datos (especialidades + médicos) y componentes compartidos reutilizados por la landing y las páginas de especialidad.

**Architecture:** Se reescriben los tokens de diseño en `globals.css` y las fuentes en `layout.tsx` (los componentes existentes que usan los mismos nombres de token se reskinnean automáticamente). Se añade una capa de datos pura con tests (`specialties.ts`, `doctors.ts`, extensión de `site.ts` y `whatsapp.ts`) que es la única fuente de verdad del contenido. Se crean tres componentes presentacionales compartidos (`SpecialtyCard`, `DoctorCard`, `HowToBook`) que consumen esos datos.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · next/font/google · lucide-react 1.x · framer-motion · Vitest + Testing Library (jsdom, `globals: true`, alias `@`).

**Convención del repo:** raíz git en `/Users/henrycruzmulet/work/QMCClinicas`; la app vive en `code/`. Todos los comandos se ejecutan desde `code/`. Commits se hacen desde la raíz git pero `git add` con rutas relativas a `code/` funciona estando en `code/`.

---

## Estructura de archivos (Fase 1)

| Archivo | Responsabilidad | Acción |
|---------|-----------------|--------|
| `code/app/globals.css` | Tokens de color de marca (paleta oficial) | Modificar (líneas 120–132) |
| `code/app/layout.tsx` | Fuentes Hanken Grotesk + Mulish, metadata multi-especialidad | Modificar |
| `code/lib/site.ts` | Datos clínica + `insurances[]` + `permits` | Modificar |
| `code/lib/specialties.ts` | Tipo `Specialty`, las 7 especialidades, helpers | Crear |
| `code/lib/doctors.ts` | Tipo `Doctor`, arreglo de médicos, helper de cruce | Crear |
| `code/lib/whatsapp.ts` | + `buildSpecialtyMessage()` | Modificar |
| `code/lib/__tests__/specialties.test.ts` | Tests de datos/helpers de especialidades | Crear |
| `code/lib/__tests__/doctors.test.ts` | Tests del helper de médicos | Crear |
| `code/lib/__tests__/whatsapp.test.ts` | + test de `buildSpecialtyMessage` | Modificar |
| `code/components/shared/specialty-card.tsx` | Card de especialidad (catálogo + índice) | Crear |
| `code/components/shared/doctor-card.tsx` | Card de médico | Crear |
| `code/components/shared/how-to-book.tsx` | Sección "Cómo agendar — 3 pasos" | Crear |
| `code/components/shared/__tests__/specialty-card.test.tsx` | Render test | Crear |
| `code/components/shared/__tests__/doctor-card.test.tsx` | Render test | Crear |
| `code/components/shared/__tests__/how-to-book.test.tsx` | Render test | Crear |

> Nota de contenido: las descripciones, precios y FAQs de especialidades de este plan son **contenido inicial real y editable**, no placeholders. Se confirman con la clínica antes de pagar publicidad (ver `doc/PROGRESO.md`). El arreglo `doctors` arranca vacío porque las fotos/bios reales se cargan como tarea de contenido; el código y los tests quedan completos.

---

## Task 1: Paleta oficial de marca en tokens

**Files:**
- Modify: `code/app/globals.css:120-132`

- [ ] **Step 1: Reemplazar el bloque "QMC brand tokens"**

Sustituir exactamente las líneas 120–132 (el bloque que empieza con `/* QMC brand tokens */`) por:

```css
/* QMC brand tokens — paleta oficial del manual (doc/logos) */
:root {
  --color-primary: #103158;        /* azul marino — títulos, header, footer */
  --color-on-primary: #FFFFFF;
  --color-secondary: #217499;      /* teal — enlaces, íconos, detalles */
  --color-accent: #059669;         /* verde WhatsApp — botones de conversión (NO cambiar) */
  --color-neutral: #A4B1BF;        /* gris-azul — bordes suaves, texto secundario */
  --color-background: #FFFFFF;
  --color-surface: #F6F8FA;        /* fondos de sección alternos */
  --color-foreground: #14253B;     /* texto principal (navy slate, legible en cuerpo largo) */
  --color-muted: #F1F5F9;
  --color-muted-foreground: #5B6B7B;
  --color-border: #E2E8F0;
  --color-destructive: #DC2626;
}
```

> Los componentes existentes (`cta-button.tsx`, secciones) referencian `var(--color-primary)`, `var(--color-accent)`, etc. Al cambiar solo los valores, se reskinnean a la marca oficial sin tocar su código. `--color-accent` permanece verde a propósito para conservar el botón de WhatsApp.

- [ ] **Step 2: Verificar que la app compila**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run build`
Expected: build exitoso (sin errores de CSS).

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/app/globals.css
git commit -m "feat(design): aplicar paleta oficial de marca QMC"
```

---

## Task 2: Tipografía Hanken Grotesk + Mulish y metadata

**Files:**
- Modify: `code/app/layout.tsx`

- [ ] **Step 1: Reemplazar el contenido completo de `layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Hanken_Grotesk, Mulish } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics-scripts";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QMC Medisuport — Clínica de especialidades en Quito",
  description:
    "Pediatría, Medicina General, Gastroenterología, Traumatología, Fisiatría, Rehabilitación y Laboratorio Clínico en Quito. Atención cercana y segura. Agenda por WhatsApp.",
  openGraph: {
    title: "QMC Medisuport — Clínica de especialidades en Quito",
    description:
      "Especialistas para toda tu familia. Atención cercana y segura. Agenda por WhatsApp.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${hanken.variable} ${mulish.variable} antialiased`}>
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verificar build (descarga de fuentes incluida)**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run build`
Expected: build exitoso; sin errores de `next/font` (Hanken_Grotesk y Mulish son fuentes válidas de Google Fonts).

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/app/layout.tsx
git commit -m "feat(design): tipografía Hanken Grotesk + Mulish y metadata multi-especialidad"
```

---

## Task 3: Extender `site.ts` con seguros y permiso sanitario

**Files:**
- Modify: `code/lib/site.ts`

- [ ] **Step 1: Reemplazar el contenido completo de `site.ts`**

```ts
export const site = {
  legalName: "Medisuport International Medical Support S.A.",
  brand: "QMC Medisuport",
  phone: "(02) 224-7429",
  phoneE164: "+59322247429",
  whatsapp: "0958875624",
  whatsappE164: "593958875624", // sin +, usado en el link wa.me
  email: "info@quitomedicalcenter.com",
  instagram: "https://instagram.com/clinicaqmc",
  instagramHandle: "@clinicaqmc",
  address: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito, Pichincha",
  // TODO(content): confirmar horarios reales con la clínica antes del lanzamiento
  hours: "Lun–Vie 8:00–18:00 · Sáb 8:00–13:00",
  mapsQuery: "Quito Medical Center, Av. 6 de Diciembre, Quito",
  // Aseguradoras aceptadas — confirmar lista real con la clínica
  insurances: [
    "Salud S.A.",
    "BMI",
    "Humana",
    "Ecuasanitas",
    "MediKen",
  ] as string[],
  // Sello sanitario / permiso de funcionamiento — confirmar número real
  permits: {
    label: "Permiso de funcionamiento ARCSA",
    // TODO(content): número de registro real
    number: "",
  },
} as const;
```

- [ ] **Step 2: Verificar que typechea**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/site.ts
git commit -m "feat(data): seguros aceptados y permiso sanitario en site.ts"
```

---

## Task 4: Modelo de datos de especialidades + helpers (TDD)

**Files:**
- Create: `code/lib/specialties.ts`
- Test: `code/lib/__tests__/specialties.test.ts`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/lib/__tests__/specialties.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  specialties,
  getSpecialtyBySlug,
  specialtySlugs,
} from "@/lib/specialties";

describe("specialties data", () => {
  it("contiene exactamente las 7 especialidades del alcance", () => {
    expect(specialties).toHaveLength(7);
    expect(specialtySlugs()).toEqual([
      "pediatria",
      "medicina-general",
      "gastroenterologia",
      "traumatologia",
      "fisiatria",
      "rehabilitacion",
      "laboratorio-clinico",
    ]);
  });

  it("cada especialidad tiene los campos requeridos no vacíos", () => {
    for (const s of specialties) {
      expect(s.slug).toBeTruthy();
      expect(s.nombre).toBeTruthy();
      expect(s.descCorta).toBeTruthy();
      expect(s.descLarga).toBeTruthy();
      expect(s.precio).toBeTruthy();
      expect(s.queTratamos.length).toBeGreaterThanOrEqual(4);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
      expect(s.icon).toBeTruthy();
    }
  });

  it("getSpecialtyBySlug devuelve la especialidad correcta o undefined", () => {
    expect(getSpecialtyBySlug("pediatria")?.nombre).toBe("Pediatría");
    expect(getSpecialtyBySlug("no-existe")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/specialties.test.ts`
Expected: FAIL — "Cannot find module '@/lib/specialties'".

- [ ] **Step 3: Implementar `specialties.ts`**

Crear `code/lib/specialties.ts`:

```ts
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
  metaTitle: string;
  metaDescription: string;
};

// ── Contenido inicial editable (confirmar con la clínica) ──────────
export const specialties: Specialty[] = [
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
];
// ───────────────────────────────────────────────────────────────────

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

export function specialtySlugs(): string[] {
  return specialties.map((s) => s.slug);
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/specialties.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/specialties.ts code/lib/__tests__/specialties.test.ts
git commit -m "feat(data): modelo de 7 especialidades con helpers y tests"
```

---

## Task 5: Modelo de médicos + helper de cruce (TDD)

**Files:**
- Create: `code/lib/doctors.ts`
- Test: `code/lib/__tests__/doctors.test.ts`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/lib/__tests__/doctors.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { doctors, getDoctorsForSpecialty, type Doctor } from "@/lib/doctors";

describe("doctors data", () => {
  it("exporta un arreglo de médicos (puede iniciar vacío)", () => {
    expect(Array.isArray(doctors)).toBe(true);
  });

  it("getDoctorsForSpecialty filtra por slug de especialidad", () => {
    const fixtures: Doctor[] = [
      { id: "d1", nombre: "Dra. A", foto: "/doctors/a.jpg", credenciales: "Pediatra", especialidades: ["pediatria"], bio: "Bio A" },
      { id: "d2", nombre: "Dr. B", foto: "/doctors/b.jpg", credenciales: "Traumatólogo", especialidades: ["traumatologia"], bio: "Bio B" },
    ];
    expect(getDoctorsForSpecialty("pediatria", fixtures)).toHaveLength(1);
    expect(getDoctorsForSpecialty("pediatria", fixtures)[0].id).toBe("d1");
    expect(getDoctorsForSpecialty("cardiologia", fixtures)).toHaveLength(0);
  });

  it("getDoctorsForSpecialty usa el arreglo global por defecto", () => {
    expect(Array.isArray(getDoctorsForSpecialty("pediatria"))).toBe(true);
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/doctors.test.ts`
Expected: FAIL — "Cannot find module '@/lib/doctors'".

- [ ] **Step 3: Implementar `doctors.ts`**

Crear `code/lib/doctors.ts`:

```ts
export type Doctor = {
  id: string;
  nombre: string;
  foto: string; // ruta en public/, p.ej. /doctors/nombre.jpg
  credenciales: string;
  especialidades: string[]; // slugs de lib/specialties.ts
  bio: string;
};

// Poblar con los médicos reales (fotos en code/public/doctors/).
// Vacío por ahora: los componentes manejan la ausencia con gracia.
export const doctors: Doctor[] = [];

export function getDoctorsForSpecialty(
  slug: string,
  source: Doctor[] = doctors
): Doctor[] {
  return source.filter((d) => d.especialidades.includes(slug));
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/doctors.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/doctors.ts code/lib/__tests__/doctors.test.ts
git commit -m "feat(data): modelo de médicos con cruce por especialidad y tests"
```

---

## Task 6: Mensaje de WhatsApp por especialidad (TDD)

**Files:**
- Modify: `code/lib/whatsapp.ts`
- Modify: `code/lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Añadir el test que falla**

Añadir al final de `code/lib/__tests__/whatsapp.test.ts` (dentro del archivo, después del `describe` existente):

```ts
import { buildSpecialtyMessage } from "@/lib/whatsapp";

describe("buildSpecialtyMessage", () => {
  it("arma un mensaje pre-llenado con el nombre de la especialidad", () => {
    expect(buildSpecialtyMessage("Pediatría")).toBe(
      "Hola QMC, quiero agendar una cita de Pediatría."
    );
  });
});
```

> El `import { buildWhatsAppUrl } ...` ya existe arriba en ese archivo; solo se agrega el nuevo import de `buildSpecialtyMessage` y el nuevo `describe`.

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/whatsapp.test.ts`
Expected: FAIL — "buildSpecialtyMessage is not a function" / export no encontrado.

- [ ] **Step 3: Implementar el helper**

Añadir al final de `code/lib/whatsapp.ts`:

```ts
export function buildSpecialtyMessage(nombre: string): string {
  return `Hola QMC, quiero agendar una cita de ${nombre}.`;
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run lib/__tests__/whatsapp.test.ts`
Expected: PASS (3 tests: 2 existentes + 1 nuevo).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/whatsapp.ts code/lib/__tests__/whatsapp.test.ts
git commit -m "feat(whatsapp): mensaje pre-armado por especialidad"
```

---

## Task 7: Componente `SpecialtyCard` (TDD)

**Files:**
- Create: `code/components/shared/specialty-card.tsx`
- Test: `code/components/shared/__tests__/specialty-card.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/shared/__tests__/specialty-card.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { getSpecialtyBySlug } from "@/lib/specialties";

describe("SpecialtyCard", () => {
  it("muestra nombre, descripción corta, precio y enlace a la página de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<SpecialtyCard specialty={pediatria} />);

    expect(screen.getByText("Pediatría")).toBeTruthy();
    expect(screen.getByText(pediatria.descCorta)).toBeTruthy();
    expect(screen.getByText(/\$25/)).toBeTruthy();

    const link = screen.getByRole("link", { name: /pediatría/i });
    expect(link.getAttribute("href")).toBe("/especialidades/pediatria");
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/specialty-card.test.tsx`
Expected: FAIL — "Cannot find module '@/components/shared/specialty-card'".

- [ ] **Step 3: Implementar `SpecialtyCard`**

Crear `code/components/shared/specialty-card.tsx`:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Specialty } from "@/lib/specialties";

export function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const Icon = specialty.icon;
  return (
    <Link
      href={`/especialidades/${specialty.slug}`}
      aria-label={specialty.nombre}
      className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6 transition-shadow duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
    >
      <Icon className="h-8 w-8 text-[var(--color-secondary)]" aria-hidden="true" />
      <h3 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-[var(--color-primary)]">
        {specialty.nombre}
      </h3>
      <p className="mt-2 flex-1 text-sm text-[var(--color-muted-foreground)]">
        {specialty.descCorta}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-[var(--font-heading)] font-semibold tabular-nums text-[var(--color-primary)]">
          {specialty.precio}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-secondary)]">
          Ver más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/specialty-card.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/shared/specialty-card.tsx code/components/shared/__tests__/specialty-card.test.tsx
git commit -m "feat(ui): SpecialtyCard compartida con test"
```

---

## Task 8: Componente `DoctorCard` (TDD)

**Files:**
- Create: `code/components/shared/doctor-card.tsx`
- Test: `code/components/shared/__tests__/doctor-card.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/shared/__tests__/doctor-card.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DoctorCard } from "@/components/shared/doctor-card";
import type { Doctor } from "@/lib/doctors";

const doc: Doctor = {
  id: "d1",
  nombre: "Dra. María Pérez",
  foto: "/doctors/maria.jpg",
  credenciales: "Pediatra · 10 años de experiencia",
  especialidades: ["pediatria"],
  bio: "Especialista en salud infantil con enfoque preventivo.",
};

describe("DoctorCard", () => {
  it("muestra nombre, credenciales, bio y la foto con alt accesible", () => {
    render(<DoctorCard doctor={doc} />);
    expect(screen.getByText("Dra. María Pérez")).toBeTruthy();
    expect(screen.getByText(doc.credenciales)).toBeTruthy();
    expect(screen.getByText(doc.bio)).toBeTruthy();
    const img = screen.getByRole("img", { name: /maría pérez/i });
    expect(img.getAttribute("src")).toContain("maria.jpg");
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/doctor-card.test.tsx`
Expected: FAIL — "Cannot find module '@/components/shared/doctor-card'".

- [ ] **Step 3: Implementar `DoctorCard`**

Crear `code/components/shared/doctor-card.tsx`. Se usa `<img>` nativo (no `next/image`) para que el render test de jsdom sea directo y simple:

```tsx
import type { Doctor } from "@/lib/doctors";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doctor.foto}
        alt={`Foto de ${doctor.nombre}`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
        loading="lazy"
      />
      <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-[var(--color-primary)]">
        {doctor.nombre}
      </h3>
      <p className="mt-1 text-sm font-medium text-[var(--color-secondary)]">
        {doctor.credenciales}
      </p>
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">{doctor.bio}</p>
    </article>
  );
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/doctor-card.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/shared/doctor-card.tsx code/components/shared/__tests__/doctor-card.test.tsx
git commit -m "feat(ui): DoctorCard compartida con test"
```

---

## Task 9: Componente `HowToBook` — Cómo agendar en 3 pasos (TDD)

**Files:**
- Create: `code/components/shared/how-to-book.tsx`
- Test: `code/components/shared/__tests__/how-to-book.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/shared/__tests__/how-to-book.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowToBook } from "@/components/shared/how-to-book";

describe("HowToBook", () => {
  it("muestra los 3 pasos para agendar", () => {
    render(<HowToBook />);
    expect(screen.getByText(/escríbenos por whatsapp/i)).toBeTruthy();
    expect(screen.getByText(/elige tu especialidad y horario/i)).toBeTruthy();
    expect(screen.getByText(/confirma y asiste/i)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/how-to-book.test.tsx`
Expected: FAIL — "Cannot find module '@/components/shared/how-to-book'".

- [ ] **Step 3: Implementar `HowToBook`**

Crear `code/components/shared/how-to-book.tsx`:

```tsx
import { MessageCircle, CalendarCheck, CheckCircle2 } from "lucide-react";

const pasos = [
  {
    icon: MessageCircle,
    titulo: "Escríbenos por WhatsApp",
    desc: "Toca cualquier botón verde y se abre el chat con un mensaje listo.",
  },
  {
    icon: CalendarCheck,
    titulo: "Elige tu especialidad y horario",
    desc: "Te ayudamos a encontrar el día y la hora que mejor te queden.",
  },
  {
    icon: CheckCircle2,
    titulo: "Confirma y asiste",
    desc: "Recibes la confirmación y te esperamos en la clínica.",
  },
];

export function HowToBook() {
  return (
    <section id="como-agendar" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
          Agendar es muy fácil
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pasos.map((p, i) => (
            <div key={p.titulo} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)]">
                <p.icon className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
              </div>
              <span className="mt-4 font-[var(--font-heading)] text-sm font-bold tabular-nums text-[var(--color-neutral)]">
                Paso {i + 1}
              </span>
              <h3 className="mt-1 font-[var(--font-heading)] text-lg font-semibold text-[var(--color-primary)]">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/shared/__tests__/how-to-book.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/shared/how-to-book.tsx code/components/shared/__tests__/how-to-book.test.tsx
git commit -m "feat(ui): HowToBook (3 pasos) con test"
```

---

## Task 10: Verificación integral de la Fase 1

**Files:** (ninguno nuevo)

- [ ] **Step 1: Correr toda la suite de tests**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run test`
Expected: PASS — todos los tests verdes (los 8 previos + specialties + doctors + whatsapp ampliado + 3 render tests).

- [ ] **Step 2: Typecheck y build**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx tsc --noEmit && npm run build`
Expected: sin errores de tipos; build de producción exitoso.

- [ ] **Step 3: Verificación visual rápida (opcional pero recomendada)**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run dev`
Abrir `http://localhost:3000` y confirmar que el sitio actual ahora usa la paleta marino/teal y las fuentes Hanken Grotesk/Mulish. (Las nuevas secciones/datos se integran en la Fase 2.)

---

## Self-review (cobertura del spec)

- **Paleta oficial** → Task 1 ✓
- **Tipografía familiar/segura (Hanken Grotesk + Mulish)** → Task 2 ✓
- **`site.ts` + seguros + permiso sanitario** → Task 3 ✓
- **Modelo de datos `specialties.ts` (7) + helpers** → Task 4 ✓
- **Modelo `doctors.ts` + cruce** → Task 5 ✓
- **Mensaje WhatsApp por especialidad** → Task 6 ✓
- **Componentes compartidos (SpecialtyCard, DoctorCard, HowToBook)** → Tasks 7–9 ✓
- **Reutilización de lógica/tests existentes** → Tasks 3 y 6 extienden sin reescribir ✓

**Tipos consistentes:** `Specialty` (Task 4) lo consume `SpecialtyCard` (Task 7); `Doctor` (Task 5) lo consumen los tests y `DoctorCard` (Task 8); `getDoctorsForSpecialty(slug, source?)` firma usada igual en test y uso real. Sin placeholders de código (el contenido de datos es real y editable; `doctors` vacío es estado válido manejado por los componentes).

**Fuera de esta fase (van en planes siguientes):** ensamblar la landing (Fase 2), routing `/especialidades` + plantilla + SEO/JSON-LD (Fase 3), página B2B (Fase 4), galería/Instagram/seguros como secciones renderizadas, barra CTA sticky móvil.
```
