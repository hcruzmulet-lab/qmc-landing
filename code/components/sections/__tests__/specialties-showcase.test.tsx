import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpecialtiesShowcase } from "@/components/sections/specialties-showcase";
import { principalSpecialties } from "@/lib/specialties";
import { site } from "@/lib/site";

describe("SpecialtiesShowcase section", () => {
  it("renderiza el título y enlaces a las páginas de especialidad principales", () => {
    render(<SpecialtiesShowcase />);
    expect(screen.getByRole("heading", { name: /especialistas|familia/i })).toBeTruthy();
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/especialidades/pediatria");
    // Enlace a la cartera completa.
    expect(hrefs).toContain("/especialidades");
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(6);
  });

  it("muestra un CTA de WhatsApp por cada especialidad destacada", () => {
    const { container } = render(<SpecialtiesShowcase />);
    const waLinks = Array.from(
      container.querySelectorAll('a[href*="wa.me"]')
    );
    // Al menos un CTA de WhatsApp por especialidad principal del directorio.
    expect(waLinks.length).toBeGreaterThanOrEqual(principalSpecialties().length);
    expect(waLinks[0].getAttribute("href")).toContain(`wa.me/${site.whatsappE164}`);
  });
});
