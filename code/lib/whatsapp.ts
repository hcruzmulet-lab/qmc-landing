import { site } from "@/lib/site";

export function buildWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${site.whatsappE164}?text=${text}`;
}
