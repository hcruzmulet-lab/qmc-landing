import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingButton } from "@/components/booking/booking-button";
import { getSpecialtyBySlug } from "@/lib/specialties";
import { CAL_USERNAME, BOOKING_NAMESPACE } from "@/lib/booking";

describe("BookingButton", () => {
  it("renderiza un botón con los atributos data-cal-* de la especialidad", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} />);

    const btn = screen.getByRole("button", { name: /pediatría/i });
    expect(btn.getAttribute("data-cal-link")).toBe(`${CAL_USERNAME}/pediatria`);
    expect(btn.getAttribute("data-cal-namespace")).toBe(BOOKING_NAMESPACE);
    expect(btn.getAttribute("data-cal-config")).toContain("month_view");
  });

  it("usa el label provisto cuando existe", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} label="Reservar ahora" />);
    expect(screen.getByRole("button", { name: "Reservar ahora" })).toBeTruthy();
  });

  it("aplica aria-label cuando se provee, sobreescribiendo el nombre accesible", () => {
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(
      <BookingButton specialty={pediatria} label="Agendar" ariaLabel="Agendar Pediatría" />
    );
    expect(screen.getByRole("button", { name: "Agendar Pediatría" })).toBeTruthy();
  });
});
