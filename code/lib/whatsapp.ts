import { site } from "@/lib/site";

export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${site.whatsappE164}?text=${text}`;
}

export function buildSpecialtyMessage(nombre: string): string {
  return `Hola QMC, quiero agendar una cita de ${nombre}.`;
}

// Conveniencia: arma el mensaje por especialidad y lo envuelve en el deep-link
// wa.me ya codificado. Evita que cada llamador olvide el encode.
export function buildSpecialtyWhatsAppUrl(nombre: string): string {
  return buildWhatsAppUrl(buildSpecialtyMessage(nombre));
}
