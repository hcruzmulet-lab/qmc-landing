"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackLeadClick } from "@/lib/analytics";

export function WhatsAppFab() {
  const reduce = useReducedMotion();
  const href = buildWhatsAppUrl("Hola QMC, quiero agendar mi consulta integral de $10");
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLeadClick("fab")}
      aria-label="Agendar por WhatsApp"
      initial={reduce ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg hover:bg-[#047857] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </motion.a>
  );
}
