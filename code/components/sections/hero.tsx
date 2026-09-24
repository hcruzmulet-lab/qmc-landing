"use client";
import Image from "next/image";
import { MapPin, Stethoscope, BadgeCheck, CalendarDays, ArrowRight } from "lucide-react";
import { specialties } from "@/lib/specialties";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

// Datos reales para la franja del hero (sin cifras inventadas).
const facts = [
  { icon: Stethoscope, value: String(specialties.length), label: "especialidades médicas" },
  { icon: CalendarDays, value: "Lun a Sáb", label: "atención con cita" },
  { icon: BadgeCheck, value: "ACESS", label: "establecimiento autorizado" },
  { icon: MapPin, value: "Quito", label: "Av. 6 de Diciembre" },
];


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0C2545] text-white">
      {/* Imagen de cover — foto REAL de la clínica (fachada en Quito), blur leve.
          Va muy oscurecida por el overlay navy: solo aporta textura de marca. */}
      <Image
        src="/clinic/fachada.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={40}
        className="pointer-events-none scale-105 object-cover blur-[3px]"
      />
      {/* Overlay navy + glows de marca (mantiene legibilidad y tinte QMC) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 82% -5%, rgba(43,212,230,0.18), transparent 60%)," +
            "radial-gradient(820px 620px at -5% 105%, rgba(33,116,153,0.30), transparent 60%)," +
            "linear-gradient(180deg, rgba(12,37,69,0.84) 0%, rgba(16,49,88,0.91) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Promesa + CTA */}
          <Reveal className="min-w-0">
            <h1 className="font-display text-[2.3rem] font-bold leading-[1.06] [text-wrap:balance] sm:text-[3.4rem]">
              Especialistas para toda tu{" "}
              <span className="text-[var(--color-aqua)]">familia</span>, en un solo lugar.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              Más de 30 especialidades médicas en Quito, con atención cercana y
              preventiva. Agendas por WhatsApp y te esperamos.
            </p>

            {promo.enabled && (
              <div className="mt-6 inline-flex w-fit flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-[var(--color-aqua)]/45 bg-[var(--color-aqua)]/10 px-4 py-2.5">
                <span className="text-sm font-semibold text-[var(--color-aqua)]">
                  Consulta integral
                </span>
                <span className="font-display text-2xl font-bold leading-none text-white">
                  {promo.price}
                </span>
                <span className="text-sm text-white/45 line-through">{promo.regularPrice}</span>
                <span className="rounded-full bg-[var(--color-aqua)] px-2.5 py-0.5 text-xs font-bold text-[#0C2545]">
                  {savingsLabel(promo)}
                </span>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton
                message={
                  promo.enabled
                    ? `Hola QMC, quiero agendar mi consulta integral de ${promo.price}`
                    : "Hola QMC, quiero agendar una cita."
                }
                source="hero"
                label="Agendar por WhatsApp"
              />
              <a
                href="#especialidades"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-aqua)]/40 px-5 py-3 font-semibold text-white transition-colors hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-aqua)]"
              >
                Ver especialidades
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Foto real de la recepción */}
          <Reveal delay={0.12} variant="right" className="relative min-w-0">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-white/15 sm:min-h-[480px]">
              <Image
                src="/clinic/recepcion.jpg"
                alt="Recepción de QMC Medisuport en Quito"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              {/* Duotono navy suave para integrar a la marca */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,49,88,0.05) 40%, rgba(16,49,88,0.55) 100%)",
                }}
              />
            </div>
          </Reveal>
        </div>

        {/* Hechos reales: fila con divisores, sin tarjetas */}
        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {facts.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 sm:px-6 sm:first:pl-0">
                <Icon className="h-6 w-6 shrink-0 text-[var(--color-aqua)]" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-display text-lg font-bold leading-none text-white">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-white/65">{label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
