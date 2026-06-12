import { bookableSpecialties } from "@/lib/booking";
import { BookingButton } from "@/components/booking/booking-button";
import { BookingEmbedInit } from "@/components/booking/booking-embed-init";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

// Sección selectora: el paciente elige especialidad y abre el popup de Cal.com
// sin salir del sitio. Reusa el directorio real de lib/specialties.ts. El embed
// se inicializa una sola vez vía <BookingEmbedInit/>.
export function AgendaSection() {
  const items = bookableSpecialties();
  return (
    <section
      id="agendar"
      className="relative bg-[var(--color-background)] scroll-mt-24"
    >
      <BookingEmbedInit />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="left" className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-[var(--color-primary)] sm:text-5xl">
            Agenda tu cita online
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-muted-foreground)]">
            Elige la especialidad y reserva un horario disponible en segundos.
            Recibirás la confirmación por correo.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.slug}
                  className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6"
                >
                  <Icon
                    className="h-8 w-8 text-[var(--color-secondary)]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-xl font-semibold text-[var(--color-primary)]">
                    {s.nombre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--color-muted-foreground)]">
                    {s.descCorta}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="font-display font-semibold tabular-nums text-[var(--color-primary)]">
                      {s.precio}
                    </span>
                    <BookingButton
                      specialty={{ slug: s.slug, nombre: s.nombre, calEventSlug: s.calEventSlug }}
                      label="Agendar"
                      ariaLabel={`Agendar ${s.nombre}`}
                      className="px-4"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Respaldo: si el paciente prefiere humano o el embed no carga. */}
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            ¿Prefieres coordinar por chat?
          </p>
          <CtaButton
            message="Hola QMC, quiero agendar una cita."
            source="agendar-fallback"
            label="Agendar por WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
