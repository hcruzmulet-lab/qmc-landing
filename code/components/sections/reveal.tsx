"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "fade";

// Cada entrada parte de un estado distinto según la variante; la curva es un
// ease-out fuerte (sensación responsiva, sin rebote).
const FROM: Record<RevealVariant, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: -36 },
  right: { x: 36 },
  scale: { scale: 0.94 },
  blur: { y: 14, filter: "blur(12px)" },
  fade: {},
};

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
};

// Scroll-into-view reveal. Respeta prefers-reduced-motion (renderiza estático).
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  duration = 0.6,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...FROM[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
