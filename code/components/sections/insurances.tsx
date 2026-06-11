import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

export function Insurances() {
  return (
    <section id="seguros" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal>
          <h2 className="text-center font-[var(--font-heading)] text-2xl font-bold text-[var(--color-primary)]">
            Trabajamos con tus seguros
          </h2>
          <p className="mt-2 text-center text-[var(--color-muted-foreground)]">
            ¿Tienes seguro médico? Escríbenos y confirmamos tu cobertura.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {site.insurances.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 text-sm font-semibold text-[var(--color-primary)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
