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

  it("renderiza un enlace de agendar (data-cal-link) por cada especialidad agendable", () => {
    const { container } = render(<AgendaSection />);
    const links = container.querySelectorAll("a[data-cal-link]");
    expect(links.length).toBe(bookableSpecialties().length);
  });

  it("muestra el nombre de cada especialidad agendable", () => {
    render(<AgendaSection />);
    for (const s of bookableSpecialties()) {
      expect(screen.getAllByText(s.nombre).length).toBeGreaterThan(0);
    }
  });

  it("cada enlace de agendar tiene un nombre accesible único con la especialidad", () => {
    render(<AgendaSection />);
    for (const s of bookableSpecialties()) {
      expect(screen.getByRole("link", { name: `Agendar ${s.nombre}` })).toBeTruthy();
    }
  });

  it("incluye un CTA de WhatsApp de respaldo", () => {
    render(<AgendaSection />);
    const wa = screen.getByRole("link", { name: /whatsapp/i });
    expect(wa.getAttribute("href")).toContain("wa.me");
  });
});
