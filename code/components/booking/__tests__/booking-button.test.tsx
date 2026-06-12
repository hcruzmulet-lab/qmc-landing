import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingButton } from "@/components/booking/booking-button";
import { getSpecialtyBySlug } from "@/lib/specialties";
import { CAL_USERNAME, BOOKING_NAMESPACE } from "@/lib/booking";

// El embed toca window/red: lo mockeamos. getCalApi resuelve un cal() no-op.
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("BookingButton", () => {
  beforeEach(() => vi.clearAllMocks());

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

  it("inicializa el embed (getCalApi) al montar", async () => {
    const { getCalApi } = await import("@calcom/embed-react");
    const pediatria = getSpecialtyBySlug("pediatria")!;
    render(<BookingButton specialty={pediatria} />);
    expect(getCalApi).toHaveBeenCalledWith({ namespace: BOOKING_NAMESPACE });
  });
});
