import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingButton } from "@/components/booking/booking-button";
import { getSpecialtyBySlug } from "@/lib/specialties";
import { CAL_USERNAME, BOOKING_NAMESPACE } from "@/lib/booking";

describe("BookingButton", () => {
  it("renderiza un enlace con los atributos data-cal-* y el fallback hosteado", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} />);

    const link = screen.getByRole("link", { name: /pediatría/i });
    expect(link.getAttribute("data-cal-link")).toBe(`${CAL_USERNAME}/pediatria`);
    expect(link.getAttribute("data-cal-namespace")).toBe(BOOKING_NAMESPACE);
    expect(link.getAttribute("data-cal-config")).toContain("month_view");
    expect(link.getAttribute("href")).toBe(`https://cal.com/${CAL_USERNAME}/pediatria`);
  });

  it("usa el label provisto cuando existe", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} label="Reservar ahora" />);
    expect(screen.getByRole("link", { name: "Reservar ahora" })).toBeTruthy();
  });

  it("aplica aria-label cuando se provee, sobreescribiendo el nombre accesible", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} label="Agendar" ariaLabel="Agendar Pediatría" />);
    expect(screen.getByRole("link", { name: "Agendar Pediatría" })).toBeTruthy();
  });
});
