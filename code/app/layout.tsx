import type { Metadata } from "next";
import { Hanken_Grotesk, Mulish } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics-scripts";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
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
    <html lang="es">
      <body className={`${hanken.variable} ${mulish.variable} antialiased`}>
        <AnalyticsScripts />
        {children}
      </body>
    </html>
  );
}
