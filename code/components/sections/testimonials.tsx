import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";
import { InstagramIcon } from "@/components/icons/instagram";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns";

// TODO(content): reemplazar por reseñas reales de pacientes antes de escalar ads.
const testimonials: Testimonial[] = [
  { text: "Atención rápida y muy humana. El chequeo fue completo y me explicaron todo con calma.", name: "María Eugenia", role: "Paciente · Medicina General" },
  { text: "Llevé a mi hijo y la pediatra fue excelente. Salimos con todo claro y un plan de control.", name: "Andrea Suárez", role: "Mamá · Pediatría" },
  { text: "Buen precio y profesionales serios. La consulta integral vale cada centavo.", name: "Jorge Tipán", role: "Paciente · Quito" },
  { text: "Me recuperé de una lesión de rodilla con su plan de rehabilitación. Muy recomendados.", name: "Carla Méndez", role: "Paciente · Rehabilitación" },
  { text: "Agendé por WhatsApp en minutos y me atendieron puntual. Trato cercano de principio a fin.", name: "Luis Fernando", role: "Paciente · Traumatología" },
  { text: "El laboratorio entregó resultados el mismo día y el médico los revisó conmigo enseguida.", name: "Paola Rivera", role: "Paciente · Laboratorio" },
  { text: "Por fin una clínica donde no te apuran. Sentí que de verdad les importa mi salud.", name: "Diego Andrade", role: "Paciente · Medicina General" },
  { text: "El fisiatra me ayudó con un dolor crónico que arrastraba hacía años. Gran diferencia.", name: "Rosa Cabrera", role: "Paciente · Fisiatría" },
  { text: "Instalaciones limpias, personal amable y especialistas en un solo lugar. Volveré.", name: "Esteban Núñez", role: "Paciente · Quito" },
];

const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Familias de Quito que ya confían su salud a QMC Medisuport.
          </p>
        </Reveal>

        <div className="mt-12 flex max-h-[640px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
          <TestimonialsColumn testimonials={col1} duration={17} />
          <TestimonialsColumn testimonials={col2} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={col3} className="hidden lg:block" duration={19} />
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-secondary)]"
          >
            <InstagramIcon className="h-5 w-5" />
            Síguenos en {site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
