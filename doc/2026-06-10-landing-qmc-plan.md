# QMC Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-focused, mobile-first single-page landing for QMC MediSuport (Quito) that drives traffic from ads to a WhatsApp booking, with the $10 consultation framed as an editable promotional price and full ad tracking.

**Architecture:** Next.js (App Router) static site. All clinic data and the promo price live in typed config files so copy/price changes are one-line edits. Each landing section is an isolated component. A single WhatsApp helper builds the deep-link with a pre-filled message; a single analytics helper fires Meta Pixel + GA4 + Google Ads conversion events on every CTA click. Deploy to Vercel.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, framer-motion, lucide-react (icons), Vitest + Testing Library (unit tests for logic), Vercel (hosting).

**Design system (from ui-ux-pro-max — "Trust & Authority + Conversion"):**
- Primary (medical blue): `#0284C7` · Secondary: `#0EA5E9` · Accent/CTA (green): `#059669`
- Background: `#F0F9FF` · Foreground: `#0F172A` · Muted: `#EFF7FB` · Border: `#E0F0F8` · Destructive: `#DC2626`
- Headings: **Figtree** · Body: **Noto Sans**
- Avoid: purple/pink "AI" gradients, confusing booking, outdated UI. Target WCAG AA+ contrast, reduced-motion support, SVG icons only (lucide), 44px+ touch targets.

---

## File Structure

```
code/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata/SEO, analytics scripts
│   ├── page.tsx            # Landing: imports + orders all sections
│   ├── globals.css         # Tailwind + design tokens (CSS variables)
│   └── icon.png            # Favicon (from logo)
├── components/
│   ├── sections/
│   │   ├── header.tsx          # Sticky header: logo + phone + WhatsApp button
│   │   ├── hero.tsx            # Promo headline, price, urgency badge, CTA
│   │   ├── trust-bar.tsx       # Icon row: location, personalized, preventive, specialists
│   │   ├── offer.tsx           # What the $10 includes (checklist card) + CTA
│   │   ├── services.tsx        # 3 service cards, each with its own WhatsApp CTA
│   │   ├── why-qmc.tsx         # Differentiators / philosophy
│   │   ├── testimonials.tsx    # Social proof (placeholder) + Instagram link
│   │   ├── location.tsx        # Map embed + address/phone/hours
│   │   ├── faq.tsx             # Accordion (shadcn)
│   │   ├── footer.tsx          # Legal, socials, repeat CTA
│   │   └── whatsapp-fab.tsx    # Floating WhatsApp button (client component)
│   └── ui/                 # shadcn components (button, accordion, card, etc.)
├── lib/
│   ├── site.ts             # Clinic data: name, address, phone, whatsapp, instagram, hours
│   ├── promo.ts            # Promo price config (editable in one place)
│   ├── whatsapp.ts         # buildWhatsAppUrl(message) helper
│   └── analytics.ts        # trackLeadClick() — fires Pixel + GA4 + Google Ads
├── lib/__tests__/
│   ├── whatsapp.test.ts
│   ├── promo.test.ts
│   └── analytics.test.ts
├── public/
│   └── logo.svg            # QMC logo (user-provided; placeholder until then)
├── .env.local.example      # Tracking IDs (Pixel, GA4, Google Ads)
├── components.json         # shadcn config
└── package.json
```

---

## Task 0: Scaffold project + git

**Files:**
- Create: `code/` Next.js app, repo `.git`

- [ ] **Step 1: Init git at project root**

Run from `/Users/henrycruzmulet/work/QMCClinicas`:
```bash
git init
printf "node_modules\n.next\n.env*.local\n.DS_Store\ndist\n" > .gitignore
git add .gitignore doc/
git commit -m "chore: init repo with design spec and plan"
```

