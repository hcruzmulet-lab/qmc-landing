"use client";
import { useEffect } from "react";
import { CalendarPlus } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import type { Specialty } from "@/lib/specialties";
import { calLinkFor, BOOKING_NAMESPACE } from "@/lib/booking";
import { trackLeadClick } from "@/lib/analytics";

const BRAND_NAVY = "#103158";

type Props = {
  specialty: Pick<Specialty, "slug" | "nombre" | "calEventSlug">;
  label?: string;
  className?: string;
};

// Botón que abre el popup de Cal.com de UNA especialidad. El popup lo dispara
// el script de Cal.com al detectar los atributos data-cal-*; useEffect solo
// inicializa apariencia y el listener de reserva exitosa (para analytics).
export function BookingButton({ specialty, label, className = "" }: Props) {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: BOOKING_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        styles: { branding: { brandColor: BRAND_NAVY } },
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => trackLeadClick(`booking-success:${specialty.slug}`),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [specialty.slug]);

  return (
    <button
      type="button"
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
    </button>
  );
}
