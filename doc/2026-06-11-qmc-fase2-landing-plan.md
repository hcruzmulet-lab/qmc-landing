# QMC Rediseño — Fase 2: Landing · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensamblar la nueva landing de QMC Medisuport — clínica multi-especialidad — con secciones de confianza + conversión, todas las CTAs a WhatsApp, sobre la fundación de Fase 1 (paleta, fuentes, datos, componentes compartidos).

**Architecture:** Se construyen secciones nuevas en `code/components/sections/` que consumen los datos de Fase 1 (`specialties.ts`, `doctors.ts`, `site.ts`) y los componentes compartidos (`SpecialtyCard`, `DoctorCard`, `HowToBook`). Las secciones existentes ya heredan la paleta oficial vía tokens CSS, así que esta fase añade contenido y reordena, no repinta. Se reensambla `app/page.tsx` en el orden de conversión definido por el patrón de diseño "Trust & Authority + Conversion".

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · lucide-react 1.x · framer-motion · Vitest + Testing Library (jsdom, `globals:true`, alias `@`).

**Dirección de diseño (aplica a TODA la fase — patrón "Trust & Authority + Conversion", de ui-ux-pro-max):**
- Paleta SOLO vía tokens: `--color-primary` (navy #103158), `--color-secondary` (teal #217499), `--color-accent` (verde WhatsApp, SOLO para CTAs), `--color-neutral`, `--color-surface`, `--color-muted`, `--color-foreground`, `--color-muted-foreground`, `--color-border`. Nunca hex crudo en componentes.
- Tipografía: títulos `font-[var(--font-heading)]` (Hanken Grotesk), cuerpo por defecto (Mulish).
- Contenedor: `mx-auto max-w-6xl px-4`. Ritmo vertical de sección: `py-12 sm:py-16`. Alternar fondos `bg-white` / `bg-[var(--color-surface)]`.
- Conversión: una CTA primaria por sección (verde, vía `CtaButton`), `cursor-pointer`, transiciones 150–300ms, feedback hover. CTAs a WhatsApp con mensaje pre-armado y `source` único.
- A11y: contraste ≥4.5:1, íconos decorativos `aria-hidden`, foco visible, `Reveal` respeta `prefers-reduced-motion`. Iconos SVG (lucide), nunca emoji.
- Evitar: neón, motion pesado (animar 1–2 elementos por vista), gradientes morados/IA.
- Mobile-first (375px primero). Sin scroll horizontal.

**Convención del repo:** raíz git `/Users/henrycruzmulet/work/QMCClinicas`; app en `code/`. Comandos desde `code/`. Commits desde la raíz con rutas `code/...`. Branch: `redesign/fase-2-landing`.

---

## Estructura de archivos (Fase 2)

| Archivo | Responsabilidad | Acción |
|---------|-----------------|--------|
| `code/components/sections/specialties.tsx` | Catálogo de las 7 especialidades (grid de `SpecialtyCard`) | Crear (reemplaza el uso de `services.tsx`) |
| `code/components/sections/medical-team.tsx` | Equipo médico (grid de `DoctorCard`, oculto si no hay médicos) | Crear |
| `code/components/sections/insurances.tsx` | Aseguradoras aceptadas (chips desde `site.insurances`) | Crear |
| `code/components/sections/instagram-cta.tsx` | Bloque "Síguenos en Instagram" | Crear |
| `code/components/sections/b2b-teaser.tsx` | Teaser de convenios empresariales (CTA WhatsApp B2B) | Crear |
| `code/components/sections/sticky-mobile-cta.tsx` | Barra CTA fija inferior en móvil | Crear |
| `code/components/sections/trust-bar.tsx` | + sello sanitario ARCSA | Modificar |
| `code/components/sections/header.tsx` | + navegación con anclas | Modificar |
| `code/components/sections/hero.tsx` | Encabezado con promesa multi-especialidad | Modificar |
| `code/app/page.tsx` | Reensamblar secciones en orden de conversión | Modificar |
| Tests `__tests__/*.test.tsx` de cada sección nueva | Render tests | Crear |

Secciones existentes que se mantienen tal cual (ya heredan la paleta vía tokens y siguen vigentes): `offer.tsx` (promo $10), `why-qmc.tsx`, `testimonials.tsx`, `location.tsx`, `faq.tsx`, `footer.tsx`, `whatsapp-fab.tsx`, `how-to-book.tsx` (de Fase 1), `countdown.tsx`, `reveal.tsx`, `cta-button.tsx`. `services.tsx` queda obsoleto: se deja de importar en `page.tsx` (no se borra en esta fase para no romper imports externos; queda muerto y se elimina al final en Task 11).

---

## Task 1: Sección catálogo de especialidades

**Files:**
- Create: `code/components/sections/specialties.tsx`
- Test: `code/components/sections/__tests__/specialties.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/specialties.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Specialties } from "@/components/sections/specialties";

describe("Specialties section", () => {
  it("renderiza el título y las 7 especialidades con enlaces a sus páginas", () => {
    render(<Specialties />);
    expect(screen.getByRole("heading", { name: /especialidades/i })).toBeTruthy();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/especialidades/pediatria");
    expect(hrefs).toContain("/especialidades/laboratorio-clinico");
    expect(links.length).toBeGreaterThanOrEqual(7);
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/specialties.test.tsx`
Expected: FAIL — "Cannot find module '@/components/sections/specialties'".

- [ ] **Step 3: Implementar `specialties.tsx`**

```tsx
import { specialties } from "@/lib/specialties";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { Reveal } from "@/components/sections/reveal";

export function Specialties() {
  return (
    <section id="especialidades" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Nuestras especialidades
          </p>
          <h2 className="mt-2 text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
            Atención especializada para toda tu familia
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--color-muted-foreground)]">
            Un solo lugar para cuidar tu salud: elige la especialidad que necesitas y agenda por WhatsApp.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/specialties.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/specialties.tsx code/components/sections/__tests__/specialties.test.tsx
git commit -m "feat(landing): sección catálogo de especialidades"
```

---

## Task 2: Sección equipo médico (oculta si no hay médicos)

**Files:**
- Create: `code/components/sections/medical-team.tsx`
- Test: `code/components/sections/__tests__/medical-team.test.tsx`

Contexto: `doctors` (de `lib/doctors.ts`) inicia vacío. La sección debe renderizar `null` cuando no hay médicos (no mostrar un encabezado huérfano) y mostrar el grid cuando sí los hay. El componente acepta una prop opcional `team` que por defecto es el arreglo global, para poder testear ambos casos con fixtures.

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/medical-team.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MedicalTeam } from "@/components/sections/medical-team";
import type { Doctor } from "@/lib/doctors";

