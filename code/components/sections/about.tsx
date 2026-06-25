import { Target, Eye, HeartHandshake } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";
import { CircularTestimonials, type CircularSlide } from "@/components/ui/circular-testimonials";

// Facetas de la clínica (fotos reales). No son testimonios: cuentan quiénes somos.
const slides: CircularSlide[] = [
  {
    src: "/clinic/recepcion.jpg",
    name: "Atención cercana",
    designation: "Desde que entras",
    quote:
      "Te recibimos como a la familia. Cada paciente importa y nadie se va con dudas.",
  },
  {
    src: "/clinic/consultorio.jpg",
    name: "Especialistas de verdad",
    designation: "Más de 30 servicios",
    quote:
      "Médicos especialistas en un mismo lugar, con criterio, diagnóstico preciso y seguimiento real.",
  },
  {
    src: "/clinic/fisioterapia.jpg",
    name: "Recuperación integral",
    designation: "Fisiatría y rehabilitación",
    quote:
      "Terapias y equipos para devolverte movilidad, fuerza y calidad de vida, sin apuros.",
  },
  {
    src: "/clinic/fachada.jpg",
    name: "Aquí, en Quito",
    designation: "Av. 6 de Diciembre",
    quote:
      "Una clínica real y cercana, fácil de visitar y pensada para el cuidado de tu comunidad.",
  },
];

// Valores corporativos reales (carta de presentación QMC).
const valores = [
  "Sensibilidad social",
  "Lealtad",
  "Integridad",
  "Asistencia",
  "Responsabilidad",
  "Cadena de valor para el paciente",
];

export function About() {
  return (
    <section id="quienes-somos" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Quiénes somos</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
            Una clínica pensada para tu familia
          </h2>
          <p className="mt-4 text-[var(--color-muted-foreground)]">
            Quito Medical Center (QMC) es el centro médico de Medisuport
            International Medical Support S.A. Reunimos una amplia cartera de
            servicios de atención primaria y secundaria, con instalaciones nuevas
            y un staff de profesionales con un promedio de más de 10 años de
            experiencia, bajo un enfoque humano y preventivo.
          </p>
        </Reveal>

        {/* Misión y Visión — texto real de la carta */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal variant="left">
            <div className="h-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-secondary)]/12 text-[var(--color-secondary)]">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-[var(--color-primary)]">
                Nuestra misión
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                Contribuir con una medicina especializada de alto nivel, con los
                conceptos científicos más actualizados y un trato personalizado y
                humano, basados en la atención preventiva, la calidad, la
                confiabilidad y la seguridad en cada paso de la atención.
              </p>
            </div>
          </Reveal>
          <Reveal variant="right" delay={0.08}>
            <div className="h-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-secondary)]/12 text-[var(--color-secondary)]">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-[var(--color-primary)]">
                Nuestra visión
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                Ser el centro médico elegido por nuestros pacientes de la medicina
                privada ambulatoria en Quito, convirtiéndonos en una institución
                líder de la buena salud y en continuo crecimiento, con una atención
                de calidad y servicios de excelencia.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Valores corporativos */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
              <HeartHandshake className="h-5 w-5 text-[var(--color-secondary)]" aria-hidden="true" />
              Nuestros valores
            </span>
            {valores.map((v) => (
              <span
                key={v}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-1.5 text-sm font-medium text-[var(--color-primary)]"
              >
                {v}
              </span>
            ))}
          </div>
          <p className="mt-6 font-display text-2xl font-bold text-[var(--color-secondary)]">
            {site.slogan}
          </p>
        </Reveal>

        <Reveal delay={0.1} variant="scale" className="mt-14 flex justify-center">
          <CircularTestimonials testimonials={slides} autoplay />
        </Reveal>
      </div>
      {/* El equipo médico ahora se muestra contextualizado en cada página de
          especialidad (/especialidades/[slug]), no en el home. */}
    </section>
  );
}
