"use client";
import { Clock, ShieldCheck, HeartHandshake, MapPin, ArrowRight } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { Countdown } from "@/components/sections/countdown";

const especialidades = [
  "Pediatría",
  "Medicina General",
  "Gastroenterología",
  "Traumatología",
  "Fisiatría",
  "Rehabilitación",
  "Laboratorio",
];

const trust = [
  { icon: ShieldCheck, label: "Enfoque preventivo" },
  { icon: HeartHandshake, label: "Atención cercana" },
  { icon: MapPin, label: "Av. 6 de Diciembre, Quito" },
];

// Foto principal del hero (Unsplash, reemplazable por foto real de la clínica).
const HERO_IMG =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop";
const HERO_FALLBACK = "https://placehold.co/1200x1400/103158/ffffff?text=QMC+Medisuport";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      {/* Forma decorativa de marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-0 h-96 w-96 rounded-full bg-[var(--color-secondary)]/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Izquierda — promesa + CTA */}
          <Reveal className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm font-semibold text-[var(--color-primary)] shadow-sm">
              <Clock className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
              Promo {promo.reason} · {promo.scarcity}
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-primary)] sm:text-6xl">
              Tu clínica de
              <span className="text-[var(--color-secondary)]"> especialidades</span> en Quito
            </h1>

            <p className="max-w-xl text-lg text-[var(--color-muted-foreground)]">
              Atención cercana y segura para toda tu familia, con especialistas en un solo lugar.
            </p>

            <ul className="flex flex-wrap gap-2">
              {especialidades.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-[var(--color-secondary)]/25 bg-[var(--color-secondary)]/5 px-3 py-1 text-sm font-medium text-[var(--color-primary)]"
                >
                  {e}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton
                message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}`}
                source="hero"
                label="Agendar por WhatsApp"
              />
              <a
                href="#especialidades"
                className="inline-flex min-h-12 items-center justify-center gap-1 rounded-xl border border-[var(--color-border)] bg-white px-5 py-3 font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              >
                Ver especialidades
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {trust.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]"
                >
                  <Icon className="h-4 w-4 text-[var(--color-secondary)]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Derecha — foto del hero + tarjeta flotante de promo */}
          <Reveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMG}
                alt="Médico de QMC Medisuport atendiendo a un paciente"
                className="h-[380px] w-full object-cover sm:h-[520px]"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = HERO_FALLBACK;
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/40 to-transparent"
              />
            </div>

            {/* Tarjeta flotante de promo */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-[var(--color-border)] bg-white/95 p-4 shadow-xl backdrop-blur sm:right-auto sm:max-w-[300px]">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
                Promo de reapertura
              </p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-3xl font-bold tabular-nums text-[var(--color-accent)]">
                  {promo.price}
                </span>
                <span className="pb-0.5 text-lg text-[var(--color-muted-foreground)] line-through tabular-nums">
                  {promo.regularPrice}
                </span>
                <span className="mb-1 rounded-md bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs font-semibold text-[var(--color-accent)]">
                  {savingsLabel(promo)}
                </span>
              </div>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">Consulta integral · termina en:</p>
              <div className="mt-2">
                <Countdown targetISO={promo.validUntilISO} />
              </div>
              <CtaButton
                message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
                source="hero-card"
                label="Agendar ahora"
                className="mt-3 w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
