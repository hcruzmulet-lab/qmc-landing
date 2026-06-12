"use client";
import { useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMotionValue } from "framer-motion";
import { specialties } from "@/lib/specialties";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";
import { InfiniteGridBackground } from "@/components/ui/infinite-grid-background";
import { BookingButton } from "@/components/booking/booking-button";
import { BookingEmbedInit } from "@/components/booking/booking-embed-init";

// Fotos REALES de la clínica (public/clinic). Reutilizamos los espacios físicos
// que mejor representan cada especialidad. Si una falla, cae a un tile branded.
const fotos: Record<string, string> = {
  pediatria: "/clinic/recepcion.jpg",
  "medicina-general": "/clinic/consultorio.jpg",
  gastroenterologia: "/clinic/pasillo.jpg",
  traumatologia: "/clinic/fisioterapia.jpg",
  fisiatria: "/clinic/fisioterapia.jpg",
  rehabilitacion: "/clinic/gimnasio.jpg",
  "laboratorio-clinico": "/clinic/consultorio.jpg",
};

// Collage del fondo animado (6 espacios reales de la clínica).
const fondoImgs = [
  "/clinic/recepcion.jpg",
  "/clinic/consultorio.jpg",
  "/clinic/pasillo.jpg",
  "/clinic/fisioterapia.jpg",
  "/clinic/gimnasio.jpg",
  "/clinic/fachada.jpg",
];

function fotoFallback(nombre: string): string {
  return `https://placehold.co/700x880/103158/FFFFFF?text=${encodeURIComponent(nombre)}`;
}

export function SpecialtiesShowcase() {
  const [active, setActive] = useState(0);
  const activa = specialties[active];
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  function handleMove(e: MouseEvent<HTMLElement>) {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }

  return (
    <section
      id="especialidades"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-[var(--color-background)]"
    >
      <InfiniteGridBackground images={fondoImgs} mouseX={mouseX} mouseY={mouseY} />
      {/* Inicializa el embed de Cal.com una sola vez para toda la sección */}
      <BookingEmbedInit />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="left" className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-[var(--color-primary)] sm:text-5xl">
            Siete especialidades,
            <br />
            una sola clínica.
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-muted-foreground)]">
            Recorre el directorio: cada especialidad atiende a tu familia con el
            mismo cuidado cercano. Pasa el cursor para ver más, o toca para abrir.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
          {/* Directorio — filas */}
          <Reveal className="-my-2">
            <ul>
              {specialties.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <li
                    key={s.slug}
                    onMouseEnter={() => setActive(i)}
                    className="border-b border-[var(--color-border)] first:border-t"
                  >
                    <div className="group flex items-start gap-4 py-5">
                      <Icon
                        className={`mt-1 h-5 w-5 shrink-0 transition-colors ${
                          isActive ? "text-[var(--color-secondary)]" : "text-[var(--color-muted-foreground)]"
                        }`}
                        aria-hidden="true"
                      />
                      {/* Miniatura — solo móvil/tablet (sin panel lateral) */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={fotos[s.slug] ?? fotoFallback(s.nombre)}
                        alt=""
                        aria-hidden="true"
                        className="h-14 w-14 shrink-0 rounded-xl object-cover lg:hidden"
                      />
                      {/* Nombre + descripción → página de detalle */}
                      <Link
                        href={`/especialidades/${s.slug}`}
                        onFocus={() => setActive(i)}
                        className="min-w-0 flex-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
                      >
                        <span className="flex items-baseline gap-2">
                          <span
                            className={`font-display text-2xl font-medium transition-colors ${
                              isActive ? "text-[var(--color-secondary)]" : "text-[var(--color-primary)]"
                            }`}
                          >
                            {s.nombre}
                          </span>
                          <ArrowUpRight
                            className="hidden h-5 w-5 shrink-0 text-[var(--color-secondary)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:block"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 block max-w-md text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                          {s.descCorta}
                        </span>
                      </Link>
                      {/* Precio + CTA de agendamiento (abre popup Cal.com) */}
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="font-display text-lg font-medium tabular-nums text-[var(--color-primary)]">
                          {s.precio}
                        </span>
                        <BookingButton
                          specialty={s}
                          label="Agendar"
                          ariaLabel={`Agendar ${s.nombre}`}
                          className="px-4 text-sm"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <CtaButton
                message="Hola QMC, quiero información sobre sus especialidades."
                source="especialidades"
                label="Agendar por WhatsApp"
              />
            </div>
          </Reveal>

          {/* Panel sticky — preview de la especialidad activa (solo desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <figure className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={activa.slug}
                    src={fotos[activa.slug] ?? fotoFallback(activa.nombre)}
                    alt={`${activa.nombre} en QMC Medisuport`}
                    className="h-80 w-full object-cover sm:h-96"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/55 to-transparent"
                  />
                  <h3 className="absolute bottom-4 left-5 right-5 font-display text-3xl font-medium text-white">
                    {activa.nombre}
                  </h3>
                </div>
                <figcaption className="p-5">
                  <p className="text-sm leading-relaxed text-[var(--color-foreground)]">
                    {activa.descLarga}
                  </p>
                  <p className="eyebrow mt-5">Qué tratamos</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {activa.queTratamos.slice(0, 5).map((q) => (
                      <li
                        key={q}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-col gap-3">
                    <BookingButton
                      specialty={activa}
                      label={`Agendar ${activa.nombre}`}
                      ariaLabel={`Agendar ${activa.nombre}`}
                      className="w-full"
                    />
                    <Link
                      href={`/especialidades/${activa.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-secondary)] underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
                    >
                      Ver {activa.nombre}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
