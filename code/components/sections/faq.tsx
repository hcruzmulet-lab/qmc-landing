"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { promo } from "@/lib/promo";

const faqs = [
  { q: "¿Necesito cita previa?", a: "Puedes agendar por WhatsApp y coordinamos el horario que mejor te quede." },
  { q: `¿Qué incluye la consulta de ${promo.price}?`, a: "Revisión de oídos, garganta, fondo de ojo y control de signos vitales." },
  { q: "¿Aceptan seguros médicos?", a: "Escríbenos por WhatsApp para confirmar la cobertura según tu caso." },
  { q: "¿Dónde están ubicados?", a: "Gaspar de Cañero E10-114 y Av. 6 de Diciembre, Quito." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(700px 360px at 85% 0%, rgba(43,212,230,0.14), transparent 60%)," +
          "radial-gradient(700px 460px at 0% 100%, rgba(33,116,153,0.24), transparent 60%)," +
          "linear-gradient(180deg, #0C2545 0%, #103158 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        style={{ maskImage: "radial-gradient(circle at 50% 40%, #000 35%, transparent 80%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-aqua)]">
            Dudas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-white/65">
            ¿No encuentras tu respuesta? Escríbenos por WhatsApp y te ayudamos.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border backdrop-blur transition-all duration-300 ${
                  isOpen
                    ? "border-[var(--color-aqua)]/55 bg-white/[0.06] shadow-[0_0_44px_rgba(43,212,230,0.16)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-aqua)]"
                >
                  <span className="font-display text-base font-medium text-white sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-[var(--color-aqua)] text-[#0C2545]"
                        : "bg-white/10 text-[var(--color-aqua)]"
                    }`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
