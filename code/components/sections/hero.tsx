import { Clock, Check, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
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

const trust = [
  { icon: ShieldCheck, label: "Enfoque preventivo" },
  { icon: HeartHandshake, label: "Atención cercana y personalizada" },
  { icon: MapPin, label: "Av. 6 de Diciembre, Quito" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-[#ECFDF5]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left column — copy + CTA */}
          <Reveal className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-destructive)] px-3 py-1 text-sm font-semibold text-white shadow-sm">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Promo {promo.reason} · {promo.scarcity}
            </span>

            <h1 className="font-[var(--font-heading)] text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl">
              Clínica de especialidades en Quito
            </h1>
            <p className="text-lg font-medium text-[var(--color-primary)]">
              Pediatría · Medicina General · Gastroenterología · Traumatología · Fisiatría · Rehabilitación · Laboratorio
            </p>

            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold text-[var(--color-accent)] tabular-nums">{promo.price}</span>
              <span className="pb-1 text-2xl font-normal text-[var(--color-muted-foreground)] line-through tabular-nums">
                {promo.regularPrice}
              </span>
              <span className="mb-1 rounded-md bg-[var(--color-accent)]/10 px-2 py-0.5 text-sm font-semibold text-[var(--color-accent)]">
                {savingsLabel(promo)}
              </span>
            </div>

            <p className="text-lg text-[var(--color-muted-foreground)]">
              Atención cercana y segura para toda tu familia, con especialistas en un solo lugar.
              Aprovecha nuestra promoción de chequeo integral por {promo.price}.
            </p>

            <ul className="space-y-2">
              {includes.slice(0, 3).map((item) => (
                <li key={item} className="flex items-center gap-2 text-[var(--color-foreground)]">
                  <Check className="h-5 w-5 text-[var(--color-accent)]" strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
              <li className="pl-7 text-sm text-[var(--color-muted-foreground)]">+ control de signos vitales</li>
            </ul>

            <div>
              <CtaButton
                message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}`}
                source="hero"
              />
              <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
                Respuesta rápida por WhatsApp · sin formularios largos
              </p>
            </div>
          </Reveal>

          {/* Right column — booking ticket card */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-2xl sm:p-8">
              <div
                className="absolute right-0 top-0 -z-0 h-64 w-64 rounded-full bg-gradient-to-br from-[var(--color-secondary)]/15 to-[var(--color-accent)]/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="space-y-2 border-b border-[var(--color-border)] pb-4 text-center">
                  <h2 className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-foreground)]">
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

                {/* Includes checklist */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--color-foreground)]">¿Qué incluye?</h3>
                  <ul className="space-y-2.5">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-sm text-[var(--color-foreground)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Countdown */}
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                  <p className="mb-2 text-sm font-semibold text-[var(--color-foreground)]">La promo termina en:</p>
                  <Countdown targetISO={promo.validUntilISO} />
                </div>

                {/* Trust signals */}
                <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
                  {trust.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                      <Icon className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <CtaButton
                  message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}. ¿Qué horarios tienen?`}
                  source="hero-card"
                  label="Agendar ahora"
                  className="w-full"
                />
                <p className="text-center text-xs text-[var(--color-muted-foreground)]">
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
