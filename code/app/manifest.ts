import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} — Clínica de especialidades en Quito`,
    short_name: site.brand,
    description:
      "Más de 30 especialidades y servicios médicos en un mismo lugar en Quito. Agenda por WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0C2545",
    lang: "es-EC",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/logo.png", sizes: "470x400", type: "image/png", purpose: "any" },
    ],
  };
}
