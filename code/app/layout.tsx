import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics-scripts";

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
  title: "QMC Medisuport — Clínica de especialidades en Quito",
  description:
    "Pediatría, Medicina General, Gastroenterología, Traumatología, Fisiatría, Rehabilitación y Laboratorio Clínico en Quito. Atención cercana y segura. Agenda por WhatsApp.",
  openGraph: {
    title: "QMC Medisuport — Clínica de especialidades en Quito",
    description:
      "Especialistas para toda tu familia. Atención cercana y segura. Agenda por WhatsApp.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
