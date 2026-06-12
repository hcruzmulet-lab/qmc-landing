import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { BookingEmbedInit } from "@/components/booking/booking-embed-init";
import { BOOKING_NAMESPACE } from "@/lib/booking";

const { calMock } = vi.hoisted(() => ({ calMock: vi.fn() }));
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(calMock),
}));

describe("BookingEmbedInit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("inicializa el embed (getCalApi) una vez con el namespace de agendamiento", async () => {
    const { getCalApi } = await import("@calcom/embed-react");
    render(<BookingEmbedInit />);
    await waitFor(() => expect(getCalApi).toHaveBeenCalledTimes(1));
    expect(getCalApi).toHaveBeenCalledWith({ namespace: BOOKING_NAMESPACE });
  });

  it("configura apariencia (ui) y registra el listener de reserva exitosa (on)", async () => {
    render(<BookingEmbedInit />);
    await waitFor(() => {
      expect(calMock).toHaveBeenCalledWith(
        "ui",
        expect.objectContaining({ layout: "month_view" })
      );
      expect(calMock).toHaveBeenCalledWith(
        "on",
        expect.objectContaining({ action: "bookingSuccessful" })
      );
    });
  });

  it("no renderiza DOM (retorna null)", () => {
    const { container } = render(<BookingEmbedInit />);
    expect(container.firstChild).toBeNull();
  });
});
