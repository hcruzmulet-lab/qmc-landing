import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "@/components/sections/cta-button";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-white/95 p-3 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <a
          href={`tel:${site.phoneE164}`}
          aria-label="Llamar a la clínica"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 font-semibold text-[var(--color-primary)]"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Llamar
        </a>
        <CtaButton
          message="Hola QMC, quiero agendar una cita."
          source="sticky-mobile"
          label="WhatsApp"
          className="flex-1"
        />
      </div>
    </div>
  );
}
