import { Quote } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";
import { InstagramIcon } from "@/components/icons/instagram";

// TODO(content): replace with real patient reviews before scaling ad spend.
const testimonials = [
  { name: "Paciente QMC", text: "Atención rápida y muy humana. El chequeo fue completo y claro." },
  { name: "Paciente QMC", text: "Me explicaron todo con paciencia. Excelente medicina familiar." },
  { name: "Paciente QMC", text: "Buen precio y profesionales serios. Recomendado en Quito." },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">
          Lo que dicen nuestros pacientes
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
            <figure className="rounded-2xl border border-[var(--color-border)] p-6 transition-shadow duration-200 hover:shadow-md">
              <Quote className="h-6 w-6 text-[var(--color-secondary)]" aria-hidden="true" />
              <blockquote className="mt-3 text-sm text-[var(--color-foreground)]">{t.text}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-[var(--color-muted-foreground)]">— {t.name}</figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
          >
            <InstagramIcon className="h-5 w-5" />
            Síguenos en {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
