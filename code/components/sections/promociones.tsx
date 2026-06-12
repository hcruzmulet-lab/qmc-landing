"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { promociones, type Promocion } from "@/lib/promociones";
import { CtaButton } from "@/components/sections/cta-button";
import { Reveal } from "@/components/sections/reveal";

export function Promociones() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + promociones.length) % promociones.length)),
    [],
  );

  // Teclado + bloqueo de scroll cuando el lightbox está abierto.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  if (promociones.length === 0) return null;

  const card = (p: Promocion, i: number) => (
    <Reveal
      key={p.id}
      variant="up"
      delay={i * 0.07}
      className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen(i)}
        aria-label={`Ver promoción ${p.titulo} completa`}
        className="group/card relative block aspect-[2/3] w-full overflow-hidden bg-[var(--color-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.imagen}
          alt={`Promoción ${p.titulo} ${p.precio} en QMC Medisuport`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[var(--color-primary)]/85 text-white transition-colors group-hover/card:bg-[var(--color-secondary)]">
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-tight text-[var(--color-primary)] sm:text-lg">
            {p.titulo}
          </h3>
          <span className="font-display text-lg font-bold tabular-nums text-[var(--color-secondary)] sm:text-xl">
            {p.precio}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {p.resumen}
        </p>
        <CtaButton
          message={`Hola QMC, me interesa la promo de ${p.titulo} (${p.precio}). ¿Cómo la agendo?`}
          source={`promo-${p.id}`}
          label="Agendar promo"
          className="mt-4 w-full"
        />
      </div>
    </Reveal>
  );

  return (
    <section id="promociones" className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal variant="up" className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-[var(--color-primary)] sm:text-4xl">
            Promociones del mes
          </h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Paquetes y precios especiales por tiempo limitado. Toca una promo para verla
            completa o agéndala por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {promociones.map((p, i) => card(p, i))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Promoción ${promociones[open].titulo}`}
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
            <motion.img
              key={promociones[open].id}
              src={promociones[open].imagen}
              alt={`Promoción ${promociones[open].titulo} ${promociones[open].precio}`}
              className="relative max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {promociones.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  aria-label="Promoción anterior"
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  aria-label="Promoción siguiente"
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
