"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { BOOKING_NAMESPACE } from "@/lib/booking";
import { trackLeadClick } from "@/lib/analytics";

// Se pasa a la API JS de Cal.com (no a CSS), por eso es un literal y no var(--color-primary).
const BRAND_NAVY = "#103158";

// Inicializa el embed de Cal.com UNA sola vez para el namespace de agendamiento:
// apariencia (marca navy, vista mensual) y el listener global de reserva exitosa.
// Se monta una vez en AgendaSection; los BookingButton solo llevan data-cal-*.
export function BookingEmbedInit() {
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
        callback: () => trackLeadClick("booking-success"),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
