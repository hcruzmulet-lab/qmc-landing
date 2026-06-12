"use client";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

// Rejilla SVG que se desplaza infinitamente (patrón userSpaceOnUse con offset animado).
function GridPattern({
  offsetX,
  offsetY,
  id,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  id: string;
}) {
  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <circle cx="20" cy="20" r="1.7" fill="currentColor" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

type Props = {
  images: string[];
  /** Coordenadas del mouse relativas a la sección (opcional). Activan el reveal. */
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
};

// Fondo de alto impacto: collage de fotos reales (duotono navy) + rejilla
// animada infinita + capa de reveal bajo el cursor + glows de marca.
export function InfiniteGridBackground({ images, mouseX, mouseY }: Props) {
  const reduce = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useAnimationFrame(() => {
    if (reduce) return;
    offsetX.set((offsetX.get() + 0.4) % 40);
    offsetY.set((offsetY.get() + 0.4) % 40);
  });

  const fallbackX = useMotionValue(-600);
  const fallbackY = useMotionValue(-600);
  const mx = mouseX ?? fallbackX;
  const my = mouseY ?? fallbackY;
  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, black, transparent)`;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Collage de fotos reales de la clínica */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-[0.24]">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" className="h-full w-full object-cover" />
        ))}
      </div>

      {/* Velo blanco sobre las fotos (mantiene legibilidad sobre fondo claro) */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.93) 100%)" }}
      />

      {/* Puntos base (navy tenue sobre blanco) */}
      <div className="absolute inset-0 text-[var(--color-primary)] opacity-[0.10]">
        <GridPattern offsetX={offsetX} offsetY={offsetY} id="qmc-grid-base" />
      </div>

      {/* Puntos revelados bajo el cursor (teal) */}
      <motion.div
        className="absolute inset-0 text-[var(--color-secondary)] opacity-60"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={offsetX} offsetY={offsetY} id="qmc-grid-reveal" />
      </motion.div>

      {/* Glows suaves de marca */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[8%] -top-[18%] h-[46%] w-[40%] rounded-full bg-[var(--color-secondary)]/15 blur-[120px]" />
        <div className="absolute -left-[8%] -bottom-[22%] h-[46%] w-[40%] rounded-full bg-[var(--color-aqua)]/15 blur-[120px]" />
      </div>
    </div>
  );
}
