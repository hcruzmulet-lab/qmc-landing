import { specialties } from "@/lib/specialties";
import { SpecialtyCard } from "@/components/shared/specialty-card";
import { ImageAccordion, type AccordionItem } from "@/components/ui/interactive-image-accordion";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

// Imágenes de stock (Unsplash) por especialidad — placeholders hasta tener
// fotos reales de la clínica. Si una falla, el componente cae a un tile branded.
const fotos: Record<string, string> = {
  pediatria:
    "https://images.unsplash.com/photo-1632053002928-1919f7b6a4f4?q=80&w=800&auto=format&fit=crop",
  "medicina-general":
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  gastroenterologia:
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800&auto=format&fit=crop",
  traumatologia:
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop",
  fisiatria:
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  rehabilitacion:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  "laboratorio-clinico":
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
};

const items: AccordionItem[] = specialties.map((s) => ({
  id: s.slug,
  title: s.nombre,
  href: `/especialidades/${s.slug}`,
  imageUrl: fotos[s.slug] ?? "",
}));

export function SpecialtiesShowcase() {
  return (
    <section id="especialidades" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary)]">
            Nuestras especialidades
          </p>
          <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
            Especialidades médicas en Quito
          </h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Un solo lugar para cuidar tu salud y la de tu familia. Pasa el cursor sobre una
            especialidad para conocerla, o tócala para ver más.
          </p>
        </Reveal>

        {/* Desktop — acordeón de imágenes interactivo */}
        <Reveal delay={0.1} className="mt-10 hidden lg:block">
          <ImageAccordion items={items} initialActive={0} />
        </Reveal>

        {/* Móvil/tablet — grid de tarjetas (táctil) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:hidden">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <SpecialtyCard specialty={s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <CtaButton
            message="Hola QMC, quiero información sobre sus especialidades."
            source="especialidades"
            label="Agendar por WhatsApp"
          />
        </Reveal>
      </div>
    </section>
  );
}
