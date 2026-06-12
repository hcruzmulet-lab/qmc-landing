import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";
import { InstagramIcon } from "@/components/icons/instagram";

const nav = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#promociones", label: "Promociones" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marca + contacto */}
        <div>
          <Image
            src="/logo.png"
            alt="QMC Medisuport"
            width={59}
            height={50}
            className="h-11 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Clínica de especialidades en Quito. Atención cercana y segura para toda tu familia.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-neutral)]" aria-hidden="true" />
              {site.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[var(--color-neutral)]" aria-hidden="true" />
              <a href={`tel:${site.phoneE164}`} className="hover:text-white">{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[var(--color-neutral)]" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>

        {/* Navegación */}
        <nav aria-label="Pie de página">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-neutral)]">
            Secciones
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-white/80 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <InstagramIcon className="h-5 w-5" />
            {site.instagramHandle}
          </a>
        </nav>

        {/* CTA */}
        <div className="flex flex-col items-start gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-neutral)]">
            Agenda tu cita
          </p>
          <CtaButton message="Hola QMC, quiero agendar una cita." source="footer" />
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
