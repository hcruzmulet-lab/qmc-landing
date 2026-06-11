import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Location() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-foreground)]">Visítanos</h2>
          <ul className="mt-6 space-y-4 text-sm text-[var(--color-foreground)]">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />{site.address}</li>
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" /><a href={`tel:${site.phoneE164}`}>{site.phone}</a></li>
            <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />{site.hours}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <iframe
            title="Ubicación QMC en Quito"
            src={mapSrc}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