const team: Doctor[] = [
  { id: "d1", nombre: "Dra. María Pérez", foto: "/doctors/maria.jpg", credenciales: "Pediatra", especialidades: ["pediatria"], bio: "Salud infantil." },
];

describe("MedicalTeam section", () => {
  it("no renderiza nada cuando no hay médicos", () => {
    const { container } = render(<MedicalTeam team={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza el título y las tarjetas cuando hay médicos", () => {
    render(<MedicalTeam team={team} />);
    expect(screen.getByRole("heading", { name: /equipo/i })).toBeTruthy();
    expect(screen.getByText("Dra. María Pérez")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/medical-team.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar `medical-team.tsx`**

```tsx
import { doctors as allDoctors, type Doctor } from "@/lib/doctors";
import { DoctorCard } from "@/components/shared/doctor-card";
import { Reveal } from "@/components/sections/reveal";

export function MedicalTeam({ team = allDoctors }: { team?: Doctor[] }) {
  if (team.length === 0) return null;
  return (
    <section id="equipo" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Nuestro equipo
          </p>
          <h2 className="mt-2 text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
            Especialistas que te atienden
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.06}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/medical-team.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/medical-team.tsx code/components/sections/__tests__/medical-team.test.tsx
git commit -m "feat(landing): sección equipo médico (oculta si vacía)"
```

---

## Task 3: Sección aseguradoras aceptadas

**Files:**
- Create: `code/components/sections/insurances.tsx`
- Test: `code/components/sections/__tests__/insurances.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/insurances.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Insurances } from "@/components/sections/insurances";
import { site } from "@/lib/site";

describe("Insurances section", () => {
  it("muestra el título y cada aseguradora de site.insurances", () => {
    render(<Insurances />);
    expect(screen.getByRole("heading", { name: /seguros/i })).toBeTruthy();
    for (const name of site.insurances) {
      expect(screen.getByText(name)).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/insurances.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar `insurances.tsx`**

Sin logos reales aún: chips de nombre con estilo de marca (cuando haya logos, se reemplazan por imágenes).

```tsx
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

export function Insurances() {
  return (
    <section id="seguros" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold text-[var(--color-primary)]">
            Trabajamos con tus seguros
          </h2>
          <p className="mt-2 text-center text-[var(--color-muted-foreground)]">
            ¿Tienes seguro médico? Escríbenos y confirmamos tu cobertura.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {site.insurances.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 text-sm font-semibold text-[var(--color-primary)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/insurances.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/insurances.tsx code/components/sections/__tests__/insurances.test.tsx
git commit -m "feat(landing): sección aseguradoras aceptadas"
```

---

## Task 4: Sección "Síguenos en Instagram"

**Files:**
- Create: `code/components/sections/instagram-cta.tsx`
- Test: `code/components/sections/__tests__/instagram-cta.test.tsx`

Contexto: usa el `InstagramIcon` existente (`code/components/icons/instagram.tsx`) y `site.instagram` / `site.instagramHandle`. La galería de fotos reales se difiere hasta tener assets; esta sección es la invitación a seguir la cuenta (prueba social viva).

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/instagram-cta.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InstagramCta } from "@/components/sections/instagram-cta";
import { site } from "@/lib/site";

describe("InstagramCta section", () => {
  it("muestra el handle y enlaza al perfil de Instagram", () => {
    render(<InstagramCta />);
    expect(screen.getByText(site.instagramHandle)).toBeTruthy();
    const link = screen.getByRole("link", { name: /instagram/i });
    expect(link.getAttribute("href")).toBe(site.instagram);
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/instagram-cta.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar `instagram-cta.tsx`**

```tsx
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/icons/instagram";
import { Reveal } from "@/components/sections/reveal";

export function InstagramCta() {
  return (
    <section id="instagram" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal className="flex flex-col items-center text-center">
          <InstagramIcon className="h-10 w-10" />
          <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-[var(--color-primary)]">
            Síguenos en Instagram
          </h2>
          <p className="mt-2 max-w-xl text-[var(--color-muted-foreground)]">
            Tips de salud, novedades de la clínica y nuestras promociones. Únete a nuestra comunidad.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Instagram de QMC Medisuport"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 font-semibold text-[var(--color-primary)] transition-shadow duration-200 hover:shadow-md"
          >
            <InstagramIcon className="h-5 w-5" />
            {site.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/instagram-cta.test.tsx`
Expected: PASS. (El `aria-label` da al enlace el nombre accesible "...Instagram..." que `getByRole` busca.)

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/instagram-cta.tsx code/components/sections/__tests__/instagram-cta.test.tsx
git commit -m "feat(landing): sección síguenos en Instagram"
```

---

## Task 5: Sección teaser de convenios empresariales (B2B)

**Files:**
- Create: `code/components/sections/b2b-teaser.tsx`
- Test: `code/components/sections/__tests__/b2b-teaser.test.tsx`

Contexto: la página `/convenios-empresariales` se construye en Fase 4. Este teaser convierte ya: su CTA va a WhatsApp con mensaje B2B (`source="b2b"`). Usa `CtaButton` existente.

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/b2b-teaser.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { B2bTeaser } from "@/components/sections/b2b-teaser";

describe("B2bTeaser section", () => {
  it("muestra el título de empresas y un CTA de WhatsApp con mensaje B2B", () => {
    render(<B2bTeaser />);
    expect(screen.getByRole("heading", { name: /empresas/i })).toBeTruthy();
    const cta = screen.getByRole("link", { name: /whatsapp|convenio|empresa/i });
    const href = cta.getAttribute("href") ?? "";
    expect(href).toContain("wa.me/593958875624");
    expect(decodeURIComponent(href)).toMatch(/empresa/i);
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/b2b-teaser.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar `b2b-teaser.tsx`**

```tsx
import { Building2, Check } from "lucide-react";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

const beneficios = [
  "Chequeos ocupacionales para tu personal",
  "Atención preventiva con tarifas corporativas",
  "Coordinación ágil por WhatsApp",
];

export function B2bTeaser() {
  return (
    <section id="empresas" className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <Building2 className="h-9 w-9 text-[var(--color-secondary)]" aria-hidden="true" />
            <h2 className="font-[var(--font-heading)] text-3xl font-bold">
              Convenios para empresas
            </h2>
            <p className="text-white/80">
              Cuida la salud de tu equipo con chequeos ocupacionales y atención preventiva.
              Diseñamos un convenio a la medida de tu empresa.
            </p>
            <ul className="space-y-2">
              {beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-white/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)]" strokeWidth={2.5} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end">
            <CtaButton
              message="Hola QMC, represento a una empresa y quiero información sobre convenios y chequeos ocupacionales."
              source="b2b"
              label="Solicitar convenio empresarial"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/b2b-teaser.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/b2b-teaser.tsx code/components/sections/__tests__/b2b-teaser.test.tsx
git commit -m "feat(landing): teaser de convenios empresariales B2B"
```

---

## Task 6: Barra CTA fija inferior en móvil

**Files:**
- Create: `code/components/sections/sticky-mobile-cta.tsx`
- Test: `code/components/sections/__tests__/sticky-mobile-cta.test.tsx`

Contexto: barra fija al fondo, visible solo en móvil (`lg:hidden`), con teléfono + CTA WhatsApp, para captación constante. El `WhatsAppFab` flotante existente seguirá presente en desktop; para no duplicar en móvil, esta barra usa `lg:hidden` y el FAB se mantiene (se acepta el solape menor; el FAB queda por encima a la derecha). Reserva de espacio para no tapar el footer se maneja en `page.tsx` (Task 10) con padding inferior en móvil.

- [ ] **Step 1: Escribir el test que falla**

Crear `code/components/sections/__tests__/sticky-mobile-cta.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";
import { site } from "@/lib/site";

describe("StickyMobileCta", () => {
  it("muestra un enlace de llamada y un CTA de WhatsApp", () => {
    render(<StickyMobileCta />);
    const tel = screen.getByRole("link", { name: /llamar/i });
    expect(tel.getAttribute("href")).toBe(`tel:${site.phoneE164}`);
    const wa = screen.getByRole("link", { name: /whatsapp/i });
    expect(wa.getAttribute("href")).toContain("wa.me/593958875624");
  });
});
```

- [ ] **Step 2: Run test, verify FAILS**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/sticky-mobile-cta.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implementar `sticky-mobile-cta.tsx`**

```tsx
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <a
          href={`tel:${site.phoneE164}`}
          aria-label="Llamar a la clínica"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 font-semibold text-[var(--color-primary)]"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Llamar
        </a>
        <CtaButton
          message="Hola QMC, quiero agendar una cita."
          source="sticky-mobile"
          label="WhatsApp"
          className="flex-1"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test, verify PASSES**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx vitest run components/sections/__tests__/sticky-mobile-cta.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/sticky-mobile-cta.tsx code/components/sections/__tests__/sticky-mobile-cta.test.tsx
git commit -m "feat(landing): barra CTA fija en móvil"
```

---

## Task 7: Sello sanitario ARCSA en la trust bar

**Files:**
- Modify: `code/components/sections/trust-bar.tsx`

- [ ] **Step 1: Leer el archivo actual**

Leer `code/components/sections/trust-bar.tsx` para conocer su estructura exacta (es un grid de señales de confianza con íconos lucide y tokens de marca).

- [ ] **Step 2: Añadir una señal de permiso ARCSA**

Importar `site` desde `@/lib/site` (si no está importado) y `ShieldCheck` desde `lucide-react` (si no está). Añadir como un ítem más del arreglo/listado de señales una entrada con ícono `ShieldCheck` y texto `site.permits.label` (p.ej. "Permiso de funcionamiento ARCSA"). Debe seguir EXACTAMENTE el mismo patrón de markup que las señales existentes (mismas clases de token, mismo tamaño de ícono, `aria-hidden` en el ícono). No cambiar las demás señales.

Acceptance: la trust bar muestra, junto a las señales actuales, una con el texto de `site.permits.label`.

- [ ] **Step 3: Verificar build y typecheck**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx tsc --noEmit && npm run build`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/trust-bar.tsx
git commit -m "feat(landing): sello sanitario ARCSA en trust bar"
```

---

## Task 8: Navegación con anclas en el header

**Files:**
- Modify: `code/components/sections/header.tsx`

Estado actual (referencia): el header tiene logo + teléfono + `CtaButton` "WhatsApp". No tiene navegación.

- [ ] **Step 1: Añadir una nav con anclas (visible en desktop)**

Reemplazar el contenido del `<header>` para insertar, entre el logo y el bloque derecho (teléfono + CTA), una `<nav>` con enlaces de ancla a las secciones. Reemplazar el archivo completo por:

```tsx
import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

const navLinks = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#como-agendar", label: "Cómo agendar" },
  { href: "#seguros", label: "Seguros" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="QMC Medisuport — Clínica de especialidades en Quito"
            width={59}
            height={50}
            priority
            className="h-11 w-auto"
          />
        </div>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Secciones">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-secondary)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-1 text-sm font-medium text-[var(--color-foreground)] sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <CtaButton message="Hola QMC, quiero agendar una cita." source="header" label="WhatsApp" />
        </div>
      </div>
    </header>
  );
}
```

Nota: los `href` de ancla (`#especialidades`, `#como-agendar`, `#seguros`, `#ubicacion`) deben coincidir con los `id` de las secciones. `#especialidades` (Task 1), `#como-agendar` (HowToBook de Fase 1), `#seguros` (Task 3). `#ubicacion` debe existir en `location.tsx`; verificar en Task 10 que la sección de ubicación tenga `id="ubicacion"` (si no lo tiene, añadirlo allí).

- [ ] **Step 2: Verificar build**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run build`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/header.tsx
git commit -m "feat(landing): navegación con anclas en header"
```

---

## Task 9: Hero con promesa multi-especialidad

**Files:**
- Modify: `code/components/sections/hero.tsx`

Contexto: el hero actual lidera SOLO con la promo de chequeo $10. Para el posicionamiento híbrido, el encabezado de la columna izquierda debe liderar con la promesa de clínica multi-especialidad y mantener la promo como gancho secundario. Solo se cambian el badge superior, el `<h1>` y el párrafo de la columna izquierda; la tarjeta de cita (columna derecha), el countdown y las CTAs se mantienen.

- [ ] **Step 1: Cambiar el encabezado de la columna izquierda**

En `code/components/sections/hero.tsx`, reemplazar el `<h1>` actual:

```tsx
            <h1 className="font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl">
              Chequeo integral en Quito
            </h1>
```

por:

```tsx
            <h1 className="font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl">
              Clínica de especialidades en Quito
            </h1>
            <p className="text-lg font-medium text-[var(--color-primary)]">
              Pediatría · Medicina General · Gastroenterología · Traumatología · Fisiatría · Rehabilitación · Laboratorio
            </p>
```

- [ ] **Step 2: Ajustar el párrafo descriptivo**

Reemplazar el párrafo de la columna izquierda:

```tsx
            <p className="text-lg text-[var(--color-muted-foreground)]">
              Incluye revisión de oídos, garganta, fondo de ojo y control de signos vitales.
              Atención preventiva y personalizada para ti y tu familia.
            </p>
```

por:

```tsx
            <p className="text-lg text-[var(--color-muted-foreground)]">
              Atención cercana y segura para toda tu familia, con especialistas en un solo lugar.
              Aprovecha nuestra promoción de chequeo integral por {promo.price}.
            </p>
```

(`promo` ya está importado en el archivo.)

- [ ] **Step 3: Verificar build**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run build`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/hero.tsx
git commit -m "feat(landing): hero lidera con promesa multi-especialidad"
```

---

## Task 10: Reensamblar la landing en `page.tsx`

**Files:**
- Modify: `code/app/page.tsx`
- Modify (si falta el id): `code/components/sections/location.tsx`

- [ ] **Step 1: Asegurar `id="ubicacion"` en la sección de ubicación**

Leer `code/components/sections/location.tsx`. Si su `<section>` no tiene `id="ubicacion"`, añadírselo (sin cambiar nada más). Esto hace funcionar el ancla del header.

- [ ] **Step 2: Reescribir `page.tsx` con el nuevo orden de conversión**

Reemplazar el contenido completo de `code/app/page.tsx` por:

```tsx
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Specialties } from "@/components/sections/specialties";
import { Offer } from "@/components/sections/offer";
import { HowToBook } from "@/components/shared/how-to-book";
import { MedicalTeam } from "@/components/sections/medical-team";
import { WhyQmc } from "@/components/sections/why-qmc";
import { Testimonials } from "@/components/sections/testimonials";
import { Insurances } from "@/components/sections/insurances";
import { InstagramCta } from "@/components/sections/instagram-cta";
import { B2bTeaser } from "@/components/sections/b2b-teaser";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";
import { StickyMobileCta } from "@/components/sections/sticky-mobile-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <TrustBar />
        <Specialties />
        <Offer />
        <HowToBook />
        <MedicalTeam />
        <WhyQmc />
        <Testimonials />
        <Insurances />
        <InstagramCta />
        <B2bTeaser />
        <Location />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileCta />
    </>
  );
}
```

Notas:
- `Services` (`services.tsx`) deja de importarse (queda reemplazado por `Specialties`).
- `pb-20 lg:pb-0` en `<main>` reserva espacio para la barra CTA fija en móvil (Task 6) y lo quita en desktop.
- `MedicalTeam` se renderiza con el arreglo global de médicos (vacío hoy → no muestra nada, sin hueco).

- [ ] **Step 3: Verificar build y typecheck**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npx tsc --noEmit && npm run build`
Expected: sin errores; la home compila con todas las secciones nuevas.

- [ ] **Step 4: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/app/page.tsx code/components/sections/location.tsx
git commit -m "feat(landing): reensamblar home en orden de conversión"
```

---

## Task 11: Eliminar sección obsoleta y verificación integral

**Files:**
- Delete: `code/components/sections/services.tsx`

- [ ] **Step 1: Confirmar que `services.tsx` ya no se importa**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && grep -rn "sections/services" --include=*.tsx --include=*.ts . | grep -v node_modules`
Expected: sin resultados (ningún import activo). Si aparece alguno fuera de `services.tsx` mismo, detener y reportar.

- [ ] **Step 2: Eliminar el archivo obsoleto**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git rm code/components/sections/services.tsx
```

- [ ] **Step 3: Correr toda la suite, typecheck y build**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run test && npx tsc --noEmit && npm run build`
Expected: todos los tests verdes (los de Fase 1 + las 6 secciones nuevas con render test), tsc limpio, build de producción exitoso con la home completa.

- [ ] **Step 4: Verificación visual rápida (recomendada)**

Run: `cd /Users/henrycruzmulet/work/QMCClinicas/code && npm run dev`
Abrir `http://localhost:3000`. Confirmar a 375px y desktop: header con nav, hero con promesa + tarjeta de cita, catálogo de 7 especialidades enlazando a `/especialidades/...` (las páginas dan 404 hasta Fase 3, es esperado), promo, cómo agendar, seguros, Instagram, bloque empresas, ubicación, FAQ, footer, FAB y barra CTA móvil fija.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add -A
git commit -m "chore(landing): eliminar sección services obsoleta"
```

---

## Self-review (cobertura del spec)

- **Catálogo de especialidades (7)** → Task 1 ✓
- **Equipo médico** → Task 2 ✓ (oculto hasta tener médicos)
- **Seguros aceptados** → Task 3 ✓
- **Galería + Instagram** → Task 4 ✓ (Instagram; galería de fotos diferida por falta de assets, anotado)
- **Convenios empresariales (teaser)** → Task 5 ✓
- **Barra CTA sticky móvil** → Task 6 ✓
- **Sello sanitario ARCSA en trust bar** → Task 7 ✓
- **Header con navegación** → Task 8 ✓
- **Hero promesa multi-especialidad + gancho promo** → Task 9 ✓
- **Reensamblar landing (orden de conversión) + promo + cómo agendar + por qué + testimonios + ubicación + FAQ + footer + FAB** → Task 10 ✓
- **Limpieza + verificación** → Task 11 ✓

**Consistencia de tipos/props:** `Specialties` consume `specialties` (Fase 1); `MedicalTeam({ team?: Doctor[] })` usa `Doctor` y `doctors` (Fase 1); `Insurances`/`InstagramCta`/`StickyMobileCta` consumen `site` (Fase 1, con `insurances`/`permits`); todas las CTAs usan `CtaButton({ message, source, label?, className? })` (firma existente). Anclas header ↔ ids de sección verificadas en Task 10.

**Fuera de esta fase (planes siguientes):** páginas `/especialidades` + plantilla + SEO/JSON-LD (Fase 3); página `/convenios-empresariales` (Fase 4); galería de fotos reales, testimonios reales y logos de aseguradoras (tareas de contenido); optimización de imágenes con `next/image` en `DoctorCard`.
```
