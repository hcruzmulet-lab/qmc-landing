import { Clock, Check, ShieldCheck, HeartHandshake, MapPin, ArrowRight } from "lucide-react";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { Countdown } from "@/components/sections/countdown";

const includes = [
  "Revisión de oídos",
  "Revisión de garganta",
  "Fondo de ojo",
  "Control de signos vitales",
];

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

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white">
      {/* Formas decorativas de marca (profundidad) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-secondary)]/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Izquierda — promesa + CTA */}
          <Reveal className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Promo {promo.reason} · {promo.scarcity}
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Tu clínica de
              <span className="text-[var(--color-secondary)]"> especialidades</span> en Quito
            </h1>

            <p className="max-w-xl text-lg text-white/80">
              Atención cercana y segura para toda tu familia, con especialistas en un solo lugar.
            </p>

            <ul className="flex flex-wrap gap-2">
              {especialidades.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/90"
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
                className="inline-flex min-h-12 items-center justify-center gap-1 rounded-xl border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver especialidades
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {trust.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-sm text-white/70">
                  <Icon className="h-4 w-4 text-[var(--color-secondary)]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Derecha — tarjeta de cita (la promo vive solo aquí) */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-[var(--color-foreground)] shadow-2xl sm:p-8">
              <div className="space-y-2 border-b border-[var(--color-border)] pb-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
                  Promo de reapertura
                </p>
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-primary)]">
                  Consulta integral QMC
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold text-[var(--color-accent)] tabular-nums">{promo.price}</span>
                  <span className="text-2xl text-[var(--color-muted-foreground)] line-through tabular-nums">
                    {promo.regularPrice}
                  </span>
                  <span className="rounded-md bg-[var(--color-accent)] px-2 py-0.5 text-xs font-semibold text-white">
                    {savingsLabel(promo)}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--color-foreground)]">¿Qué incluye?</h3>
                <ul className="space-y-2.5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                <p className="mb-2 text-sm font-semibold">La promo termina en:</p>
                <Countdown targetISO={promo.validUntilISO} />
              </div>

              <div className="mt-5">
                <CtaButton
                  message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
                  source="hero-card"
                  label="Agendar ahora"
                  className="w-full"
                />
                <p className="mt-3 text-center text-xs text-[var(--color-muted-foreground)]">
                  Sin costos ocultos · agenda por WhatsApp
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
