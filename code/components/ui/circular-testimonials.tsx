"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface CircularSlide {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface Props {
  testimonials: CircularSlide[];
  autoplay?: boolean;
  colors?: Colors;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 56;
  const maxGap = 82;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// Carrusel 3D de imágenes con cita animada. Adaptado a QMC (lucide + tokens).
export const CircularTestimonials = ({ testimonials, autoplay = true, colors = {} }: Props) => {
  const reduce = useReducedMotion();
  const colorName = colors.name ?? "var(--color-primary)";
  const colorDesignation = colors.designation ?? "var(--color-secondary)";
  const colorTestimony = colors.testimony ?? "var(--color-foreground)";
  const colorArrowBg = colors.arrowBackground ?? "var(--color-primary)";
  const colorArrowFg = colors.arrowForeground ?? "#ffffff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "var(--color-secondary)";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const len = useMemo(() => testimonials.length, [testimonials]);
  const active = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    function onResize() {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (autoplay && !reduce) {
      autoplayRef.current = setInterval(() => setActiveIndex((p) => (p + 1) % len), 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, len, reduce]);

  const handleNext = useCallback(() => {
    setActiveIndex((p) => (p + 1) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);
  const handlePrev = useCallback(() => {
    setActiveIndex((p) => (p - 1 + len) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  function imageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const stick = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + len) % len === index;
    const isRight = (activeIndex + 1) % len === index;
    const base = { transition: "all 0.8s cubic-bezier(.4,2,.3,1)" } as React.CSSProperties;
    if (isActive)
      return { ...base, zIndex: 3, opacity: 1, transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)" };
    if (isLeft)
      return { ...base, zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${stick}px) scale(.85) rotateY(15deg)` };
    if (isRight)
      return { ...base, zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${stick}px) scale(.85) rotateY(-15deg)` };
    return { ...base, zIndex: 1, opacity: 0, pointerEvents: "none" };
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Imágenes apiladas en 3D */}
        <div ref={imageContainerRef} className="relative h-80 w-full [perspective:1000px] sm:h-96">
          {testimonials.map((t, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={t.src}
              src={t.src}
              alt={t.name}
              className="absolute inset-0 h-full w-full rounded-3xl object-cover shadow-xl"
              style={imageStyle(index)}
            />
          ))}
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: colorName }}>
                {active.name}
              </h3>
              <p className="mt-1 text-sm font-semibold" style={{ color: colorDesignation }}>
                {active.designation}
              </p>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: colorTestimony }}>
                {reduce
                  ? active.quote
                  : active.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-8 md:pt-6">
            <button
              type="button"
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowLeft size={20} color={colorArrowFg} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-secondary)]"
              style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
            >
              <ArrowRight size={20} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
