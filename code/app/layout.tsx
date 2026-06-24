import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { JsonLd } from "@/components/json-ld";
import { medicalClinicLd, webSiteLd } from "@/lib/seo";
import { site } from "@/lib/site";

// Sora — sans geométrico variable (display). Titulares bold, clínico y claro.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
// Inter — grotesque limpio para cuerpo, datos y utilidades.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "QMC Medisuport — Clínica de especialidades en Quito",
    template: "%s | QMC Medisuport",
  },
  description:
    "Más de 30 especialidades y servicios médicos, de diagnóstico, rehabilitación y laboratorio en un mismo lugar en Quito (Av. 6 de Diciembre). Atención cercana y segura. Agenda por WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "QMC Medisuport — Clínica de especialidades en Quito",
    description:
      "Especialistas para toda tu familia. Atención cercana y segura. Agenda por WhatsApp.",
    url: site.url,
    siteName: site.brand,
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QMC Medisuport — Clínica de especialidades en Quito",
    description:
      "Especialistas para toda tu familia. Atención cercana y segura. Agenda por WhatsApp.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd data={[medicalClinicLd(), webSiteLd()]} />
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
