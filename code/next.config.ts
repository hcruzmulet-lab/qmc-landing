import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactiva el streaming de metadata (el <div hidden display:contents> +
  // <Suspense Next.Metadata>). Ese wrapper provoca un hydration mismatch cuando
  // una extensión del navegador altera el DOM antes de hidratar. Con metadata
  // bloqueante (estática y mínima aquí) el costo es nulo y el árbol es estable.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
