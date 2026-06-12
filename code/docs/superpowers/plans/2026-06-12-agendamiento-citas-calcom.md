# Agendamiento de citas online (Cal.com embebido) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permitir que un paciente, desde la landing, elija una especialidad y agende una cita en un popup embebido de Cal.com, manteniendo la marca del sitio y sin agregar backend.

**Architecture:** El sitio sigue estático. Cal.com cloud (plan gratis) es el almacén de citas y el panel de configuración (disponibilidad/habilitación por especialidad, cancelar/confirmar/reagendar). El repo solo agrega: un módulo de mapeo (`lib/booking.ts`), un botón que abre el popup de Cal.com por especialidad (`BookingButton`), una sección selectora que reusa `lib/specialties.ts` (`AgendaSection`), y el wiring en la landing.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · `@calcom/embed-react` · Vitest + Testing Library.

**Referencia spec:** `docs/superpowers/specs/2026-06-12-agendamiento-citas-calcom-design.md`

---

## Notas para quien implementa

- **El embed de Cal.com requiere config manual previa en cal.com** (cuenta, 7 event-types con slug = slug de especialidad, Google Calendar conectado). El código asume el username en `NEXT_PUBLIC_CAL_USERNAME`. Sin esa config el popup mostrará "event type not found", pero el código, los tests y el build pasan igual. La config manual está en la sección final del spec; no es parte de este plan de código.
- **API de `@calcom/embed-react` (verificada):**
  - `const cal = await getCalApi({ namespace })` inicializa el embed.
  - `cal("ui", { theme, hideEventTypeDetails, layout, styles: { branding: { brandColor } } })` configura apariencia.
  - `cal("on", { action: "bookingSuccessful", callback })` escucha reservas exitosas.
  - El popup se dispara con un elemento que tiene `data-cal-namespace`, `data-cal-link="<username>/<event>"` y `data-cal-config`.
- **Convención de nombres de archivo del repo:** kebab-case (`specialty-card.tsx`, `cta-button.tsx`). Seguir igual: `booking-button.tsx`, `agenda-section.tsx`.
- **Colores de marca (de `app/globals.css` / uso en componentes):** primary navy = `#103158`; el resto se referencia por variables CSS `var(--color-…)`.
- **Tests de componentes que tocan el embed deben mockear `@calcom/embed-react`** (toca `window`/red). Patrón en cada task.

---

## File Structure

- **Create** `lib/booking.ts` — mapeo especialidad → calLink, namespace del embed, filtro de agendables. Lógica pura, testeable sin DOM.
- **Create** `lib/__tests__/booking.test.ts` — unit del módulo anterior.
- **Create** `components/booking/booking-button.tsx` — botón cliente que inicializa el embed y abre el popup de una especialidad.
- **Create** `components/booking/__tests__/booking-button.test.tsx` — render + atributos `data-cal-*` + nombre accesible.
- **Create** `components/booking/agenda-section.tsx` — sección `#agendar`: grid de especialidades agendables + CTA WhatsApp de respaldo.
- **Create** `components/booking/__tests__/agenda-section.test.tsx` — render: heading, una tarjeta/botón por especialidad agendable, fallback WhatsApp.
- **Modify** `lib/specialties.ts` — agregar campo opcional `calEventSlug?: string` al tipo `Specialty`.
- **Modify** `app/page.tsx` — montar `<AgendaSection />` en la landing.
- **Modify** `components/sections/header.tsx` — agregar link de nav `#agendar`.
- **Modify** `.env.local.example` — documentar `NEXT_PUBLIC_CAL_USERNAME`.
- **Modify** `README.md` — nota breve de setup de Cal.com.

---

## Task 1: Instalar dependencia y documentar env

**Files:**
- Modify: `package.json` (vía npm)
- Modify: `.env.local.example`

- [ ] **Step 1: Instalar el paquete del embed**

Run:
```bash
npm install @calcom/embed-react
```
Expected: instala `@calcom/embed-react` y queda en `package.json` → `dependencies`.

- [ ] **Step 2: Verificar que el build/typecheck sigue sano tras la dep**

Run:
```bash
npx tsc --noEmit
```
Expected: sin errores (la dep aún no se usa).

- [ ] **Step 3: Documentar la variable de entorno**

