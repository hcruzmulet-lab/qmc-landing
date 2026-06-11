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
