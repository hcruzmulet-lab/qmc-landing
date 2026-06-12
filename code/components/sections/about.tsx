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
    designation: "Siete especialidades",
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

export function About() {
  return (
    <section id="quienes-somos" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
            Una clínica pensada para tu familia
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-muted-foreground)]">
            En QMC Medisuport reunimos especialistas, tecnología e instalaciones
            propias para cuidar tu salud de cerca. Conócenos:
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <CircularTestimonials testimonials={slides} autoplay />
        </Reveal>
      </div>
    </section>
  );
}
