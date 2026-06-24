import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

// Hrefs root-relative para que funcionen desde el home y desde las sub-páginas
// (p.ej. /especialidades). "Especialidades" lleva a la cartera completa.
const navLinks = [
  { href: "/#promociones", label: "Promociones" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/#quienes-somos", label: "Quiénes somos" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-background)]/90 backdrop-blur">
      {/* Regla de marca — teal que recorre el ancho del header */}
      <div aria-hidden="true" className="h-[3px] w-full bg-[var(--color-secondary)]" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-[var(--color-border)] px-4 py-3">
        <div className="flex items-center">
          <Link href="/" aria-label="QMC Medisuport — inicio">
            <Image
              src="/logo.png"
              alt="QMC Medisuport — Clínica de especialidades en Quito"
              width={59}
              height={50}
              priority
              className="h-11 w-auto"
            />
          </Link>
        </div>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Secciones">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-1.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:text-[var(--color-secondary)] sm:flex"
          >
            <Phone className="h-4 w-4 text-[var(--color-secondary)]" aria-hidden="true" />
            {site.phone}
          </a>
          <CtaButton message="Hola QMC, quiero agendar una cita." source="header" label="WhatsApp" />
        </div>
      </div>
    </header>
  );
}