Leer primero el contenido actual:
```bash
cat .env.local.example
```

Agregar al final de `.env.local.example` (mantener lo existente intacto):
```bash
# Username de la cuenta Cal.com (plan gratis) usada para el agendamiento online.
# El calLink de cada especialidad se arma como "<NEXT_PUBLIC_CAL_USERNAME>/<slug>".
# Debe coincidir con el username configurado en cal.com.
NEXT_PUBLIC_CAL_USERNAME=qmc-medisuport
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.local.example
git commit -m "chore(agendamiento): dep @calcom/embed-react + env NEXT_PUBLIC_CAL_USERNAME"
```

---

## Task 2: Módulo de mapeo `lib/booking.ts` (TDD)

**Files:**
- Modify: `lib/specialties.ts` (agregar campo `calEventSlug?`)
- Create: `lib/booking.ts`
- Test: `lib/__tests__/booking.test.ts`

- [ ] **Step 1: Agregar el campo opcional al tipo `Specialty`**

En `lib/specialties.ts`, dentro del `type Specialty = { … }` (después de la línea `foto?: string;`), agregar:
```ts
  calEventSlug?: string; // slug del event-type en Cal.com si difiere del slug de la especialidad
```
No se agrega valor a ninguna especialidad (todas usan el default = su `slug`).

- [ ] **Step 2: Escribir el test que falla**

Crear `lib/__tests__/booking.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  CAL_USERNAME,
  BOOKING_NAMESPACE,
  calLinkFor,
  isBookable,
  bookableSpecialties,
} from "@/lib/booking";
import { specialties, getSpecialtyBySlug } from "@/lib/specialties";

describe("calLinkFor", () => {
  it("arma '<username>/<slug>' usando el slug de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    expect(calLinkFor(pediatria)).toBe(`${CAL_USERNAME}/pediatria`);
  });

  it("prefiere calEventSlug cuando está presente", () => {
    expect(calLinkFor({ slug: "pediatria", calEventSlug: "peques" })).toBe(
      `${CAL_USERNAME}/peques`
    );
  });
});

describe("isBookable / bookableSpecialties", () => {
  it("por defecto todas las especialidades son agendables", () => {
    expect(bookableSpecialties()).toHaveLength(specialties.length);
    expect(specialties.every((s) => isBookable(s.slug))).toBe(true);
  });

  it("preserva el orden del directorio de especialidades", () => {
    expect(bookableSpecialties().map((s) => s.slug)).toEqual(
      specialties.map((s) => s.slug)
    );
  });
});

describe("BOOKING_NAMESPACE", () => {
  it("es un string estable y no vacío", () => {
    expect(BOOKING_NAMESPACE).toBe("agendar");
  });
});
```

- [ ] **Step 3: Correr el test para verlo fallar**

Run:
```bash
npm test -- booking
```
Expected: FAIL — `Cannot find module '@/lib/booking'`.

- [ ] **Step 4: Implementar `lib/booking.ts`**

Crear `lib/booking.ts`:
```ts
import { specialties, type Specialty } from "@/lib/specialties";

// Username de la cuenta Cal.com (plan gratis). Fallback hardcodeado para que
// los tests y el build sean deterministas aunque la env no esté seteada.
export const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CAL_USERNAME ?? "qmc-medisuport";

// Namespace único del embed de agendamiento. Aísla esta instancia del embed
// de cualquier otra que pudiera existir en la página.
export const BOOKING_NAMESPACE = "agendar";

// Slugs que NO se agendan online (siguen solo por WhatsApp). Vacío = todas
// agendables. Es un doble control con el panel de Cal.com: ocultar acá saca la
// especialidad del sitio sin tocar la cuenta de Cal.com.
const NOT_BOOKABLE: ReadonlySet<string> = new Set<string>([]);

export function isBookable(slug: string): boolean {
  return !NOT_BOOKABLE.has(slug);
}

export function bookableSpecialties(): Specialty[] {
  return specialties.filter((s) => isBookable(s.slug));
}

// "qmc-medisuport/pediatria" — el calLink que consume data-cal-link del embed.
export function calLinkFor(s: Pick<Specialty, "slug" | "calEventSlug">): string {
  return `${CAL_USERNAME}/${s.calEventSlug ?? s.slug}`;
}
```