- [ ] **Step 2: Scaffold Next.js into code/**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas
npx create-next-app@latest code --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```
Expected: `code/` now contains a Next.js app. If prompted, accept defaults.

- [ ] **Step 3: Install runtime + test deps**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm install framer-motion lucide-react
npm install -D vitest @testing-library/react @testing-library/dom jsdom @vitejs/plugin-react
```
Expected: installs succeed, `package.json` lists all packages.

- [ ] **Step 4: Init shadcn/ui**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npx shadcn@latest init -d
npx shadcn@latest add button card accordion badge
```
Expected: `components/ui/` created with button, card, accordion, badge. `components.json` exists.

- [ ] **Step 5: Add Vitest config**

Create `code/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```
Add to `code/package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Verify dev server + test runner boot**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test 2>&1 | head -5    # expect: "No test files found" (exit 0 ok) — confirms vitest runs
npm run build 2>&1 | tail -5   # expect: build succeeds
```

- [ ] **Step 7: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/
git commit -m "chore: scaffold Next.js app with Tailwind, shadcn, framer-motion, vitest"
```

---

## Task 1: Clinic data config (`lib/site.ts`)

**Files:**
- Create: `code/lib/site.ts`

- [ ] **Step 1: Create the site config**

Create `code/lib/site.ts`:
```ts
export const site = {
  legalName: "Medisuport International Medical Support S.A.",
  brand: "QMC — Quito Medical Center",
  phone: "(02) 224-7429",
  phoneE164: "+59322247429",
  whatsapp: "0958875624",
  whatsappE164: "593958875624", // no +, used in wa.me link
  email: "info@quitomedicalcenter.com",
  instagram: "https://instagram.com/clinicaqmc",
  instagramHandle: "@clinicaqmc",
  address: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito, Pichincha",
  // TODO(content): confirm real hours with clinic before launch
  hours: "Lun–Vie 8:00–18:00 · Sáb 8:00–13:00",
  mapsQuery: "Quito Medical Center, Av. 6 de Diciembre, Quito",
} as const;
```
Note: `hours` is a known placeholder flagged in the spec — keep the TODO until the clinic confirms.

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/site.ts
git commit -m "feat: add clinic site config"
```

---

## Task 2: Promo price config + test (`lib/promo.ts`)

**Files:**
- Create: `code/lib/promo.ts`
- Test: `code/lib/__tests__/promo.test.ts`

- [ ] **Step 1: Write the failing test**

Create `code/lib/__tests__/promo.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { promo, isPromoActive, savingsLabel } from "@/lib/promo";

describe("promo config", () => {
  it("exposes promo and regular prices", () => {
    expect(promo.price).toBe("$10");
    expect(promo.regularPrice).toBe("$25");
  });

  it("isPromoActive is true when enabled", () => {
    expect(isPromoActive(promo)).toBe(true);
  });

  it("savingsLabel shows the discount amount", () => {
    expect(savingsLabel(promo)).toBe("Ahorras $15");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- promo 2>&1 | tail -10
```
Expected: FAIL — cannot resolve `@/lib/promo`.

- [ ] **Step 3: Write minimal implementation**

Create `code/lib/promo.ts`:
```ts
export type Promo = {
  enabled: boolean;
  price: string;        // promotional price shown everywhere
  regularPrice: string; // struck-through anchor price
  reason: string;       // e.g. "por reapertura"
  validUntil: string;   // human-readable deadline
  scarcity: string;     // urgency line
};

// ── EDIT THE PROMO HERE (single source of truth) ──────────────
export const promo: Promo = {
  enabled: true,
  price: "$10",
  regularPrice: "$25",
  reason: "por reapertura",
  validUntil: "30 de junio",
  scarcity: "Cupos limitados por semana",
};
// ──────────────────────────────────────────────────────────────

export function isPromoActive(p: Promo): boolean {
  return p.enabled;
}

export function savingsLabel(p: Promo): string {
  const toNum = (s: string) => Number(s.replace(/[^0-9.]/g, ""));
  const diff = toNum(p.regularPrice) - toNum(p.price);
  return `Ahorras $${diff}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- promo 2>&1 | tail -10
```
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/promo.ts code/lib/__tests__/promo.test.ts
git commit -m "feat: add editable promo price config with tests"
```

---

## Task 3: WhatsApp link helper + test (`lib/whatsapp.ts`)

**Files:**
- Create: `code/lib/whatsapp.ts`
- Test: `code/lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Write the failing test**

Create `code/lib/__tests__/whatsapp.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with the E164 number and url-encoded message", () => {
    const url = buildWhatsAppUrl("Hola QMC, quiero mi consulta de $10");
    expect(url).toBe(
      "https://wa.me/593958875624?text=Hola%20QMC%2C%20quiero%20mi%20consulta%20de%20%2410"
    );
  });

  it("trims surrounding whitespace from the message", () => {
    const url = buildWhatsAppUrl("  hola  ");
    expect(url).toBe("https://wa.me/593958875624?text=hola");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- whatsapp 2>&1 | tail -10
```
Expected: FAIL — cannot resolve `@/lib/whatsapp`.

- [ ] **Step 3: Write minimal implementation**

Create `code/lib/whatsapp.ts`:
```ts
import { site } from "@/lib/site";

export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${site.whatsappE164}?text=${text}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- whatsapp 2>&1 | tail -10
```
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/whatsapp.ts code/lib/__tests__/whatsapp.test.ts
git commit -m "feat: add WhatsApp deep-link helper with tests"
```

---

## Task 4: Analytics helper + test (`lib/analytics.ts`)

**Files:**
- Create: `code/lib/analytics.ts`
- Create: `code/.env.local.example`
- Test: `code/lib/__tests__/analytics.test.ts`

- [ ] **Step 1: Write the failing test**

Create `code/lib/__tests__/analytics.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackLeadClick } from "@/lib/analytics";

describe("trackLeadClick", () => {
  beforeEach(() => {
    (window as any).fbq = vi.fn();
    (window as any).gtag = vi.fn();
  });

  it("fires Meta Pixel Lead event with the source", () => {
    trackLeadClick("hero");
    expect((window as any).fbq).toHaveBeenCalledWith("track", "Lead", { source: "hero" });
  });

  it("fires GA4 generate_lead event with the source", () => {
    trackLeadClick("hero");
    expect((window as any).gtag).toHaveBeenCalledWith("event", "generate_lead", { source: "hero" });
  });

  it("does not throw when trackers are absent", () => {
    delete (window as any).fbq;
    delete (window as any).gtag;
    expect(() => trackLeadClick("footer")).not.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- analytics 2>&1 | tail -10
```
Expected: FAIL — cannot resolve `@/lib/analytics`.

- [ ] **Step 3: Write minimal implementation**

Create `code/lib/analytics.ts`:
```ts
type Trackers = {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

// Fires a lead-conversion event on every WhatsApp CTA click.
// `source` identifies which CTA fired it (hero, offer, services, footer, fab).
export function trackLeadClick(source: string): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Trackers;
  try {
    w.fbq?.("track", "Lead", { source });
    w.gtag?.("event", "generate_lead", { source });
  } catch {
    // never let analytics break a real click-through
  }
}
```

Create `code/.env.local.example`:
```
# Copy to .env.local and fill with real IDs before deploy
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test -- analytics 2>&1 | tail -10
```
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/lib/analytics.ts code/lib/__tests__/analytics.test.ts code/.env.local.example
git commit -m "feat: add lead-click analytics helper with tests"
```

---

## Task 5: Design tokens + fonts (`globals.css`, `layout.tsx`)

**Files:**
- Modify: `code/app/globals.css`
- Modify: `code/app/layout.tsx`

- [ ] **Step 1: Add design tokens to globals.css**

In `code/app/globals.css`, after the existing `@import "tailwindcss";` line, add:
```css
:root {
  --color-primary: #0284C7;
  --color-on-primary: #FFFFFF;
  --color-secondary: #0EA5E9;
  --color-accent: #059669;     /* CTA / WhatsApp green */
  --color-background: #F0F9FF;
  --color-foreground: #0F172A;
  --color-muted: #EFF7FB;
  --color-muted-foreground: #475569;
  --color-border: #E0F0F8;
  --color-destructive: #DC2626;
}

