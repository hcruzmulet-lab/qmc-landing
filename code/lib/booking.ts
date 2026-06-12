import { specialties, type Specialty } from "@/lib/specialties";

// Username de la cuenta Cal.com (plan gratis). Fallback hardcodeado para que
// los tests y el build sean deterministas aunque la env no esté seteada.
export const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CAL_USERNAME ?? "qmc-medisuport";

// Namespace único del embed de agendamiento. Aísla esta instancia del embed
// de cualquier otra que pudiera existir en la página.
export const BOOKING_NAMESPACE = "agendar";

// Slugs que NO se agendan online (siguen solo por WhatsApp). Vacío = todas
// agendables. Es un doble control con el panel de Cal.com: ocultar acá saca la
// especialidad del sitio sin tocar la cuenta de Cal.com.
const NOT_BOOKABLE: ReadonlySet<string> = new Set<string>([]);

export function isBookable(slug: string): boolean {
  return !NOT_BOOKABLE.has(slug);
}

export function bookableSpecialties(): Specialty[] {
  return specialties.filter((s) => isBookable(s.slug));
}

// "qmc-medisuport/pediatria" — el calLink que consume data-cal-link del embed.
export function calLinkFor(s: Pick<Specialty, "slug" | "calEventSlug">): string {
  return `${CAL_USERNAME}/${s.calEventSlug ?? s.slug}`;
}

// URL de la página hosteada de Cal.com — fallback si el script del embed no carga.
export function hostedBookingUrl(s: Pick<Specialty, "slug" | "calEventSlug">): string {
  return `https://cal.com/${calLinkFor(s)}`;
}
