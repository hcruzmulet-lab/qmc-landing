import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";
import { InstagramIcon } from "@/components/icons/instagram";

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-[var(--font-heading)] text-xl font-bold">{site.brand}</p>
          <p className="mt-2 text-sm text-white/80">{site.address}</p>
          <p className="mt-1 text-sm text-white/80">{site.phone}</p>
        </div>
        <div className="flex items-start">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/90">
            <InstagramIcon className="h-5 w-5" />
            {site.instagramHandle}
          </a>
        </div>
        <div className="md:text-right">
          <CtaButton message="Hola QMC, quiero agendar una cita." source="footer" />
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