@theme inline {
  --color-brand: var(--color-primary);
  --color-cta: var(--color-accent);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
}
```

- [ ] **Step 2: Wire Figtree + Noto Sans in layout.tsx**

Replace the font setup in `code/app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700"] });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","700"] });

export const metadata: Metadata = {
  title: "QMC — Consulta integral $10 en Quito | Medicina Familiar y Neumología",
  description:
    "Por reapertura: chequeo integral por $10 (oídos, garganta, fondo de ojo y signos vitales). Medicina Familiar y Neumología en Av. 6 de Diciembre, Quito. Agenda por WhatsApp.",
  openGraph: {
    title: "QMC — Consulta integral $10 en Quito",
    description: "Chequeo integral promocional. Agenda por WhatsApp.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${figtree.variable} ${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Map font variables to Tailwind in globals.css**

Append to `code/app/globals.css`:
```css
@theme inline {
  --font-sans: var(--font-body);
  --font-heading: var(--font-heading);
}
```

- [ ] **Step 4: Verify build**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run build 2>&1 | tail -5
```
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/app/globals.css code/app/layout.tsx
git commit -m "feat: add medical design tokens and Figtree/Noto Sans fonts"
```

---

## Task 6: Shared CTA button (`components/sections/cta-button.tsx`)

A reusable client component used by every section so tracking + WhatsApp logic lives in one place.

**Files:**
- Create: `code/components/sections/cta-button.tsx`

- [ ] **Step 1: Create the CTA component**

Create `code/components/sections/cta-button.tsx`:
```tsx
"use client";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackLeadClick } from "@/lib/analytics";

type Props = {
  message: string;
  source: string;
  label?: string;
  className?: string;
};

export function CtaButton({ message, source, label = "Agendar por WhatsApp", className = "" }: Props) {
  const href = buildWhatsAppUrl(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadClick(source)}
      className={
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 " +
        "font-semibold text-white shadow-sm transition-colors duration-200 " +
        "bg-[var(--color-accent)] hover:bg-[#047857] focus-visible:outline focus-visible:outline-2 " +
        "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
        className
      }
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
```

- [ ] **Step 2: Verify it type-checks**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npx tsc --noEmit 2>&1 | tail -5
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/cta-button.tsx
git commit -m "feat: add reusable WhatsApp CTA button with tracking"
```

---

## Task 7: Header section (`components/sections/header.tsx`)

**Files:**
- Create: `code/components/sections/header.tsx`

- [ ] **Step 1: Create the sticky header**

Create `code/components/sections/header.tsx`:
```tsx
import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="QMC Quito Medical Center" width={40} height={40} priority />
          <span className="font-[var(--font-heading)] text-lg font-bold text-[var(--color-primary)]">QMC</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-1 text-sm font-medium text-[var(--color-foreground)] sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <CtaButton message="Hola QMC, quiero agendar mi consulta integral de $10" source="header" label="WhatsApp" />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add placeholder logo**

Create `code/public/logo.svg` (replace with real logo later):
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
printf '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%230284C7"/><text x="20" y="26" font-family="sans-serif" font-size="16" font-weight="700" fill="white" text-anchor="middle">Q</text></svg>' > public/logo.svg
```

- [ ] **Step 3: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/header.tsx code/public/logo.svg
git commit -m "feat: add sticky header with logo, phone, WhatsApp CTA"
```

---

## Task 8: Hero section (`components/sections/hero.tsx`)

**Files:**
- Create: `code/components/sections/hero.tsx`

- [ ] **Step 1: Create the hero**

Create `code/components/sections/hero.tsx`:
```tsx
import { Clock } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-muted)] px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Promo {promo.reason} · válida hasta {promo.validUntil}
          </span>
          <h1 className="mt-4 font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl">
            Chequeo integral por{" "}
            <span className="text-[var(--color-accent)]">{promo.price}</span>{" "}
            <span className="text-2xl font-normal text-[var(--color-muted-foreground)] line-through">
              {promo.regularPrice}
            </span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
            Incluye revisión de oídos, garganta, fondo de ojo y control de signos vitales.
            Atención cercana y preventiva en el norte de Quito.
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-accent)]">
            {savingsLabel(promo)} · {promo.scarcity}
          </p>
          <div className="mt-6">
            <CtaButton
              message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}`}
              source="hero"
            />
          </div>
        </div>
        <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)]" aria-hidden="true" />
      </div>
    </section>
  );
}
```
Note: the gradient block is a placeholder for the clinic/doctor photo; swap for a `next/image` when real photos arrive.

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/hero.tsx
git commit -m "feat: add hero with promo price and WhatsApp CTA"
```