- [ ] **Step 5: Correr el test para verlo pasar**

Run:
```bash
npm test -- booking
```
Expected: PASS (todos los casos).

- [ ] **Step 6: Commit**

```bash
git add lib/booking.ts lib/__tests__/booking.test.ts lib/specialties.ts
git commit -m "feat(agendamiento): lib/booking — mapeo especialidad→calLink y filtro agendables"
```

---

## Task 3: `BookingButton` (TDD)

**Files:**
- Create: `components/booking/booking-button.tsx`
- Test: `components/booking/__tests__/booking-button.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `components/booking/__tests__/booking-button.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingButton } from "@/components/booking/booking-button";
import { getSpecialtyBySlug } from "@/lib/specialties";
import { CAL_USERNAME, BOOKING_NAMESPACE } from "@/lib/booking";

// El embed toca window/red: lo mockeamos. getCalApi resuelve un cal() no-op.
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("BookingButton", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renderiza un botón con los atributos data-cal-* de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} />);

    const btn = screen.getByRole("button", { name: /pediatría/i });
    expect(btn.getAttribute("data-cal-link")).toBe(`${CAL_USERNAME}/pediatria`);
    expect(btn.getAttribute("data-cal-namespace")).toBe(BOOKING_NAMESPACE);
    expect(btn.getAttribute("data-cal-config")).toContain("month_view");
  });

  it("usa el label provisto cuando existe", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} label="Reservar ahora" />);
    expect(screen.getByRole("button", { name: "Reservar ahora" })).toBeTruthy();
  });

  it("inicializa el embed (getCalApi) al montar", async () => {
    const { getCalApi } = await import("@calcom/embed-react");
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} />);
    expect(getCalApi).toHaveBeenCalledWith({ namespace: BOOKING_NAMESPACE });
  });
});
```

- [ ] **Step 2: Correr el test para verlo fallar**

Run:
```bash
npm test -- booking-button
```
Expected: FAIL — `Cannot find module '@/components/booking/booking-button'`.

- [ ] **Step 3: Implementar `BookingButton`**

Crear `components/booking/booking-button.tsx`:
```tsx
"use client";
import { useEffect } from "react";
import { CalendarPlus } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import type { Specialty } from "@/lib/specialties";
import { calLinkFor, BOOKING_NAMESPACE } from "@/lib/booking";
import { trackLeadClick } from "@/lib/analytics";

const BRAND_NAVY = "#103158";

type Props = {
  specialty: Pick<Specialty, "slug" | "nombre" | "calEventSlug">;
  label?: string;
  className?: string;
};

// Botón que abre el popup de Cal.com de UNA especialidad. El popup lo dispara
// el script de Cal.com al detectar los atributos data-cal-*; useEffect solo
// inicializa apariencia y el listener de reserva exitosa (para analytics).
export function BookingButton({ specialty, label, className = "" }: Props) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: BOOKING_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: { branding: { brandColor: BRAND_NAVY } },
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => trackLeadClick(`booking-success:${specialty.slug}`),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [specialty.slug]);

  return (
    <button
      type="button"
      data-cal-namespace={BOOKING_NAMESPACE}
      data-cal-link={calLinkFor(specialty)}
      data-cal-config='{"layout":"month_view"}'
      onClick={() => trackLeadClick(`booking-open:${specialty.slug}`)}
      className={
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 " +
        "font-semibold text-white shadow-sm transition-colors duration-200 " +
        "bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
        "focus-visible:outline-[var(--color-secondary)] " +
        className
      }
    >
      <CalendarPlus className="h-5 w-5" aria-hidden="true" />
      {label ?? `Agendar ${specialty.nombre}`}
    </button>
  );
}
```

- [ ] **Step 4: Correr el test para verlo pasar**

Run:
```bash
npm test -- booking-button
```
Expected: PASS (3 casos).

- [ ] **Step 5: Commit**

```bash
git add components/booking/booking-button.tsx components/booking/__tests__/booking-button.test.tsx
git commit -m "feat(agendamiento): BookingButton abre popup Cal.com por especialidad"
```

---

## Task 4: `AgendaSection` (TDD)

**Files:**
- Create: `components/booking/agenda-section.tsx`
- Test: `components/booking/__tests__/agenda-section.test.tsx`

- [ ] **Step 1: Escribir el test que falla**

Crear `components/booking/__tests__/agenda-section.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgendaSection } from "@/components/booking/agenda-section";
import { bookableSpecialties } from "@/lib/booking";

