"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type Testimonial = { text: string; name: string; role: string };

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Columna de testimonios con auto-scroll vertical infinito. El listado se
// duplica para que el bucle (translateY -50%) sea continuo y sin saltos.
export function TestimonialsColumn({
  className,
  testimonials,
  duration = 14,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className}>
      <motion.div
        animate={reduce ? undefined : { translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {testimonials.map((t, i) => (
              <figure
                key={`${dup}-${i}`}
                className="w-full max-w-xs rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-7 shadow-lg shadow-[var(--color-primary)]/5"
              >
                <blockquote className="text-sm leading-relaxed text-[var(--color-foreground)]">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-secondary)]/12 text-sm font-bold text-[var(--color-secondary)]">
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold leading-5 tracking-tight text-[var(--color-primary)]">
                      {t.name}
                    </span>
                    <span className="block text-sm leading-5 text-[var(--color-muted-foreground)]">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