---

## Task 9: Trust bar (`components/sections/trust-bar.tsx`)

**Files:**
- Create: `code/components/sections/trust-bar.tsx`

- [ ] **Step 1: Create the trust bar**

Create `code/components/sections/trust-bar.tsx`:
```tsx
import { MapPin, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";

const items = [
  { icon: MapPin, label: "Av. 6 de Diciembre, Quito" },
  { icon: HeartHandshake, label: "Atención cercana y personalizada" },
  { icon: ShieldCheck, label: "Enfoque preventivo" },
  { icon: Stethoscope, label: "Médicos especialistas" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-[var(--color-foreground)]">
            <Icon className="h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/trust-bar.tsx
git commit -m "feat: add trust bar with credibility icons"
```

---

## Task 10: Offer section (`components/sections/offer.tsx`)

**Files:**
- Create: `code/components/sections/offer.tsx`

- [ ] **Step 1: Create the offer card**

Create `code/components/sections/offer.tsx`:
```tsx
import { Check } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";

const includes = [
  "Revisión de oídos",
  "Revisión de garganta",
  "Fondo de ojo",
  "Control de signos vitales",
];

export function Offer() {
  return (
    <section id="oferta" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-sm">
        <h2 className="font-[var(--font-heading)] text-2xl font-bold text-[var(--color-foreground)]">
          ¿Qué incluye tu consulta integral?
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[var(--color-foreground)]">
              <Check className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-3xl font-bold text-[var(--color-accent)]">{promo.price}</span>
            <span className="ml-2 text-lg text-[var(--color-muted-foreground)] line-through">{promo.regularPrice}</span>
            <p className="text-sm font-medium text-[var(--color-accent)]">{savingsLabel(promo)}</p>
          </div>
          <CtaButton
            message={`Hola QMC, quiero mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
            source="offer"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/offer.tsx