// BookingButton (hijo cliente) inicializa el embed: mockeamos getCalApi.
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("AgendaSection", () => {
  it("tiene el ancla #agendar y un encabezado de agendamiento", () => {
    const { container } = render(<AgendaSection />);
    expect(container.querySelector("section#agendar")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /agenda tu cita/i })).toBeTruthy();
  });

  it("renderiza un botón de agendar por cada especialidad agendable", () => {
    render(<AgendaSection />);
    const buttons = screen.getAllByRole("button", { name: /agendar/i });
    // Una tarjeta por especialidad agendable (el CTA WhatsApp es un link, no button).
    expect(buttons.length).toBe(bookableSpecialties().length);
  });

  it("muestra el nombre de cada especialidad agendable", () => {
    render(<AgendaSection />);
    for (const s of bookableSpecialties()) {
      expect(screen.getAllByText(s.nombre).length).toBeGreaterThan(0);
    }
  });

  it("incluye un CTA de WhatsApp de respaldo", () => {
    render(<AgendaSection />);
    const wa = screen.getByRole("link", { name: /whatsapp/i });
    expect(wa.getAttribute("href")).toContain("wa.me");
  });
});
```

- [ ] **Step 2: Correr el test para verlo fallar**

Run:
```bash
npm test -- agenda-section
```
Expected: FAIL — `Cannot find module '@/components/booking/agenda-section'`.

- [ ] **Step 3: Implementar `AgendaSection`**

Crear `components/booking/agenda-section.tsx`:
```tsx
import { bookableSpecialties } from "@/lib/booking";
import { BookingButton } from "@/components/booking/booking-button";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

// Sección selectora: el paciente elige especialidad y abre el popup de Cal.com
// sin salir del sitio. Reusa el directorio real de lib/specialties.ts.
export function AgendaSection() {
  const items = bookableSpecialties();
  return (
    <section
      id="agendar"
      className="relative bg-[var(--color-background)] scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="left" className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-[var(--color-primary)] sm:text-5xl">
            Agenda tu cita online
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-muted-foreground)]">
            Elige la especialidad y reserva un horario disponible en segundos.
            Recibirás la confirmación por correo.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.slug}
                  className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6"
                >
                  <Icon
                    className="h-8 w-8 text-[var(--color-secondary)]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold text-[var(--color-primary)]">
                    {s.nombre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--color-muted-foreground)]">
                    {s.descCorta}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="font-display font-semibold tabular-nums text-[var(--color-primary)]">
                      {s.precio}
                    </span>
                    <BookingButton
                      specialty={s}
                      label="Agendar"
                      className="px-4"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Respaldo: si el paciente prefiere humano o el embed no carga. */}
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            ¿Prefieres coordinar por chat?
          </p>
          <CtaButton
            message="Hola QMC, quiero agendar una cita."
            source="agendar-fallback"
            label="Agendar por WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Correr el test para verlo pasar**

Run:
```bash
npm test -- agenda-section
```
Expected: PASS (4 casos).

- [ ] **Step 5: Commit**

```bash
git add components/booking/agenda-section.tsx components/booking/__tests__/agenda-section.test.tsx
git commit -m "feat(agendamiento): AgendaSection — selector de especialidades + fallback WhatsApp"
```

---

## Task 5: Montar en la landing y nav

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/sections/header.tsx`

- [ ] **Step 1: Importar y montar `AgendaSection` en `app/page.tsx`**

En `app/page.tsx`, agregar el import junto a los demás (orden alfabético no requerido; agruparlo con los de sección):
```tsx
import { AgendaSection } from "@/components/booking/agenda-section";
```

Y montar la sección dentro de `<main>`, justo después de `<Offer />`:
```tsx
        <Offer />
        <AgendaSection />
        <HowToBook />
