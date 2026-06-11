"use client";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackLeadClick } from "@/lib/analytics";

type Props = {
  message: string;
  source: string;
  label?: string;
  className?: string;
};

export function CtaButton({ message, source, label = "Agendar por WhatsApp", className = "" }: Props) {
  const href = buildWhatsAppUrl(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadClick(source)}
      className={
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 " +
        "font-semibold text-white shadow-sm transition-colors duration-200 " +
        "bg-[var(--color-accent)] hover:bg-[#047857] focus-visible:outline focus-visible:outline-2 " +
        "focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] " +
        className
      }
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
