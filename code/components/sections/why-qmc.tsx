import { ShieldCheck, Microscope, Activity } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const points = [
  { icon: ShieldCheck, title: "Prevención", desc: "El cuidado no es solo cuando duele. Cuidamos tu salud antes." },
  { icon: Microscope, title: "Diagnóstico preciso", desc: "Evaluación clínica completa con criterio profesional." },
  { icon: Activity, title: "Seguimiento continuo", desc: "Acompañamiento en cada etapa, no solo una visita." },
];

export function WhyQmc() {
  return (
    <section className="bg-[var(--color-background)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Foto real de la clínica */}
          <Reveal className="order-last lg:order-first">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/clinic/consultorio.jpg"
                alt="Consultorio de QMC Medisuport en Quito"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
              El cuidado que tu familia merece
            </h2>
            <p className="mt-4 max-w-md text-[var(--color-muted-foreground)]">
              No somos una clínica de paso. Acompañamos tu salud con criterio,
              cercanía y continuidad.
            </p>

            <ul className="mt-8 space-y-5">
              {points.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-secondary)]/12 text-[var(--color-secondary)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--color-primary)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
