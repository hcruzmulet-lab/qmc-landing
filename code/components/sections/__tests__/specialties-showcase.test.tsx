import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialtiesShowcase } from "@/components/sections/specialties-showcase";
import { specialties } from "@/lib/specialties";
import { CAL_USERNAME } from "@/lib/booking";

// La sección monta <BookingEmbedInit/>, que inicializa el embed: lo mockeamos.
vi.mock("@calcom/embed-react", () => ({
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}));

describe("SpecialtiesShowcase section", () => {
  it("renderiza el título y enlaces a las páginas de especialidad", () => {
    render(<SpecialtiesShowcase />);
    expect(screen.getByRole("heading", { name: /especialidades/i })).toBeTruthy();
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/especialidades/pediatria");
    expect(hrefs).toContain("/especialidades/laboratorio-clinico");
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(7);
  });

  it("muestra un CTA de agendar por especialidad con su data-cal-link", () => {
    const { container } = render(<SpecialtiesShowcase />);
    // Un trigger de agendamiento (a[data-cal-link]) por cada especialidad en
    // la lista (el panel sticky de la derecha está oculto vía CSS pero igual
    // se monta, así que solo verificamos que existan al menos las de la lista).
    const triggers = container.querySelectorAll("a[data-cal-link]");
    expect(triggers.length).toBeGreaterThanOrEqual(specialties.length);
    // El primero apunta al calLink hosteado de Cal.com.
    const first = triggers[0];
    expect(first.getAttribute("href")).toContain(`https://cal.com/${CAL_USERNAME}/`);
  });
});
