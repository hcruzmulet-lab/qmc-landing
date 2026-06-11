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