git commit -m "feat: add offer section detailing the $10 consultation"
```

---

## Task 11: Services section (`components/sections/services.tsx`)

**Files:**
- Create: `code/components/sections/services.tsx`

- [ ] **Step 1: Create the services grid**

Create `code/components/sections/services.tsx`:
```tsx
import { Wind, Users, ClipboardCheck } from "lucide-react";
import { CtaButton } from "@/components/sections/cta-button";

const services = [
  {
    icon: Wind,
    title: "Neumología",
    desc: "Evaluación de función respiratoria y cuidado integral de pulmones. Una buena respiración mejora tu calidad de vida.",
    message: "Hola QMC, quiero información sobre Neumología.",
    source: "services-neumologia",
  },
  {
    icon: Users,
    title: "Medicina Familiar",
    desc: "Atención cercana para toda tu familia en cada etapa de la vida. Desde $8.",
    message: "Hola QMC, quiero información sobre Medicina Familiar.",
    source: "services-familiar",
  },
  {
    icon: ClipboardCheck,
    title: "Evaluación clínica integral",
    desc: "Enfoque preventivo, diagnóstico preciso y seguimiento continuo.",
    message: "Hola QMC, quiero una evaluación clínica integral.",
    source: "services-evaluacion",
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">
          Nuestros servicios
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col rounded-2xl border border-[var(--color-border)] p-6">
              <s.icon className="h-8 w-8 text-[var(--color-primary)]" aria-hidden="true" />
              <h3 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-[var(--color-foreground)]">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-[var(--color-muted-foreground)]">{s.desc}</p>
              <div className="mt-6">
                <CtaButton message={s.message} source={s.source} label="Consultar" className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/services.tsx
git commit -m "feat: add services section with per-service WhatsApp CTAs"
```

---

## Task 12: Why-QMC section (`components/sections/why-qmc.tsx`)

**Files:**
- Create: `code/components/sections/why-qmc.tsx`

- [ ] **Step 1: Create the differentiators section**

Create `code/components/sections/why-qmc.tsx`:
```tsx
import { ShieldCheck, Microscope, Activity } from "lucide-react";

const points = [
  { icon: ShieldCheck, title: "Prevención", desc: "El cuidado no es solo cuando duele. Cuidamos tu salud antes." },
  { icon: Microscope, title: "Diagnóstico preciso", desc: "Evaluación clínica completa con criterio profesional." },
  { icon: Activity, title: "Seguimiento continuo", desc: "Acompañamiento en cada etapa, no solo una visita." },
];

export function WhyQmc() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">
        ¿Por qué elegir QMC?
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-muted)]">
              <p.icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/why-qmc.tsx
