"use client";
import {
  MapPin,
  Stethoscope,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  Baby,
  Bone,
  FlaskConical,
  Dumbbell,
} from "lucide-react";
import { site } from "@/lib/site";
import { specialties } from "@/lib/specialties";
import { promo, savingsLabel } from "@/lib/promo";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

// Datos reales para la franja del hero (sin cifras inventadas).
const facts = [
  { icon: Stethoscope, value: String(specialties.length), label: "especialidades médicas" },
  { icon: ShieldCheck, value: "Seguros", label: "principales aceptados" },
  { icon: CalendarDays, value: "Lun–Sáb", label: "atención con cita" },
  { icon: MapPin, value: "Quito", label: "Av. 6 de Diciembre" },
];

// Nodos de especialidad que orbitan la foto (inspirado en ecosistemas TravelTech).
const nodes = [
  { icon: Baby, label: "Pediatría", pos: "left-2 top-6 sm:-left-5", tone: "aqua" },
  { icon: Bone, label: "Traumatología", pos: "right-2 top-2 sm:-right-4", tone: "teal" },
  { icon: FlaskConical, label: "Laboratorio", pos: "-right-2 top-1/2 sm:-right-6", tone: "aqua" },
  { icon: Dumbbell, label: "Rehabilitación", pos: "left-3 bottom-24 sm:-left-6", tone: "teal" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0C2545] text-white">
      {/* Imagen de cover (Unsplash, temática clínica) con blur leve */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1920&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[3px]"
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
      {/* Malla sutil */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-50"
        style={{ maskImage: "radial-gradient(circle at 50% 35%, #000 38%, transparent 80%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Promesa + CTA */}
          <Reveal className="min-w-0">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-aqua)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-aqua)] shadow-[0_0_0_4px_rgba(43,212,230,0.25)]" aria-hidden="true" />
              Clínica de especialidades · Quito
            </p>

            <h1 className="mt-5 font-display text-[2.3rem] font-bold leading-[1.06] [text-wrap:balance] sm:text-[3.4rem]">
              Especialistas para toda tu{" "}
              <span className="text-gradient-brand">familia</span>, en un solo lugar.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
              Siete especialidades médicas bajo un mismo techo en Quito. Atención
              cercana, preventiva y sin vueltas: agendas por WhatsApp y te esperamos.
            </p>

            {promo.enabled && (
              <div className="mt-6 inline-flex w-fit flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-[var(--color-aqua)]/45 bg-[var(--color-aqua)]/10 px-4 py-2.5 shadow-[0_0_34px_rgba(43,212,230,0.22)] backdrop-blur">
                <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[var(--color-aqua)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(5,150,105,0.3)]" aria-hidden="true" />
                  Promo reapertura
                </span>
                <span className="text-sm text-white/70">consulta integral</span>
                <span className="font-display text-2xl font-bold leading-none text-white">
                  {promo.price}
                </span>
                <span className="text-sm text-white/45 line-through">{promo.regularPrice}</span>
                <span className="rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs font-bold text-white">
                  {savingsLabel(promo)}
                </span>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton
                message={`Hola QMC, quiero agendar mi consulta integral de ${promo.price}`}
                source="hero"
                label="Agendar por WhatsApp"
                className="shadow-[0_12px_34px_rgba(5,150,105,0.45)]"
              />
              <a
                href="#especialidades"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-aqua)]/40 px-5 py-3 font-semibold text-white transition-colors hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-aqua)]"
              >
                Ver especialidades
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-7 text-sm text-white/55">
              7 especialidades · Atención cercana · Seguros principales aceptados
            </p>
          </Reveal>

          {/* Foto real + nodos de especialidad orbitando */}
          <Reveal delay={0.12} className="relative min-w-0">
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl ring-1 ring-white/15 sm:min-h-[480px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clinic/recepcion.jpg"
                alt="Recepción de QMC Medisuport en Quito"
                width={1600}
                height={1067}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              {/* Duotono navy para integrar a la marca */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,49,88,0.25) 0%, rgba(16,49,88,0.75) 100%)",
                }}
              />
              {/* Tarjeta flotante — ubicación real */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)]/12 text-[var(--color-secondary)]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[var(--color-primary)]">
                    Atención cercana en Quito
                  </span>
                  <span className="block truncate text-xs text-[var(--color-muted-foreground)]">
                    Av. 6 de Diciembre · {site.hours.split("·")[0].trim()}
                  </span>
                </span>
              </div>
            </div>

            {/* Nodos orbitando (decorativos, ocultos en móvil para no saturar) */}
            {nodes.map(({ icon: Icon, label, pos, tone }) => (
              <div
                key={label}
                aria-hidden="true"
                className={`absolute z-10 hidden items-center gap-2 rounded-xl border border-white/15 bg-[#0C2545]/85 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur sm:flex ${pos}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                    tone === "aqua"
                      ? "bg-[var(--color-aqua)]/20 text-[var(--color-aqua)]"
                      : "bg-[var(--color-secondary)]/25 text-[#7FD8E8]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </div>
            ))}
          </Reveal>
        </div>

        {/* Franja de hechos reales — tiles glassy estilo tablero */}
        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-5"
              >
                <Icon className="h-6 w-6 shrink-0 text-[var(--color-aqua)]" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-display text-lg font-bold leading-none text-white">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-white/55">{label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
