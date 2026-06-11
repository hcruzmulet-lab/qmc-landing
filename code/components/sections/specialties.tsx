import { specialties } from "@/lib/specialties";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { Reveal } from "@/components/sections/reveal";

export function Specialties() {
  return (
    <section id="especialidades" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Nuestras especialidades
          </h2>
          <p className="mt-2 text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)]">
            Atención especializada para toda tu familia
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[var(--color-muted-foreground)]">
            Un solo lugar para cuidar tu salud: elige la especialidad que necesitas y agenda por WhatsApp.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