```

- [ ] **Step 2: Agregar el link de nav en `components/sections/header.tsx`**

En el array `navLinks`, agregar la entrada de agendamiento como primera opción de acción (después de `#especialidades`):
```ts
const navLinks = [
  { href: "#promociones", label: "Promociones" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#agendar", label: "Agendar" },
  { href: "#quienes-somos", label: "Quiénes somos" },
  { href: "#como-agendar", label: "Cómo agendar" },
];
```

- [ ] **Step 3: Typecheck + toda la suite**

Run:
```bash
npx tsc --noEmit && npm test
```
Expected: tsc sin errores; todos los tests PASS (incluye los nuevos de booking).

- [ ] **Step 4: Build de producción (sanidad del embed en SSR)**

Run:
```bash
npm run build
```
Expected: build exitoso. `BookingButton` es `"use client"`, así que el embed no rompe el render del servidor.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/sections/header.tsx
git commit -m "feat(agendamiento): montar AgendaSection en landing + link de nav #agendar"
```

---

## Task 6: Documentación de setup

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Leer el README actual**

Run:
```bash
cat README.md
```

- [ ] **Step 2: Agregar sección de agendamiento al README**

Agregar al final del `README.md` (preservando lo existente):
```markdown
## Agendamiento online (Cal.com)

El selector de citas (`#agendar`) usa el embed gratuito de **Cal.com**. Config manual,
una sola vez:

1. Crear cuenta gratis en cal.com con username `qmc-medisuport` (o el que se use).
2. Conectar el Google Calendar de la clínica (sync 2-vías, bloquea slots ocupados).
3. Crear un event-type por especialidad con **slug = slug de la especialidad**
   (`pediatria`, `medicina-general`, `gastroenterologia`, `traumatologia`, `fisiatria`,
   `rehabilitacion`, `laboratorio-clinico`): duración, ubicación = dirección de la clínica,
   precio en la descripción, **disponibilidad propia por especialidad**, zona
   `America/Guayaquil`.
4. Booking questions: nombre, email, **WhatsApp (requerido)**, motivo (opcional).
5. Poner el username en `.env.local`:
   ```bash
   NEXT_PUBLIC_CAL_USERNAME=qmc-medisuport
   ```

Gestión (cancelar/confirmar/reagendar, habilitar/ocultar especialidades, horarios) se hace
en el panel de Cal.com — sin tocar código. Para sacar una especialidad del sitio sin tocar
Cal.com, agregá su slug a `NOT_BOOKABLE` en `lib/booking.ts`.
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs(agendamiento): setup de Cal.com en README"
```

---

## Verificación final

- [ ] **Suite completa verde**

Run:
```bash
npm test && npx tsc --noEmit && npm run build
```
Expected: tests PASS, sin errores de tipos, build exitoso.

- [ ] **Smoke manual (requiere config Cal.com + env)**

1. `npm run dev`, abrir la landing, ir a la sección "Agenda tu cita online".
2. Click en "Agendar" de una especialidad → debe abrir el popup de Cal.com de ESE event-type.
3. Si el popup dice "event type not found", falta crear el event-type con ese slug en Cal.com (ver README) — el código está bien.
4. Verificar fallback: el CTA "Agendar por WhatsApp" abre `wa.me`.

---

## Cobertura del spec (self-review)

- Selección de especialidad + horario + reserva → Task 3 (BookingButton) + Task 4 (AgendaSection) + popup Cal.com. ✓
- Configurar disponibilidad/habilitación **por especialidad** → panel Cal.com (1 event-type por especialidad, slug = slug) + `NOT_BOOKABLE` en `lib/booking.ts`. ✓
- Cancelar/confirmar/reagendar → nativo de Cal.com (panel + links de email). ✓
- Gratis / sin backend → plan gratis Cal.com, repo estático, sin DB. ✓
- Email auto + WhatsApp manual → email nativo de Cal.com; teléfono capturado en booking questions; CTA WhatsApp de respaldo en `AgendaSection`. ✓
- Integración con la marca / mejor UX → selector propio que reusa `specialties.ts`, popup themed navy. ✓
- Accesibilidad (focus, touch ≥44px) → `min-h-12`, `focus-visible:outline` en `BookingButton`. ✓
- Pruebas → Tasks 2-4 (unit `booking.ts`, component `BookingButton`, component `AgendaSection`). ✓
