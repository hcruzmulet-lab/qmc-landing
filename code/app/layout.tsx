import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-heading", weight: ["400","500","600","700"] });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","700"] });

export const metadata: Metadata = {
  title: "QMC — Consulta integral $10 en Quito | Medicina Familiar y Neumología",
  description:
    "Por reapertura: chequeo integral por $10 (oídos, garganta, fondo de ojo y signos vitales). Medicina Familiar y Neumología en Av. 6 de Diciembre, Quito. Agenda por WhatsApp.",
  openGraph: {
    title: "QMC — Consulta integral $10 en Quito",
    description: "Chequeo integral promocional. Agenda por WhatsApp.",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${figtree.variable} ${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