git commit -m "feat: add why-QMC differentiators section"
```

---

## Task 13: Testimonials section (`components/sections/testimonials.tsx`)

**Files:**
- Create: `code/components/sections/testimonials.tsx`

- [ ] **Step 1: Create testimonials (placeholder content)**

Create `code/components/sections/testimonials.tsx`:
```tsx
import { Instagram, Quote } from "lucide-react";
import { site } from "@/lib/site";

// TODO(content): replace with real patient reviews before scaling ad spend.
const testimonials = [
  { name: "Paciente QMC", text: "Atención rápida y muy humana. El chequeo fue completo y claro." },
  { name: "Paciente QMC", text: "Me explicaron todo con paciencia. Excelente medicina familiar." },
  { name: "Paciente QMC", text: "Buen precio y profesionales serios. Recomendado en Quito." },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">
          Lo que dicen nuestros pacientes
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-[var(--color-border)] p-6">
              <Quote className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
              <blockquote className="mt-3 text-sm text-[var(--color-foreground)]">{t.text}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-[var(--color-muted-foreground)]">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
            Síguenos en {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/testimonials.tsx
git commit -m "feat: add testimonials section with Instagram link"
```

---

## Task 14: Location section (`components/sections/location.tsx`)

**Files:**
- Create: `code/components/sections/location.tsx`

- [ ] **Step 1: Create the location section with map embed**

Create `code/components/sections/location.tsx`:
```tsx
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Location() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">Visítanos</h2>
          <ul className="mt-6 space-y-4 text-sm text-[var(--color-foreground)]">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />{site.address}</li>
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" /><a href={`tel:${site.phoneE164}`}>{site.phone}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />{site.hours}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <iframe
            title="Ubicación QMC en Quito"
            src={mapSrc}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/location.tsx
git commit -m "feat: add location section with Google Maps embed"
```

---

## Task 15: FAQ section (`components/sections/faq.tsx`)

**Files:**
- Create: `code/components/sections/faq.tsx`

- [ ] **Step 1: Create FAQ using shadcn accordion**

Create `code/components/sections/faq.tsx`:
```tsx
import { promo } from "@/lib/promo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Necesito cita previa?", a: "Puedes agendar por WhatsApp y coordinamos el horario que mejor te quede." },
  { q: `¿Qué incluye la consulta de ${promo.price}?`, a: "Revisión de oídos, garganta, fondo de ojo y control de signos vitales." },
  { q: "¿Aceptan seguros médicos?", a: "Escríbenos por WhatsApp para confirmar la cobertura según tu caso." },
  { q: "¿Dónde están ubicados?", a: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito." },
];

export function Faq() {
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">
          Preguntas frecuentes
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/faq.tsx
git commit -m "feat: add FAQ accordion section"
```

---

## Task 16: Footer (`components/sections/footer.tsx`)

**Files:**
- Create: `code/components/sections/footer.tsx`

- [ ] **Step 1: Create the footer**

Create `code/components/sections/footer.tsx`:
```tsx
import { Instagram } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-[var(--font-heading)] text-xl font-bold">QMC — Quito Medical Center</p>
          <p className="mt-2 text-sm text-white/80">{site.address}</p>
          <p className="mt-1 text-sm text-white/80">{site.phone}</p>
        </div>
        <div className="flex items-start">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90">
            <Instagram className="h-5 w-5" aria-hidden="true" />
            {site.instagramHandle}
          </a>
        </div>
        <div className="md:text-right">
          <CtaButton message="Hola QMC, quiero agendar una cita." source="footer" />
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/footer.tsx
git commit -m "feat: add footer with legal info and CTA"
```

---

## Task 17: Floating WhatsApp button (`components/sections/whatsapp-fab.tsx`)

**Files:**
- Create: `code/components/sections/whatsapp-fab.tsx`

- [ ] **Step 1: Create the floating button with framer-motion**

Create `code/components/sections/whatsapp-fab.tsx`:
```tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackLeadClick } from "@/lib/analytics";

export function WhatsAppFab() {
  const reduce = useReducedMotion();
  const href = buildWhatsAppUrl("Hola QMC, quiero agendar mi consulta integral de $10");
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadClick("fab")}
      aria-label="Agendar por WhatsApp"
      initial={reduce ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg hover:bg-[#047857] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </motion.a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/sections/whatsapp-fab.tsx
git commit -m "feat: add floating WhatsApp button with spring entrance"
```

---

## Task 18: Assemble the page (`app/page.tsx`)

**Files:**
- Modify: `code/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the full section order**

Replace `code/app/page.tsx` with:
```tsx
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Offer } from "@/components/sections/offer";
import { Services } from "@/components/sections/services";
import { WhyQmc } from "@/components/sections/why-qmc";
import { Testimonials } from "@/components/sections/testimonials";
import { Location } from "@/components/sections/location";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/sections/whatsapp-fab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Offer />
        <Services />
        <WhyQmc />
        <Testimonials />
        <Location />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
```

- [ ] **Step 2: Run full test suite + build**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run test 2>&1 | tail -10    # expect: all unit tests pass
npm run build 2>&1 | tail -10   # expect: build succeeds, page is static
```

- [ ] **Step 3: Visual check in dev**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run dev
```
Open `http://localhost:3000`. Verify on a 375px viewport: header sticky, hero promo price visible, all CTAs open WhatsApp with the right pre-filled text, FAB floats, map loads. Stop the server when done.

- [ ] **Step 4: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/app/page.tsx
git commit -m "feat: assemble full landing page"
```

---

## Task 19: Tracking scripts (Meta Pixel + GA4 + Google Ads)

**Files:**
- Create: `code/components/analytics-scripts.tsx`
- Modify: `code/app/layout.tsx`

- [ ] **Step 1: Create the analytics scripts component**

Create `code/components/analytics-scripts.tsx`:
```tsx
import Script from "next/script";

const PIXEL = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;
const ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

export function AnalyticsScripts() {
  return (
    <>
      {GA4 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4}');${ADS ? `gtag('config','${ADS}');` : ""}`}
          </Script>
        </>
      )}
      {PIXEL && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
```

- [ ] **Step 2: Mount it in layout.tsx**

In `code/app/layout.tsx`, import and render `<AnalyticsScripts />` just inside `<body>`, before `{children}`:
```tsx
import { AnalyticsScripts } from "@/components/analytics-scripts";
// ...
<body className={`${figtree.variable} ${notoSans.variable} antialiased`}>
  <AnalyticsScripts />
  {children}
</body>
```

- [ ] **Step 3: Verify build with empty env (scripts no-op)**

Run:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas/code
npm run build 2>&1 | tail -5
```
Expected: build succeeds (no IDs set yet → scripts render nothing, CTAs still work via the safe-guarded `trackLeadClick`).

- [ ] **Step 4: Commit**

```bash
cd /Users/henrycruzmulet/work/QMCClinicas
git add code/components/analytics-scripts.tsx code/app/layout.tsx
git commit -m "feat: add Meta Pixel + GA4 + Google Ads tracking scripts"
```

---

## Task 20: Deploy to Vercel

**Files:** none (deploy step)

- [ ] **Step 1: Push to a Git remote**

Create a GitHub repo (private) and push:
```bash
cd /Users/henrycruzmulet/work/QMCClinicas
gh repo create qmc-landing --private --source=. --remote=origin --push
```

- [ ] **Step 2: Import to Vercel**

In Vercel: New Project → import the repo → set **Root Directory to `code`** → framework auto-detected as Next.js. Add env vars from `.env.local.example` once the real tracking IDs exist (can be left blank for the first deploy).

- [ ] **Step 3: Verify production**

Open the Vercel URL. Confirm the page renders, CTAs open WhatsApp, and (once IDs are set) Meta Pixel Helper / GA4 DebugView register a `Lead` / `generate_lead` event on CTA click.

- [ ] **Step 4: Connect the custom domain**

When the domain is contracted, add it in Vercel → Domains and update DNS. Update `metadata.openGraph.url` and any absolute URLs.

---

## Post-launch content checklist (not code)

These are flagged placeholders from the spec — resolve before scaling ad spend:
- [ ] Replace `public/logo.svg` with the real QMC logo.
- [ ] Swap hero/section gradient placeholders for real clinic/doctor photos.
- [ ] Confirm real opening hours → update `lib/site.ts`.
- [ ] Replace placeholder testimonials with real patient reviews.
- [ ] Confirm insurance answer in FAQ.
- [ ] Fill real tracking IDs in Vercel env vars.
- [ ] Rotate the 21st.dev API key that was shared in chat.
```
