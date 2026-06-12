import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

export function Location() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <section id="ubicacion" className="bg-[var(--color-background)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
            Visítanos en Quito
          </h2>
          <p className="mt-4 text-[var(--color-muted-foreground)]">
            Estamos en la Av. 6 de Diciembre. Esta es nuestra clínica:
          </p>
        </Reveal>

        {/* Fachada real */}
        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--color-border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/clinic/fachada.jpg"
              alt="Fachada de QMC Medisuport en la Av. 6 de Diciembre, Quito"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal>
            <ul className="space-y-4 text-sm text-[var(--color-foreground)]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                {site.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                <a href={`tel:${site.phoneE164}`} className="hover:text-[var(--color-secondary)]">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                {site.hours}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[var(--color-secondary)]" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-[var(--color-secondary)]">{site.email}</a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <iframe
                title="Ubicación QMC en Quito"
                src={mapSrc}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
