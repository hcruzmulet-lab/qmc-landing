import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgendaSection } from "@/components/booking/agenda-section";
import { bookableSpecialties } from "@/lib/booking";

// BookingEmbedInit (montado por la sección) inicializa el embed: mockeamos getCalApi.
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("AgendaSection", () => {
  it("tiene el ancla #agendar y un encabezado de agendamiento", () => {
    const { container } = render(<AgendaSection />);
    expect(container.querySelector("section#agendar")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /agenda tu cita/i })).toBeTruthy();
  });

  it("renderiza un botón de agendar por cada especialidad agendable", () => {
    render(<AgendaSection />);
    const buttons = screen.getAllByRole("button", { name: /agendar/i });
    // Una tarjeta por especialidad agendable (el CTA WhatsApp es un link, no button).
    expect(buttons.length).toBe(bookableSpecialties().length);
  });

  it("muestra el nombre de cada especialidad agendable", () => {
    render(<AgendaSection />);
    for (const s of bookableSpecialties()) {
      expect(screen.getAllByText(s.nombre).length).toBeGreaterThan(0);
    }
  });

  it("incluye un CTA de WhatsApp de respaldo", () => {
    render(<AgendaSection />);
    const wa = screen.getByRole("link", { name: /whatsapp/i });
    expect(wa.getAttribute("href")).toContain("wa.me");
  });
});
