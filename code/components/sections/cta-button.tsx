"use client";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackLeadClick } from "@/lib/analytics";

type Props = {
  message: string;
  source: string;
  label?: string;
  className?: string;
  // "solid" = CTA principal de la sección. "outline" = CTA repetido en listas
  // (filas, tarjetas), para que el verde sólido no se diluya.
  variant?: "solid" | "outline";
};

const VARIANTS = {
  solid:
    "text-white shadow-sm bg-[var(--color-accent)] hover:bg-[#047857]",
  outline:
    "border border-[var(--color-accent)]/40 text-[#047857] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10",
};

export function CtaButton({
  message,
  source,
  label = "Agendar por WhatsApp",
  className = "",
  variant = "solid",
}: Props) {
  const href = buildWhatsAppUrl(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadClick(source)}
      className={
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 " +
        "font-semibold transition-colors duration-200 active:scale-[0.98] " +
        VARIANTS[variant] +
        " focus-visible:outline focus-visible:outline-2 " +
        "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
        className
      }
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
