import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { BookingEmbedInit } from "@/components/booking/booking-embed-init";
import { BOOKING_NAMESPACE } from "@/lib/booking";

vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("BookingEmbedInit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("inicializa el embed (getCalApi) una vez con el namespace de agendamiento", async () => {
    const { getCalApi } = await import("@calcom/embed-react");
    render(<BookingEmbedInit />);
    expect(getCalApi).toHaveBeenCalledTimes(1);
    expect(getCalApi).toHaveBeenCalledWith({ namespace: BOOKING_NAMESPACE });
  });

  it("no renderiza DOM (retorna null)", () => {
    const { container } = render(<BookingEmbedInit />);
    expect(container.firstChild).toBeNull();
  });
});
