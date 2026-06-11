import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="QMC MEDISUPORT — Quito Medical Center"
            width={59}
            height={50}
            priority
            className="h-11 w-auto"
          />
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-1 text-sm font-medium text-[var(--color-foreground)] sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <CtaButton message="Hola QMC, quiero agendar mi consulta integral de $10" source="header" label="WhatsApp" />
        </div>
      </div>
    </header>
  );
}
