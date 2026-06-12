"use client";
import { CalendarPlus } from "lucide-react";
import type { Specialty } from "@/lib/specialties";
import { calLinkFor, hostedBookingUrl, BOOKING_NAMESPACE } from "@/lib/booking";
import { trackLeadClick } from "@/lib/analytics";

type Props = {
  specialty: Pick<Specialty, "slug" | "nombre" | "calEventSlug">;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

// Abre el popup de Cal.com de UNA especialidad. Es un <a> hacia la página
// hosteada de Cal.com: el script del embed intercepta el click (popup); si el
// script no carga, el link degrada a la página hosteada. La inicialización del
// embed vive una sola vez en <BookingEmbedInit/>; aquí solo van los data-cal-*.
export function BookingButton({ specialty, label, ariaLabel, className = "" }: Props) {
  return (
    <a
      href={hostedBookingUrl(specialty)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      data-cal-namespace={BOOKING_NAMESPACE}
      data-cal-link={calLinkFor(specialty)}
      data-cal-config='{"layout":"month_view"}'
      onClick={() => trackLeadClick(`booking-open:${specialty.slug}`)}
      className={
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 " +
        "font-semibold text-white shadow-sm transition-colors duration-200 " +
        "bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] " +
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
        "focus-visible:outline-[var(--color-secondary)] " +
        className
      }
    >
      <CalendarPlus className="h-5 w-5" aria-hidden="true" />
      {label ?? `Agendar ${specialty.nombre}`}
    </a>
  );
}
