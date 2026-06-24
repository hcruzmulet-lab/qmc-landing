import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { specialtySlugs } from "@/lib/specialties";

// Sitemap dinámico: home, listado de especialidades y cada página de detalle.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const home: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/especialidades`, changeFrequency: "monthly", priority: 0.8 },
  ];
  const detalles: MetadataRoute.Sitemap = specialtySlugs().map((slug) => ({
    url: `${base}/especialidades/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...home, ...detalles];
}
